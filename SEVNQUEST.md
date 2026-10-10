# SEVNQUEST.md — Gaya Baku Video SevnQuest

> **Baca ini sebelum membuat video baru.** Dokumen ini mengunci gaya yang dipakai di video
> `～てしまう` (`src/videos/te-shimau/`, render: `out/renders/SevnQuestTeShimau.mp4`).
> Video berikutnya harus **terlihat persis seperti itu**.
>
> **Yang TETAP:** background, palet, font, kartu jahitan, karakter & penempatannya, subtitle, tata letak, CTA.
> **Yang BOLEH berubah:** efek, motion, transisi, dan properti cerita — menyesuaikan tema storyboard.
>
> Jika dokumen lain (`docs/`, `.agents/rules/`, `BRAIN.md`) bertentangan dengan dokumen ini, **dokumen ini yang berlaku**.
> Struktur folder dan aturan kerja: [AGENTS.md](AGENTS.md).

Implementasi acuan: `src/videos/te-shimau/`. Salin strukturnya, ganti isinya.
Contoh frame: `docs/reference/t*.jpg`.

---

## 1. Format

| | |
|---|---|
| Kanvas | 1080 × 1920 (9:16), 30 fps |
| Engine | Remotion, satu folder per video di `src/videos/<slug>/` |
| Durasi | `Math.ceil(durasi_VO × 30)` frame — tidak menambah durasi di luar audio |
| Render | selalu dua: master (subtitle) + `…Clean` (tanpa subtitle) |
| Audio | VO di `public/audio/voice/<slug>.wav`; musik **mati** secara default |

## 2. Background (wajib, tidak diubah)

Selalu `<Background />` dari `src/shared` di lapisan paling bawah, tanpa modifikasi:
kertas washi indigo `#12151d` + glow radial atas + grid sashiko melayang + watermark kanji 4,5% + vignette.
Tidak ada background per-scene, gradien neon, foto, atau warna polos.

## 3. Warna

Hanya token `C` dari `src/shared/theme.ts`. Peran warnanya:

| Warna | Dipakai untuk |
|---|---|
| `C.gold` | pola grammar utama, sorotan kata kerja/inti kalimat, kata kunci subtitle, benang penghubung, judul kinetik |
| `C.indigoSoft` | sorotan sekunder (keterangan, keluarga bentuk kedua seperti で／じゃう) |
| `C.matcha` | status "benar / selesai / santai" |
| `C.hanko` | penyesalan, peringatan, aksi hapus, stempel |
| `C.text` / `C.textSecondary` / `C.textMuted` | teks biasa / label / tanda baca & elemen pasif |
| `C.card` · `C.elevated` · `C.inset` | kartu · kartu terjemahan · panggung ilustrasi |

Dua pengecualian yang sudah dipakai dan boleh diulang: putih piring (`PLATE_BG` di `props.tsx`) dan krim kue `#fffaf0` / bolu `#d9a54a`.
Dilarang: cyan/neon, ungu acak, warna di luar tabel.

## 4. Font

| Token | Dipakai untuk | Ukuran acuan |
|---|---|---|
| `FONT.jp` (Noto Serif JP 900) | **semua** teks Jepang | pola utama 120–150 · kalimat contoh 88 · baris transformasi 104–120 · judul kecil 54–64 |
| `FONT.display` (Bricolage 800) | kata kinetik besar, KAPITAL | 104–150 |
| `FONT.body` (Plus Jakarta 700–800) | terjemahan, subtitle | terjemahan 38–42 · subtitle 46 |
| `FONT.mono` (JetBrains Mono) | hanya label polos **di dalam** kartu dan teks UI tiruan — tidak pernah dalam pil (§12) | 24–30 |
| `FONT.fantasy` (Cinzel) | hanya wordmark SEVNQUEST | 108 |

- Teks Jepang selalu lebih besar dan lebih dominan daripada label Indonesia.
- Kanji selalu berfurigana: emas, ±28% ukuran kanji (minimal 22px), tepat di atas kanjinya (`Kana` di `kit.tsx`).
- Tanpa emoji di dalam grafis.

## 5. Kartu "lembaran jahitan"

Semua wadah konten memakai `<Surface>` dari `src/shared`:

- gradien `#232937 → C.card`, radius 36–40, bayangan `SHADOW_CARD`
- **jahitan sashiko**: border dalam `2px dashed C.thread`, inset 12, opacity 0,45 (`stitch` aktif)
- aksen warna hanya lewat `border`, bukan mengganti isi kartu

