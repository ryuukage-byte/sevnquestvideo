import React from 'react';
import {interpolate} from 'remotion';
import {C, FONT} from '../../../shared/theme';

export interface ContinuityBridgeProps {
  frame: number;
  fps: number;
  type: 'tunnel' | 'rails' | 'wipeMask' | 'gatewayBeam' | 'none';
  progress: number; // 0 to 1
}

/**
 * SceneContinuity handles seamless visual carry-overs between sequences,
 * preventing hard cuts or empty blank frames.
 */
export const ContinuityBridge: React.FC<ContinuityBridgeProps> = ({
  type,
  progress,
}) => {
  if (type === 'none' || progress <= 0) return null;

  if (type === 'tunnel') {
    // Suffix convergence to definition tunnel
    const scale = interpolate(progress, [0, 1], [0.8, 14]);
    const opacity = interpolate(progress, [0, 0.7, 1], [0.6, 0.9, 0]);
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 99,
          opacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT.jp,
            fontWeight: 900,
            fontSize: 260,
            color: C.gold,
            transform: `scale(${scale})`,
            textShadow: '0 0 80px rgba(240,190,82,0.9), 0 0 160px rgba(240,190,82,0.5)',
          }}
        >
          ない
        </div>
      </div>
    );
  }

  if (type === 'wipeMask') {
    // Dynamic mask wipe for Group 2 to Group 3
    const scale = interpolate(progress, [0, 1], [1, 22]);
    const opacity = interpolate(progress, [0, 0.6, 1], [0.8, 1, 0]);
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 99,
          opacity,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${C.goldSoft} 0%, ${C.bg} 80%)`,
            transform: `scale(${scale})`,
            boxShadow: '0 0 120px rgba(240,190,82,0.8)',
          }}
        />
      </div>
    );
  }

  if (type === 'gatewayBeam') {
    // Luminous gateway push from Recap (Seq 06) into SevnQuest UI (Seq 07)
    const beamScale = interpolate(progress, [0, 1], [0.2, 8]);
    const beamOpacity = interpolate(progress, [0, 0.7, 1], [0.4, 1, 0]);
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 99,
          opacity: beamOpacity,
        }}
      >
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: `radial-gradient(circle, #ffffff 0%, ${C.indigo} 40%, transparent 70%)`,
            transform: `scale(${beamScale})`,
            filter: 'blur(8px)',
          }}
        />
      </div>
    );
  }

  return null;
};
