import React from 'react';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {C} from '../../../shared/theme';
import {IPhoneShell} from '../../iphone/components/iPhoneShell';
import {TouchIndicator} from '../../iphone/components/TouchIndicator';
import {At, EASE, EASE_IN, EASE_IO, bump, hexA, kf, mix, ps, sp, useF} from '../kit';
import {GlyphLine} from '../props';
import {TransformScreen, optionPos} from '../ProductScreen';
import {SENT_CHARS, SENT_COLOR, SENT_FULL} from './sentence';

const ANSWER = optionPos(0, 0); // sel しとく (kiri atas)

// S29 — tantangan: kalimat 寝ておこう ditonjolkan lalu lembar menyusut ke ponsel.
// S30 — ponsel dengan satu fitur (しておく → しとく), lalu logo SevnQuest ditahan sampai akhir.
// Ukuran & posisi CTA sama dengan te-shimau: IPhoneShell skala 0,74 → 0,80, pusat y ~825;
// logo 230 di y 730; wordmark 108 di y 960; glow emas 900px di y 850.

export const Act5_Cta: React.FC = () => {
  const f = useF();

  // S29: kalimat tetap sampai ponsel menutupinya
  const sentO = 1 - ps(f, 100.3, 100.6);

  // ponsel: naik dari bawah, dorong-masuk pelan saat interaksi, lalu mengecil menuju logo
  const enter = ps(f, 100.63, 101.4, EASE);
  const exit = ps(f, 104.4, 104.8, EASE_IN);
  const k = kf(f, [
    [101.9, 0.74],
    [102.6, 0.8],
    [104.2, 0.8],
    [104.6, 0.74],
  ]) *
    (1 - exit * 0.6);
  const cy = mix(mix(2700, 825, enter), 760, exit);

  // satu interaksi: ketuk しとく → hasil muncul
  const pick = ps(f, 102.4, 102.7);
  const press = bump(f, 102.3, 102.6);
  const result = ps(f, 102.75, 103.25, EASE);
  const touch = {
    x: kf(f, [
      [101.9, 560],
      [102.35, ANSWER.x],
      [104.0, ANSWER.x],
    ]),
    y: kf(f, [
      [101.9, 1080],
      [102.35, ANSWER.y],
      [104.0, ANSWER.y],
    ]),
  };

  // logo mulai saat ponsel masih mengecil (beririsan, tanpa jeda kosong)
  const logo = sp(f, 104.5);
  const word = ps(f, 104.8, 105.25, EASE_IO);

  return (
    <>
      <GlyphLine keys={SENT_FULL} chars={SENT_CHARS} color={SENT_COLOR} opacity={sentO} />

      {exit < 1 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - 380 * k,
            top: cy - 770 * k,
            transform: `scale(${k})`,
            transformOrigin: '0 0',
            opacity: 1 - ps(f, 104.45, 104.8),
          }}
        >
          <IPhoneShell>
            <div style={{position: 'absolute', inset: 0}}>
              <TransformScreen pick={pick} press={press} result={result} />
              <TouchIndicator x={touch.x} y={touch.y} press={press} opacity={ps(f, 101.9, 102.1) * (1 - ps(f, 103.4, 103.8))} />
            </div>
          </IPhoneShell>
        </div>
      )}

      {/* S30 — identitas produk, ditahan sampai narasi selesai */}
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
