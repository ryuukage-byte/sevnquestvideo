/**
 * Storyboard & Scene Hierarchy Definition — Bentuk ない (Nai)
 * "THE TRANSFORMATION SYSTEM"
 */

import {secToFrame} from './voice-timestamps';

export interface SequenceMeta {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  startSec: number;
  endSec: number;
  fromFrame: number;
  durationFrames: number;
  mood: 'hook' | 'educational' | 'mechanical' | 'clean' | 'exceptional' | 'recap' | 'product' | 'brand';
  transitionName: string;
}

export const SEQUENCES: SequenceMeta[] = [
  {
    id: 'seq-01',
    num: 1,
    title: 'The Question',
    subtitle: 'Hook & Visual Disruption',
    startSec: 0.21,
    endSec: 11.79,
    fromFrame: 0,
    durationFrames: secToFrame(11.79), // 707 frames
    mood: 'hook',
    transitionName: 'Suffix convergence → Typography tunnel → Definition panel',
  },
  {
    id: 'seq-02',
    num: 2,
    title: 'What is NAI?',
    subtitle: 'Concept Visualization & Negation Engine',
    startSec: 11.79,
    endSec: 33.08,
    fromFrame: secToFrame(11.79), // 707
    durationFrames: secToFrame(33.08) - secToFrame(11.79), // 1278 frames
    mood: 'educational',
    transitionName: 'Single definition panel → 3 parallel tracks',
  },
  {
    id: 'seq-03',
    num: 3,
    title: 'Group 1: The Kana Shift',
    subtitle: 'Mechanical Typography & U-to-A Matrix',
    startSec: 33.08,
    endSec: 50.89,
    fromFrame: secToFrame(33.08), // 1985
    durationFrames: secToFrame(50.89) - secToFrame(33.08), // 1068 frames
    mood: 'mechanical',
    transitionName: 'Alternate kana path (U→WA) → camera sideways tracking',
  },
  {
    id: 'seq-04',
    num: 4,
    title: 'Group 2: Remove & Replace',
    subtitle: 'Tactile Ru-drop & Magnetic Snap',
    startSec: 50.89,
    endSec: 63.6,
    fromFrame: secToFrame(50.89), // 3053
    durationFrames: secToFrame(63.6) - secToFrame(50.89), // 763 frames
    mood: 'clean',
    transitionName: 'NAI rush wipe mask into irregular depth',
  },
  {
    id: 'seq-05',
    num: 5,
    title: 'Group 3: The Exceptions',
    subtitle: 'Suru & Kuru Irregular Transformation',
    startSec: 63.6,
    endSec: 71.73,
    fromFrame: secToFrame(63.6), // 3816
    durationFrames: secToFrame(71.73) - secToFrame(63.6), // 488 frames
    mood: 'exceptional',
    transitionName: 'Receding depth push-back into grand matrix recap',
  },
  {
    id: 'seq-06',
    num: 6,
    title: 'Everything Connects',
    subtitle: 'Unified Conjugation Grid & Golden Converge',
    startSec: 71.73,
    endSec: 75.43,
    fromFrame: secToFrame(71.73), // 4304
    durationFrames: secToFrame(75.43) - secToFrame(71.73), // 222 frames
    mood: 'recap',
    transitionName: 'Luminous NAI gateway push into SevnQuest application UI',
  },
  {
    id: 'seq-07',
    num: 7,
    title: 'Enter SevnQuest',
    subtitle: 'Interactive Conjugation Studio & Practice',
    startSec: 75.43,
    endSec: 101.52,
    fromFrame: secToFrame(75.43), // 4526
    durationFrames: secToFrame(101.52) - secToFrame(75.43), // 1565 frames
    mood: 'product',
    transitionName: 'Extracted 3D mastered card snaps back into hero product UI',
  },
  {
    id: 'seq-08',
    num: 8,
    title: 'Final CTA',
    subtitle: 'Brand Resolution & Mastered Stamp',
    startSec: 101.52,
    endSec: 110.88,
    fromFrame: secToFrame(101.52), // 6091
    durationFrames: 6653 - secToFrame(101.52), // 562 frames
    mood: 'brand',
    transitionName: 'Soft settle hold to tail audio fade',
  },
];
