import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, FONT} from '../../../shared/theme';

export interface SevnQuestAppIconProps {
  size?: number;
  press?: number; // 0..1
  highlight?: boolean;
  glow?: number; // 0..1
  showLabel?: boolean;
  label?: string;
  style?: React.CSSProperties;
}

export const SevnQuestAppIcon: React.FC<SevnQuestAppIconProps> = ({
  size = 110,
  press = 0,
  highlight = false,
  glow = 0,
  showLabel = true,
  label = 'SevnQuest',
  style,
}) => {
  const radius = size * 0.224;
  const scale = 1 - press * 0.12;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transform: `scale(${scale})`,
        transition: 'transform 0.1s ease',
        ...style,
      }}
    >
      {/* Icon Frame */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: highlight
            ? `0 0 0 3.5px ${C.gold}, 0 12px 30px rgba(240,190,82,${0.35 + glow * 0.4}), 0 8px 24px rgba(0,0,0,0.65)`
            : `0 8px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.35)`,
          border: '1.5px solid rgba(255,255,255,0.18)',
          background: '#12151d',
        }}
      >
        <Img
          src={staticFile('brand/logo.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Subtle glass reflection overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: radius,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Gold highlight shimmer ring */}
        {highlight && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: radius,
              border: `2px solid ${C.gold}`,
              boxShadow: `inset 0 0 14px rgba(240,190,82,0.45)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Label under icon */}
      {showLabel && (
        <span
          style={{
            fontFamily: FONT.body,
            fontWeight: 500,
            fontSize: Math.round(size * 0.2),
            color: '#ffffff',
            textShadow: '0 1px 4px rgba(0,0,0,0.85)',
            textAlign: 'center',
            letterSpacing: 0.2,
            maxWidth: size * 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
