import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Stamp, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const Scene02_KanjiMorph: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Morph pop at local f = 0
  const pMorph = pop(f, fps, 0, BOUNCY);

  // Accent / shockwave at local f = 50 ("berbeda")
  const pAccent = pop(f, fps, 50, BOUNCY);
  const shockwave = prog(f, 50, 24, (t) => t);

  // Focus shift at local f = 108:
  // 会う becomes dominant (scale up, shifts toward left center)
  // 合う dims to 35%
  const pShift = prog(f, 108, 25, (t) => t);
  const leftScale = 1.0 + pShift * 0.18;
  const leftOpacity = 1.0;
  const rightScale = 1.0 - pShift * 0.12;
  const rightOpacity = 1.0 - pShift * 0.65; // down to 0.35
  const camShiftX = -pShift * 60;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="sparkle" at={0} volume={0.65} />
          <Sfx name="impact" at={50} volume={0.7} />
          <Sfx name="whoosh" at={108} volume={0.5} />
        </>
      )}

      {/* Header Pill */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pill color={C.hanko} size={26}>
          KANJI BERBEDA
        </Pill>
      </div>

      {/* Main Two Kanji Cards Container */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateX(${camShiftX}px)`,
        }}
      >
        {/* Kanji Kiri: 会う */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(-240px) scale(${pMorph * leftScale})`,
            opacity: leftOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Shockwave ring behind */}
          {f >= 50 && f <= 80 && (
            <div
              style={{
                position: 'absolute',
                width: 320,
                height: 380,
                borderRadius: 50,
                border: `3px solid ${C.gold}`,
                transform: `scale(${1 + shockwave * 0.35})`,
                opacity: 1 - shockwave,
              }}
            />
          )}

          <Surface
            tone="elevated"
            radius={44}
            border={f >= 108 ? C.gold : pAccent > 0.5 ? C.goldSoft : C.borderPrimary}
            style={{
              padding: '44px 56px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow:
                f >= 108
                  ? `0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(240,190,82,0.3)`
                  : '0 16px 40px rgba(0,0,0,0.6)',
              transition: 'border 0.2s ease',
            }}
          >
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 160,
                fontWeight: 900,
                color: f >= 108 ? C.gold : C.text,
                lineHeight: 1,
                textShadow: f >= 108 ? '0 0 30px rgba(240,190,82,0.6)' : '0 8px 30px rgba(0,0,0,0.7)',
              }}
            >
              会う
            </div>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 26,
                fontWeight: 700,
                color: C.indigoSoft,
                marginTop: 16,
              }}
            >
              あ・う
            </div>
          </Surface>
        </div>

        {/* Kanji Kanan: 合う */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(240px) scale(${pMorph * rightScale})`,
            opacity: rightOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Shockwave ring behind */}
          {f >= 50 && f <= 80 && (
            <div
              style={{
                position: 'absolute',
                width: 320,
                height: 380,
                borderRadius: 50,
                border: `3px solid ${C.matcha}`,
                transform: `scale(${1 + shockwave * 0.35})`,
                opacity: 1 - shockwave,
              }}
            />
          )}

          <Surface
            tone="elevated"
            radius={44}
            border={pAccent > 0.5 ? C.matcha : C.borderPrimary}
            style={{
              padding: '44px 56px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            }}
          >
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 160,
                fontWeight: 900,
                color: C.text,
                lineHeight: 1,
                textShadow: '0 8px 30px rgba(0,0,0,0.7)',
              }}
            >
              合う
            </div>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 26,
                fontWeight: 700,
                color: C.indigoSoft,
                marginTop: 16,
              }}
            >
              あ・う
            </div>
          </Surface>
        </div>

        {/* Accent Banner / Stamp di tengah saat 'berbeda' */}
        {f >= 50 && f < 108 && (
          <div
            style={{
              position: 'absolute',
              top: '68%',
              transform: `scale(${pAccent})`,
              opacity: pAccent,
            }}
          >
            <Stamp text="DITULIS BERBEDA" color={C.gold} size={36} rotate={-3} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
