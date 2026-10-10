import React from 'react';
import {C, FONT} from '../../../shared/theme';
import {At, EASE_IO, T, io, kf, mix, ps, useF} from '../kit';
import {Actor, Chars, GlyphLine} from '../props';
import type {GKey} from '../kit';

// S15–S18 — "menaruh barang": dua karakter, gelembung tanya, kalimat その荷物、そこに置いといて。
// S19–S20 — makna おく dan membiarkan; kotak tetap diam di lantai (dikelola lapisan persisten).

const LINE_Y = 1300;
const FLOOR = 1190;

const SENT: Chars = {
  a1: {ch: 'そ'},
  a2: {ch: 'の'},
  a3: {ch: '荷', ruby: 'にもつ'},
  a4: {ch: '物'},
  a5: {ch: '、'},
  a6: {ch: 'そ'},
  a7: {ch: 'こ'},
  a8: {ch: 'に'},
  a9: {ch: '置', ruby: 'おいといて'},
  a10: {ch: 'い'},
  a11: {ch: 'と'},
  a12: {ch: 'い'},
  a13: {ch: 'て'},
  a14: {ch: '。'},
};
const SENT_IDS = Object.keys(SENT);
const SENT_KEYS: GKey[] = [{at: 58.95, row: SENT_IDS, size: 40, cy: LINE_Y, stagger: 0.05, dur: 0.5}];

export const Act3_Biarkan: React.FC = () => {
  const f = useF();

  // karakter pertama (pria) berjalan mendekati kotak dan memunculkan gelembung tanya
  const walk = ps(f, 53.9, 55.2, EASE_IO);
  const leftX = mix(130, 300, walk);
  const leftO = 1 - ps(f, 61.8, 62.8);
  // karakter kedua (wanita) condong ke arah tempat kotak akan diletakkan
  const lean = kf(f, [
    [57.3, 0],
    [57.9, -7],
    [58.6, -7],
    [59.2, 0],
  ]);
  const rightO = 1 - ps(f, 61.8, 62.8);

  const sentO = 1 - ps(f, 60.4, 60.9);
  const tr = io(f, 61.36, 63.69, 0.3, 0.3);

  return (
    <>
      <Actor
        x={leftX}
        y={FLOOR}
        h={330}
        gender="male"
        expression={f < T(55.2) ? 'happy' : 'confused'}
        bubble={f >= T(54.9) && f < T(57.3) ? 'question' : undefined}
        o={leftO}
      />
      <Actor x={930} y={FLOOR} h={330} gender="female" flip expression={f < T(57.3) ? 'happy' : 'surprised'} r={lean} o={rightO} />

      <GlyphLine keys={SENT_KEYS} chars={SENT} color={(id) => (['a9', 'a10', 'a11', 'a12', 'a13'].includes(id) ? C.gold : C.text)} opacity={sentO} />
      <At y={1385} o={tr}>
        <div style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 38, color: C.textSecondary, whiteSpace: 'nowrap'}}>
          Artinya, barang itu taruh saja di situ.
        </div>
      </At>
    </>
  );
};
