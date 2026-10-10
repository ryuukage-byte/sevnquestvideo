import React from 'react';
import {LogoMark} from '../../shared/components/Logo';
import {Surface} from '../../shared/components/ui';
import {C, FONT} from '../../shared/theme';
import {BottomTabs} from '../houga-ta/ProductScreens';
import {hexA} from './kit';

// Layar Library › Latihan › Bentuk Kasual — satu fitur: ubah bentuk kata lalu lihat hasilnya.
// Gaya kartu & header mengikuti layar Konjugasi di src/videos/te-shimau/ProductScreen.tsx.
// Koordinat = ruang IPhoneShell 760×1540.

// Pilihan 2×2. Jawaban benar: しとく (kiri atas).
const OPTIONS = [
  ['しとく', 'しちゃう'],
  ['しておけ', 'しておかない'],
];
const CELL_H = 124;
const CELL_GAP = 16;
const COL_W = (760 - 72 - 16) / 2;
const GRID_TOP = 500; // relatif terhadap layar ponsel
const RESULT_TOP = 800;

/** pusat sel pilihan di ruang layar ponsel (dipakai TouchIndicator) */
export const optionPos = (row: number, col: number) => ({
  x: 36 + col * (COL_W + 16) + COL_W / 2,
  y: GRID_TOP + row * (CELL_H + CELL_GAP) + CELL_H / 2,
});

export const TransformScreen: React.FC<{
  /** 0..1 sel jawaban benar disorot */
  pick?: number;
  /** 0..1 sel ditekan (mengecil) */
  press?: number;
  /** 0..1 kartu hasil muncul */
  result?: number;
}> = ({pick = 0, press = 0, result = 0}) => (
  <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 12%, #1e2638 0%, #12151d 62%, #0a0d13 100%)', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(240,190,82,0.12) 0%, transparent 55%)'}} />
    <div style={{position: 'absolute', top: 92, left: 36, right: 36, display: 'flex', alignItems: 'center', gap: 18}}>
      <LogoMark size={54} />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 46, color: C.text, lineHeight: 1.05}}>Latihan</span>
        <span style={{fontFamily: FONT.body, fontSize: 20, color: C.indigoSoft}}>Library › Latihan › Bentuk Kasual</span>
      </div>
    </div>

    {/* soal */}
    <div style={{position: 'absolute', top: 200, left: 36, right: 36}}>
      <Surface tone="card" radius={34} style={{height: 260, boxSizing: 'border-box', padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.textSecondary, letterSpacing: 1.5}}>UBAH KE BENTUK KASUAL</span>
        <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 96, lineHeight: 1, color: C.gold, alignSelf: 'center'}}>しておく</span>
        <span style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 24, color: C.textSecondary}}>Pilih bentuk yang paling santai.</span>
      </Surface>
    </div>

    {/* pilihan 2×2 */}
    <div style={{position: 'absolute', top: GRID_TOP, left: 36, right: 36, display: 'flex', flexDirection: 'column', gap: CELL_GAP}}>
      {OPTIONS.map((row, r) => (
        <div key={r} style={{display: 'flex', gap: 16}}>
          {row.map((label, c) => {
            const isAnswer = r === 0 && c === 0;
            const a = isAnswer ? pick : 0;
            return (
              <div
                key={label}
                style={{
                  width: COL_W,
                  height: CELL_H,
                  boxSizing: 'border-box',
                  borderRadius: 28,
                  background: hexA(isAnswer ? C.matcha : C.card, isAnswer ? 0.12 + 0.2 * a : 1),
                  border: `1.5px solid ${isAnswer ? hexA(C.matcha, 0.35 + 0.65 * a) : C.borderSubtle}`,
                  boxShadow: a > 0 ? `0 0 ${34 * a}px ${hexA(C.matcha, 0.4 * a)}` : undefined,
                  transform: `scale(${1 - (isAnswer ? press : 0) * 0.06})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 46, color: C.text}}>{label}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>

    {/* hasil */}
    {result > 0.01 && (
      <div style={{position: 'absolute', top: RESULT_TOP, left: 36, right: 36, opacity: result, transform: `translateY(${(1 - result) * 36}px)`}}>
        <Surface tone="elevated" radius={30} border={C.matcha} style={{height: 250, boxSizing: 'border-box', padding: '26px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12}}>
          <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 700, color: C.matcha, letterSpacing: 1.5}}>BENAR · て + お → と</span>
          <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 56, lineHeight: 1.2, color: C.text}}>
            しておく
            <span style={{fontFamily: FONT.mono, fontSize: 40, color: C.textSecondary, margin: '0 18px'}}>→</span>
            <span style={{color: C.matcha}}>しとく</span>
          </span>
          <span style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 24, color: C.textSecondary}}>
            て dan お menyatu menjadi <span style={{fontFamily: FONT.jp, fontWeight: 900, color: C.matcha}}>と</span>
          </span>
        </Surface>
      </div>
    )}

    <BottomTabs active="library" />
  </div>
);
