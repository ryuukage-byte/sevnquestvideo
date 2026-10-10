import {interpolate} from 'remotion';
import {EASE} from '../../shared/anim';

export const FPS = 30;

// Exact scene cut points from voice-over timeline (in seconds)
export const T = [
  0.00,  // Scene 01: Hook (0.00s - 6.72s)
  6.72,  // Scene 02: Pattern & Nuance (6.72s - 10.34s)
  10.34, // Scene 03: Okurigana Rule (10.34s - 16.00s)
  16.00, // Scene 04: Kunyomi Examples (16.00s - 18.86s)
  18.86, // Scene 05: Onyomi Pattern & Examples (18.86s - 26.48s)
  26.48, // Scene 06: Exceptions (26.48s - 35.90s)
  35.90, // Scene 07: Core Takeaway & Rule Limitation (35.90s - 47.84s)
  47.84, // Scene 08: Better Learning Strategy Pivot (47.84s - 51.62s)
  51.62, // Scene 09: SevnQuest Multi-Method UI (51.62s - 70.62s)
  70.62, // Scene 10: CTA (70.62s - 73.00s)
  73.00, // End
] as const;

export const sec = (s: number) => Math.round(s * FPS);

export const TOTAL_FRAMES = sec(T[T.length - 1]); // 2190 frames @ 30 FPS (~73.0s)

export interface SceneMeta {
  id: string;
  name: string;
  startSec: number;
  endSec: number;
  from: number;
  dur: number;
}

export const SCENES: SceneMeta[] = [
  {
    id: 'scene_01',
    name: '01 · Hook: Rumor Pola Kanji',
    startSec: T[0],
    endSec: T[1],
    from: sec(T[0]),
    dur: sec(T[1]) - sec(T[0]),
  },
  {
    id: 'scene_02',
    name: '02 · Pattern: Ada Benernya vs Gak Selalu',
    startSec: T[1],
    endSec: T[2],
    from: sec(T[1]),
    dur: sec(T[2]) - sec(T[1]),
  },
  {
    id: 'scene_03',
    name: '03 · Okurigana: 食｜べる Transformasi',
    startSec: T[2],
    endSec: T[3],
    from: sec(T[2]),
    dur: sec(T[3]) - sec(T[2]),
  },
  {
    id: 'scene_04',
    name: '04 · Kunyomi: 食べる & 見る Callout',
    startSec: T[3],
    endSec: T[4],
    from: sec(T[3]),
    dur: sec(T[4]) - sec(T[3]),
  },
  {
    id: 'scene_05',
    name: '05 · Onyomi: Kanji + Kanji (学校・電車)',
    startSec: T[4],
    endSec: T[5],
    from: sec(T[4]),
    dur: sec(T[5]) - sec(T[4]),
  },
  {
    id: 'scene_06',
    name: '06 · Exceptions: 手紙・大人 (≠ Otomatis Onyomi)',
    startSec: T[5],
    endSec: T[6],
    from: sec(T[5]),
    dur: sec(T[6]) - sec(T[5]),
  },
  {
    id: 'scene_07',
    name: '07 · Takeaway: Alur 5 Langkah & Pola vs Kosakata',
    startSec: T[6],
    endSec: T[7],
    from: sec(T[6]),
    dur: sec(T[7]) - sec(T[6]),
  },
  {
    id: 'scene_08',
    name: '08 · Strategy: Cara Belajar Gak Harus Satu',
    startSec: T[7],
    endSec: T[8],
    from: sec(T[7]),
    dur: sec(T[8]) - sec(T[7]),
  },
  {
    id: 'scene_09',
    name: '09 · SevnQuest: 4 Learning Methods & Terus Belajar',
    startSec: T[8],
    endSec: T[9],
    from: sec(T[8]),
    dur: sec(T[9]) - sec(T[8]),
  },
  {
    id: 'scene_10',
    name: '10 · CTA: Coba Sekarang di SevnQuest',
    startSec: T[9],
    endSec: T[10],
    from: sec(T[9]),
    dur: sec(T[10]) - sec(T[9]),
  },
];

