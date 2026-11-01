import React from 'react';
import {Surface} from '../../../shared/components/ui';
import {C, FONT, FPS} from '../../../shared/theme';
import {io, ps, sp, useF, hexA} from '../kit';

// A5 · S27–S31 (70.5–91.9 dtk). Rangkuman: satu baris per kata kerja, arah panah = arah pemberian.
// Lalu partikel に ditandai pada penerima (あげる・くれる) atau pemberi (もらう).

type RowDef = {
  verb: string;
  color: string;
  dir: 'left' | 'right'; // arah panah dari sisi SAYA/TEMAN
  recv: 'left' | 'right'; // sisi penerima (tempat に)
  tag: string;
  cy: number;
  enter: number;
  hl: [number, number];
  draw: number;
  sub?: string;
};

const ROWS: RowDef[] = [
  {verb: 'あげる', color: C.gold, dir: 'right', recv: 'right', tag: 'PENERIMA', cy: 560, enter: 70.9, hl: [75.7, 78.4], draw: 75.9},
  {verb: 'くれる', color: C.indigoSoft, dir: 'left', recv: 'left', tag: 'PENERIMA', cy: 830, enter: 71.3, hl: [78.4, 82.1], draw: 78.6},
  {verb: 'もらう', color: C.matcha, dir: 'left', recv: 'right', tag: 'PEMBERI', cy: 1100, enter: 71.7, hl: [82.1, 85.4], draw: 82.2, sub: 'SUDUT PANDANG SAYA'},
];

// koordinat lokal kartu (kartu di x 70, lebar 940, tinggi 230)
const LEFT_X = 430; // SAYA
const RIGHT_X = 830; // TEMAN
const MID_Y = 115;

const RowCard: React.FC<{d: RowDef}> = ({d}) => {
  const f = useF();
  const t = f / FPS;
  const p = sp(f, d.enter);
  const hl = io(f, d.hl[0], d.hl[1], 0.25, 0.3);
  const drawP = ps(f, d.draw, d.draw + 0.7);
  const x0 = d.dir === 'right' ? LEFT_X : RIGHT_X;
  const x1 = d.dir === 'right' ? RIGHT_X : LEFT_X;
  const xEnd = x0 + (x1 - x0) * drawP;
  // titik berjalan di sepanjang panah saat baris sedang disorot
  const dotT = t >= d.hl[0] && t < d.hl[1] ? ((f - d.draw * FPS) / 40) % 1 : 0;
  const dotX = x0 + (x1 - x0) * Math.max(0, dotT);
  const recvX = d.recv === 'left' ? LEFT_X : RIGHT_X;
  const markO = ps(f, 85.4, 85.9);
  const subO = ps(f, d.hl[0] + 0.2, d.hl[0] + 0.6);
  const tip = drawP > 0.97 ? 1 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        top: d.cy - 115,
        width: 940,
        height: 230,
        opacity: p,
        transform: `translateX(${(1 - p) * 120}px)`,
      }}
    >
      <Surface
        tone="card"
        radius={36}
        border={hexA(C.gold, 0.2 + 0.6 * hl)}
        style={{position: 'absolute', inset: 0, transform: `scale(${1 + 0.02 * hl})`}}
      />
      <span
        style={{
          position: 'absolute',
          left: 50,
          top: MID_Y - 52,
          fontFamily: FONT.jp,
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1,
          color: d.color,
          textShadow: '0 6px 18px rgba(0,0,0,0.7)',
        }}
      >
        {d.verb}
      </span>

      <svg width={940} height={230} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <line
          x1={x0}
          y1={MID_Y}
          x2={xEnd}
          y2={MID_Y}
          stroke={C.gold}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="14 12"
          strokeOpacity={0.85}
        />
        {/* ujung panah */}
        <path
          d={
            x1 > x0
              ? `M${xEnd - 16} ${MID_Y - 12} L${xEnd} ${MID_Y} L${xEnd - 16} ${MID_Y + 12}`
              : `M${xEnd + 16} ${MID_Y - 12} L${xEnd} ${MID_Y} L${xEnd + 16} ${MID_Y + 12}`
          }
          fill="none"
          stroke={C.gold}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={tip}
        />
        <circle cx={LEFT_X} cy={MID_Y} r={14} fill={C.card} stroke={C.indigoSoft} strokeWidth={4} />
        <circle cx={RIGHT_X} cy={MID_Y} r={14} fill={C.card} stroke={C.indigoSoft} strokeWidth={4} />
        {dotT > 0 && dotT < 1 && <circle cx={dotX} cy={MID_Y} r={10} fill={C.goldSoft} style={{filter: `drop-shadow(0 0 10px ${C.gold})`}} />}
      </svg>

      <span style={{position: 'absolute', left: LEFT_X - 80, top: MID_Y + 38, width: 160, textAlign: 'center', fontFamily: FONT.body, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: C.textSecondary}}>
        SAYA
      </span>
      <span style={{position: 'absolute', left: RIGHT_X - 80, top: MID_Y + 38, width: 160, textAlign: 'center', fontFamily: FONT.body, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: C.textSecondary}}>
        TEMAN
      </span>

      {/* partikel に pada penerima (S31) */}
      <div
        style={{
          position: 'absolute',
          left: recvX - 130,
          top: 14,
          width: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          opacity: markO,
          transform: `translateY(${(1 - markO) * 10}px)`,
        }}
      >
        <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 48, lineHeight: 1, color: C.gold}}>に</span>
        <span style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.textSecondary}}>{d.tag}</span>
      </div>

      {d.sub && (
        <span style={{position: 'absolute', left: 50, top: 190, fontFamily: FONT.body, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.indigoSoft, opacity: subO}}>
          {d.sub}
        </span>
      )}
    </div>
  );
};

export const Act5_Summary: React.FC = () => {
  const f = useF();
  // keluar: seluruh rangkuman mengecil sedikit lalu memudar sebelum CTA
  const out = 1 - ps(f, 91.2, 91.7);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: out}}>
      {ROWS.map((r) => (
        <RowCard key={r.verb} d={r} />
      ))}
    </div>
  );
};
