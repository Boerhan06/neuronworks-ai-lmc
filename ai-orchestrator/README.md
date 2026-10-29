# Layer 3 — AI Orchestrator

Ruang kerja **Anda & Zulfi** untuk skrip Python pemroses agen LLM, Job Queue, Document Parser, dan RAG.

### Tanggung Jawab:
- Ingestion Dokumen SOP & Ekstraksi Struktur (Layer 5)
- RAG Embeddings (`bge-m3`) & Grounding Dokumen
- Generator Kurikulum & Naskah Per Adegan (5 Adegan / 180s)
- Sitasi Wajib Dokumen Sumber (`[Dokumen.pdf, Hal: X]`)
- SME Approval Checkpoint Gate sebelum Render GPU

### Menjalankan Orchestrator:
```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Endpoint health: `http://127.0.0.1:8000/health`.

