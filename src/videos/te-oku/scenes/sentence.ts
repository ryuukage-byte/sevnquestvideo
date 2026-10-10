import {C} from '../../../shared/theme';
import type {GKey} from '../kit';
import type {Chars} from '../props';

// Kalimat 明日試験があるから、今夜は早く寝ておこう。 — dibangun di S11 dan diulang di S29.
// Setiap karakter = satu glyph ber-ID; 寝る → 寝て terjadi lewat ID 's17' (る) yang pergi dan 's18' (て) yang datang.

export const SENT_CY = 1300;
export const SENT_SIZE = 40;

export const SENT_CHARS: Chars = {
  s1: {ch: '明', ruby: 'あした'},
  s2: {ch: '日'},
  s3: {ch: '試', ruby: 'しけん'},
  s4: {ch: '験'},
  s5: {ch: 'が'},
  s6: {ch: 'あ'},
  s7: {ch: 'る'},
  s8: {ch: 'か'},
  s9: {ch: 'ら'},
  s10: {ch: '、'},
  s11: {ch: '今', ruby: 'こんや'},
  s12: {ch: '夜'},
  s13: {ch: 'は'},
  s14: {ch: '早', ruby: 'はやく'},
  s15: {ch: 'く'},
  s16: {ch: '寝', ruby: 'ね'},
  s17: {ch: 'る'},
  s18: {ch: 'て'},
  s19: {ch: 'お'},
  s20: {ch: 'こ'},
  s21: {ch: 'う'},
  s22: {ch: '。'},
};

const ids = (a: number, b: number) => Array.from({length: b - a + 1}, (_, i) => `s${a + i}`);
const FINAL = [...ids(1, 16), ...ids(18, 22)]; // 寝ておこう — tanpa る

// Pembentukan kalimat berkelompok: 明日試験があるから、 → 今夜は → 早く寝る → 寝て → おこう。
export const SENT_BUILD: GKey[] = [
  {at: 35.86, row: ids(1, 10), size: SENT_SIZE, cy: SENT_CY, stagger: 0.05, dur: 0.5},
  {at: 36.6, row: ids(1, 13), size: SENT_SIZE, cy: SENT_CY, stagger: 0.05, dur: 0.5},
  {at: 37.4, row: ids(1, 17), size: SENT_SIZE, cy: SENT_CY, stagger: 0.05, dur: 0.5},
  {at: 38.1, row: [...ids(1, 16), 's18'], size: SENT_SIZE, cy: SENT_CY, dur: 0.4},
  {at: 38.6, row: FINAL, size: SENT_SIZE, cy: SENT_CY, stagger: 0.06, dur: 0.5},
];

// Pengulangan di S29: langsung utuh dengan sedikit stagger.
export const SENT_FULL: GKey[] = [{at: 95.77, row: FINAL, size: SENT_SIZE, cy: SENT_CY, stagger: 0.03, dur: 0.5}];

/** bagian 寝ておこう disorot emas; sisanya teks biasa */
export const SENT_COLOR = (id: string) => (['s16', 's18', 's19', 's20', 's21'].includes(id) ? C.gold : C.text);
