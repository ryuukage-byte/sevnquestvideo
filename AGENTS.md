# AGENTS.md — Aturan kerja untuk semua AI di repo ini

Repo produksi video SevnQuest (Remotion, 9:16, 1080×1920, 30 fps).
Tujuan aturan ini: siapa pun yang mengerjakan — AI mana pun — menghasilkan video dengan **kualitas dan gaya yang sama**.

## Urutan baca (wajib, sebelum menulis kode)

1. **[SEVNQUEST.md](SEVNQUEST.md)** — gaya baku: background, warna, font, kartu jahitan, karakter, subtitle, CTA, larangan. Ini sumber kebenaran; jika dokumen lain bertentangan, SEVNQUEST.md yang berlaku.
2. **`src/videos/te-shimau/`** — implementasi acuan. Strukturnya yang ditiru.
3. Storyboard dari pengguna — menentukan isi, timing, dan tema motion.

## Peta folder

| Folder | Isi | Aturan |
|---|---|---|
| `src/videos/<slug>/` | **Kode satu video.** `<Pascal>Video.tsx`, `timing.ts`, `kit.tsx`, `props.tsx`, `scenes/` | Satu folder per video, slug kebab-case. Jangan mengubah folder video lain. |
| `src/shared/` | Kit bersama: tema, easing, font, `Background`, `Avatar`, `Surface`, `Stamp`, `Logo`, `Sfx` | Sumber tunggal gaya. Jangan diubah untuk kebutuhan satu video. |
| `src/Root.tsx` | Daftar composition | Tambah dua entri per video: `SevnQuest<Pascal>` dan `SevnQuest<Pascal>Clean`. Jangan menghapus entri lain. |
| `public/` | **Satu-satunya perpustakaan aset** | `brand/` logo + font · `avatars/` karakter resmi · `audio/voice/<slug>.wav` narasi · `audio/sfx/` · `audio/music/`. Cek dulu sebelum menambah; jangan duplikat. |
| `content/<slug>/` | Storyboard + naskah VO per video (`storyboard.md`) | Simpan storyboard dari pengguna di sini. |
| `out/renders/` | **Produk jadi** — hanya file `.mp4` final | Nama file = ID composition (`SevnQuestTeShimau.mp4`, `…Clean.mp4`). Tidak ada gambar atau klip uji di sini. |
| `out/stills/<slug>/` | Frame uji / QA | Selalu di subfolder slug; tidak ada file lepas di `out/`. |
| `docs/` | Dokumentasi pendukung; `docs/reference/` = contoh frame & contoh yang dilarang | Tidak menggantikan SEVNQUEST.md. |
| `scripts/` | `new-video.mjs`, `render.mjs`, alat analisis audio | |
| `Raw/` | Bahan mentah dari pengguna (VO asli, referensi) | Hanya dibaca. Salin yang dipakai ke `public/`. |
| `archive/` | Sisa lama, duplikat, draf yang tidak dipakai | Jangan diimpor dari `src/`. Jangan menghapus tanpa izin pengguna. |
| `hyperframes/` | Proyek HTML alternatif (belum dipakai) | Hanya jika pengguna memintanya. |

Kode lama di `src/animation`, `src/components`, `src/compositions`, `src/scenes`, `src/styles`, `src/timeline` adalah sisa video そう versi pertama. **Jangan dipakai untuk video baru** dan jangan dipindah — sebagian masih diimpor video lama.

## Aturan kerja

1. **Gaya dikunci.** Yang boleh menyesuaikan storyboard hanya efek, motion, transisi, dan properti cerita.
2. **Tidak ada pil/chip label**, tidak memakai `<Pill>` (SEVNQUEST.md §12).
3. **Timing dari audio.** Durasi = `Math.ceil(detik_VO × 30)`. Jangan menambah durasi di luar narasi.
4. **Aset hanya dari `public/`.** Karakter hanya `Avatar` resmi; tidak menggambar karakter baru.
5. **Satu video = satu folder.** Kebutuhan khusus video ditulis di folder video itu, bukan di `src/shared`.
6. **Tidak ada file sementara yang tertinggal** di `src/`, root, atau `out/`.
7. **Jangan menghapus** file pengguna atau hasil render. Yang tidak dipakai dipindah ke `archive/`.

## Pemeriksaan sebelum menyerahkan

- [ ] `npx tsc --noEmit` — tidak ada error dari folder video ini maupun `Root.tsx`
- [ ] Still diperiksa di **setiap scene dan setiap transisi** (`npm run still -- <Id> out/stills/<slug>/f<frame>.png --frame=<n>`)
- [ ] Tidak ada teks terpotong, tumpang-tindih, atau keluar zona aman (konten y 200–1440, subtitle y 1470–1640)
- [ ] Semua kanji berfurigana; teks Jepang memakai `FONT.jp`
- [ ] Tidak ada pil label; CTA sesuai SEVNQUEST.md §11
- [ ] Dua render selesai: `npm run render -- SevnQuest<Pascal>` dan `…Clean`, durasi video = durasi VO
- [ ] Laporkan dengan jujur hal yang tidak bisa diverifikasi (mis. tampilan fitur produk yang sebenarnya)

## Perintah

```bash
npm run dev
```

```bash
npm run render -- SevnQuestTeShimau
```

```bash
npm run still -- SevnQuestTeShimau out/stills/te-shimau/f300.png --frame=300
```
