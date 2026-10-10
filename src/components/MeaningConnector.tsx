import React from 'react';
import {useCurrentFrame} from 'remotion';
import {TOKENS} from '../styles/tokens';

export interface MeaningConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress?: number; // 0..1 line drawing progress
  active?: boolean;
  dotted?: boolean;
  color?: string;
  glow?: boolean;
  strokeWidth?: number;
  label?: string;
  style?: React.CSSProperties;
}

export const MeaningConnector: React.FC<MeaningConnectorProps> = ({
  x1,
  y1,
  x2,
  y2,
  progress = 1,
  active = true,
  dotted = false,
  color = TOKENS.colors.souCyan,
  glow = true,
  strokeWidth = 3,
  label,
  style,
}) => {
  const frame = useCurrentFrame();

  const dx = x2 - x1;
  const dy = y2 - y1;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Dotted animation dash offset
  const dashOffset = dotted ? -(frame * 2) % 30 : 0;

  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 1080,
        height: 1920,
        pointerEvents: 'none',
        zIndex: 30,
        overflow: 'visible',
        ...style,
      }}
    >
      <defs>
        <filter id="connector-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Path line */}
      <line
        x1={x1}
        y1={y1}
        x2={x1 + dx * progress}
        y2={y1 + dy * progress}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dotted ? '10 8' : undefined}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        opacity={active ? 1 : 0.4}
        filter={glow ? 'url(#connector-glow)' : undefined}
      />

      {/* Pulse energy particle travelling along line */}
      {active && progress > 0.8 && (
        <circle
          cx={x1 + dx * (((frame * 2.5) % 100) / 100)}
          cy={y1 + dy * (((frame * 2.5) % 100) / 100)}
          r={6}
          fill="#FFFFFF"
          filter="url(#connector-glow)"
        />
      )}

      {/* Optional center label */}
      {label && progress > 0.5 && (
        <text
          x={midX}
          y={midY - 14}
          fill={color}
          fontSize={22}
          fontWeight={800}
          fontFamily={TOKENS.fonts.body}
          textAnchor="middle"
          filter="url(#connector-glow)"
        >
          {label}
        </text>
      )}
    </svg>
  );
};
