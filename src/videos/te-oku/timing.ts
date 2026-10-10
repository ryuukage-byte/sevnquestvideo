// ～ておく — persiapan atau membiarkan?
// Durasi narasi: 01:48.080 (108.08 dtk). Semua angka di bawah dalam DETIK dan berasal dari timestamp storyboard
// (content/te-oku/storyboard.md). Durasi video = ceil(108.08 × 30) = 3243 frame.
import {FPS} from '../../shared/theme';
import type {SfxName} from '../../shared/components/Sfx';

export const DURATION_SEC = 108.08;
export const TOTAL_FRAMES = Math.ceil(DURATION_SEC * FPS);

/** detik → frame */
export const T = (sec: number) => Math.round(sec * FPS);

// Batas 30 scene storyboard [mulai, selesai] — dokumentasi & acuan untuk anchor di bawah.
export const S = {
  s01: [0.11, 1.74],
  s02: [2.51, 8.69],
  s03: [9.21, 9.92],
  s04: [10.22, 15.6],
  s05: [16.75, 19.15],
  s06: [19.57, 22.25],
  s07: [22.25, 25.01],
  s08: [25.83, 29.1],
  s09: [29.66, 31.73],
  s10: [32.28, 35.22],
  s11: [35.86, 38.88],
  s12: [39.46, 43.83],
  s13: [44.52, 49.21],
  s14: [50.03, 53.22],
  s15: [53.88, 56.97],
  s16: [57.31, 58.32],
  s17: [58.95, 60.71],
  s18: [61.36, 63.69],
  s19: [64.42, 67.84],
  s20: [68.12, 71.55],
  s21: [72.38, 74.35],
  s22: [75.02, 78.68],
  s23: [79.0, 82.53],
  s24: [83.53, 85.38],
  s25: [85.63, 87.15],
  s26: [87.73, 89.64],
  s27: [90.4, 92.38],
  s28: [93.12, 95.05],
  s29: [95.77, 100.29],
  s30: [100.63, 107.78],
} as const;

// Babak = satu "dunia" visual. Rentangnya tumpang-tindih supaya elemen bisa menyeberang antarbabak.
// Babak hanya menambah elemen overlay (karakter, teks lembar, CTA). Pola, kalender, kotak, dan lembar
// hidup di lapisan persisten (stage.tsx) sejak awal sampai akhir.
export const ACTS = [
  {id: 'intro', name: 'A1 · Pola dipertanyakan → 置く (S01–04)', from: 0, to: 16.4},
  {id: 'persiapan', name: 'A2 · Persiapan: hari ini & besok (S08–13)', from: 25.2, to: 50.0},
  {id: 'biarkan', name: 'A3 · Membiarkan: kotak & karakter (S14–20)', from: 49.5, to: 72.0},
  {id: 'singkat', name: 'A4 · Dua fungsi → bentuk singkatan (S21–28)', from: 71.5, to: 95.6},
  {id: 'cta', name: 'A5 · Tantangan → SevnQuest (S29–30)', from: 95.2, to: DURATION_SEC},
] as const;

// Pola ～ておく hidup sebagai satu elemen persisten dari S01 sampai S29.
export const HERO_RANGE = [0.11, 100.6] as const;

