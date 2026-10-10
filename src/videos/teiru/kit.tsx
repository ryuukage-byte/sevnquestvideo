import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {BOUNCY, EASE, EASE_IN, EASE_IO, SOFT, SPRING, clamp, mix, pop, prog} from '../../shared/anim';
import {C, FONT, FPS} from '../../shared/theme';
import {Surface} from '../../shared/components/ui';

export {BOUNCY, EASE, EASE_IN, EASE_IO, SOFT, SPRING, mix};
export {sec} from './timing';

// Waktu lokal dalam sequence (detik)
export const useT = () => useCurrentFrame() / FPS;

// Waktu absolut storyboard di dalam sebuah dunia
export const useAbs = (start: number) => useT() + start;

export const ps = (t: number, a: number, b: number, e: (x: number) => number = EASE) =>
  prog(t * FPS, a * FPS, Math.max(1, (b - a) * FPS), e);

export const pp = (t: number, at: number, cfg = SPRING) => pop(t * FPS, FPS, at * FPS, cfg);

export const bump = (t: number, a: number, b: number) =>
  Math.sin(Math.PI * clamp((t - a) / (b - a)));

export const hexA = (hex: string, a: number) =>
  hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0');

// Jendela tampil: masuk di a, keluar di b
export const Win: React.FC<{
  T: number;
  a: number;
  b: number;
  dy?: number;
  inD?: number;
  outD?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({T, a, b, dy = 40, inD = 0.5, outD = 0.35, children, style}) => {
  if (T < a || T > b + outD) return null;
  const i = ps(T, a, a + inD);
  const o = ps(T, b, b + outD, (x) => x);
  return (
    <AbsoluteFill
      style={{
        opacity: i * (1 - o),
        transform: `translateY(${(1 - i) * dy - o * 24}px)`,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Posisikan elemen tepat di (x, y)
export const At: React.FC<{
  x?: number;
  y: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x = 540, y, children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

// Teks Jepang dengan font Noto Serif JP
export const Jp: React.FC<{
  size: number;
  color?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({size, color = C.text, style, children}) => (
  <span
    style={{
      fontFamily: FONT.jp,
      fontWeight: 900,
      fontSize: size,
      color,
      lineHeight: 1.15,
      whiteSpace: 'nowrap',
      textShadow: '0 6px 24px rgba(0,0,0,0.65)',
      ...style,
    }}
  >
    {children}
  </span>
);

export const JpSpan = Jp;

// Label display
export const Label: React.FC<{
  size?: number;
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({size = 52, color = C.text, children, style}) => (
  <span
    style={{
      fontFamily: FONT.display,
      fontWeight: 800,
      fontSize: size,
      color,
      lineHeight: 1.1,
      textAlign: 'center',
      textShadow: '0 8px 30px rgba(0,0,0,0.85)',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </span>
);

// Caption di zona aman bawah (1470 - 1640)
export const Cap: React.FC<{
  t: number;
  at: number;
  until?: number;
  size?: number;
  y?: number;
  children: React.ReactNode;
}> = ({t, at, until, size = 52, y = 1520, children}) => {
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
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: FONT.display,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.2,
        color: C.text,
        textShadow: '0 8px 30px rgba(0,0,0,0.9)',
        opacity: p * (1 - out),
        transform: `translateY(${(1 - p) * 28}px)`,
        pointerEvents: 'none',
      }}
    >
      <span>{children}</span>
    </div>
  );
};

export const Hi: React.FC<{c?: string; children: React.ReactNode}> = ({
  c = C.gold,
  children,
}) => (
  <span style={{color: c, textShadow: `0 0 26px ${hexA(c, 0.55)}`}}>
    {children}
  </span>
);

// Garis kurva / lurus dengan dash animasi
export const Line: React.FC<{
  d: string;
  p: number;
  color?: string;
  w?: number;
  head?: {x: number; y: number; rot: number};
}> = ({d, p, color = C.indigoSoft, w = 6, head}) => (
  <svg
    width={1080}
    height={1920}
    style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}
  >
    <path
      d={d}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      fill="none"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - p}
    />
    {head && p > 0.95 && (
      <g transform={`translate(${head.x} ${head.y}) rotate(${head.rot})`}>
        <path
          d="M-18 -16L0 4L18 -16"
          stroke={color}
          strokeWidth={w}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    )}
  </svg>
);

// Coretan merah animasi (Strike)
export const Strike: React.FC<{
  p: number;
  color?: string;
  height?: number;
  children: React.ReactNode;
}> = ({p, color = C.hanko, height = 12, children}) => (
  <span style={{position: 'relative', display: 'inline-block'}}>
    {children}
    <span
      style={{
        position: 'absolute',
        left: -12,
        right: -12,
        top: '52%',
        height,
        borderRadius: height / 2,
        background: color,
        boxShadow: `0 0 24px ${hexA(color, 0.75)}`,
        transformOrigin: '0 50%',
        transform: `scaleX(${p}) rotate(-3deg)`,
      }}
    />
  </span>
);

// Kartu kaca / Surface bergaya SevnQuest
export const GCard: React.FC<{
  color?: string;
  w?: number;
  h?: number;
  glow?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({color = C.gold, w, h, glow = 0, children, style}) => (
  <Surface
    tone="elevated"
    radius={40}
    border={hexA(color, 0.55 + 0.45 * glow)}
    style={{
      width: w,
      height: h,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 38px',
      boxShadow: `0 20px 50px rgba(0,0,0,0.65), 0 0 ${60 * glow}px ${hexA(color, 0.4 * glow)}`,
      ...style,
    }}
  >
    {children}
  </Surface>
);

// Bubble chat SevnQuest
export const ChatBubble: React.FC<{
  mine?: boolean;
  width?: number;
  size?: number;
  children: React.ReactNode;
  tint?: string;
}> = ({mine = false, width, size = 42, children, tint}) => (
  <div
    style={{
      width,
      padding: `${size * 0.52}px ${size * 0.75}px`,
      borderRadius: size * 0.8,
      borderBottomRightRadius: mine ? size * 0.2 : size * 0.8,
      borderBottomLeftRadius: mine ? size * 0.8 : size * 0.2,
      background: mine
        ? 'linear-gradient(180deg, #446498 0%, #2f4973 100%)'
        : 'linear-gradient(180deg, #2c3345 0%, #202636 100%)',
      border: `2px solid ${tint ?? (mine ? C.indigo : C.borderPrimary)}`,
      boxShadow: '0 14px 34px rgba(0,0,0,0.5)',
      fontFamily: FONT.body,
      fontWeight: 700,
      fontSize: size,
      color: C.text,
      lineHeight: 1.3,
    }}
  >
    {children}
  </div>
);

// Karakter Avatar dari aset asli (mendukung male dan female)
export const Avatar: React.FC<{
  tier?: number;
  female?: boolean;
  height: number;
  style?: React.CSSProperties;
}> = ({tier = 1, female = false, height, style}) => (
  <Img
    src={staticFile(female ? `avatars/female/tier-${tier}.png` : `avatars/male/tier-${tier}.png`)}
    style={{
      height,
      width: 'auto',
      imageRendering: 'pixelated',
      filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.65))',
      ...style,
    }}
  />
);

// Lingkaran Quiz Countdown (○ ○ ○ → ● ● ●)
export const QuizCircles: React.FC<{step: number; size?: number}> = ({
  step,
  size = 32,
}) => (
  <div style={{display: 'flex', gap: 20, alignItems: 'center'}}>
    {[0, 1, 2].map((idx) => {
      const active = step > idx;
      return (
        <div
          key={idx}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: active ? C.gold : 'transparent',
            border: `3px solid ${active ? C.gold : C.textMuted}`,
            boxShadow: active ? `0 0 20px ${hexA(C.gold, 0.8)}` : 'none',
            transform: `scale(${active ? 1.2 : 1})`,
          }}
        />
      );
    })}
  </div>
);

// Ikon Mangkok Makan / Ramen (SVG halus dengan uap animasi)
export const RamenBowl: React.FC<{
  size?: number;
  steam?: number; // 0..1 loop uap
  color?: string;
}> = ({size = 180, steam = 0, color = C.gold}) => {
  const s1 = Math.sin(steam * Math.PI * 4) * 6;
  const s2 = Math.cos(steam * Math.PI * 4) * 6;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{overflow: 'visible'}}>
      {/* Uap panas */}
      <path
        d={`M36 26 Q${40 + s1} 14 36 6`}
        stroke={C.goldSoft}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.65 + 0.35 * Math.sin(steam * Math.PI * 4)}
      />
      <path
        d={`M50 24 Q${54 + s2} 12 50 4`}
        stroke={C.goldSoft}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.75 + 0.25 * Math.cos(steam * Math.PI * 4)}
      />
      <path
        d={`M64 26 Q${68 - s1} 14 64 6`}
        stroke={C.goldSoft}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.65 + 0.35 * Math.sin(steam * Math.PI * 4)}
      />
      {/* Sumpit */}
      <line x1="24" y1="38" x2="82" y2="28" stroke="#d5ab60" strokeWidth="4" strokeLinecap="round" />
      <line x1="28" y1="44" x2="86" y2="34" stroke="#c09440" strokeWidth="4" strokeLinecap="round" />
      {/* Mangkok ramen */}
      <path
        d="M20 44 C22 76 78 76 80 44 Z"
        fill="#2e374b"
        stroke={color}
        strokeWidth="4"
      />
      {/* Kaki mangkok */}
      <rect x="42" y="76" width="16" height="6" rx="2" fill={color} />
      {/* Pola dekorasi mangkok */}
      <path d="M28 50 Q50 56 72 50" stroke={hexA(color, 0.4)} strokeWidth="2.5" fill="none" />
    </svg>
  );
};

