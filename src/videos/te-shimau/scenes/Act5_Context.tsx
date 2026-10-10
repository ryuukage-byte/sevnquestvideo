import React from 'react';
import {Stamp} from '../../../shared/components/ui';
import {C, FPS} from '../../../shared/theme';
import {heroPose} from '../PatternHero';
import {At, BOUNCY, Big, EASE_IN, EASE_IO, Threads, hexA, mix, ps, sp, useF} from '../kit';
import {SituationArt, SituationCard} from '../props';

// S18 "jangan mengartikan ～てしまう hanya sebagai 'selesai'" → S19 "Perhatikan konteksnya" → S20 rangkuman.
// Label SELESAI? tidak dicoret — ia hanya mengecil dan memberi tempat pada dua konteks lain.

export const Act5_Context: React.FC = () => {
  const f = useF();
  const t = f / FPS;
  const hero = heroPose(f);
  const heroBottom = hero.y + hero.size;

  // ── S18 ──
  const label = sp(f, 51.2, BOUNCY);
  const shrink = ps(f, 52.95, 53.4, EASE_IO);
  const labelOut = ps(f, 54.2, 54.45);
  const cK = sp(f, 53.3);
  const cC = sp(f, 53.5);
  const link = ps(f, 53.65, 54.15, EASE_IO);

  // ── S19 ──
  const konteks = sp(f, 54.36, BOUNCY);
  const travel = ps(f, 54.75, 55.4, EASE_IO);
  const cardsOut = ps(f, 55.59, 55.9, EASE_IN);

  // ── S20 ──
  const sL = sp(f, 56.6);
  const sR = sp(f, 58.2);
  const lL = ps(f, 56.25, 56.65, EASE_IO);
  const lR = ps(f, 57.85, 58.25, EASE_IO);
  const out = ps(f, 59.88, 60.5, EASE_IN);

  return (
    <>
      {/* S18 — satu arti yang terlalu sempit */}
      <At y={mix(945, 770, shrink)} s={label * mix(1, 0.7, shrink)} o={Math.min(1, label * 2) * mix(1, 0.8, shrink) * (1 - labelOut)}>
        <Stamp text="SELESAI?" color={C.matcha} size={56} rotate={-4} style={{whiteSpace: 'nowrap'}} />
      </At>

      {/* S18–S19 — pola yang sama, dua konteks */}
      {t >= 53.2 && t < 56 && (
        <>
          <Threads
            lines={[
              {from: [390, heroBottom + 6], to: [290, 916], p: link, o: 1 - cardsOut, dot: travel},
              {from: [690, heroBottom + 6], to: [790, 916], p: link, o: 1 - cardsOut, dot: travel},
            ]}
          />
          <At x={290 - cardsOut * 700} y={1090} s={0.7 + 0.3 * cK} o={Math.min(1, cK * 2)}>
            <SituationCard kind="key" w={400} h={340} art={0.9} />
          </At>
          <At x={790 + cardsOut * 700} y={1090} s={0.7 + 0.3 * cC} o={Math.min(1, cC * 2)}>
            <SituationCard kind="cake" w={400} h={340} art={0.9} />
          </At>
          <At y={318 - cardsOut * 80} s={2 - konteks} o={Math.min(1, konteks * 2) * (1 - cardsOut)}>
            <Big size={150} color={C.gold} style={{textShadow: `0 0 50px ${hexA(C.gold, 0.35)}, 0 8px 30px rgba(0,0,0,0.7)`}}>
              KONTEKS
            </Big>
          </At>
        </>
      )}

      {/* S20 — rangkuman: pola + dua nuansa utamanya */}
      {t >= 56.1 && out < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - out, transformOrigin: '540px 700px', transform: `translateY(${out * -260}px) scale(${1 - out * 0.2})`}}>
          <Threads
            lines={[
              {from: [380, heroBottom + 6], to: [290, 792], p: lL, color: C.hanko},
              {from: [700, heroBottom + 6], to: [790, 792], p: lR},
            ]}
          />
          <At x={290} y={1010} s={0.7 + 0.3 * sL} o={Math.min(1, sL * 2)}>
            <SituationCard kind="key" w={440} h={420} artO={0} accent={hexA(C.hanko, 0.55)}>
              <SituationArt kind="key" s={0.92} />
              <Stamp text="PENYESALAN" color={C.hanko} size={34} rotate={-4} style={{whiteSpace: 'nowrap'}} />
            </SituationCard>
          </At>
          <At x={790} y={1010} s={0.7 + 0.3 * sR} o={Math.min(1, sR * 2)}>
            <SituationCard kind="file" w={440} h={420} artO={0} accent={hexA(C.gold, 0.55)}>
              <SituationArt kind="file" s={0.92} />
              <Stamp text="TIDAK DISENGAJA" color={C.gold} size={30} rotate={-4} style={{whiteSpace: 'nowrap'}} />
            </SituationCard>
          </At>
        </div>
      )}
    </>
  );
};
