import {FPS, TOTAL_FRAMES, VO_TIMESTAMPS, secToFrame} from './data/voice-timestamps';
import {SEQUENCES} from './data/storyboard';
import {SfxName} from '../../shared/components/Sfx';

export {FPS, TOTAL_FRAMES, VO_TIMESTAMPS, SEQUENCES, secToFrame};

export interface NaiSfxCue {
  atFrame: number;
  name: SfxName;
  vol?: number;
  label?: string;
}

export const SFX_CUES_NAI: NaiSfxCue[] = [
  // Sequence 01 — Hook
  { atFrame: 12, name: 'impact-soft', vol: 0.45, label: '00:00 Initial Hook Entry' },
  { atFrame: 38, name: 'pop', vol: 0.4, label: 'Card 2 pop' },
  { atFrame: 64, name: 'pop', vol: 0.4, label: 'Card 3 pop' },
  { atFrame: 120, name: 'sparkle', vol: 0.4, label: 'Suffix 1 glow' },
  { atFrame: 150, name: 'sparkle', vol: 0.4, label: 'Suffix 2 glow' },
  { atFrame: 180, name: 'sparkle', vol: 0.4, label: 'Suffix 3 glow' },
  { atFrame: 280, name: 'whoosh-soft', vol: 0.4, label: 'Convergence begin' },
  { atFrame: 380, name: 'chime', vol: 0.5, label: 'Giant Nai convergence resolve' },
  { atFrame: 530, name: 'whoosh', vol: 0.4, label: 'Tunnel push-in' },

  // Sequence 02 — Meaning & Negation Engine
  { atFrame: 710, name: 'impact-soft', vol: 0.4, label: 'Definition panel enter' },
  { atFrame: 890, name: 'pop', vol: 0.4, label: 'Context label Tidak' },
  { atFrame: 990, name: 'pop', vol: 0.4, label: 'Context label Larangan' },
  { atFrame: 1327, name: 'swipe', vol: 0.4, label: 'Taberu Ru detach' },
  { atFrame: 1355, name: 'click', vol: 0.45, label: 'Tabenai Nai snap' },
  { atFrame: 1650, name: 'whoosh', vol: 0.4, label: 'Split into 3 tracks' },

  // Sequence 03 — Group 1: The Kana Shift
  { atFrame: 1985, name: 'impact-soft', vol: 0.4, label: 'Group 1 track enter' },
  { atFrame: 2040, name: 'tick', vol: 0.4, label: 'Hiragana rail slide' },
  { atFrame: 2075, name: 'chime', vol: 0.45, label: 'Kakanai complete' },
  { atFrame: 2435, name: 'pop', vol: 0.4, label: 'Nomu card pop' },
  { atFrame: 2470, name: 'chime', vol: 0.45, label: 'Nomanai complete' },
  { atFrame: 2510, name: 'swipe', vol: 0.4, label: 'Whip pan Hanasu' },
  { atFrame: 2545, name: 'chime', vol: 0.45, label: 'Hanasanai complete' },
  { atFrame: 2680, name: 'error-soft', vol: 0.4, label: 'Kau U-to-A bounce recoil' },
  { atFrame: 2720, name: 'sparkle', vol: 0.45, label: 'Alternate path WA reveal' },
  { atFrame: 2750, name: 'success', vol: 0.5, label: 'Kawanai confirmed' },

  // Sequence 04 — Group 2: Remove & Replace
  { atFrame: 3053, name: 'whoosh-soft', vol: 0.4, label: 'Group 2 enter' },
  { atFrame: 3290, name: 'swipe', vol: 0.4, label: 'Taberu magnetic detach' },
  { atFrame: 3320, name: 'click', vol: 0.45, label: 'Tabenai snap' },
  { atFrame: 3480, name: 'swipe', vol: 0.4, label: 'Miru Ru diagonal eject' },
  { atFrame: 3500, name: 'click', vol: 0.45, label: 'Minai snap' },
  { atFrame: 3640, name: 'pop', vol: 0.4, label: 'Okiru -> Okinai snap' },
  { atFrame: 3770, name: 'whoosh', vol: 0.45, label: 'Wipe mask into Group 3' },

  // Sequence 05 — Group 3: Irregular Verbs
  { atFrame: 3816, name: 'impact-soft', vol: 0.45, label: 'Group 3 enter' },
  { atFrame: 4054, name: 'click', vol: 0.45, label: 'Suru reconstruct into Shinai' },
  { atFrame: 4210, name: 'chime', vol: 0.45, label: 'Kuru reading shift into Konai' },

  // Sequence 06 — Everything Connects
  { atFrame: 4304, name: 'whoosh', vol: 0.45, label: 'Grand dolly out recap' },
  { atFrame: 4460, name: 'sparkle', vol: 0.5, label: 'Central portal gateway ignite' },

  // Sequence 07 — Enter SevnQuest
  { atFrame: 4526, name: 'impact', vol: 0.5, label: 'Enter SevnQuest app UI' },
  { atFrame: 4750, name: 'pop', vol: 0.4, label: 'Select Nomu card' },
  { atFrame: 5050, name: 'tick', vol: 0.4, label: 'Pattern rule breakdown' },
  { atFrame: 5210, name: 'click', vol: 0.5, label: 'Tactile answer button click' },
  { atFrame: 5225, name: 'success', vol: 0.55, label: '+20 EXP verified correct!' },
  { atFrame: 5490, name: 'whoosh-soft', vol: 0.4, label: 'Mastered card elevates into 3D' },
  { atFrame: 5700, name: 'chime', vol: 0.45, label: 'Multi-form orbit satellites bloom' },

  // Sequence 08 — Final CTA
  { atFrame: 6091, name: 'impact-soft', vol: 0.45, label: 'Hero CTA product shot' },
  { atFrame: 6371, name: 'thud', vol: 0.55, label: 'Hanko stamp impact!' },
  { atFrame: 6420, name: 'sparkle', vol: 0.45, label: 'Wordmark glow sparkle' },
];
