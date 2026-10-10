import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BOUNCY, EASE, EASE_IN, EASE_IO, SOFT, SPRING, clamp, mix, pop, prog} from '../../shared/anim';
import {Avatar, AvatarExpression, AvatarExpressionType, AvatarGender} from '../../shared/components/Avatar';
import {ParticleField, ParticleFieldProps} from '../../components/ParticleField';
import {Pill, PhysicalButton, Stamp, Surface} from '../../shared/components/ui';
import {LogoMark, Wordmark} from '../../shared/components/Logo';
import {C as THEME_C, FONT, FPS, SAFE} from '../../shared/theme';

export const C = {
  ...THEME_C,
  souCyan: '#38bdf8',
} as const;

export {
  Avatar,
  AvatarExpression,
  BOUNCY,
  EASE,
  EASE_IN,
  EASE_IO,
  FONT,
  FPS,
  LogoMark,
  ParticleField,
  PhysicalButton,
  Pill,
  SAFE,
  SOFT,
  SPRING,
  Stamp,
  Surface,
  Wordmark,
  mix,
};
export type {AvatarExpressionType, AvatarGender, ParticleFieldProps};

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
 * Teks Jepang Besar & Berkarakter dengan Glow Halus
 */
export const JpText: React.FC<{
  size?: number;
  color?: string;
  glow?: boolean;
  glowColor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({size = 80, color = C.text, glow = false, glowColor = C.gold, children, style}) => (
  <span
    style={{
      fontFamily: FONT.jp,
      fontWeight: 900,
      fontSize: size,
      color,
      lineHeight: 1.15,
      whiteSpace: 'nowrap',
      textShadow: glow
        ? `0 0 35px ${hexA(glowColor, 0.7)}, 0 8px 24px rgba(0,0,0,0.85)`
        : '0 6px 20px rgba(0,0,0,0.7)',
      ...style,
    }}
  >
    {children}
  </span>
);

/**
 * Header Bab / World SevnQuest Standar di Zona Aman Atas
 */
export const WorldHeader: React.FC<{
  num: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  scale?: number;
}> = ({num, title, subtitle, badge = 'KONJUGASI', badgeColor = C.gold, scale = 1}) => (
  <div
    style={{
      position: 'absolute',
      top: SAFE.top + 8, // Y: 208px
      left: 60,
      right: 60,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      pointerEvents: 'none',
      zIndex: 60,
      transform: `scale(${scale})`,
      transformOrigin: 'top center',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '6px 20px',
        borderRadius: 999,
        background: 'rgba(23, 29, 42, 0.82)',
        border: `1.5px solid ${hexA(badgeColor, 0.45)}`,
        boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 20px ${hexA(badgeColor, 0.2)}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontWeight: 900,
          fontSize: 16,
          color: badgeColor,
          letterSpacing: 2,
        }}
      >
        {num}
      </span>
      <div style={{width: 5, height: 5, borderRadius: '50%', background: C.borderSubtle}} />
      <span
        style={{
          fontFamily: FONT.display,
          fontWeight: 800,
          fontSize: 16,
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
            fontWeight: 800,
            fontSize: 12,
            color: badgeColor,
            background: `${badgeColor}22`,
            padding: '3px 10px',
            borderRadius: 6,
            border: `1px solid ${badgeColor}55`,
          }}
        >
          {badge}
        </span>
      )}
    </div>
    {subtitle && (
      <div
        style={{
          fontFamily: FONT.body,
          fontWeight: 700,
          fontSize: 22,
          color: C.indigoSoft,
          letterSpacing: 0.5,
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        }}
      >
        {subtitle}
      </div>
    )}
  </div>
);

/**
 * Kartu RPG Kaca Taktil SevnQuest
 */
