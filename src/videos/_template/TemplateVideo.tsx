import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Background, C, ensureFonts} from '../../shared';
import {Scene01_Hook, Scene02_Cta} from './scenes';
import type {SceneProps} from './scenes/types';
import {CAPTIONS, SCENES} from './timing';

export type TemplateVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
};

// Satu komponen per scene, urutan sama dengan NAMES di timing.ts.
const SCENE_COMPONENTS: React.FC<SceneProps>[] = [Scene01_Hook, Scene02_Cta];

export const TemplateVideo: React.FC<TemplateVideoProps> = ({
  sfx = true,
  captions = true,
  voiceover = false, // aktifkan setelah file VO ada di public/audio/voice/__SLUG__.wav
}) => {
  ensureFonts();

  return (
    <AbsoluteFill style={{background: C.bg}}>
      {voiceover && <Audio src={staticFile('audio/voice/__SLUG__.wav')} />}
      <Background />

      {SCENES.map((scene, i) => {
        const Comp = SCENE_COMPONENTS[i];
        if (!Comp) return null;
        return (
          <Sequence key={scene.id} from={scene.from} durationInFrames={scene.dur} name={scene.name}>
            <Comp dur={scene.dur} sfx={sfx} captions={captions} caption={CAPTIONS[i] ?? ''} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
