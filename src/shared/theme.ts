// Token diambil langsung dari src/index.css SevnQuest ("Washi Scroll — Malam Indigo").
export const C = {
  bg: '#12151d',
  bgDeep: '#0b0d13',
  card: '#1f242f',
  elevated: '#2a3040',
  inset: '#191d26',
  indigoDeep: '#26314a',
  indigo: '#6f93cf',
  indigoSoft: '#97b5e0',
  thread: 'rgba(151,181,224,0.35)',
  gold: '#f0be52',
  goldSoft: '#fde8a8',
  goldShadow: '#8c6810',
  text: '#edf0f6',
  textSecondary: '#9ba4b8',
  textMuted: '#737e96',
  hanko: '#e2555b',
  hankoDeep: '#8a3438',
  matcha: '#4fae86',
  matchaDeep: '#2c7757',
  fuji: '#9b65c9',
  teal: '#26a69a',
  borderSubtle: 'rgba(111,147,207,0.18)',
  borderPrimary: 'rgba(111,147,207,0.4)',
  neuD: 'rgba(0,0,0,0.50)',
  neuL: 'rgba(255,255,255,0.045)',
} as const;

export const FONT = {
  body: '"Plus Jakarta Sans", "Noto Sans", system-ui, sans-serif',
  jp: '"Noto Serif JP", "Noto Serif CJK JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
  fantasy: '"Cinzel", "Noto Serif JP", Georgia, serif',
  display: '"Bricolage Grotesque", "Plus Jakarta Sans", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, Menlo, monospace',
  hand: '"Caveat", "Segoe Script", cursive',
} as const;

export const W = 1080;
export const H = 1920;
export const FPS = 30;

// Zona aman 9:16 (UI TikTok/Reels menutupi sisi atas & bawah)
export const SAFE = {top: 200, captionTop: 1470, bottom: 1640};

export const SHADOW_CARD =
  '8px 10px 24px rgba(0,0,0,0.5), -4px -4px 14px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)';
export const SHADOW_INSET =
  'inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.04)';
