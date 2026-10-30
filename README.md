# AI Learning Management & Creator (AI-LMC) Enterprise

Platform enterprise terintegrasi untuk otomatisasi konversi dokumen internal (SOP, regulasi, *product knowledge*) menjadi video pelatihan interaktif, integrasi LMS Core, dan pelacakan kompetensi karyawan (*closed-loop employee growth*) dengan kepatuhan **Zero Data Egress**.

---

## 1. Arsitektur 5 Layer & Pemetaan Ruang Kerja Tim

Sistem mengadopsi struktur modular monorepo berbasis **pnpm workspaces** yang dipetakan langsung ke tanggung jawab masing-masing anggota tim:

```
neuronworks-ai-lmc/
├── docs/                      # Dokumen bersama (PRD, keputusan arsitektur, roadmap, studi kasus)
├── frontend-web/              # [Layer 1] Ruang kerja Diki: Next.js 16 App Router (Creator Studio, Dashboard, Learner)
├── backend-core/              # [Layer 2] Ruang kerja Dafa: Golang (LMS Core API, Kursus, RBAC, LRS)
├── ai-orchestrator/           # [Layer 3] Ruang kerja Burhan & Zulfi: Python (Agen LLM, RAG, Ingestion, Scene Script)
├── gpu-worker/                # [Layer 4] Ruang kerja Davin: Python (Worker Lokal TTS, LatentSync, Video Gen, FFmpeg)
├── mobile-app/                # Ruang kerja Android Kotlin Native (Fase lanjutan)
├── packages/
│   ├── types/                 # @ai-lmc/types: Domain TypeScript types & interfaces
│   └── ui/                    # @ai-lmc/ui: Shared UI components (Night canvas #13111C)
├── infra/
│   └── docker-compose.yml     # [Layer 5] PostgreSQL 16 + pgvector, Redis 7, MinIO S3
├── rules/design.md            # UI design tokens (Night canvas #13111C, purple accent #853BCE)
├── .env.example               # Template variabel lingkungan enterprise
├── Makefile & make.cmd        # Runner otomatisasi pembangunan, pengujian, dan linting
└── pnpm-workspace.yaml        # Konfigurasi workspace pnpm
```

---

## 2. Port & Layanan Aktif

| Layanan | Komponen / Layer | URL / Port | Penanggung Jawab | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| **Web Portal** | Layer 1 Experience | `http://localhost:3000` | **Diki** | Studio Pembuat (`/studio`), Dasbor L&D (`/dashboard`), Portal Pembelajar (`/courses`). |
| **Backend Core** | Layer 2 LMS Core | `http://localhost:8081` | **Dafa** | Go REST API Gateway, endpoint `/health`, `/api/v1/courses`, dan otentikasi. |
| **AI Orchestrator** | Layer 3 Orchestrator | `http://localhost:8000` | **Burhan & Zulfi** | FastAPI pipeline naskah 5 adegan (180 detik), sitasi wajib, dan AI Tutor RAG. |
| **GPU Worker** | Layer 4 Media AI | `http://localhost:8002` | **Davin** | Worker GPU lokal untuk XTTS-v2, LatentSync lip-sync, dan render FFmpeg. |
| **PostgreSQL + pgvector** | Layer 5 Data | `localhost:5432` | Tim Infra | Basis data relasional enterprise dan vector store embedding `bge-m3`. |
| **Redis 7** | Layer 5 Cache/Queue | `localhost:6379` | Tim Infra | Message broker koordinasi antrean render dan VRAM GPU. |
| **MinIO Storage** | Layer 5 Object Storage | `http://localhost:9001` | Tim Infra | S3-compatible bucket on-premise (Console: 9001, API: 9000). |

---

## 3. Prasyarat Sistem

- **Node.js**: `v20+` & **pnpm**: `v10+` / `v12+`
- **Go**: `v1.22+` / `v1.23+`
- **Python**: `v3.11+` / `v3.12+`
- **Docker & Docker Compose** (untuk database dan storage lokal)

---

## 4. Panduan Cepat (Quickstart)

### 1. Salin Konfigurasi Lingkungan
```bash
cp .env.example .env
```

### 2. Pasang Dependensi
```bash
# Pasang dependensi frontend dan shared packages
pnpm install

# Pasang dependensi worker AI & GPU
python -m pip install -r ai-orchestrator/requirements.txt
python -m pip install -r gpu-worker/requirements.txt
```

### 3. Menjalankan Semua Layanan Secara Bersamaan
Gunakan perintah `dev` (didukung di Linux, macOS, WSL, serta Windows):

```bash
# Di PowerShell / CMD:
.\make dev
# atau langsung via pnpm:
pnpm dev
```

Perintah ini akan secara serentak menjalankan:
1. `frontend-web` di `http://localhost:3000`
2. `backend-core` di `http://localhost:8081`
3. `ai-orchestrator` di `http://localhost:8000`

---

## 5. Menjalankan Pengujian & Kualitas Kode

```bash
# Jalankan seluruh unit test suite (Go + Python AI Orchestrator + Python GPU Worker)
pnpm test
# atau:
.\make test

# Jalankan ESLint (0 errors, 0 warnings)
pnpm lint
# atau:
.\make lint

# Jalankan validasi TypeScript ketat
pnpm typecheck
# atau:
.\make typecheck
```
