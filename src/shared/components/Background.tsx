import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, H, W} from '../theme';

const GLYPHS = [
  {g: '日', x: 90, y: 330, s: 190, p: 0},
  {g: '食', x: 800, y: 560, s: 150, p: 1.7},
  {g: '学', x: 170, y: 980, s: 170, p: 3.1},
  {g: '道', x: 820, y: 1220, s: 210, p: 4.4},
  {g: '言', x: 120, y: 1560, s: 140, p: 5.2},
  {g: '塔', x: 760, y: 1700, s: 160, p: 2.3},
];

// Satu "dunia" yang persisten di bawah semua scene: kertas washi indigo, jahitan sashiko, aksara melayang.
export const Background: React.FC<{
  reflectiveDim?: number; // 0..1 untuk transisi mood tenang/reflektif
}> = ({reflectiveDim = 0}) => {
  const f = useCurrentFrame();
  const drift = (f * 0.18) % 96;
  const sashikoOpacity = 0.55 * (1 - reflectiveDim * 0.85);
  const glyphOpacity = 0.045 * (1 - reflectiveDim);

  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 62% at 50% 16%, #1e2538 0%, #151a26 48%, #0d1017 100%)',
        }}
      />
      {sashikoOpacity > 0.01 && (
        <svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity: sashikoOpacity}}>
          <defs>
            <pattern
              id="sashiko"
              width="96"
              height="96"
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(${drift} ${drift})`}
            >
              <path d="M0 48H96M48 0V96" stroke={C.indigoSoft} strokeOpacity={0.1} strokeWidth={2} strokeDasharray="12 10" />
              <path d="M0 0L96 96M96 0L0 96" stroke={C.indigoSoft} strokeOpacity={0.04} strokeWidth={2} strokeDasharray="6 14" />
            </pattern>
            <radialGradient id="sashikoMask" cx="50%" cy="42%" r="70%">
              <stop offset="0%" stopColor="#fff" stopOpacity={1} />
              <stop offset="100%" stopColor="#fff" stopOpacity={0.15} />
            </radialGradient>
            <mask id="sm">
              <rect width={W} height={H} fill="url(#sashikoMask)" />
            </mask>
          </defs>
          <rect width={W} height={H} fill="url(#sashiko)" mask="url(#sm)" />
        </svg>
      )}
      {glyphOpacity > 0.005 &&
        GLYPHS.map((o, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: o.x,
              top: o.y + Math.sin(f / 70 + o.p) * 14,
              fontFamily: FONT.jp,
              fontWeight: 900,
              fontSize: o.s,
              color: C.indigoSoft,
              opacity: glyphOpacity,
              transform: `rotate(${Math.sin(f / 120 + o.p) * 3}deg)`,
            }}
          >
            {o.g}
          </div>
        ))}
      <AbsoluteFill
        style={{background: 'radial-gradient(90% 70% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)'}}
      />
    </AbsoluteFill>
  );
};
