import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, prog, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene01_EasyStart: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // Camera drift scale: 1 -> 1.015 over 00:00.00 to 00:06.69
  const camScale = interpolate(frame, [sec(0.0), sec(6.69)], [1.0, 1.015], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 00:00.28: Card 1 enters from bottom
  const pCard1In = prog(frame, sec(0.28), sec(0.35), EASE);
  const card1Spring = pop(frame, fps, sec(0.28), SPRING);
  const card1ScaleEntry = 0.88 + 0.12 * card1Spring;
  const card1YEntry = (1 - pCard1In) * 180;

  // 00:00.46: Kanji 食 appears in center
  const pShoku1 = pop(frame, fps, sec(0.46), BOUNCY);

  // 00:00.67: べる enters from right
  const pBeru1 = pop(frame, fps, sec(0.67), SPRING);
  const beru1X = (1 - pBeru1) * 60;

  // 00:02.11: Reveal たべる below 食べる
  const pTaberuReading = pop(frame, fps, sec(2.11), SPRING);

  // 00:02.51 - 00:03.10: Card 1 moves up to history area
  const pCard1ToHistory = progBetweenSec(frame, 2.51, 3.1, EASE_IO);
  const card1HistoryY = -340 * pCard1ToHistory;
  const card1HistoryScale = 1 - 0.18 * pCard1ToHistory; // drops to 82%
  const card1HistoryOpacity = 1 - 0.35 * pCard1ToHistory; // drops to 65%

  // 00:03.54: Card 2 enters from bottom: 食べます
  const pCard2In = prog(frame, sec(3.54), sec(0.35), EASE);
  const card2Spring = pop(frame, fps, sec(3.54), SPRING);
  const card2Scale = 0.88 + 0.12 * card2Spring;
  const card2Y = (1 - pCard2In) * 220;

  // 00:04.05: Gold pulse on 食
  const pulseP = progBetweenSec(frame, 4.05, 4.35, EASE);
  const shoku2PulseScale = 1 + Math.sin(pulseP * Math.PI) * 0.14;
  const shoku2Glow = Math.sin(pulseP * Math.PI) * 25;

  // 00:05.06: Reveal たべます
  const pTabemasuReading = pop(frame, fps, sec(5.06), SPRING);

  // 00:06.30: Fade/slide out both cards
  const pExit = progBetweenSec(frame, 6.3, 6.69, EASE_IO);
  const exitOpacity = 1 - pExit;
  const exitY = -pExit * 100;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${camScale}) translateY(${exitY}px)`,
        opacity: exitOpacity,
        pointerEvents: 'none',
      }}
    >
      {sfx && (
        <>
          <Sfx name="pop" at={sec(0.28)} volume={0.65} />
          <Sfx name="ding" at={sec(2.11)} volume={0.6} />
          <Sfx name="swipe" at={sec(3.54)} volume={0.55} />
          <Sfx name="ding" at={sec(5.06)} volume={0.6} />
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
        {/* ================= CARD 1: 食べる ================= */}
        {frame >= sec(0.28) && (
          <div
            style={{
              position: 'absolute',
              transform: `translateY(${card1YEntry + card1HistoryY}px) scale(${card1ScaleEntry * card1HistoryScale})`,
              opacity: pCard1In * card1HistoryOpacity,
            }}
          >
            <Surface
              tone="card"
              radius={44}
              border={pCard1ToHistory > 0.5 ? C.borderSubtle : C.borderPrimary}
              style={{
                width: 780,
                padding: '48px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 24px 60px rgba(0,0,0,0.65)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  minHeight: 160,
                  whiteSpace: 'nowrap',
                }}
              >
                {/* Fixed container for Kanji 食 so X coordinates align perfectly */}
                <div
                  style={{
                    width: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      opacity: pShoku1,
                      transform: `scale(${0.7 + 0.3 * pShoku1})`,
                      display: 'inline-block',
                      textShadow: '0 0 28px rgba(240,190,82,0.45)',
                    }}
                  >
                    食
                  </span>
                </div>

                {/* Okurigana べる */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    opacity: pBeru1,
                    transform: `translateX(${beru1X}px)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.text,
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    べる
                  </span>
                </div>
              </div>

              {/* Reveal たべる */}
              {frame >= sec(2.11) && (
                <div
                  style={{
                    marginTop: 16,
                    height: 52,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pTaberuReading,
                    transform: `translateY(${(1 - pTaberuReading) * 16}px)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 48,
                      fontWeight: 700,
                      color: C.goldSoft,
                      letterSpacing: 6,
                    }}
                  >
                    たべる
                  </span>
                </div>
              )}
            </Surface>
          </div>
        )}

        {/* ================= CARD 2: 食べます ================= */}
        {frame >= sec(3.54) && (
          <div
            style={{
              position: 'absolute',
              transform: `translateY(${card2Y + 120}px) scale(${card2Scale})`,
              opacity: pCard2In,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={C.gold}
              style={{
                width: 780,
                padding: '48px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  minHeight: 160,
                  whiteSpace: 'nowrap',
                }}
              >
                {/* Kanji 食 (Width 150px matches Card 1 exactly for identical X position) */}
                <div
                  style={{
                    width: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      display: 'inline-block',
                      transform: `scale(${shoku2PulseScale})`,
                      textShadow: `0 0 ${20 + shoku2Glow}px rgba(240,190,82,0.6)`,
                    }}
                  >
                    食
                  </span>
                </div>

                {/* Okurigana べます */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.text,
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    べます
                  </span>
                </div>
              </div>

              {/* Reveal たべます */}
              {frame >= sec(5.06) && (
                <div
                  style={{
                    marginTop: 16,
                    height: 52,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pTabemasuReading,
                    transform: `translateY(${(1 - pTabemasuReading) * 16}px)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 48,
                      fontWeight: 700,
                      color: C.goldSoft,
                      letterSpacing: 6,
                    }}
                  >
                    たべます
                  </span>
                </div>
              )}
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
