// 勉強しなければならない — Kenapa bentuk negatif malah berarti "harus"?
// Durasi narasi: 02:14.680. Semua anchor di bawah (detik) berasal dari timeline narasi.
import {FPS} from '../../shared/theme';
import type {SfxName} from '../../shared/components/Sfx';

export const DURATION_SEC = 134.68;
// 134.68 dtk @30fps = 4040.4 frame → dibulatkan ke atas agar ekor narasi tidak terpotong.
export const TOTAL_FRAMES = Math.ceil(DURATION_SEC * FPS);

/** detik → frame */
export const T = (sec: number) => Math.round(sec * FPS);

// Subtitle: maksimal dua baris. Kalimat panjang dipecah jadi beberapa potongan berurutan.
type Line = [start: number, end: number, ...chunks: string[]];
const LINES: Line[] = [
  [3.07, 7.24, 'Loh, kok ada bentuk negatif ない,', 'tapi artinya malah harus belajar?'],
  [9.0, 11.05, 'Bukannya ない itu berarti tidak?'],
  [12.17, 13.23, 'Nah, coba kita bongkar pelan-pelan.'],
  [14.5, 19.29, 'Kita mulai dari kata kerja dasar.', '勉強する, artinya belajar.'],
  [20.16, 24.26, 'Sekarang kita ubah ke bentuk negatif.', 'する menjadi しない.'],
  [25.34, 31.22, 'Fungsi ない adalah menyatakan tidak.', 'Jadi, 勉強しない berarti tidak belajar.'],
  [32.22, 37.99, 'Sekarang ubah ない menjadi なければ.', 'しない menjadi しなければ.'],
  [
    38.88,
    46.91,
    'Fungsi なければ adalah menyatakan kondisi kalau tidak.',
    'Jadi, 勉強しなければ artinya kalau tidak belajar.',
  ],
  [47.87, 50.9, 'Tapi kalimatnya belum selesai.', 'Kita baru menyebutkan kondisinya.'],
  [51.89, 53.61, 'Sekarang tambahkan ならない.'],
  [
    54.53,
    60.3,
    'Dalam pola ini, ならない bisa dipahami sebagai',
    'tidak boleh begitu atau tidak bisa dibiarkan.',
  ],
  // Naskah aslinya terpotong ("Coba gabungkan logikanya...") — lanjutan di bawah perlu dicek ke narasi.
  [61.25, 68.49, 'Coba gabungkan logikanya:', 'kalau tidak belajar, itu tidak boleh terjadi.'],
  [69.39, 72.35, 'Artinya, kondisi tidak belajar tidak diperbolehkan.'],
  [73.28, 76.75, 'Kalau tidak belajar tidak boleh,', 'berarti ya harus belajar.'],
  [77.68, 81.85, 'Makanya, 勉強しなければならない', 'artinya harus belajar.'],
  [
    82.84,
    87.97,
    'Nah, sekarang paham kan?',
    'Bentuk negatif nggak selalu membuat keseluruhan kalimat bermakna negatif.',
  ],
  [
    88.75,
    94.51,
    'Ketika なければ dan ならない digabung,',
    'keduanya membentuk pola yang menyatakan kewajiban.',
  ],
  [
    95.32,
    102.32,
    'Inilah menariknya grammar Jepang.',
    'Dengan memahami fungsi setiap bagian,',
    'kita jadi tahu kenapa sebuah pola bisa menghasilkan makna tertentu.',
  ],
  [
    103.31,
    108.29,
    'Nah, kamu juga bisa belajar menyusun pola seperti ini',
    'lewat fitur Grammar Fusion di SevnQuest.',
  ],
  [109.0, 112.0, 'Caranya gampang.', 'Buka SevnQuest, lalu klik World.'],
  [112.71, 113.73, 'Masuk ke Dungeon.'],
  [114.41, 115.98, 'Pilih Dungeon Grammar Fusion.'],
  [
    116.77,
    122.78,
    'Di sini, kamu akan dibimbing menyusun pola grammar langkah demi langkah.',
    'Dari bentuk asal sampai menjadi pola tujuan.',
  ],
  [
    123.61,
    127.67,
    'Jadi bukan cuma menghafal hasil akhirnya,',
    'tapi juga memahami proses terbentuknya.',
  ],
  [128.37, 130.54, 'Yuk, coba Grammar Fusion di SevnQuest.'],
  [131.18, 134.26, 'Jangan cuma hafal polanya.', 'Pahami cara menyusunnya!'],
];

