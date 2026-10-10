import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface, ThinkingFace} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene02_Quiz: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:06.69: Small pill NEXT appears
  const pNextPill = pop(frame, fps, sec(6.69), BOUNCY);

  // 00:07.08: Big card appears: 食事する
  const pCardIn = pop(frame, fps, sec(7.08), SPRING);

  // 00:07.70: Text "DIBACA APA?" appears above
  const pQuestionHeader = pop(frame, fps, sec(7.7), BOUNCY);

  // 00:08.20: ThinkingFace enters bottom right (scale 0.8 -> 1)
  const pThinkingIn = pop(frame, fps, sec(8.2), BOUNCY);
  const thinkingScale = 0.8 + 0.2 * pThinkingIn;

  // 00:09.15: Pulse 1 on 食
  const pulse1 = progBetweenSec(frame, 9.15, 9.45, EASE);
  const pulseScale1 = 1 + Math.sin(pulse1 * Math.PI) * 0.08;

  // 00:09.75: Pulse 2 on 食 + camera push 1 -> 1.035
  const pulse2 = progBetweenSec(frame, 9.75, 10.05, EASE);
  const pulseScale2 = 1 + Math.sin(pulse2 * Math.PI) * 0.12;
  const camPush = interpolate(frame, [sec(9.75), sec(10.5)], [1.0, 1.035], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 00:10.41: ThinkingFace reacts
  const isReact = frame >= sec(10.41) && frame < sec(11.52);

  // 00:10.50: Quick anticipation: card down 8px then rebound
  const pAnticipation = progBetweenSec(frame, 10.5, 10.8, EASE_IO);
  const cardAnticipationY = Math.sin(pAnticipation * Math.PI) * 8;

  // 00:11.52: Big reveal: しょくじする
  const pReveal = pop(frame, fps, sec(11.52), SPRING);

  // 00:12.70: Fast camera pull-back
  const camPull = interpolate(frame, [sec(12.7), sec(13.16)], [1.035, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  });

  // Phase transition at 00:13.16: multi-card stack comparison
  const isStackPhase = frame >= sec(13.16);

  // 00:13.16: Card 1 (食べる) enters top-left
  const pStack1In = pop(frame, fps, sec(13.16), SPRING);
  // 00:13.37: Card 2 (食べます) enters mid-left
  const pStack2In = pop(frame, fps, sec(13.37), SPRING);
  // 00:13.58: Card 3 (食事する) moves to bottom-left
  const pStack3In = pop(frame, fps, sec(13.58), SPRING);

  // 00:14.01: All characters except 食 drop to opacity 25%
  const pDimOther = progBetweenSec(frame, 14.01, 14.34, EASE);
  const otherOpacity = 1 - 0.75 * pDimOther;

  // 00:14.34: Readings on right appear: た / た / しょく
  const pReadingList = pop(frame, fps, sec(14.34), BOUNCY);

  // 00:14.70: Headline 1: KANJINYA SAMA.
  const pHead1 = pop(frame, fps, sec(14.7), BOUNCY);

  // 00:15.05: Headline 2: BACAANNYA BEDA?
  const pHead2 = pop(frame, fps, sec(15.05), BOUNCY);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${isStackPhase ? camPull : camPush})`,
        pointerEvents: 'none',
      }}
    >
      {sfx && (
        <>
          <Sfx name="impact-soft" at={sec(7.08)} />
          <Sfx name="ding" at={sec(11.7)} volume={0.65} />
          <Sfx name="error-soft" at={sec(15.05)} />
        </>
      )}

      {/* ================= PHASE 1: QUIZ CARD (00:06.69 to 00:13.16) ================= */}
      {!isStackPhase && (
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
          {/* Header Pill NEXT */}
          {frame >= sec(6.69) && (
            <div
              style={{
                position: 'absolute',
                top: 240,
                opacity: pNextPill,
                transform: `scale(${pNextPill})`,
              }}
            >
              <Pill color={C.indigoSoft} size={28}>
                NEXT · QUIZ
              </Pill>
            </div>
          )}

          {/* DIBACA APA? */}
          {frame >= sec(7.7) && (
            <div
              style={{
                position: 'absolute',
                top: 340,
                opacity: pQuestionHeader,
                transform: `translateY(${(1 - pQuestionHeader) * -20}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 54,
                  fontWeight: 900,
                  color: C.gold,
                  letterSpacing: 3,
                  textShadow: '0 0 30px rgba(240,190,82,0.4)',
                }}
              >
                DIBACA APA?
              </span>
            </div>
          )}

          {/* Quiz Card: 食事する */}
          {frame >= sec(7.08) && (
            <div
              style={{
                transform: `translateY(${cardAnticipationY}px) scale(${pCardIn})`,
                opacity: pCardIn,
              }}
            >
              <Surface
                tone="elevated"
                radius={48}
                border={C.gold}
                style={{
                  width: 820,
                  padding: '60px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.75)',
                }}
              >
                <div style={{display: 'flex', alignItems: 'baseline', minHeight: 200}}>
                  {/* Highlighted 食 */}
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 180,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pulseScale1 * pulseScale2})`,
                      display: 'inline-block',
                      textShadow: '0 0 32px rgba(240,190,82,0.5)',
                    }}
                  >
                    食
                  </span>

                  {/* Dimmed 事する */}
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 180,
                      fontWeight: 900,
                      color: C.text,
                      opacity: frame >= sec(7.36) ? 0.45 : 1,
                      display: 'inline-block',
                    }}
                  >
                    事する
                  </span>
                </div>

                {/* Big Reading Reveal: しょくじする */}
                {frame >= sec(11.52) && (
                  <div
                    style={{
                      marginTop: 24,
                      display: 'flex',
                      alignItems: 'center',
                      opacity: pReveal,
                      transform: `translateY(${(1 - pReveal) * 20}px)`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 60,
                        fontWeight: 900,
                        color: frame >= sec(11.7) ? C.gold : C.text,
                        letterSpacing: 4,
                        textShadow:
                          frame >= sec(11.7)
                            ? '0 0 24px rgba(240,190,82,0.5)'
                            : undefined,
                      }}
                    >
                      しょく
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 60,
                        fontWeight: 900,
                        color: C.text,
                        letterSpacing: 4,
                      }}
                    >
                      じする
                    </span>
                  </div>
                )}
              </Surface>
            </div>
          )}

          {/* ThinkingFace bottom-right */}
          {frame >= sec(8.2) && (
            <div
              style={{
                position: 'absolute',
                bottom: 490,
                right: 90,
                opacity: pThinkingIn,
                transform: `scale(${thinkingScale})`,
              }}
            >
              <ThinkingFace
                size={140}
                state={isReact ? 'react' : 'thinking'}
              />
            </div>
          )}
        </div>
      )}

      {/* ================= PHASE 2: COMPARISON STACK (00:13.16 to 00:16.89) ================= */}
      {isStackPhase && (
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
          {/* Headlines on top */}
          <div
            style={{
              position: 'absolute',
              top: 260,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {frame >= sec(14.7) && (
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 56,
                  fontWeight: 900,
                  color: C.text,
                  letterSpacing: 2,
                  opacity: pHead1,
                  transform: `scale(${pHead1})`,
                }}
              >
                KANJINYA SAMA.
              </span>
            )}
            {frame >= sec(15.05) && (
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 64,
                  fontWeight: 900,
                  color: C.hanko,
                  letterSpacing: 2,
                  opacity: pHead2,
                  transform: `scale(${pHead2})`,
                  textShadow: '0 0 30px rgba(226,85,91,0.5)',
                }}
              >
                BACAANNYA BEDA?
              </span>
            )}
          </div>

          {/* 3 Vertically Aligned Cards + Readings */}
          <div
            style={{
              marginTop: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: 26,
              width: 820,
            }}
          >
            {/* Row 1: 食べる */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: pStack1In,
                transform: `translateX(${(1 - pStack1In) * -80}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                style={{
                  padding: '20px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 480,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 72,
                    fontWeight: 900,
                    color: C.gold,
                    width: 90,
                    textAlign: 'center',
                  }}
                >
                  食
                </span>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 72,
                    fontWeight: 900,
                    color: C.text,
                    opacity: otherOpacity,
                  }}
                >
                  べる
                </span>
              </Surface>

              {frame >= sec(14.34) && (
                <div
                  style={{
                    opacity: pReadingList,
                    transform: `scale(${pReadingList})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontSize: 36, color: C.indigoSoft}}>
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 54,
                      fontWeight: 800,
                      color: C.goldSoft,
                    }}
                  >
                    た
                  </span>
                </div>
              )}
            </div>

            {/* Row 2: 食べます */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: pStack2In,
                transform: `translateX(${(1 - pStack2In) * -80}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                style={{
                  padding: '20px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 480,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 72,
                    fontWeight: 900,
                    color: C.gold,
                    width: 90,
                    textAlign: 'center',
                  }}
                >
                  食
                </span>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 72,
                    fontWeight: 900,
                    color: C.text,
                    opacity: otherOpacity,
                  }}
                >
                  べます
                </span>
              </Surface>

              {frame >= sec(14.34) && (
                <div
                  style={{
                    opacity: pReadingList,
                    transform: `scale(${pReadingList})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontSize: 36, color: C.indigoSoft}}>
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 54,
                      fontWeight: 800,
                      color: C.goldSoft,
                    }}
                  >
                    た
                  </span>
                </div>
              )}
            </div>

            {/* Row 3: 食事する */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: pStack3In,
                transform: `translateX(${(1 - pStack3In) * -80}px)`,
              }}
            >
              <Surface
                tone="elevated"
                radius={28}
                border={C.gold}
                style={{
                  padding: '20px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 480,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 72,
                    fontWeight: 900,
                    color: C.gold,
                    width: 90,
                    textAlign: 'center',
                  }}
                >
                  食
                </span>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 72,
                    fontWeight: 900,
                    color: C.text,
                    opacity: otherOpacity,
                  }}
                >
                  事する
                </span>
              </Surface>

              {frame >= sec(14.34) && (
                <div
                  style={{
                    opacity: pReadingList,
                    transform: `scale(${pReadingList})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontSize: 36, color: C.indigoSoft}}>
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 54,
                      fontWeight: 900,
                      color: C.hanko,
                      textShadow: '0 0 20px rgba(226,85,91,0.5)',
                    }}
                  >
                    しょく
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
