import React from 'react';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {C, FPS} from '../../../shared/theme';
import {IPhoneShell} from '../../iphone/components/iPhoneShell';
import {TouchIndicator} from '../../iphone/components/TouchIndicator';
import {ConjugationScreen, FormId, chipPos} from '../ProductScreen';
import {At, EASE, EASE_IN, EASE_IO, bump, hexA, kf, mix, ps, sp, useF} from '../kit';

// S21 fitur konjugasi: ketik kata kerja → lihat bentuknya → coba bentuk lain. S22 logo SevnQuest.

const TE = chipPos('te');
const NAI = chipPos('nai');

export const Act6_Cta: React.FC = () => {
  const f = useF();
  const t = f / FPS;

  // ponsel: naik dari bawah, dorong-masuk pelan saat interaksi, lalu mengecil menuju logo
  const enter = ps(f, 60.2, 60.95, EASE);
  const exit = ps(f, 65.12, 65.5, EASE_IN);
  const k = kf(f, [[62.1, 0.74], [62.8, 0.8], [64.7, 0.8], [65.1, 0.74]]) * (1 - exit * 0.6);
  const cy = mix(mix(2700, 825, enter), 760, exit);

  const typed = '食べる'.slice(0, t < 61.05 ? 0 : t < 61.2 ? 1 : t < 61.35 ? 2 : 3);
  const active: FormId | null = t < 62.5 ? null : t < 63.6 ? 'te' : 'nai';
  const tapAt = active === 'nai' ? 63.6 : 62.5;
  const touch = {
    x: kf(f, [[61.9, 560], [62.42, TE.x], [63.1, TE.x], [63.52, NAI.x]]),
    y: kf(f, [[61.9, 1080], [62.42, TE.y], [63.1, TE.y], [63.52, NAI.y]]),
  };

  const logo = sp(f, 65.25);
  const word = ps(f, 65.4, 65.82, EASE_IO);

  return (
    <>
      {exit < 1 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - 380 * k,
            top: cy - 770 * k,
            transform: `scale(${k})`,
            transformOrigin: '0 0',
            opacity: 1 - ps(f, 65.14, 65.4),
          }}
        >
          <IPhoneShell>
            <div style={{position: 'absolute', inset: 0}}>
              <ConjugationScreen
                typed={typed}
                focus={ps(f, 60.95, 61.05) * (1 - ps(f, 61.6, 61.9))}
                dim={ps(f, 61.4, 61.75, EASE_IO)}
                active={active}
                on={ps(f, tapAt, tapAt + 0.2)}
                press={bump(f, tapAt - 0.05, tapAt + 0.2)}
                step={sp(f, tapAt + 0.08)}
                push={sp(f, 62.58)}
              />
              <TouchIndicator x={touch.x} y={touch.y} press={bump(f, 62.44, 62.66) + bump(f, 63.54, 63.76)} opacity={ps(f, 61.9, 62.1) * (1 - ps(f, 64.2, 64.5))} />
            </div>
          </IPhoneShell>
        </div>
      )}

      {/* S22 — identitas produk, ditahan sampai narasi selesai */}
      <At y={850} o={Math.min(1, logo)}>
        <div style={{width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, ${hexA(C.gold, 0.16)} 0%, transparent 68%)`}} />
      </At>
      <At y={730} s={0.6 + 0.4 * logo} o={Math.min(1, logo * 2)}>
        <LogoMark size={230} glow={0.5} />
      </At>
      <At y={960} o={word > 0 ? 1 : 0}>
        <div style={{clipPath: `inset(-20% ${(1 - word) * 100}% -20% 0)`, transform: `translateY(${(1 - word) * 14}px)`}}>
          <Wordmark size={108} />
        </div>
      </At>
    </>
  );
};
