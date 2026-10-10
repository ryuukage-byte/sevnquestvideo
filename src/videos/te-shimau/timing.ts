// ～てしまう — selesai, menyesal, atau tidak disengaja?
// Durasi narasi: 01:06.760. Semua angka di bawah dalam DETIK dan berasal dari timestamp storyboard
// (sudah dicek ke jeda di public/audio/voice/te-shimau.wav).
import {FPS} from '../../shared/theme';
import type {SfxName} from '../../shared/components/Sfx';

export const DURATION_SEC = 66.76;
// 66.76 dtk @30fps = 2002.8 frame → dibulatkan ke atas agar ekor narasi tidak terpotong.
export const TOTAL_FRAMES = Math.ceil(DURATION_SEC * FPS);

/** detik → frame */
export const T = (sec: number) => Math.round(sec * FPS);

// Batas 22 scene storyboard [mulai, selesai].
export const S = {
  s01: [0.21, 1.77], // Hook: kunci tertinggal
  s02: [2.23, 4.71], // Hook: kue habis
  s03: [5.29, 8.75], // Memperkenalkan pola (～てしまう diucapkan 8.06)
  s04: [8.89, 10.75], // Fungsi pola
  s05: [11.43, 15.95], // Formula (て 13.2 · で 14.4 · ditambah 14.99 · しまう 15.4)
  s06: [16.74, 20.31], // ～ちゃう (diucapkan 20.05)
  s07: [20.54, 22.81], // ～じゃう
  s08: [23.67, 25.35], // Pertanyaan pengantar
  s09: [25.86, 28.58], // Makna: selesai dilakukan
  s10: [28.97, 33.95], // Makna: penyesalan / tidak disengaja
  s11: [34.6, 35.07], // "Contohnya:"
  s12: [35.83, 37.62], // Contoh 1 JP
  s13: [38.03, 39.77], // Contoh 1 ID
  s14: [40.45, 42.2], // Contoh 2 JP
  s15: [42.7, 44.43], // Contoh 2 ID
  s16: [45.16, 46.98], // Contoh 3 JP
  s17: [47.42, 49.25], // Contoh 3 ID
  s18: [50.07, 54.3], // Koreksi: bukan hanya "selesai"
  s19: [54.67, 55.59], // Perhatikan konteks
  s20: [55.85, 59.88], // Rangkuman makna
  s21: [60.69, 65.12], // CTA: fitur konjugasi
  s22: [65.53, 66.76], // CTA: logo
} as const;

// Babak = satu "dunia" visual. Rentangnya sengaja tumpang-tindih supaya elemen bisa menyeberang
// dari satu adegan ke adegan berikutnya (morph, match cut) tanpa hard cut.
export const ACTS = [
  {id: 'hook', name: 'A1 · Hook: kunci & kue (S01–02)', from: 0, to: 6.3},
  {id: 'pattern', name: 'A2 · Pola → formula → ちゃう／じゃう (S03–07)', from: 4.7, to: 23.75},
  {id: 'meaning', name: 'A3 · Kapan dipakai? selesai · menyesal · tak sengaja (S08–10)', from: 23.3, to: 34.75},
  {id: 'examples', name: 'A4 · Tiga contoh kalimat (S11–17)', from: 34.3, to: 50.2},
  {id: 'context', name: 'A5 · Bukan hanya "selesai" → konteks → rangkuman (S18–20)', from: 49.9, to: 60.8},
  {id: 'cta', name: 'A6 · Fitur konjugasi → SevnQuest (S21–22)', from: 59.9, to: DURATION_SEC},
] as const;

// Pola ～てしまう hidup sebagai satu elemen persisten dari S03 sampai S20.
export const HERO_RANGE = [4.71, 60.7] as const;

