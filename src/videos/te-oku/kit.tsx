import React, {createContext, useContext} from 'react';
import {interpolate, spring} from 'remotion';
import {BOUNCY, EASE, EASE_IO, SPRING, clamp, pop, prog} from '../../shared/anim';
import {C, FONT, FPS, SAFE} from '../../shared/theme';
import {CUES} from './timing';

// ───────────────────────────── waktu ─────────────────────────────
// Semua babak membaca frame ABSOLUT video lewat context, jadi elemen bisa menyeberang antarbabak
// dan setiap anchor di kode = detik narasi di storyboard.
export const FrameCtx = createContext(0);
export const useF = () => useContext(FrameCtx);

const lin = (t: number) => t;

/** progress 0..1 antara detik a dan b */
export const ps = (f: number, a: number, b: number, e: (t: number) => number = EASE) =>
  prog(f, a * FPS, Math.max(1, (b - a) * FPS), e);

/** spring pop yang mulai di detik `at` */
export const sp = (f: number, at: number, cfg = SPRING) => pop(f, FPS, at * FPS, cfg);

/** hadir di antara a..b dengan fade masuk/keluar (detik) */
export const io = (f: number, a: number, b: number, inS = 0.2, outS = 0.2) =>
  Math.min(ps(f, a, a + inS, lin), 1 - ps(f, b - outS, b, lin));

/** denyut 0 → 1 → 0 */
export const bump = (f: number, a: number, b: number) => Math.sin(Math.PI * clamp((f / FPS - a) / (b - a)));

/** keyframe [detik, nilai] */
export const kf = (f: number, keys: [number, number][], e: (t: number) => number = EASE_IO) =>
  interpolate(
    f,
    keys.map((k) => k[0] * FPS),
    keys.map((k) => k[1]),
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e},
  );

export const hexA = (hex: string, a: number) =>
  hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0');

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export {BOUNCY, EASE, EASE_IO, SPRING};
export {EASE_IN} from '../../shared/anim';
export {T} from './timing';

// ───────────────────────────── tata letak ─────────────────────────────
/** Elemen yang ditambatkan di titik tengahnya pada kanvas 1080×1920. */
export const At: React.FC<{
  x?: number;
  y: number;
  s?: number;
  o?: number;
  r?: number;
  z?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({x = 540, y, s = 1, o = 1, r = 0, z, style, children}) =>
  o <= 0.001 ? null : (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${s}) rotate(${r}deg)`,
        opacity: o,
        zIndex: z,
        ...style,
      }}
    >
      {children}
    </div>
  );

// ───────────────────────────── tipografi ─────────────────────────────
export const Big: React.FC<{size: number; color?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({
  size,
  color = C.text,
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT.display,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: -size * 0.01,
      color,
      whiteSpace: 'nowrap',
      textShadow: '0 8px 30px rgba(0,0,0,0.65)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Kata-kata naik dari balik mask pada detik masing-masing. */
export const MaskWords: React.FC<{
  f: number;
  words: {t: string; at: number; color?: string}[];
  size: number;
  out?: number; // detik mulai keluar
  style?: React.CSSProperties;
}> = ({f, words, size, out, style}) => {
  const exit = out === undefined ? 0 : ps(f, out, out + 0.25, (t) => t * t);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        columnGap: size * 0.26,
        fontFamily: FONT.display,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.04,
        whiteSpace: 'nowrap',
        textShadow: '0 8px 30px rgba(0,0,0,0.6)',
        ...style,
      }}
    >
      {words.map((w, i) => {
        const p = sp(f, w.at, {damping: 20, stiffness: 150, mass: 0.8});
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', paddingBottom: size * 0.16, marginBottom: -size * 0.16}}>
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${(1 - p) * 125 - exit * 125}%)`,
                color: w.color ?? C.text,
              }}
            >
              {w.t}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Satu aksara Jepang selebar 1em, dengan furigana opsional di atasnya. */
