# Layer 4 — GPU Worker (Media Synthesis Engine)

Ruang kerja **Davin** untuk pengeksekusi model lokal on-premise.

### Tanggung Jawab:
1. **Text-to-Speech (TTS)**: XTTS-v2 / F5-TTS / CosyVoice.
2. **Avatar Lip-Sync**: LatentSync / MuseTalk.
3. **Video B-Roll**: Wan 2.1 / Hunyuan Video / LTX-Video.
4. **Whisper STT Subtitles**: `faster-whisper` (`large-v3`).
5. **Compositing**: FFmpeg NVENC (NVIDIA GPU Acceleration).

### Menjalankan Worker:
```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8002 --reload
```

