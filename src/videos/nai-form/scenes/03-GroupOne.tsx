import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, pop, prog, SPRING} from '../../../shared/anim';
import {Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const GroupOneScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Sub-stages:
  // 1. Kaku (0 - 450)
  // 2. Nomu (450 - 570)
  // 3. Hanasu (570 - 690)
  // 4. Kau exception (690 - 1068)
  const isKaku = frame < 450;
  const isNomu = frame >= 450 && frame < 570;
  const isHanasu = frame >= 570 && frame < 690;
  const isKau = frame >= 690;

  // Header entrance
  const pHeader = pop(frame, fps, 10, SPRING);

  // Kaku mechanical shifts
  const pKakuEnter = pop(frame, fps, 20, SPRING);
  const pKakuShift = prog(frame, 60, 24, EASE);
  const pKakuNai = pop(frame, fps, 85, BOUNCY);

  // Nomu mechanical shifts
  const pNomuEnter = pop(frame, fps, 450, SPRING);
  const pNomuShift = prog(frame, 480, 20, EASE);
  const pNomuNai = pop(frame, fps, 500, BOUNCY);

  // Hanasu mechanical shifts
  const pHanasuEnter = pop(frame, fps, 570, SPRING);
  const pHanasuShift = prog(frame, 600, 20, EASE);
  const pHanasuNai = pop(frame, fps, 620, BOUNCY);

  // Kau exception mechanical shifts
  const pKauEnter = pop(frame, fps, 690, SPRING);
  const pKauShift = prog(frame, 730, 24, EASE);
  const pKauNai = pop(frame, fps, 760, BOUNCY);
  const pWrongStamp = pop(frame, fps, 740, BOUNCY);
  const pCorrectStamp = pop(frame, fps, 780, BOUNCY);

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
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 850,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: isKau
            ? 'radial-gradient(circle, rgba(226,85,91,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(240,190,82,0.18) 0%, transparent 70%)',
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
            background: isKau ? `${C.hanko}22` : `${C.gold}22`,
            border: `2px solid ${isKau ? C.hanko : C.gold}`,
            color: isKau ? C.hanko : C.gold,
            fontFamily: FONT.mono,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 2,
            boxShadow: `0 8px 30px rgba(0,0,0,0.6)`,
          }}
        >
          {isKau ? '⚠️ PENGECUALIAN: う ➔ わ + ない' : 'RUMUS UTAMA: U ➔ A + ない'}
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
          KELOMPOK 1 · 五段動詞 (GODAN)
        </div>
      </div>

      {/* ============================================================ */}
      {/* HERO CONJUGATION SURFACE */}
      {/* ============================================================ */}
      <div style={{position: 'absolute', top: 560}}>
        {/* --- 1. 書く (Kaku) -> 書かない --- */}
        {isKaku && (
          <div
            style={{
              transform: `scale(${0.9 + 0.1 * pKakuEnter})`,
              opacity: pKakuEnter,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={pKakuShift > 0.5 ? C.gold : C.borderPrimary}
              style={{
                width: 880,
                padding: '60px 48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 45px rgba(240,190,82,0.3)',
              }}
            >
              {/* Main Animated Japanese Verb */}
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
                  書
                </span>

                {/* Kana change: く (ku) -> か (ka) */}
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 140,
                    fontWeight: 900,
                    color: pKakuShift > 0.5 ? C.gold : C.textMuted,
                    textShadow: pKakuShift > 0.5 ? `0 0 35px ${C.gold}` : 'none',
                    display: 'inline-block',
                    transform: `scale(${pKakuShift > 0.5 ? 1.05 : 1})`,
                    transition: 'color 0.2s',
                  }}
                >
                  {pKakuShift > 0.5 ? 'か' : 'く'}
                </span>

                {/* + ない */}
                {pKakuNai > 0.01 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pKakuNai})`,
                      opacity: pKakuNai,
                      textShadow: `0 0 35px ${C.gold}`,
                    }}
                  >
                    ない
                  </span>
                )}
              </div>

              {/* Sub-label explaining sound shift */}
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
                <span>kaku (menulis)</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.textMuted}}>ku</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.gold, fontWeight: 900}}>ka + nai</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: pKakuNai > 0.5 ? C.gold : C.text, fontWeight: 900}}>
                  kakanai
                </span>
              </div>
            </Surface>
          </div>
        )}

        {/* --- 2. 飲む (Nomu) -> 飲まない --- */}
        {isNomu && (
          <div
            style={{
              transform: `scale(${0.9 + 0.1 * pNomuEnter})`,
              opacity: pNomuEnter,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={pNomuShift > 0.5 ? C.gold : C.borderPrimary}
              style={{
                width: 880,
                padding: '60px 48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 45px rgba(240,190,82,0.3)',
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
                  飲
                </span>

                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 140,
                    fontWeight: 900,
                    color: pNomuShift > 0.5 ? C.gold : C.textMuted,
                    textShadow: pNomuShift > 0.5 ? `0 0 35px ${C.gold}` : 'none',
                  }}
                >
                  {pNomuShift > 0.5 ? 'ま' : 'む'}
                </span>

                {pNomuNai > 0.01 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pNomuNai})`,
                      opacity: pNomuNai,
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
                <span>nomu (minum)</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.textMuted}}>mu</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.gold, fontWeight: 900}}>ma + nai</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: pNomuNai > 0.5 ? C.gold : C.text, fontWeight: 900}}>
                  nomanai
                </span>
              </div>
            </Surface>
          </div>
        )}

        {/* --- 3. 話す (Hanasu) -> 話さない --- */}
        {isHanasu && (
          <div
            style={{
              transform: `scale(${0.9 + 0.1 * pHanasuEnter})`,
              opacity: pHanasuEnter,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={pHanasuShift > 0.5 ? C.gold : C.borderPrimary}
              style={{
                width: 880,
                padding: '60px 48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 45px rgba(240,190,82,0.3)',
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
                  話
                </span>

                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 140,
                    fontWeight: 900,
                    color: pHanasuShift > 0.5 ? C.gold : C.textMuted,
                    textShadow: pHanasuShift > 0.5 ? `0 0 35px ${C.gold}` : 'none',
                  }}
                >
                  {pHanasuShift > 0.5 ? 'さ' : 'す'}
                </span>

                {pHanasuNai > 0.01 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pHanasuNai})`,
                      opacity: pHanasuNai,
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
                <span>hanasu (bicara)</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.textMuted}}>su</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.gold, fontWeight: 900}}>sa + nai</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: pHanasuNai > 0.5 ? C.gold : C.text, fontWeight: 900}}>
                  hanasanai
                </span>
              </div>
            </Surface>
          </div>
        )}

        {/* --- 4. 買う (Kau) -> 買わない (PENGECUALIAN) --- */}
        {isKau && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 28,
              transform: `scale(${0.9 + 0.1 * pKauEnter})`,
              opacity: pKauEnter,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={C.hanko}
              style={{
                width: 880,
                padding: '60px 48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(226,85,91,0.35)',
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
                  買
                </span>

                {/* う -> わ (Special Golden Glow) */}
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 140,
                    fontWeight: 900,
                    color: pKauShift > 0.5 ? C.gold : C.textMuted,
                    textShadow: pKauShift > 0.5 ? `0 0 45px ${C.gold}` : 'none',
                    transform: `scale(${pKauShift > 0.5 ? 1.1 : 1})`,
                  }}
                >
                  {pKauShift > 0.5 ? 'わ' : 'う'}
                </span>

                {pKauNai > 0.01 && (
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 140,
                      fontWeight: 900,
                      color: C.gold,
                      transform: `scale(${pKauNai})`,
                      opacity: pKauNai,
                      textShadow: `0 0 35px ${C.gold}`,
                    }}
                  >
                    ない
                  </span>
                )}
              </div>

              {/* Sub-label */}
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
                <span>kau (beli)</span>
                <span style={{color: C.hanko}}>➔</span>
                <span style={{color: C.textMuted}}>u</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.gold, fontWeight: 900}}>wa + nai</span>
                <span style={{color: C.gold}}>➔</span>
                <span style={{color: C.gold, fontWeight: 900}}>kawanai</span>
              </div>
            </Surface>

            {/* Stamps: BUKAN KAANAI vs BENAR: KAWANAI */}
            <div
              style={{
                display: 'flex',
                gap: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {pWrongStamp > 0.01 && (
                <div
                  style={{
                    padding: '12px 28px',
                    borderRadius: 20,
                    background: 'rgba(226, 85, 91, 0.25)',
                    border: `2px solid ${C.hanko}`,
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 26,
                    color: C.hanko,
                    letterSpacing: 1,
                    transform: `scale(${pWrongStamp}) rotate(-4deg)`,
                    opacity: pWrongStamp,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
                  }}
                >
                  ❌ BUKAN KAANAI!
                </div>
              )}

              {pCorrectStamp > 0.01 && (
                <div
                  style={{
                    padding: '12px 28px',
                    borderRadius: 20,
                    background: 'rgba(240, 190, 82, 0.25)',
                    border: `2px solid ${C.gold}`,
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 26,
                    color: C.gold,
                    letterSpacing: 1,
                    transform: `scale(${pCorrectStamp}) rotate(4deg)`,
                    opacity: pCorrectStamp,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
                  }}
                >
                  ⭕ BENAR: KAWANAI (う ➔ わ)
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