// Subtitle: [mulai, selesai, ...potongan]. Potongan dibagi menurut panjang teks; durasi tiap potongan
// mengikuti proporsinya. *kata* = penekanan.
type Line = [start: number, end: number, ...chunks: string[]];
const LINES: Line[] = [
  [0.11, 1.74, 'Apa itu pola *～ておく*?'],
  [2.51, 8.69, 'Pada dasarnya, pola *～ておく* sering digunakan', 'untuk menyatakan bahwa kita melakukan sesuatu sebagai *persiapan*.'],
  [9.21, 9.92, 'Fun fact, nih!'],
  [10.22, 15.6, 'Kata *おく（置く）* dalam bahasa Jepang', 'punya arti dasar *menaruh* atau *meletakkan* sesuatu.'],
  [16.75, 19.15, 'Nah, pola *～ておく* punya *dua fungsi* utama.'],
  [19.57, 22.25, 'Melakukan sesuatu lebih dulu sebagai *persiapan*,'],
  [22.25, 25.01, 'atau *membiarkan* sesuatu tetap dalam keadaan tertentu.'],
  [25.83, 29.1, 'Pertama, melakukan sesuatu lebih dulu sebagai *persiapan*.'],
  [29.66, 31.73, 'Misalnya, besok kamu ada *ujian*.'],
  [32.28, 35.22, 'Malam ini, kamu memutuskan buat *tidur lebih awal*.'],
  [35.86, 38.88, '明日試験があるから、', '今夜は早く寝ておこう。'],
  [39.46, 43.83, 'Artinya, *besok ada ujian*, jadi malam ini aku *tidur lebih awal dulu*.'],
  [44.52, 49.21, 'Nah, fokusnya di sini adalah *melakukan sesuatu sekarang*', 'supaya *besok lebih siap*.'],
  [50.03, 53.22, 'Kedua, *membiarkan* sesuatu tetap dalam keadaan tertentu.'],
  [53.88, 56.97, 'Misalnya, temanmu meminta kamu *menaruh barang* di suatu tempat.'],
  [57.31, 58.32, 'Lalu dia bilang...'],
  [58.95, 60.71, 'その荷物、そこに置いといて。'],
  [61.36, 63.69, 'Artinya, barang itu *taruh saja di situ*.'],
  [64.42, 67.84, 'Di sini, nuansa *おく* lebih dekat dengan makna dasarnya,'],
  [68.12, 71.55, 'yaitu menaruh sesuatu dan *membiarkannya tetap di tempat itu*.'],
  [72.38, 74.35, 'Nah, apa bedanya kedua fungsi ini?'],
  [75.02, 78.68, 'Fungsi pertama berfokus pada *tindakan* yang dilakukan demi *persiapan*.'],
  [79.0, 82.53, 'Sedangkan fungsi kedua berfokus pada *keadaan* yang ingin dipertahankan.'],
  [83.53, 85.38, 'Terus, dalam *percakapan sehari-hari*,'],
  [85.63, 87.15, '*～ておく* juga sering disingkat.'],
  [87.73, 89.64, 'しておく jadi *しとく*。'],
  [90.4, 92.38, '読んでおく jadi *読んどく*。'],
  [93.12, 95.05, '置いておく jadi *置いとく*。'],
  [95.77, 100.29, 'Sekarang, coba ubah satu kalimat menggunakan pola *～ておく*', 'menjadi bentuk kasual *～とく*!'],
  [100.63, 107.78, 'Kalau kamu mau mulai belajar bahasa Jepang dari dasar,', 'tapi masih bingung harus mulai dari mana,', 'coba sekarang di *SevnQuest*.'],
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

// SFX pendek mengikuti momentum gerakan; volume rendah supaya tidak menutupi narator.
export const SFX_CUES: {at: number; name: SfxName; vol: number}[] = [
  {at: 0.11, name: 'whoosh', vol: 0.2}, // 〜 masuk
  {at: 0.36, name: 'tick', vol: 0.2},
  {at: 0.61, name: 'tick', vol: 0.2},
  {at: 0.86, name: 'tick', vol: 0.2},
  {at: 1.2, name: 'chime', vol: 0.22}, // pola utuh
  {at: 1.5, name: 'swipe', vol: 0.2}, // kartu masuk
  {at: 1.85, name: 'swipe', vol: 0.2},
  {at: 2.51, name: 'pop', vol: 0.22}, // kalender membesar
  {at: 3.2, name: 'swipe', vol: 0.2}, // halaman berputar
  {at: 9.21, name: 'whoosh', vol: 0.2}, // kotak meluncur
  {at: 9.85, name: 'thud', vol: 0.26}, // pantulan kotak
  {at: 10.22, name: 'pop', vol: 0.24}, // 置く
  {at: 11.3, name: 'ding', vol: 0.2},
  {at: 16.75, name: 'whoosh', vol: 0.2}, // poros dua jalur
  {at: 19.57, name: 'swipe', vol: 0.22}, // halaman hari ini maju
  {at: 22.25, name: 'ding', vol: 0.22}, // membiarkan
  {at: 25.83, name: 'whoosh', vol: 0.2},
  {at: 29.66, name: 'pop', vol: 0.22}, // 試験
  {at: 32.28, name: 'pop', vol: 0.2}, // 早く寝る
  {at: 35.86, name: 'tick', vol: 0.2}, // kalimat tersusun
  {at: 36.6, name: 'tick', vol: 0.2},
  {at: 37.4, name: 'tick', vol: 0.2},
  {at: 38.6, name: 'click', vol: 0.26}, // 寝て
  {at: 44.52, name: 'swipe', vol: 0.22},
  {at: 50.03, name: 'thud', vol: 0.22}, // kotak dominan
  {at: 53.88, name: 'pop', vol: 0.22}, // karakter masuk
  {at: 55.5, name: 'pop', vol: 0.22}, // ?
  {at: 57.31, name: 'pop', vol: 0.2},
  {at: 58.95, name: 'whoosh', vol: 0.2},
  {at: 60.5, name: 'thud', vol: 0.26}, // kotak turun
  {at: 61.36, name: 'tick', vol: 0.2},
  {at: 64.42, name: 'chime', vol: 0.2}, // おく
  {at: 68.12, name: 'thud', vol: 0.2},
  {at: 72.38, name: 'ding', vol: 0.2},
  {at: 75.02, name: 'swipe', vol: 0.2},
  {at: 79.0, name: 'ding', vol: 0.2},
  {at: 83.53, name: 'pop', vol: 0.2},
  {at: 85.9, name: 'chime', vol: 0.24}, // 〜とく
  {at: 87.73, name: 'pop', vol: 0.2},
  {at: 88.3, name: 'click', vol: 0.26}, // morph
  {at: 90.4, name: 'pop', vol: 0.2},
  {at: 91.0, name: 'click', vol: 0.26},
  {at: 93.12, name: 'pop', vol: 0.2},
  {at: 94.0, name: 'click', vol: 0.26},
  {at: 95.77, name: 'chime', vol: 0.22},
  {at: 100.63, name: 'swipe', vol: 0.26}, // ponsel masuk
  {at: 102.4, name: 'click', vol: 0.32}, // ketuk pilihan
  {at: 102.7, name: 'chime', vol: 0.26}, // hasil
  {at: 104.9, name: 'chime', vol: 0.34}, // logo
];
