import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BOUNCY, EASE, EASE_IN, EASE_IO, SOFT, SPRING, clamp, mix, pop, prog} from '../../shared/anim';
import {Avatar, AvatarExpression, AvatarExpressionType} from '../../shared/components/Avatar';
import {Pill, PhysicalButton, Stamp, Surface} from '../../shared/components/ui';
import {C, FONT, FPS} from '../../shared/theme';

export {
  Avatar,
  AvatarExpression,
  BOUNCY,
  EASE,
  EASE_IN,
  EASE_IO,
  PhysicalButton,
  Pill,
  SOFT,
  SPRING,
  Stamp,
  Surface,
  mix,
};
export type {AvatarExpressionType};
export {sec} from './timing';

// Kartu kaca / Surface bergaya SevnQuest (Persis seperti teiru & houga-ta)
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
    radius={40}
    border={hexA(color, 0.55 + 0.45 * glow)}
    style={{
      width: w,
      height: h,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 38px',
      boxShadow: `0 20px 50px rgba(0,0,0,0.65), 0 0 ${60 * glow}px ${hexA(color, 0.4 * glow)}`,
      ...style,
    }}
  >
    {children}
  </Surface>
);

export const Jp: React.FC<{size: number; color?: string; style?: React.CSSProperties; children: React.ReactNode}> = ({
  size,
  color = C.text,
  style,
  children,
}) => (
  <span
    style={{
      fontFamily: FONT.jp,
      fontWeight: 700,
      fontSize: size,
      color,
      lineHeight: 1.15,
      whiteSpace: 'nowrap',
      textShadow: '0 6px 24px rgba(0,0,0,0.55)',
      ...style,
    }}
  >
    {children}
  </span>
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

export const Hi: React.FC<{color?: string; children: React.ReactNode}> = ({color = C.gold, children}) => (
  <span style={{color, fontWeight: 700}}>{children}</span>
);


/**
 * Waktu lokal sequence (dalam detik)
 */
export const useT = () => useCurrentFrame() / FPS;

/**
 * Progress fraction (0..1) antara detik a dan b dengan easing
 */
export const ps = (t: number, a: number, b: number, e: (x: number) => number = EASE) =>
  prog(t * FPS, a * FPS, Math.max(1, (b - a) * FPS), e);

/**
 * Spring pop animation pada detik tertentu
 */
export const pp = (t: number, at: number, cfg = SPRING) => pop(t * FPS, FPS, at * FPS, cfg);

/**
 * Pulse bump (0 -> 1 -> 0)
 */
export const bump = (t: number, a: number, b: number) =>
  Math.sin(Math.PI * clamp((t - a) / (b - a)));

export const hexA = (hex: string, a: number) =>
  hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0');

/**
 * Pembungkus transisi antar dunia
 */
export const BlockFade: React.FC<{
  dur: number;
  inF?: number;
  outF?: number;
  children: React.ReactNode;
}> = ({dur, inF = 6, outF = 6, children}) => {
  const f = useCurrentFrame();
  const op = Math.min(
    inF === 0 ? 1 : prog(f, 0, inF, (t) => t),
    outF === 0 ? 1 : 1 - prog(f, dur - outF, outF, (t) => t),
  );
  return <div style={{width: '100%', height: '100%', opacity: op}}>{children}</div>;
};

/**
 * Jendela waktu tampil elemen (muncul di a, hilang di b)
 */
export const Win: React.FC<{
  T: number;
  a: number;
  b: number;
  dy?: number;
  inD?: number;
  outD?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({T, a, b, dy = 30, inD = 0.4, outD = 0.35, children, style}) => {
  if (T < a || T > b + outD) return null;
  const i = ps(T, a, a + inD);
  const o = ps(T, b, b + outD, (x) => x);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: i * (1 - o),
        transform: `translateY(${(1 - i) * dy - o * 20}px)`,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Posisikan elemen tepat di koordinat tengah (x, y)
 */
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * Teks Jepang Besar (Hiragana / Kanji)
 */
export const JpText: React.FC<{
  size?: number;
  color?: string;
  glow?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({size = 80, color = C.text, glow = false, children, style}) => (
  <span
    style={{
      fontFamily: FONT.jp,
      fontWeight: 900,
      fontSize: size,
      color,
      lineHeight: 1.15,
      whiteSpace: 'nowrap',
      textShadow: glow
        ? `0 0 30px ${hexA(color, 0.65)}, 0 8px 24px rgba(0,0,0,0.8)`
        : '0 6px 20px rgba(0,0,0,0.7)',
      ...style,
    }}
  >
    {children}
  </span>
);

/**
 * KATA JANGKAR UTAMA: "そう" (Gold Anchor)
 * Sesuai aturan: kata そう tetap terlihat & stabil, warna kuning emas (#f0be52).
 */
export const SouAnchor: React.FC<{
  size?: number;
  scale?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({size = 110, scale = 1, glow = true, style}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT.jp,
      fontWeight: 900,
      fontSize: size,
      color: C.gold,
      letterSpacing: 2,
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
      textShadow: glow
        ? `0 0 35px ${C.gold}88, 0 0 70px ${C.gold}44, 0 8px 24px rgba(0,0,0,0.9)`
        : '0 8px 24px rgba(0,0,0,0.85)',
      ...style,
    }}
  >
    そう
  </div>
);

/**
 * Kartu Konteks Berwarna Indigo / Blue
 * Sesuai aturan: Konteks memakai warna biru SevnQuest.
 */
export const ContextCard: React.FC<{
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  dimmed?: boolean;
  scale?: number;
  w?: number;
  h?: number;
  border?: string;
  bg?: string;
  style?: React.CSSProperties;
}> = ({
  title,
  subtitle,
  icon,
  active = false,
  dimmed = false,
  scale = 1,
  w = 260,
  h,
  border,
  bg,
  style,
}) => (
  <div
    style={{
      width: w,
      minHeight: h,
      padding: '16px 20px',
      borderRadius: 22,
      background: bg ?? (active ? '#2b3954' : '#1c2433'),
      border: `2px solid ${
        border ?? (active ? C.gold : dimmed ? 'rgba(111,147,207,0.15)' : C.indigo)
      }`,
      boxShadow: active
        ? `0 12px 30px rgba(0,0,0,0.6), 0 0 24px ${C.gold}33`
        : dimmed
          ? '0 4px 12px rgba(0,0,0,0.3)'
          : `0 8px 22px rgba(0,0,0,0.5), 0 0 16px ${C.indigo}22`,
      opacity: dimmed ? 0.38 : 1,
      transform: `scale(${scale})`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 6,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {icon && <div style={{fontSize: 32, marginBottom: 2}}>{icon}</div>}
    <div
      style={{
        fontFamily: FONT.display,
        fontWeight: 800,
        fontSize: 26,
        color: active ? '#ffffff' : '#edf0f6',
        letterSpacing: 0.5,
      }}
    >
      {title}
    </div>
    {subtitle && (
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 600,
          fontSize: 16,
          color: active ? C.goldSoft : C.indigoSoft,
          lineHeight: 1.2,
        }}
      >
        {subtitle}
      </div>
    )}
  </div>
);

/**
 * Balon Dialog Percakapan (Speech Bubble)
 */
export const DialogueBalloon: React.FC<{
  speaker: string;
  japanese: React.ReactNode;
  translation: string;
  side?: 'left' | 'right';
  active?: boolean;
  scale?: number;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  speaker,
  japanese,
  translation,
  side = 'left',
  active = true,
  scale = 1,
  icon,
  style,
}) => {
  const isLeft = side === 'left';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-start' : 'flex-end',
        maxWidth: 520,
        transform: `scale(${scale})`,
        opacity: active ? 1 : 0.45,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          fontFamily: FONT.display,
          color: isLeft ? C.indigoSoft : C.goldSoft,
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {icon}
        {speaker}
      </div>
      <div
        style={{
          background: isLeft ? '#1d273a' : '#292b3a',
          border: `2px solid ${isLeft ? C.indigo : C.gold}`,
          borderRadius: 24,
          borderBottomLeftRadius: isLeft ? 4 : 24,
          borderBottomRightRadius: !isLeft ? 4 : 24,
          padding: '18px 26px',
          boxShadow: `0 12px 28px rgba(0,0,0,0.5), 0 0 20px ${
            isLeft ? `${C.indigo}22` : `${C.gold}22`
          }`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.jp,
            fontSize: 34,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.25,
            marginBottom: 4,
          }}
        >
          {japanese}
        </div>
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 20,
            fontWeight: 700,
            color: C.textSecondary,
          }}
        >
          {translation}
        </div>
      </div>
    </div>
  );
};

