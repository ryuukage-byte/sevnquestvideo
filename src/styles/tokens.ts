export const TOKENS = {
  colors: {
    bg: '#090E1E',
    bgDeep: '#05070F',
    bgGradient: 'radial-gradient(ellipse at 50% 35%, #18233d 0%, #090E1E 75%, #05070F 100%)',
    bgWarmAmber: 'radial-gradient(ellipse at 50% 40%, #2e2417 0%, #15131d 65%, #090E1E 100%)',
    bgSkyCloud: 'radial-gradient(ellipse at 50% 30%, #222d3d 0%, #121824 60%, #090E1E 100%)',
    card: '#151C2C',
    cardElevated: '#1D273D',
    cardBorder: 'rgba(85, 221, 245, 0.25)',
    cardBorderMuted: 'rgba(148, 163, 184, 0.15)',
    
    // Core semantic palette
    souCyan: '#55DDF5',         // Main そう color
    souCyanGlow: 'rgba(85, 221, 245, 0.6)',
    conceptViolet: '#A78BFA',   // Concept / conclusion
    conceptVioletGlow: 'rgba(167, 139, 250, 0.5)',
    directAmber: '#F9C56B',     // Direct impression (おいしそう, 雨が降りそう)
    directAmberGlow: 'rgba(249, 197, 107, 0.55)',
    hearsayPink: '#F49AC2',     // Information from others / hearsay (おいしいそうです)
    hearsayPinkGlow: 'rgba(244, 154, 194, 0.55)',
    
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    dangerRed: '#EF4444',
    successGreen: '#34D399',
  },
  
  fonts: {
    jp: '"Noto Sans JP", "Noto Serif JP", sans-serif',
    body: '"Plus Jakarta Sans", "Inter", sans-serif',
    display: '"Bricolage Grotesque", "Plus Jakarta Sans", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  
  safe: {
    top: 200,
    bottom: 280, // Above TikTok/Reels UI
    left: 60,
    right: 60,
    centerActionY: 960,
  },
  
  video: {
    width: 1080,
    height: 1920,
    fps: 60,
    totalFrames: 13349,
    totalDurationMs: 222480,
  },
} as const;
