import React from 'react';
import {C} from '../../../shared/theme';
import {At, Kana, Threads, io, ps, useF} from '../kit';

// S01–S04 — 〜ておく dipertanyakan, lalu 置く (おく) diperkenalkan sebagai referensi kecil di samping pola.
// Pola, kalender, kotak, dan lembar sudah hidup di lapisan persisten; babak ini hanya menambah 置く.

export const Act1_Intro: React.FC = () => {
  const f = useF();
  const vis = io(f, 10.2, 25.8, 0.4, 0.6);
  const reveal = ps(f, 10.4, 11.0);
  const line = ps(f, 11.3, 12.4);

  return (
    <>
      {/* garis gerak dari おく pada pola utama ke 置く */}
      <Threads
        lines={[
          {from: [572, 418], to: [792, 462], p: line, o: vis, color: C.gold, dot: line < 1 ? line : undefined},
        ]}
      />
      <At x={840} y={470} s={0.9 + 0.1 * reveal} o={vis * reveal}>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <Kana ch="置" ruby="お" size={56} color={C.gold} glow={0.5} />
          <Kana ch="く" size={56} color={C.gold} />
        </div>
      </At>
    </>
  );
};
