import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background, C, Sfx, ensureFonts} from '../../shared';
import {PatternHero} from './PatternHero';
import {FrameCtx, VoCaption} from './kit';
import {Act1_Intro, Act2_Persiapan, Act3_Biarkan, Act4_Singkat, Act5_Cta} from './scenes';
import {Stage} from './stage';
import {ACTS, HERO_RANGE, SFX_CUES, T, TOTAL_FRAMES} from './timing';

export type TeOkuVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
  music?: boolean;
};

// Urutan sama dengan ACTS di timing.ts.
const ACT_COMPONENTS: React.FC[] = [Act1_Intro, Act2_Persiapan, Act3_Biarkan, Act4_Singkat, Act5_Cta];

// ～ておく — 30 scene storyboard (01:48.080 = 3243 frame). Kalender, kotak, lembar, dan pola utama
// adalah lapisan persisten; babak hanya menambah overlay. <Sequence> mengatur kapan babak di-mount.
export const TeOkuVideo: React.FC<TeOkuVideoProps> = ({sfx = true, captions = true, voiceover = true, music = false}) => {
  ensureFonts();
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: C.bg}}>
      {voiceover && <Audio src={staticFile('audio/voice/te-oku.wav')} />}
      {music && <Audio src={staticFile('audio/music/ambient-lofi.wav')} volume={(fr) => 0.1 * Math.min(1, fr / 20, (TOTAL_FRAMES - fr) / 30)} />}
      {sfx && SFX_CUES.map((c, i) => <Sfx key={i} name={c.name} at={T(c.at)} volume={c.vol} />)}

      <Background />

      <FrameCtx.Provider value={f}>
        <Stage />
        <Sequence from={T(HERO_RANGE[0])} durationInFrames={T(HERO_RANGE[1]) - T(HERO_RANGE[0])} name="Pola ～ておく (persisten S01–S29)" layout="none">
          <PatternHero />
        </Sequence>
        {ACTS.map((act, i) => {
          const Comp = ACT_COMPONENTS[i];
          const from = T(act.from);
          return (
            <Sequence key={act.id} from={from} durationInFrames={Math.min(TOTAL_FRAMES, T(act.to)) - from} name={act.name} layout="none">
              {/* lapisan overlay di atas kalender, kotak, dan lembar (z 20–22) */}
              <AbsoluteFill style={{zIndex: 40}}>
                <Comp />
              </AbsoluteFill>
            </Sequence>
          );
        })}
        {captions && <VoCaption f={f} />}
      </FrameCtx.Provider>
    </AbsoluteFill>
  );
};
