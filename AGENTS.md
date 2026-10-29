# AGENTS.md — AI Learning Management & Creator (AI-LMC) Enterprise

Panduan resmi bagi agen AI pengembang dan kontributor teknis dalam membangun, memelihara, dan mengembangkan platform AI-LMC. **Dilarang menulis kode aplikasi sebelum arsitektur, interface, dan konvensi dasar disepakati.**

---

## 1. Ringkasan Produk
1. AI Learning Management & Creator (AI-LMC) Enterprise adalah platform end-to-end terintegrasi untuk organisasi enterprise.
2. Platform mengotomatiskan konversi dokumen internal (SOP, regulasi, *product knowledge*) menjadi modul video pelatihan interaktif.
3. Dokumen mentah diproses melalui ekstraksi struktur dan OCR cerdas (Layer 5) menjadi basis pengetahuan RAG.
4. Agen AI menyusun kurikulum, naskah per adegan (*scene-by-scene*), dan storyboard instruksional berdasar fakta dokumen.
5. Mesin AI lokal (Layer 4) memproduksi audio narasi ekspresif (TTS) dan video avatar dengan sinkronisasi bibir (*lip-sync*).
6. Seluruh aset multimedia, takarir Whisper, dan bank kuis adaptif diintegrasikan langsung ke dalam LMS Core (Layer 2).
7. Pembelajar mengakses materi via Web Portal responsif dan Mobile App native dengan asisten AI Tutor berbasis RAG.
8. Learning Record Store (LRS) mencatat aktivitas belajar granular secara real-time berstandar industri xAPI.
9. Dasbor analitik memetakan kesenjangan kompetensi (*skill gap*), retensi tontonan, serta kepatuhan pelatihan divisi.
10. Tercipta *closed-loop employee growth*: kesenjangan skill otomatis memicu rekomendasi belajar dan produksi modul baru.

---

## 2. Arsitektur 5 Layer & Pemetaan Folder

Sistem mengadopsi struktur modular monorepo multi-service dengan pemetaan layer ke folder berikut:

| Layer Arsitektur | Nama Layer & Peran Utama | Lokasi Folder | Tanggung Jawab Komponen |
| :--- | :--- | :--- | :--- |
| **Layer 1** | **Experience** (Klien & Interaksi) | `/frontend-web`<br>`/mobile-app` | • `/frontend-web`: Creator Studio, L&D Dashboard, dan Learner Portal Web.<br>• `/mobile-app`: Learner Mobile App Android Native untuk pembelajaran lapangan (fase berikutnya). |
| **Layer 2** | **LMS Core & Gateway** (Manajemen Belajar) | `/backend-core` | API Gateway, Course & Module Management, Auto Quiz Engine, Enrollment & RBAC, Sertifikasi Digital, SCORM/xAPI dispatcher, dan Skill Gap Analyzer. |
| **Layer 3** | **AI Orchestration** (Logika Agen & Alur) | `/ai-orchestrator` | Orchestrator pipeline agen (Ingest, Outline, Script, Storyboard), LLM Gateway & Provider Abstraction, Prompt Engine, Human Review Gate, dan Job Queue dispatcher. |
| **Layer 4** | **GPU Lokal Generation** (Sintesis Media AI) | `/gpu-worker` | Worker komputasi berat GPU on-premise: Text-to-Speech (TTS), Video Generation B-roll, Avatar Lip-Sync, Whisper STT Subtitles, dan FFmpeg Render Compositor. |
| **Layer 5** | **Knowledge & Data** (Fondasi Data & Storage) | `/backend-core` & `/gpu-worker` (Infrastruktur) | • Document Parser & OCR Engine (di `/gpu-worker`).<br>• PostgreSQL + pgvector (Vector DB & RAG embeddings `bge-m3`).<br>• MinIO (S3-compatible Object Storage).<br>• LRS (xAPI Activity Store). |

---

## 3. Tech Stack Tetap

Seluruh pengembangan wajib mematuhi standar teknologi berikut:

- **Web Frontend (`/frontend-web`)**:
  - Framework: **Next.js (App Router)** dengan **TypeScript (Strict Mode)**.
  - Styling: **Tailwind CSS**.
  - Komponen UI: **shadcn/ui** (berbasis Radix UI primitives).
  - State & Fetching: React Query (@tanstack/react-query) & Zustand.
- **Backend API & Gateway (`/backend-core`)**:
  - Bahasa & Framework: **Go (Golang)** menggunakan router **Chi** atau **Gin**.
  - Driver DB: **pgx** (native PostgreSQL driver) atau SQLX.
  - Autentikasi: JWT dengan integrasi OAuth2 / OIDC / LDAP enterprise.
- **AI Worker & Orchestration (`/ai-orchestrator` & `/gpu-worker`)**:
  - Bahasa & Framework: **Python 3.11+** dengan **FastAPI**.
  - Orchestration: LangGraph / LlamaIndex / Celery worker.
  - Model AI Lokal On-Premise:
    - LLM: `Qwen 2.5 (14B/32B/72B Instruct)` atau `Llama 3.1 (70B)` via vLLM.
    - Embedding: `BAAI/bge-m3` atau `multilingual-e5-large`.
    - TTS: `XTTS-v2` / `F5-TTS` / `CosyVoice`.
    - Avatar Lip-Sync: `LatentSync` / `MuseTalk`.
    - Video Gen B-Roll: `Wan 2.1` / `Hunyuan Video` / `LTX-Video`.
    - Subtitle STT: `faster-whisper` (`Whisper large-v3`).
    - Media Render: FFmpeg dengan akselerasi GPU (NVENC/NVDEC).
