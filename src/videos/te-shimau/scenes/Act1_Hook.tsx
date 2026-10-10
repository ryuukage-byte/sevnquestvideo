import React from 'react';
import {C} from '../../../shared/theme';
import {At, BOUNCY, Big, EASE, EASE_IN, EASE_IO, T, bump, hexA, mix, ps, sp, useF} from '../kit';
import {Actor, CakeSlices, Door, KeyIcon, PlateBase, Table, sliceDir} from '../props';

// S01 — kunci tertinggal · S02 — kue habis.
// Kamera mengikuti karakter ke pintu, berhenti, lalu mundur memperlihatkan kunci yang tertinggal.
// Whip-pan membawa ke piring kue; piring kosongnya kelak menjadi kartu pola (lihat PatternHero).

const FLOOR = 1180;
const PLATE = {x: 540, y: 820, d: 560, r: 205};
const EAT = [2.45, 2.7, 2.95, 3.2, 3.45]; // lima potongan mengikuti beat, potongan ke-6 diambil karakter

export const Act1_Hook: React.FC = () => {
  const f = useF();

  // ── S01 ──
  const walk = ps(f, 0.05, 0.92, EASE_IO);
  const reveal = ps(f, 1.02, 1.5, EASE_IO);
  const zoom = mix(1.3, 1, reveal);
  const camX = mix(mix(60, -170, walk), 0, reveal);
  const camY = mix(-70, 0, reveal);
  const ax = mix(330, 600, walk);
  const step = walk < 1 ? Math.abs(Math.sin(walk * Math.PI * 4)) * -12 : 0;
  const noticed = f >= T(1.08);
  const keyP = sp(f, 1.05, BOUNCY);
  const exit1 = ps(f, 1.77, 2.2, EASE_IN);

  // ── S02 ──
  const enter2 = 1 - ps(f, 1.95, 2.42, EASE);
  const gone = EAT.map((t) => ps(f, t, t + 0.2, EASE_IN));
  const flyP = ps(f, 3.7, 4.0, EASE_IO);
  const [sx, sy] = sliceDir(5);
  const mouth = {x: 250, y: 1090};
  const fly = {
    i: 5,
    dx: (mouth.x - (PLATE.x + sx * PLATE.r * 0.58)) * flyP,
    dy: (mouth.y - (PLATE.y + sy * PLATE.r * 0.58)) * flyP - Math.sin(Math.PI * flyP) * 90,
    s: 1 - 0.7 * flyP,
    o: 1 - ps(f, 3.94, 4.02),
  };
  const empty = f >= T(4.0);
  const lean = bump(f, 3.55, 4.05);
  const out2 = ps(f, 4.71, 5.0, EASE_IN); // teks & remah keluar saat piring mulai berubah
  const actorAway = ps(f, 4.71, 5.4, EASE_IO);

  return (
    <>
      {f < T(2.25) && (
        <div style={{position: 'absolute', inset: 0, transform: `translateX(${-exit1 * 1300}px)`, filter: exit1 > 0.02 ? `blur(${exit1 * 10}px)` : undefined}}>
          <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 860px', transform: `translate(${camX}px, ${camY}px) scale(${zoom})`}}>
            <div style={{position: 'absolute', left: 60, right: 60, top: FLOOR, borderTop: `3px dashed ${C.thread}`}} />
            {/* di dalam rumah: meja + kunci */}
            <div style={{position: 'absolute', left: 105, top: FLOOR - 130}}>
              <Table />
            </div>
            <At x={220} y={FLOOR - 172} s={keyP} o={Math.min(1, keyP * 2)}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 190,
                  height: 190,
                  marginLeft: -95,
                  marginTop: -95,
                  borderRadius: '50%',
                  border: `3px dashed ${hexA(C.gold, 0.7)}`,
                  transform: `scale(${1 + 0.12 * Math.sin(f / 3.5)}) rotate(${f * 1.5}deg)`,
                }}
              />
              <KeyIcon size={130} glow={0.6 + 0.4 * Math.sin(f / 3.5)} />
            </At>
            {/* pintu keluar */}
            <div style={{position: 'absolute', left: 715, top: FLOOR - 620}}>
              <Door open={ps(f, 0.8, 1.0) * 0.32} knob={bump(f, 0.6, 1.3)} />
            </div>
            <Actor x={ax} y={FLOOR + step} h={440} expression={noticed ? 'surprised' : 'happy'} bubble={noticed ? 'exclamation' : undefined} />
          </div>
          <At y={400} s={sp(f, 1.2, BOUNCY)} o={Math.min(1, sp(f, 1.2, BOUNCY) * 2)}>
            <Big size={108} color={C.gold} style={{textShadow: `0 0 40px ${hexA(C.gold, 0.35)}, 0 8px 30px rgba(0,0,0,0.7)`}}>
              KETINGGALAN?
            </Big>
          </At>
        </div>
      )}

      {f >= T(1.9) && (
        <div style={{position: 'absolute', inset: 0, transform: `translateX(${enter2 * 1300}px)`, filter: enter2 > 0.02 ? `blur(${enter2 * 10}px)` : undefined}}>
          {/* dasar piring diserahkan ke PatternHero di 4.71 supaya bisa berubah jadi kartu */}
          {f < T(4.71) && (
            <At x={PLATE.x} y={PLATE.y}>
              <PlateBase d={PLATE.d} />
            </At>
          )}
          <At x={PLATE.x} y={PLATE.y} o={1 - out2} z={45}>
            <div style={{position: 'absolute', left: -PLATE.d / 2, top: -PLATE.d / 2, opacity: empty ? 1 : 0}}>
              <div style={{width: PLATE.d, height: PLATE.d, position: 'relative'}}>
                {[
                  [0.4, 0.45, 12],
                  [0.57, 0.4, 9],
                  [0.61, 0.58, 13],
                  [0.45, 0.62, 8],
                  [0.51, 0.51, 10],
                ].map(([x, y, r], i) => (
                  <div key={i} style={{position: 'absolute', left: x * PLATE.d, top: y * PLATE.d, width: r, height: r, borderRadius: '50%', background: i % 2 ? C.gold : '#d9a54a'}} />
                ))}
              </div>
            </div>
            <div style={{position: 'absolute', left: -PLATE.r - 6, top: -PLATE.r - 6}}>
              <CakeSlices r={PLATE.r} gone={gone} fly={fly} />
            </div>
          </At>
          <Actor
            x={mix(mix(230, 290, lean), 150, actorAway)}
            y={mix(1290, 1400, actorAway)}
            h={380}
            s={mix(1, 0.62, actorAway)}
            o={1 - ps(f, 5.5, 6.1)}
            expression={f < T(4.02) ? 'happy' : f < T(4.71) ? 'surprised' : 'awkward'}
            bubble={f >= T(4.05) && f < T(4.71) ? 'question' : undefined}
          />
          <At y={400} s={sp(f, 4.1, BOUNCY)} o={Math.min(1, sp(f, 4.1, BOUNCY) * 2) * (1 - out2)} style={{marginTop: -out2 * 80}}>
            <Big size={112}>
              LAH, <span style={{color: C.gold}}>HABIS?</span>
            </Big>
          </At>
        </div>
      )}
    </>
  );
};
