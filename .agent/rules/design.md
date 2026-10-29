# UI Design System & Guidelines — AI-LMC Enterprise

Pedoman desain antarmuka pengguna **AI Learning Management & Creator (AI-LMC) Enterprise** (Layer 1: Creator Studio, L&D Dashboard, dan Learner Portal Web). Wajib dipatuhi untuk menjaga konsistensi visual dan pengalaman pengguna enterprise.

---

## 1. Identitas Visual & Filosofi
- **Konsep**: *Dark-first developer & enterprise cloud*. Kanvas ungu-hitam pekat (*Night Canvas* `#13111C`), dipadukan dengan panel plum lembut (`#1F132A`), garis *charcoal hairline* (`#33323E`), teks putih dan tangga abu-abu dingin.
- **Aksen Tunggal**: **Signature Purple** (`#853BCE`) dan **Lilac** (`#A667E4`) untuk interaktivitas, link penting, status aktif, dan aksen CTA utama.
- **Tipografi Editorial & Utilitarian**: Memadukan **IBM Plex Serif** (500, *negative tracking*) untuk headline hero dengan **Inter** untuk 95% komponen UI, serta **JetBrains Mono** untuk stempel waktu, kode, dan takarir subtitle.
- **Kedalaman & Elevasi**: Mengutamakan *1px translucent hairline borders* dan *colored hover glow*, bukan bayangan hitam tebal.

---

## 2. Token Warna (Color Tokens)

### 2.1 Brand & Aksen
- `primary`: `#853BCE` (CTA primer, link aktif, border highlight)
- `primary-light`: `#A667E4` (Hover CTA primer, 2px focus ring)
- `primary-deep`: `#553F83` (Button hero Creator Studio)
- `info`: `#306EE8` (Info badge, step indicator, hover link info)
- `info-light`: `#82AAFF` (Indikator tab aktif, focus blue)
- `focus-ring`: `#99C8FF` (Cincin fokus keyboard)

### 2.2 Surface & Kanvas
- `surface`: `#13111C` (Kanvas utama / *Night Canvas*)
- `surface-raised`: `#1F132A` (Panel modul, popover, SME Review Gate)
- `surface-card`: `#1C1A28` (Kartu modul kursus, tile dokumen)
- `surface-elevated`: `#211F2D` (Tag, chip kuis, status bar media)
- `surface-translucent`: `#181622CC` (Drawer, backdrop video, sticky navbar)

### 2.3 Tangga Teks (Gray-Tone Ladder)
- `ink`: `#FFFFFF` (Judul bab, headline, tombol primer)
- `ink-soft`: `#F2F1F3` (Teks body utama, naskah narasi review)
- `body`: `#DCDCE0` (Label navigasi, daftar isi modul, paragraf)
- `muted-strong`: `#C4C4CA` (Subjudul kartu, header tabel, label form)
- `muted`: `#A1A0AB` (Deskripsi sekunder, ikon netral, chevron)
- `muted-2`: `#878593` (Metadata video, durasi, xAPI status)
- `muted-3`: `#6C6B7B` (Caption halus, timestamp scene, placeholder)
- `subtle`: `#545260` (Border non-aktif, tombol sekunder compact)

### 2.4 Status & Semantik
- `success`: `#367859` (Status passed/lulus kuis, xAPI record)
- `success-bright`: `#42946E` (Status online, badge modul selesai)
- `success-surface`: `#26543F` (Background chip status berhasil)
- `success-tint`: `#DFF1E9` (Teks di atas success-surface)
- `hairline`: `#33323E` (Garis batas solid input & divider)

---

## 3. Tipografi & Hirarki Teks

