import {animateProg, EASINGS} from './presets';

export const fadeTransition = (
  frame: number,
  durationInFrames: number,
  inFrames = 12,
  outFrames = 12,
) => {
  const fadeIn = inFrames > 0 ? animateProg(frame, 0, inFrames, EASINGS.outExpo) : 1;
  const fadeOut =
    outFrames > 0
      ? 1 - animateProg(frame, durationInFrames - outFrames, outFrames, EASINGS.outExpo)
      : 1;
  return Math.min(fadeIn, fadeOut);
};
