// あげる・くれる・もらう — siapa memberi, siapa menerima, ke arah mana?
// Durasi narasi: 01:39.560. Semua angka di bawah dalam DETIK.
// Batas kalimat dihitung dari jeda narasi (silencedetect) dan dibagi menurut panjang naskah.
// Akurasi sekitar ±0.5 dtk: periksa ulang saat preview di Studio.
import {FPS} from '../../shared/theme';
import type {SfxName} from '../../shared/components/Sfx';

export const DURATION_SEC = 99.56;
// 99.56 dtk @30fps = 2986.8 frame → dibulatkan ke atas agar ekor narasi tidak terpotong.
export const TOTAL_FRAMES = Math.ceil(DURATION_SEC * FPS);

/** detik → frame */
export const T = (sec: number) => Math.round(sec * FPS);

// 33 kalimat naskah [mulai, selesai].
export const S = {
  s01: [0.0, 6.84], // Tiga kata: あげる・くれる・もらう
  s02: [6.84, 8.95], // Tapi, apa sih perbedaannya?
  s03: [8.95, 11.39], // Pertama, あげる, artinya memberi.
  s04: [11.39, 16.81], // Dipakai saat memberi ke orang lain
  s05: [16.81, 18.57], // Pola kalimatnya:
  s06: [18.57, 20.2], // Pemberi は Penerima に Benda を あげる。
  s07: [20.2, 20.91], // Contohnya,
  s08: [20.91, 22.58], // 私は友達に本をあげました。
  s09: [22.58, 24.4], // Saya memberikan buku kepada teman.
  s10: [24.4, 28.92], // Di sini, saya pemberi, teman penerima.
  s11: [28.92, 31.96], // Kedua, くれる, artinya juga memberi.
  s12: [31.96, 39.61], // Dipakai saat orang lain memberi ke kita
  s13: [39.61, 41.59], // Pola kalimatnya:
  s14: [41.59, 43.4], // Pemberi が Penerima に Benda を くれる。
  s15: [43.4, 43.91], // Contohnya,
  s16: [43.91, 44.67], // 友達が私に本をくれました。
  s17: [44.67, 47.32], // Teman memberikan buku kepada saya.
  s18: [47.32, 51.33], // Perhatikan, arah pemberiannya menuju saya.
  s19: [51.33, 54.38], // Terakhir, もらう, artinya menerima.
  s20: [54.38, 58.73], // Dari sudut pandang orang yang menerima.
  s21: [58.73, 59.89], // Pola kalimatnya:
  s22: [59.89, 62.25], // Penerima は Pemberi に Benda を もらう。
  s23: [62.25, 63.04], // Contohnya,
  s24: [63.04, 64.37], // 私は友達に本をもらいました。
  s25: [64.37, 66.21], // Saya menerima buku dari teman.
  s26: [66.21, 70.75], // Di sini, saya penerima, teman pemberi.
  s27: [70.75, 75.73], // Cara paling mudah: lihat arah pemberian.
  s28: [75.73, 78.44], // あげる, dari pemberi menuju orang lain.
  s29: [78.44, 82.09], // くれる, dari orang lain menuju kita.
  s30: [82.09, 85.38], // もらう, dilihat dari sudut pandang penerima.
  s31: [85.38, 92.11], // Partikel に: penerima pada あげる・くれる, pemberi pada もらう.
  s32: [92.11, 95.56], // Sekarang sudah lebih paham perbedaannya?
  s33: [95.56, 99.56], // Simpan video ini ... bersama SevnQuest!
} as const;

// Babak = satu "dunia" visual. Rentangnya sengaja tumpang-tindih supaya elemen bisa menyeberang
// dari satu adegan ke adegan berikutnya tanpa hard cut.
export const ACTS = [
  {id: 'hook', name: 'A1 · Hook: あげる・くれる・もらう (S01–02)', from: 0, to: 8.9},
  {id: 'give', name: 'A2 · あげる: pola, contoh, pemberi → penerima (S03–10)', from: 8.6, to: 27.6},
  {id: 'kureru', name: 'A3 · くれる: arah menuju kita (S11–18)', from: 27.4, to: 51.6},
  {id: 'morau', name: 'A4 · もらう: sudut pandang penerima (S19–26)', from: 51.1, to: 71.0},
  {id: 'summary', name: 'A5 · Rangkuman arah & partikel に (S27–31)', from: 70.5, to: 91.9},
  {id: 'cta', name: 'A6 · Fitur konjugasi → SevnQuest (S32–33)', from: 91.5, to: DURATION_SEC},
] as const;

