import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {BOUNCY, EASE, SOFT, SPRING, clamp, pop, prog} from '../../shared/anim';
import {C, FONT, FPS} from '../../shared/theme';
export {sec} from './timing';

// ---------- waktu (detik lokal di dalam Sequence) ----------
export const useT = () => useCurrentFrame() / FPS;
export const ps = (t: number, a: number, b: number, e: (x: number) => number = EASE) =>
  prog(t * FPS, a * FPS, Math.max(1, (b - a) * FPS), e);
export const pp = (t: number, at: number, cfg = SPRING) => pop(t * FPS, FPS, at * FPS, cfg);
export const bump = (t: number, a: number, b: number) =>
  Math.sin(Math.PI * clamp((t - a) / (b - a)));
export {BOUNCY, SOFT, SPRING};

export const hexA = (hex: string, a: number) =>
  hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0');

// ---------- identitas bentuk: RU = indigo, TA = gold ----------
export type Form = 'ru' | 'ta';
export const FORM = {
  ru: {color: C.indigoSoft, solid: C.indigo, ch: 'る', tag: 'る-form'},
  ta: {color: C.gold, solid: C.gold, ch: 'た', tag: 'た-form'},
} as const;

export const JpSpan: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
  children,
  style,
}) => <span style={{fontFamily: FONT.jp, fontWeight: 900, ...style}}>{children}</span>;

// ---------- kalimat: [kanji+furigana][kana][る/た]ほうがいい ----------
export const VERB_PAD = 0.12;
export const verbWidth = (chars: number, size: number) => chars * size + 2 * VERB_PAD * size;

export const VerbSentence: React.FC<{
  kanji: string;
  ruby: string;
  kana?: string;
  end: Form;
  size?: number;
  hlVerb?: number; // 0..1 pill + garis bawah di kata kerja
  hlEnd?: number; // 0..1 penekanan huruf akhir (る/た)
  tail?: number; // opacity ほうがいい
  style?: React.CSSProperties;
}> = ({kanji, ruby, kana = '', end, size = 108, hlVerb = 0, hlEnd = 0, tail = 1, style}) => {
  const acc = FORM[end];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: FONT.jp,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.45,
        whiteSpace: 'nowrap',
        color: C.text,
        textShadow: '0 6px 24px rgba(0,0,0,0.55)',
        ...style,
      }}
    >
      <span
        style={{
          position: 'relative',
          padding: `0 ${size * VERB_PAD}px`,
          borderRadius: size * 0.2,
          background: hexA(acc.color, 0.16 * hlVerb),
          boxShadow: hlVerb > 0.02 ? `0 0 ${40 * hlVerb}px ${hexA(acc.color, 0.22 * hlVerb)}` : undefined,
          color: hlVerb > 0.3 ? acc.color : C.text,
        }}
      >
        <ruby style={{rubyAlign: 'center'}}>
          {kanji}
          <rt
            style={{
              fontSize: size * 0.26,
              fontWeight: 700,
              color: C.gold,
              letterSpacing: 1,
              fontFamily: FONT.jp,
              textShadow: 'none',
            }}
          >
            {ruby}
          </rt>
        </ruby>
        {kana}
        <span
          style={{
            display: 'inline-block',
            transformOrigin: '50% 80%',
            transform: `scale(${1 + 0.38 * hlEnd})`,
            color: hlEnd > 0.02 ? acc.color : 'inherit',
            textShadow: hlEnd > 0.02 ? `0 0 ${34 * hlEnd}px ${hexA(acc.color, 0.8)}` : undefined,
          }}
        >
          {acc.ch}
        </span>
        <span
          style={{
            position: 'absolute',
            left: size * VERB_PAD,
            right: size * VERB_PAD,
            bottom: size * 0.2,
            height: Math.max(4, size * 0.05),
            borderRadius: 4,
            background: acc.color,
            transformOrigin: '0 50%',
            transform: `scaleX(${hlVerb})`,
            opacity: hlVerb > 0.02 ? 1 : 0,
          }}
        />
      </span>
      <span style={{opacity: tail}}>ほうがいい</span>
    </div>
  );
};

