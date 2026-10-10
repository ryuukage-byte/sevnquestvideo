import React from 'react';
import {random} from 'remotion';
import {C} from '../theme';

const COLORS = [C.gold, C.goldSoft, C.matcha, C.indigoSoft, C.hanko];

// Konfeti kecil deterministik (seed) — meledak singkat lalu jatuh.
export const Confetti: React.FC<{x: number; y: number; t: number; n?: number; seed?: string; spread?: number}> = ({
  x,
  y,
  t,
  n = 28,
  seed = 'c',
  spread = 520,
}) => {
  if (t <= 0 || t >= 1) return null;
  return (
    <>
      {Array.from({length: n}).map((_, i) => {
        const a = -Math.PI / 2 + (random(`${seed}a${i}`) - 0.5) * Math.PI * 1.15;
        const v = spread * (0.45 + random(`${seed}v${i}`) * 0.7);
        const px = x + Math.cos(a) * v * t;
        const py = y + Math.sin(a) * v * t + 900 * t * t;
        const s = 10 + random(`${seed}s${i}`) * 12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: s,
              height: s * 0.5,
              borderRadius: 3,
              background: COLORS[i % COLORS.length],
              opacity: 1 - t * t,
              transform: `rotate(${random(`${seed}r${i}`) * 360 + t * 540}deg)`,
            }}
          />
        );
      })}
    </>
  );
};
