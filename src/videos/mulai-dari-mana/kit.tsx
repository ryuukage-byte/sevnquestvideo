import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BOUNCY, EASE, EASE_IN, EASE_IO, SOFT, SPRING, clamp, mix, pop, prog} from '../../shared/anim';
import {Avatar, AvatarExpression, AvatarExpressionType} from '../../shared/components/Avatar';
import {Surface} from '../../shared/components/ui';
import {C, FONT, FPS} from '../../shared/theme';

export {Avatar, AvatarExpression, BOUNCY, EASE, EASE_IN, EASE_IO, SOFT, SPRING, Surface, mix};
export type {AvatarExpressionType};
export {sec} from './timing';

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
 * Pembungkus transisi fade in / out
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
 * Header Bab / World SevnQuest (Bagian Atas Safe Zone)
 */
export const WorldHeader: React.FC<{
  num: string;
  title: string;
  badge?: string;
}> = ({num, title, badge}) => (
  <div
    style={{
      position: 'absolute',
      top: 130,
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      pointerEvents: 'none',
      zIndex: 50,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '6px 18px',
        borderRadius: 999,
        background: 'rgba(26, 34, 48, 0.75)',
        border: `1.5px solid ${C.indigo}44`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontWeight: 800,
          fontSize: 14,
          color: C.gold,
          letterSpacing: 2,
        }}
      >
        {num}
      </span>
      <div style={{width: 4, height: 4, borderRadius: 2, background: C.textSecondary}} />
      <span
        style={{
          fontFamily: FONT.display,
          fontWeight: 800,
          fontSize: 15,
          color: C.text,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </span>
      {badge && (
        <span
          style={{
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 11,
            color: C.goldSoft,
            background: `${C.gold}22`,
            padding: '2px 8px',
            borderRadius: 6,
            border: `1px solid ${C.gold}44`,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  </div>
);

/**
 * Subtitle Narasi Universal SevnQuest (Safe Zone Y = 1510)
 */
export const NarrationSub: React.FC<{
  text: string;
  style?: React.CSSProperties;
}> = ({text, style}) => (
  <div
    style={{
      position: 'absolute',
      left: 60,
      right: 60,
      top: 1510,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 90,
      ...style,
    }}
  >
    <div
      style={{
        maxWidth: 960,
        padding: '16px 28px',
        borderRadius: 20,
        background: 'rgba(15, 18, 26, 0.88)',
        border: `1.5px solid ${C.thread}`,
        boxShadow: '0 12px 35px rgba(0,0,0,0.65), 0 0 20px rgba(111,147,207,0.15)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          fontSize: 27,
          color: '#ffffff',
          lineHeight: 1.35,
          letterSpacing: 0.2,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}
      >
        {text}
      </span>
    </div>
  </div>
);

/**
 * Kartu Utama Elegan dengan Frame Washi
 */
export const GlassCard: React.FC<{
  w?: number;
  h?: number;
  border?: string;
  bg?: string;
  glow?: string;
  scale?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  w = 880,
  h,
  border = C.indigo,
  bg = '#1a212f',
  glow,
  scale = 1,
  children,
  style,
}) => (
  <div
    style={{
      width: w,
      minHeight: h,
      padding: '30px 36px',
      borderRadius: 32,
      background: bg,
      border: `2px solid ${border}`,
      boxShadow: `0 16px 40px rgba(0,0,0,0.6), ${glow ? `0 0 35px ${glow}` : '0 0 20px rgba(0,0,0,0.2)'}`,
      transform: `scale(${scale})`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * Badge Kategori / Label
 */
export const CategoryPill: React.FC<{
  label: string;
  color?: string;
  bg?: string;
  size?: number;
}> = ({label, color = C.gold, bg, size = 16}) => (
  <div
    style={{
      padding: '6px 18px',
      borderRadius: 999,
      background: bg ?? `${color}20`,
      border: `1.5px solid ${color}55`,
      fontFamily: FONT.display,
      fontWeight: 800,
      fontSize: size,
      color,
      letterSpacing: 1,
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {label}
  </div>
);

/**
 * Karakter Avatar Ekspresif di Pojok / Posisi Khusus
 * Ukuran lumayan besar (~1/9 layar, tinggi ~440px)
 */
export const CornerAvatar: React.FC<{
  expression?: AvatarExpressionType | number;
  gender?: 'male' | 'female';
  tier?: number;
  height?: number;
  position?: 'bottom-right' | 'bottom-left' | 'center' | 'custom';
  x?: number;
  y?: number;
  flip?: boolean;
  scale?: number;
  bubbleText?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}> = ({
  expression = 'neutral',
  gender = 'male',
  tier,
  height = 440,
  position = 'bottom-right',
  x,
  y,
  flip = false,
  scale = 1,
  bubbleText,
  glowColor = C.gold,
  style,
}) => {
  const f = useCurrentFrame();

  const posStyle: React.CSSProperties =
    position === 'bottom-right'
      ? {right: 40, bottom: 420, zIndex: 85}
      : position === 'bottom-left'
        ? {left: 40, bottom: 420, zIndex: 85}
        : position === 'center'
          ? {left: 540, top: 720, transform: 'translate(-50%, -50%)', zIndex: 85}
          : {left: x ?? 540, top: y ?? 720, zIndex: 85};

  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...posStyle,
        ...style,
      }}
    >
      {/* Speech / Reaction Bubble jika ada */}
      {bubbleText && (
        <div
          style={{
            marginBottom: -10,
            padding: '12px 24px',
            borderRadius: 20,
            background: '#1d2536',
            border: `2px solid ${glowColor}`,
            boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 20px ${glowColor}44`,
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 22,
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative',
            zIndex: 90,
            transform: `scale(${scale})`,
          }}
        >
          {bubbleText}
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: `8px solid ${glowColor}`,
            }}
          />
        </div>
      )}

      {/* Avatar Badan Besar (~1/9 Layar) */}
      <div
        style={{
          transform: `scale(${scale}) translateY(${Math.sin(f / 10) * 6}px)`,
          filter: `drop-shadow(0 18px 35px rgba(0,0,0,0.75)) drop-shadow(0 0 30px ${glowColor}55)`,
        }}
      >
        <Avatar
          gender={gender}
          tier={tier}
          expression={expression}
          height={height}
          flip={flip}
        />
      </div>
    </div>
  );
};
