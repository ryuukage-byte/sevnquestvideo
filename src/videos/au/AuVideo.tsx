import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {Scene01_IntroHiragana} from './scenes/Scene01_IntroHiragana';
import {Scene02_KanjiMorph} from './scenes/Scene02_KanjiMorph';
import {Scene03_HeroAuMeet} from './scenes/Scene03_HeroAuMeet';
import {Scene04_ExampleTomodachi} from './scenes/Scene04_ExampleTomodachi';
import {Scene05_FocusShiftMatch} from './scenes/Scene05_FocusShiftMatch';
import {Scene06_KeywordsAndSnap} from './scenes/Scene06_KeywordsAndSnap';
import {Scene07_ExamplesAu} from './scenes/Scene07_ExamplesAu';
import {Scene08_SideBySideSummary} from './scenes/Scene08_SideBySideSummary';
import {Scene09_ReflectiveLife} from './scenes/Scene09_ReflectiveLife';
import {Scene10_SevnQuestOutro} from './scenes/Scene10_SevnQuestOutro';
import {SCENES} from './timing';

export type AuVideoProps = {
  sfx: boolean;
  captions: boolean;
};

const COMPONENTS: React.FC<{dur: number; sfx?: boolean}>[] = [
  Scene01_IntroHiragana,
  Scene02_KanjiMorph,
  Scene03_HeroAuMeet,
  Scene04_ExampleTomodachi,
  Scene05_FocusShiftMatch,
  Scene06_KeywordsAndSnap,
  Scene07_ExamplesAu,
  Scene08_SideBySideSummary,
  Scene09_ReflectiveLife,
  Scene10_SevnQuestOutro,
];

export const AuVideo: React.FC<AuVideoProps> = ({sfx = true, captions = true}) => {
  ensureFonts();
  const f = useCurrentFrame();

  // Dim background and soften sashiko grid during Scene 09 (Reflective Life 1630-2014)
  const reflectiveDim = interpolate(f, [1630, 1665, 1980, 2014], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: '#12151d'}}>
      <Background reflectiveDim={reflectiveDim} />
      {SCENES.map((s, i) => {
        const Comp = COMPONENTS[i];
        return (
          <Sequence
            key={s.id}
            from={s.from}
            durationInFrames={s.dur}
            name={`${String(i + 1).padStart(2, '0')} · ${s.name}`}
          >
            <Comp dur={s.dur} sfx={sfx} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