export const Kana: React.FC<{ch: string; ruby?: string; size: number; color?: string; glow?: number; style?: React.CSSProperties}> = ({
  ch,
  ruby,
  size,
  color = C.text,
  glow = 0,
  style,
}) => (
  <span
    style={{
      position: 'relative',
      display: 'inline-block',
      width: size,
      textAlign: 'center',
      fontFamily: FONT.jp,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1,
      color,
      textShadow:
        glow > 0.01
          ? `0 0 ${size * 0.3 * glow}px ${hexA(C.gold, 0.6 * glow)}, 0 6px 18px rgba(0,0,0,0.7)`
          : '0 6px 18px rgba(0,0,0,0.7)',
      ...style,
    }}
  >
    {ruby && (
      <span
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '100%',
          transform: 'translateX(-50%)',
          marginBottom: size * 0.06,
          fontSize: Math.max(22, size * 0.28),
          fontWeight: 700,
          letterSpacing: 1,
          color: C.gold,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        }}
      >
        {ruby}
      </span>
    )}
    {ch}
  </span>
);

// ───────────────────────────── mesin glyph ─────────────────────────────
// Satu kata = sekumpulan glyph ber-ID tetap. Tiap tahap hanya menyebut glyph mana yang hadir;
// glyph yang ID-nya sama tidak dirender ulang, cuma berpindah (食べ[てしま]う → 食べ[ちゃ]う).
export interface Pose {
  x: number;
  y: number;
  s: number;
  o: number;
}
type Origin = {x: number; y: number; s: number};

export interface GKey {
  at: number; // detik
  dur?: number; // detik
  row: string[];
  size: number;
  cy: number;
  cx?: number;
  /** pegas dengan pantulan ringan — terasa "santai" */
  snap?: boolean;
  stagger?: number; // detik antar-glyph yang masuk
  enter?: [dx: number, dy: number];
  from?: Record<string, Origin>;
  to?: Record<string, Origin>;
}

const rowPoses = (k: GKey): Record<string, Pose> => {
  const out: Record<string, Pose> = {};
  const x0 = (k.cx ?? 540) - (k.row.length * k.size) / 2;
  k.row.forEach((id, i) => {
    out[id] = {x: x0 + (i + 0.5) * k.size, y: k.cy, s: k.size, o: 1};
  });
  return out;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const glyphPoses = (keys: GKey[], f: number): Record<string, Pose> => {
  let state: Record<string, Pose> = {};
  for (const k of keys) {
    const at = k.at * FPS;
    if (f < at) break;
    const target = rowPoses(k);
    const dur = (k.dur ?? 0.55) * FPS;
    const next: Record<string, Pose> = {};
    const ids = Object.keys(state).concat(Object.keys(target).filter((id) => !(id in state)));
    let enterIdx = 0;
    for (const id of ids) {
      const a = state[id];
      const b = target[id];
      const entering = !a && !!b;
      const lf = f - at - (entering ? enterIdx++ * (k.stagger ?? 0) * FPS : 0);
      const p = k.snap
        ? lf < 0
          ? 0
          : spring({frame: lf, fps: FPS, config: {damping: 12, stiffness: 200, mass: 0.7}})
        : prog(lf, 0, dur, entering ? EASE : EASE_IO);
      if (a && b) {
        next[id] = {x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), s: lerp(a.s, b.s, p), o: 1};
      } else if (b) {
        const o = k.from?.[id] ?? {x: b.x + (k.enter?.[0] ?? 0), y: b.y + (k.enter?.[1] ?? b.s * 0.5), s: b.s};
        next[id] = {x: lerp(o.x, b.x, p), y: lerp(o.y, b.y, p), s: lerp(o.s, b.s, p), o: clamp(p * 2.4)};
      } else if (a) {
        const q = prog(f - at, 0, dur * 0.55, (t) => t * t);
        if (q < 1) {
          const d = k.to?.[id] ?? {x: a.x, y: a.y + a.s * 0.6, s: a.s};
          next[id] = {x: lerp(a.x, d.x, q), y: lerp(a.y, d.y, q), s: lerp(a.s, d.s, q), o: 1 - q};
        }
      }
    }
    state = next;
  }
  return state;
};

/** Kotak pembatas sekelompok glyph (untuk sorotan yang ikut bergerak). */
export const segBox = (poses: Record<string, Pose>, ids: string[]) => {
  const ps_ = ids.map((id) => poses[id]).filter(Boolean);
  if (!ps_.length) return null;
  const x0 = Math.min(...ps_.map((p) => p.x - p.s / 2));
  const x1 = Math.max(...ps_.map((p) => p.x + p.s / 2));
  const s = Math.max(...ps_.map((p) => p.s));
  const y = ps_.reduce((a, p) => a + p.y, 0) / ps_.length;
  return {x0, x1, y, s};
};

