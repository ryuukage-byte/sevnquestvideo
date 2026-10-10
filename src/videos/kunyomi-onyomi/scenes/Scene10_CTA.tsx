import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {PhysicalButton} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene10_CTA: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:70.62: LogoMark SevnQuest pops center
  const pLogo = pop(frame, fps, sec(70.62), BOUNCY);

  // 00:70.90: Wordmark "SEVNQUEST"
  const pWordmark = pop(frame, fps, sec(70.9), SPRING);

  // 00:71.20: Action headline "COBA SEKARANG DI SEVNQUEST"
  const pHeadline = pop(frame, fps, sec(71.2), SPRING);

  // 00:71.50: Physical 3D Gold Button
  const pBtn = pop(frame, fps, sec(71.5), BOUNCY);

  // 00:71.80: Button shimmer sweep
  const pShimmer = progBetweenSec(frame, 71.8, 72.6);
  const shimmerX = -100 + pShimmer * 260;

  // 00:71.30: Project URL
  const pDomain = pop(frame, fps, sec(71.3), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="chime" at={sec(70.65)} volume={0.75} />
          <Sfx name="pop" at={sec(71.5)} volume={0.65} />
          <Sfx name="sparkle" at={sec(71.9)} volume={0.65} />
        </>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
        }}
      >
        {/* LogoMark */}
        <div
          style={{
            opacity: pLogo,
            transform: `scale(${pLogo})`,
            marginBottom: 20,
          }}
        >
          <LogoMark size={160} glow={0.65} />
        </div>

        {/* Wordmark: SEVNQUEST */}
        <div
          style={{
            opacity: pWordmark,
            transform: `scale(${pWordmark})`,
            marginBottom: 28,
          }}
        >
          <Wordmark size={110} />
        </div>

        {/* Ending Headline Brief: COBA SEKARANG DI SEVNQUEST */}
        <div
          style={{
            opacity: pHeadline,
            transform: `scale(${pHeadline}) translateY(${(1 - pHeadline) * 15}px)`,
            marginBottom: 44,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 52,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: 1.5,
              textShadow: '0 8px 30px rgba(0,0,0,0.6)',
            }}
          >
            COBA SEKARANG DI{' '}
            <span
              style={{
                color: C.gold,
                textShadow: '0 0 35px rgba(240,190,82,0.6)',
              }}
            >
              SEVNQUEST
            </span>
          </span>
        </div>

        {/* Tactile Physical Button */}
        <div
          style={{
            position: 'relative',
            opacity: pBtn,
            transform: `scale(${pBtn})`,
            marginBottom: 36,
          }}
        >
          <PhysicalButton
            label={
              <span style={{display: 'flex', alignItems: 'center', gap: 14}}>
                COBA SEKARANG <span style={{fontSize: 44}}>→</span>
              </span>
            }
            tone="gold"
            w={600}
            h={104}
            fontSize={40}
          />

          {/* Shimmer sweep effect */}
          {frame >= sec(71.8) && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 600,
                height: 104,
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

        {/* Project URL */}
        <div
          style={{
            opacity: pDomain,
            transform: `scale(${pDomain})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 34,
                fontWeight: 800,
                color: C.goldSoft,
                letterSpacing: 2,
              }}
            >
              www.sevnsoul.site
            </span>
            <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
          </div>
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 20,
              color: C.indigoSoft,
              fontWeight: 600,
            }}
          >
            lalu pilih menu Learn
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
