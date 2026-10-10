import React from 'react';
import {interpolate, interpolateColors, spring} from 'remotion';
import {EASE, EASE_IO, prog} from '../../shared/anim';
import {C, FONT, FPS} from '../../shared/theme';

// ───────────────────────────── Grammar Motion Engine ─────────────────────────────
// Satu konstruksi = sekumpulan glyph ber-ID tetap. Tiap tahap hanya menyebutkan glyph mana
// yang hadir dan di mana; glyph yang ID-nya sama tidak pernah dirender ulang, cuma berpindah.
// Aksara Jepang (mincho) lebar penuh: 1 glyph = 1em, jadi tata letak cukup dihitung per kotak.

export const GLYPH: Record<string, string> = {
  ben: '勉',
  kyo: '強',
  su: 'す',
  ru: 'る',
  shi: 'し',
  na1: 'な',
  i1: 'い',
  ke: 'け',
  re: 'れ',
  ba: 'ば',
  na2: 'な',
  ra: 'ら',
  na3: 'な',
  i2: 'い',
};

export const SEG = {
  stem: ['ben', 'kyo'],
  suru: ['su', 'ru'],
  shinai: ['shi', 'na1', 'i1'],
  nai: ['na1', 'i1'],
  nakereba: ['na1', 'ke', 're', 'ba'],
  cond: ['ben', 'kyo', 'shi', 'na1', 'ke', 're', 'ba'],
  naranai: ['na2', 'ra', 'na3', 'i2'],
  tailNai: ['na3', 'i2'],
  full: ['ben', 'kyo', 'shi', 'na1', 'ke', 're', 'ba', 'na2', 'ra', 'na3', 'i2'],
};

export interface Pose {
  x: number;
  y: number;
  s: number;
  o: number;
}

export interface Layout {
  /** '_' = spasi antar-komponen */
  lines: string[][];
  size: number;
  cy: number;
  cx?: number;
  /** tepi kiri (rata kiri) — menggantikan cx */
  x0?: number;
  gap?: number;
  lineH?: number;
  /** glyph yang punya tempat di tata letak tapi belum ditampilkan */
  hide?: string[];
}

export const layoutPoses = (L: Layout): Record<string, Pose> => {
  const out: Record<string, Pose> = {};
  const gap = L.gap ?? L.size * 0.5;
  const lineH = (L.lineH ?? 1.26) * L.size;
  const top = L.cy - ((L.lines.length - 1) * lineH) / 2;
  L.lines.forEach((line, li) => {
    const width = line.reduce((a, id) => a + (id === '_' ? gap : L.size), 0);
    let x = L.x0 ?? (L.cx ?? 540) - width / 2;
    for (const id of line) {
      if (id === '_') {
        x += gap;
        continue;
      }
      if (!L.hide?.includes(id)) out[id] = {x: x + L.size / 2, y: top + li * lineH, s: L.size, o: 1};
      x += L.size;
    }
  });
  return out;
};

type Origin = {x: number; y: number; s: number};

export interface Key {
  at: number;
  L: Layout;
  dur?: number;
  /** jeda antar-glyph yang masuk (frame) */
  stagger?: number;
  /** pegas dengan sedikit pantulan — untuk momen "klik" menyatu */
  snap?: boolean;
  /** arah masuk default (relatif terhadap posisi tujuan) */
  enter?: [dx: number, dy: number];
  /** titik asal mutlak per glyph (mis. dari chip komponen) */
  from?: Record<string, Origin>;
  /** titik tujuan mutlak per glyph yang keluar */
  to?: Record<string, Origin>;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Posisi semua glyph pada frame f. Glyph yang tidak hadir tidak ada di hasil. */
export const poseAt = (keys: Key[], f: number): Record<string, Pose> => {
  let state: Record<string, Pose> = {};
  for (const k of keys) {
    if (f < k.at) break;
    const target = layoutPoses(k.L);
    const dur = k.dur ?? 18;
    const next: Record<string, Pose> = {};
    const ids = new Set([...Object.keys(state), ...Object.keys(target)]);
    let enterIdx = 0;
    for (const id of ids) {
      const a = state[id];
      const b = target[id];
      const entering = !a && !!b;
      const delay = entering ? enterIdx++ * (k.stagger ?? 0) : 0;
      const lf = f - k.at - delay;
      const p = k.snap
        ? lf < 0
          ? 0
          : spring({frame: lf, fps: FPS, config: {damping: 13, stiffness: 190, mass: 0.7}})
        : prog(lf, 0, dur, entering ? EASE : EASE_IO);
      if (a && b) {
        next[id] = {x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), s: lerp(a.s, b.s, p), o: 1};
      } else if (b) {
        const o = k.from?.[id] ?? {x: b.x + (k.enter?.[0] ?? 0), y: b.y + (k.enter?.[1] ?? b.s * 0.6), s: b.s};
        next[id] = {x: lerp(o.x, b.x, p), y: lerp(o.y, b.y, p), s: lerp(o.s, b.s, p), o: Math.min(1, p * 2.2)};
      } else if (a) {
        // keluar lebih cepat daripada masuk
        const q = prog(f - k.at, 0, dur * 0.6, (t) => t * t);
        if (q < 1) {
          const d = k.to?.[id] ?? {x: a.x, y: a.y + a.s * 0.75, s: a.s};
          next[id] = {x: lerp(a.x, d.x, q), y: lerp(a.y, d.y, q), s: lerp(a.s, d.s, q), o: 1 - q};
        }
      }
    }
    state = next;
  }
  return state;
};

