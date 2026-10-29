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
   - Web Frontend: `cd frontend-web && pnpm lint`
   - Backend Core (Go): `cd backend-core && golangci-lint run`
   - Python Services (`ai-orchestrator` & `gpu-worker`): `ruff check . && black --check .`

2. **Validasi Tipe (Type Checking)**:
   - Web Frontend: `cd frontend-web && pnpm exec tsc --noEmit`
   - Python Services: `mypy .`

3. **Pengujian Otomatis (Testing Suite)**:
   - Frontend: `cd frontend-web && pnpm test`
   - Backend Go: `cd backend-core && go test -v ./...`
   - Python: `pytest`

---

### Langkah 2: Perbaikan Otomatis (*Auto-Fix & Remediation*)
- Jika ditemukan error: analisa output, perbaiki kode sumber, dan ulangi sampai 100% lulus.

---

### Langkah 3: Pembaruan Dokumentasi & Changelog
1. Perbarui `README.md` modul terkait dan `CHANGELOG.md` root.

---

### Langkah 4: Pembuatan Commit Konvensional
1. Stage berkas terverifikasi (`git add`).
2. Buat commit Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).

---

### Langkah 5: Ringkasan Rilis (*Ship Summary*)
Berikan ringkasan hasil linting, tests, berkas terubah, dan commit hash.

