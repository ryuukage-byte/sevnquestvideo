import React from 'react';
import {C} from '../../../shared/theme';
import {At, Glyphs, MaskWords, ps, sp, useF} from '../kit';

// A1 · S01–S02 (0–8.9 dtk): tiga kata itu muncul berurutan, lalu pertanyaan "apa bedanya?".
// Baris pertama (あげる) nanti menjadi kata-hero — glyph-nya bergeser dari posisi ini (lihat Hero.tsx).

const SIZE = 104;
const X0 = 540 - (3 * SIZE) / 2; // baris 3 glyph, pusat x = 540

type Row = {ids: string[]; cy: number; at: number; fade?: [number, number]};
const ROWS: Row[] = [
  {ids: ['a', 'g', 'r'], cy: 520, at: 1.0},
  {ids: ['k', 're', 'r2'], cy: 720, at: 2.6, fade: [8.2, 8.8]},
  {ids: ['m', 'ra', 'u'], cy: 920, at: 4.2, fade: [8.2, 8.8]},
];

const CHARS: Record<string, {ch: string}> = {
  a: {ch: 'あ'},
  g: {ch: 'げ'},
  r: {ch: 'る'},
  k: {ch: 'く'},
  re: {ch: 'れ'},
  r2: {ch: 'る'},
  m: {ch: 'も'},
  ra: {ch: 'ら'},
  u: {ch: 'う'},
};

export const Act1_Hook: React.FC = () => {
  const f = useF();
  const poses: Record<string, {x: number; y: number; s: number; o: number}> = {};
  ROWS.forEach((row) => {
    const p = sp(f, row.at);
    const dim = row.fade ? 1 - ps(f, row.fade[0], row.fade[1]) : 1;
    row.ids.forEach((id, i) => {
      poses[id] = {x: X0 + (i + 0.5) * SIZE, y: row.cy + (1 - p) * 40, s: SIZE, o: p * dim};
    });
  });

  return (
    <>
      <Glyphs poses={poses} chars={CHARS} color={() => C.gold} />
      <At x={540} y={330}>
        <MaskWords f={f} words={[{t: '?', at: 6.84, color: C.gold}]} size={150} />
      </At>
    </>
  );
};
