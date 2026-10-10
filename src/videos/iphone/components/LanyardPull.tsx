import React from 'react';
import {C, FONT} from '../../../shared/theme';

export interface LanyardPullProps {
  pullProgress?: number; // 0..1 (where 1 is fully pulled down)
  showLabel?: boolean;
  highlight?: boolean;
  style?: React.CSSProperties;
}

export const LanyardPull: React.FC<LanyardPullProps> = ({
  pullProgress = 0,
  showLabel = true,
  highlight = false,
  style,
}) => {
  // Elastic physics calculations
  const maxDisplacement = 200; // max px of pull
  const currentY = pullProgress * maxDisplacement;
  const baseRopeLength = 120;
  const ropeLength = baseRopeLength + currentY;
  const ropeThickness = Math.max(4, 7 - pullProgress * 2); // gets slightly thinner as stretched

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}
    >
      {/* Top Anchor (Mount point fixed at top) */}
      <div
        style={{
          width: 32,
          height: 14,
          borderRadius: '7px 7px 2px 2px',
          background: 'linear-gradient(180deg, #5b6275 0%, #2e3444 100%)',
          border: '1.5px solid rgba(255,255,255,0.25)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          zIndex: 5,
        }}
      />

      {/* Rope / Cord (SVG with woven pattern) */}
      <svg
        width="24"
        height={ropeLength}
        style={{
          overflow: 'visible',
          filter: `drop-shadow(0 ${4 + pullProgress * 8}px ${8 + pullProgress * 12}px rgba(0,0,0,${0.4 + pullProgress * 0.3}))`,
          zIndex: 4,
        }}
      >
        <defs>
          <linearGradient id="ropeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8c6810" />
            <stop offset="35%" stopColor={C.goldSoft} />
            <stop offset="70%" stopColor={C.gold} />
            <stop offset="100%" stopColor="#5c440a" />
          </linearGradient>
          <pattern id="ropeWeave" width="6" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="6" y2="8" stroke="#a07818" strokeWidth="1.5" />
            <line x1="0" y1="8" x2="6" y2="0" stroke="#fde8a8" strokeWidth="1" opacity="0.7" />
          </pattern>
        </defs>

        {/* Rope Core */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2={ropeLength}
          stroke="url(#ropeGrad)"
          strokeWidth={ropeThickness}
          strokeLinecap="round"
        />
        {/* Weave overlay */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2={ropeLength}
          stroke="url(#ropeWeave)"
          strokeWidth={ropeThickness - 1}
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Grip / Handle (The physical wooden/metal bead & ring) */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `translateY(${-4}px)`,
          zIndex: 6,
        }}
      >
        {/* Metallic Top Ring Knot */}
        <div
          style={{
            width: 22,
            height: 12,
            borderRadius: 6,
            background: 'linear-gradient(180deg, #fde8a8 0%, #f0be52 60%, #8c6810 100%)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            border: '1px solid #ffe8aa',
          }}
        />

        {/* Main Handle Capsule */}
        <div
          style={{
            marginTop: 2,
            width: 44,
            height: 64,
            borderRadius: 22,
            background:
              'linear-gradient(180deg, #2b3346 0%, #171c28 50%, #2b3346 100%)',
            border: highlight
              ? `2.5px solid ${C.gold}`
              : '2px solid rgba(240, 190, 82, 0.5)',
            boxShadow: highlight
              ? `0 0 0 4px rgba(240,190,82,0.35), 0 0 24px rgba(240,190,82,0.6), 0 12px 24px rgba(0,0,0,0.6)`
              : `0 8px 20px rgba(0,0,0,0.5), inset 0 2px 3px rgba(255,255,255,0.25)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            position: 'relative',
          }}
        >
          {/* Decorative Gold Inlay / Grip Ridges */}
          <div style={{width: 24, height: 2, background: C.gold, borderRadius: 1, opacity: 0.8}} />
          <div style={{width: 24, height: 2, background: C.gold, borderRadius: 1, opacity: 0.8}} />
          <div style={{width: 24, height: 2, background: C.gold, borderRadius: 1, opacity: 0.8}} />

          {/* Central Logo Motif Dot */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${C.goldSoft} 0%, ${C.gold} 100%)`,
              boxShadow: '0 0 8px rgba(240,190,82,0.7)',
            }}
          />
        </div>

        {/* Label floating beside or below handle */}
        {showLabel && (
          <div
            style={{
              position: 'absolute',
              top: 76,
              whiteSpace: 'nowrap',
              background: 'rgba(15, 18, 25, 0.95)',
              border: `1.5px solid ${C.gold}`,
              boxShadow: '0 8px 20px rgba(0,0,0,0.55), 0 0 16px rgba(240,190,82,0.3)',
              borderRadius: 20,
              padding: '6px 18px',
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 18,
              color: C.gold,
              letterSpacing: 1.2,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              pointerEvents: 'none',
            }}
          >
            TARIK INI ↓
          </div>
        )}
      </div>
    </div>
  );
};
