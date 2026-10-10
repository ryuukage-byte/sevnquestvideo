import React from 'react';
import {C} from '../../../shared/theme';
import {EASE_IO, GKey, T, io, mix, ps, useF} from '../kit';
import {Actor, Chars, GlyphLine} from '../props';

// S21–S23 — "apa bedanya?": karakter bertanya di tengah kedua objek.
// S24–S25 — percakapan sehari-hari; 〜ておく disingkat (hero jadi 〜とく di S25).
// S26–S28 — tiga contoh: しておく→しとく · 読んでおく→読んどく · 置いておく→置いとく (て+お → と / ど).

const FLOOR = 1190;
const ROW_SIZE = 48;

// --- S26 ---
const R1: Chars = {
  p1: {ch: 'し'},
  p2: {ch: 'て'},
  p3: {ch: 'お'},
  p4: {ch: 'く'},
  p5: {ch: 'と'},
};
const R1_KEYS: GKey[] = [
  {at: 87.73, row: ['p1', 'p2', 'p3', 'p4'], size: ROW_SIZE, cy: 1245, stagger: 0.08, dur: 0.5},
  {at: 88.3, row: ['p1', 'p5', 'p4'], size: ROW_SIZE, cy: 1245, dur: 0.45, from: {p5: {x: 540, y: 1245, s: ROW_SIZE}}, to: {p2: {x: 540, y: 1245, s: ROW_SIZE}, p3: {x: 540, y: 1245, s: ROW_SIZE}}},
];

// --- S27 ---
const R2: Chars = {
  q1: {ch: '読', ruby: 'よん'},
  q2: {ch: 'ん'},
  q3: {ch: 'で'},
  q4: {ch: 'お'},
  q5: {ch: 'く'},
  q6: {ch: 'ど'},
};
const R2_KEYS: GKey[] = [
  {at: 90.4, row: ['q1', 'q2', 'q3', 'q4', 'q5'], size: ROW_SIZE, cy: 1320, stagger: 0.08, dur: 0.5},
  {at: 91.0, row: ['q1', 'q2', 'q6', 'q5'], size: ROW_SIZE, cy: 1320, dur: 0.45, from: {q6: {x: 564, y: 1320, s: ROW_SIZE}}, to: {q3: {x: 564, y: 1320, s: ROW_SIZE}, q4: {x: 564, y: 1320, s: ROW_SIZE}}},
];

// --- S28 ---
const R3: Chars = {
  r1: {ch: '置', ruby: 'お'},
  r2: {ch: 'い'},
  r3: {ch: 'て'},
  r4: {ch: 'お'},
  r5: {ch: 'く'},
  r6: {ch: 'と'},
};
const R3_KEYS: GKey[] = [
  {at: 93.12, row: ['r1', 'r2', 'r3', 'r4', 'r5'], size: ROW_SIZE, cy: 1395, stagger: 0.08, dur: 0.5},
  {at: 94.0, row: ['r1', 'r2', 'r6', 'r5'], size: ROW_SIZE, cy: 1395, dur: 0.45, from: {r6: {x: 564, y: 1395, s: ROW_SIZE}}, to: {r3: {x: 564, y: 1395, s: ROW_SIZE}, r4: {x: 564, y: 1395, s: ROW_SIZE}}},
];

const CHANGED = (ids: string[]) => (id: string) => (ids.includes(id) ? C.gold : C.text);

export const Act4_Singkat: React.FC = () => {
  const f = useF();

  // S21 — karakter tunggal bertanya di antara kalender dan kotak
  const q = io(f, 72.38, 74.35, 0.3, 0.3);
  // S24 — dua karakter bergeser ke sisi lembar untuk percakapan
  const enter = ps(f, 83.5, 84.3, EASE_IO);
  const duo = io(f, 83.5, 87.2, 0.3, 0.4);
  const leftX = mix(-40, 150, enter);
  const rightX = mix(1120, 930, enter);

  // S26–S28 hilang sebelum S29
  const rowsO = 1 - ps(f, 95.2, 95.6);

  return (
    <>
      <Actor x={540} y={FLOOR} h={330} gender="male" expression="confused" bubble="question" o={q} />

      <Actor x={leftX} y={FLOOR} h={330} gender="male" expression="happy" o={duo} />
      <Actor x={rightX} y={FLOOR} h={330} gender="female" flip expression="excited" o={duo} />

      <GlyphLine keys={R1_KEYS} chars={R1} color={CHANGED(['p2', 'p5', 'p3'])} opacity={rowsO * (f >= T(87.73) ? 1 : 0)} />
      <GlyphLine keys={R2_KEYS} chars={R2} color={CHANGED(['q3', 'q4', 'q6'])} opacity={rowsO * (f >= T(90.4) ? 1 : 0)} />
      <GlyphLine keys={R3_KEYS} chars={R3} color={CHANGED(['r3', 'r4', 'r6'])} opacity={rowsO * (f >= T(93.12) ? 1 : 0)} />
    </>
  );
};
