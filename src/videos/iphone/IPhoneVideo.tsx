import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {Scene01_ResultFirst} from './scenes/Scene01_ResultFirst';
import {Scene02_OpenSafari} from './scenes/Scene02_OpenSafari';
import {Scene03_EnterWebsite} from './scenes/Scene03_EnterWebsite';
import {Scene04_LinkBio} from './scenes/Scene04_LinkBio';
import {Scene05_PullLanyard} from './scenes/Scene05_PullLanyard';
import {Scene06_SelectLearn} from './scenes/Scene06_SelectLearn';
import {Scene07_OpenSafariShare} from './scenes/Scene07_OpenSafariShare';
import {Scene08_AddToHomeScreen} from './scenes/Scene08_AddToHomeScreen';
import {Scene09_CheckAppName} from './scenes/Scene09_CheckAppName';
import {Scene10_TapAdd} from './scenes/Scene10_TapAdd';
import {Scene11_HomeScreenInstalled} from './scenes/Scene11_HomeScreenInstalled';
import {Scene12_NoMoreSearching} from './scenes/Scene12_NoMoreSearching';
import {Scene13_TapAndLearn} from './scenes/Scene13_TapAndLearn';
import {Scene14_FinalCTA} from './scenes/Scene14_FinalCTA';
import {IPhoneCaption} from './IPhoneCaption';
import {SCENES} from './timing';

export type IPhoneVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
};

const SCENE_COMPONENTS: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame?: number;
}>[] = [
  Scene01_ResultFirst,
  Scene02_OpenSafari,
  Scene03_EnterWebsite,
  Scene04_LinkBio,
  Scene05_PullLanyard,
  Scene06_SelectLearn,
  Scene07_OpenSafariShare,
  Scene08_AddToHomeScreen,
  Scene09_CheckAppName,
  Scene10_TapAdd,
  Scene11_HomeScreenInstalled,
  Scene12_NoMoreSearching,
  Scene13_TapAndLearn,
  Scene14_FinalCTA,
];

export const IPhoneVideo: React.FC<IPhoneVideoProps> = ({
  sfx = true,
  captions = true,
  voiceover = true,
}) => {
  ensureFonts();
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: '#12151d'}}>
      {/* Voiceover Track */}
      {voiceover && <Audio src={staticFile('audio/voice/iphone.wav')} volume={1} />}

      {/* Persistent Washi Scroll & Sashiko Backdrop */}
      <Background />

      {/* 14 Storyboard Scenes */}
      {SCENES.map((scene, i) => {
        const Comp = SCENE_COMPONENTS[i];
        if (!Comp) return null;

        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.dur}
            layout="none"
          >
            <Comp
              dur={scene.dur}
              sfx={sfx}
              globalFrame={f}
            />
          </Sequence>
        );
      })}

      {/* Synchronized Captions */}
      {captions && <IPhoneCaption />}
    </AbsoluteFill>
  );
};