// Ikon Buku Membaca (SVG dengan lembaran halaman membalik)
export const BookIcon: React.FC<{
  size?: number;
  flip?: number; // 0..1 lembaran membalik
  color?: string;
}> = ({size = 180, flip = 0, color = C.indigoSoft}) => {
  const p = Math.sin(flip * Math.PI * 2);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{overflow: 'visible'}}>
      {/* Cover luar buku */}
      <path
        d="M16 28 C28 24 46 25 50 28 C54 25 72 24 84 28 L84 76 C72 72 54 73 50 76 C46 73 28 72 16 76 Z"
        fill="#262e40"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Halaman kiri */}
      <path d="M22 34 C32 32 44 33 48 35 L48 71 C44 69 32 68 22 70 Z" fill="#edf0f6" opacity="0.9" />
      {/* Halaman kanan */}
      <path d="M52 35 C56 33 68 32 78 34 L78 70 C68 68 56 69 52 71 Z" fill="#edf0f6" opacity="0.9" />
      {/* Garis teks kiri */}
      <line x1="28" y1="42" x2="42" y2="42" stroke="#505a74" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="50" x2="42" y2="50" stroke="#505a74" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="58" x2="38" y2="58" stroke="#505a74" strokeWidth="2.5" strokeLinecap="round" />
      {/* Garis teks kanan */}
      <line x1="58" y1="42" x2="72" y2="42" stroke="#505a74" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="50" x2="72" y2="50" stroke="#505a74" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="58" x2="68" y2="58" stroke="#505a74" strokeWidth="2.5" strokeLinecap="round" />
      {/* Halaman melayang (flip) */}
      <path
        d={`M50 35 Q${50 + p * 18} 30 50 71`}
        stroke={C.gold}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.8}
      />
    </svg>
  );
};

