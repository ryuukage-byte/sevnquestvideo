import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene12_ChangeTheQuestion: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 01:32.10: Center 食
  const pCenterShoku = pop(frame, fps, sec(92.1), BOUNCY);

  // 01:34.07: Old question "KANJI INI DIBACA APA?"
  const pOldQ = pop(frame, fps, sec(94.07), SPRING);

  // 01:35.31: Question shrinks to 45% opacity
  const pOldQDim = progBetweenSec(frame, 95.31, 95.8, EASE);
  const oldQOpacity = 1 - 0.55 * pOldQDim;
  const oldQScale = 1 - 0.15 * pOldQDim;

  // 01:36.08: Big text "TAPI..."
  const pTapi = pop(frame, fps, sec(96.08), BOUNCY);

  // 01:36.65: 4 Kotoba spawn surrounding 食
  const pK1 = pop(frame, fps, sec(96.65), SPRING); // 食べる (top)
  const pK2 = pop(frame, fps, sec(96.8), SPRING); // 食事 (right)
  const pK3 = pop(frame, fps, sec(96.95), SPRING); // 食堂 (bottom)
  const pK4 = pop(frame, fps, sec(97.1), SPRING); // 食欲 (left)

  // 01:38.00: Strike-through on old question
  const pStrike = progBetweenSec(frame, 98.0, 98.5, EASE);

  // 01:38.84: New Question: "DI KOTOBA INI, 食 DIBACA APA?"
  const pNewQ = pop(frame, fps, sec(98.84), BOUNCY);

  // 01:39.58: Final Flow Diagram
  const isFinalDiagram = frame >= sec(99.58);
  const pDiagram = pop(frame, fps, sec(99.58), SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="ding" at={sec(98.84)} volume={0.65} />
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
        {/* ================= BEFORE FINAL DIAGRAM ================= */}
        {!isFinalDiagram ? (
          <>
            {/* Top Question Area */}
            <div
              style={{
                position: 'absolute',
                top: 260,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Old Question */}
              {frame >= sec(94.07) && (
                <div
                  style={{
                    position: 'relative',
                    opacity: pOldQ * oldQOpacity,
                    transform: `scale(${pOldQ * oldQScale})`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 44,
                      fontWeight: 800,
                      color: C.textSecondary,
                      letterSpacing: 2,
                    }}
                  >
                    “KANJI INI DIBACA APA?”
                  </span>

                  {/* Strikethrough line */}
                  {frame >= sec(98.0) && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: -10,
                        height: 4,
                        width: `${pStrike * 105}%`,
                        background: C.hanko,
                        borderRadius: 2,
                      }}
                    />
                  )}
                </div>
              )}

              {/* TAPI... */}
              {frame >= sec(96.08) && frame < sec(98.84) && (
                <div style={{opacity: pTapi, transform: `scale(${pTapi})`}}>
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 52,
                      fontWeight: 900,
                      color: C.gold,
                      letterSpacing: 3,
                    }}
                  >
                    TAPI...
                  </span>
                </div>
              )}

              {/* New Paradigm Question */}
              {frame >= sec(98.84) && (
                <div
                  style={{
                    opacity: pNewQ,
                    transform: `scale(${pNewQ})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
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
                    “DI KOTOBA INI,
                  </span>
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
                    食 DIBACA APA?”
                  </span>
                </div>
              )}
            </div>

            {/* Center Area: Kanji 食 surrounded by 4 Kotoba */}
            <div
              style={{
                position: 'relative',
                width: 600,
                height: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 180,
              }}
            >
              {/* Center Root 食 */}
              <div
                style={{
                  position: 'relative',
                  opacity: pCenterShoku,
                  transform: `scale(${pCenterShoku})`,
                  zIndex: 10,
                }}
              >
                <Surface
                  tone="elevated"
                  radius={40}
                  border={C.gold}
                  style={{
                    width: 220,
                    height: 220,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 150,
                      fontWeight: 900,
                      color: C.gold,
                      textShadow: '0 0 35px rgba(240,190,82,0.5)',
                    }}
                  >
                    食
                  </span>
                </Surface>
              </div>

              {/* Satellite 1: 食べる (Top) */}
              {frame >= sec(96.65) && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    opacity: pK1,
                    transform: `scale(${pK1})`,
                    zIndex: 15,
                  }}
                >
                  <Pill color={C.matcha} size={28} filled>
                    食べる
                  </Pill>
                </div>
              )}

              {/* Satellite 2: 食事 (Right) */}
              {frame >= sec(96.8) && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    opacity: pK2,
                    transform: `scale(${pK2})`,
                    zIndex: 15,
                  }}
                >
                  <Pill color={C.fuji} size={28} filled>
                    食事
                  </Pill>
                </div>
              )}

              {/* Satellite 3: 食堂 (Bottom) */}
              {frame >= sec(96.95) && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    opacity: pK3,
                    transform: `scale(${pK3})`,
                    zIndex: 15,
                  }}
                >
                  <Pill color={C.indigoSoft} size={28} filled>
                    食堂
                  </Pill>
                </div>
              )}

              {/* Satellite 4: 食欲 (Left) */}
              {frame >= sec(97.1) && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    opacity: pK4,
                    transform: `scale(${pK4})`,
                    zIndex: 15,
                  }}
                >
                  <Pill color={C.gold} size={28} filled>
                    食欲
                  </Pill>
                </div>
              )}
            </div>
          </>
        ) : (
          /* ================= FINAL FLOW DIAGRAM (01:39.58+) ================= */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              opacity: pDiagram,
              transform: `scale(${pDiagram})`,
            }}
          >
            {/* Step 1: KANJI + KOTOBA */}
            <Surface
              tone="elevated"
              radius={32}
              border={C.gold}
              style={{padding: '24px 60px'}}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 48,
                  fontWeight: 900,
                  color: C.gold,
                  letterSpacing: 2,
                }}
              >
                KANJI + KOTOBA
              </span>
            </Surface>

            <span style={{fontFamily: FONT.mono, fontSize: 44, color: C.indigoSoft}}>
              ↓
            </span>

            {/* Step 2: READING */}
            <Surface
              tone="card"
              radius={32}
              border={C.borderPrimary}
              style={{padding: '24px 60px'}}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 48,
                  fontWeight: 900,
                  color: C.text,
                  letterSpacing: 2,
                }}
              >
                READING (CARA BACA)
              </span>
            </Surface>

            <span style={{fontFamily: FONT.mono, fontSize: 44, color: C.indigoSoft}}>
              ↓
            </span>

            {/* Step 3: MAKNA */}
            <Surface
              tone="card"
              radius={32}
              border={C.matcha}
              style={{padding: '24px 60px'}}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 48,
                  fontWeight: 900,
                  color: C.matcha,
                  letterSpacing: 2,
                }}
              >
                MAKNA DALAM KONTEKS
              </span>
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
