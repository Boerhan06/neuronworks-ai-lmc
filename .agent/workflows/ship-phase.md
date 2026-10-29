---
name: ship-phase
description: Run automated quality checks (lint, typecheck, tests), fix errors, update documentation/changelog, and create a conventional commit.
---

# /ship-phase — Quality Assurance & Release Workflow

Gunakan workflow ini setiap kali sebuah fase fitur, refaktor, atau modul selesai dikerjakan untuk memastikan kepatuhan penuh terhadap **Definition of Done (DoD)** yang didefinisikan di `AGENTS.md`.

---

## Tahapan Eksekusi

### Langkah 1: Jalankan Audit Kualitas Otomatis
Jalankan pemeriksaan kode pada modul yang terpengaruh:

1. **Linting & Code Formatting**:
   - Web Frontend:
     ```bash
     cd frontend-web
     pnpm lint
     ```
   - Backend Core (Go):
     ```bash
     cd backend-core
     golangci-lint run
     ```
   - Python Services (`ai-orchestrator` & `gpu-worker`):
     ```bash
     ruff check .
     black --check .
     ```

2. **Validasi Tipe (Type Checking)**:
   - Web Frontend:
     ```bash
     cd frontend-web
     pnpm exec tsc --noEmit
     ```
   - Python Services:
     ```bash
     mypy .
     ```

3. **Pengujian Otomatis (Testing Suite)**:
   - Frontend tests:
     ```bash
     cd frontend-web
     pnpm test
     ```
   - Backend Go tests:
     ```bash
     cd backend-core
     go test -v ./...
     ```
   - Python tests:
     ```bash
     pytest
     ```

---

### Langkah 2: Perbaikan Otomatis (*Auto-Fix & Remediation*)
- Jika ditemukan error atau peringatan pada Langkah 1:
  1. Analisis log error secara detail.
  2. Lakukan perbaikan langsung pada kode sumber yang bermasalah.
  3. Ulangi Langkah 1 hingga seluruh suite pemeriksaan lulus 100% tanpa error (*zero failure*).

---

### Langkah 3: Pembaruan Dokumentasi & Changelog
1. Periksa berkas apa saja yang telah dibuat atau diubah (`git status --short`).
2. Perbarui berkas `README.md` pada modul terkait jika terdapat endpoint baru, variabel `.env.example`, atau instruksi setup.
3. Catat ringkasan pembaruan pada berkas `CHANGELOG.md` root di bawah rilis yang aktif.

---

### Langkah 4: Pembuatan Commit Konvensional
1. Pastikan tidak ada berkas rahasia (`.env`, credentials, secrets) yang masuk ke staging.
2. Tambahkan berkas yang telah diverifikasi:
   ```bash
   git add <files>
   ```
3. Buat commit menggunakan format **Conventional Commits**:
   - `feat(<scope>): <deskripsi fitur baru>`
   - `fix(<scope>): <deskripsi perbaikan bug>`
   - `refactor(<scope>): <restrukturisasi kode>`
   - `test(<scope>): <penambahan uji coba>`
   - `docs(<scope>): <pembaruan dokumentasi>`
   - `chore(<scope>): <pemeliharaan dependensi / build>`

---

### Langkah 5: Ringkasan Rilis (*Ship Summary*)
Berikan laporan singkat dan terstruktur kepada pengguna:
- **Status Pemeriksaan**: Hasil lint, typecheck, dan unit test (100% lulus).
- **Daftar Berkas Terubah**: Komponen, model, atau modul yang diperbarui.
- **Pesan Commit**: ID hash dan pesan commit konvensional yang dibuat.

