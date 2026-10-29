---
name: ui-check
description: Run the frontend app, open the modified page in browser, capture dual-viewport screenshots (1440px desktop & 390px mobile), detect visual/overflow/contrast bugs, and auto-fix them.
---

# /ui-check — Visual QA & Responsiveness Workflow

Gunakan skill ini setelah melakukan perubahan antarmuka UI di `frontend-web` untuk memverifikasi keselarasan visual terhadap `rules/design.md` serta memastikan tidak ada bug rendering, horizontal overflow, atau masalah kontras.

---

## Tahapan Eksekusi

### Langkah 1: Jalankan Frontend App
- Pastikan dev server berjalan di `http://localhost:3000` (`pnpm dev`).

---

### Langkah 2: Ambil Screenshot Dua Viewport
1. **Desktop (1440px)**: Simpan ke `.agent/screenshots/desktop-<page>.png`.
2. **Mobile (390px)**: Simpan ke `.agent/screenshots/mobile-<page>.png`.

---

### Langkah 3: Deteksi Masalah Visual
1. Periksa horizontal overflow (`scrollWidth > innerWidth`).
2. Periksa kesesuaian palet `#13111C` Night Canvas, `#853BCE` Signature Purple, dan tipografi `IBM Plex Serif` / `Inter`.
3. Periksa rasio kontras teks (WCAG AAA).

---

### Langkah 4: Perbaiki & Verifikasi
- Perbaiki styling Tailwind CSS yang bermasalah dan ambil screenshot ulang hingga tuntas.

