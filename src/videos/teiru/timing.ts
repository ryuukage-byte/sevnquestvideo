import {FPS} from '../../shared/theme';

export const sec = (s: number) => Math.round(s * FPS);

// Topic: ている tidak selalu berarti "sedang"
// Duration: 02:59.64 = 179.64 detik
// 8 Visual Worlds
export const TOTAL_SEC = 179.64;
export const TOTAL_FRAMES = 5389; // Math.round(179.64 * 30)

export interface WorldMeta {
  id: string;
  name: string;
  start: number; // detik
  end: number; // detik
}

export const WORLDS: WorldMeta[] = [
  {id: 'quiz', name: 'W01 · QUIZ / ESTABLISHMENT (00:00–00:16)', start: 0, end: 16.0},
  {id: 'break', name: 'W02 · PATTERN BREAK: 知っている (00:16–00:31)', start: 16.0, end: 31.0},
  {id: 'activity', name: 'W03 · ACTIVITY = CURRENT ACTION (00:31–00:45)', start: 31.0, end: 45.0},
  {id: 'shiru', name: 'W04 · 知る → 知っている (00:45–01:18)', start: 45.0, end: 78.0},
  {id: 'tanaka', name: 'W05 · 田中さん CONVERSATION (01:18–01:29)', start: 78.0, end: 89.0},
  {id: 'kekkon', name: 'W06 · 結婚する → 結婚している (01:29–02:08)', start: 89.0, end: 128.0},
  {id: 'two_functions', name: 'W07 · TWO FUNCTIONS OF ている (02:08–02:36)', start: 128.0, end: 156.0},
  {id: 'product_cta', name: 'W08 · SEVNQUEST PRODUCT + CTA (02:36–02:59.64)', start: 156.0, end: TOTAL_SEC},
];
