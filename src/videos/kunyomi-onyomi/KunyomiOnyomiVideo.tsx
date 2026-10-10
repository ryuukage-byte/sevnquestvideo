import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {KunyomiOnyomiCaption} from './KunyomiOnyomiCaption';
import {
  Scene01_Hook,
  Scene02_Pattern,
  Scene03_Okurigana,
  Scene04_KunyomiExamples,
  Scene05_OnyomiPattern,
  Scene06_Exceptions,
  Scene07_CoreTakeaway,
  Scene08_BetterStrategy,
  Scene09_SevnQuestUI,
  Scene10_CTA,
} from './scenes';
import {SCENES} from './timing';

export type KunyomiOnyomiVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
};

const SCENE_COMPONENTS: React.FC<{
  dur: number;
  sfx?: boolean;
  globalFrame: number;
}>[] = [
  Scene01_Hook,
  Scene02_Pattern,
  Scene03_Okurigana,
  Scene04_KunyomiExamples,
  Scene05_OnyomiPattern,
  Scene06_Exceptions,
  Scene07_CoreTakeaway,
  Scene08_BetterStrategy,
  Scene09_SevnQuestUI,
  Scene10_CTA,
];

export const KunyomiOnyomiVideo: React.FC<KunyomiOnyomiVideoProps> = ({
  sfx = true,
  captions = true,
  voiceover = true,
}) => {
  ensureFonts();
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: '#12151d'}}>
      {/* Voice-over Audio Track (Source of Truth) */}
      {voiceover && <Audio src={staticFile('audio/voice/kunyomi-onyomi.wav')} volume={1} />}

      {/* Persistent SevnQuest Washi Scroll & Sashiko Backdrop */}
      <Background />

      {/* 10 Storyboard Scenes */}
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
      <KunyomiOnyomiCaption enabled={captions} />
    </AbsoluteFill>
  );
};
