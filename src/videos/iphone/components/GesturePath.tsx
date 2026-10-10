import React from 'react';
import {C} from '../../../shared/theme';

export interface GesturePathProps {
  x: number;
  startY: number;
  length: number;
  direction?: 'down' | 'up';
  progress?: number; // 0..1
  opacity?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const GesturePath: React.FC<GesturePathProps> = ({
  x,
  startY,
  length,
  direction = 'down',
  progress = 1,
  opacity = 1,
  color = C.gold,
  style,
}) => {
  if (opacity <= 0) return null;

  const currentLength = length * Math.max(0.01, progress);
  const isDown = direction === 'down';
  const endY = isDown ? startY + currentLength : startY - currentLength;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - 20,
        top: Math.min(startY, endY) - 10,
        width: 40,
        height: Math.abs(currentLength) + 30,
        pointerEvents: 'none',
        zIndex: 900,
        opacity,
        ...style,
      }}
    >
      <svg
        width="40"
        height={Math.abs(currentLength) + 30}
        style={{overflow: 'visible'}}
      >
        <defs>
          <linearGradient id="gestureGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Dotted path line */}
        <line
          x1="20"
          y1={isDown ? 10 : currentLength + 10}
          x2="20"
          y2={isDown ? currentLength + 10 : 10}
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
          filter={`drop-shadow(0 0 6px ${color})`}
        />

        {/* Arrowhead at current end position */}
        {isDown ? (
          <polygon
            points={`12,${currentLength} 28,${currentLength} 20,${currentLength + 16}`}
            fill={color}
            filter={`drop-shadow(0 0 8px ${color})`}
          />
        ) : (
          <polygon
            points={`12,20 28,20 20,4`}
            fill={color}
            filter={`drop-shadow(0 0 8px ${color})`}
          />
        )}
      </svg>
    </div>
  );
};
