import {FPS} from '../../shared/theme';

export const sec = (s: number) => Math.round(s * FPS);

// Satu komposisi, 9 blok. Batas blok = awal storyboard-scene berikutnya (celah antar scene = hold).
// Storyboard scene -> blok:
//   A: S01–S08 (0:00.00)  B: S09 (0:12.16)  C: S10 (0:15.59)  D: S11 (0:18.47)
//   E: S12–S15 (0:21.01)  F: S16 (0:38.08)  G: S17 (0:49.17)  H: S18 (1:03.45)  I: S19 (1:19.31)
export const TOTAL_SEC = 84.12; // 01:24.12
export const TOTAL_FRAMES = sec(TOTAL_SEC);

export interface BlockMeta {
  id: string;
  name: string;
  start: number; // detik
  end: number; // detik
}

export const BLOCKS: BlockMeta[] = [
  {id: 'compare', name: 'S01–08 · Dua kalimat mirip', start: 0, end: 12.16},
  {id: 'confused', name: 'S09 · Bingung membandingkan', start: 12.16, end: 15.59},
  {id: 'which', name: 'S10 · Kapan pakai yang mana', start: 15.59, end: 18.47},
  {id: 'situation', name: 'S11 · Situasi sederhana', start: 18.47, end: 21.01},
  {id: 'split', name: 'S12–15 · 49 : 51', start: 21.01, end: 38.08},
  {id: 'ru', name: 'S16 · Bentuk る', start: 38.08, end: 49.17},
  {id: 'ta', name: 'S17 · Bentuk た', start: 49.17, end: 63.45},
  {id: 'recap', name: 'S18 · Recap', start: 63.45, end: 79.31},
  {id: 'cta', name: 'S19 · CTA', start: 79.31, end: TOTAL_SEC},
];