// Kata kerja-hero hidup sebagai satu elemen persisten dari S03 sampai S26 (lalu hilang di rangkuman).
export const HERO_RANGE = [8.9, 70.6] as const;
// Panggung dua orang + buku: dari pengenalan あげる (S04) sampai pembahasan sudut pandang (S26).
export const STAGE_RANGE = [11.4, 70.8] as const;

// Subtitle: [mulai, selesai, ...potongan]. *kata* = penekanan (emas).
type Line = [start: number, end: number, ...chunks: string[]];
const LINES: Line[] = [
  [0.0, 6.84, 'Dalam bahasa Jepang, ada tiga kata yang sama-sama', 'berhubungan dengan memberi dan menerima, yaitu *あげる*、*くれる*、dan *もらう*.'],
  [6.84, 8.95, 'Tapi, apa sih *perbedaannya*?'],
  [8.95, 11.39, 'Pertama, *あげる*, artinya *memberi*.'],
  [11.39, 16.81, 'Kata ini digunakan ketika seseorang memberikan sesuatu', 'kepada *orang lain*.'],
  [16.81, 18.57, 'Pola kalimatnya:'],
  [18.57, 20.2, 'Pemberi は Penerima に Benda を *あげる*。'],
  [20.2, 20.91, 'Contohnya,'],
  [20.91, 22.58, '私は友達に本を*あげました*。'],
  [22.58, 24.4, 'Saya memberikan buku kepada teman.'],
  [24.4, 28.92, 'Di sini, saya adalah *pemberi*, sedangkan teman adalah *penerima*.'],
  [28.92, 31.96, 'Kedua, *くれる*, artinya juga *memberi*.'],
  [31.96, 39.61, 'Bedanya, *くれる* digunakan ketika seseorang memberikan sesuatu', 'kepada *kita*, atau kepada orang yang termasuk dalam *kelompok kita*.'],
  [39.61, 41.59, 'Pola kalimatnya:'],
  [41.59, 43.4, 'Pemberi が Penerima に Benda を *くれる*。'],
  [43.4, 43.91, 'Contohnya,'],
  [43.91, 44.67, '友達が私に本を*くれました*。'],
  [44.67, 47.32, 'Teman memberikan buku kepada saya.'],
  [47.32, 51.33, 'Perhatikan, arah pemberiannya sekarang *menuju saya*.'],
  [51.33, 54.38, 'Terakhir, *もらう*, artinya *menerima*.'],
  [54.38, 58.73, 'Kata ini digunakan dari *sudut pandang* orang yang menerima sesuatu.'],
  [58.73, 59.89, 'Pola kalimatnya:'],
  [59.89, 62.25, 'Penerima は Pemberi に Benda を *もらう*。'],
  [62.25, 63.04, 'Contohnya,'],
  [63.04, 64.37, '私は友達に本を*もらいました*。'],
  [64.37, 66.21, 'Saya menerima buku dari teman.'],
  [66.21, 70.75, 'Di sini, saya *menjadi penerima*, sedangkan teman adalah *pemberi*.'],
  [70.75, 75.73, 'Jadi, cara paling mudah membedakannya adalah', 'dengan melihat *arah pemberian*.'],
  [75.73, 78.44, '*あげる*, dari pemberi menuju orang lain.'],
  [78.44, 82.09, '*くれる*, dari orang lain menuju kita atau kelompok kita.'],
  [82.09, 85.38, 'Sedangkan *もらう*, dilihat dari sudut pandang penerima.'],
  [85.38, 92.11, 'Ingat juga, partikel *に* pada *あげる* dan *くれる*', 'menunjukkan penerima, sedangkan pada *もらう*', 'menunjukkan pemberi.'],
  [92.11, 95.56, 'Sekarang sudah lebih paham perbedaannya?'],
  [95.56, 99.56, 'Simpan video ini, dan lanjut belajar bahasa Jepang', 'bersama *SevnQuest*!'],
];

