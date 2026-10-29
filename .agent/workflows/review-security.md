---
name: review-security
description: Audit RBAC, input validation, secure file uploads, secret leaks, and data boundary compliance (zero external data egress for confidential enterprise data).
---

# /review-security — Security & Data Boundary Audit Workflow

Gunakan workflow ini untuk mengaudit integritas keamanan enterprise, kepatuhan kedaulatan data lokal (*Zero Data Egress*), kontrol akses divisi (*RBAC*), sanitasi input, serta pencegahan kebocoran kredensial.

---

## Tahapan Eksekusi

### Langkah 1: Audit Kedaulatan Data & Batasan AI (*Zero Data Egress*)
1. **Interface Abstraction Check**:
   - Pastikan seluruh panggilan ke model AI (LLM, TTS, Video, Lip-sync, Embedding) melewati antarmuka `Provider`.
   - Periksa bahwa implementasi `LocalProvider` (`vLLM`, `Ollama`, `F5-TTS`, `LatentSync`, `bge-m3`) aktif secara default.
2. **Pencegahan Data Egress**:
   - Pastikan berkas dokumen bertanda klasifikasi internal/rahasia secara otomatis menonaktifkan `CloudProvider`.
   - Pindai kode untuk memastikan **tidak ada panggilan HTTP keluar langsung** ke endpoint publik eksternal (misal: `api.openai.com`, `api.anthropic.com`, `generativelanguage.googleapis.com`) tanpa melalui gerbang otorisasi.

---

### Langkah 2: Audit Kontrol Akses Berbasis Peran (*Divisional RBAC*)
1. **Pemeriksaan Otorisasi Endpoint**:
   - Verifikasi bahwa setiap route API di `backend-core` dilindungi middleware autentikasi JWT dan pengecekan role:
     - `Super Admin`: Akses penuh konfigurasi sistem & audit log.
     - `L&D Creator`: Akses pembuatan kursus dan upload dokumen divisi terkait.
     - `SME Reviewer`: Akses peninjauan dan persetujuan naskah/storyboard.
     - `Division Manager`: Akses dasbor analitik kepatuhan dan skill gap divisinya.
     - `Learner`: Akses tontonan materi terdaftar dan pengerjaan kuis.
2. **Isolasi Multi-Tenant / Divisi**:
   - Pastikan query database PostgreSQL menyertakan filter klausul divisi (`WHERE division_id = user.division_id`) untuk mencegah akses silang antar-divisi (*horizontal privilege escalation*).

---

### Langkah 3: Validasi Input & Pencegahan Injeksi
1. **Validasi Skema Ketat**:
   - Backend Go: Pastikan semua request body di-decode dan divalidasi dengan struct binding & tag validator ketat.
   - Python FastAPI: Pastikan seluruh payload menggunakan skema Pydantic dengan tipe data terdefinisi.
2. **SQL Injection Defense**:
   - Pastikan tidak ada query mentah string formatting (`fmt.Sprintf` atau `f-strings` di SQL). Semua query database wajib menggunakan parameter binding `pgx` (`$1, $2, ...`).
3. **Prompt Injection & Guardrails**:
   - Pastikan teks dari dokumen yang di-chunk disanitasi sebelum dimasukkan ke dalam template prompt LLM untuk mencegah injeksi instruksi liar dari dokumen yang diunggah.

---

### Langkah 4: Keamanan Pengunggahan Berkas (*Secure File Upload*)
1. **Validasi Tipe & Header Berkas**:
   - Validasi berkas upload bukan hanya dari ekstensi file, melainkan memeriksa *Magic Numbers / MIME Type* (hanya izinkan `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.openxmlformats-officedocument.presentationml.presentation`).
2. **Batasan Ukuran & Path Traversal**:
   - Terapkan batas ukuran maksimum upload (misal: 50MB).
   - Sanitasi nama berkas asli dan gunakan UUID unik untuk penyimpanan di MinIO S3 guna mencegah *directory traversal* (`../../`).

---

### Langkah 5: Pemindaian Kredensial & Secrets
1. **Pencegahan Kebocoran Kredensial**:
   - Pindai kode sumber untuk memastikan tidak ada hardcoded password, API token, secret key, atau database URI.
   - Pastikan berkas `.env`, kredensial cloud, dan file sertifikat pribadi terdaftar di `.gitignore`.
2. **Audit Logging Kepatuhan**:
   - Pastikan seluruh aksi penting (login, upload dokumen, approval SME, trigger render, dan perubahan role) dicatat ke tabel audit log yang *append-only*.

---

### Langkah 6: Laporan Audit Keamanan
Sajikan temuan audit dalam tabel ringkas:
- **Zero Data Egress Status**: Lulus / Temuan (Konfirmasi isolasi model lokal).
- **RBAC & Endpoint Protection**: Lulus / Temuan (Status middleware otorisasi).
- **Input & Upload Sanitation**: Lulus / Temuan (Status validasi dan MinIO S3 storage).
- **Secret Scanning**: Bersih (Tidak ada secret yang bocor ke git).
- **Rekomendasi Perbaikan**: Langkah remediasi spesifik jika terdeteksi celah keamanan.

