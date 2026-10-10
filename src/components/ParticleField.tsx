import React, {useMemo} from 'react';
import {useCurrentFrame} from 'remotion';
import {TOKENS} from '../styles/tokens';

export interface ParticleFieldProps {
  count?: number;
  type?: 'ambient' | 'steam' | 'converge' | 'weather';
  color?: string;
  convergeTarget?: {x: number; y: number};
  convergeProgress?: number; // 0..1
  style?: React.CSSProperties;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 35,
  type = 'ambient',
  color = TOKENS.colors.souCyan,
  convergeTarget = {x: 540, y: 960},
  convergeProgress = 0,
  style,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({length: count}).map((_, i) => {
      // Deterministic pseudo-random seed
      const seed = (i * 9301 + 49297) % 233280;
      const rnd1 = seed / 233280;
      const rnd2 = ((seed * 9301 + 49297) % 233280) / 233280;
      const rnd3 = ((rnd2 * 9301 + 49297) % 233280) / 233280;

      return {
        id: i,
        initX: rnd1 * 1080,
        initY: rnd2 * 1920,
        size: 3 + rnd3 * 6,
        speedY: 0.8 + rnd1 * 1.5,
        speedX: (rnd2 - 0.5) * 0.8,
        phase: rnd3 * Math.PI * 2,
        opacity: 0.25 + rnd1 * 0.6,
      };
    });
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
        ...style,
      }}
    >
      {particles.map((p) => {
        let x = p.initX + Math.sin(frame * 0.03 + p.phase) * 20 + frame * p.speedX;
        let y = p.initY - frame * p.speedY;

        // Wrap around screen
        x = ((x % 1080) + 1080) % 1080;
        y = ((y % 1920) + 1920) % 1920;

        if (type === 'steam') {
          // Steam rises from center bottom
          const steamY = 1200 - ((frame * p.speedY * 2.5 + p.initY * 0.3) % 400);
          const steamX = 540 + Math.sin(frame * 0.05 + p.phase) * (40 + (1200 - steamY) * 0.25);
          x = steamX;
          y = steamY;
        } else if (type === 'converge') {
          // Particles pull toward convergeTarget
          x = p.initX + (convergeTarget.x - p.initX) * convergeProgress;
          y = p.initY + (convergeTarget.y - p.initY) * convergeProgress;
        }

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: p.opacity * (1 - convergeProgress * 0.3),
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
