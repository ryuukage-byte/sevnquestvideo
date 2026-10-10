import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

export type SfxName =
  | 'click' | 'tick' | 'pop' | 'ding' | 'error' | 'rewind' | 'whoosh' | 'swipe' | 'stroke'
  | 'impact' | 'thud' | 'rise' | 'descend' | 'chime' | 'sparkle' | 'buzz'
  | 'impact-soft' | 'error-soft' | 'tap' | 'whoosh-soft' | 'spring' | 'success';

export const Sfx: React.FC<{name: SfxName; at: number; volume?: number; enabled?: boolean}> = ({
  name,
  at,
  volume,
  enabled = true,
}) => {
  if (!enabled) return null;

  let file = name as string;
  let defaultVol = 0.7;

  if (name === 'impact-soft') {
    file = 'impact';
    defaultVol = 0.35;
  } else if (name === 'error-soft') {
    file = 'error';
    defaultVol = 0.35;
  } else if (name === 'whoosh-soft') {
    file = 'whoosh';
    defaultVol = 0.35;
  } else if (name === 'tap') {
    file = 'tick';
    defaultVol = 0.6;
  } else if (name === 'spring') {
    file = 'swipe';
    defaultVol = 0.5;
  } else if (name === 'success') {
    file = 'chime';
    defaultVol = 0.75;
  }

  const finalVolume = volume ?? defaultVol;

  return (
    <Sequence from={at} layout="none">
      <Audio src={staticFile(`audio/sfx/${file}.wav`)} volume={finalVolume} />
    </Sequence>
  );
};

