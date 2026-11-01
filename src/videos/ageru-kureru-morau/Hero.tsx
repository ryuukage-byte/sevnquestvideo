import React from 'react';
import {C} from '../../shared/theme';
import {GKey, Glyphs, glyphPoses, useF} from './kit';

// Kata kerja-hero: SATU elemen persisten. Berubah dengan glyph ber-ID yang berpindah —
// あげる → くれる: る (ID 'r') tetap di tempatnya, あ・げ berubah jadi く・れ.
// くれる → もらう: seluruh glyph diganti, tetapi tetap mengalir dari posisi lama.
// Posisi awal あげる (H1 → H2 → H3) mengikuti layout di SEVNQUEST.md §6.

const CHARS: Record<string, {ch: string}> = {
  a: {ch: 'あ'},
  g: {ch: 'げ'},
  r: {ch: 'る'},
  k: {ch: 'く'},
  re: {ch: 'れ'},
  m: {ch: 'も'},
  ra: {ch: 'ら'},
  u: {ch: 'う'},
};

// Posisi baris kata pada hook (dipakai sebagai titik asal saat kata masuk ke hero).
const HOOK_ROW_Y = 520;
const HOOK_ROW_X = [436, 540, 644];
const HOOK_SIZE = 104;

export const KEYS: GKey[] = [
  // H1: あげる besar di tengah (S03) — datang dari baris hook
  {
    at: 8.95,
    dur: 0.7,
    row: ['a', 'g', 'r'],
    size: 150,
    cy: 720,
    from: {
      a: {x: HOOK_ROW_X[0], y: HOOK_ROW_Y, s: HOOK_SIZE},
      g: {x: HOOK_ROW_X[1], y: HOOK_ROW_Y, s: HOOK_SIZE},
      r: {x: HOOK_ROW_X[2], y: HOOK_ROW_Y, s: HOOK_SIZE},
    },
  },
  // H2: naik ke atas panggung-kosong (S04)
  {at: 11.6, dur: 0.7, row: ['a', 'g', 'r'], size: 150, cy: 560},
  // H3: kecil di judul, memberi ruang untuk kartu pola (S05)
  {at: 16.6, dur: 0.6, row: ['a', 'g', 'r'], size: 110, cy: 300},
  // くれる (S11): る tetap, あ・げ → く・れ
  {at: 28.6, dur: 0.7, row: ['k', 're', 'r'], size: 150, cy: 560},
  {at: 39.4, dur: 0.6, row: ['k', 're', 'r'], size: 110, cy: 300},
  // もらう (S19): mengalir dari くれる
  {at: 51.1, dur: 0.7, row: ['m', 'ra', 'u'], size: 150, cy: 560},
  {at: 54.4, dur: 0.6, row: ['m', 'ra', 'u'], size: 110, cy: 300},
];

export const PatternHero: React.FC = () => {
  const f = useF();
  const poses = glyphPoses(KEYS, f);
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <Glyphs poses={poses} chars={CHARS} color={() => C.gold} />
    </div>
  );
};
