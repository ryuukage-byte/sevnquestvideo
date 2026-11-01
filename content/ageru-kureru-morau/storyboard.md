# あげる・くれる・もらう

- Slug: `ageru-kureru-morau`
- Kode: `src/videos/ageru-kureru-morau/`
- Voice-over: `public/audio/voice/ageru-kureru-morau.wav` (01:39.560)
- Render: `npm run render -- SevnQuestAgeruKureruMorau` · tanpa subtitle: `SevnQuestAgeruKureruMorauClean`

## Ide visual

- **Kata-hero** あげる → くれる → もらう: satu elemen persisten. Huruf る tidak berganti saat あげる → くれる; hanya あ・げ → く・れ.
- **Panggung** dua karakter resmi (私 = Avatar perempuan, 友達 = Avatar laki-laki) dan satu motif: **buku**.
  Arah buku menentukan kata kerjanya: あげる dari 私 ke 友達, くれる dan もらう dari 友達 ke 私.
- Label peran di panggung: PEMBERI / PENERIMA (teks polos, bukan pil).
- Kamera dorong ke 私 saat membahas sudut pandang penerima (もらう).

## Struktur

33 kalimat naskah dijalankan sebagai 6 babak yang saling menyambung (`ACTS` di `timing.ts`).

| Babak | Scene | Detik | Isi | Jembatan |
|---|---|---|---|---|
| A1 Hook | 01–02 | 0.00–8.95 | Tiga kata · "apa bedanya?" | Baris あげる jadi kata-hero di tengah |
| A2 あげる | 03–10 | 8.60–27.60 | Arti · pola · contoh · 私→友達 | Kata-hero naik ke atas, る tetap |
| A3 くれる | 11–18 | 27.40–51.60 | Pola が · contoh · 友達→私 · menuju saya | あ・げ → く・れ |
| A4 もらう | 19–26 | 51.10–71.00 | Sudut pandang penerima · pola は · contoh | Kamera dorong ke 私 |
| A5 Rangkuman | 27–31 | 70.50–91.90 | Tiga baris arah · partikel に | Panah tiap baris, に di penerima |
| A6 CTA | 32–33 | 91.50–99.56 | Fitur konjugasi (あげる) → logo | — |

## Naskah VO

| # | Detik | Narasi |
|---|---|---|
| 01 | 0.00–6.84 | Dalam bahasa Jepang, ada tiga kata yang sama-sama berhubungan dengan memberi dan menerima, yaitu あげる、くれる、dan もらう. |
| 02 | 6.84–8.95 | Tapi, apa sih perbedaannya? |
| 03 | 8.95–11.39 | Pertama, あげる, artinya memberi. |
| 04 | 11.39–16.81 | Kata ini digunakan ketika seseorang memberikan sesuatu kepada orang lain. |
| 05 | 16.81–18.57 | Pola kalimatnya: |
| 06 | 18.57–20.20 | Pemberi は Penerima に Benda を あげる。 |
| 07 | 20.20–20.91 | Contohnya, |
| 08 | 20.91–22.58 | 私は友達に本をあげました。 |
| 09 | 22.58–24.40 | Saya memberikan buku kepada teman. |
| 10 | 24.40–28.92 | Di sini, saya adalah pemberi, sedangkan teman adalah penerima. |
| 11 | 28.92–31.96 | Kedua, くれる, artinya juga memberi. |
| 12 | 31.96–39.61 | Bedanya, くれる digunakan ketika seseorang memberikan sesuatu kepada kita, atau kepada orang yang termasuk dalam kelompok kita. |
| 13 | 39.61–41.59 | Pola kalimatnya: |
| 14 | 41.59–43.40 | Pemberi が Penerima に Benda を くれる。 |
| 15 | 43.40–43.91 | Contohnya, |
| 16 | 43.91–44.67 | 友達が私に本をくれました。 |
| 17 | 44.67–47.32 | Teman memberikan buku kepada saya. |
| 18 | 47.32–51.33 | Perhatikan, arah pemberiannya sekarang menuju saya. |
| 19 | 51.33–54.38 | Terakhir, もらう, artinya menerima. |
| 20 | 54.38–58.73 | Kata ini digunakan dari sudut pandang orang yang menerima sesuatu. |
| 21 | 58.73–59.89 | Pola kalimatnya: |
| 22 | 59.89–62.25 | Penerima は Pemberi に Benda を もらう。 |
| 23 | 62.25–63.04 | Contohnya, |
| 24 | 63.04–64.37 | 私は友達に本をもらいました。 |
| 25 | 64.37–66.21 | Saya menerima buku dari teman. |
| 26 | 66.21–70.75 | Di sini, saya menjadi penerima, sedangkan teman adalah pemberi. |
| 27 | 70.75–75.73 | Jadi, cara paling mudah membedakannya adalah dengan melihat arah pemberian. |
| 28 | 75.73–78.44 | あげる, dari pemberi menuju orang lain. |
| 29 | 78.44–82.09 | くれる, dari orang lain menuju kita atau kelompok kita. |
| 30 | 82.09–85.38 | Sedangkan もらう, dilihat dari sudut pandang penerima. |
| 31 | 85.38–92.11 | Ingat juga, partikel に pada あげる dan くれる menunjukkan penerima, sedangkan pada もらう menunjukkan pemberi. |
| 32 | 92.11–95.56 | Sekarang sudah lebih paham perbedaannya? |
| 33 | 95.56–99.56 | Simpan video ini, dan lanjut belajar bahasa Jepang bersama SevnQuest! |

## Catatan waktu

Batas kalimat dihitung dari jeda pada audio (`silencedetect`) lalu dibagi menurut panjang naskah.
Akurasi sekitar ±0.5 dtk. Jika ada kata yang muncul terlalu cepat atau telat, sesuaikan `S` di `timing.ts` (dan `LINES`/`SFX_CUES`).
