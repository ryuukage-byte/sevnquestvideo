import React from 'react';
import {C, FONT, SHADOW_CARD, SHADOW_INSET} from '../theme';

type Tone = 'card' | 'elevated' | 'inset';

export const Surface: React.FC<{
  tone?: Tone;
  radius?: number;
  stitch?: boolean;
  border?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({tone = 'card', radius = 36, stitch = true, border, style, children}) => {
  const bg = tone === 'card' ? C.card : tone === 'elevated' ? C.elevated : C.inset;
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: radius,
        background:
          tone === 'inset'
            ? bg
            : `linear-gradient(180deg, ${tone === 'card' ? '#232937' : '#30374a'} 0%, ${bg} 100%)`,
        boxShadow: tone === 'inset' ? SHADOW_INSET : SHADOW_CARD,
        border: `1.5px solid ${border ?? C.borderSubtle}`,
        ...style,
      }}
    >
      {stitch && (
        <div
          style={{
            position: 'absolute',
            inset: 12,
            borderRadius: Math.max(radius - 12, 6),
            border: `2px dashed ${C.thread}`,
            opacity: 0.45,
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </div>
  );
};

type BtnTone = 'indigo' | 'green' | 'gold' | 'red' | 'ghost';
const BTN: Record<BtnTone, {top: string; bot: string; edge: string; text: string; border: string}> = {
  indigo: {top: '#3d5885', bot: '#253959', edge: '#121c2c', text: '#ffffff', border: '#1b2940'},
  green: {top: '#62c99f', bot: '#3a9a72', edge: '#1d5a40', text: '#06241a', border: '#256b4c'},
  gold: {top: '#fde8a8', bot: '#f0be52', edge: '#8c6810', text: '#3a2a05', border: '#b58a22'},
  red: {top: '#ee6b70', bot: '#bb4146', edge: '#6a2023', text: '#fff', border: '#7a2a2e'},
  ghost: {top: '#2a3040', bot: '#222837', edge: '#10131a', text: '#c5cde0', border: '#161a24'},
};

// Tombol "physical" — meniru .btn-physical-primary: tebal 3D yang ambles saat ditekan.
export const PhysicalButton: React.FC<{
  label: React.ReactNode;
  tone?: BtnTone;
  w: number;
  h: number;
  fontSize?: number;
  press?: number; // 0..1
  style?: React.CSSProperties;
}> = ({label, tone = 'indigo', w, h, fontSize = 36, press = 0, style}) => {
  const t = BTN[tone];
  const depth = 10;
  const dy = press * (depth - 2);
  return (
    <div style={{width: w, height: h + depth, position: 'relative', ...style}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: dy,
          width: w,
          height: h,
          borderRadius: 26,
          background: `linear-gradient(180deg, ${t.top} 0%, ${t.bot} 100%)`,
          border: `1.5px solid ${t.border}`,
          boxShadow: `0 ${depth - dy}px 0 ${t.edge}, 0 ${depth + 8 - dy}px 22px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.3)`,
          color: t.text,
          fontFamily: FONT.body,
          fontWeight: 800,
          fontSize,
          letterSpacing: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const CheckIcon: React.FC<{size?: number; color?: string; draw?: number; stroke?: number}> = ({
  size = 40,
  color = 'currentColor',
  draw = 1,
  stroke = 3.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4.5 12.8l4.8 4.7L19.6 6.6"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
    />
  </svg>
);

export const ArrowRight: React.FC<{size?: number; color?: string; stroke?: number}> = ({
  size = 40,
  color = 'currentColor',
  stroke = 3.2,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12h15M13 5.5l6.5 6.5-6.5 6.5" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NotEqual: React.FC<{size?: number; color?: string; slash?: string; p?: number}> = ({
  size = 240,
  color = C.text,
  slash = C.hanko,
  p = 1,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M18 38H82" stroke={color} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p * 2)} />
    <path d="M18 64H82" stroke={color} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p * 2)} />
    <path d="M70 12L30 90" stroke={slash} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.max(0, p * 2 - 1)} />
  </svg>
);

// Cap "hanko": stempel bergaya cap tinta Jepang
export const Stamp: React.FC<{
  text: string;
  color: string;
  size?: number;
  rotate?: number;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}> = ({text, color, size = 44, rotate = -8, style, icon}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: `${size * 0.22}px ${size * 0.5}px`,
      border: `${Math.max(4, size * 0.1)}px solid ${color}`,
      borderRadius: size * 0.35,
      color,
      fontFamily: FONT.display,
      fontWeight: 800,
      fontSize: size,
      letterSpacing: 2,
      transform: `rotate(${rotate}deg)`,
      boxShadow: `inset 0 0 0 2px ${color}33, 0 0 30px ${color}22`,
      background: `${color}14`,
      ...style,
    }}
  >
    {icon}
    {text}
  </div>
);

/**
 * @deprecated Jangan dipakai di video baru — pil/chip label dilarang (SEVNQUEST.md §12).
 * Dipertahankan hanya agar video lama tetap bisa dirender.
 */
export const Pill: React.FC<{
  children: React.ReactNode;
  color: string;
  size?: number;
  filled?: boolean;
  style?: React.CSSProperties;
}> = ({children, color, size = 24, filled = false, style}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: `${size * 0.32}px ${size * 0.8}px`,
      borderRadius: 999,
      background: filled ? color : `${color}22`,
      border: `1.5px solid ${color}${filled ? '' : '88'}`,
      color: filled ? '#101420' : color,
      fontFamily: FONT.mono,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: 1.5,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

// Wajah "berpikir" & ekspresif sederhana (SVG, tanpa emoji supaya render konsisten)
export const ThinkingFace: React.FC<{
  size?: number;
  state?: 'thinking' | 'react' | 'success';
  style?: React.CSSProperties;
}> = ({size = 120, state = 'thinking', style}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <circle cx="50" cy="50" r="44" fill="#f6c453" stroke="#b8861f" strokeWidth="3" />
      {state === 'thinking' && (
        <>
          <path d="M28 33Q36 26 44 32" stroke="#6a4a10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M58 30Q67 28 73 35" stroke="#6a4a10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="45" r="5" fill="#3a2a05" />
          <circle cx="64" cy="45" r="5" fill="#3a2a05" />
          <path d="M40 66Q52 62 62 66" stroke="#6a4a10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M48 76q4-6 10-2q4 4-1 9q-7 3-12-1" fill="#f9d77a" stroke="#b8861f" strokeWidth="3" />
        </>
      )}
      {state === 'react' && (
        <>
          <path d="M26 28Q36 20 46 28" stroke="#6a4a10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M54 28Q64 20 74 28" stroke="#6a4a10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="43" r="6" fill="#3a2a05" />
          <circle cx="62" cy="43" r="6" fill="#3a2a05" />
          <circle cx="50" cy="65" r="8" fill="#3a2a05" />
        </>
      )}
      {state === 'success' && (
        <>
          <path d="M28 44Q38 35 48 44" stroke="#6a4a10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M52 44Q62 35 72 44" stroke="#6a4a10" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M34 60Q50 76 66 60" stroke="#6a4a10" strokeWidth="5" strokeLinecap="round" fill="none" />
          <g transform="translate(62, 62)">
            <circle cx="14" cy="14" r="14" fill="#4fae86" stroke="#256b4c" strokeWidth="2" />
            <path d="M8 14l4 4L20 9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </>
      )}
    </svg>
  );
};