| Varian | Pemakaian |
|---|---|
| `tone="card"` + jahitan | kartu pola, kartu kalimat, kartu situasi, blok formula |
| `tone="elevated"` + border emas 50% + tab emas 140×6 di tepi atas | kartu terjemahan |
| `tone="inset"`, tanpa jahitan | panggung ilustrasi |
| garis putus-putus saja (`dashed`) | slot kosong / placeholder yang menunggu isi |

Sorotan teks Jepang: kotak warna 13% + garis bawah 6px, mengikuti kelompok kata, masuk dengan wipe dari kiri.
Benang penghubung: garis putus-putus 4px `14 12`, titik padat di pangkal, cincin di ujung (`Threads` di `kit.tsx`).
Stempel: `<Stamp>` miring −4° s.d. −8°, selalu `whiteSpace: 'nowrap'`.
Tidak ada pil/chip label — lihat §12.

## 6. Tata letak (koordinat pusat, kanvas 1080×1920)

Zona aman: konten **y 200–1440**, subtitle **y 1470–1640**. Margin samping minimal 60.

| Komposisi | Posisi |
|---|---|
| Pola utama sendirian | tengah, y 700–720, ukuran 136–150 |
| Pola sebagai judul + konten di bawah | pola y 380 (ukuran 64) · konten y 870 |
| Pola + dua kartu | pola y 520–560 (ukuran 120–130) · kartu y 1010–1090 di x 290 dan x 790 |
| Kata kinetik besar | y 320–400 |
| Tata letak contoh kalimat | judul pola y 262 (54) · kartu kalimat y 595 (940×370, dua baris) · panggung y 1000 (940×390) · terjemahan y 1312 (960×150) |

- Isi diletakkan di tengah zona aman, tidak menumpuk di atas.
- Satu fokus per layar; elemen lain mengecil, meredup (opacity 0,5), atau pindah ke judul.
- Tidak ada teks yang melayang tanpa wadah, kecuali kata kinetik besar.

## 7. Karakter

- Hanya `Avatar` resmi (`public/avatars/expressions/`), lewat `Actor` di `props.tsx`. Tidak menggambar karakter atau anggota tubuh baru.
- Ditambatkan di **telapak kaki** pada garis lantai; tinggi 220–440 (440 saat jadi fokus hook, 220–330 saat mendampingi).
- Berdiri **di samping** objek atau di sudut kanan-bawah panggung. Tidak pernah menutupi teks Jepang, pola, atau terjemahan.
- Aksi ditunjukkan lewat: berpindah posisi, condong, goyang kecil (±4°), ganti ekspresi tepat di beat, dan bubble (`exclamation` / `question` / `sweat`).
- Ekspresi secukupnya: `happy → surprised/awkward → shocked`. Hindari `crying`/`angry` kecuali diminta storyboard.
- Lantai = garis putus-putus `3px dashed C.thread`.

## 8. Properti cerita

Digambar sebagai SVG/DIV sederhana dengan warna token, di `props.tsx` video tersebut (contoh: kunci, pintu, meja, piring + kue, jendela file, kursor).
Aturannya: 2–3 motif saja per video, dan **motif yang sama dipakai ulang** dari hook sampai rangkuman supaya ceritanya satu.

## 9. Subtitle

`VoCaption` di `kit.tsx`:

- y 1470, rata tengah, Plus Jakarta Sans 700 ukuran 46 (+ Noto Sans JP untuk aksara Jepang), bayangan gelap
- kata muncul bertahap; maksimal dua baris — kalimat panjang dipecah di `timing.ts`
- kata kunci ditandai `*begini*` → emas, tebal 800, glow emas

## 10. Motion (bagian yang menyesuaikan tema)

Prinsip yang tetap, apa pun temanya:

1. **Satu dunia, bukan slide.** Scene storyboard dikelompokkan jadi beberapa babak yang tumpang-tindih (`ACTS` di `timing.ts`); elemen menyeberang antarbabak.
2. **Elemen inti persisten.** Pola/kata utama adalah satu komponen yang hidup sepanjang video dan hanya berpindah posisi/ukuran (`PatternHero.tsx`).
3. **Transisi diantar objek.** Bentuk berubah jadi bentuk lain (piring → kartu, piring → jendela), objek terlempar membawa ke adegan berikut. Tanpa hard cut, tanpa fade polos antaradegan.
4. **Teks Jepang bergerak mengikuti struktur bahasa.** Per kelompok makna; perubahan bentuk kata memakai glyph ber-ID yang berpindah (`glyphPoses`), bukan mengganti dua teks.
5. **Timing dari audio.** Semua anchor dalam detik narasi; kata penting muncul tepat saat diucapkan. Jalankan `silencedetect` pada VO untuk menemukan jeda di dalam kalimat.
6. **Easing & pegas** hanya dari `src/shared/anim.ts`: `SPRING` (masuk UI), `BOUNCY` (kata besar, stempel, tombol +), `EASE_IO` (kamera/perpindahan), `EASE_IN` (keluar).
7. **SFX** pendek, volume 0,2–0,35, hanya untuk interaksi penting.