export interface Cue {
  from: number; // frame
  to: number;
  text: string;
}

export const CUES: Cue[] = [];
for (const [start, end, ...chunks] of LINES) {
  const total = chunks.reduce((a, c) => a + c.length, 0);
  let acc = 0;
  for (const text of chunks) {
    const from = start + ((end - start) * acc) / total;
    acc += text.length;
    CUES.push({from: T(from), to: T(start + ((end - start) * acc) / total), text});
  }
}

// SFX pendek untuk interaksi penting saja; volume rendah supaya tidak menutupi narator.
export const SFX_CUES: {at: number; name: SfxName; vol: number}[] = [
  {at: 0.3, name: 'whoosh', vol: 0.2},
  {at: 1.0, name: 'tick', vol: 0.26}, // あげる muncul
  {at: 2.6, name: 'tick', vol: 0.24}, // くれる muncul
  {at: 4.2, name: 'tick', vol: 0.24}, // もらう muncul
  {at: 6.84, name: 'pop', vol: 0.26}, // ?
  {at: 8.95, name: 'chime', vol: 0.26}, // kata-hero
  {at: 11.6, name: 'swipe', vol: 0.24}, // panggung masuk
  {at: 11.9, name: 'pop', vol: 0.24}, // buku di tangan pemberi
  {at: 13.0, name: 'whoosh', vol: 0.22}, // buku terbang
  {at: 14.3, name: 'ding', vol: 0.2}, // sampai
  {at: 16.9, name: 'pop', vol: 0.22}, // pola
  {at: 17.3, name: 'click', vol: 0.2},
  {at: 18.8, name: 'click', vol: 0.22},
  {at: 19.4, name: 'pop', vol: 0.26}, // あげる
  {at: 19.6, name: 'impact', vol: 0.18}, // buku lenyap dari tangan
  {at: 20.3, name: 'pop', vol: 0.22}, // buku muncul lagi
  {at: 21.5, name: 'whoosh', vol: 0.2},
  {at: 22.6, name: 'ding', vol: 0.2},
  {at: 25.0, name: 'pop', vol: 0.24},
  {at: 28.92, name: 'swipe', vol: 0.24}, // あげる → くれる
  {at: 33.0, name: 'whoosh', vol: 0.22}, // buku balik ke kita
  {at: 34.3, name: 'thud', vol: 0.2},
  {at: 40.0, name: 'pop', vol: 0.22},
  {at: 41.9, name: 'pop', vol: 0.2},
  {at: 43.9, name: 'whoosh', vol: 0.2},
  {at: 44.9, name: 'thud', vol: 0.2},
  {at: 47.6, name: 'impact', vol: 0.22}, // MENUJU SAYA
  {at: 51.33, name: 'chime', vol: 0.26}, // もらう
  {at: 54.4, name: 'swipe', vol: 0.24}, // kamera ke penerima
  {at: 59.2, name: 'pop', vol: 0.22},
  {at: 61.9, name: 'pop', vol: 0.2},
  {at: 63.4, name: 'whoosh', vol: 0.2},
  {at: 64.5, name: 'ding', vol: 0.24},
  {at: 66.5, name: 'pop', vol: 0.24},
  {at: 70.8, name: 'swipe', vol: 0.24}, // rangkuman
  {at: 71.2, name: 'tick', vol: 0.2},
  {at: 71.6, name: 'tick', vol: 0.2},
  {at: 75.9, name: 'pop', vol: 0.22}, // あげる arah
  {at: 78.6, name: 'pop', vol: 0.22}, // くれる arah
  {at: 82.2, name: 'pop', vol: 0.22}, // もらう arah
  {at: 85.5, name: 'ding', vol: 0.24}, // partikel に
  {at: 92.7, name: 'click', vol: 0.3}, // ketik
  {at: 93.5, name: 'click', vol: 0.3}, // ketuk て
  {at: 94.5, name: 'click', vol: 0.3}, // ketuk ない
  {at: 95.6, name: 'chime', vol: 0.34}, // logo
];