- **Database & Storage**:
  - Database Relasional & Vektor: **PostgreSQL 16+** dengan ekstensi **pgvector**.
  - Cache & Job Queue: **Redis** (Message Broker & koordinasi VRAM).
  - Object Storage: **MinIO** (S3-compatible bucket on-premise).
- **Mobile Client (`/mobile-app`)**:
  - Platform: **Kotlin (Android Native)** dengan Jetpack Compose & ExoPlayer (tahap lanjutan).

---

## 4. Prinsip Wajib Pengembangan (Non-Negotiable Principles)

1. **Zero Data Egress (Kedaulatan Data Lokal Penuh)**:
   - Data internal perusahaan tidak boleh keluar dari infrastruktur privat on-premise.
   - Semua interaksi model bahasa/media **wajib** melalui interface `Provider` (contoh: `LLMProvider`, `TTSProvider`, `VideoProvider`).
   - Sediakan implementasi `LocalProvider` dan `CloudProvider`. Untuk dokumen dengan klasifikasi rahasia/internal, sistem secara otomatis mengunci dan menonaktifkan `CloudProvider` (*hard-fail* jika dipanggil).
2. **Mandatory Source Citation (Sitasi Wajib per Scene)**:
   - Setiap adegan naskah (*scene*) yang dihasilkan AI wajib memiliki sitasi eksplisit halaman dan judul dokumen sumber (`[Nama_Dokumen.pdf, Hal: X]`). Naskah tanpa sitasi valid otomatis ditolak.
3. **Immutable AI Audit Log**:
   - Seluruh aktivitas AI (ekstraksi, prompt, output token LLM, confidence score, revisi naskah, hingga render) wajib tercatat dalam audit log yang *append-only*.
4. **Human Approval Gate (SME Checkpoint)**:
   - Pemrosesan berat GPU di Layer 4 (TTS, Lip-sync, Video Render) **dilarang berjalan** sebelum naskah dan storyboard disetujui (*Approved*) secara eksplisit oleh SME / Admin L&D di antarmuka Creator Studio.
5. **Divisional Role-Based Access Control (RBAC)**:
   - Akses kursus, dokumen SOP, dan data analitik dibatasi ketat berdasarkan divisi dan peran pengguna (Super Admin, L&D Creator, SME Reviewer, Division Manager, Learner).

---

## 5. Konvensi Kode & Standar Rekayasa

- **Struktur Folder Modular**:
  - Terapkan pemisahan domain (*Clean Architecture*): `handler/controller`, `service/usecase`, `repository`, `model/entity`.
- **Standar Penamaan**:
  - Frontend (TSX/TS): `PascalCase` untuk komponen, `camelCase` untuk fungsi/variabel, `kebab-case` untuk nama berkas.
  - Backend (Go): `PascalCase` untuk exported structs/methods, `camelCase` untuk private variables, nama package huruf kecil ringkas.
  - Worker (Python): `PascalCase` untuk class, `snake_case` untuk fungsi/variabel/berkas.
  - Database: `snake_case` untuk tabel dan kolom (plural untuk nama tabel, misal: `course_modules`, `xapi_statements`).
- **Error Handling**:
  - Dilarang menelan error secara diam-diam (*silent catch*).
  - Go: Wajib periksa `if err != nil` dan sertakan konteks (`fmt.Errorf("context: %w", err)`).
  - Python: Gunakan custom exceptions turunan FastAPI `HTTPException` dan skema Pydantic tervalidasi.
  - Frontend: Gunakan *React Error Boundaries* dan notifikasi toast informatif dari shadcn/ui.
- **Konfigurasi Lingkungan & Secrets**:
  - Seluruh konfigurasi wajib didefinisikan dalam `.env.example`.
  - **Dilarang keras melakukan commit berkas `.env`, API key, kata sandi, atau kredensial ke repository git.** Gunakan `.gitignore` secara ketat.
- **Standar Bahasa**:
  - **Komentar Kode & Dokumentasi Teknis**: Wajib menggunakan **Bahasa Inggris** (English).
  - **UI Copy & Teks Antarmuka**: Wajib menggunakan **Bahasa Indonesia** standar korporat yang ramah pengguna dan profesional.

---

## 6. Definition of Done (DoD)

Sebuah tugas, fitur, atau pull request (PR) dinyatakan selesai (*Done*) hanya jika:

1. **Linting & Formatting**: Lulus 100% tanpa peringatan kritis:
   - Frontend: `npm run lint` (ESLint) & `prettier --check`.
   - Backend Go: `golangci-lint run`.
   - Python Worker: `ruff check` & `black --check`.
2. **Type Checking**:
   - TypeScript: `tsc --noEmit` bersih tanpa error.
   - Python: Validasi tipe lulus menggunakan `mypy`.
3. **Testing Suite**:
   - Unit tests dan integration tests lulus 100% pada pipeline lokal/CI (skenario positif dan penanganan error).
4. **Dokumentasi Terkini**:
   - Berkas `README.md` pada modul terkait diperbarui dengan petunjuk setup, endpoint baru, atau konfigurasi environment.
   - Dokumentasi Swagger/OpenAPI ter-generate otomatis dan mutakhir.
5. **Conventional Commits**:
   - Pesan commit wajib mematuhi format: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
6. **Kebijakan Eksekusi**:
   - **Jangan menulis kode aplikasi sebelum fondasi struktur, kontrak API, dan spesifikasi modul diinstruksikan secara bertahap.**
