import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {Scene01_EasyStart} from './scenes/Scene01_EasyStart';
import {Scene02_Quiz} from './scenes/Scene02_Quiz';
import {Scene03_Confusion} from './scenes/Scene03_Confusion';
import {Scene04_TaVsShoku} from './scenes/Scene04_TaVsShoku';
import {Scene05_WhyCanChange} from './scenes/Scene05_WhyCanChange';
import {Scene06_KunyomiOnyomi} from './scenes/Scene06_KunyomiOnyomi';
import {Scene07_ApplyToShoku} from './scenes/Scene07_ApplyToShoku';
import {Scene08_WrongMemorization} from './scenes/Scene08_WrongMemorization';
import {Scene09_VocabularyTrap} from './scenes/Scene09_VocabularyTrap';
import {Scene10_BetterLearningModel} from './scenes/Scene10_BetterLearningModel';
import {Scene11_ExampleCards} from './scenes/Scene11_ExampleCards';
import {Scene12_ChangeTheQuestion} from './scenes/Scene12_ChangeTheQuestion';
import {Scene13_SevnQuestSystem} from './scenes/Scene13_SevnQuestSystem';
import {Scene14_CallbackResolution} from './scenes/Scene14_CallbackResolution';
import {Scene15_CTA} from './scenes/Scene15_CTA';
import {ShokuCaption} from './ShokuCaption';
import {SCENES} from './timing';

export type ShokuVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
};

const SCENE_COMPONENTS: React.FC<{
  dur: number;
  sfx?: boolean;
  globalFrame: number;
}>[] = [
  Scene01_EasyStart,
  Scene02_Quiz,
  Scene03_Confusion,
  Scene04_TaVsShoku,
  Scene05_WhyCanChange,
  Scene06_KunyomiOnyomi,
  Scene07_ApplyToShoku,
  Scene08_WrongMemorization,
  Scene09_VocabularyTrap,
  Scene10_BetterLearningModel,
  Scene11_ExampleCards,
  Scene12_ChangeTheQuestion,
  Scene13_SevnQuestSystem,
  Scene14_CallbackResolution,
  Scene15_CTA,
];

export const ShokuVideo: React.FC<ShokuVideoProps> = ({
  sfx = true,
  captions = true,
  voiceover = true,
}) => {
  ensureFonts();
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: '#12151d'}}>
      {/* Voiceover Track */}
      {voiceover && <Audio src={staticFile('audio/voice/shoku.wav')} volume={1} />}

      {/* Persistent Washi Scroll & Sashiko Backdrop */}
      <Background />

      {/* 15 Storyboard Scenes */}
      {SCENES.map((scene, i) => {
        const Comp = SCENE_COMPONENTS[i];
        if (!Comp) return null;

        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.dur}
            name={`${scene.name} (${scene.startSec}s - ${scene.endSec}s)`}
          >
            <Comp dur={scene.dur} sfx={sfx} globalFrame={f} />
          </Sequence>
        );
      })}

      {/* Synchronized Educational Captions */}
      <ShokuCaption enabled={captions} />
    </AbsoluteFill>
  );
};
