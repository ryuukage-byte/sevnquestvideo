import {interpolate} from 'remotion';
import {EASE} from '../../shared/anim';

export const FPS = 30;

// Exact scene cut points from storyboard (in seconds)
export const T = [
  0.00,
  4.14,
  6.49,
  11.10,
  16.48,
  22.73,
  25.67,
  31.55,
  36.95,
  43.01,
  47.62,
  53.70,
  59.08,
  63.96,
  69.04,
] as const;

export const sec = (s: number) => Math.round(s * FPS);

export const TOTAL_FRAMES = 2071; // sec(69.04)

export interface SceneMeta {
  id: string;
  name: string;
  startSec: number;
  endSec: number;
  from: number;
  dur: number;
}

export const SCENES: SceneMeta[] = [
  {
    id: 'scene_01',
    name: '01 · Result First',
    startSec: T[0],
    endSec: T[1],
    from: sec(T[0]),
    dur: sec(T[1]) - sec(T[0]),
  },
  {
    id: 'scene_02',
    name: '02 · Open Safari',
    startSec: T[1],
    endSec: T[2],
    from: sec(T[1]),
    dur: sec(T[2]) - sec(T[1]),
  },
  {
    id: 'scene_03',
    name: '03 · Enter Website',
    startSec: T[2],
    endSec: T[3],
    from: sec(T[2]),
    dur: sec(T[3]) - sec(T[2]),
  },
  {
    id: 'scene_04',
    name: '04 · Alternative: Link in Bio',
    startSec: T[3],
    endSec: T[4],
    from: sec(T[3]),
    dur: sec(T[4]) - sec(T[3]),
  },
  {
    id: 'scene_05',
    name: '05 · Pull The Lanyard',
    startSec: T[4],
    endSec: T[5],
    from: sec(T[4]),
    dur: sec(T[5]) - sec(T[4]),
  },
  {
    id: 'scene_06',
    name: '06 · Select Learn',
    startSec: T[5],
    endSec: T[6],
    from: sec(T[5]),
    dur: sec(T[6]) - sec(T[5]),
  },
  {
    id: 'scene_07',
    name: '07 · Open Safari & Share',
    startSec: T[6],
    endSec: T[7],
    from: sec(T[6]),
    dur: sec(T[7]) - sec(T[6]),
  },
  {
    id: 'scene_08',
    name: '08 · Add to Home Screen',
    startSec: T[7],
    endSec: T[8],
    from: sec(T[7]),
    dur: sec(T[8]) - sec(T[7]),
  },
  {
    id: 'scene_09',
    name: '09 · Check App Name',
    startSec: T[8],
    endSec: T[9],
    from: sec(T[8]),
    dur: sec(T[9]) - sec(T[8]),
  },
  {
    id: 'scene_10',
    name: '10 · Tap Add',
    startSec: T[9],
    endSec: T[10],
    from: sec(T[9]),
    dur: sec(T[10]) - sec(T[9]),
  },
  {
    id: 'scene_11',
    name: '11 · On Your Home Screen',
    startSec: T[10],
    endSec: T[11],
    from: sec(T[10]),
    dur: sec(T[11]) - sec(T[10]),
  },
  {
    id: 'scene_12',
    name: '12 · No More Searching',
    startSec: T[11],
    endSec: T[12],
    from: sec(T[11]),
    dur: sec(T[12]) - sec(T[11]),
  },
  {
    id: 'scene_13',
    name: '13 · Tap and Learn',
    startSec: T[12],
    endSec: T[13],
    from: sec(T[12]),
    dur: sec(T[13]) - sec(T[12]),
  },
  {
    id: 'scene_14',
    name: '14 · Final CTA',
    startSec: T[13],
    endSec: T[14],
    from: sec(T[13]),
    dur: TOTAL_FRAMES - sec(T[13]),
  },
];

// Helper to interpolate between two timestamps in seconds:
export const prog = (
  f: number,
  startSec: number,
  endSec: number,
  easing: (t: number) => number = EASE,
) => {
  const s = sec(startSec);
  const e = sec(endSec);
  return interpolate(f, [s, e], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
};

// Helper to interpolate between two frame numbers:
export const progBetween = (
  f: number,
  startFrame: number,
  endFrame: number,
  easing: (t: number) => number = EASE,
) =>
  interpolate(f, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
