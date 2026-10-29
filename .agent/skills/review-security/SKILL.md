---
name: review-security
description: Audit RBAC, input validation, secure file uploads, secret leaks, and data boundary compliance (zero external data egress for confidential enterprise data).
---

# /review-security — Security & Data Boundary Audit Workflow

Gunakan skill ini untuk mengaudit kedaulatan data lokal (*Zero Data Egress*), kontrol akses divisi (*RBAC*), sanitasi input & upload, serta pencegahan kebocoran kredensial.

---

## Tahapan Eksekusi

### Langkah 1: Kedaulatan Data Lokal (*Zero Data Egress*)
- Verifikasi seluruh model menggunakan interface `Provider` (`LocalProvider` default).
- Pastikan tidak ada panggilan langsung ke API AI publik eksternal untuk data internal/rahasia.

---

### Langkah 2: Audit RBAC Divisi
- Pastikan endpoint dilindungi autentikasi JWT dan pengecekan role (`Super Admin`, `L&D Creator`, `SME Reviewer`, `Division Manager`, `Learner`).
- Pastikan isolasi multi-divisi (`division_id`).

---

### Langkah 3: Validasi Input & Pencegahan Injeksi
- Validasi payload request (Pydantic / Go struct binding).
- Hindari raw string SQL, gunakan parameterized query (`$1, $2`).
- Sanitasi prompt chunk RAG untuk mencegah prompt injection.

---

### Langkah 4: Keamanan File Upload & Secrets
- Periksa MIME type / Magic number untuk PDF, DOCX, PPTX.
- Gunakan UUID di MinIO S3 (cegah path traversal).
- Pindai repo: tidak ada secrets / passwords di commit, `.env` wajib masuk `.gitignore`.

