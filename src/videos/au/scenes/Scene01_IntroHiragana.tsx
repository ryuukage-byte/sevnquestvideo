import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const Scene01_IntroHiragana: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 00:00.00 - 00:00.38: Fade in background
  const fadeIn = prog(f, 0, 11, (t) => t);

  // 00:00.38 - 00:02.00: Karakter あ lalu う
  const pA = pop(f, fps, 11, BOUNCY);
  const pU = pop(f, fps, 32, BOUNCY);

  // 00:02.00 - 00:05.05: Split menjadi dua objek
  // Split progress: 0 di frame 60, bergerak menuju 1 di frame 82
  const pSplit = pop(f, fps, 60, SPRING);
  const splitOffset = pSplit * 240; // jarak ke kiri & kanan

  // Badge "same pronunciation"
  const pBadge = pop(f, fps, 72, BOUNCY);

  // 00:05.05 - 00:05.52: Idle floating subtle
  const floatA = Math.sin(f / 12) * 3;
  const floatB = Math.cos(f / 12) * 3;

  return (
    <AbsoluteFill style={{opacity: fadeIn, pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={11} volume={0.6} />
          <Sfx name="pop" at={32} volume={0.65} />
          <Sfx name="swipe" at={60} volume={0.5} />
          <Sfx name="click" at={72} volume={0.55} />
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
          opacity: prog(f, 8, 12),
        }}
      >
        <Pill color={C.indigoSoft} size={26}>
          SEVNQUEST · KOTOBA KANJI
        </Pill>
      </div>

      {/* Main Center Area */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Karakter Kiri (awalnya di tengah, lalu bergerak ke kiri) */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${-splitOffset}px) translateY(${floatA}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Surface
            tone="card"
            radius={40}
            style={{
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: pSplit > 0.1 ? '0 16px 40px rgba(0,0,0,0.6)' : 'none',
              border: `2px solid ${pSplit > 0.1 ? C.borderPrimary : 'transparent'}`,
              background: pSplit > 0.1 ? undefined : 'transparent',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 160,
                  fontWeight: 900,
                  color: C.text,
                  opacity: pA,
                  transform: `scale(${0.8 + 0.2 * pA})`,
                  display: 'inline-block',
                  textShadow: '0 8px 30px rgba(0,0,0,0.7)',
                }}
              >
                あ
              </span>
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 160,
                  fontWeight: 900,
                  color: C.text,
                  opacity: pU,
                  transform: `scale(${0.8 + 0.2 * pU})`,
                  display: 'inline-block',
                  textShadow: '0 8px 30px rgba(0,0,0,0.7)',
                }}
              >
                う
              </span>
            </div>
            {pSplit > 0.2 && (
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 28,
                  fontWeight: 700,
                  color: C.indigoSoft,
                  marginTop: 10,
                  opacity: pSplit,
                }}
              >
                au
              </span>
            )}
          </Surface>
        </div>

        {/* Karakter Kanan (hanya muncul saat split dimulai di frame 60) */}
        {f >= 60 && (
          <div
            style={{
              position: 'absolute',
              transform: `translateX(${splitOffset}px) translateY(${floatB}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pSplit,
            }}
          >
            <Surface
              tone="card"
              radius={40}
              style={{
                padding: '40px 60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                border: `2px solid ${C.borderPrimary}`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 160,
                    fontWeight: 900,
                    color: C.text,
                    display: 'inline-block',
                    textShadow: '0 8px 30px rgba(0,0,0,0.7)',
                  }}
                >
                  あ
                </span>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 160,
                    fontWeight: 900,
                    color: C.text,
                    display: 'inline-block',
                    textShadow: '0 8px 30px rgba(0,0,0,0.7)',
                  }}
                >
                  う
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 28,
                  fontWeight: 700,
                  color: C.indigoSoft,
                  marginTop: 10,
                }}
              >
                au
              </span>
            </Surface>
          </div>
        )}

        {/* Same Pronunciation Badge */}
        {f >= 72 && (
          <div
            style={{
              position: 'absolute',
              top: '68%',
              opacity: pBadge,
              transform: `scale(${pBadge})`,
            }}
          >
            <Pill color={C.gold} size={28} filled>
              PENGUCAPAN SAMA: &quot;au&quot;
            </Pill>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
