---
name: ui-check
description: Run the frontend app, open the modified page in browser, capture dual-viewport screenshots (1440px desktop & 390px mobile), detect visual/overflow/contrast bugs, and auto-fix them.
---

# /ui-check — Visual QA & Responsiveness Workflow

Gunakan workflow ini setelah melakukan perubahan antarmuka UI di `frontend-web` untuk memverifikasi keselarasan visual terhadap `rules/design.md` serta memastikan tidak ada bug rendering, horizontal overflow, atau masalah kontras.

---

## Tahapan Eksekusi

### Langkah 1: Verifikasi & Jalankan Aplikasi Frontend
1. Periksa apakah server pengembangan Next.js sudah berjalan di port `http://localhost:3000`.
2. Jika belum aktif, jalankan dev server di background:
   ```bash
   cd frontend-web
   pnpm dev
   ```
3. Tunggu hingga endpoint siap menerima koneksi HTTP (`200 OK`).

---

### Langkah 2: Buka Halaman Terkait & Ambil Screenshot Dua Viewport
Gunakan tool browser otomatis (Playwright MCP atau Playwright CLI) untuk menavigasi ke URL halaman yang baru dimodifikasi:

1. **Desktop Viewport (1440px)**:
   - Atur viewport browser: `width: 1440`, `height: 900`.
   - Buka URL target (contoh: `http://localhost:3000/courses` atau `http://localhost:3000/studio`).
   - Tunggu hingga seluruh aset, font (`Inter`, `IBM Plex Serif`), dan state selesai dimuat (*networkidle*).
   - Ambil screenshot full-page dan simpan ke:
     `.agent/screenshots/desktop-<page-name>.png`

2. **Mobile Viewport (390px)**:
   - Atur viewport browser ke standar mobile: `width: 390`, `height: 844` (skala iPhone 14/15).
   - Tunggu re-render selesai.
   - Ambil screenshot full-page dan simpan ke:
     `.agent/screenshots/mobile-<page-name>.png`

---

### Langkah 3: Audit Visual, Overflow & Kontras
Lakukan inspeksi visual dan komputasi DOM pada halaman:

1. **Deteksi Horizontal Overflow (Bocor Lebar)**:
   - Evaluasi script di browser:
     ```javascript
     document.documentElement.scrollWidth > window.innerWidth
     ```
   - Cari elemen yang menyebabkan overflow:
     ```javascript
     Array.from(document.querySelectorAll('*')).filter(el => el.getBoundingClientRect().right > window.innerWidth);
     ```
2. **Kesesuaian Desain (`rules/design.md`)**:
   - Pastikan kanvas utama menggunakan Night Canvas (`#13111C`).
   - Pastikan kontainer panel menggunakan `#1F132A` atau `#1C1A28` dengan batas transparan 1px (`#FFFFFF1A`).
   - Pastikan warna aksen konsisten menggunakan **Signature Purple** (`#853BCE`) dan teks headline hero menggunakan **IBM Plex Serif**.
3. **Pemeriksaan Kontras & Keterbacaan**:
   - Pastikan teks body (`#DCDCE0` / `#FFFFFF`) memiliki kontras rasio minimal 4.5:1 terhadap latar belakang gelap.
   - Pastikan tidak ada teks yang terpotong (*text clipping*) atau tombol yang bertumpukan (*overlapping elements*).

---

### Langkah 4: Perbaikan Bug Visual Otomatis
- Jika ditemukan masalah overflow, margin/padding yang rusak, atau salah warna:
  1. Identifikasi komponen TSX/CSS terkait di `frontend-web/components/` atau `frontend-web/app/`.
  2. Perbaiki class Tailwind CSS (misal: menambahkan `overflow-hidden`, `max-w-full`, atau menyesuaikan padding).
  3. Ambil ulang screenshot untuk memastikan bug telah tuntas teratasi.

---

### Langkah 5: Laporan Visual QA
Sajikan ringkasan hasil audit kepada pengguna:
- **Tautan Screenshot**: Path ke berkas desktop dan mobile screenshot.
- **Status Responsivitas**: Konfirmasi bebas overflow pada 1440px dan 390px.
- **Perbaikan yang Dilakukan**: Rincian penyesuaian styling jika sempat terjadi bug rendering.

