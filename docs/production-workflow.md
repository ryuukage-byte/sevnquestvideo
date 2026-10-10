# SevnQuest Video Production Workflow

Alur dari storyboard sampai video jadi. Engine default: **Remotion** (`src/`). Engine alternatif: **Hyperframes** (`hyperframes/`). Aset, subtitle, dan voice-over dipakai bersama oleh keduanya.

```text
STORYBOARD  →  content/<slug>/storyboard.md
    ↓
ASET        →  public/            (logo, font, avatar, SFX, voice-over — pakai yang sudah ada)
    ↓
KOMPOSISI   →  src/videos/<slug>/ (Remotion)   atau   hyperframes/<slug>/
    ↓
PREVIEW     →  npm run dev
    ↓
RENDER      →  out/renders/<CompositionId>.mp4   (master + Clean)
    ↓
PUBLISH     →  upload; file final tetap di out/renders/
```

---

## 1. Storyboard & naskah (`content/<slug>/`)

Satu folder per video. `npm run new-video` membuatkan `storyboard.md` berisi tabel: nomor scene, rentang detik, visual, VO/subtitle. Timestamp di tabel ini langsung jadi angka di `timing.ts`.

Pola storyboard 9:16 yang sudah terbukti (± 50 detik):

```text
00:00 – 00:04   Hook (masalah / pertanyaan)
00:04 – 00:10   Konsep inti
00:10 – 00:30   Contoh & perbandingan
00:30 – 00:45   Aturan / pola / pengecualian
00:45 – 00:50   Produk SevnQuest + CTA (logo, tombol emas, URL)
```

## 2. Aset (`public/`)

Cari dulu di `public/`; **jangan upload ulang / membuat duplikat**.

| Butuh | Lokasi | Dipakai lewat |
| :--- | :--- | :--- |
| Logo | `public/brand/logo.png` | `<LogoMark />`, `<Wordmark />` |
| Font | `public/brand/fonts/` | `ensureFonts()` (otomatis) |
| Avatar tier 1–10 | `public/avatars/{male,female}/tier-N.png` | `<Avatar tier={N} />` |
| Avatar ekspresi (16) | `public/avatars/expressions/{male,female}/` | `<Avatar expression="happy" />` |
| SFX (16) | `public/audio/sfx/*.wav` | `<Sfx name="whoosh" at={frame} />` |
| Voice-over | `public/audio/voice/<slug>.wav` | `<Audio src={staticFile(...)} />` |
| Musik | `public/audio/music/` | — |
| Data stroke kanji | `src/shared/data/*.json` | `<KanjiStroke />` |

Aset baru: taruh di folder kategori yang sama, nama huruf kecil dengan tanda hubung.

## 3. Komposisi (Remotion)

```bash
npm run new-video -- <slug> "Judul"
```

Skrip ini menyalin `src/videos/_template/`, mendaftarkan composition master + Clean di `src/Root.tsx`, dan membuat `content/<slug>/storyboard.md`. Detail struktur ada di [README](../README.md).

Dua pola komposisi yang dipakai:

1. **Sequence per scene** (default; lihat `_template`, `kunyomi-onyomi`, `shoku`): tiap scene = satu komponen dalam `<Sequence>`, dibungkus `SceneShell` (fade + subtitle).
2. **Virtual world + kamera** (lihat `houga-ta`, `teiru`, `sou`): kanvas UI besar yang dijelajahi kamera virtual.

## 4. Format & zona aman

Default **9:16, 1080 × 1920, 30 fps** (`src/shared/theme.ts`: `W`, `H`, `FPS`). Konten di y 200–1440, subtitle di y 1470–1640 (`SAFE`). Teks Jepang wajib pakai `FONT.jp`.

## 5. Render ganda

Setiap video punya dua composition:

- **`SevnQuest<Nama>`** — master: subtitle + SFX (+ voice-over bila ada).
- **`SevnQuest<Nama>Clean`** — tanpa subtitle (`captions: false`), untuk b-roll / dubbing / caption lokal.

```bash
npm run render                       # daftar composition
npm run render -- SevnQuestShoku     # → out/renders/SevnQuestShoku.mp4
npm run still -- SevnQuestShoku out/stills/x.png --frame=300
```

## 6. Output (`out/`, di-ignore git)

- `out/renders/` — MP4 hasil render
- `out/stills/` — PNG pengecekan frame

## Dokumen terkait

- [Production DNA](production-dna.md) — identitas visual, motion, audio
- [Remotion Reference](remotion-reference.md) — katalog komponen & teknik
- [Visual Style](visual-style.md) — gaya Washi Scroll
- [Asset System](asset-system.md) · [Naming](naming-convention.md)