/** Kotak pembatas segmen (untuk bracket, sorotan, garis penghubung). */
export const segBox = (poses: Record<string, Pose>, ids: string[]) => {
  const ps = ids.map((id) => poses[id]).filter(Boolean);
  if (!ps.length) return null;
  const l = Math.min(...ps.map((p) => p.x - p.s / 2));
  const r = Math.max(...ps.map((p) => p.x + p.s / 2));
  const t = Math.min(...ps.map((p) => p.y - p.s / 2));
  const b = Math.max(...ps.map((p) => p.y + p.s / 2));
  return {l, r, t, b, cx: (l + r) / 2, cy: (t + b) / 2, w: r - l, h: b - t, o: Math.min(...ps.map((p) => p.o))};
};

/** Warna berjenjang: [[frame, warna], ...] dengan peralihan halus 8 frame. */
export const colorAt = (f: number, stops: [number, string][]) => {
  let c = stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    const [at, col] = stops[i];
    if (f < at) break;
    c = interpolateColors(f, [at, at + 8], [stops[i - 1][1], col]);
    if (f >= at + 8) c = col;
  }
  return c;
};

const BASE = 200;

export const GlyphLine: React.FC<{
  poses: Record<string, Pose>;
  color: (id: string) => string;
  glow?: (id: string) => number;
  opacity?: number;
  font?: string;
}> = ({poses, color, glow, opacity = 1, font = FONT.jp}) => (
  <>
    {Object.entries(poses).map(([id, p]) => {
      const g = glow?.(id) ?? 0;
      const col = color(id);
      return (
        <div
          key={id}
          style={{
            position: 'absolute',
            left: p.x - BASE / 2,
            top: p.y - BASE / 2,
            width: BASE,
            height: BASE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: font,
            fontWeight: 900,
            fontSize: BASE,
            lineHeight: 1,
            color: col,
            opacity: p.o * opacity,
            transform: `scale(${p.s / BASE})`,
            textShadow: `0 ${BASE * 0.04}px ${BASE * 0.12}px rgba(0,0,0,0.6)${g > 0.01 ? `, 0 0 ${BASE * 0.3 * g}px ${col}` : ''}`,
            whiteSpace: 'nowrap',
          }}
        >
          {GLYPH[id]}
        </div>
      );
    })}
  </>
);

/** Baris statis (tangga rekap, chip) — tata letak sama dengan engine. */
export const StaticRow: React.FC<{
  ids: string[];
  size: number;
  x0: number;
  cy: number;
  color: (id: string) => string;
  opacity?: number;
}> = ({ids, size, x0, cy, color, opacity = 1}) => (
  <GlyphLine poses={layoutPoses({lines: [ids], size, cy, x0})} color={color} opacity={opacity} />
);

// ───────────────────────────── Primitif visual ─────────────────────────────

export const fadeIO = (f: number, a: number, b: number, inF = 8, outF = 8) =>
  Math.min(prog(f, a, inF, (t) => t), 1 - prog(f, b - outF, outF, (t) => t));

export const springAt = (f: number, at: number, bouncy = false) =>
  f < at
    ? 0
    : spring({
        frame: f - at,
        fps: FPS,
        config: bouncy ? {damping: 10, stiffness: 170, mass: 0.7} : {damping: 17, stiffness: 140, mass: 0.85},
      });

export const riseStyle = (p: number, dy = 26): React.CSSProperties => ({
  opacity: Math.min(1, p * 1.4),
  transform: `translateY(${(1 - p) * dy}px)`,
});

