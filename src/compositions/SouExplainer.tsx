import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {ensureFonts} from '../shared/fonts';
import {Sfx} from '../shared/components/Sfx';
import {TOKENS} from '../styles/tokens';
import {Act01_Confusion} from '../scenes/Act01_Confusion/Act01_Confusion';
import {Act02_MeaningPointer} from '../scenes/Act02_MeaningPointer/Act02_MeaningPointer';
import {Act03_LooksDelicious} from '../scenes/Act03_LooksDelicious/Act03_LooksDelicious';
import {Act04_WeatherComparison} from '../scenes/Act04_WeatherComparison/Act04_WeatherComparison';
import {Act05_GrammarReveal} from '../scenes/Act05_GrammarReveal/Act05_GrammarReveal';
import {Act06_Recap} from '../scenes/Act06_Recap/Act06_Recap';
import {Act07_Conclusion} from '../scenes/Act07_Conclusion/Act07_Conclusion';

export interface SouExplainerProps {
  voiceover?: boolean;
  music?: boolean;
  sfx?: boolean;
}

// SFX cues according to storyboard sound design (subtle SFX only, no loud audio)
const SFX_CUES = [
  { atFrame: 0, name: 'impact' as const, vol: 0.45 },     // 00:00 Initial subtle impact
  { atFrame: 184, name: 'pop' as const, vol: 0.4 },       // 00:03 Tonal pops
  { atFrame: 194, name: 'pop' as const, vol: 0.4 },
  { atFrame: 204, name: 'pop' as const, vol: 0.4 },
  { atFrame: 549, name: 'chime' as const, vol: 0.45 },    // 00:09 Core reveal
  { atFrame: 899, name: 'whoosh' as const, vol: 0.4 },    // 00:15 World 2 enter
  { atFrame: 1643, name: 'pop' as const, vol: 0.4 },      // 00:27 Notification pop
  { atFrame: 2581, name: 'tick' as const, vol: 0.4 },     // 00:43 Typographic tick
  { atFrame: 3110, name: 'sparkle' as const, vol: 0.4 },  // 00:52 Soft shimmer
  { atFrame: 3898, name: 'whoosh' as const, vol: 0.4 },   // 01:05 World 3 enter
  { atFrame: 4076, name: 'sparkle' as const, vol: 0.45 }, // 01:08 Steam sparkle
  { atFrame: 6193, name: 'whoosh' as const, vol: 0.4 },   // 01:43 World 4 enter
  { atFrame: 6995, name: 'click' as const, vol: 0.4 },    // 01:56 Split click
  { atFrame: 8784, name: 'whoosh' as const, vol: 0.4 },   // 02:26 Grammar reveal enter
  { atFrame: 9045, name: 'click' as const, vol: 0.45 },   // 02:30 Difference detect
  { atFrame: 10216, name: 'whoosh' as const, vol: 0.4 },  // 02:50 World 5 recap enter
  { atFrame: 10372, name: 'pop' as const, vol: 0.4 },     // 02:53 Card pops
  { atFrame: 10450, name: 'pop' as const, vol: 0.4 },
  { atFrame: 10530, name: 'pop' as const, vol: 0.4 },
  { atFrame: 10600, name: 'pop' as const, vol: 0.4 },
  { atFrame: 11273, name: 'chime' as const, vol: 0.45 },  // 03:08 Convergence resolve
  { atFrame: 11687, name: 'whoosh' as const, vol: 0.4 },  // 03:15 World 6 enter
  { atFrame: 13195, name: 'chime' as const, vol: 0.45 },  // 03:40 Soft chime outro
];

export const SouExplainer: React.FC<SouExplainerProps> = ({
  voiceover = false,
  music = false,
  sfx = true,
}) => {
  ensureFonts();

  return (
    <AbsoluteFill style={{backgroundColor: TOKENS.colors.bg}}>
      {/* 1. Canvas Base Gradient Background */}
      <AbsoluteFill
        style={{
          background: TOKENS.colors.bgGradient,
          zIndex: 0,
        }}
      />

      {/* 2. Main External Voiceover (Timing Authority) */}
      {voiceover && (
        <Audio
          src={staticFile('audio/narration.wav')}
          volume={1.0}
        />
      )}

      {/* 3. Japanese Lo-fi Ambient BGM with Automatic Ducking */}
      {music && (
        <Audio
          src={staticFile('audio/music/ambient-lofi.wav')}
          volume={(f) => {
            if (f > 13200) {
              return Math.max(0, 0.25 * (1 - (f - 13200) / 149));
            }
            if (f >= 10216 && f < 11687) {
              return 0.22;
            }
            return 0.16;
          }}
        />
      )}

      {/* 4. Synchronized Sound Effects */}
      {sfx &&
        SFX_CUES.map((cue, i) => (
          <Sfx
            key={i}
            name={cue.name}
            at={cue.atFrame}
            volume={cue.vol}
          />
        ))}

      {/* 5. Seven Storyboard Acts in Exact Frame Boundaries */}
      <Sequence from={0} durationInFrames={899} style={{zIndex: 10}} name="Act 01 · The Confusion">
        <Act01_Confusion />
      </Sequence>

      <Sequence from={899} durationInFrames={2999} style={{zIndex: 10}} name="Act 02 · The Meaning Pointer">
        <Act02_MeaningPointer />
      </Sequence>

      <Sequence from={3898} durationInFrames={2295} style={{zIndex: 10}} name="Act 03 · Looks Delicious">
        <Act03_LooksDelicious />
      </Sequence>

      <Sequence from={6193} durationInFrames={2591} style={{zIndex: 10}} name="Act 04 · Weather & Comparison">
        <Act04_WeatherComparison />
      </Sequence>

      <Sequence from={8784} durationInFrames={1432} style={{zIndex: 10}} name="Act 05 · The Big Grammar Reveal">
        <Act05_GrammarReveal />
      </Sequence>

      <Sequence from={10216} durationInFrames={1471} style={{zIndex: 10}} name="Act 06 · The Complete Recap">
        <Act06_Recap />
      </Sequence>

      <Sequence from={11687} durationInFrames={1662} style={{zIndex: 10}} name="Act 07 · Think in Context">
        <Act07_Conclusion />
      </Sequence>
    </AbsoluteFill>
  );
};
