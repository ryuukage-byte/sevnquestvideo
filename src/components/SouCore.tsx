import React from 'react';
import {useCurrentFrame} from 'remotion';
import {TOKENS} from '../styles/tokens';

export interface SouCoreProps {
  x?: number;
  y?: number;
  size?: number; // Core size in px (e.g. 80-140)
  glowIntensity?: number; // 0..1
  scale?: number;
  pulse?: boolean;
  showRings?: boolean;
  arrowMode?: boolean; // Morph into pointer arrow
  glowColor?: string;
  coreColor?: string;
  label?: string; // Optional embedded or floating label "そう"
  showLabel?: boolean;
  labelSize?: number;
  rotation?: number;
  style?: React.CSSProperties;
}

export const SouCore: React.FC<SouCoreProps> = ({
  x = 540,
  y = 960,
  size = 110,
  glowIntensity = 1,
  scale = 1,
  pulse = true,
  showRings = true,
  arrowMode = false,
  glowColor = TOKENS.colors.souCyan,
  coreColor = TOKENS.colors.souCyan,
  label = 'そう',
  showLabel = true,
  labelSize = 48,
  rotation = 0,
  style,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse
  const breath = pulse ? Math.sin((frame / 60) * Math.PI * 2) * 0.06 : 0;
  const effectiveScale = scale * (1 + breath);

  // Rotating outer orbit
  const orbitAngle = (frame * 1.5) % 360;
  const counterOrbitAngle = (-frame * 2.2) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${effectiveScale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Outer ambient glow halo */}
      <div
        style={{
          position: 'absolute',
          width: size * 2.4,
          height: size * 2.4,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor}55 0%, ${glowColor}15 45%, transparent 70%)`,
          filter: `blur(${Math.round(16 * glowIntensity)}px)`,
          opacity: glowIntensity,
        }}
      />

      {/* Orbit ring 1 */}
      {showRings && !arrowMode && (
        <div
          style={{
            position: 'absolute',
            width: size * 1.55,
            height: size * 1.55,
            borderRadius: '50%',
            border: `1.5px dashed ${glowColor}66`,
            transform: `rotate(${orbitAngle}deg)`,
          }}
        />
      )}

      {/* Orbit ring 2 */}
      {showRings && !arrowMode && (
        <div
          style={{
            position: 'absolute',
            width: size * 1.85,
            height: size * 1.85,
            borderRadius: '50%',
            border: `1px solid ${glowColor}33`,
            transform: `rotate(${counterOrbitAngle}deg)`,
          }}
        >
          {/* Small satellite bead */}
          <div
            style={{
              position: 'absolute',
              top: -4,
              left: '50%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 10px ${glowColor}`,
            }}
          />
        </div>
      )}

      {/* Central energy body or Arrow morph */}
      {arrowMode ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <svg
            width={size * 1.2}
            height={size * 1.2}
            viewBox="0 0 100 100"
            fill="none"
            style={{filter: `drop-shadow(0 0 20px ${glowColor})`}}
          >
            <polygon
              points="50,10 90,80 50,65 10,80"
              fill={coreColor}
              stroke="#FFFFFF"
              strokeWidth="3"
            />
          </svg>
        </div>
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${coreColor} 50%, #155e75 100%)`,
            boxShadow: `0 0 ${Math.round(35 * glowIntensity)}px ${glowColor}, inset 0 0 15px rgba(255,255,255,0.7)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Core Japanese text highlight */}
          {showLabel && (
            <span
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: labelSize,
                color: '#090E1E',
                textShadow: '0 0 8px rgba(255,255,255,0.8)',
                userSelect: 'none',
              }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
