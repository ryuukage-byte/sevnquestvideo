# Asset System

`public/` adalah **satu-satunya** tempat aset. Remotion menyajikannya lewat `staticFile('<path>')`; Hyperframes menyalin dari sini ke proyeknya (lihat [hyperframes/README.md](../hyperframes/README.md)). Tidak ada salinan lain — jangan buat folder aset kedua.

```text
public/
├── brand/
│   ├── logo.png                 # logo asli (kompas + goresan perak), 512×512
│   └── fonts/                   # 19 file woff2, dimuat offline oleh ensureFonts()
├── avatars/
│   ├── male/tier-1..10.png
│   ├── female/tier-1..10.png
│   └── expressions/
│       ├── male/male_01_neutral.png … male_16_sleepy.png
│       └── female/female_01_neutral.png … female_16_sleepy.png
└── audio/
    ├── sfx/                     # 16 SFX prosedural (click, pop, ding, whoosh, chime, …)
    ├── voice/                   # voice-over per video: <slug>.wav
    └── music/                   # BGM (kosong)
```

Data non-visual yang dibaca kode (bukan lewat `staticFile`): `src/shared/data/` (stroke kanji HanziWriter).

## Aturan

1. **Cek dulu, baru tambah.** Jangan upload ulang atau membuat duplikat.
2. **Satu sumber.** Aset hanya hidup di `public/`. Tidak ada `assets/` terpisah.
3. **Path lewat `staticFile`.** Jangan `import` PNG/WAV dari `src/`.
4. **Penamaan:** huruf kecil, tanda hubung (`tier-3.png`, `kunyomi-onyomi.wav`). Untuk seri bernomor pakai angka berurutan. Lihat [naming-convention.md](naming-convention.md).
5. **Voice-over** diberi nama sama dengan slug video: `public/audio/voice/<slug>.wav`.
6. **Aset sementara / hasil render** masuk `out/`, bukan `public/`.
