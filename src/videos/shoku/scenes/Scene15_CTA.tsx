import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {PhysicalButton, Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene15_CTA: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 02:05.41: Camera pull-back
  const pPull = progBetweenSec(frame, 125.41, 126.1, EASE_IO);
  const camScale = 1 - 0.05 * pPull;

  // 02:05.70: Floating background cards
  const pBgCards = pop(frame, fps, sec(125.7), SPRING);
  const floatY = frame < sec(129.03) ? Math.sin((frame - sec(125.7)) / 16) * 6 : 0;

  // 02:06.10: LogoMark SevnQuest enters center
  const pLogo = pop(frame, fps, sec(126.1), BOUNCY);

  // 02:06.45: Wordmark "SEVNQUEST"
  const pWordmark = pop(frame, fps, sec(126.45), SPRING);

  // 02:06.90: Headline 1: Belajar lewat kotoba.
  const pHead1 = pop(frame, fps, sec(126.9), SPRING);

  // 02:07.20: Headline 2: Pahami lewat konteks.
  const pHead2 = pop(frame, fps, sec(127.2), SPRING);

  // 02:07.86: PhysicalButton tone="gold" enters: COBA SEVNQUEST →
  const pBtn = pop(frame, fps, sec(127.86), BOUNCY);

  // 02:08.30: Button shimmer sweep
  const isShimmer = frame >= sec(128.3);
  const pShimmer = progBetweenSec(frame, 128.3, 128.9, EASE);
  const shimmerX = -100 + pShimmer * 260; // percentage

  // 02:08.55: Domain sevnquest.sevnsoul.site
  const pDomain = pop(frame, fps, sec(128.55), BOUNCY);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${camScale})`,
        pointerEvents: 'none',
      }}
    >
      {sfx && (
        <>
          <Sfx name="chime" at={sec(126.1)} volume={0.7} />
          <Sfx name="pop" at={sec(127.86)} volume={0.65} />
          <Sfx name="sparkle" at={sec(128.3)} volume={0.65} />
        </>
      )}

      {/* Background Floating Cards */}
      {frame >= sec(125.7) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: pBgCards * 0.25,
            transform: `translateY(${floatY}px)`,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0 40px',
            zIndex: 1,
          }}
        >
          <div style={{transform: 'rotate(-8deg)'}}>
            <Pill color={C.indigoSoft} size={32}>
              食べる · たべる
            </Pill>
          </div>
          <div style={{transform: 'rotate(6deg)'}}>
            <Pill color={C.gold} size={32}>
              食事 · しょくじ
            </Pill>
          </div>
          <div style={{transform: 'rotate(-4deg)'}}>
            <Pill color={C.matcha} size={32}>
              食堂 · しょくどう
            </Pill>
          </div>
        </div>
      )}

      {/* Main Center Brand & CTA Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
        }}
      >
        {/* LogoMark */}
        {frame >= sec(126.1) && (
          <div
            style={{
              opacity: pLogo,
              transform: `scale(${pLogo})`,
              marginBottom: 16,
            }}
          >
            <LogoMark size={140} glow={0.6} />
          </div>
        )}

        {/* Wordmark: SEVNQUEST */}
        {frame >= sec(126.45) && (
          <div
            style={{
              opacity: pWordmark,
              transform: `scale(${pWordmark})`,
              marginBottom: 24,
            }}
          >
            <Wordmark size={100} />
          </div>
        )}

        {/* Taglines */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            marginBottom: 44,
          }}
        >
          {frame >= sec(126.9) && (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 48,
                fontWeight: 800,
                color: C.text,
                letterSpacing: 1.5,
                opacity: pHead1,
                transform: `scale(${pHead1})`,
              }}
            >
              Belajar lewat kotoba.
            </span>
          )}

          {frame >= sec(127.2) && (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 48,
                fontWeight: 900,
                color: C.gold,
                letterSpacing: 1.5,
                opacity: pHead2,
                transform: `scale(${pHead2})`,
                textShadow: '0 0 28px rgba(240,190,82,0.45)',
              }}
            >
              Pahami lewat konteks.
            </span>
          )}
        </div>

        {/* Physical 3D Button: COBA SEVNQUEST → */}
        {frame >= sec(127.86) && (
          <div
            style={{
              position: 'relative',
              opacity: pBtn,
              transform: `scale(${pBtn})`,
              marginBottom: 28,
            }}
          >
            <PhysicalButton
              label={
                <span style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  COBA SEVNQUEST <span style={{fontSize: 44}}>→</span>
                </span>
              }
              tone="gold"
              w={560}
              h={100}
              fontSize={38}
            />

            {/* Shimmer sweep effect */}
            {isShimmer && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 560,
                  height: 100,
                  borderRadius: 26,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '40%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
                    transform: `skewX(-25deg) translateX(${shimmerX}%)`,
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Domain: sevnquest.sevnsoul.site */}
        {frame >= sec(128.55) && (
          <div
            style={{
              opacity: pDomain,
              transform: `scale(${pDomain})`,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 32,
                fontWeight: 800,
                color: C.textSecondary,
                letterSpacing: 2,
              }}
            >
              sevnquest.sevnsoul.site
            </span>
            <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
