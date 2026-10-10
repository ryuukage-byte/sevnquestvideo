import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, EASE_IO, pop, prog, SPRING} from '../../../shared/anim';
import {Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Camera drift & push
  const camZoom = interpolate(frame, [0, 480, 707], [1.0, 1.02, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camY = interpolate(frame, [480, 707], [0, -40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Entry springs for 3 hero words (staggered)
  // 1. 食べない (from frame 10)
  const p1 = pop(frame, fps, 10, BOUNCY);
  // 2. 行かない (from frame 60)
  const p2 = pop(frame, fps, 60, BOUNCY);
  // 3. 飲まない (from frame 110)
  const p3 = pop(frame, fps, 110, BOUNCY);

  // Sequential suffix highlight glows (frames 180 - 280)
  const glow1 = interpolate(frame, [170, 200, 230], [0, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glow2 = interpolate(frame, [200, 230, 260], [0, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glow3 = interpolate(frame, [230, 260, 290], [0, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Convergence transition (frames 300 to 460): 3 cards merge into giant NAI
  const pConverge = prog(frame, 300, 70, EASE_IO);
  const cardsExitY = -pConverge * 80;
  const cardsOpacity = 1 - pConverge;

  // Giant NAI entrance
  const pGiantNai = pop(frame, fps, 340, SPRING);
  const giantNaiGlow = interpolate(frame, [350, 420, 520], [0.5, 1, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Question appearance: "Apa itu bentuk nai?" (frames 460+)
  const pQuestion = pop(frame, fps, 460, SPRING);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        transform: `scale(${camZoom}) translateY(${camY}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Radial Atmospheric Gold Glow */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 800,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,190,82,0.18) 0%, rgba(20,24,36,0) 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* --- PHASE 1 & 2: THE 3 HERO WORDS (Frames 0 - 360) --- */}
      {cardsOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            top: 420,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            transform: `translateY(${cardsExitY}px)`,
            opacity: cardsOpacity,
          }}
        >
          {/* Card 1: 食べない (Tabenai) */}
          {frame >= 10 && (
            <div
              style={{
                transform: `scale(${0.88 + 0.12 * p1}) translateY(${(1 - p1) * 60}px)`,
                opacity: p1,
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={glow1 > 0.6 ? C.gold : C.borderPrimary}
                style={{
                  width: 840,
                  padding: '30px 48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow:
                    glow1 > 0.6
                      ? `0 24px 60px rgba(0,0,0,0.7), 0 0 35px ${C.gold}55`
                      : '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: 4}}>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 90,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      食べ
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 90,
                        fontWeight: 900,
                        color: glow1 > 0.3 ? C.gold : C.text,
                        textShadow:
                          glow1 > 0.3
                            ? `0 0 ${glow1 * 40}px ${C.gold}, 0 0 10px ${C.goldSoft}`
                            : 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      ない
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 26,
                      color: C.textSecondary,
                      marginTop: 6,
                      letterSpacing: 1.5,
                    }}
                  >
                    tabenai · tidak makan
                  </div>
                </div>

                <div
                  style={{
                    padding: '8px 20px',
                    borderRadius: 999,
                    background: `${C.gold}18`,
                    border: `1.5px solid ${C.gold}55`,
                    color: C.gold,
                    fontFamily: FONT.mono,
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  ない形
                </div>
              </Surface>
            </div>
          )}

          {/* Card 2: 行かない (Ikanai) */}
          {frame >= 60 && (
            <div
              style={{
                transform: `scale(${0.88 + 0.12 * p2}) translateY(${(1 - p2) * 60}px)`,
                opacity: p2,
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={glow2 > 0.6 ? C.gold : C.borderPrimary}
                style={{
                  width: 840,
                  padding: '30px 48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow:
                    glow2 > 0.6
                      ? `0 24px 60px rgba(0,0,0,0.7), 0 0 35px ${C.gold}55`
                      : '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: 4}}>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 90,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      行か
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 90,
                        fontWeight: 900,
                        color: glow2 > 0.3 ? C.gold : C.text,
                        textShadow:
                          glow2 > 0.3
                            ? `0 0 ${glow2 * 40}px ${C.gold}, 0 0 10px ${C.goldSoft}`
                            : 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      ない
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 26,
                      color: C.textSecondary,
                      marginTop: 6,
                      letterSpacing: 1.5,
                    }}
                  >
                    ikanai · tidak pergi
                  </div>
                </div>

                <div
                  style={{
                    padding: '8px 20px',
                    borderRadius: 999,
                    background: `${C.gold}18`,
                    border: `1.5px solid ${C.gold}55`,
                    color: C.gold,
                    fontFamily: FONT.mono,
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  ない形
                </div>
              </Surface>
            </div>
          )}

          {/* Card 3: 飲まない (Nomanai) */}
          {frame >= 110 && (
            <div
              style={{
                transform: `scale(${0.88 + 0.12 * p3}) translateY(${(1 - p3) * 60}px)`,
                opacity: p3,
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={glow3 > 0.6 ? C.gold : C.borderPrimary}
                style={{
                  width: 840,
                  padding: '30px 48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow:
                    glow3 > 0.6
                      ? `0 24px 60px rgba(0,0,0,0.7), 0 0 35px ${C.gold}55`
                      : '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: 4}}>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 90,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      飲ま
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 90,
                        fontWeight: 900,
                        color: glow3 > 0.3 ? C.gold : C.text,
                        textShadow:
                          glow3 > 0.3
                            ? `0 0 ${glow3 * 40}px ${C.gold}, 0 0 10px ${C.goldSoft}`
                            : 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      ない
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 26,
                      color: C.textSecondary,
                      marginTop: 6,
                      letterSpacing: 1.5,
                    }}
                  >
                    nomanai · tidak minum
                  </div>
                </div>

                <div
                  style={{
                    padding: '8px 20px',
                    borderRadius: 999,
                    background: `${C.gold}18`,
                    border: `1.5px solid ${C.gold}55`,
                    color: C.gold,
                    fontFamily: FONT.mono,
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  ない形
                </div>
              </Surface>
            </div>
          )}
        </div>
      )}

      {/* --- PHASE 3: CONVERGENCE TO GIANT NAI & QUESTION (Frames 320 - 707) --- */}
      {frame >= 320 && (
        <div
          style={{
            position: 'absolute',
            top: 480,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${0.9 + 0.1 * pGiantNai})`,
            opacity: pGiantNai,
          }}
        >
          {/* Giant Glowing NAI Character */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 210,
                fontWeight: 900,
                color: C.gold,
                lineHeight: 1.05,
                textShadow: `0 0 ${giantNaiGlow * 60}px rgba(240,190,82,0.8), 0 0 ${giantNaiGlow * 120}px rgba(240,190,82,0.4), 0 10px 40px rgba(0,0,0,0.9)`,
              }}
            >
              ない
            </span>

            <div
              style={{
                marginTop: 12,
                fontFamily: FONT.mono,
                fontSize: 32,
                fontWeight: 800,
                color: C.goldSoft,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}
            >
              POLA AKHIRAN YANG SAMA
            </div>
          </div>

          {/* Kinetic Question (Frame 460+) */}
          {frame >= 460 && (
            <div
              style={{
                marginTop: 64,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transform: `scale(${0.92 + 0.08 * pQuestion}) translateY(${(1 - pQuestion) * 30}px)`,
                opacity: pQuestion,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 68,
                  fontWeight: 900,
                  color: C.text,
                  letterSpacing: -1,
                  lineHeight: 1.15,
                  textShadow: '0 8px 30px rgba(0,0,0,0.9)',
                }}
              >
                APA ITU <span style={{color: C.gold}}>BENTUK NAI?</span>
              </div>

              <div
                style={{
                  marginTop: 18,
                  fontFamily: FONT.mono,
                  fontSize: 26,
                  color: C.indigoSoft,
                  letterSpacing: 3,
                  fontWeight: 700,
                }}
              >
                tabenai · ikanai · nomanai
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
