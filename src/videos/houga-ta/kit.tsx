import React from 'react';
import {AbsoluteFill} from 'remotion';
import {EASE, EASE_IN, EASE_IO, mix} from '../../shared/anim';
import {C, FONT} from '../../shared/theme';
import {Surface} from '../../shared/components/ui';
import {JpSpan, hexA, ps, useT} from '../houga-ii/kit';

// Re-export kit milik video houga_ii (VerbSentence, Formula, Cap, dll) agar satu sistem.
export {
  AtY,
  Avatar,
  BlockFade,
  Cap,
  Formula,
  Hi,
  JpSpan,
  VerbSentence,
  bump,
  hexA,
  pp,
  ps,
  useT,
  SOFT,
  BOUNCY,
  SPRING,
} from '../houga-ii/kit';
export {sec} from './timing';
export {EASE, EASE_IN, EASE_IO, mix};

// Waktu absolut storyboard di dalam sebuah dunia (Sequence mulai di `start`).
export const useAbs = (start: number) => useT() + start;

// Jendela tampil: masuk di `a`, keluar di `b` (opacity + sedikit geser).
export const Win: React.FC<{
  T: number;
  a: number;
  b: number;
  dy?: number;
  inD?: number;
  outD?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({T, a, b, dy = 40, inD = 0.5, outD = 0.35, children, style}) => {
  if (T < a || T > b + outD) return null;
  const i = ps(T, a, a + inD);
  const o = ps(T, b, b + outD, (x) => x);
  return (
    <AbsoluteFill
      style={{
        opacity: i * (1 - o),
        transform: `translateY(${(1 - i) * dy - o * 24}px)`,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Pusatkan elemen di (x, y)
export const At: React.FC<{
  x?: number;
  y: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x = 540, y, children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Jp: React.FC<{size: number; color?: string; style?: React.CSSProperties; children: React.ReactNode}> = ({
  size,
  color = C.text,
  style,
  children,
}) => (
  <JpSpan
    style={{
      fontSize: size,
      color,
      lineHeight: 1.15,
      whiteSpace: 'nowrap',
      textShadow: '0 6px 24px rgba(0,0,0,0.55)',
      ...style,
    }}
  >
    {children}
  </JpSpan>
);

export const Label: React.FC<{size?: number; color?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({
  size = 54,
  color = C.text,
  children,
  style,
}) => (
  <span
    style={{
      fontFamily: FONT.display,
      fontWeight: 800,
      fontSize: size,
      color,
      lineHeight: 1.1,
      textAlign: 'center',
      textShadow: '0 8px 30px rgba(0,0,0,0.8)',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </span>
);

// Garis bergambar (stroke draw) dalam koordinat frame 1080x1920
export const Line: React.FC<{
  d: string;
  p: number;
  color?: string;
  w?: number;
  head?: {x: number; y: number; rot: number};
}> = ({d, p, color = C.indigoSoft, w = 7, head}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    <path
      d={d}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      fill="none"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - p}
    />
    {head && p > 0.95 && (
      <g transform={`translate(${head.x} ${head.y}) rotate(${head.rot})`}>
        <path d="M-18 -16L0 4L18 -16" stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )}
  </svg>
);

// Bubble chat (dibuat dari Surface — repo tidak punya komponen chat)
export const ChatBubble: React.FC<{
  mine?: boolean;
  width?: number;
  size?: number;
  children: React.ReactNode;
  tint?: string;
}> = ({mine = false, width, size = 40, children, tint}) => (
  <div
    style={{
      width,
      padding: `${size * 0.5}px ${size * 0.7}px`,
      borderRadius: size * 0.8,
      borderBottomRightRadius: mine ? size * 0.2 : size * 0.8,
      borderBottomLeftRadius: mine ? size * 0.8 : size * 0.2,
      background: mine ? `linear-gradient(180deg, #4a6aa0, #34507c)` : 'linear-gradient(180deg,#30374a,#262c3b)',
      border: `1.5px solid ${tint ?? (mine ? C.indigo : C.borderPrimary)}`,
      boxShadow: '0 12px 30px rgba(0,0,0,0.45)',
      fontFamily: FONT.body,
      fontWeight: 700,
      fontSize: size,
      color: C.text,
      lineHeight: 1.25,
    }}
  >
    {children}
  </div>
);

// Teks bercoret animasi
export const Strike: React.FC<{p: number; color?: string; children: React.ReactNode}> = ({
  p,
  color = C.hanko,
  children,
}) => (
  <span style={{position: 'relative', display: 'inline-block'}}>
    {children}
    <span
      style={{
        position: 'absolute',
        left: -14,
        right: -14,
        top: '52%',
        height: 12,
        borderRadius: 6,
        background: color,
        boxShadow: `0 0 24px ${hexA(color, 0.7)}`,
        transformOrigin: '0 50%',
        transform: `scaleX(${p}) rotate(-3deg)`,
      }}
    />
  </span>
);

// Kartu rumus kecil (potongan Vた / ほうがいい)
export const GCard: React.FC<{
  color?: string;
  w?: number;
  h?: number;
  glow?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({color = C.gold, w, h, glow = 0, children, style}) => (
  <Surface
    tone="elevated"
    radius={44}
    border={hexA(color, 0.55 + 0.45 * glow)}
    style={{
      width: w,
      height: h,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '22px 40px',
      boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 ${70 * glow}px ${hexA(color, 0.4 * glow)}`,
      ...style,
    }}
  >
    {children}
  </Surface>
);

export const HeartIcon: React.FC<{size?: number; color?: string; crack?: number}> = ({
  size = 260,
  color = C.hanko,
  crack = 0,
}) => {
  const hp = 'M50 88C20 66 8 48 8 32A21 21 0 0 1 50 24A21 21 0 0 1 92 32C92 48 80 66 50 88Z';
  const split = crack;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{overflow: 'visible', filter: `drop-shadow(0 0 20px ${hexA(color, 0.5)})`}}>
      <defs>
        <clipPath id="hl"><polygon points="0,0 52,0 44,30 56,52 46,70 54,100 0,100" /></clipPath>
        <clipPath id="hr"><polygon points="52,0 100,0 100,100 54,100 46,70 56,52 44,30" /></clipPath>
      </defs>
      <g clipPath="url(#hl)" transform={`translate(${-split * 8} ${split * 40}) rotate(${-split * 22} 30 60)`} opacity={1 - split * 0.9}>
        <path d={hp} fill={color} />
      </g>
      <g clipPath="url(#hr)" transform={`translate(${split * 8} ${split * 56}) rotate(${split * 28} 70 60)`} opacity={1 - split * 0.9}>
        <path d={hp} fill={color} />
      </g>
    </svg>
  );
};