/** Kartu khas SevnQuest: permukaan taktil + jahitan sashiko putus-putus di dalam. */
export const Card: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: string;
  dashed?: boolean;
  fill?: string;
  opacity?: number;
  scale?: number;
  rotate?: number;
  radius?: number;
  glow?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({x, y, w, h, accent, dashed, fill = C.card, opacity = 1, scale = 1, rotate = 0, radius = 28, glow = 0, style, children}) => (
  <div
    style={{
      position: 'absolute',
      left: x - w / 2,
      top: y - h / 2,
      width: w,
      height: h,
      borderRadius: radius,
      background: dashed ? 'rgba(25,29,38,0.55)' : fill,
      border: dashed ? `3px dashed ${accent ?? C.thread}` : `1.5px solid ${accent ? accent + '88' : C.borderSubtle}`,
      boxShadow: dashed
        ? 'none'
        : `0 20px 50px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)${glow > 0.01 && accent ? `, 0 0 ${50 * glow}px ${accent}66` : ''}`,
      opacity,
      transform: `scale(${scale}) rotate(${rotate}deg)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {!dashed && (
      <div
        style={{
          position: 'absolute',
          inset: 9,
          borderRadius: radius - 8,
          border: `2px dashed ${accent ? accent + '55' : C.thread}`,
          pointerEvents: 'none',
        }}
      />
    )}
    {children}
  </div>
);

export const Pill: React.FC<{
  x: number;
  y: number;
  color?: string;
  size?: number;
  opacity?: number;
  scale?: number;
  filled?: boolean;
  children: React.ReactNode;
}> = ({x, y, color = C.gold, size = 26, opacity = 1, scale = 1, filled, children}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      padding: `${size * 0.36}px ${size * 0.85}px`,
      borderRadius: 999,
      background: filled ? color : `${color}26`,
      border: `1.5px solid ${color}77`,
      color: filled ? C.bgDeep : color,
      fontFamily: FONT.mono,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: size * 0.08,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      opacity,
    }}
  >
    {children}
  </div>
);

export const Txt: React.FC<{
  x: number;
  y: number;
  size: number;
  color?: string;
  font?: string;
  weight?: number;
  opacity?: number;
  scale?: number;
  align?: 'center' | 'left';
  spacing?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({x, y, size, color = C.text, font = FONT.display, weight = 800, opacity = 1, scale = 1, align = 'center', spacing = 0, style, children}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${align === 'center' ? '-50%' : '0'}, -50%) scale(${scale})`,
      transformOrigin: align === 'center' ? 'center' : 'left center',
      fontFamily: font,
      fontWeight: weight,
      fontSize: size,
      lineHeight: 1.12,
      letterSpacing: spacing,
      color,
      opacity,
      whiteSpace: 'nowrap',
      textAlign: align,
      textShadow: '0 4px 20px rgba(0,0,0,0.6)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Kurung siku di bawah segmen + garis turun ke penjelasannya. */
export const Bracket: React.FC<{
  box: {l: number; r: number; b: number; cx: number} | null;
  color: string;
  p: number;
  dropTo?: number;
  dropX?: number;
  inset?: number;
}> = ({box, color, p, dropTo, dropX, inset = 8}) => {
  if (!box || p <= 0.001) return null;
  const y = box.b + 12;
  const l = box.l + inset;
  const r = box.r - inset;
  const mid = (l + r) / 2;
  const half = ((r - l) / 2) * p;
  const tx = dropX ?? mid;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <path
        d={`M${mid - half} ${y - 10} V${y} H${mid + half} V${y - 10}`}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={Math.min(1, p * 2)}
      />
      {dropTo !== undefined && (
        <path
          d={`M${mid} ${y} C${mid} ${lerp(y, dropTo, 0.5)} ${tx} ${lerp(y, dropTo, 0.5)} ${tx} ${dropTo}`}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray="10 9"
          strokeLinecap="round"
          opacity={interpolate(p, [0.4, 1], [0, 0.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        />
      )}
    </svg>
  );
};

/** Baris arti: kata lama bergeser memberi tempat ketika kata baru masuk. */
export const MeaningLine: React.FC<{
  f: number;
  x: number;
  y: number;
  size: number;
  opacity?: number;
  words: {text: string; at: number; color?: string; out?: number}[];
}> = ({f, x, y, size, opacity = 1, words}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      width: 1080,
      top: y - size * 0.6,
      height: size * 1.2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: x - 540,
      fontFamily: FONT.display,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1,
      opacity,
      textShadow: '0 4px 20px rgba(0,0,0,0.6)',
    }}
  >
    {words.map((w, i) => {
      const p = prog(f, w.at, 14) * (w.out !== undefined ? 1 - prog(f, w.out, 10) : 1);
      if (p <= 0.001) return null;
      const est = w.text.length * size * 0.66 + size * 0.34;
      return (
        <div
          key={i}
          style={{
            width: est * p,
            overflow: 'visible',
            display: 'flex',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            color: w.color ?? C.text,
            opacity: Math.min(1, p * 1.5),
            transform: `translateY(${(1 - p) * -22}px) scale(${0.8 + 0.2 * p})`,
          }}
        >
          {w.text}
        </div>
      );
    })}
  </div>
);

/** Subtitle dua baris: kata muncul mengikuti tempo bicara; kata Jepang diberi warna emas. */
export const Sub: React.FC<{f: number; text: string; dur: number}> = ({f, text, dur}) => {
  const words = text.split(' ');
  const total = words.reduce((a, w) => a + w.length + 1, 0);
  let acc = 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: 1480,
        height: 150,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        columnGap: 13,
        rowGap: 4,
        fontFamily: `${FONT.body}, "Noto Sans JP"`,
        fontWeight: 700,
        fontSize: text.length > 62 ? 38 : 43,
        lineHeight: 1.24,
        color: C.text,
        textShadow: '0 3px 18px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)',
        opacity: 1 - prog(f, dur - 4, 4, (t) => t),
      }}
    >
      {words.map((w, i) => {
        const at = 1 + (acc / total) * dur * 0.82;
        acc += w.length + 1;
        const p = prog(f, at, 6);
        const jp = /[぀-ヿ一-龯]/.test(w);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${(1 - p) * 12}px)`,
              color: jp ? C.gold : C.text,
              fontWeight: jp ? 900 : 700,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export {lerp};
