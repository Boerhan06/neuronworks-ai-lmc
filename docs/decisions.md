# Architectural & Product Decisions (ADR)
# AI Learning Management & Creator (AI-LMC) Enterprise

Dokumen ini mencatat seluruh keputusan arsitektural dan spesifikasi produk strategis hasil sesi klarifikasi wawancara mendalam (`/grill-me`) berdasarkan [PRD.md](file:///d:/Projek/2026/neuronworks-ai-lmc/docs/PRD.md) dan [AGENTS.md](file:///d:/Projek/2026/neuronworks-ai-lmc/AGENTS.md). Dokumen ini berfungsi sebagai acuan baku bagi seluruh tim rekayasa perangkat lunak dan agen AI dalam mengimplementasikan platform.

---

## Ringkasan Matriks Keputusan

| # | Domain Keputusan | Keputusan Terpilih | Implikasi Arsitektural Utama |
| :---: | :--- | :--- | :--- |
| **1** | **Arsitektur Tenancy** | **Single-Tenant Enterprise** dengan isolasi divisi | 1 deployment privat per enterprise; isolasi `division_id` di database & otentikasi. |
| **2** | **Cakupan MVP Mobile** | **Web Saja untuk MVP** (Mobile ke Fase 2) | Fokus MVP di Creator Studio & Learner Web responsive (Next.js); Kotlin Android ditunda ke Fase 2. |
| **3** | **Ketersediaan GPU** | **Cloud GPU / Mock Worker** untuk Dev | Abstraksi worker Layer 4 mendukung switchable backend (Mock $\rightarrow$ Cloud GPU $\rightarrow$ On-Premise). |
| **4** | **Skala Pengguna** | **Skala Menengah** (500–2.500 user, 100–300 peak) | Konfigurasi pooling database standard; Redis job queue concurrency 2–4 workers simultan. |
| **5** | **Autentikasi & SSO** | **Hybrid**: Local JWT + OIDC/OAuth2 SSO | Mendukung login kredensial lokal (testing/admin) + SSO Microsoft Entra ID / Google / Keycloak. |
| **6** | **Batas Dokumen** | **Max 50 MB & hingga 100 Halaman** | Parser & OCR diatur dengan memory limit yang aman; chunking background asinkron. |
| **7** | **Bahasa Video** | **Bahasa Indonesia Utama** (dengan kamus fonetik) | TTS, naskah, kuis, dan subtitle berbahasa Indonesia; kamus fonetik untuk istilah teknis Inggris. |
| **8** | **Struktur Video** | **Strict Micro-Module (Tepat 3 Menit, 5 Scene)** | Format scene baku: Pembuka $\rightarrow$ Poin 1 $\rightarrow$ Poin 2 $\rightarrow$ Contoh Kasus $\rightarrow$ Ringkasan. |
| **9** | **Avatar Virtual** | **Hybrid**: 4–6 Preset Korporat + Custom Upload | Menyediakan library model presenter siap pakai + fitur upload video potret presenter internal. |
| **10**| **Otoritas Approval** | **Single Approval Fleksibel** (SME atau L&D Admin) | Tombol render GPU aktif setelah diverifikasi salah satu pihak (SME bidangnya atau L&D Admin). |
| **11**| **Standar Kuis** | **Passing Grade 80%, Max 3x Percobaan** | 10 bank soal acak per modul; menyertakan feedback rasionalisasi & timestamp video rujukan. |
| **12**| **Integrasi LRS** | **Dual Support**: Built-in LRS + xAPI Forwarder | LRS lokal tersimpan di PostgreSQL + webhook/dispatcher opsional ke LRS eksternal korporat. |

---

## Rincian Keputusan & Spesifikasi Teknis

### 1. Arsitektur Tenancy
- **Keputusan**: **Single-Tenant Enterprise dengan Isolasi Berbasis Divisi**.
- **Konteks & Alasan**: Sebagai platform enterprise yang memproses dokumen rahasia (SOP internal, manual produk, kebijakan operasional), setiap organisasi enterprise menggunakan deployment infrastruktur tersendiri (*isolated instance*). Di dalam organisasi tersebut, data dipartisi secara ketat berdasarkan divisi pengguna.
- **Dampak Teknis**:
  - Seluruh query database relasional (PostgreSQL) dan vector search (`bge-m3` via pgvector) menyertakan filter `division_id`.
  - Tidak ada kebutuhan skema *multi-tenant logical separation* yang rumit lintas perusahaan.
  - Memudahkan pemenuhan audit keamanan dan sertifikasi kedaulatan data korporasi.

---

### 2. Cakupan MVP: Platform Web vs Mobile App
- **Keputusan**: **Fokus Penuh pada Platform Web untuk MVP**; Mobile App (Android Native Kotlin) dijadwalkan untuk **Fase 2**.
- **Konteks & Alasan**: Nilai tambah utama platform di fase awal terletak pada kesempurnaan pipeline otomatisasi: konversi dokumen mentah $\rightarrow$ naskah bersitasi $\rightarrow$ render video berkejelasan tinggi $\rightarrow$ distribusi LMS.
- **Dampak Teknis**:
  - Prioritas pengerjaan Layer 1 dialokasikan 100% pada `/frontend-web` (**Next.js App Router, Tailwind CSS, shadcn/ui**).
  - Tampilan Learner Web Portal dioptimalkan agar responsif sempurna di perangkat mobile (mengacu pada pedoman di [rules/design.md](file:///d:/Projek/2026/neuronworks-ai-lmc/rules/design.md)).
  - Folder `/mobile-app` dipertahankan sebagai blueprint arsitektur tanpa penulisan kode pada fase MVP.

---

### 3. Infrastruktur & Strategi Komputasi GPU
- **Keputusan**: **Penyediaan Abstraksi Mock Worker & Cloud GPU Dev Endpoint** (mengingat server GPU fisik on-premise belum tersedia saat fase inisiasi proyek).
- **Konteks & Alasan**: Tim pengembang membutuhkan kepastian agar seluruh pipeline Layer 1, 2, 3, dan 5 dapat diuji secara end-to-end tanpa terblokir ketiadaan perangkat keras server GPU on-premise di hari pertama.
- **Dampak Teknis**:
  - Dibuat implementasi `MockGPUWorker` yang mampu mensimulasikan tugas TTS, Lip-sync, dan video rendering (mengembalikan aset media dummy berdurasi tepat) untuk unit & integration test.
  - Layer 4 dirancang modular sehingga saat instance Cloud GPU (seperti RunPod/Lambda Labs) atau server fisik on-premise (2x RTX 4090 / A100) siap, sistem cukup mengganti URL worker di konfigurasi `.env`.

---

### 4. Skala Pengguna & Karakteristik Beban
- **Keputusan**: **Skala Menengah** (500 – 2.500 karyawan terdaftar, 100 – 300 pembelajar aktif bersamaan, 5 – 15 pengguna L&D Creator / SME).
- **Konteks & Alasan**: Skala ini mewakili ukuran umum satu divisi atau unit bisnis enterprise dalam fase adopsi pilot produk.
- **Dampak Teknis**:
  - PostgreSQL dikonfigurasi dengan koneksi pooling standar (pgx pool: `max_conns: 50–100`).
  - Redis cache diaktifkan untuk caching data kursus statis, token auth, dan session state.
  - Media video MP4 di-stream menggunakan caching HTTP range request atau HLS via MinIO Object Storage.

---

### 5. Strategi Autentikasi & Single Sign-On (SSO)
- **Keputusan**: **Hybrid Authentication** (Local Email/Password JWT + Enterprise SSO OIDC/OAuth2).
- **Konteks & Alasan**: Mengakomodasi fleksibilitas selama tahap pengembangan dan pengujian lokal (menggunakan akun email/password internal), sekaligus siap diintegrasikan langsung dengan identity provider enterprise di lingkungan produksi.
- **Dampak Teknis**:
  - Skema tabel `users` memiliki field `auth_provider` (`local`, `google`, `azure_ad`, `keycloak`) dan `external_id`.
  - Endpoint callback OAuth2/OIDC terstandarisasi untuk Microsoft Entra ID dan Google Workspace.

---

### 6. Batasan Ingestion Dokumen Sumber
- **Keputusan**: **Ukuran Berkas Maksimal 50 MB** dan **Jumlah Halaman Maksimal 100 Halaman** per dokumen.
- **Konteks & Alasan**: Parameter ini mencakup lebih dari 95% dokumen SOP, regulasi internal, dan panduan teknis enterprise, sekaligus menjaga stabilitas memori parser dan proses OCR.
- **Dampak Teknis**:
  - Gateway API menerapkan middleware limit `50MB` pada multipart file upload.
  - Parser melakukan pra-validasi jumlah halaman PDF. Jika melebihi 100 halaman, sistem menampilkan opsi bagi pengguna untuk memilih rentang halaman spesifik (*page range selector*).
  - Penyimpanan berkas asli di MinIO bucket terenkripsi menggunakan UUID terisolasi.

---

### 7. Bahasa Video, Audio & Pelafalan
- **Keputusan**: **Bahasa Indonesia sebagai Bahasa Utama Modul** (dengan modul adaptasi istilah teknis).
- **Konteks & Alasan**: Audiens utama pembelajar lapangan dan operasional enterprise adalah penutur Bahasa Indonesia.
- **Dampak Teknis**:
  - Model TTS (`F5-TTS` / `CosyVoice`) dikonfigurasi dengan bobot Bahasa Indonesia alami.
  - Diterapkan **Kamus Fonetik (*Phonetic Lexicon*)**: Mengonversi akronim dan kata serapan teknis bahasa Inggris (misal: "SOP", "KPI", "Safety Shoes", "API") menjadi representasi fonemik yang dilafalkan secara presisi oleh mesin TTS.
  - Takarir subtitle (Whisper) dan kuis evaluasi otomatis dihasilkan dalam Bahasa Indonesia formal korporat.

---

### 8. Struktur & Format Baku Video Pembelajaran
- **Keputusan**: **Strict Micro-Module: Tepat 3 Menit per Modul Video** dengan struktur tetap **5 Scene**.
- **Konteks & Alasan**: Konsistensi durasi terbukti memaksimalkan tingkat penyelesaian belajar (*completion rate*) karyawan dan mempermudah perancangan storyboard oleh agen AI.
- **Format Baku 5 Scene**:
  1. **Scene 1 (Pembuka / Hook)**: 30 detik — Latar belakang & Tujuan Pembelajaran.
  2. **Scene 2 (Poin Inti SOP Bagian 1)**: 45 detik — Prosedur langkah kerja pertama.
  3. **Scene 3 (Poin Inti SOP Bagian 2)**: 45 detik — Prosedur langkah kerja lanjutan / keselamatan.
  4. **Scene 4 (Contoh Kasus / Do's & Don'ts)**: 40 detik — Contoh penerapan benar vs salah.
  5. **Scene 5 (Ringkasan & Transisi Kuis)**: 20 detik — Rangkuman inti & ajakan evaluasi kuis.

---

### 9. Karakter Presenter Avatar Virtual
- **Keputusan**: **Hybrid Presenter Model** (Tersedia 4–6 Preset Avatar Korporat + Dukungan Upload Video Presenter Kustom).
- **Konteks & Alasan**: Menyediakan solusi instan tanpa repot bagi admin L&D (menggunakan preset avatar yang sudah di-tuning pencahayaannya), namun tetap memberikan keleluasaan bagi divisi yang ingin menampilkan video instruktur riil mereka.
- **Dampak Teknis**:
  - Menyediakan berkas video dasar avatar loop (pria/wanita dengan pakaian formal dan seragam pabrik/lapangan).
  - Menyediakan endpoint upload potret loop kustom dengan validasi resolusi (1080p, framing kepala-dada, latar belakang polos).

---

### 10. Otoritas SME Approval Gate
- **Keputusan**: **Single Approval Fleksibel** (Dapat disetujui oleh Subject Matter Expert yang ditugaskan ATAU Admin L&D yang memiliki peran reviewer).
- **Konteks & Alasan**: Mencegah proses produksi video terhenti (*stuck*) akibat keterlambatan verifikasi manual dari salah satu pihak, dengan tetap menjaga integritas audit log.
- **Dampak Teknis**:
  - Status modul: `DRAFT` $\rightarrow$ `REVIEW_PENDING` $\rightarrow$ `APPROVED` $\rightarrow$ `RENDERING` $\rightarrow$ `PUBLISHED`.
  - Tindakan persetujuan mencatat metadata riil: `approved_by_user_id`, `role`, `timestamp`, dan *snapshot hash* naskah yang disetujui.

---

### 11. Standar Evaluasi Kuis & Sertifikasi Digital
- **Keputusan**: **Passing Grade 80%**, **Maksimal 3x Percobaan**, dengan **Bank Soal Acak**.
- **Konteks & Alasan**: Menjamin pemahaman materi berkualitas tinggi tanpa menimbulkan frustrasi berlebihan pada karyawan.
- **Dampak Teknis**:
  - Agen AI Layer 3 secara otomatis menyusun bank soal berisi 10 butir soal per modul.
  - Setiap kali pembelajar memulai evaluasi, sistem mengacak 5 butir soal dari bank soal tersebut.
  - Saat pembelajar menjawab salah, sistem menyajikan *rationalization feedback* yang merujuk pada menit video tertentu.
  - Jika lulus ($\ge 80\%$), sistem menerbitkan sertifikat digital dengan QR code verifikasi instan.

---

### 12. Arsitektur Learning Record Store (LRS) & xAPI
- **Keputusan**: **Dual Support** (Built-in Internal LRS bawaan + Fitur Forwarder/Dispatcher xAPI ke LRS Eksternal).
- **Konteks & Alasan**: Memastikan sistem dapat beroperasi mandiri 100% tanpa aplikasi pihak ketiga, namun tetap ramah integrasi jika korporasi telah memiliki enterprise LRS terpusat.
- **Dampak Teknis**:
  - Tabel `xapi_statements` terpasang langsung di database PostgreSQL untuk mencatat verb: `experienced`, `watched`, `interacted`, `answered`, `passed`, `completed`.
  - Modul dispatcher asinkron di backend core yang dapat mengalirkan salinan payload xAPI via HTTP POST (Basic Auth / OAuth) ke endpoint LRS eksternal (misal: Learning Locker) jika URL webhook dikonfigurasi di dashboard L&D.

---

*Dokumen keputusan ini disahkan sebagai fondasi arsitektur dan fungsionalitas resmi dalam pengembangan AI Learning Management & Creator (AI-LMC) Enterprise.*

