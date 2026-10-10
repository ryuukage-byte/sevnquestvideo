import React from 'react';
import {useCurrentFrame} from 'remotion';
import {prog} from '../anim';
import {C, FONT, SAFE} from '../theme';

const KEY = new Set([
  'sudah', 'hafal', 'lupa', 'kayaknya', 'dicatet', 'dua', 'puluh', 'kali', 'progress', 'sevnquest', 'terukur', 'menggunakannya', 'kakijun', 'watermark', 'timer', 'hiragana',
]);

// Subtitle VO: muncul kata-demi-kata sesuai perkiraan tempo bicara. Kata kunci storyboard diberi emphasis.
export const Caption: React.FC<{text: string; dur: number; enabled?: boolean; hold?: boolean; top?: number}> = ({
  text,
  dur,
  enabled = true,
  hold = false,
  top,
}) => {
  const f = useCurrentFrame();
  if (!enabled) return null;
  const words = text.split(' ');
  const total = words.reduce((a, w) => a + w.length + 1, 0);
  const speech = dur * 0.9;
  const lead = 5;
  let acc = 0;
  const fadeOut = hold ? 1 : 1 - prog(f, dur - 8, 8, (t) => t);
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: top ?? SAFE.captionTop,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 14,
        rowGap: 6,
        fontFamily: FONT.body,
        fontWeight: 700,
        fontSize: text.length > 130 ? 38 : text.length > 88 ? 41 : 46,
        lineHeight: 1.22,
        color: C.text,
        textShadow: '0 3px 18px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)',
        opacity: fadeOut,
      }}
    >
      {words.map((w, i) => {
        const at = lead + (acc / total) * speech;
        acc += w.length + 1;
        const p = prog(f, at, 7);
        const key = w.toLowerCase().replace(/[^a-z]/g, '');
        const hot = KEY.has(key);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${(1 - p) * 16}px)`,
              color: hot ? C.gold : C.text,
              fontWeight: hot ? 800 : 700,
              textShadow: hot
                ? '0 0 26px rgba(240,190,82,0.45), 0 3px 18px rgba(0,0,0,0.85)'
                : undefined,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
