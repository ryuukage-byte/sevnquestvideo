import {FPS} from '../../shared/theme';

export const sec = (s: number) => Math.round(s * FPS);

/**
 * Durasi total audio "video 7.wav": 161.32 detik (4.840 frame @ 30 FPS)
 */
export const TOTAL_SEC = 161.32;
export const TOTAL_FRAMES = 4840;

export interface ActMeta {
  id: string;
  name: string;
  cues: string;
  start: number;
  end: number;
}

export const ACTS: ActMeta[] = [
  {
    id: 'act1_hook',
    name: '01. DILEMA & PERTANYAAN AWAL',
    cues: 'Cue 01–07',
    start: 0.00,
    end: 23.25,
  },
  {
    id: 'act2_huruf',
    name: '02. PERBEDAAN UTAMA: HURUF',
    cues: 'Cue 08–11',
    start: 23.25,
    end: 41.83,
  },
  {
    id: 'act3_tiga_pilar',
    name: '03. TIGA PILAR FONDASI',
    cues: 'Cue 12–16',
    start: 41.83,
    end: 57.07,
  },
  {
    id: 'act4_kosakata_kanji',
    name: '04. KOSAKATA & AKAR KANJI',
    cues: 'Cue 17–27',
    start: 57.07,
    end: 89.97,
  },
  {
    id: 'act5_pola_kalimat',
    name: '05. MERANGKAI POLA KALIMAT',
    cues: 'Cue 28–37',
    start: 89.97,
    end: 118.94,
  },
  {
    id: 'act6_roadmap',
    name: '06. HAPUS BEBAN & ROADMAP',
    cues: 'Cue 38–44',
    start: 118.94,
    end: 142.23,
  },
  {
    id: 'act7_cta',
    name: '07. FILOSOFI & CTA SEVNQUEST',
    cues: 'Cue 45–50',
    start: 142.23,
    end: 161.32,
  },
];

export interface SubtitleItem {
  id: number;
  start: number;
  end: number;
  text: string;
}