### 3.1 Font Family Stack
- **Serif Editorial**: `"IBM Plex Serif", serif` — Headline hero & judul modul (weight 500, tight tracking).
- **Sans-Serif UI**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` — Navigasi, kartu, form, dan narasi.
- **Display Sans**: `Inter Display, sans-serif` — Judul section fitur (32px / 500).
- **Monospace**: `JetBrains Mono, ui-monospace, Menlo, Consolas, monospace` — Kode, timestamp video, subtitle, badge model AI (`bge-m3`, `vLLM`).

### 3.2 Skala Tipografi
| Level | Font | Ukuran | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `hero-display` | IBM Plex Serif | 56px | 500 | 1.05 | -1.4px |
| `display-lg` | IBM Plex Serif | 54px | 500 | 1.1 | -1.96px |
| `display-md` | Inter | 40px | 600 | 1.25 | normal |
| `heading-display`| Inter Display | 32px | 500 | 1.5 | normal |
| `title-lg` | Inter | 24px | 400 | 1.35 | normal |
| `title-md` | Inter | 20px | 600 | 1.4 | normal |
| `title-sm` | Inter | 18px | 600 | 1.5 | normal |
| `lead` | Inter | 18px | 400 | 1.5 | normal |
| `body` | Inter | 16px | 400 | 1.65 | normal |
| `body-compact` | Inter | 16px | 400 | 1.5 | normal |
| `body-strong` | Inter | 16px | 500 | 1.5 | normal |
| `body-sm` | Inter | 14px | 400 | 1.45 | normal |
| `nav-link` | Inter | 14px | 500 | 1.45 | normal |
| `caption` | Inter | 12px | 400 | 1.5 | normal |
| `label` | Inter | 12px | 500 | 1.5 | normal |

---

## 4. Skala Geometri & Border Radius

- `rounded.xs` (4px): Badge mono model AI, tag sitasi dokumen (`[Hal: 4]`).
- `rounded.sm` (6px): Ghost button, dropdown nav, input field, chip tag, tabs.
- `rounded.md` (8px): Button CTA utama, kartu kuis, tile modul standar.
- `rounded.xl` (12px): Feature tile, panel SME Review Gate, video player.
- `rounded.2xl` (16px): Modal dialog besar, panel analitik L&D Dashboard.
- `rounded.full` (9999px): Status pill, avatar pengguna, titik indikator.

---

## 5. Spacing, Layout & Ritme Grid

### 5.1 Ritme Vertikal & Grid
- **Jeda Antar-Section**: `section-padding-y: 96px` untuk nafas visual antar bab.
- **Grid Gaps**:
  - `card-grid-gap`: 32px (katalog kursus 3 kolom).
  - `card-6-grid-gap`: 24px (feature tiles Creator Studio).
  - `card-8-grid-gap`: 16px (daftar modul & scene pipeline).
  - `card-9-grid-gap`: 12px (daftar kuis & indikator kompetensi).

### 5.2 Padding Komponen
- **Tombol Utama (CTA)**: `padding: 12px 24px` (tinggi ~46–50px).
- **Tombol Sekunder**: `padding: 8px 12px` (tinggi ~42px).
- **Tombol Ghost & Nav**: `padding: 6px 12px` (tinggi ~32–40px).
- **Input Field**: `padding: 8px 12px` (right padding 40px untuk ikon aksi).

---

## 6. Elevasi, Border & Efek Depth

1. **Batas Transparan 1px (*Hairline*)**:
   Gunakan `#FFFFFF1A` (10% white) pada kartu gelap `#1C1A28`, dan `#FFFFFF14` pada container sekunder. Hindari border abu-abu solid.
2. **Efek Hover Glow**:
   Tombol primer ungu memancarkan glow:
   `box-shadow: 0px 0px 8px 0px #B428B459, 0px 0px 24px 0px #662BDF59`.
3. **Fokus Aksesibilitas**:
   Cincin fokus keyboard menggunakan 2px ring `#A667E4` / `#99C8FF` dengan outline transparan 2px offset.
4. **Tanpa Frosted Glass Berlebihan**:
   Gunakan latar solid/semi-transparan `#181622CC` tanpa backdrop blur berat.

---

## 7. Standar Antarmuka Modul AI-LMC (PRD Mapping)

### 7.1 Creator Studio & SME Approval Gate
- **Tampilan Belah Layar (*Split Screen*)**:
  - Kolom kiri: Penampil dokumen PDF sumber dengan penanda sitasi aktif.
  - Kolom kanan: Naskah per scene, confidence score (`>= 80%`), opsi avatar/B-roll.
- **Tombol Persetujuan SME**: Tombol primer ungu (`#853BCE`, hover `#A667E4`) dengan label `"Setujui & Render Video"`.

### 7.2 Learner Portal Web & Video Player
- **Area Video**: Rasio 16:9 dengan bezel tipis hairline `#33323E`.
- **Panel AI Tutor**: Container `surface-raised` (`#1F132A`), input pertanyaan border `#FFFFFF1A`, bubble chat kontras.
- **Bank Kuis Interaktif**: Opsi kartu `rounded.md` border `#33323E`, menjadi `#853BCE` saat dipilih dan `#367859` saat benar.

### 7.3 L&D Dashboard & Tracking xAPI
- **Metrik Kartu**: Angka statistik `display-md` (40px Inter, weight 600, `#FFFFFF`), label `body-sm` (`#A1A0AB`).
- **Chip Status xAPI**: Pill (`rounded.full`), tinggi 24px, teks mono 12px (`success-bright`).

---

## 8. Konvensi Bahasa & Aksesibilitas
- **UI Copywriting**: Wajib **Bahasa Indonesia** standar enterprise yang aktif (contoh: *"Unggah Dokumen"*, *"Mulai Belajar"*, *"Lihat Sertifikat"*, *"Simpan Perubahan"*).
- **Kontras Rasio**: Teks `#FFFFFF` dan `#DCDCE0` di atas `#13111C` memenuhi WCAG AAA (> 7:1).

