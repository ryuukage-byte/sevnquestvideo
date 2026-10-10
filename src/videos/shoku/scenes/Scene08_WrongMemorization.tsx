import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Stamp, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene08_WrongMemorization: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:56.91: Headline "INI YANG PENTING."
  const pHead = pop(frame, fps, sec(56.91), SPRING);
  // 00:57.51: Headline moves up
  const pHeadUp = progBetweenSec(frame, 57.51, 58.2, EASE_IO);
  const headY = -80 * pHeadUp;

  // 00:58.45: Flashcard enters with 食
  const pCardIn = pop(frame, fps, sec(58.45), SPRING);

  // 00:59.15: "=" enters
  const pEqualIn = pop(frame, fps, sec(59.15), BOUNCY);

  // 01:01.80: "た" appears -> 食 = た
  const pTaIn = pop(frame, fps, sec(61.8), BOUNCY);

  // 01:02.10: Card shakes
  const isShake = frame >= sec(62.1) && frame < sec(62.6);
  const shakeX = isShake ? Math.sin((frame - sec(62.1)) * 2) * 8 : 0;

  // 01:02.40: Stamp BELUM CUKUP
  const pStamp = pop(frame, fps, sec(62.4), BOUNCY);

  // 01:03.10: Transform to 食 ≠ cuma た
  const isTransform = frame >= sec(63.1);
  const pTransform = pop(frame, fps, sec(63.1), SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="error" at={sec(62.4)} volume={0.65} />
        </>
      )}

      {/* Main Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Top Headline: INI YANG PENTING */}
        {frame >= sec(56.91) && (
          <div
            style={{
              position: 'absolute',
              top: 340,
              transform: `translateY(${headY}px) scale(${pHead})`,
              opacity: pHead,
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 64,
                fontWeight: 900,
                color: C.gold,
                letterSpacing: 2,
                textShadow: '0 0 32px rgba(240,190,82,0.45)',
              }}
            >
              INI YANG PENTING.
            </span>
          </div>
        )}

        {/* Flashcard: 食 = た */}
        {frame >= sec(58.45) && (
          <div
            style={{
              position: 'relative',
              opacity: pCardIn,
              transform: `scale(${pCardIn}) translateX(${shakeX}px)`,
            }}
          >
            <Surface
              tone="elevated"
              radius={48}
              border={isTransform ? C.hanko : C.borderPrimary}
              style={{
                width: 780,
                padding: '60px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
                position: 'relative',
              }}
            >
              {!isTransform ? (
                /* Stage 1: 食 = た */
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 36,
                    minHeight: 180,
                  }}
                >
                  {/* Kanji 食 */}
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 160,
                      fontWeight: 900,
                      color: C.gold,
                    }}
                  >
                    食
                  </span>

                  {/* Equal Sign = */}
                  {frame >= sec(59.15) && (
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 120,
                        fontWeight: 900,
                        color: C.textSecondary,
                        opacity: pEqualIn,
                        transform: `scale(${pEqualIn})`,
                      }}
                    >
                      =
                    </span>
                  )}

                  {/* Reading た */}
                  {frame >= sec(61.8) && (
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 140,
                        fontWeight: 900,
                        color: C.text,
                        opacity: pTaIn,
                        transform: `scale(${pTaIn})`,
                      }}
                    >
                      た
                    </span>
                  )}
                </div>
              ) : (
                /* Stage 2: Transform to 食 ≠ cuma た */
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 30,
                    minHeight: 180,
                    opacity: pTransform,
                    transform: `scale(${pTransform})`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 160,
                      fontWeight: 900,
                      color: C.gold,
                    }}
                  >
                    食
                  </span>

                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 120,
                      fontWeight: 900,
                      color: C.hanko,
                    }}
                  >
                    ≠
                  </span>

                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 40,
                        fontWeight: 800,
                        color: C.hanko,
                        letterSpacing: 2,
                      }}
                    >
                      CUMA
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 110,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      た
                    </span>
                  </div>
                </div>
              )}

              {/* Red Stamp: BELUM CUKUP. */}
              {frame >= sec(62.4) && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -30,
                    right: 40,
                    opacity: pStamp,
                    transform: `scale(${pStamp})`,
                    zIndex: 20,
                  }}
                >
                  <Stamp
                    text="BELUM CUKUP."
                    color={C.hanko}
                    size={38}
                    rotate={-6}
                  />
                </div>
              )}
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
