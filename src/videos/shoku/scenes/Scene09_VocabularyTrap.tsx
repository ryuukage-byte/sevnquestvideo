import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Surface, ThinkingFace} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene09_VocabularyTrap: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // Slot machine cycles:
  // Slot 1: 事 (01:05.52 - 01:06.50)
  const pJiIn = pop(frame, fps, sec(65.52), BOUNCY);
  const pJiOut = progBetweenSec(frame, 66.5, 66.83, EASE_IO);

  // Slot 2: 堂 (01:06.83 - 01:07.90)
  const pDouIn = pop(frame, fps, sec(66.83), BOUNCY);
  const pDouOut = progBetweenSec(frame, 67.9, 68.3, EASE_IO);

  // Slot 3: 欲 (01:08.76 - 01:09.37)
  const pYokuIn = pop(frame, fps, sec(68.76), BOUNCY);

  // Split into 3 cards at 01:09.37
  const isSplitPhase = frame >= sec(69.37);
  const pSplit = pop(frame, fps, sec(69.37), SPRING);

  // ThinkingFace enters at 01:10.07
  const pThinking = pop(frame, fps, sec(70.07), BOUNCY);

  // Bubble "Kok bukan た?" at 01:10.35
  const pBubble = pop(frame, fps, sec(70.35), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="tick" at={sec(65.52)} volume={0.65} />
          <Sfx name="tick" at={sec(66.83)} volume={0.65} />
          <Sfx name="tick" at={sec(68.76)} volume={0.65} />
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
        {/* ================= PHASE 1: SLOT ANIMATION (Before 01:09.37) ================= */}
        {!isSplitPhase && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Surface
              tone="elevated"
              radius={48}
              border={C.borderPrimary}
              style={{
                width: 720,
                padding: '50px 30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
              }}
            >
              {/* Fixed Kanji Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 180,
                  position: 'relative',
                }}
              >
                {/* Fixed 食 at strictly constant X */}
                <div
                  style={{
                    width: 180,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 160,
                      fontWeight: 900,
                      color: C.gold,
                      textShadow: '0 0 30px rgba(240,190,82,0.4)',
                    }}
                  >
                    食
                  </span>
                </div>

                {/* Vertical Slot Window for Second Kanji */}
                <div
                  style={{
                    width: 180,
                    height: 180,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Kanji 事 */}
                  {frame >= sec(65.52) && frame < sec(66.83) && (
                    <div
                      style={{
                        position: 'absolute',
                        transform: `translateY(${(1 - pJiIn) * 140 - pJiOut * 140}px)`,
                        opacity: pJiIn * (1 - pJiOut),
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT.jp,
                          fontSize: 160,
                          fontWeight: 900,
                          color: C.text,
                        }}
                      >
                        事
                      </span>
                    </div>
                  )}

                  {/* Kanji 堂 */}
                  {frame >= sec(66.83) && frame < sec(68.3) && (
                    <div
                      style={{
                        position: 'absolute',
                        transform: `translateY(${(1 - pDouIn) * 140 - pDouOut * 140}px)`,
                        opacity: pDouIn * (1 - pDouOut),
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT.jp,
                          fontSize: 160,
                          fontWeight: 900,
                          color: C.text,
                        }}
                      >
                        堂
                      </span>
                    </div>
                  )}

                  {/* Kanji 欲 */}
                  {frame >= sec(68.76) && (
                    <div
                      style={{
                        position: 'absolute',
                        transform: `translateY(${(1 - pYokuIn) * 140}px)`,
                        opacity: pYokuIn,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT.jp,
                          fontSize: 160,
                          fontWeight: 900,
                          color: C.text,
                        }}
                      >
                        欲
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Reading Display */}
              <div style={{height: 50, marginTop: 14, display: 'flex', alignItems: 'center'}}>
                {frame >= sec(65.52) && frame < sec(66.83) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 44,
                      fontWeight: 700,
                      color: C.goldSoft,
                      letterSpacing: 4,
                    }}
                  >
                    しょくじ
                  </span>
                )}
                {frame >= sec(66.83) && frame < sec(68.3) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 44,
                      fontWeight: 700,
                      color: C.goldSoft,
                      letterSpacing: 4,
                    }}
                  >
                    しょくどう
                  </span>
                )}
                {frame >= sec(68.76) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 44,
                      fontWeight: 700,
                      color: C.goldSoft,
                      letterSpacing: 4,
                    }}
                  >
                    しょくよく
                  </span>
                )}
              </div>
            </Surface>
          </div>
        )}

        {/* ================= PHASE 2: 3 CARDS SPREAD (01:09.37+) ================= */}
        {isSplitPhase && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* 3 Vocabulary Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                width: 680,
                opacity: pSplit,
                transform: `scale(${pSplit})`,
              }}
            >
              {/* Card 1: 食事 */}
              <Surface
                tone="card"
                radius={32}
                border={C.fuji}
                style={{
                  padding: '24px 40px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 64, fontWeight: 900, color: C.text}}>
                  <span style={{color: C.gold}}>食</span>事
                </span>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 42,
                    fontWeight: 800,
                    color: C.goldSoft,
                  }}
                >
                  しょくじ
                </span>
              </Surface>

              {/* Card 2: 食堂 */}
              <Surface
                tone="card"
                radius={32}
                border={C.fuji}
                style={{
                  padding: '24px 40px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 64, fontWeight: 900, color: C.text}}>
                  <span style={{color: C.gold}}>食</span>堂
                </span>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 42,
                    fontWeight: 800,
                    color: C.goldSoft,
                  }}
                >
                  しょくどう
                </span>
              </Surface>

              {/* Card 3: 食欲 */}
              <Surface
                tone="elevated"
                radius={32}
                border={C.gold}
                style={{
                  padding: '24px 40px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 64, fontWeight: 900, color: C.text}}>
                  <span style={{color: C.gold}}>食</span>欲
                </span>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 42,
                    fontWeight: 800,
                    color: C.goldSoft,
                  }}
                >
                  しょくよく
                </span>
              </Surface>
            </div>

            {/* ThinkingFace & Bubble "Kok bukan た?" */}
            {frame >= sec(70.07) && (
              <div
                style={{
                  marginTop: 60,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 30,
                  opacity: pThinking,
                  transform: `scale(${pThinking})`,
                }}
              >
                <ThinkingFace size={130} state="thinking" />

                {frame >= sec(70.35) && (
                  <div
                    style={{
                      opacity: pBubble,
                      transform: `scale(${pBubble})`,
                    }}
                  >
                    <Surface
                      tone="elevated"
                      radius={28}
                      border={C.hanko}
                      style={{padding: '18px 32px'}}
                    >
                      <span
                        style={{
                          fontFamily: FONT.display,
                          fontSize: 38,
                          fontWeight: 900,
                          color: C.hanko,
                          letterSpacing: 1,
                        }}
                      >
                        “Kok bukan た?”
                      </span>
                    </Surface>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
