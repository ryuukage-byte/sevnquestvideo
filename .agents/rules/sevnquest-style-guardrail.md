# SevnQuest Visual Style Guardrail (STRICT RULE)

> **Sumber kebenaran: `SEVNQUEST.md` dan `AGENTS.md` di root repo.** Baca keduanya lebih dulu.
> Jika ada isi file ini yang bertentangan, `SEVNQUEST.md` yang berlaku.

> **ATURAN MUTLAK GAYA VISUAL SEVNQUEST**
> Seluruh video SevnQuest WAJIB mematuhi fondasi visual ini. Motion, transisi kamera, dan dinamika tipografi boleh berkembang sekreatif mungkin, TETAPI fondasi identitas visual berikut **TIDAK BOLEH BERUBAH ATAU DIHILANGKAN**:

---

## 1. Background Washi Malam Indigo (MANDATORY)
- Setiap video WAJIB me-render `<Background />` dari `src/shared/components/Background` di layer dasar `AbsoluteFill`.
- Elemen persisten di latar belakang:
  1. Base Fill: `#12151d` (`C.bg`)
  2. Radial Glow hangat di atas (`#1e2538`)
  3. Animasi **Sashiko Grid** (96×96 SVG dashed grid pattern melayang diagonal)
  4. **Watermark Aksara Kanji** (`日`, `食`, `学`, `道`, `言`, `塔`) melayang halus dengan opacity 4.5%.
- **DILARANG KERAS** mengganti background dengan gradien neon CSS polos atau menghilangkan sashiko grid & kanji watermark.

---

## 2. Palet Warna Resmi (MANDATORY)
Gunakan HANYA token warna dari `src/shared/theme.ts`:
- **Canvas Base**: `#12151d` (`C.bg`), Deep Void `#0b0d13` (`C.bgDeep`)
- **Card Surface**: `#1f242f` (`C.card`), Elevated `#2a3040` (`C.elevated`)
- **Kinako Gold (Utama)**: `#f0be52` (`C.gold`) untuk teks Jepang utama, furigana, timer, dan border aktif.
- **Indigo SevnQuest**: `#26314a` / `#6f93cf` (`C.indigo` / `C.indigoSoft`)
- **Sashiko Thread Motif**: `rgba(151,181,224, 0.35)` (`C.thread`)
- **Matcha Green**: `#4fae86` (`C.matcha`) untuk status benar / selesai / santai.
- **Hanko Red**: `#e2555b` (`C.hanko`) untuk stempel jepang miring -8°, penekanan penting, dan peringatan.
- **DILARANG** mengimpor warna cyan neon `#55DDF5` atau warna sci-fi cyber di luar palet SevnQuest.

---

## 3. Format Kartu Khas SevnQuest (MANDATORY)
Semua kartu pembelajaran tata bahasa/kata WAJIB memakai format `<GCard>` atau `<Surface>` dengan struktur:
1. **Inner Dashed Sashiko Border**: Garis jahitan tepi putus-putus (`border: 2px dashed ${C.thread}`).
2. **Bevel Taktil & Layered Shadow**: `0 20px 50px rgba(0,0,0,0.65)` dengan bevel lembut.
3. **Hierarki Konten Kartu**:
   - **Atas**: teks Jepang `FONT.jp` warna `C.gold` (tanpa pil — lihat di bawah)
   - **Tengah**: `<Label size={...} color={C.text}>= TERJEMAHAN KAPITAL</Label>`
   - **Bawah**: Penjelasan konsep 1-2 baris dengan highlight kata kunci (`<span style={{color: C.matcha}}>`).
- **DILARANG** mengganti format kartu ini dengan rounded box flat monoline tanpa jahitan sashiko.
- **DILARANG memakai pil/chip label** (`<Pill>` atau tiruannya): penghitung seperti `CONTOH 3 / 3`, label kategori, label status, pil aturan. Pengganti: label polos di dalam kartu, `<Stamp>`, atau kata kinetik besar (`SEVNQUEST.md` §12).

---

## 4. Karakter & Avatar Resmi (MANDATORY)
- WAJIB memakai komponen `Avatar` dari `src/shared/components/Avatar` yang membaca katalog avatar resmi Tier 1–10 di `public/avatars/`.
- Ekspresi emosi: `neutral`, `happy`, `confused`, `surprised`, `think`, `shocked`, dll.
- **DILARANG** menggambar karakter stick figure atau vektor SVG custom baru.

---

## 5. Standar Teknis & Lokasi File
- Resolusi: **1080 × 1920 (9:16)**
- Frame Rate: **30 FPS** (`FPS = 30` di `src/shared/theme.ts`)
- Lokasi proyek: Selalu di `src/videos/<nama-video>/` dengan `kit.tsx`, `timing.ts`, dan folder `scenes/` — tiru `src/videos/te-shimau/`.
- Produk jadi: `out/renders/<CompositionId>.mp4`; frame uji: `out/stills/<slug>/`.
- Komposisi di-registrasi di `src/Root.tsx`.
