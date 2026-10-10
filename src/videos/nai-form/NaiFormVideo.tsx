import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background, C, Caption, Sfx, ensureFonts} from '../../shared';
import {
  HookScene,
  MeaningScene,
  GroupOneScene,
  GroupTwoScene,
  GroupThreeScene,
  RecapScene,
  ProductScene,
  CtaScene,
} from './scenes';
import {SEQUENCES, SFX_CUES_NAI, VO_TIMESTAMPS} from './timing';

export interface NaiFormVideoProps {
  voiceover?: boolean;
  music?: boolean;
  sfx?: boolean;
  captions?: boolean;
}

const SCENE_COMPONENTS: React.FC[] = [
  HookScene,
  MeaningScene,
  GroupOneScene,
  GroupTwoScene,
  GroupThreeScene,
  RecapScene,
  ProductScene,
  CtaScene,
];

export const NaiFormVideo: React.FC<NaiFormVideoProps> = ({
  voiceover = true,
  music = true,
  sfx = true,
  captions = true,
}) => {
  ensureFonts();
  const currentFrame = useCurrentFrame();

  // Active subtitle for current frame
  const activeVoLine = VO_TIMESTAMPS.find(
    (line) => currentFrame >= line.startFrame && currentFrame < line.endFrame,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg
      }}
      from={436}
    >
      {/* 1. Master Living Washi Canvas Background */}
      <Background />

      {/* 2. Japanese Lo-fi Ambient Music with Automatic Ducking */}
      {music && (
        <Audio
          src={staticFile('audio/music/ambient-lofi.wav')}
          loop
          volume={(f) => {
            // Subtle ducking during intense explanation, gentle fadeout at tail
            if (f > 6450) {
              return Math.max(0, 0.28 * (1 - (f - 6450) / 203));
            }
            if (f >= 1985 && f < 4304) {
              return 0.16; // Ducking during mechanical rules
            }
            return 0.22;
          }}
        />
      )}

      {/* 3. Voiceover Track (if provided) */}
      {voiceover && (
        <Audio
          src={staticFile('audio/voice/nai.wav')}
          volume={1.0}
        />
      )}

      {/* 4. Synchronized Sound Effects */}
      {sfx &&
        SFX_CUES_NAI.map((cue, i) => (
          <Sfx
            key={i}
            name={cue.name}
            at={cue.atFrame}
            volume={cue.vol}
          />
        ))}

      {/* 5. The Eight Sequential Storyboard Sequences */}
      {SEQUENCES.map((seq, idx) => {
        const SceneComp = SCENE_COMPONENTS[idx];
        if (!SceneComp) return null;

        return (
          <Sequence
            key={seq.id}
            from={seq.fromFrame}
            durationInFrames={seq.durationFrames}
            name={`Seq ${seq.num} · ${seq.title}`}
            style={{zIndex: 10}}
          >
            <SceneComp />
          </Sequence>
        );
      })}

      {/* 6. Frame-Accurate Captions Track in Safe Zone */}
      {captions && activeVoLine && (
        <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50}}>
          <Caption
            text={activeVoLine.text}
            dur={activeVoLine.durFrames}
            enabled={true}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
