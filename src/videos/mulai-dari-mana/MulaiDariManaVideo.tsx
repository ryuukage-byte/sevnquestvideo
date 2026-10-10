import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Background, C, ensureFonts} from '../../shared';
import {
  Act1_Dilemma,
  Act2_Huruf,
  Act3_TigaPilar,
  Act4_KosakataKanji,
  Act5_PolaKalimat,
  Act6_Roadmap,
  Act7_Cta,
} from './scenes';
import {ACTS, sec} from './timing';

export type MulaiDariManaVideoProps = {
  sfx?: boolean;
  captions?: boolean;
  voiceover?: boolean;
};

const ACT_COMPONENTS: React.FC<{dur: number}>[] = [
  Act1_Dilemma,
  Act2_Huruf,
  Act3_TigaPilar,
  Act4_KosakataKanji,
  Act5_PolaKalimat,
  Act6_Roadmap,
  Act7_Cta,
];

export const MulaiDariManaVideo: React.FC<MulaiDariManaVideoProps> = ({
  voiceover = true,
}) => {
  ensureFonts();

  return (
    <AbsoluteFill style={{background: C.bg}}>
      {/* Voice-over Audio dari Raw/video 7.wav */}
      {voiceover && <Audio src={staticFile('audio/voice/mulai-dari-mana.wav')} />}

      {/* Latar Belakang Bernapas Washi SevnQuest */}
      <Background />

      {/* Rangkaian 7 Act */}
      {ACTS.map((act, i) => {
        const Comp = ACT_COMPONENTS[i];
        if (!Comp) return null;
        const from = sec(act.start);
        const dur = sec(act.end) - sec(act.start);

        return (
          <Sequence key={act.id} from={from} durationInFrames={dur} name={act.name}>
            <Comp dur={dur} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
