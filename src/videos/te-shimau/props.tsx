import React from 'react';
import {Avatar, AvatarExpressionType} from '../../shared/components/Avatar';
import {Surface} from '../../shared/components/ui';
import {C, FONT} from '../../shared/theme';
import {hexA} from './kit';

// Tiga motif cerita — kunci, kue, file — digambar sekali di sini dan dipakai ulang di hook,
// penjelasan makna, contoh kalimat, sampai rangkuman supaya ceritanya terasa satu.

// ───────────────────────────── kunci & rumah ─────────────────────────────
export const KeyIcon: React.FC<{size?: number; glow?: number; color?: string}> = ({size = 110, glow = 0, color = C.gold}) => (
  <svg
    width={size}
    height={size * 0.5}
    viewBox="0 0 120 60"
    style={{
      overflow: 'visible',
      filter: `drop-shadow(0 0 ${6 + glow * 24}px ${hexA(C.gold, 0.3 + 0.55 * glow)}) drop-shadow(0 6px 10px rgba(0,0,0,0.6))`,
    }}
  >
    <circle cx="26" cy="30" r="18" fill="none" stroke={color} strokeWidth="10" />
    <rect x="42" y="25" width="72" height="10" rx="4" fill={color} />
    <rect x="86" y="33" width="9" height="15" rx="2" fill={color} />
    <rect x="102" y="33" width="9" height="11" rx="2" fill={color} />
  </svg>
);

