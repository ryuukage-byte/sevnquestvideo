import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene11_ExampleCards: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 01:15.11: Header Label CONTOH
  const pContoh = pop(frame, fps, sec(75.11), BOUNCY);

  // ================= CARD 1: 食べる =================
  const pC1In = pop(frame, fps, sec(76.2), SPRING);
  const pC1Reading = pop(frame, fps, sec(76.61), SPRING);
  const isC1TaHl = frame >= sec(77.92) && frame < sec(78.4);
  const isC1BeruHl = frame >= sec(78.4);
  const pC1Meaning = pop(frame, fps, sec(79.66), BOUNCY);
  // Shift left at 01:20.20
  const pC1ShiftLeft = progBetweenSec(frame, 80.2, 80.8, EASE_IO);
  // Final carousel shift at 01:30.70
  const pCarouselFinal = progBetweenSec(frame, 90.7, 91.2, EASE_IO);

  // ================= CARD 2: 食事 =================
  const pC2In = pop(frame, fps, sec(81.0), SPRING);
  const pC2Reading = pop(frame, fps, sec(81.25), SPRING);
  const isC2Sho = frame >= sec(82.33) && frame < sec(82.6);
  const isC2Ku = frame >= sec(82.6) && frame < sec(82.88);
  const isC2Ji = frame >= sec(82.88);
  const pC2Meaning = pop(frame, fps, sec(84.05), BOUNCY);
  // Shift left at 01:25.21
  const pC2ShiftLeft = progBetweenSec(frame, 85.21, 85.8, EASE_IO);

  // ================= CARD 3: 食堂 =================
  const pC3In = pop(frame, fps, sec(86.34), SPRING);
  const pC3Reading = pop(frame, fps, sec(86.6), SPRING);
  const isC3Sho = frame >= sec(87.78) && frame < sec(88.02);
  const isC3Ku = frame >= sec(88.02) && frame < sec(88.27);
  const isC3Dou = frame >= sec(88.27);
  const pC3Meaning = pop(frame, fps, sec(89.41), BOUNCY);
  const isC3Expanded = frame >= sec(90.08);

  // Layout positions:
  // Card 1: starts center (X=0), shifts to left (-260), then final carousel position (-340)
  const c1X = -260 * pC1ShiftLeft - 80 * pCarouselFinal;
  const c1Scale = 1 - 0.15 * pC1ShiftLeft;

  // Card 2: starts center (X=0) relative to right, then shifts left (-80), then carousel (X=0)
  const c2X = 140 * (1 - pC2ShiftLeft) - 140 * pCarouselFinal;
  const c2Scale = pCarouselFinal > 0 ? 0.85 : 1;

  // Card 3: starts right/center, then carousel (+340)
  const c3X = 260 + 80 * pCarouselFinal;
  const c3Scale = pCarouselFinal > 0 ? 0.85 : 1;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="ding" at={sec(79.66)} volume={0.65} />
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
        {/* Header Pill: CONTOH */}
        {frame >= sec(75.11) && (
          <div
            style={{
              position: 'absolute',
              top: 260,
              opacity: pContoh,
              transform: `scale(${pContoh})`,
            }}
          >
            <Pill color={C.gold} size={26}>
              CONTOH KOTOBA NYATA
            </Pill>
          </div>
        )}

        {/* Carousel Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ================= CARD 1: 食べる ================= */}
          {frame >= sec(76.2) && (
            <div
              style={{
                position: 'absolute',
                transform: `translateX(${c1X}px) scale(${c1Scale * pC1In})`,
                opacity: pC1In,
                zIndex: pC1ShiftLeft > 0.8 ? 5 : 10,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.matcha}
                style={{
                  width: 320,
                  padding: '36px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.65)',
                }}
              >
                {/* Kanji: 食べる */}
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 76,
                    fontWeight: 900,
                    color: C.text,
                  }}
                >
                  <span
                    style={{
                      color: C.gold,
                      textShadow: isC1TaHl ? '0 0 24px rgba(240,190,82,0.8)' : undefined,
                    }}
                  >
                    食
                  </span>
                  <span style={{color: isC1BeruHl ? C.matcha : C.text}}>べる</span>
                </span>

                {/* Reading: たべる */}
                {frame >= sec(76.61) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 36,
                      fontWeight: 700,
                      color: C.goldSoft,
                      marginTop: 12,
                      opacity: pC1Reading,
                    }}
                  >
                    <span style={{color: isC1TaHl ? C.gold : 'inherit'}}>た</span>
                    <span style={{color: isC1BeruHl ? C.matcha : 'inherit'}}>べる</span>
                  </span>
                )}

                {/* Meaning: makan */}
                {frame >= sec(79.66) && (
                  <div
                    style={{
                      marginTop: 18,
                      paddingTop: 14,
                      borderTop: '1px dashed rgba(151,181,224,0.3)',
                      width: '80%',
                      textAlign: 'center',
                      opacity: pC1Meaning,
                      transform: `scale(${pC1Meaning})`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 28,
                        fontWeight: 800,
                        color: C.matcha,
                      }}
                    >
                      makan
                    </span>
                  </div>
                )}
              </Surface>
            </div>
          )}

          {/* ================= CARD 2: 食事 ================= */}
          {frame >= sec(81.0) && (
            <div
              style={{
                position: 'absolute',
                transform: `translateX(${c2X}px) scale(${c2Scale * pC2In})`,
                opacity: pC2In,
                zIndex: pC2ShiftLeft > 0.8 ? 6 : 10,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.fuji}
                style={{
                  width: 320,
                  padding: '36px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.65)',
                }}
              >
                {/* Kanji: 食事 */}
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 76,
                    fontWeight: 900,
                    color: C.text,
                  }}
                >
                  <span style={{color: C.gold}}>食</span>事
                </span>

                {/* Reading: しょくじ */}
                {frame >= sec(81.25) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 36,
                      fontWeight: 700,
                      color: C.goldSoft,
                      marginTop: 12,
                      opacity: pC2Reading,
                    }}
                  >
                    <span style={{color: isC2Sho ? C.gold : 'inherit'}}>しょ</span>
                    <span style={{color: isC2Ku ? C.gold : 'inherit'}}>く</span>
                    <span style={{color: isC2Ji ? C.fuji : 'inherit'}}>じ</span>
                  </span>
                )}

                {/* Meaning: makan / hidangan */}
                {frame >= sec(84.05) && (
                  <div
                    style={{
                      marginTop: 18,
                      paddingTop: 14,
                      borderTop: '1px dashed rgba(151,181,224,0.3)',
                      width: '85%',
                      textAlign: 'center',
                      opacity: pC2Meaning,
                      transform: `scale(${pC2Meaning})`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 24,
                        fontWeight: 800,
                        color: C.fuji,
                      }}
                    >
                      hidangan
                    </span>
                  </div>
                )}
              </Surface>
            </div>
          )}

          {/* ================= CARD 3: 食堂 ================= */}
          {frame >= sec(86.34) && (
            <div
              style={{
                position: 'absolute',
                transform: `translateX(${c3X}px) scale(${c3Scale * pC3In})`,
                opacity: pC3In,
                zIndex: 10,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.gold}
                style={{
                  width: 320,
                  padding: '36px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.65)',
                }}
              >
                {/* Kanji: 食堂 */}
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 76,
                    fontWeight: 900,
                    color: C.text,
                  }}
                >
                  <span style={{color: C.gold}}>食</span>堂
                </span>

                {/* Reading: しょくどう */}
                {frame >= sec(86.6) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 36,
                      fontWeight: 700,
                      color: C.goldSoft,
                      marginTop: 12,
                      opacity: pC3Reading,
                    }}
                  >
                    <span style={{color: isC3Sho ? C.gold : 'inherit'}}>しょ</span>
                    <span style={{color: isC3Ku ? C.gold : 'inherit'}}>く</span>
                    <span style={{color: isC3Dou ? C.gold : 'inherit'}}>どう</span>
                  </span>
                )}

                {/* Meaning: kantin / ruang makan */}
                {frame >= sec(89.41) && (
                  <div
                    style={{
                      marginTop: 18,
                      paddingTop: 14,
                      borderTop: '1px dashed rgba(151,181,224,0.3)',
                      width: '90%',
                      textAlign: 'center',
                      opacity: pC3Meaning,
                      transform: `scale(${pC3Meaning})`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 22,
                        fontWeight: 800,
                        color: C.gold,
                      }}
                    >
                      {isC3Expanded ? 'kantin / ruang makan' : 'kantin'}
                    </span>
                  </div>
                )}
              </Surface>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
