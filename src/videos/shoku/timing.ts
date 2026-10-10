import {interpolate} from 'remotion';
import {EASE} from '../../shared/anim';

export const FPS = 30;

// Exact scene cut points from storyboard (in seconds)
export const T = [
  0.00,
  6.69,
  16.89,
  21.43,
  30.41,
  36.60,
  42.59,
  56.45,
  63.54,
  71.56,
  75.11,
  91.56,
  100.40,
  111.22,
  125.41,
  129.32,
] as const;

export const sec = (s: number) => Math.round(s * FPS);

export const TOTAL_FRAMES = sec(129.32); // 3880 frames @ 30 FPS

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
    name: '01 · Easy Start',
    startSec: T[0],
    endSec: T[1],
    from: sec(T[0]),
    dur: sec(T[1]) - sec(T[0]),
  },
  {
    id: 'scene_02',
    name: '02 · Quiz',
    startSec: T[1],
    endSec: T[2],
    from: sec(T[1]),
    dur: sec(T[2]) - sec(T[1]),
  },
  {
    id: 'scene_03',
    name: '03 · Confusion',
    startSec: T[2],
    endSec: T[3],
    from: sec(T[2]),
    dur: sec(T[3]) - sec(T[2]),
  },
  {
    id: 'scene_04',
    name: '04 · Ta vs Shoku',
    startSec: T[3],
    endSec: T[4],
    from: sec(T[3]),
    dur: sec(T[4]) - sec(T[3]),
  },
  {
    id: 'scene_05',
    name: '05 · Why One Kanji Can Change',
    startSec: T[4],
    endSec: T[5],
    from: sec(T[4]),
    dur: sec(T[5]) - sec(T[4]),
  },
  {
    id: 'scene_06',
    name: '06 · Kunyomi / Onyomi',
    startSec: T[5],
    endSec: T[6],
    from: sec(T[5]),
    dur: sec(T[6]) - sec(T[5]),
  },
  {
    id: 'scene_07',
    name: '07 · Apply to 食',
    startSec: T[6],
    endSec: T[7],
    from: sec(T[6]),
    dur: sec(T[7]) - sec(T[6]),
  },
  {
    id: 'scene_08',
    name: '08 · Wrong Memorization',
    startSec: T[7],
    endSec: T[8],
    from: sec(T[7]),
    dur: sec(T[8]) - sec(T[7]),
  },
  {
    id: 'scene_09',
    name: '09 · Vocabulary Trap',
    startSec: T[8],
    endSec: T[9],
    from: sec(T[8]),
    dur: sec(T[9]) - sec(T[8]),
  },
  {
    id: 'scene_10',
    name: '10 · Better Learning Model',
    startSec: T[9],
    endSec: T[10],
    from: sec(T[9]),
    dur: sec(T[10]) - sec(T[9]),
  },
  {
    id: 'scene_11',
    name: '11 · Example Cards',
    startSec: T[10],
    endSec: T[11],
    from: sec(T[10]),
    dur: sec(T[11]) - sec(T[10]),
  },
  {
    id: 'scene_12',
    name: '12 · Change The Question',
    startSec: T[11],
    endSec: T[12],
    from: sec(T[11]),
    dur: sec(T[12]) - sec(T[11]),
  },
  {
    id: 'scene_13',
    name: '13 · SevnQuest System',
    startSec: T[12],
    endSec: T[13],
    from: sec(T[12]),
    dur: sec(T[13]) - sec(T[12]),
  },
  {
    id: 'scene_14',
    name: '14 · Callback / Resolution',
    startSec: T[13],
    endSec: T[14],
    from: sec(T[13]),
    dur: sec(T[14]) - sec(T[13]),
  },
  {
    id: 'scene_15',
    name: '15 · CTA',
    startSec: T[14],
    endSec: T[15],
    from: sec(T[14]),
    dur: sec(T[15]) - sec(T[14]),
  },
];

// Helper to interpolate between two exact timestamps in seconds:
export const progBetweenSec = (
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
