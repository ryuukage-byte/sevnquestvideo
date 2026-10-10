import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  ArrowRight,
  BOUNCY,
  C,
  FONT,
  LogoMark,
  PhysicalButton,
  SceneShell,
  Sfx,
  SOFT,
  Wordmark,
  pop,
  prog,
} from '../../../shared';
import type {SceneProps} from './types';

// CTA standar: logo asli + wordmark + tombol emas + URL.
export const Scene02_Cta: React.FC<SceneProps> = ({dur, sfx, captions, caption}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logo = pop(f, fps, 6, SOFT);
  const btn = pop(f, fps, 30, BOUNCY);
  const url = prog(f, 44, 12);

  return (
    <SceneShell dur={dur} captions={captions} caption={caption} outF={0}>
      {sfx && <Sfx name="chime" at={30} volume={0.5} />}
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 330,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 34,
            opacity: logo,
            transform: `translateY(${(1 - logo) * 40}px)`,
          }}
        >
          <LogoMark size={240} glow={0.3} />
          <Wordmark size={110} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: 1000,
            opacity: btn > 0 ? 1 : 0,
            transform: `scale(${0.8 + 0.2 * btn})`,
          }}
        >
          <PhysicalButton
            tone="gold"
            w={840}
            h={150}
            fontSize={50}
            label={
              <>
                LATIHAN SEKARANG <ArrowRight size={58} stroke={3.4} />
              </>
            }
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 1210,
            textAlign: 'center',
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: 2,
            color: C.textSecondary,
            opacity: url,
          }}
        >
          sevnquest.sevnsoul.site
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