export const GlassCard: React.FC<{
  w?: number | string;
  h?: number | string;
  border?: string;
  bg?: string;
  glow?: string;
  scale?: number;
  radius?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  w = 920,
  h,
  border = C.indigo,
  bg = 'linear-gradient(180deg, #1b2232 0%, #131825 100%)',
  glow,
  scale = 1,
  radius = 36,
  children,
  style,
}) => (
  <div
    style={{
      width: w,
      minHeight: h,
      padding: '32px 38px',
      borderRadius: radius,
      background: bg,
      border: `2px solid ${border}`,
      boxShadow: `0 20px 50px rgba(0,0,0,0.7), ${
        glow ? `0 0 45px ${glow}` : `0 0 25px ${hexA(border, 0.25)}`
      }`,
      transform: `scale(${scale})`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * Karakter Avatar Ekspresif SevnQuest dengan Breathing Animation & Emotion Bubble
 */
export const CharacterPawn: React.FC<{
  gender?: AvatarGender;
  tier?: number;
  expression?: AvatarExpressionType | number;
  height?: number;
  x?: number;
  y?: number;
  flip?: boolean;
  scale?: number;
  bubbleText?: string;
  bubbleIcon?: 'idea' | 'question' | 'sparkle' | 'sweat' | 'exclamation';
  glowColor?: string;
  style?: React.CSSProperties;
}> = ({
  gender = 'male',
  tier = 3,
  expression = 'neutral',
  height = 340,
  x = 540,
  y = 1320,
  flip = false,
  scale = 1,
  bubbleText,
  bubbleIcon,
  glowColor = C.gold,
  style,
}) => {
  const frame = useCurrentFrame();
  const bobY = Math.sin((frame / 12) * Math.PI) * 7;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 45,
        ...style,
      }}
    >
      {/* Speech / Reaction Bubble jika ada */}
      {bubbleText && (
        <div
          style={{
            marginBottom: -8,
            padding: '12px 26px',
            borderRadius: 22,
            background: 'rgba(23, 30, 44, 0.95)',
            border: `2px solid ${glowColor}`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.7), 0 0 25px ${hexA(glowColor, 0.45)}`,
            backdropFilter: 'blur(8px)',
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 22,
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative',
            zIndex: 50,
            transform: `scale(${scale})`,
            whiteSpace: 'nowrap',
          }}
        >
          {bubbleText}
          <div
            style={{
              position: 'absolute',
              bottom: -9,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: `9px solid ${glowColor}`,
            }}
          />
        </div>
      )}

      {/* Avatar Image dengan Idle Breathing */}
      <div
        style={{
          transform: `translateY(${bobY}px) scale(${scale})`,
          filter: `drop-shadow(0 18px 35px rgba(0,0,0,0.85)) drop-shadow(0 0 35px ${hexA(
            glowColor,
            0.5,
          )})`,
        }}
      >
        <AvatarExpression
          gender={gender}
          tier={tier}
          expression={expression}
          height={height}
          flip={flip}
          bubble={bubbleIcon}
        />
      </div>
    </div>
  );
};

/**
 * Floating EXP Reward / Level Up Tag
 */
export const ExpRewardBadge: React.FC<{
  exp?: number;
  label?: string;
  color?: string;
  scale?: number;
}> = ({exp = 20, label = 'BENAR!', color = C.matcha, scale = 1}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 24px',
      borderRadius: 999,
      background: `linear-gradient(90deg, ${color}33 0%, rgba(20,25,35,0.9) 100%)`,
      border: `2px solid ${color}`,
      boxShadow: `0 8px 30px rgba(0,0,0,0.7), 0 0 25px ${hexA(color, 0.6)}`,
      transform: `scale(${scale})`,
    }}
  >
    <span style={{fontSize: 24}}>✨</span>
    <span
      style={{
        fontFamily: FONT.display,
        fontSize: 22,
        fontWeight: 900,
        color: '#ffffff',
        letterSpacing: 1,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: 20,
        fontWeight: 900,
        color,
      }}
    >
      +{exp} EXP
    </span>
  </div>
);
