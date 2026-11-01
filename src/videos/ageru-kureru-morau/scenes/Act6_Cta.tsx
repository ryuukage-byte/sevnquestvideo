import React from 'react';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {C, FPS} from '../../../shared/theme';
import {IPhoneShell} from '../../iphone/components/iPhoneShell';
import {TouchIndicator} from '../../iphone/components/TouchIndicator';
import {ConjugationScreen, FormId, chipPos} from '../ProductScreen';
import {At, EASE, EASE_IN, EASE_IO, bump, hexA, kf, mix, ps, sp, useF} from '../kit';

// A6 · S32 (92.1–95.6): fitur konjugasi — ketik あげる → て → ない.
// S33 (95.6–99.6): ponsel mengecil, logo penutup ditahan sampai frame terakhir.
// Dua bagian CTA mengikuti dua kalimat penutup narasi (SEVNQUEST.md §11).

const TE = chipPos('te');
const NAI = chipPos('nai');

export const Act6_Cta: React.FC = () => {
  const f = useF();
  const t = f / FPS;

  // ponsel: naik dari bawah, dorong pelan saat interaksi, lalu mengecil menuju logo
  const enter = ps(f, 91.9, 92.6, EASE);
  const exit = ps(f, 95.2, 95.6, EASE_IN);
  const k = kf(f, [[92.7, 0.74], [93.4, 0.8], [94.6, 0.8], [95.2, 0.74]]) * (1 - exit * 0.6);
  const cy = mix(mix(2700, 825, enter), 760, exit);

  const typedN = t < 92.85 ? 0 : t < 92.97 ? 1 : t < 93.08 ? 2 : 3;
  const typed = 'あげる'.slice(0, typedN);
  const active: FormId | null = t < 93.5 ? null : t < 94.5 ? 'te' : 'nai';
  const tapAt = active === 'nai' ? 94.5 : 93.5;
  const touch = {
    x: kf(f, [[92.3, 560], [93.0, TE.x], [93.9, TE.x], [94.4, NAI.x]]),
    y: kf(f, [[92.3, 1080], [93.0, TE.y], [93.9, TE.y], [94.4, NAI.y]]),
  };

  const logo = sp(f, 95.65);
  const word = ps(f, 95.9, 96.3, EASE_IO);

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
            opacity: 1 - ps(f, 95.4, 95.7),
          }}
        >
          <IPhoneShell>
            <div style={{position: 'absolute', inset: 0}}>
              <ConjugationScreen
                typed={typed}
                focus={ps(f, 91.9, 92.0) * (1 - ps(f, 93.0, 93.2))}
                dim={ps(f, 92.0, 92.5, EASE_IO)}
                active={active}
                on={ps(f, tapAt, tapAt + 0.2)}
                press={bump(f, tapAt - 0.05, tapAt + 0.2)}
                step={sp(f, tapAt + 0.08)}
                push={sp(f, 93.6)}
              />
              <TouchIndicator
                x={touch.x}
                y={touch.y}
                press={bump(f, 93.44, 93.66) + bump(f, 94.44, 94.66)}
                opacity={ps(f, 91.9, 92.1) * (1 - ps(f, 95.0, 95.3))}
              />
            </div>
          </IPhoneShell>
        </div>
      )}

      {/* S33 — identitas produk, ditahan sampai narasi selesai */}
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