// Ikon Lampu Ide / Pengetahuan (知る 💡)
export const LightbulbIcon: React.FC<{
  size?: number;
  glow?: number; // 0..1
  color?: string;
}> = ({size = 180, glow = 1, color = C.gold}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    style={{
      overflow: 'visible',
      filter: `drop-shadow(0 0 ${40 * glow}px ${hexA(color, 0.7 * glow)})`,
    }}
  >
    {/* Sinar lampu */}
    {glow > 0.3 && (
      <g stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity={glow}>
        <line x1="50" y1="8" x2="50" y2="18" />
        <line x1="22" y1="20" x2="30" y2="28" />
        <line x1="78" y1="20" x2="70" y2="28" />
        <line x1="12" y1="48" x2="22" y2="48" />
        <line x1="88" y1="48" x2="78" y2="48" />
      </g>
    )}
    {/* Badan bohlam */}
    <path
      d="M32 46 C32 30 40 22 50 22 C60 22 68 30 68 46 C68 54 62 60 60 66 L40 66 C38 60 32 54 32 46 Z"
      fill={glow > 0.4 ? hexA(color, 0.25 + 0.3 * glow) : '#242b3b'}
      stroke={color}
      strokeWidth="4"
    />
    {/* Filamen */}
    <path
      d="M44 52 L48 44 L52 52 L56 44"
      stroke={glow > 0.4 ? '#ffffff' : color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Ulir dasar bohlam */}
    <rect x="42" y="68" width="16" height="5" rx="2" fill="#75829e" />
    <rect x="43" y="74" width="14" height="4" rx="2" fill="#75829e" />
    <path d="M46 79 Q50 82 54 79" stroke="#75829e" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Ikon Cincin Pernikahan (💍 結婚する)
export const WeddingRings: React.FC<{
  size?: number;
  sparkle?: number;
  color?: string;
}> = ({size = 180, sparkle = 1, color = C.gold}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    style={{
      overflow: 'visible',
      filter: `drop-shadow(0 0 ${35 * sparkle}px ${hexA(color, 0.65 * sparkle)})`,
    }}
  >
    {/* Cincin 1 (kiri) */}
    <circle cx="42" cy="54" r="24" stroke={color} strokeWidth="6" />
    {/* Cincin 2 (kanan) */}
    <circle cx="62" cy="54" r="24" stroke="#ffda79" strokeWidth="6" />
    {/* Permata di cincin 1 */}
    <g transform="translate(42, 26)">
      <polygon
        points="0,-14 10,-4 6,4 -6,4 -10,-4"
        fill="#98d5ff"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
    </g>
    {/* Kilau berlian */}
    {sparkle > 0.3 && (
      <g transform="translate(42, 12)" opacity={sparkle}>
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </g>
    )}
  </svg>
);

// Ikon Kehidupan Sendiri (Rumah, Kopi, Tas Kerja)
export const SingleLifeIcons: React.FC<{
  size?: number;
  color?: string;
}> = ({size = 38, color = C.indigoSoft}) => (
  <div style={{display: 'flex', gap: 18, alignItems: 'center'}}>
    {/* Rumah 🏠 */}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
    {/* Kopi ☕ */}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
    {/* Tas kerja 💼 */}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  </div>
);

// Wrapper Blok Transisi
export const BlockFade: React.FC<{
  dur: number;
  inF?: number;
  outF?: number;
  children: React.ReactNode;
}> = ({dur, inF = 6, outF = 6, children}) => {
  const f = useCurrentFrame();
  const a = inF > 0 ? prog(f, 0, inF, (x) => x) : 1;
  const b = outF > 0 ? 1 - prog(f, dur - outF, outF, (x) => x) : 1;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: Math.min(a, b)}}>
      {children}
    </div>
  );
};
