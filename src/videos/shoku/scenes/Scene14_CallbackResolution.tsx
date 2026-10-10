import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Stamp, Surface, ThinkingFace} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene14_CallbackResolution: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 01:51.70: Callback trio cards
  const pTrioIn = pop(frame, fps, sec(111.7), SPRING);

  // 01:53.00: Readings appear naturally without questions
  const pReadingsIn = pop(frame, fps, sec(113.0), BOUNCY);

  // 01:54.41: ThinkingFace appears
  const pThinkingIn = pop(frame, fps, sec(114.41), BOUNCY);

  // Bubbles
  const pBubbleLah = pop(frame, fps, sec(115.78), BOUNCY); // Lah?
  const pBubbleBerubah = pop(frame, fps, sec(116.4), BOUNCY); // Kok bacaannya berubah?

  // 01:57.40: Bubbles collapse
  const pBubbleCollapse = progBetweenSec(frame, 117.4, 117.65, EASE_IO);
  const bubbleScale = (1 - pBubbleCollapse);

  // 01:57.65: ThinkingFace turns to success / understanding state
  const isSuccessFace = frame >= sec(117.65);

  // Phase 2 at 01:58.32: Kotoba + Konteks -> Pemahaman
  const isFormulaPhase = frame >= sec(118.32) && frame < sec(122.36);
  const pFormula = pop(frame, fps, sec(118.32), SPRING);
  const pPlus = pop(frame, fps, sec(119.45), BOUNCY);
  const pKonteks = pop(frame, fps, sec(119.7), BOUNCY);
  const pPemahaman = pop(frame, fps, sec(120.3), BOUNCY);

  // Phase 3 at 02:02.36: Old Card (食 = た) vs Real System
  const isFinalComparison = frame >= sec(122.36);
  const pOldCardIn = pop(frame, fps, sec(122.36), SPRING);
  const pDimOld = progBetweenSec(frame, 122.9, 123.2, EASE);
  const pStamp = pop(frame, fps, sec(123.2), BOUNCY); // BUKAN CUMA INI
  const pTransform = pop(frame, fps, sec(123.7), SPRING);

  // 02:04.55: Final Headline
  const pFinalHead = pop(frame, fps, sec(124.55), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="ding" at={sec(117.65)} volume={0.65} />
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
        {/* ================= PHASE 1: CALLBACK TRIO (01:51.22 to 01:58.32) ================= */}
        {!isFormulaPhase && !isFinalComparison && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Top Trio Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                width: 720,
                opacity: pTrioIn,
                transform: `scale(${pTrioIn})`,
              }}
            >
              {/* Row 1: 食べる -> たべる */}
              <Surface
                tone="card"
                radius={28}
                border={C.borderPrimary}
                style={{
                  padding: '18px 36px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 60, fontWeight: 900, color: C.text}}>
                  <span style={{color: C.gold}}>食</span>べる
                </span>
                {frame >= sec(113.0) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 44,
                      fontWeight: 800,
                      color: C.goldSoft,
                      opacity: pReadingsIn,
                    }}
                  >
                    → たべる
                  </span>
                )}
              </Surface>

              {/* Row 2: 食事 -> しょくじ */}
              <Surface
                tone="card"
                radius={28}
                border={C.borderPrimary}
                style={{
                  padding: '18px 36px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 60, fontWeight: 900, color: C.text}}>
                  <span style={{color: C.gold}}>食</span>事
                </span>
                {frame >= sec(113.0) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 44,
                      fontWeight: 800,
                      color: C.goldSoft,
                      opacity: pReadingsIn,
                    }}
                  >
                    → しょくじ
                  </span>
                )}
              </Surface>

              {/* Row 3: 食堂 -> しょくどう */}
              <Surface
                tone="card"
                radius={28}
                border={C.borderPrimary}
                style={{
                  padding: '18px 36px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 60, fontWeight: 900, color: C.text}}>
                  <span style={{color: C.gold}}>食</span>堂
                </span>
                {frame >= sec(113.0) && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 44,
                      fontWeight: 800,
                      color: C.goldSoft,
                      opacity: pReadingsIn,
                    }}
                  >
                    → しょくどう
                  </span>
                )}
              </Surface>
            </div>

            {/* ThinkingFace & Dynamic Understanding Reaction */}
            {frame >= sec(114.41) && (
              <div
                style={{
                  marginTop: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: pThinkingIn,
                }}
              >
                {/* Question Bubbles before collapse */}
                {bubbleScale > 0.05 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 20,
                      transform: `scale(${bubbleScale})`,
                      opacity: bubbleScale,
                    }}
                  >
                    {frame >= sec(115.78) && (
                      <Surface
                        tone="elevated"
                        radius={20}
                        border={C.hanko}
                        style={{padding: '10px 24px', opacity: pBubbleLah}}
                      >
                        <span style={{fontFamily: FONT.display, fontSize: 32, fontWeight: 800, color: C.hanko}}>
                          “Lah?”
                        </span>
                      </Surface>
                    )}

                    {frame >= sec(116.4) && (
                      <Surface
                        tone="elevated"
                        radius={20}
                        border={C.hanko}
                        style={{padding: '10px 24px', opacity: pBubbleBerubah}}
                      >
                        <span style={{fontFamily: FONT.display, fontSize: 32, fontWeight: 800, color: C.hanko}}>
                          “Kok bacaannya berubah?”
                        </span>
                      </Surface>
                    )}
                  </div>
                )}

                <ThinkingFace
                  size={150}
                  state={isSuccessFace ? 'success' : 'thinking'}
                />
              </div>
            )}
          </div>
        )}

        {/* ================= PHASE 2: FORMULA FLOW (01:58.32 to 02:02.36) ================= */}
        {isFormulaPhase && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 26,
              opacity: pFormula,
              transform: `scale(${pFormula})`,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              {/* KOTOBA */}
              <Surface
                tone="elevated"
                radius={32}
                border={C.gold}
                style={{padding: '24px 44px'}}
              >
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 52,
                    fontWeight: 900,
                    color: C.gold,
                    letterSpacing: 2,
                  }}
                >
                  KOTOBA
                </span>
              </Surface>

              {/* + */}
              {frame >= sec(119.45) && (
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 48,
                    fontWeight: 900,
                    color: C.text,
                    opacity: pPlus,
                  }}
                >
                  +
                </span>
              )}

              {/* KONTEKS */}
              {frame >= sec(119.7) && (
                <div style={{opacity: pKonteks, transform: `scale(${pKonteks})`}}>
                  <Surface
                    tone="elevated"
                    radius={32}
                    border={C.matcha}
                    style={{padding: '24px 44px'}}
                  >
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 52,
                        fontWeight: 900,
                        color: C.matcha,
                        letterSpacing: 2,
                      }}
                    >
                      KONTEKS
                    </span>
                  </Surface>
                </div>
              )}
            </div>

            {/* Arrow */}
            {frame >= sec(120.3) && (
              <span style={{fontFamily: FONT.mono, fontSize: 44, color: C.indigoSoft}}>
                ↓
              </span>
            )}

            {/* PEMAHAMAN */}
            {frame >= sec(120.3) && (
              <div style={{opacity: pPemahaman, transform: `scale(${pPemahaman})`}}>
                <Surface
                  tone="card"
                  radius={36}
                  border={C.gold}
                  style={{
                    padding: '28px 60px',
                    boxShadow: '0 20px 60px rgba(240,190,82,0.3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 56,
                      fontWeight: 900,
                      color: C.text,
                      letterSpacing: 2,
                      textShadow: '0 0 28px rgba(240,190,82,0.4)',
                    }}
                  >
                    PEMAHAMAN UTUH
                  </span>
                </Surface>
              </div>
            )}
          </div>
        )}

        {/* ================= PHASE 3: FINAL RESOLUTION (02:02.36+) ================= */}
        {isFinalComparison && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Top Headline: BELAJAR LEWAT KOTOBA, BUKAN SATU BACAAN */}
            {frame >= sec(124.55) && (
              <div
                style={{
                  position: 'absolute',
                  top: -200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  opacity: pFinalHead,
                  transform: `scale(${pFinalHead})`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 52,
                    fontWeight: 900,
                    color: C.gold,
                    letterSpacing: 2,
                    textAlign: 'center',
                    textShadow: '0 0 35px rgba(240,190,82,0.5)',
                  }}
                >
                  BELAJAR LEWAT KOTOBA,
                </span>
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 48,
                    fontWeight: 900,
                    color: C.text,
                    letterSpacing: 2,
                    textAlign: 'center',
                  }}
                >
                  BUKAN SATU BACAAN.
                </span>
              </div>
            )}

            {/* Transformed Trio Card */}
            {frame < sec(123.7) ? (
              /* Old Card: 食 = た */
              <div
                style={{
                  opacity: pOldCardIn * (1 - 0.65 * pDimOld),
                  transform: `scale(${pOldCardIn})`,
                  position: 'relative',
                }}
              >
                <Surface
                  tone="card"
                  radius={40}
                  border={C.borderSubtle}
                  style={{padding: '40px 60px'}}
                >
                  <span style={{fontFamily: FONT.jp, fontSize: 100, fontWeight: 900, color: C.textSecondary}}>
                    食 = た
                  </span>
                </Surface>

                {frame >= sec(123.2) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${pStamp})`,
                      opacity: pStamp,
                      zIndex: 20,
                    }}
                  >
                    <Stamp text="BUKAN CUMA INI" color={C.hanko} size={36} rotate={-8} />
                  </div>
                )}
              </div>
            ) : (
              /* Final Kotoba Mapping: 食べる → た / 食事 → しょく / 食堂 → しょく */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  width: 720,
                  opacity: pTransform,
                  transform: `scale(${pTransform})`,
                }}
              >
                <Surface
                  tone="elevated"
                  radius={28}
                  border={C.gold}
                  style={{
                    padding: '18px 36px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{fontFamily: FONT.jp, fontSize: 52, fontWeight: 900, color: C.text}}>
                    <span style={{color: C.gold}}>食</span>べる
                  </span>
                  <span style={{fontFamily: FONT.jp, fontSize: 44, fontWeight: 900, color: C.matcha}}>
                    → た
                  </span>
                </Surface>

                <Surface
                  tone="elevated"
                  radius={28}
                  border={C.gold}
                  style={{
                    padding: '18px 36px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{fontFamily: FONT.jp, fontSize: 52, fontWeight: 900, color: C.text}}>
                    <span style={{color: C.gold}}>食</span>事
                  </span>
                  <span style={{fontFamily: FONT.jp, fontSize: 44, fontWeight: 900, color: C.fuji}}>
                    → しょく
                  </span>
                </Surface>

                <Surface
                  tone="elevated"
                  radius={28}
                  border={C.gold}
                  style={{
                    padding: '18px 36px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{fontFamily: FONT.jp, fontSize: 52, fontWeight: 900, color: C.text}}>
                    <span style={{color: C.gold}}>食</span>堂
                  </span>
                  <span style={{fontFamily: FONT.jp, fontSize: 44, fontWeight: 900, color: C.fuji}}>
                    → しょく
                  </span>
                </Surface>
              </div>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
