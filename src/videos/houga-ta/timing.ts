import {FPS} from '../../shared/theme';

export const sec = (s: number) => Math.round(s * FPS);

// Vた + ほうがいい — 27 scene storyboard dikelompokkan jadi 6 "dunia" visual.
export const TOTAL_SEC = 116; // 01:56
export const TOTAL_FRAMES = sec(TOTAL_SEC);

export interface WorldMeta {
  id: string;
  name: string;
  start: number;
  end: number;
}

export const WORLDS: WorldMeta[] = [
  {id: 'hook', name: 'HOOK · S01–04', start: 0, end: 21},
  {id: 'concept', name: 'CONCEPT · S05–10', start: 21, end: 49},
  {id: 'second', name: 'SECOND EXAMPLE · S11–14', start: 49, end: 66},
  {id: 'core', name: 'CORE EXPLANATION · S15–18', start: 66, end: 82},
  {id: 'conj', name: 'KONJUGASI · S19–21', start: 82, end: 98},
  {id: 'product', name: 'PRODUCT · S22–27', start: 98, end: TOTAL_SEC},
];