// Subtitle: [mulai, selesai, ...potongan]. Kalimat panjang dipecah agar maksimal dua baris;
// durasi tiap potongan dibagi menurut panjang teksnya. *kata* = penekanan.
type Line = [start: number, end: number, ...chunks: string[]];
const LINES: Line[] = [
  [0.21, 1.77, 'Pernah *ketinggalan* kunci di rumah?'],
  [2.23, 4.71, 'Atau malah *menghabiskan* semua kue tanpa sadar?'],
  [5.29, 8.75, 'Dalam bahasa Jepang, kamu bisa menggunakan pola *～てしまう*'],
  [8.89, 10.75, 'untuk mengekspresikan hal seperti ini.'],
  [11.43, 15.95, 'Pola ini dibentuk dari kata kerja bentuk *て* atau *で*,', 'ditambah *しまう*.'],
  [16.74, 20.31, 'Dalam percakapan santai,', '～てしまう sering disingkat menjadi *～ちゃう*,'],
  [20.54, 22.81, 'sedangkan ～でしまう menjadi *～じゃう*.'],
  [23.67, 25.35, 'Lalu, *kapan* pola ini digunakan?'],
  [25.86, 28.58, 'Selain menunjukkan sesuatu yang *selesai* dilakukan,'],
  [
    28.97,
    33.95,
    '～てしまう juga sering digunakan untuk mengungkapkan',
    '*penyesalan* atau kejadian yang *tidak disengaja*.',
  ],
  [34.6, 35.07, 'Contohnya:'],
  [35.83, 37.62, '鍵を家に*忘れてしまった*。'],
  [38.03, 39.77, 'Aku *malah* ketinggalan kunci di rumah.'],
  [40.45, 42.2, 'ケーキを全部*食べてしまった*。'],
  [42.7, 44.43, 'Aku *malah* menghabiskan semua kuenya.'],
  [45.16, 46.98, '大事なファイルを*消してしまった*。'],
  [47.42, 49.25, 'Aku *tidak sengaja* menghapus file penting.'],
  [50.07, 54.3, 'Nah, jadi jangan mengartikan ～てしまう', '*hanya* sebagai “selesai”, ya.'],
  [54.67, 55.59, 'Perhatikan *konteksnya*.'],
  [55.85, 59.88, 'Terutama ketika ada rasa *menyesal*', 'atau sesuatu terjadi *di luar keinginan*.'],
  [60.69, 65.12, 'Kalau mau belajar *konjugasi* kata kerja bahasa Jepang', 'dan langsung mencoba berbagai bentuknya,'],
  [65.53, 66.76, 'coba sekarang di *SevnQuest*.'],
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
  {at: 0.92, name: 'tick', vol: 0.3}, // gagang pintu
  {at: 1.2, name: 'pop', vol: 0.4}, // KETINGGALAN?
  {at: 1.8, name: 'whoosh', vol: 0.22},
  {at: 2.45, name: 'tick', vol: 0.22},
  {at: 2.7, name: 'tick', vol: 0.22},
  {at: 2.95, name: 'tick', vol: 0.22},
  {at: 3.2, name: 'tick', vol: 0.22},
  {at: 3.45, name: 'tick', vol: 0.22},
  {at: 3.95, name: 'pop', vol: 0.3},
  {at: 4.12, name: 'impact', vol: 0.22}, // LAH, HABIS?
  {at: 4.74, name: 'swipe', vol: 0.28}, // piring → kartu
  {at: 8.06, name: 'chime', vol: 0.26}, // てしまう
  {at: 9.05, name: 'pop', vol: 0.26},
  {at: 10.35, name: 'ding', vol: 0.2},
  {at: 12.2, name: 'swipe', vol: 0.24},
  {at: 14.95, name: 'pop', vol: 0.34}, // +
  {at: 15.35, name: 'swipe', vol: 0.24},
  {at: 15.72, name: 'click', vol: 0.3}, // bracket
  {at: 19.98, name: 'swipe', vol: 0.3}, // → ちゃう
  {at: 20.1, name: 'pop', vol: 0.3},
  {at: 22.05, name: 'swipe', vol: 0.3}, // → じゃう
  {at: 22.17, name: 'pop', vol: 0.3},
  {at: 23.05, name: 'whoosh', vol: 0.2},
  {at: 24.2, name: 'pop', vol: 0.24},
  {at: 25.4, name: 'swipe', vol: 0.24},
  {at: 27.85, name: 'ding', vol: 0.26}, // selesai
  {at: 31.55, name: 'thud', vol: 0.3}, // PENYESALAN
  {at: 32.72, name: 'error', vol: 0.2}, // file terhapus
  {at: 33.0, name: 'thud', vol: 0.3}, // TIDAK DISENGAJA
  {at: 34.55, name: 'pop', vol: 0.34}, // CONTOH
  {at: 37.45, name: 'tick', vol: 0.3},
  {at: 39.82, name: 'whoosh', vol: 0.2},
  {at: 42.0, name: 'tick', vol: 0.3},
  {at: 44.5, name: 'swipe', vol: 0.24}, // piring → jendela
  {at: 46.2, name: 'click', vol: 0.34}, // hapus
  {at: 46.34, name: 'error', vol: 0.2},
  {at: 49.35, name: 'whoosh', vol: 0.2},
  {at: 51.2, name: 'pop', vol: 0.28}, // SELESAI?
  {at: 53.3, name: 'pop', vol: 0.24},
  {at: 54.36, name: 'impact', vol: 0.22}, // KONTEKS
  {at: 56.6, name: 'thud', vol: 0.28},
  {at: 58.2, name: 'thud', vol: 0.28},
  {at: 60.15, name: 'whoosh', vol: 0.22},
  {at: 61.7, name: 'ding', vol: 0.24},
  {at: 62.5, name: 'click', vol: 0.34},
  {at: 63.6, name: 'click', vol: 0.34},
  {at: 65.45, name: 'chime', vol: 0.34}, // logo
];