// ---------- rumus: Vる + ほうがいい ----------
export const Formula: React.FC<{end: Form; size?: number; tailColor?: string}> = ({
  end,
  size = 88,
  tailColor = C.text,
}) => {
  const acc = FORM[end];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: size * 0.28,
        whiteSpace: 'nowrap',
        textShadow: '0 6px 24px rgba(0,0,0,0.5)',
      }}
    >
      <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: size, color: C.text}}>
        V
        <JpSpan style={{color: acc.color, textShadow: `0 0 28px ${hexA(acc.color, 0.55)}`}}>{acc.ch}</JpSpan>
      </span>
      <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: size * 0.7, color: C.textSecondary}}>+</span>
      <JpSpan style={{fontSize: size * 0.82, color: tailColor}}>ほうがいい</JpSpan>
    </div>
  );
};

// ---------- posisi absolut berpusat vertikal ----------
export const AtY: React.FC<{
  y: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({y, children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: y,
      transform: 'translateY(-50%)',
      display: 'flex',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

// ---------- teks storyboard (TEXT) di zona caption 9:16 ----------
export const Cap: React.FC<{
  t: number;
  at: number;
  until?: number;
  size?: number;
  y?: number;
  children: React.ReactNode;
}> = ({t, at, until, size = 62, y = 1500, children}) => {
  if (t < at) return null;
  if (until !== undefined && t > until + 0.3) return null;
  const p = pp(t, at, SOFT);
  const out = until === undefined ? 0 : ps(t, until, until + 0.25, (x) => x);
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: y,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: FONT.display,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.12,
        color: C.text,
        textShadow: '0 8px 30px rgba(0,0,0,0.85)',
        opacity: p * (1 - out),
        transform: `translateY(${(1 - p) * 34}px)`,
      }}
    >
      <span>{children}</span>
    </div>
  );
};

export const Hi: React.FC<{c?: string; children: React.ReactNode}> = ({c = C.gold, children}) => (
  <span style={{color: c, textShadow: `0 0 26px ${hexA(c, 0.5)}`}}>{children}</span>
);

// ---------- karakter SevnQuest (avatar tier asli) ----------
export const Avatar: React.FC<{
  tier?: number;
  height: number;
  style?: React.CSSProperties;
}> = ({tier = 1, height, style}) => (
  <Img
    src={staticFile(`avatars/male/tier-${tier}.png`)}
    style={{
      height,
      width: 'auto',
      imageRendering: 'pixelated',
      filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.6))',
      ...style,
    }}
  />
);

// ---------- ikon sederhana lokal (tidak ada aset bulan/matahari di repo) ----------
export const MoonIcon: React.FC<{size?: number; color?: string}> = ({size = 150, color = C.indigoSoft}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{filter: `drop-shadow(0 0 18px ${hexA(color, 0.45)})`}}>
    <path d="M62 14a38 38 0 1 0 24 62A32 32 0 0 1 62 14Z" fill={color} />
    <circle cx="78" cy="28" r="3.2" fill={C.goldSoft} />
    <circle cx="88" cy="46" r="2.2" fill={C.goldSoft} />
  </svg>
);

export const SunIcon: React.FC<{size?: number; color?: string; spin?: number}> = ({
  size = 150,
  color = C.gold,
  spin = 0,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{filter: `drop-shadow(0 0 22px ${hexA(color, 0.55)})`}}>
    <g transform={`rotate(${spin} 50 50)`} stroke={color} strokeWidth={6} strokeLinecap="round">
      {Array.from({length: 8}).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <path
            key={i}
            d={`M${50 + Math.cos(a) * 33} ${50 + Math.sin(a) * 33}L${50 + Math.cos(a) * 44} ${50 + Math.sin(a) * 44}`}
          />
        );
      })}
    </g>
    <circle cx="50" cy="50" r="22" fill={color} />
    <circle cx="50" cy="50" r="22" fill="url(#sunShine)" />
    <defs>
      <radialGradient id="sunShine" cx="40%" cy="35%" r="70%">
        <stop offset="0" stopColor={C.goldSoft} stopOpacity={0.9} />
        <stop offset="1" stopColor={C.gold} stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);

// ---------- wrapper blok: fade masuk/keluar ----------
export const BlockFade: React.FC<{
  dur: number; // frame
  inF?: number;
  outF?: number;
  children: React.ReactNode;
}> = ({dur, inF = 6, outF = 6, children}) => {
  const f = useCurrentFrame();
  const a = inF > 0 ? prog(f, 0, inF, (x) => x) : 1;
  const b = outF > 0 ? 1 - prog(f, dur - outF, outF, (x) => x) : 1;
  return <div style={{position: 'absolute', inset: 0, opacity: Math.min(a, b)}}>{children}</div>;
};
