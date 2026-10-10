import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background} from '../../shared/components/Background';
import {ensureFonts} from '../../shared/fonts';
import {C} from '../../shared/theme';
import {BlockFade} from './kit';
import {World1_Hook} from './scenes/World1_Hook';
import {World2_Begitu} from './scenes/World2_Begitu';
import {World3_Kelihatannya} from './scenes/World3_Kelihatannya';
import {World4_Compare} from './scenes/World4_Compare';
import {World5_KatanyaRecap} from './scenes/World5_KatanyaRecap';
import {World6_Closing} from './scenes/World6_Closing';
import {WORLDS, sec} from './timing';

export type SouVideoProps = {
  sfx?: boolean;
};

const COMPONENTS: React.FC<{sfx?: boolean}>[] = [
  World1_Hook,
  World2_Begitu,
  World3_Kelihatannya,
  World4_Compare,
  World5_KatanyaRecap,
  World6_Closing,
];

/**
 * SevnQuest Sou Video Explainer: そう — dari “begitu” sampai “kelihatannya” dan “katanya”
 * Format: 9:16 (1080 x 1920) @ 30 FPS.
 * Durasi: 03:42.48 (222.48 detik = 6674 frame), tanpa voiceover (SFX subtle only).
 * Menggunakan Washi Scroll Malam Indigo & Kartu GCard Taktil SevnQuest Asli.
 */
export const SouVideo: React.FC<SouVideoProps> = ({sfx = true}) => {
  ensureFonts();

  return (
    <AbsoluteFill style={{background: C.bg}}>
      {/* Background Washi Scroll Malam Indigo SevnQuest */}
      <Background />

      {/* Rangkaian 6 Dunia Visual Berkesinambungan */}
      {WORLDS.map((w, i) => {
        const Comp = COMPONENTS[i];
        if (!Comp) return null;
        const from = sec(w.start);
        const dur = sec(w.end) - from;
        const last = i === WORLDS.length - 1;

        return (
          <Sequence key={w.id} from={from} durationInFrames={dur} name={`${w.scenes} · ${w.name}`}>
            <BlockFade dur={dur} inF={i === 0 ? 0 : 6} outF={last ? 14 : 6}>
              <Comp sfx={sfx} />
            </BlockFade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