// Helper interpolasi waktu (detik)
export const progBetweenSec = (
  f: number,
  startSec: number,
  endSec: number,
  easing: (t: number) => number = EASE,
) => {
  const s = sec(startSec);
  const e = sec(endSec);
  return interpolate(f, [s, e], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
};

export const progBetween = (
  f: number,
  startFrame: number,
  endFrame: number,
  easing: (t: number) => number = EASE,
) =>
  interpolate(f, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

// Exact Voice-Over segments for Synchronized Educational Captions
export interface CaptionSegment {
  s: number;
  e: number;
  text: string;
  keyword?: string;
  color?: string;
}

export const CAPTIONS: CaptionSegment[] = [
  {
    s: 0.00,
    e: 3.30,
    text: 'Bener gak sih kanji + hiragana = kunyomi,',
    keyword: 'kunyomi',
    color: '#4fae86',
  },
  {
    s: 3.30,
    e: 6.72,
    text: 'kanji + kanji = onyomi?',
    keyword: 'onyomi',
    color: '#9b65c9',
  },
  {
    s: 6.72,
    e: 10.34,
    text: 'Jawabannya: ada benernya, tapi gak selalu.',
    keyword: 'gak selalu',
    color: '#f0be52',
  },
  {
    s: 10.34,
    e: 16.00,
    text: 'Kalau kanji diikuti hiragana (okurigana), memang sering kunyomi.',
    keyword: 'okurigana',
    color: '#4fae86',
  },
  {
    s: 16.00,
    e: 18.86,
    text: 'Contohnya: 食べる (taberu), 見る (miru).',
    keyword: '食べる / 見る',
    color: '#fde8a8',
  },
  {
    s: 18.86,
    e: 23.92,
    text: 'Sedangkan kalau beberapa kanji membentuk satu kata, seringnya onyomi.',
    keyword: 'onyomi',
    color: '#9b65c9',
  },
  {
    s: 23.92,
    e: 26.48,
    text: 'Contohnya: 学校 (gakko), 電車 (densha).',
    keyword: '学校 / 電車',
    color: '#fde8a8',
  },
  {
    s: 26.48,
    e: 31.48,
    text: 'Tapi hati-hati, ada kata seperti 手紙 (tegami) dan 大人 (otona).',
    keyword: '手紙 / 大人',
    color: '#e2555b',
  },
  {
    s: 31.48,
    e: 35.90,
    text: 'Keduanya kanji + kanji, tapi bukan pola onyomi biasa.',
    keyword: 'bukan pola biasa',
    color: '#f0be52',
  },
  {
    s: 35.90,
    e: 41.26,
    text: 'Kunyomi dan onyomi itu punya pola, tapi bukan rumus pasti.',
    keyword: 'bukan rumus pasti',
    color: '#e2555b',
  },
  {
    s: 41.26,
    e: 44.82,
    text: 'Boleh pakai pola ini buat bantu kamu nebak bacaan…',
    keyword: 'bantu nebak',
    color: '#97b5e0',
  },
  {
    s: 44.82,
    e: 47.84,
    text: '…tapi jangan bergantung sepenuhnya sama pola ini.',
    keyword: 'jangan bergantung',
    color: '#f0be52',
  },
  {
    s: 47.84,
    e: 51.62,
    text: 'Karena dalam belajar bahasa Jepang, cara belajarnya gak harus satu.',
    keyword: 'gak harus satu',
    color: '#f0be52',
  },
  {
    s: 51.62,
    e: 54.20,
    text: 'Mau hafalan pakai FLASHCARD? Bisa.',
    keyword: 'FLASHCARD',
    color: '#97b5e0',
  },
  {
    s: 54.20,
    e: 56.92,
    text: 'Mau latihan NULIS KANJI? Bisa.',
    keyword: 'NULIS KANJI',
    color: '#f0be52',
  },
  {
    s: 56.92,
    e: 60.88,
    text: 'Mau belajar dari KOSAKATA atau LATIHAN SOAL? Bisa juga.',
    keyword: 'KOSAKATA / SOAL',
    color: '#4fae86',
  },
  {
    s: 60.88,
    e: 65.38,
    text: 'Di SevnQuest, kamu tinggal pilih cara belajar yang paling cocok.',
    keyword: 'SevnQuest',
    color: '#f0be52',
  },
  {
    s: 65.38,
    e: 70.62,
    text: 'Bukan belajarnya pakai cara apa, tapi yang terpenting: kamu terus belajar!',
    keyword: 'TERUS BELAJAR',
    color: '#4fae86',
  },
  {
    s: 70.62,
    e: 73.00,
    text: 'Coba sekarang di SevnQuest.',
    keyword: 'SevnQuest',
    color: '#f0be52',
  },
];
