# hyperframes/

Proyek video berbasis HTML (Hyperframes) — alternatif Remotion untuk video yang lebih cocok dibuat sebagai HTML/GSAP. Satu proyek = satu folder `hyperframes/<slug>/`, dan jalankan perintahnya dari dalam folder itu.

## Mulai

```bash
npx hyperframes init hyperframes/<slug>
cd hyperframes/<slug>
npx hyperframes lint
npx hyperframes check
npx hyperframes preview
npx hyperframes render --quality looks --output ../../out/renders/<slug>.mp4
```

Pakai `--quality draft` saat iterasi dan `--quality delivery` untuk hasil akhir.

## Memakai aset SevnQuest

Aset tunggal ada di `public/` (lihat [docs/asset-system.md](../docs/asset-system.md)). Proyek Hyperframes harus self-contained, jadi **salin** yang dibutuhkan ke `hyperframes/<slug>/assets/`:

```bash
mkdir hyperframes/<slug>/assets
cp public/brand/logo.png public/audio/sfx/whoosh.wav hyperframes/<slug>/assets/
```

Token desain (warna, font, zona aman 9:16) ada di `src/shared/theme.ts`, jadi tampilannya tetap sama dengan video Remotion.
