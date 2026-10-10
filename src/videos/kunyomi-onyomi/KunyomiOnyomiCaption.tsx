import React from 'react';
import {useCurrentFrame} from 'remotion';
import {prog} from '../../shared/anim';
import {C, FONT, SAFE} from '../../shared/theme';
import {CAPTIONS, sec} from './timing';

export const KunyomiOnyomiCaption: React.FC<{enabled?: boolean}> = ({
  enabled = true,
}) => {
  const f = useCurrentFrame();

  if (!enabled) return null;

  // Find active line based on current frame
  const activeLine = CAPTIONS.find(
    (line) => f >= sec(line.s) && f < sec(line.e) + 4,
  );

  if (!activeLine) return null;

  const startF = sec(activeLine.s);
  const endF = sec(activeLine.e);

  const fadeIn = prog(f, startF, 4);
  const fadeOut = f > endF ? 1 - prog(f, endF, 4) : 1;
  const opacity = Math.min(fadeIn, fadeOut);

  const words = activeLine.text.split(' ');
  const kw = activeLine.keyword?.toLowerCase();
  const kwColor = activeLine.color ?? C.gold;

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: SAFE.captionTop,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 14,
        rowGap: 6,
        fontFamily: FONT.body,
        fontWeight: 700,
        fontSize: activeLine.text.length > 60 ? 38 : 42,
        lineHeight: 1.25,
        color: C.text,
        textShadow: '0 4px 20px rgba(0,0,0,0.85), 0 0 6px rgba(0,0,0,0.9)',
        opacity,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {words.map((w, i) => {
        const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isHot = kw && (clean === kw || kw.includes(clean) && clean.length >= 3);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              color: isHot ? kwColor : C.text,
              fontWeight: isHot ? 800 : 700,
              textShadow: isHot
                ? `0 0 24px ${kwColor}80, 0 4px 18px rgba(0,0,0,0.85)`
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