export interface CaptionCue {
  from: number;
  dur: number;
  text: string;
}

export const CAPTIONS: CaptionCue[] = LINES.flatMap(([start, end, ...chunks]) => {
  const total = chunks.reduce((a, c) => a + c.length, 0);
  let acc = 0;
  return chunks.map((text) => {
    const s = start + ((end - start) * acc) / total;
    acc += text.length;
    const e = start + ((end - start) * acc) / total;
    return {from: T(s), dur: Math.max(1, T(e) - T(s)), text};
  });
});

// SFX mengikuti anchor animasi yang sama; volume rendah supaya tidak menutupi narasi.
const S = (sec: number, name: SfxName, vol: number) => ({at: T(sec), name, vol});
export const SFX: {at: number; name: SfxName; vol: number}[] = [
  S(0.25, 'whoosh-soft', 0.3), S(0.9, 'impact-soft', 0.3), S(4.0, 'pop', 0.3), S(5.7, 'thud', 0.28),
  S(6.3, 'pop', 0.25), S(9.1, 'tick', 0.35), S(10.0, 'tick', 0.35), S(12.2, 'swipe', 0.3),
  S(13.3, 'whoosh-soft', 0.3), S(14.6, 'swipe', 0.25), S(16.5, 'click', 0.4), S(18.3, 'pop', 0.25),
  S(22.6, 'swipe', 0.3), S(23.0, 'click', 0.4), S(25.6, 'tick', 0.35), S(29.2, 'pop', 0.28),
  S(34.4, 'swipe', 0.3), S(34.8, 'click', 0.4), S(39.3, 'tick', 0.35), S(44.0, 'pop', 0.28),
  S(45.2, 'tick', 0.3), S(48.0, 'descend', 0.18), S(52.0, 'whoosh-soft', 0.3), S(52.95, 'impact-soft', 0.4),
  S(53.0, 'click', 0.45), S(56.5, 'pop', 0.3), S(61.0, 'swipe', 0.25), S(64.4, 'tick', 0.3),
  S(66.8, 'thud', 0.35), S(69.5, 'tick', 0.3), S(73.4, 'swipe', 0.25), S(74.6, 'tick', 0.35),
  S(74.8, 'tick', 0.35), S(75.25, 'impact', 0.32), S(75.35, 'chime', 0.4), S(77.7, 'whoosh-soft', 0.28),
  S(79.0, 'sparkle', 0.3), S(83.3, 'pop', 0.25), S(86.5, 'swipe', 0.25), S(88.8, 'swipe', 0.25),
  S(91.6, 'ding', 0.3), S(93.6, 'click', 0.4), S(96.0, 'tick', 0.3), S(97.2, 'tick', 0.3),
  S(98.4, 'tick', 0.3), S(99.6, 'ding', 0.3), S(101.0, 'whoosh-soft', 0.3), S(103.5, 'impact-soft', 0.3),
  S(109.2, 'swipe', 0.22), S(111.2, 'tap', 0.5), S(113.0, 'tap', 0.5), S(115.5, 'tap', 0.5),
  S(116.0, 'whoosh-soft', 0.25), S(117.2, 'tap', 0.45), S(117.8, 'tap', 0.45), S(118.0, 'ding', 0.3),
  S(119.2, 'tap', 0.45), S(119.8, 'tap', 0.45), S(120.0, 'ding', 0.3), S(121.1, 'tap', 0.45),
  S(121.7, 'tap', 0.45), S(121.9, 'chime', 0.4), S(123.6, 'swipe', 0.25), S(125.6, 'pop', 0.28),
  S(128.2, 'whoosh-soft', 0.28), S(128.6, 'impact-soft', 0.3), S(131.2, 'swipe', 0.22),
  S(132.7, 'whoosh-soft', 0.25), S(132.95, 'chime', 0.35),
];