/**
 * Garis Panah Animasi Berpindah / Menunjuk
 */
export const MotionArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  p: number;
  color?: string;
  w?: number;
  label?: string;
}> = ({x1, y1, x2, y2, p, color = C.gold, w = 5, label}) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - 30;
  const d = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;

  return (
    <svg
      width={1080}
      height={1920}
      style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}
    >
      <defs>
        <marker
          id={`arrow-${color}`}
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill={color} />
        </marker>
      </defs>
      <path
        d={d}
        stroke={color}
        strokeWidth={w}
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        markerEnd={p > 0.85 ? `url(#arrow-${color})` : undefined}
      />
      {label && p > 0.6 && (
        <text
          x={midX}
          y={midY - 14}
          fill={color}
          fontSize={20}
          fontWeight="800"
          fontFamily={FONT.display}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </svg>
  );
};

/**
 * Subtitle Narasi di Zona Aman Bawah (Y = 1520, Range 1470 - 1640)
 */
export const NarrationSub: React.FC<{
  t: number;
  at: number;
  until?: number;
  children: React.ReactNode;
  highlightWords?: string[];
}> = ({t, at, until, children}) => {
  if (t < at) return null;
  if (until !== undefined && t > until + 0.25) return null;

  const inSpring = pp(t, at, SOFT);
  const outFade = until === undefined ? 0 : ps(t, until, until + 0.25, (x) => x);

  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: 1510,
        minHeight: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        pointerEvents: 'none',
        opacity: inSpring * (1 - outFade),
        transform: `translateY(${(1 - inSpring) * 20}px)`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: 'rgba(15, 18, 26, 0.88)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(111, 147, 207, 0.35)',
          borderRadius: 22,
          padding: '14px 28px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.35,
          color: '#edf0f6',
          letterSpacing: 0.5,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Highlight pembeda kontras huruf い (Merah Muda / Hanko)
 */
export const HighlightI: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span
    style={{
      color: '#ff5c7c',
      fontWeight: 900,
      textShadow: '0 0 24px rgba(255, 92, 124, 0.8), 0 4px 12px rgba(0,0,0,0.8)',
      background: 'rgba(255, 92, 124, 0.18)',
      padding: '0 6px',
      borderRadius: 8,
      border: '1.5px solid rgba(255, 92, 124, 0.6)',
      display: 'inline-block',
    }}
  >
    {children}
  </span>
);

/**
 * Highlight kata そう (Kuning Emas)
 */
export const HighlightSou: React.FC<{children?: React.ReactNode}> = ({children = 'そう'}) => (
  <span
    style={{
      color: C.gold,
      fontWeight: 900,
      textShadow: `0 0 24px ${C.gold}88, 0 4px 12px rgba(0,0,0,0.8)`,
    }}
  >
    {children}
  </span>
);
