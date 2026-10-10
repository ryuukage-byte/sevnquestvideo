import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, pop, prog, SPRING} from '../../../shared/anim';
import {Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const GroupTwoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Verb sub-stages:
  // 1. Taberu (0 - 420)
  // 2. Miru (420 - 580)
  // 3. Okiru (580 - 763)
  const isTaberu = frame < 420;
  const isMiru = frame >= 420 && frame < 580;
  const isOkiru = frame >= 580;

  // Header entrance
  const pHeader = pop(frame, fps, 10, SPRING);

  // Taberu mechanics:
  const pTaberuEnter = pop(frame, fps, 20, SPRING);
  const pTaberuDetach = prog(frame, 240, 20, EASE);
  const pTaberuNai = pop(frame, fps, 260, BOUNCY);

  // Miru mechanics:
  const pMiruEnter = pop(frame, fps, 420, SPRING);
  const pMiruDetach = prog(frame, 460, 20, EASE);
  const pMiruNai = pop(frame, fps, 480, BOUNCY);

  // Okiru mechanics:
  const pOkiruEnter = pop(frame, fps, 580, SPRING);
  const pOkiruDetach = prog(frame, 620, 20, EASE);
  const pOkiruNai = pop(frame, fps, 640, BOUNCY);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Radial Green Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 850,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,174,134,0.18) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ============================================================ */}
      {/* FORMULA BANNER AT TOP */}
      {/* ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${0.9 + 0.1 * pHeader})`,
          opacity: pHeader,
        }}
      >
        <div
          style={{
            padding: '10px 28px',
            borderRadius: 999,
            background: `${C.matcha}22`,
            border: `2px solid ${C.matcha}`,
            color: C.matcha,
            fontFamily: FONT.mono,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 2,
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          }}
        >
          RUMUS LEBIH SEDERHANA: る ➔ ない
        </div>

        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 40,
            fontWeight: 900,
            color: C.text,
            letterSpacing: -0.5,
          }}
        >
          KELOMPOK 2 · 一段動詞 (ICHIDAN)
        </div>
      </div>

      {/* ============================================================ */}
      {/* HERO UNIFIED CONJUGATION SURFACE */}
      {/* ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 560,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        <Surface
          tone="elevated"
          radius={44}
          border={C.matcha}
          style={{
            width: 880,
            padding: '60px 48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 45px rgba(79,174,134,0.3)',
          }}
        >
          {/* 1. 食べる -> 食べない */}
          {isTaberu && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${0.9 + 0.1 * pTaberuEnter})`,
                opacity: pTaberuEnter,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  minHeight: 180,
                  gap: 8,
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 140, fontWeight: 900, color: C.text}}>
                  食べ
                </span>

                {pTaberuDetach < 0.95 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.textMuted,
                      display: 'inline-block',
                      transform: `translateY(${-pTaberuDetach * 60}px)`,
                      opacity: 1 - pTaberuDetach,
                    }}
                  >
                    る
                  </span>
                )}

                {pTaberuNai > 0.01 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pTaberuNai})`,
                      opacity: pTaberuNai,
                      textShadow: `0 0 35px ${C.gold}`,
                    }}
                  >
                    ない
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontFamily: FONT.mono,
                  fontSize: 28,
                  fontWeight: 800,
                  color: C.textSecondary,
                }}
              >
                <span>taberu (makan)</span>
                <span style={{color: C.matcha}}>➔</span>
                <span style={{color: pTaberuNai > 0.5 ? C.gold : C.text, fontWeight: 900}}>
                  tabenai (tidak makan)
                </span>
              </div>
            </div>
          )}

          {/* 2. 見る -> 見ない */}
          {isMiru && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${0.9 + 0.1 * pMiruEnter})`,
                opacity: pMiruEnter,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  minHeight: 180,
                  gap: 8,
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 140, fontWeight: 900, color: C.text}}>
                  見
                </span>

                {pMiruDetach < 0.95 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.textMuted,
                      display: 'inline-block',
                      transform: `translateY(${-pMiruDetach * 60}px)`,
                      opacity: 1 - pMiruDetach,
                    }}
                  >
                    る
                  </span>
                )}

                {pMiruNai > 0.01 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pMiruNai})`,
                      opacity: pMiruNai,
                      textShadow: `0 0 35px ${C.gold}`,
                    }}
                  >
                    ない
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontFamily: FONT.mono,
                  fontSize: 28,
                  fontWeight: 800,
                  color: C.textSecondary,
                }}
              >
                <span>miru (melihat)</span>
                <span style={{color: C.matcha}}>➔</span>
                <span style={{color: pMiruNai > 0.5 ? C.gold : C.text, fontWeight: 900}}>
                  minai (tidak melihat)
                </span>
              </div>
            </div>
          )}

          {/* 3. 起きる -> 起きない */}
          {isOkiru && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${0.9 + 0.1 * pOkiruEnter})`,
                opacity: pOkiruEnter,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  minHeight: 180,
                  gap: 8,
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 140, fontWeight: 900, color: C.text}}>
                  起き
                </span>

                {pOkiruDetach < 0.95 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.textMuted,
                      display: 'inline-block',
                      transform: `translateY(${-pOkiruDetach * 60}px)`,
                      opacity: 1 - pOkiruDetach,
                    }}
                  >
                    る
                  </span>
                )}

                {pOkiruNai > 0.01 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pOkiruNai})`,
                      opacity: pOkiruNai,
                      textShadow: `0 0 35px ${C.gold}`,
                    }}
                  >
                    ない
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontFamily: FONT.mono,
                  fontSize: 28,
                  fontWeight: 800,
                  color: C.textSecondary,
                }}
              >
                <span>okiru (bangun)</span>
                <span style={{color: C.matcha}}>➔</span>
                <span style={{color: pOkiruNai > 0.5 ? C.gold : C.text, fontWeight: 900}}>
                  okinai (tidak bangun)
                </span>
              </div>
            </div>
          )}
        </Surface>

        {/* Mastered Verbs Shelf at Bottom */}
        <div
          style={{
            display: 'flex',
            gap: 14,
            width: 880,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '16px 12px',
              borderRadius: 20,
              background: C.card,
              border: `1.5px solid ${frame >= 260 ? C.matcha : C.borderSubtle}`,
              textAlign: 'center',
              opacity: frame >= 260 ? 1 : 0.4,
              boxShadow: frame >= 260 ? `0 8px 24px rgba(0,0,0,0.5)` : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 24, fontWeight: 900, color: C.text}}>
              食べる ➔ 食べない
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: '16px 12px',
              borderRadius: 20,
              background: C.card,
              border: `1.5px solid ${frame >= 480 ? C.matcha : C.borderSubtle}`,
              textAlign: 'center',
              opacity: frame >= 480 ? 1 : 0.4,
              boxShadow: frame >= 480 ? `0 8px 24px rgba(0,0,0,0.5)` : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 24, fontWeight: 900, color: C.text}}>
              見る ➔ 見ない
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: '16px 12px',
              borderRadius: 20,
              background: C.card,
              border: `1.5px solid ${frame >= 640 ? C.matcha : C.borderSubtle}`,
              textAlign: 'center',
              opacity: frame >= 640 ? 1 : 0.4,
              boxShadow: frame >= 640 ? `0 8px 24px rgba(0,0,0,0.5)` : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 24, fontWeight: 900, color: C.text}}>
              起きる ➔ 起きない
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
