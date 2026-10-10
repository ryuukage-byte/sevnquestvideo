import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {BlockFade} from './kit';
import {World1_Quiz} from './scenes/World1_Quiz';
import {World2_PatternBreak} from './scenes/World2_PatternBreak';
import {World3_Activity} from './scenes/World3_Activity';
import {World4_Shiru} from './scenes/World4_Shiru';
import {World5_Tanaka} from './scenes/World5_Tanaka';
import {World6_Kekkon} from './scenes/World6_Kekkon';
import {World7_TwoFunctions} from './scenes/World7_TwoFunctions';
import {World8_ProductCta} from './scenes/World8_ProductCta';
import {WORLDS, sec} from './timing';

export type TeiruVideoProps = {
  sfx?: boolean;
};

const COMPONENTS: React.FC<{sfx?: boolean}>[] = [
  World1_Quiz,
  World2_PatternBreak,
  World3_Activity,
  World4_Shiru,
  World5_Tanaka,
  World6_Kekkon,
  World7_TwoFunctions,
  World8_ProductCta,
];

// Topic: ている tidak selalu berarti "sedang"
// 02:59.64 (179.64s = 5389 frame) dalam 8 dunia visual berkelanjutan.
// Tanpa voiceover audio (akan ditambahkan terpisah), menggunakan sound design halus (SFX).
export const TeiruVideo: React.FC<TeiruVideoProps> = ({sfx = true}) => {
  ensureFonts();
  return (
    <AbsoluteFill style={{background: '#12151d'}}>
      <Background />
      {WORLDS.map((w, i) => {
        const Comp = COMPONENTS[i];
        const from = sec(w.start);
        const dur = sec(w.end) - from;
        const last = i === WORLDS.length - 1;
        return (
          <Sequence key={w.id} from={from} durationInFrames={dur} name={w.name}>
            <BlockFade dur={dur} inF={i === 0 ? 0 : 6} outF={last ? 15 : 6}>
              <Comp sfx={sfx} />
            </BlockFade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
