import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, MaskText, SceneShell, Sfx, SPRING, pop} from '../../../shared';
import type {SceneProps} from './types';

// Contoh scene. useCurrentFrame() di dalam <Sequence> = frame LOKAL scene (mulai dari 0).
// Konversi detik → frame: Math.round(detik * fps) atau helper sec() dari ../timing.
export const Scene01_Hook: React.FC<SceneProps> = ({dur, sfx, captions, caption}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tag = pop(f, fps, 18, SPRING);

  return (
    <SceneShell dur={dur} captions={captions} caption={caption}>
      {sfx && <Sfx name="whoosh" at={4} volume={0.4} />}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 70px'}}>
        <MaskText text="Judul hook di sini." start={6} size={104} />
        <div
          style={{
            marginTop: 40,
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 34,
            letterSpacing: 3,
            color: C.gold,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 24}px)`,
          }}
        >
          SEVNQUEST · TEMPLATE
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
