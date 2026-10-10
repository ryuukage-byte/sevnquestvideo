import React from 'react';
import {interpolate, spring} from 'remotion';
import {C, FONT} from '../../../shared/theme';

export interface SuffixDetachProps {
  frame: number;
  fps: number;
  stem: string; // e.g. "食べ"
  stemFurigana?: string; // e.g. "たべ"
  oldSuffix: string; // e.g. "る"
  newSuffix: string; // e.g. "ない"
  startFrame: number;
  detachDur?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}

/**
 * High-precision verb suffix detachment and substitution animation.
 * The stem stays strictly stationary, while the old suffix slides/ejects out
 * and the new negative suffix (ない) slides in along an accelerated curved trajectory.
 */
export const SuffixDetach: React.FC<SuffixDetachProps> = ({
  frame,
  fps,
  stem,
  stemFurigana,
  oldSuffix,
  newSuffix,
  startFrame,
  detachDur = 25,
  fontSize = 90,
  style,
}) => {
  // Phase 1: Old suffix detaches and flies away with drag resistance
  const detachProg = interpolate(
    frame,
    [startFrame, startFrame + detachDur],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const oldSuffixY = detachProg * -120;
  const oldSuffixX = detachProg * 60;
  const oldSuffixRot = detachProg * 25;
  const oldSuffixOpacity = 1 - detachProg;
  const oldSuffixScale = 1 - detachProg * 0.35;

  // Phase 2: New suffix ("ない") glides in and snaps into position
  const snapStart = startFrame + detachDur * 0.45;
  const snapSpring =
    frame < snapStart
      ? 0
      : spring({
          frame: frame - snapStart,
          fps,
          config: {damping: 14, stiffness: 160, mass: 0.8},
        });

  const newSuffixX = (1 - snapSpring) * 140;
  const newSuffixY = (1 - snapSpring) * 40;
  const newSuffixOpacity = Math.min(1, snapSpring * 2);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: FONT.jp,
        fontSize,
        fontWeight: 900,
        color: C.text,
        letterSpacing: 2,
        lineHeight: 1,
        ...style,
      }}
    >
      {/* 1. Anchored Stem: Stays strictly at identical coordinates */}
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: C.text,
          textShadow: '0 4px 20px rgba(0,0,0,0.6)',
          lineHeight: 1,
        }}
      >
        {stemFurigana && (
          <span
            style={{
              fontSize: fontSize * 0.35,
              fontWeight: 700,
              color: C.gold,
              fontFamily: FONT.jp,
              letterSpacing: 2,
              marginBottom: 4,
              lineHeight: 1,
            }}
          >
            {stemFurigana}
          </span>
        )}
        <span style={{lineHeight: 1}}>{stem}</span>
      </span>

      {/* 2. Slot for the changing suffix */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 8,
          minWidth: Math.max(oldSuffix.length, newSuffix.length) * (fontSize * 0.9),
          height: fontSize * 1.15,
        }}
      >
        {/* Old Suffix (e.g. "る") */}
        {oldSuffixOpacity > 0.01 && (
          <span
            style={{
              position: 'absolute',
              left: 0,
              display: 'inline-block',
              transform: `translate(${oldSuffixX}px, ${oldSuffixY}px) rotate(${oldSuffixRot}deg) scale(${oldSuffixScale})`,
              opacity: oldSuffixOpacity,
              color: C.textSecondary,
              filter: `drop-shadow(0 4px 10px rgba(0,0,0,0.5))`,
              lineHeight: 1,
            }}
          >
            {oldSuffix}
          </span>
        )}

        {/* New Suffix (e.g. "ない") */}
        {snapSpring > 0.01 && (
          <span
            style={{
              position: 'absolute',
              left: 0,
              display: 'inline-block',
              transform: `translate(${newSuffixX}px, ${newSuffixY}px) scale(${snapSpring})`,
              opacity: newSuffixOpacity,
              color: C.gold,
              textShadow: '0 0 35px rgba(240,190,82,0.8), 0 4px 18px rgba(0,0,0,0.9)',
              lineHeight: 1,
            }}
          >
            {newSuffix}
          </span>
        )}
      </div>
    </div>
  );
};

export interface ConvergingGlyphProps {
  frame: number;
  fps: number;
  progress: number; // 0 to 1
  size?: number;
}

/**
 * Three detached "ない" suffixes converging into one monumental luminous "ない" glyph.
 */
export const SuffixConvergence: React.FC<ConvergingGlyphProps> = ({
  progress,
  size = 180,
}) => {
  // Suffix 1 from Top-Left
  const p1X = (1 - progress) * -220;
  const p1Y = (1 - progress) * -180;
  const p1Op = 1 - progress * 0.85;

  // Suffix 2 from Top-Right
  const p2X = (1 - progress) * 220;
  const p2Y = (1 - progress) * -180;
  const p2Op = 1 - progress * 0.85;

  // Suffix 3 from Bottom-Center
  const p3X = 0;
  const p3Y = (1 - progress) * 200;
  const p3Op = 1 - progress * 0.85;

  // Central Converged Luminous Master Glyph
  const masterScale = interpolate(progress, [0.65, 1], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const masterGlow = progress * 60;

  return (
    <div
      style={{
        position: 'relative',
        width: size * 2,
        height: size * 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT.jp,
        fontWeight: 900,
      }}
    >
      {/* Detached Particle 1 */}
      {progress < 0.98 && (
        <div
          style={{
            position: 'absolute',
            fontSize: size * 0.65,
            color: C.indigoSoft,
            transform: `translate(${p1X}px, ${p1Y}px)`,
            opacity: p1Op,
            filter: 'blur(1px)',
          }}
        >
          ない
        </div>
      )}

      {/* Detached Particle 2 */}
      {progress < 0.98 && (
        <div
          style={{
            position: 'absolute',
            fontSize: size * 0.65,
            color: C.indigoSoft,
            transform: `translate(${p2X}px, ${p2Y}px)`,
            opacity: p2Op,
            filter: 'blur(1px)',
          }}
        >
          ない
        </div>
      )}

      {/* Detached Particle 3 */}
      {progress < 0.98 && (
        <div
          style={{
            position: 'absolute',
            fontSize: size * 0.65,
            color: C.indigoSoft,
            transform: `translate(${p3X}px, ${p3Y}px)`,
            opacity: p3Op,
            filter: 'blur(1px)',
          }}
        >
          ない
        </div>
      )}

      {/* Luminous Master Center Glyph */}
      <div
        style={{
          fontSize: size,
          color: C.gold,
          transform: `scale(${masterScale})`,
          opacity: progress,
          textShadow: `0 0 ${masterGlow}px rgba(240,190,82,0.85), 0 0 ${masterGlow * 1.5}px rgba(240,190,82,0.4), 0 10px 40px rgba(0,0,0,0.9)`,
          letterSpacing: 4,
          zIndex: 10,
        }}
      >
        ない
      </div>
    </div>
  );
};
