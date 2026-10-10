import React from 'react';
import {spring} from 'remotion';
import {C, FONT, SHADOW_CARD} from '../../../shared/theme';

export interface CardPhysicsProps {
  frame: number;
  fps: number;
  delay?: number;
  // Inertia & spring tuning
  damping?: number;
  stiffness?: number;
  mass?: number;
  // Spatial coordinates
  x?: number;
  y?: number;
  z?: number;
  rotateZ?: number;
  tiltX?: number;
  tiltY?: number;
  scale?: number;
  // Visual props
  width?: number;
  height?: number;
  radius?: number;
  border?: string;
  glow?: string;
  stitch?: boolean;
  active?: boolean;
  position?: 'absolute' | 'relative';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Tactical physical card component with spring inertia, overshoot, and 3D depth.
 */
export const CardPhysics: React.FC<CardPhysicsProps> = ({
  frame,
  fps,
  delay = 0,
  damping = 16,
  stiffness = 140,
  mass = 0.85,
  x = 0,
  y = 0,
  z = 0,
  rotateZ = 0,
  tiltX = 0,
  tiltY = 0,
  scale = 1,
  width,
  height,
  radius = 32,
  border = C.borderSubtle,
  glow,
  stitch = true,
  active = false,
  position = 'absolute',
  style,
  children,
}) => {
  const enterProgress =
    frame < delay
      ? 0
      : spring({
          frame: frame - delay,
          fps,
          config: {damping, stiffness, mass},
        });

  // Inertial entrance from below with overshoot rotation
  const curScale = enterProgress * scale;
  const curY = (1 - enterProgress) * 90 + (y ?? 0);
  const curRotZ = (1 - enterProgress) * 4 + rotateZ;
  const curOpacity = Math.min(1, enterProgress * 1.6);

  const isRel = position === 'relative';

  return (
    <div
      style={{
        position,
        width,
        height,
        left: isRel ? undefined : x,
        top: isRel ? undefined : curY,
        opacity: curOpacity,
        transform: isRel
          ? `translate3d(0, ${(1 - enterProgress) * 40}px, ${z}px) scale(${curScale}) rotate(${curRotZ}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
          : `translate3d(-50%, -50%, ${z}px) scale(${curScale}) rotate(${curRotZ}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
        borderRadius: radius,
        background: `linear-gradient(180deg, #272f40 0%, ${C.card} 100%)`,
        boxShadow: active
          ? `0 20px 48px rgba(0,0,0,0.65), 0 0 40px ${glow ?? 'rgba(240,190,82,0.35)'}, inset 0 1px 0 rgba(255,255,255,0.15)`
          : SHADOW_CARD,
        border: `2px solid ${active ? C.gold : border}`,
        fontFamily: FONT.body,
        overflow: 'hidden',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {/* Sashiko inner stitch line */}
      {stitch && (
        <div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: Math.max(radius - 10, 8),
            border: `2px dashed ${C.thread}`,
            opacity: active ? 0.75 : 0.4,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <div style={{position: 'relative', zIndex: 2, width: '100%', height: '100%'}}>
        {children}
      </div>
    </div>
  );
};
