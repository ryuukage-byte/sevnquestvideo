import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background, C, Sfx, ensureFonts} from '../../shared';
import {PatternHero} from './Hero';
import {Stage} from './Stage';
import {FrameCtx, VoCaption} from './kit';
import {Act1_Hook, Act2_Give, Act3_Kureru, Act4_Morau, Act5_Summary, Act6_Cta} from './scenes';
import {ACTS, HERO_RANGE, SFX_CUES, STAGE_RANGE, T, TOTAL_FRAMES} from './timing';

export type AgeruKureruMorauVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
  music?: boolean;
};

// Urutan sama dengan ACTS di timing.ts.
const ACT_COMPONENTS: React.FC[] = [Act1_Hook, Act2_Give, Act3_Kureru, Act4_Morau, Act5_Summary, Act6_Cta];

// あげる・くれる・もらう — 33 kalimat naskah (01:39.560 = 2987 frame) dalam 6 babak yang saling menyambung.
// Babak & kata-hero membaca frame absolut (FrameCtx), jadi <Sequence> di sini hanya mengatur kapan
// sebuah babak di-mount dan memberi nama di timeline Studio.
export const AgeruKureruMorauVideo: React.FC<AgeruKureruMorauVideoProps> = ({
  sfx = true,
  captions = true,
  voiceover = true,
  music = false,
}) => {
  ensureFonts();
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: C.bg}}>
      {voiceover && <Audio src={staticFile('audio/voice/ageru-kureru-morau.wav')} />}
      {music && <Audio src={staticFile('audio/music/ambient-lofi.wav')} volume={(fr) => 0.1 * Math.min(1, fr / 20, (TOTAL_FRAMES - fr) / 30)} />}
      {sfx && SFX_CUES.map((c, i) => <Sfx key={i} name={c.name} at={T(c.at)} volume={c.vol} />)}

      <Background />

      <FrameCtx.Provider value={f}>
        <Sequence
          from={T(HERO_RANGE[0])}
          durationInFrames={T(HERO_RANGE[1]) - T(HERO_RANGE[0])}
          name="Kata-hero あげる・くれる・もらう (persisten S03–S26)"
          layout="none"
        >
          <PatternHero />
        </Sequence>
        <Sequence
          from={T(STAGE_RANGE[0])}
          durationInFrames={T(STAGE_RANGE[1]) - T(STAGE_RANGE[0])}
          name="Panggung: 私 · 友達 · buku (S04–S26)"
          layout="none"
        >
          <Stage />
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
