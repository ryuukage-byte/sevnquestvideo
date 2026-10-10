import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {sceneOpacity} from '../anim';
import {Caption} from './Caption';

export type SceneProps = {dur: number; captions: boolean; sfx: boolean};

export const SceneShell: React.FC<{
  dur: number;
  captions: boolean;
  caption: string;
  inF?: number;
  outF?: number;
  holdCaption?: boolean;
  children: React.ReactNode;
}> = ({dur, captions, caption, inF = 7, outF = 7, holdCaption, children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: sceneOpacity(f, dur, inF, outF)}}>{children}</AbsoluteFill>
      <Caption text={caption} dur={dur} enabled={captions} hold={holdCaption} />
    </AbsoluteFill>
  );
};
