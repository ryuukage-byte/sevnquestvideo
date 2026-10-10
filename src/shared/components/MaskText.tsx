import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {SOFT, pop} from '../anim';
import {C, FONT} from '../theme';

export type Hl = Record<string, string>; // kata → warna

// Kinetic typography: tiap kata naik dari balik mask, bertahap.
export const MaskText: React.FC<{
  text: string;
  start?: number;
  stagger?: number;
  size: number;
  font?: string;
  weight?: number;
  color?: string;
  hl?: Hl;
  align?: 'center' | 'left';
  lineHeight?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
  outAt?: number; // frame mulai menghilang (opsional)
}> = ({
  text,
  start = 0,
  stagger = 4,
  size,
  font = FONT.display,
  weight = 800,
  color = C.text,
  hl = {},
  align = 'center',
  lineHeight = 1.02,
  letterSpacing = 0,
  style,
  outAt,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  const out = outAt === undefined ? 0 : Math.min(1, Math.max(0, (f - outAt) / 8));
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.26,
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        letterSpacing,
        color,
        opacity: 1 - out,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const p = pop(f, fps, start + i * stagger, SOFT);
        const key = w.replace(/[^\p{L}\p{N}×]/gu, '').toUpperCase();
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', paddingBottom: size * 0.14, marginBottom: -size * 0.14}}>
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${(1 - p) * 135}%)`,
                color: hl[key] ?? 'inherit',
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};
