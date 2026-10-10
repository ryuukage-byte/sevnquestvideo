import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {Act1_Compare} from './scenes/Act1_Compare';
import {Scene16_RuForm, Scene17_TaForm} from './scenes/FormExplain';
import {Scene12_15_Split} from './scenes/Scene12_15_Split';
import {Scene18_Recap, Scene19_Cta} from './scenes/Scene18_19';
import {Scene09_Confused, Scene10_WhichOne, Scene11_Situation} from './scenes/Scenes_09_11';
import {BlockFade} from './kit';
import {BLOCKS, sec} from './timing';

export type HougaIiVideoProps = {
  sfx: boolean;
};

const COMPONENTS: React.FC<{sfx?: boolean}>[] = [
  Act1_Compare,
  Scene09_Confused,
  Scene10_WhichOne,
  Scene11_Situation,
  Scene12_15_Split,
  Scene16_RuForm,
  Scene17_TaForm,
  Scene18_Recap,
  Scene19_Cta,
];

// 〜ほうがいい — RU vs TA. Satu komposisi, tanpa voiceover (ditambahkan terpisah).
export const HougaIiVideo: React.FC<HougaIiVideoProps> = ({sfx = true}) => {
  ensureFonts();
  return (
    <AbsoluteFill style={{background: '#12151d'}}>
      <Background />
      {BLOCKS.map((b, i) => {
        const Comp = COMPONENTS[i];
        const from = sec(b.start);
        const dur = sec(b.end) - from;
        const last = i === BLOCKS.length - 1;
        return (
          <Sequence key={b.id} from={from} durationInFrames={dur} name={b.name}>
            <BlockFade dur={dur} inF={i === 0 ? 0 : 6} outF={last ? 15 : 6}>
              <Comp sfx={sfx} />
            </BlockFade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