Efek spesifik (whip-pan, morph, kamera dorong, partikel) bebas dipilih sesuai tema storyboard.

## 11. CTA (persis seperti ini)

Dua bagian, mengikuti dua kalimat penutup narasi:

**a. Fitur produk** — `IPhoneShell` (`src/videos/iphone/components`) skala 0,74 → 0,80, pusat y 825, naik dari bawah.
Layar hanya menampilkan **satu** fitur yang relevan dengan materi. Interaksi singkat dengan `TouchIndicator`: ketik/pilih → hasil → coba satu variasi lain. Tanpa teks tambahan di luar ponsel.

**b. Logo penutup** — ponsel mengecil dan memudar, lalu:

- glow radial emas 900px, opacity 16%, pusat y 850
- `<LogoMark size={230} glow={0.5} />` di y 730, masuk dengan `SPRING` (skala 0,6 → 1)
- `<Wordmark size={108} />` di y 960, terbuka dengan wipe kiri → kanan (±0,4 dtk)
- **ditahan sampai frame terakhir**; tidak ada tombol, URL, stempel, atau avatar tambahan

## 12. Jangan

### Pil / chip label — dilarang total

Tidak ada elemen **berbentuk pil** (kapsul membulat berisi label pendek) di video baru, apa pun warna dan isinya.
Contoh: `docs/reference/jangan-pill-penghitung-mono.png`. Ini mencakup:

- penghitung langkah — `CONTOH 3 / 3`, `1/3`, `TAHAP 02`
- label kategori di atas kartu — `POLA TATA BAHASA`, `PERCAKAPAN SANTAI`
- label status — `SELESAI DILAKUKAN`, `= SELESAI?`
- pil aturan — `～てしまう → ～ちゃう`
- lencana kecil di dalam UI tiruan — `★ PENTING`

Jangan memakai komponen `<Pill>` dari `src/shared`, dan jangan membuat tiruannya (div `borderRadius: 999` berisi teks).

Penggantinya:

| Kebutuhan | Pakai |
|---|---|
| Menamai isi sebuah kartu | teks label polos **di dalam** kartu (mono 24–27, `C.textSecondary`), seperti `KATA KERJA BENTUK` pada blok formula |
| Menegaskan sebuah makna/kata kunci | `<Stamp>` atau kata kinetik besar (`Big`, `MaskWords`) |
| Menunjukkan perubahan bentuk | animasi glyph itu sendiri + sorotan; tanpa keterangan tambahan |
| Menunjukkan urutan contoh | pergantian isi kartu; tanpa penghitung |
| Menandai item di UI tiruan | warna ikon/teks baris itu |

> Kode acuan `src/videos/te-shimau/` sudah bebas pil. Render `out/renders/SevnQuestTeShimau*.mp4` dibuat sebelum aturan ini
> dan masih menampilkannya — yang ditiru adalah **kodenya**, bukan pil di render lama itu.

### Lainnya

- Slide statis per kalimat, hard cut, atau membangun ulang layar yang sebenarnya bisa dilanjutkan.
- Karakter menutupi teks; teks menutupi pola utama.
- Tanda silang pada makna yang tidak salah (yang dikoreksi adalah pemahaman yang terlalu sempit).
- Menampilkan banyak fitur produk sekaligus di CTA.
- Warna, font, atau background di luar dokumen ini.
## 13. Langkah membuat video baru

1. Salin VO ke `public/audio/voice/<slug>.wav`; cocokkan durasinya dengan storyboard.
2. Salin `src/videos/te-shimau/` → `src/videos/<slug>/`; pertahankan `kit.tsx`, ganti `timing.ts`, `props.tsx`, elemen inti, dan `scenes/`.
3. Isi `timing.ts`: batas scene (detik), `ACTS`, subtitle, SFX.
4. Daftarkan `SevnQuest<Pascal>` + `…Clean` di `src/Root.tsx`; simpan naskah di `content/<slug>/storyboard.md`.
5. Periksa still di setiap scene dan setiap transisi sebelum render (`npm run still`), lalu `npm run render -- <Id>` untuk keduanya.
