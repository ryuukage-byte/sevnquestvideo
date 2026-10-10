import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, FONT} from '../theme';

// Penanda menara bergaya pagoda (lima tingkat) — diambil dari motif Tower di aplikasi.
export const Pagoda: React.FC<{size?: number; glow?: number}> = ({size = 160, glow = 0}) => {
  const tiers = 5;
  const parts = [];
  for (let i = 0; i < tiers; i++) {
    const w = 52 + i * 26;
    const y = 58 + i * 38;
    const cx = 100;
    parts.push(
      <g key={i}>
        <rect x={cx - w * 0.34} y={y + 10} width={w * 0.68} height={24} rx={3} fill="url(#pgBody)" />
        <rect x={cx - 7} y={y + 15} width={14} height={14} rx={2} fill="#161a26" />
        <path
          d={`M${cx - w / 2 - 12} ${y + 14} Q${cx - w / 4} ${y + 12} ${cx} ${y - 14} Q${cx + w / 4} ${y + 12} ${cx + w / 2 + 12} ${y + 14} Q${cx} ${y + 22} ${cx - w / 2 - 12} ${y + 14}Z`}
          fill="url(#pgRoof)"
          stroke="#8c6810"
          strokeWidth={1.5}
        />
      </g>,
    );
  }
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 200 260" style={{filter: `drop-shadow(0 0 ${14 + glow * 30}px rgba(240,190,82,${0.25 + glow * 0.5}))`}}>
      <defs>
        <linearGradient id="pgRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.goldSoft} />
          <stop offset="0.55" stopColor={C.gold} />
          <stop offset="1" stopColor="#a87b18" />
        </linearGradient>
        <linearGradient id="pgBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b4560" />
          <stop offset="1" stopColor="#262d42" />
        </linearGradient>
      </defs>
      <path d="M100 6V40" stroke={C.gold} strokeWidth={4} strokeLinecap="round" />
      <circle cx="100" cy="14" r="4" fill={C.goldSoft} />
      <rect x="93" y="26" width="14" height="5" rx="2" fill={C.gold} />
      {parts}
    </svg>
  );
};

export const Wordmark: React.FC<{size?: number}> = ({size = 120}) => (
  <div
    style={{
      fontFamily: FONT.fantasy,
      fontWeight: 900,
      fontSize: size,
      letterSpacing: size * 0.1,
      lineHeight: 1,
      display: 'flex',
      color: C.text,
      textShadow: '0 6px 28px rgba(0,0,0,0.55)',
    }}
  >
    SEVN
    <span
      style={{
        background: `linear-gradient(180deg, ${C.goldSoft} 0%, ${C.gold} 55%, #b88a1f 100%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        textShadow: 'none',
        filter: 'drop-shadow(0 4px 16px rgba(240,190,82,0.35))',
      }}
    >
      QUEST
    </span>
  </div>
);

// Logo asli SevnQuest (kompas + goresan perak) dari apple-touch-icon.
export const LogoMark: React.FC<{size?: number; glow?: number}> = ({size = 200, glow = 0}) => (
  <Img
    src={staticFile('brand/logo.png')}
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.22,
      boxShadow: `0 ${size * 0.06}px ${size * 0.2}px rgba(0,0,0,0.55), 0 0 ${24 + glow * 50}px rgba(190,205,230,${0.18 + glow * 0.4})`,
      border: '1.5px solid rgba(200,212,235,0.25)',
    }}
  />
);
