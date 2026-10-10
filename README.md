# SevnQuest-Video

Repositori produksi video SevnQuest (9:16, 1080×1920, 30 fps) dengan **Remotion**.
Semua video berbagi satu kit (`src/shared`), satu perpustakaan aset (`public/`), dan satu gaya baku.

## Mulai dari sini

| Dokumen | Untuk apa |
|---|---|
| **[SEVNQUEST.md](SEVNQUEST.md)** | Gaya baku video — background, warna, font, kartu, karakter, subtitle, CTA, larangan |
| **[AGENTS.md](AGENTS.md)** | Peta folder, aturan kerja, dan daftar periksa untuk AI/pembuat video |
| `src/videos/te-shimau/` | Implementasi acuan yang ditiru video baru |

## Struktur

```text
SevnQuest-Video/
├── SEVNQUEST.md · AGENTS.md    # aturan (baca dulu)
├── src/
│   ├── Root.tsx                # daftar composition
│   ├── shared/                 # kit bersama: tema, easing, font, komponen
│   └── videos/<slug>/          # KODE — satu folder per video
├── public/                     # ASET — satu-satunya perpustakaan
│   ├── brand/                  #   logo, fonts/
│   ├── avatars/                #   karakter resmi + ekspresi
│   └── audio/                  #   voice/<slug>.wav, sfx/, music/
├── content/<slug>/             # STORYBOARD + naskah VO
├── out/
│   ├── renders/                # PRODUK JADI (.mp4 final)
│   └── stills/<slug>/          # frame uji / QA
├── docs/                       # dokumentasi pendukung + reference/
├── scripts/                    # new-video, render, analisis audio
├── Raw/                        # bahan mentah dari pengguna
└── archive/                    # sisa lama & duplikat
```

## Perintah

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run render -- SevnQuestTeShimau
```

`npm run render` tanpa argumen menampilkan daftar composition. Hasil masuk ke `out/renders/<Id>.mp4`.

## Katalog video

Produk jadi ada di `out/renders/`.

| Video | Slug | Composition | Narasi | File jadi |
|---|---|---|---|---|
| ～てしまう **(gaya acuan)** | `te-shimau` | `SevnQuestTeShimau` · `…Clean` | `te-shimau.wav` | `SevnQuestTeShimau.mp4` · `SevnQuestTeShimauClean.mp4` |
| ～ておく (persiapan atau membiarkan) | `te-oku` | `SevnQuestTeOku` · `…Clean` | `te-oku.wav` | `SevnQuestTeOku.mp4` · `SevnQuestTeOkuClean.mp4` |
| Grammar Fusion (なければならない) | `grammar-fusion` | `SevnQuestGrammarFusion` · `…Clean` | `grammar-fusion.wav` | `sevnquest_grammar_fusion.mp4` |
| Bentuk ない | `nai-form` | `SevnQuestNai` · `…Clean` | `nai.wav` | `SevnQuestNai.mp4` · `SevnQuestNaiClean.mp4` |
| Mulai Dari Mana | `mulai-dari-mana` | `SevnQuestMulaiDariMana` · `…Clean` | `mulai-dari-mana.wav` | `sevnquest-mulai-dari-mana.mp4` |
| そう | `sou` | `SevnQuestSou` | — | `sevnquest-sou.mp4` |
| ている | `teiru` | `SevnQuestTeiru` | — | `sevnquest_teiru_not_always_sedang.mp4` |
| たほうがいい | `houga-ta` | `SevnQuestHougaTa` | — | `sevnquest-houga-ta.mp4` |
| ほうがいい (る vs た) | `houga-ii` | `SevnQuestHougaIi` | — | `sevnquest_vru_vs_vta_houga_ii.mp4` |
| Kunyomi vs Onyomi | `kunyomi-onyomi` | `KunyomiOnyomiVideo` · `…Clean` | `kunyomi-onyomi.wav` | `KunyomiOnyomiVideo.mp4` |
| 食 | `shoku` | `SevnQuestShoku` · `…Clean` | `shoku.wav` | `sevnquest-shoku.mp4` |
| Pasang di iPhone | `iphone` | `SevnQuestIPhone` · `…Clean` | `iphone.wav` | `sevnquest-iphone.mp4` |
| 会う vs 合う | `au` | `SevnQuestAuDiff` · `…Clean` | — | `sevnquest-au-diff.mp4` · `sevnquest-au-diff-clean.mp4` |
| Beres-beres | `beres-beres` | `SevnQuestBeresBeres` | — | belum dirender |

Video sebelum `te-shimau` dibuat dengan gaya dan penamaan file yang berbeda-beda; jangan dijadikan acuan.
Mulai sekarang nama file jadi = ID composition.

## Dokumentasi pendukung

- [Production Workflow](docs/production-workflow.md) · [Naming Convention](docs/naming-convention.md)
- [Production DNA](docs/production-dna.md) · [Visual Style](docs/visual-style.md) — latar belakang historis; kalah oleh SEVNQUEST.md bila bertentangan
- [Remotion Reference](docs/remotion-reference.md) · [Asset System](docs/asset-system.md)
- [Hyperframes](hyperframes/README.md)
