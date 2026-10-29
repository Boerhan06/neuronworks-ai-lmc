# Referensi Teknologi & Model AI (Layer 4 & 5)

Dokumen ini mencatat daftar kandidat teknologi, pustaka, dan model AI lokal untuk implementasi **Layer 4 (GPU Lokal Generation)** dan **Layer 5 (Knowledge & Data)** pada fase berikutnya.

---

## 1. Matriks Evaluasi Kandidat

| Kebutuhan Sistem | Kandidat Pustaka / Model | Lisensi Kode / Bobot | Catatan Lisensi & Kesiapan Produksi |
| :--- | :--- | :--- | :--- |
| **Parser Dokumen** | **Docling (IBM)** | MIT | Sangat direkomendasikan. Ekstraksi PDF, layout-aware, tabel, dan OCR terintegrasi. |
| | **Marker** | GPL-3.0 | Performa cepat untuk ekstraksi Markdown, perhatikan batasan lisensi GPL jika diintegrasikan langsung. |
| | **Unstructured** | Apache-2.0 | Pustaka ETL dokumen standar untuk RAG; mendukung banyak format berkas. |
| **Embedding & Vector DB** | **BAAI/bge-m3** (via `FlagEmbedding`) | MIT | Model embedding dense + sparse + multi-vector terbaik untuk Bahasa Indonesia & Inggris (konteks 8k). |
| | **pgvector** | PostgreSQL | Integrasi langsung dengan PostgreSQL; minim overhead operasional server. |
| | **Qdrant** | Apache-2.0 | Vector DB mandiri performa tinggi (Rust), cocok jika skala dokumen melampaui jutaan chunk. |
| **STT / Subtitle** | **faster-whisper** (`Whisper large-v3`) | MIT | Inferensi CTranslate2 4x lebih cepat dari OpenAI Whisper standar dengan VRAM lebih hemat. |
| **Text-to-Speech (TTS)** | **F5-TTS** | MIT | Non-autoregressive, Flow Matching, cepat, suara natural dengan referensi audio pendek. |
| | **CosyVoice** (Alibaba) | Apache-2.0 | Sintesis multi-bahasa dengan kontrol emosi dan intonasi ekspresif. |
| | **XTTS-v2** (Coqui) | CPML (*Coqui Public Model License*) | **Perhatian**: Lisensi non-komersial secara default. Perlu izin komersial khusus jika dipakai untuk enterprise komersial. |
| **Avatar Lip-Sync** | **LatentSync** (ByteDance) | Apache-2.0 | Sinkronisasi berbasis difusi ruang laten, sangat tajam tanpa artefak blur di area bibir. |
| | **MuseTalk** (Tencent) | MIT | Real-time inpainting dengan ekspresi alami dan gerakan kedipan mata. |
| **Video Gen (B-Roll)** | **Wan 2.1** (Alibaba WanX) | Apache-2.0 | Model open-weights generasi video mutakhir dengan ketajaman dan stabilitas gerakan tinggi. |
| | **HunyuanVideo** (Tencent) | Apache-2.0 | Arsitektur Diffusion Transformer resolusi tinggi. |
| | **LTX-Video** (Lightricks) | Open Video License | Dioptimalkan untuk inferensi cepat pada GPU server. |
| **Queue & Worker** | **asynq** (Go + Redis) | MIT | Antrean tugas terdistribusi untuk Golang; performa tinggi dan ringan. |
| | **BullMQ** (Node.js / Redis) | MIT | Alternatif antrean berbasis Redis jika ada orkestrasi di ekosistem Node. |
| **xAPI / SCORM** | **Learning Locker** | GPL-3.0 | Referensi arsitektur LRS (*Learning Record Store*) open-source untuk penerimaan data xAPI. |
| | **scorm-again** | MIT | Player runtime JavaScript untuk paket SCORM 1.2 dan SCORM 2004. |
| **Referensi Data LMS** | **Frappe LMS** | GPL-3.0 | Arsitektur data course, modul, kuis, dan enrollment yang modern dan bersih. |
| | **Moodle** | GPL-3.0 | Referensi skema RBAC dan evaluasi akademik skala besar. |
| | **Open edX** | AGPL | Referensi modul hierarki kursus berskala enterprise. |

---

## 2. Peringatan Penting Kepatuhan Lisensi Enterprise (*Commercial Safeguard*)

1. **Model Generasi Audio (TTS)**:
   - Hindari penggunaan bobot model berlisensi non-komersial (*Non-Commercial / Research-Only*) seperti Coqui CPML tanpa lisensi khusus. Prioritaskan model berlisensi komersial terbuka (**F5-TTS** atau **CosyVoice**).
2. **Model Video & Diffusion Weights**:
   - Selalu periksa lisensi bobot (*model weights*) sebelum mengunduh dari HuggingFace, karena lisensi kode repositori (misal MIT/Apache) kadang berbeda dengan lisensi bobot modelnya.
3. **Data Egress Guard**:
   - Seluruh model di atas wajib dapat dijalankan secara mandiri (*self-hosted*) menggunakan GPU lokal (NVIDIA CUDA / Triton / vLLM) tanpa ada panggilan jaringan ke cloud provider eksternal.

