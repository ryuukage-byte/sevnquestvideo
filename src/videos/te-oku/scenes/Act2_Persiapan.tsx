import React from 'react';
import {C, FONT} from '../../../shared/theme';
import {At, GKey, io, ps, useF} from '../kit';
import {Chars, GlyphLine} from '../props';
import {SENT_BUILD, SENT_CHARS, SENT_COLOR, SENT_CY} from './sentence';

// S10 — 早く寝る di lembar · S11–S12 — kalimat Jepang dibangun berkelompok lalu terjemahannya.
// S13 — tanpa teks baru; gerak kalender & lembar saja.

const EARLY_CHARS: Chars = {
  h1: {ch: '早', ruby: 'はやく'},
  h2: {ch: 'く'},
  h3: {ch: '寝', ruby: 'ね'},
  h4: {ch: 'る'},
};
const EARLY_KEYS: GKey[] = [{at: 32.28, row: ['h1', 'h2', 'h3', 'h4'], size: 56, cy: SENT_CY, stagger: 0.08, dur: 0.5}];

export const Act2_Persiapan: React.FC = () => {
  const f = useF();
  const early = 1 - ps(f, 35.2, 35.6);
  const sentence = 1 - ps(f, 43.9, 44.4);
  // terjemahan muncul bertahap mengikuti dua kelompok makna
  const tr1 = io(f, 39.46, 41.5, 0.3, 0.2);
  const tr2 = io(f, 41.55, 43.8, 0.3, 0.3);

  return (
    <>
      <GlyphLine keys={EARLY_KEYS} chars={EARLY_CHARS} color={() => C.text} opacity={early} />
      <GlyphLine keys={SENT_BUILD} chars={SENT_CHARS} color={SENT_COLOR} opacity={sentence} />
      <At y={1385} o={tr1}>
        <div style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 38, color: C.textSecondary, whiteSpace: 'nowrap'}}>
          Artinya, besok ada ujian,
        </div>
      </At>
      <At y={1385} o={tr2}>
        <div style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 38, color: C.textSecondary, whiteSpace: 'nowrap'}}>
          jadi malam ini aku tidur lebih awal dulu.
        </div>
      </At>
    </>
  );
};
