import {spring} from 'remotion';

export const springPop = (
  frame: number,
  fps = 30,
  delay = 0,
  config = {damping: 12, stiffness: 150, mass: 0.8},
) => (frame < delay ? 0 : spring({frame: frame - delay, fps, config}));
