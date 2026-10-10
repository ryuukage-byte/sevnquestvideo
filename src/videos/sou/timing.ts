import {FPS} from '../../shared/theme';

export const sec = (s: number) => Math.round(s * FPS);

/**
 * Durasi total audio そう: 03:42.48 (222.48 detik = 6674 frame @ 30 FPS)
 */
export const TOTAL_SEC = 222.48;
export const TOTAL_FRAMES = 6674;

export interface WorldMeta {
  id: string;
  name: string;
  start: number;
  end: number;
  scenes: string;
}

export const WORLDS: WorldMeta[] = [
  {
    id: 'world1_hook',
    name: 'WORLD 01 · HOOK + THREE MEANINGS',
    scenes: '00:00–00:15',
    start: 0,
    end: 15.0,
  },
  {
    id: 'world2_begitu',
    name: 'WORLD 02 · CORE IDEA: "BEGITU"',
    scenes: '00:15–01:05',
    start: 15.0,
    end: 65.0,
  },
  {
    id: 'world3_kelihatannya',
    name: 'WORLD 03 · "SEPERTINYA / KELIHATANNYA"',
    scenes: '01:05–01:56',
    start: 65.0,
    end: 116.0,
  },
  {
    id: 'world4_compare',
    name: 'WORLD 04 · そう VS よう + おいしそう',
    scenes: '01:56–02:41',
    start: 116.0,
    end: 161.0,
  },
  {
    id: 'world5_katanya_recap',
    name: 'WORLD 05 · "KATANYA" + RECAP',
    scenes: '02:41–03:15',
    start: 161.0,
    end: 195.0,
  },
  {
    id: 'world6_principle_closing',
    name: 'WORLD 06 · CORE PRINCIPLE + CLOSING',
    scenes: '03:15–03:42.48',
    start: 195.0,
    end: TOTAL_SEC,
  },
];
