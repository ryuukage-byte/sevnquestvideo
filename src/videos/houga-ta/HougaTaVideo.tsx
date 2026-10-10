import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {BlockFade} from '../houga-ii/kit';
import {World1_Hook} from './scenes/World1_Hook';
import {World2_Concept} from './scenes/World2_Concept';
import {World3_Second} from './scenes/World3_Second';
import {World4_Core} from './scenes/World4_Core';
import {World5_Conj} from './scenes/World5_Conj';
import {World6_Product} from './scenes/World6_Product';
import {WORLDS, sec} from './timing';

export type HougaTaVideoProps = {
  sfx: boolean;
};

const COMPONENTS: React.FC<{sfx?: boolean}>[] = [
  World1_Hook,
  World2_Concept,
  World3_Second,
  World4_Core,
  World5_Conj,
  World6_Product,
];

// Vた + ほうがいい — 27 scene storyboard dalam 6 dunia visual. Tanpa voiceover (ditambahkan terpisah).
export const HougaTaVideo: React.FC<HougaTaVideoProps> = ({sfx = true}) => {
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
