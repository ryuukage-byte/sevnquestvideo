import React from 'react';
import {Avatar, AvatarExpressionType} from '../../shared/components/Avatar';
import {C} from '../../shared/theme';
import {hexA} from './kit';

// Motif cerita tunggal: sebuah buku (本). Dipakai dari hook sampai rangkuman supaya ceritanya satu.
// Dua karakter resmi: 私 (pembicara) dan 友達 (teman).

// ───────────────────────────── buku ─────────────────────────────
export const BookIcon: React.FC<{size?: number; glow?: number}> = ({size = 120, glow = 0}) => (
  <svg
    width={size}
    height={size * 0.8}
    viewBox="0 0 120 96"
    style={{
      overflow: 'visible',
      filter: `drop-shadow(0 0 ${6 + glow * 22}px ${hexA(C.gold, 0.3 + 0.5 * glow)}) drop-shadow(0 10px 12px rgba(0,0,0,0.6))`,
    }}
  >
    <rect x="6" y="8" width="108" height="80" rx="8" fill={C.indigoDeep} stroke={C.indigoSoft} strokeWidth="3" />
    <rect x="14" y="14" width="96" height="68" rx="4" fill="#fffaf0" />
    <rect x="14" y="14" width="26" height="68" rx="4" fill={C.indigo} />
    <path d="M52 34H96M52 50H96M52 66H84" stroke="#c9b48a" strokeWidth="4" strokeLinecap="round" />
    <rect x="18" y="24" width="18" height="6" rx="2" fill={C.gold} />
  </svg>
);

// ───────────────────────────── karakter ─────────────────────────────
// Hanya Avatar resmi; ditambatkan di telapak kaki pada garis lantai (translate -50%, -100%).
export const Actor: React.FC<{
  x: number;
  y: number;
  h: number;
  expression: AvatarExpressionType;
  bubble?: 'exclamation' | 'question' | 'sweat';
  female?: boolean;
  o?: number;
  s?: number;
  flip?: boolean;
}> = ({x, y, h, expression, bubble, female = false, o = 1, s = 1, flip}) =>
  o <= 0.001 ? null : (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -100%) scale(${s})`,
        transformOrigin: '50% 100%',
        opacity: o,
      }}
    >
      <Avatar female={female} expression={expression} height={h} flip={flip} bubble={bubble} bubblePosition="top-right" />
    </div>
  );
