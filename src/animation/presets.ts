import {interpolate, Easing} from 'remotion';

export const EASINGS = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  inOutCubic: Easing.bezier(0.65, 0, 0.35, 1),
  outBack: Easing.bezier(0.34, 1.56, 0.64, 1),
  inQuad: Easing.bezier(0.55, 0.085, 0.68, 0.53),
};

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const animateProg = (
  frame: number,
  start: number,
  duration: number,
  easing = EASINGS.outExpo,
) => {
  if (duration <= 0) return frame >= start ? 1 : 0;
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
};
