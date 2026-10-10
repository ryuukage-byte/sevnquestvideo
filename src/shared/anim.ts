import {Easing, interpolate, spring} from 'remotion';

export const EASE = Easing.bezier(0.22, 1, 0.36, 1); // keluar halus
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 0.9, 0.45);

export const prog = (
  f: number,
  start: number,
  dur: number,
  easing: (t: number) => number = EASE,
) =>
  interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

// "UI entry: spring 0.8–1.0" — damping tinggi, sedikit overshoot.
export const SPRING = {damping: 17, stiffness: 140, mass: 0.85};
export const SOFT = {damping: 22, stiffness: 90, mass: 1};
export const BOUNCY = {damping: 9, stiffness: 180, mass: 0.7};

export const pop = (
  f: number,
  fps: number,
  delay = 0,
  config: {damping: number; stiffness: number; mass: number} = SPRING,
) => (f < delay ? 0 : spring({frame: f - delay, fps, config}));

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

// fade in/out pembungkus scene
export const sceneOpacity = (f: number, dur: number, inF = 7, outF = 7) =>
  Math.min(prog(f, 0, inF, (t) => t), 1 - prog(f, dur - outF, outF, (t) => t));
