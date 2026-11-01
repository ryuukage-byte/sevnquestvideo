import React from 'react';
import {Surface} from '../../shared/components/ui';
import {C, FONT, FPS} from '../../shared/theme';
import {At, EASE_IO, Threads, bump, io, ps, sp, useF} from './kit';
import {Actor, BookIcon} from './props';

// Panggung persisten: dua karakter, lantai, buku, dan benang arah. Tidak dirender ulang per scene —
// hanya berubah peran dan posisi buku sesuai narasi. 私 (kiri) dan 友達 (kanan).
// Koordinat = kanvas 1080×1920.

const X_WATASHI = 300; // 私
const X_TOMODACHI = 780; // 友達
const FEET_Y = 1262; // garis lantai
const HAND_Y = 1080; // tinggi buku saat di tangan
const X_HAND_L = 380;
const X_HAND_R = 700;

type Flight =
  | {k: 'pop'; at: number; x: number}
  | {k: 'hide'; at: number}
  | {k: 'move'; at: number; dur: number; x0: number; x1: number};

// Urutan buku: あげる (私 → 友達), くれる (友達 → 私), もらう (友達 → 私, dilihat dari 私).
const FLIGHTS: Flight[] = [
  {k: 'pop', at: 11.9, x: X_HAND_L}, // S04: buku ada di tangan pemberi
  {k: 'move', at: 13.0, dur: 1.2, x0: X_HAND_L, x1: X_HAND_R}, // S04: あげる
  {k: 'hide', at: 19.6}, // S07: contoh baru
  {k: 'pop', at: 20.3, x: X_HAND_L},
  {k: 'move', at: 21.5, dur: 1.0, x0: X_HAND_L, x1: X_HAND_R}, // S08: あげました
  {k: 'move', at: 33.0, dur: 1.3, x0: X_HAND_R, x1: X_HAND_L}, // S11–12: くれる, menuju kita
  {k: 'hide', at: 41.5},
  {k: 'pop', at: 41.9, x: X_HAND_R}, // S16: buku ada di tangan pemberi
  {k: 'move', at: 43.9, dur: 1.0, x0: X_HAND_R, x1: X_HAND_L}, // S16: くれました
  {k: 'hide', at: 61.3},
  {k: 'pop', at: 61.9, x: X_HAND_R},
  {k: 'move', at: 63.4, dur: 1.0, x0: X_HAND_R, x1: X_HAND_L}, // S24: もらいました
];

const restX = (i: number): number => {
  if (i < 0) return X_HAND_L;
  const q = FLIGHTS[i];
  if (q.k === 'pop') return q.x;
  if (q.k === 'move') return q.x1;
  return restX(i - 1);
};

/** keadaan buku pada frame f: posisi, skala, opasitas */
export const bookState = (f: number) => {
  const t = f / FPS;
  let idx = -1;
  FLIGHTS.forEach((fl, i) => {
    if (t >= fl.at) idx = i;
  });
  if (idx < 0) return {x: X_HAND_L, y: HAND_Y, s: 0, o: 0};
  const fl = FLIGHTS[idx];
  if (fl.k === 'pop') return {x: fl.x, y: HAND_Y, s: sp(f, fl.at), o: 1};
  if (fl.k === 'hide') {
    const h = ps(f, fl.at, fl.at + 0.3);
    return {x: restX(idx - 1), y: HAND_Y, s: 1 - h, o: 1 - h};
  }
  const p = ps(f, fl.at, fl.at + fl.dur, EASE_IO);
  return {
    x: fl.x0 + (fl.x1 - fl.x0) * p,
    y: HAND_Y - 110 * bump(f, fl.at, fl.at + fl.dur),
    s: 1,
    o: 1,
  };
};

export const Stage: React.FC = () => {
  const f = useF();
  const t = f / FPS;
  const vis = io(f, 11.4, 70.8, 0.6, 0.45);
  const book = bookState(f);
  // kamera dorong ke penerima (私) saat membahas sudut pandang (S20)
  const cam = 1 + 0.1 * ps(f, 54.4, 55.6);
  // label peran: あげる (S04–S10) → くれる / もらう (S11 dan seterusnya)
  const labelsA = io(f, 12.2, 33.2, 0.35, 0.3);
  const labelsB = io(f, 33.0, 70.6, 0.35, 0.3);
  const threadA = ps(f, 12.0, 12.8) * (1 - ps(f, 32.6, 33.0));
  const threadB = ps(f, 33.1, 33.9) * (1 - ps(f, 70.0, 70.6));

  const expWatashi = t >= 64.0 ? 'surprised' : 'happy';
  const expTomodachi = t >= 28 ? 'happy' : 'excited';
  const bubble = t >= 64.4 && t < 66.2 ? ('exclamation' as const) : undefined;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: vis, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${cam})`, transformOrigin: `${X_HAND_L}px ${FEET_Y}px`}}>
        <Surface
          tone="inset"
          stitch={false}
          radius={36}
          style={{position: 'absolute', left: 70, top: 840, width: 940, height: 480}}
        />
        <div style={{position: 'absolute', left: 110, top: FEET_Y, width: 860, borderTop: `3px dashed ${C.thread}`}} />

        <At x={X_WATASHI} y={884} o={labelsA}>
          <span style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: C.gold}}>PEMBERI</span>
        </At>
        <At x={X_TOMODACHI} y={884} o={labelsA}>
          <span style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: C.indigoSoft}}>PENERIMA</span>
        </At>
        <At x={X_WATASHI} y={884} o={labelsB}>
          <span style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: C.indigoSoft}}>PENERIMA</span>
        </At>
        <At x={X_TOMODACHI} y={884} o={labelsB}>
          <span style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: C.gold}}>PEMBERI</span>
        </At>

        <Threads
          lines={[
            {from: [X_HAND_L, 1000], to: [X_HAND_R, 1000], p: threadA, color: C.gold},
            {from: [X_HAND_R, 1000], to: [X_HAND_L, 1000], p: threadB, color: C.gold},
          ]}
        />

        <Actor x={X_WATASHI} y={FEET_Y} h={330} female expression={expWatashi} bubble={bubble} />
        <Actor x={X_TOMODACHI} y={FEET_Y} h={330} expression={expTomodachi} flip />

        <div
          style={{
            position: 'absolute',
            left: book.x,
            top: book.y,
            transform: `translate(-50%, -50%) scale(${book.s})`,
            opacity: book.o,
          }}
        >
          <BookIcon size={120} glow={0.4} />
        </div>
      </div>
    </div>
  );
};