export const Door: React.FC<{w?: number; h?: number; open?: number; knob?: number}> = ({w = 250, h = 620, open = 0, knob = 0}) => (
  <div
    style={{
      width: w,
      height: h,
      position: 'relative',
      borderRadius: `${w * 0.07}px ${w * 0.07}px 0 0`,
      background: C.bgDeep,
      border: `${Math.max(5, w * 0.035)}px solid ${C.indigoDeep}`,
      borderBottom: 'none',
      boxShadow: `0 0 0 2px ${C.borderPrimary}, 0 18px 40px rgba(0,0,0,0.5)`,
      perspective: w * 4,
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transformOrigin: 'right center',
        transform: `rotateY(${-open * 58}deg)`,
        background: `linear-gradient(180deg, #343c52 0%, ${C.elevated} 100%)`,
        borderRadius: `${w * 0.04}px ${w * 0.04}px 0 0`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {[0.08, 0.54].map((t) => (
        <div
          key={t}
          style={{
            position: 'absolute',
            left: '16%',
            right: '16%',
            top: `${t * 100}%`,
            height: '38%',
            borderRadius: w * 0.04,
            border: `2px dashed ${C.thread}`,
            opacity: 0.6,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: w * 0.1,
          top: '50%',
          width: w * 0.13,
          height: w * 0.13,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, ${C.goldSoft}, ${C.gold} 60%, ${C.goldShadow})`,
          boxShadow: `0 0 ${10 + knob * 30}px ${hexA(C.gold, 0.25 + 0.6 * knob)}, 0 3px 6px rgba(0,0,0,0.5)`,
          transform: `scale(${1 + knob * 0.18})`,
        }}
      />
    </div>
  </div>
);

export const Table: React.FC<{w?: number; h?: number}> = ({w = 230, h = 130}) => (
  <div style={{width: w, height: h, position: 'relative'}}>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Math.max(12, h * 0.14),
        borderRadius: 8,
        background: `linear-gradient(180deg, #3a4257, ${C.elevated})`,
        boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    />
    {[0.12, 0.82].map((x) => (
      <div key={x} style={{position: 'absolute', left: `${x * 100}%`, top: h * 0.14, bottom: 0, width: Math.max(8, w * 0.05), background: C.indigoDeep, borderRadius: 4}} />
    ))}
  </div>
);

// ───────────────────────────── kue ─────────────────────────────
export const PLATE_BG = 'radial-gradient(circle at 50% 42%, #f6f8fc 0%, #e4e9f2 58%, #c9d1e0 100%)';

export const PlateBase: React.FC<{d: number; crumbs?: number}> = ({d, crumbs = 0}) => (
  <div
    style={{
      width: d,
      height: d,
      borderRadius: '50%',
      background: PLATE_BG,
      boxShadow: `0 ${d * 0.05}px ${d * 0.12}px rgba(0,0,0,0.55), inset 0 0 0 ${d * 0.018}px rgba(255,255,255,0.7), inset 0 0 0 ${d * 0.1}px rgba(155,164,184,0.16)`,
      position: 'relative',
    }}
  >
    {crumbs > 0.01 &&
      [
        [0.38, 0.44, 0.022],
        [0.56, 0.38, 0.016],
        [0.62, 0.58, 0.024],
        [0.44, 0.63, 0.014],
        [0.5, 0.5, 0.018],
        [0.33, 0.56, 0.012],
      ].map(([x, y, r], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x * d,
            top: y * d,
            width: r * d,
            height: r * d,
            borderRadius: '50%',
            background: i % 2 ? C.gold : '#d9a54a',
            opacity: crumbs * 0.85,
          }}
        />
      ))}
  </div>
);

const SLICES = 6;
export const sliceDir = (i: number) => {
  const a = ((i + 0.5) * (360 / SLICES) - 90) * (Math.PI / 180);
  return [Math.cos(a), Math.sin(a)] as const;
};

/** Kue bundar dilihat dari atas. `gone[i]` 0..1 = potongan ke-i sedang diambil. */
export const CakeSlices: React.FC<{
  r: number;
  gone: number[];
  /** potongan yang "diterbangkan" ke karakter: offset mutlak (px) */
  fly?: {i: number; dx: number; dy: number; s: number; o: number};
}> = ({r, gone, fly}) => {
  const pad = 6;
  const size = r * 2 + pad * 2;
  const wedge = (i: number) => {
    const a0 = ((i * 360) / SLICES - 90 + 3.5) * (Math.PI / 180);
    const a1 = (((i + 1) * 360) / SLICES - 90 - 3.5) * (Math.PI / 180);
    return `M0 0 L${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r}Z`;
  };
  return (
    <svg width={size} height={size} viewBox={`${-r - pad} ${-r - pad} ${size} ${size}`} style={{overflow: 'visible', display: 'block'}}>
      {Array.from({length: SLICES}, (_, i) => {
        const [cx, cy] = sliceDir(i);
        const isFly = fly?.i === i;
        const g = isFly ? 0 : gone[i] ?? 0;
        if (g >= 1 || (isFly && fly.o <= 0.001)) return null;
        const tx = isFly ? fly.dx : cx * r * 0.32 * g;
        const ty = isFly ? fly.dy : cy * r * 0.32 * g;
        const s = isFly ? fly.s : 1 - g;
        const ox = cx * r * 0.58;
        const oy = cy * r * 0.58;
        return (
          <g key={i} opacity={isFly ? fly.o : 1 - g} transform={`translate(${tx + ox} ${ty + oy}) scale(${s}) translate(${-ox} ${-oy})`}>
            {/* bolu (tepi) → krim (atas) → stroberi */}
            <path d={wedge(i)} fill="#d9a54a" stroke={C.goldShadow} strokeWidth={r * 0.03} strokeLinejoin="round" />
            <g transform={`translate(${cx * r * 0.6} ${cy * r * 0.6}) scale(0.88) translate(${-cx * r * 0.6} ${-cy * r * 0.6})`}>
              <path d={wedge(i)} fill="#fffaf0" stroke={C.goldSoft} strokeWidth={r * 0.03} strokeLinejoin="round" />
            </g>
            <circle cx={cx * r * 0.8} cy={cy * r * 0.8} r={r * 0.06} fill="#ffffff" stroke={C.goldSoft} strokeWidth={r * 0.015} />
            <circle cx={cx * r * 0.5} cy={cy * r * 0.5} r={r * 0.125} fill={C.hanko} stroke={C.hankoDeep} strokeWidth={r * 0.022} />
            <circle cx={cx * r * 0.5 - r * 0.035} cy={cy * r * 0.5 - r * 0.04} r={r * 0.03} fill="#ffffff" opacity={0.75} />
            <circle cx={cx * r * 0.5 + r * 0.05} cy={cy * r * 0.5 - r * 0.1} r={r * 0.04} fill={C.matcha} />
          </g>
        );
      })}
    </svg>
  );
};

// ───────────────────────────── file ─────────────────────────────
export const FileIcon: React.FC<{size?: number; color?: string; dashed?: boolean}> = ({size = 40, color = C.indigoSoft, dashed}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={dashed ? 1.6 : 2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? '2.5 2.5' : undefined}>
    <path d="M6 2.5h8l4.5 4.5V21a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5z" fill={dashed ? 'none' : hexA(color, 0.14)} />
    {!dashed && <path d="M14 2.5V7h4.5M8.5 12h7M8.5 16h5" />}
  </svg>
);

export const TrashIcon: React.FC<{size?: number; color?: string}> = ({size = 28, color = C.hanko}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13M10 11v6M14 11v6" />
  </svg>
);

export const Cursor: React.FC<{press?: number; size?: number}> = ({press = 0, size = 46}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{transform: `scale(${1 - press * 0.18})`, transformOrigin: '20% 12%', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.7))', display: 'block'}}>
    <path d="M5 2.5l13.5 10-6 1 3.4 6.6-2.6 1.3-3.3-6.7L5.5 19z" fill="#ffffff" stroke="#10131a" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);

export const FILE_WIN = {w: 860, h: 378, bar: 60, pad: 16, row: 64, gap: 10};
/** pusat-Y baris ke-i di ruang jendela */
export const fileRowY = (i: number) => FILE_WIN.bar + FILE_WIN.pad + i * (FILE_WIN.row + FILE_WIN.gap) + FILE_WIN.row / 2;
export const IMPORTANT_ROW = 2;

const FILES = ['laporan-rapat.pdf', 'foto-liburan.png', 'skripsi-final.docx', 'catatan.txt'];

/** Jendela file. `sel` 0..1 baris penting terpilih, `del` 0..1 baris penting terhapus. */
export const FileWindow: React.FC<{sel?: number; del?: number; style?: React.CSSProperties}> = ({sel = 0, del = 0, style}) => {
  const W = FILE_WIN;
  return (
    <div
      style={{
        width: W.w,
        height: W.h,
        borderRadius: 30,
        background: `linear-gradient(180deg, #232937 0%, ${C.card} 100%)`,
        border: `1.5px solid ${C.borderPrimary}`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{height: W.bar, display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', background: 'rgba(25,32,46,0.8)', borderBottom: `1.5px solid ${C.borderSubtle}`, boxSizing: 'border-box'}}>
        {[C.hanko, C.gold, C.matcha].map((c) => (
          <div key={c} style={{width: 15, height: 15, borderRadius: '50%', background: c, opacity: 0.85}} />
        ))}
        <span style={{marginLeft: 14, fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: C.textSecondary}}>DOKUMEN</span>
      </div>
      <div style={{padding: W.pad, display: 'flex', flexDirection: 'column', gap: W.gap}}>
        {FILES.map((name, i) => {
          const hot = i === IMPORTANT_ROW;
          const s = hot ? sel : 0;
          const d = hot ? del : 0;
          const flash = hot ? Math.sin(Math.PI * Math.min(1, d * 1.6)) : 0;
          return (
            <div
              key={name}
              style={{
                height: W.row,
                borderRadius: 16,
                boxSizing: 'border-box',
                position: 'relative',
                background: d >= 1 ? 'transparent' : d > 0 ? hexA(C.hanko, 0.14 + 0.3 * flash) : s > 0.01 ? hexA(C.indigo, 0.24 * s) : C.inset,
                border: d >= 1 ? `2px dashed ${C.thread}` : `1.5px solid ${d > 0 ? C.hanko : s > 0.01 ? hexA(C.indigo, 0.3 + 0.7 * s) : C.borderSubtle}`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '0 20px',
                  clipPath: `inset(0 ${d * 100}% 0 0)`,
                  opacity: 1 - d * 0.4,
                }}
              >
                <FileIcon size={36} color={hot ? C.gold : C.indigoSoft} />
                <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: hot ? C.text : C.textSecondary, whiteSpace: 'nowrap'}}>{name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ───────────────────────────── mini-adegan & kartu situasi ─────────────────────────────
// Ruang desain 360×260; diskalakan lewat `s`.
export type Situation = 'key' | 'cake' | 'file';

export const SituationArt: React.FC<{kind: Situation; s?: number; glow?: number}> = ({kind, s = 1, glow = 0.5}) => (
  <div style={{width: 360 * s, height: 260 * s, position: 'relative'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 360, height: 260, transform: `scale(${s})`, transformOrigin: '0 0'}}>
      {kind === 'key' && (
        <>
          <div style={{position: 'absolute', left: 18, top: 150}}>
            <Table w={150} h={96} />
          </div>
          <div style={{position: 'absolute', left: 38, top: 96}}>
            <KeyIcon size={110} glow={glow} />
          </div>
          <div style={{position: 'absolute', left: 236, top: 30}}>
            <Door w={100} h={216} open={0.5} />
          </div>
          <div style={{position: 'absolute', left: 18, right: 14, top: 246, height: 0, borderTop: `2px dashed ${C.thread}`}} />
          <svg width={360} height={260} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
            <path d="M150 104 Q200 40 240 96" fill="none" stroke={C.hanko} strokeWidth={4} strokeLinecap="round" strokeDasharray="4 12" opacity={0.9} />
          </svg>
        </>
      )}
      {kind === 'cake' && (
        <div style={{position: 'absolute', left: 60, top: 10}}>
          <PlateBase d={240} crumbs={1} />
        </div>
      )}
      {kind === 'file' && (
        <>
          <div style={{position: 'absolute', left: 44, top: 28, opacity: 0.55}}>
            <FileIcon size={150} color={C.indigoSoft} />
          </div>
          <div style={{position: 'absolute', left: 150, top: 56}}>
            <FileIcon size={170} color={C.hanko} dashed />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 250,
              top: 170,
              width: 74,
              height: 74,
              borderRadius: '50%',
              background: hexA(C.hanko, 0.16),
              border: `2.5px solid ${C.hanko}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 ${24 * glow}px ${hexA(C.hanko, 0.5 * glow)}`,
            }}
          >
            <TrashIcon size={40} />
          </div>
        </>
      )}
    </div>
  </div>
);

export const SituationCard: React.FC<{
  kind: Situation;
  w?: number;
  h?: number;
  art?: number; // skala gambar
  artO?: number;
  accent?: string;
  dashed?: boolean; // slot kosong (kartu sedang berubah jadi blok formula)
  children?: React.ReactNode;
}> = ({kind, w = 400, h = 360, art = 0.95, artO = 1, accent, dashed, children}) => (
  <Surface
    tone="card"
    radius={36}
    stitch={!dashed}
    border={dashed ? 'transparent' : accent}
    style={{
      width: w,
      height: h,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      ...(dashed ? {background: hexA(C.card, 0.35), border: `3px dashed ${C.thread}`, boxShadow: 'none'} : {}),
    }}
  >
    {artO > 0.01 && (
      <div style={{opacity: artO}}>
        <SituationArt kind={kind} s={art} />
      </div>
    )}
    {children}
  </Surface>
);

// ───────────────────────────── karakter ─────────────────────────────
/** Avatar resmi, ditambatkan di telapak kaki (x, y = lantai). */
export const Actor: React.FC<{
  x: number;
  y: number;
  h: number;
  expression: AvatarExpressionType;
  bubble?: 'exclamation' | 'question' | 'sweat';
  o?: number;
  s?: number;
  r?: number;
  flip?: boolean;
}> = ({x, y, h, expression, bubble, o = 1, s = 1, r = 0, flip}) =>
  o <= 0.001 ? null : (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -100%) rotate(${r}deg) scale(${s})`, transformOrigin: '50% 100%', opacity: o}}>
      <Avatar expression={expression} height={h} flip={flip} bubble={bubble} bubblePosition="top-right" />
    </div>
  );