export const SUBTITLES: SubtitleItem[] = [
  { id: 1, start: 0.00, end: 3.64, text: "“Bang, aku mau belajar bahasa Jepang, tapi bingung mau mulai dari mana.”" },
  { id: 2, start: 4.63, end: 9.68, text: "Oke, ini sebenarnya masalah yang sering ditemukan ketika kita mau belajar bahasa apa pun." },
  { id: 3, start: 10.37, end: 12.81, text: "Karena sebelum mulai belajar, kita perlu tahu dulu:" },
  { id: 4, start: 13.51, end: 15.03, text: "“Bahasa ini sebenarnya seperti apa?”" },
  { id: 5, start: 15.80, end: 18.08, text: "Apakah punya dasar yang sama dengan bahasa kita?" },
  { id: 6, start: 18.80, end: 19.93, text: "Bagaimana cara membacanya?" },
  { id: 7, start: 20.71, end: 22.22, text: "Bagaimana cara menyusun kalimatnya?" },
  { id: 8, start: 23.25, end: 27.01, text: "Nah, kalau bahasa Jepang, ada satu hal yang langsung kelihatan berbeda:" },
  { id: 9, start: 27.69, end: 28.22, text: "hurufnya." },
  { id: 10, start: 28.95, end: 35.40, text: "Kita terbiasa dengan alfabet A, B, C, sedangkan bahasa Jepang punya hiragana, katakana, dan kanji." },
  { id: 11, start: 36.32, end: 41.12, text: "Jadi kalau kamu benar-benar mulai dari nol, jangan langsung loncat ke grammar yang rumit." },
  { id: 12, start: 41.83, end: 44.91, text: "Secara sederhana, ada 3 hal utama yang perlu kamu bangun:" },
  { id: 13, start: 45.61, end: 48.17, text: "Huruf, kosakata, dan pola kalimat." },
  { id: 14, start: 49.02, end: 50.12, text: "Pertama, huruf." },
  { id: 15, start: 50.92, end: 54.60, text: "Mulai dari hiragana dan katakana dulu sampai kamu terbiasa membaca." },
  { id: 16, start: 55.24, end: 57.07, text: "Setelah itu, mulai bangun kosakata." },
  { id: 17, start: 57.70, end: 58.24, text: "Misalnya:" },
  { id: 18, start: 58.85, end: 61.69, text: "食べる — たべる — makan" },
  { id: 19, start: 62.41, end: 64.90, text: "飲む — のむ — minum" },
  { id: 20, start: 65.68, end: 67.78, text: "行く — いく — pergi" },
  { id: 21, start: 68.74, end: 72.35, text: "Nah, sambil kosakata kamu bertambah, kamu bisa mulai mengenal kanji." },
  { id: 22, start: 72.98, end: 73.50, text: "Misalnya:" },
  { id: 23, start: 73.86, end: 76.27, text: "食べる → 食" },
  { id: 24, start: 76.83, end: 78.20, text: "飲む → 飲" },
  { id: 25, start: 78.77, end: 80.35, text: "行く → 行" },
  { id: 26, start: 80.90, end: 84.37, text: "Jadi jangan melihat kanji hanya sebagai gambar yang harus dihafal." },
  { id: 27, start: 85.03, end: 89.55, text: "Lebih bagus kalau kamu belajar kanji bersama kata yang menggunakannya." },
  { id: 28, start: 89.97, end: 93.06, text: "Setelah kamu punya sedikit bekal kosakata, baru mulai masuk ke pola kalimat." },
  { id: 29, start: 94.23, end: 98.00, text: "Misalnya kamu sudah tahu:" },
  { id: 30, start: 98.66, end: 99.85, text: "私 = saya" },
  { id: 31, start: 100.18, end: 100.88, text: "学校 = sekolah" },
  { id: 32, start: 101.20, end: 102.17, text: "行く = pergi" },
  { id: 33, start: 102.89, end: 104.74, text: "Kemudian kamu belajar bagaimana menggabungkannya:" },
  { id: 34, start: 105.47, end: 107.17, text: "私は学校に行きます。" },
  { id: 35, start: 108.05, end: 110.23, text: "Watashi wa gakkou ni ikimasu." },
  { id: 36, start: 111.03, end: 113.39, text: "“Saya pergi ke sekolah.”" },
  { id: 37, start: 114.04, end: 117.96, text: "Dari sini baru kamu mulai memahami fungsi は, に, を, で, perubahan kata kerja, dan pola-pola lainnya." },
  { id: 38, start: 118.94, end: 122.01, text: "Jadi kalau kamu benar-benar baru mulai, jangan langsung berpikir:" },
  { id: 39, start: 122.49, end: 124.80, text: "“Aku harus hafal ribuan kosakata.”" },
  { id: 40, start: 124.80, end: 127.05, text: "“Aku harus hafal semua grammar N5.”" },
  { id: 41, start: 127.91, end: 131.16, text: "“Aku harus hafal banyak kanji.”" },
  { id: 42, start: 131.86, end: 133.58, text: "Nggak perlu." },
  { id: 43, start: 134.13, end: 136.01, text: "Bangun pondasinya sedikit demi sedikit:" },
  { id: 44, start: 136.63, end: 141.61, text: "Huruf → Kosakata → Kanji → Pola kalimat → Penggunaan." },
  { id: 45, start: 142.23, end: 144.69, text: "Karena tujuan belajar bahasa bukan cuma:" },
  { id: 46, start: 145.15, end: 147.19, text: "“Aku hafal bahasa Jepang.”" },
  { id: 47, start: 147.19, end: 149.23, text: "Tapi:" },
  { id: 48, start: 149.61, end: 151.85, text: "“Aku bisa menggunakan bahasa Jepang.”" },
  { id: 49, start: 152.40, end: 159.24, text: "Kalau kamu mau mulai belajar bahasa Jepang dari dasar, tapi masih bingung harus mulai dari mana," },
  { id: 50, start: 159.81, end: 161.32, text: "coba sekarang di SevnQuest." },
];
