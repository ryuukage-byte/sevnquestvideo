import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background, C, Sfx, ensureFonts} from '../../shared';
import {PatternHero} from './PatternHero';
import {FrameCtx, VoCaption} from './kit';
import {Act1_Hook, Act2_Pattern, Act3_Meaning, Act4_Examples, Act5_Context, Act6_Cta} from './scenes';
import {ACTS, HERO_RANGE, SFX_CUES, T, TOTAL_FRAMES} from './timing';

export type TeShimauVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
  music?: boolean;
};

// Urutan sama dengan ACTS di timing.ts.
const ACT_COMPONENTS: React.FC[] = [Act1_Hook, Act2_Pattern, Act3_Meaning, Act4_Examples, Act5_Context, Act6_Cta];

// ～てしまう — 22 scene storyboard (01:06.760 = 2003 frame) dalam 6 babak yang saling menyambung.
// Babak & pola utama membaca frame absolut (FrameCtx), jadi <Sequence> di sini hanya mengatur kapan
// sebuah babak di-mount dan memberi nama di timeline Studio.
export const TeShimauVideo: React.FC<TeShimauVideoProps> = ({
  sfx = true,
  captions = true,
  voiceover = true,
  music = false,
}) => {
  ensureFonts();
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: C.bg}}>
      {voiceover && <Audio src={staticFile('audio/voice/te-shimau.wav')} />}
      {music && (
        <Audio
          src={staticFile('audio/music/ambient-lofi.wav')}
          volume={(fr) => 0.1 * Math.min(1, fr / 20, (TOTAL_FRAMES - fr) / 30)}
        />
      )}
      {sfx && SFX_CUES.map((c, i) => <Sfx key={i} name={c.name} at={T(c.at)} volume={c.vol} />)}

      <Background />

      <FrameCtx.Provider value={f}>
        <Sequence from={T(HERO_RANGE[0])} durationInFrames={T(HERO_RANGE[1]) - T(HERO_RANGE[0])} name="Pola ～てしまう (persisten S03–S20)" layout="none">
          <PatternHero />
        </Sequence>
        {ACTS.map((act, i) => {
          const Comp = ACT_COMPONENTS[i];
          const from = T(act.from);
          return (
            <Sequence key={act.id} from={from} durationInFrames={Math.min(TOTAL_FRAMES, T(act.to)) - from} name={act.name} layout="none">
              <Comp />
            </Sequence>
          );
        })}
        {captions && <VoCaption f={f} />}
      </FrameCtx.Provider>
    </AbsoluteFill>
  );
};