export const Glyphs: React.FC<{
  poses: Record<string, Pose>;
  chars: Record<string, {ch: string; ruby?: string}>;
  color: (id: string) => string;
}> = ({poses, chars, color}) => (
  <>
    {Object.keys(poses).map((id) => {
      const p = poses[id];
      return (
        <div
          key={id}
          style={{position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -50%)', opacity: p.o}}
        >
          <Kana ch={chars[id].ch} ruby={chars[id].ruby} size={p.s} color={color(id)} />
        </div>
      );
    })}
  </>
);

// ───────────────────────────── benang penghubung ─────────────────────────────
export interface Thread {
  from: [number, number];
  to: [number, number];
  p: number; // 0..1 tergambar
  o?: number;
  color?: string;
  /** titik berjalan 0..1 sepanjang benang */
  dot?: number;
}

export const Threads: React.FC<{lines: Thread[]}> = ({lines}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}>
    {lines.map((l, i) => {
      if (l.p <= 0.001 || (l.o ?? 1) <= 0.001) return null;
      const [x0, y0] = l.from;
      const x1 = lerp(x0, l.to[0], l.p);
      const y1 = lerp(y0, l.to[1], l.p);
      const color = l.color ?? C.gold;
      return (
        <g key={i} opacity={l.o ?? 1}>
          <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray="14 12" strokeOpacity={0.85} />
          <circle cx={x0} cy={y0} r={7} fill={color} />
          <circle cx={x1} cy={y1} r={9} fill={C.bg} stroke={color} strokeWidth={4} />
          {l.dot !== undefined && l.dot > 0 && l.dot < 1 && (
            <circle cx={lerp(x0, l.to[0], l.dot)} cy={lerp(y0, l.to[1], l.dot)} r={11} fill={C.goldSoft} style={{filter: `drop-shadow(0 0 10px ${C.gold})`}} />
          )}
        </g>
      );
    })}
  </svg>
);

// ───────────────────────────── subtitle ─────────────────────────────
const CAPTION_FONT = '"Plus Jakarta Sans", "Noto Sans JP", sans-serif';

export const VoCaption: React.FC<{f: number}> = ({f}) => {
  const cue = CUES.find((c) => f >= c.from && f < c.to + 4);
  if (!cue) return null;
  const dur = cue.to - cue.from;
  // *kata kunci* → emas
  const parts = cue.text.split('*').map((t, i) => ({t, hot: i % 2 === 1}));
  const words: {t: string; hot: boolean}[] = [];
  for (const p of parts) {
    p.t.split(' ').forEach((w, i) => {
      if (!w) return;
      // tanda baca setelah kata kunci menempel ke kata itu, bukan jadi "kata" sendiri
      if (i === 0 && words.length && /^[.,?!。”]/.test(w)) words[words.length - 1].t += w;
      else words.push({t: w, hot: p.hot});
    });
  }
  const total = words.reduce((a, w) => a + w.t.length + 1, 0);
  const fade = Math.min(1, 1 - prog(f, cue.to - 2, 6, (t) => t));
  let acc = 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: SAFE.captionTop,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: cue.text.indexOf(' ') >= 0 ? 13 : 0, // kalimat Jepang tidak berspasi
        rowGap: 4,
        fontFamily: CAPTION_FONT,
        fontWeight: 700,
        fontSize: 46,
        lineHeight: 1.24,
        color: C.text,
        textShadow: '0 3px 18px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)',
        opacity: fade,
        zIndex: 80,
      }}
    >
      {words.map((w, i) => {
        const at = cue.from + (acc / total) * dur * 0.6;
        acc += w.t.length + 1;
        const p = prog(f, at, 6);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${(1 - p) * 14}px)`,
              color: w.hot ? C.gold : C.text,
              fontWeight: w.hot ? 800 : 700,
              textShadow: w.hot ? '0 0 26px rgba(240,190,82,0.45), 0 3px 18px rgba(0,0,0,0.85)' : undefined,
            }}
          >
            {w.t}
          </span>
        );
      })}
    </div>
  );
};
