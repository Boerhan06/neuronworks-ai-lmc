# Layer 2 — Backend Core & API Gateway

Ruang kerja **Dafa** untuk kodingan Golang (LMS Core, Manajemen Kursus, Enrollment, Tracking LRS).

### Tanggung Jawab:
- REST API Gateway & Routing
- Course & Module Management
- RBAC Divisi & Autentikasi
- LRS Dispatcher (xAPI / SCORM)
- Skill Gap Analyzer

### Menjalankan Server:
```bash
go run ./cmd/server
```
Port default: `8081` (atau `8080`). Endpoint health: `http://localhost:8081/health`.

