import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, prog, SPRING} from '../../../shared/anim';
import {Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const MeaningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Part 1: "ない = BENTUK NEGATIF" (Frames 0 - 580)
  const pNegatifIn = pop(frame, fps, 15, BOUNCY);
  const pNegatifOut = prog(frame, 560, 40, EASE_IO);

  // Part 2: First Transformation "食べる -> 食べない" (Frames 580 - 920)
  const pTransIn = pop(frame, fps, 580, SPRING);
  const pTransOut = prog(frame, 900, 40, EASE_IO);

  // Transformation mechanic inside Card:
  // る detaches around frame 700, ない snaps in at frame 730
  const pDetach = prog(frame, 700, 24, EASE);
  const pSnapNai = pop(frame, fps, 730, BOUNCY);

  // Part 3: "BAGAIMANA CARA MENGUBAHNYA?" + 3 Branches (Frames 920 - 1278)
  const pQuestionIn = pop(frame, fps, 920, SPRING);
  const pBranch1 = pop(frame, fps, 980, SPRING);
  const pBranch2 = pop(frame, fps, 1040, SPRING);
  const pBranch3 = pop(frame, fps, 1100, SPRING);

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
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 850,
          width: 860,
          height: 860,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111,147,207,0.18) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ============================================================ */}
      {/* PART 1: ない = BENTUK NEGATIF (Frames 0 - 580) */}
      {/* ============================================================ */}
      {frame < 600 && (
        <div
          style={{
            position: 'absolute',
            top: 480,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 36,
            transform: `scale(${0.9 + 0.1 * pNegatifIn}) translateY(${pNegatifOut * -60}px)`,
            opacity: pNegatifIn * (1 - pNegatifOut),
          }}
        >
          <Surface
            tone="elevated"
            radius={44}
            border={C.gold}
            style={{
              width: 880,
              padding: '54px 44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(240,190,82,0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 160,
                  fontWeight: 900,
                  color: C.gold,
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 40px rgba(240,190,82,0.7)',
                  lineHeight: 1.1,
                }}
              >
                ない
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontFamily: FONT.display,
                  fontWeight: 900,
                  fontSize: 52,
                  color: C.text,
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{color: C.gold}}>=</span>
                <span>BENTUK NEGATIF</span>
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                padding: '12px 36px',
                borderRadius: 999,
                background: 'rgba(240,190,82,0.15)',
                border: `2px solid ${C.gold}66`,
                color: C.goldSoft,
                fontFamily: FONT.mono,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              BERKAITAN DENGAN MAKNA “TIDAK”
            </div>
          </Surface>
        </div>
      )}

      {/* ============================================================ */}
      {/* PART 2: TRANSFORMASI PERTAMA: 食べる -> 食べない (Frames 580 - 920) */}
      {/* ============================================================ */}
      {frame >= 560 && frame < 940 && (
        <div
          style={{
            position: 'absolute',
            top: 480,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${0.9 + 0.1 * pTransIn}) translateY(${pTransOut * -60}px)`,
            opacity: pTransIn * (1 - pTransOut),
          }}
        >
          <Surface
            tone="card"
            radius={44}
            border={pDetach > 0.5 ? C.gold : C.borderPrimary}
            style={{
              width: 880,
              padding: '60px 48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow:
                pDetach > 0.5
                  ? `0 30px 80px rgba(0,0,0,0.8), 0 0 45px ${C.gold}44`
                  : '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >
            {/* The Mechanical Morph */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                minHeight: 180,
              }}
            >
              {/* Stem: 食べ */}
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 140,
                  fontWeight: 900,
                  color: C.text,
                }}
              >
                食べ
              </span>

              {/* Suffix: る moves up and fades out */}
              {pDetach < 0.95 && (
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 140,
                    fontWeight: 900,
                    color: C.textMuted,
                    display: 'inline-block',
                    transform: `translateY(${-pDetach * 60}px)`,
                    opacity: 1 - pDetach,
                  }}
                >
                  る
                </span>
              )}

              {/* Suffix: ない snaps in with gold glow */}
              {frame >= 710 && (
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 140,
                    fontWeight: 900,
                    color: C.gold,
                    display: 'inline-block',
                    transform: `scale(${pSnapNai})`,
                    opacity: pSnapNai,
                    textShadow: '0 0 40px rgba(240,190,82,0.8)',
                  }}
                >
                  ない
                </span>
              )}
            </div>

            {/* Translation: makan -> tidak makan */}
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                fontFamily: FONT.mono,
                fontSize: 32,
                fontWeight: 700,
                color: C.textSecondary,
              }}
            >
              <span>taberu (makan)</span>
              <span style={{color: C.gold, fontSize: 36}}>➔</span>
              <span
                style={{
                  color: frame >= 730 ? C.gold : C.textSecondary,
                  fontWeight: frame >= 730 ? 900 : 700,
                }}
              >
                tabenai (tidak makan)
              </span>
            </div>
          </Surface>
        </div>
      )}

      {/* ============================================================ */}
      {/* PART 3: BAGAIMANA CARA MENGUBAHNYA? + 3 CABANG (Frames 920+) */}
      {/* ============================================================ */}
      {frame >= 900 && (
        <div
          style={{
            position: 'absolute',
            top: 400,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {/* Question Title */}
          <div
            style={{
              textAlign: 'center',
              transform: `scale(${0.92 + 0.08 * pQuestionIn}) translateY(${(1 - pQuestionIn) * 20}px)`,
              opacity: pQuestionIn,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 56,
                fontWeight: 900,
                color: C.gold,
                letterSpacing: -0.5,
              }}
            >
              BAGAIMANA CARA MENGUBAHNYA?
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: FONT.mono,
                fontSize: 24,
                color: C.textSecondary,
                letterSpacing: 2,
              }}
            >
              3 KELOMPOK KATA KERJA JEPANG
            </div>
          </div>

          {/* Branch 1: Kelompok 1 — 五段動詞 */}
          {frame >= 960 && (
            <div
              style={{
                transform: `scale(${0.92 + 0.08 * pBranch1}) translateY(${(1 - pBranch1) * 30}px)`,
                opacity: pBranch1,
              }}
            >
              <Surface
                tone="elevated"
                radius={28}
                border={C.gold}
                style={{
                  width: 860,
                  padding: '24px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(240,190,82,0.25)',
                }}
              >
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 8,
                        background: C.gold,
                        color: '#101420',
                        fontSize: 18,
                        fontWeight: 900,
                        fontFamily: FONT.mono,
                      }}
                    >
                      01
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 32,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      KELOMPOK 1 · 五段動詞
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 20,
                      color: C.textSecondary,
                      marginTop: 6,
                    }}
                  >
                    Bunyi akhir U ➔ A + ない
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 32,
                    fontWeight: 900,
                    color: C.gold,
                  }}
                >
                  書く ➔ 書かない
                </div>
              </Surface>
            </div>
          )}

          {/* Branch 2: Kelompok 2 — 一段動詞 */}
          {frame >= 1020 && (
            <div
              style={{
                transform: `scale(${0.92 + 0.08 * pBranch2}) translateY(${(1 - pBranch2) * 30}px)`,
                opacity: pBranch2,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                border={`${C.matcha}88`}
                style={{
                  width: 860,
                  padding: '24px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 8,
                        background: C.matcha,
                        color: '#101420',
                        fontSize: 18,
                        fontWeight: 900,
                        fontFamily: FONT.mono,
                      }}
                    >
                      02
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 32,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      KELOMPOK 2 · 一段動詞
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 20,
                      color: C.textSecondary,
                      marginTop: 6,
                    }}
                  >
                    Hilangkan る ➔ Tambah ない
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 32,
                    fontWeight: 900,
                    color: C.matcha,
                  }}
                >
                  食べる ➔ 食べない
                </div>
              </Surface>
            </div>
          )}

          {/* Branch 3: Kelompok 3 — 不規則動詞 */}
          {frame >= 1080 && (
            <div
              style={{
                transform: `scale(${0.92 + 0.08 * pBranch3}) translateY(${(1 - pBranch3) * 30}px)`,
                opacity: pBranch3,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                border={`${C.fuji}88`}
                style={{
                  width: 860,
                  padding: '24px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 8,
                        background: C.fuji,
                        color: '#101420',
                        fontSize: 18,
                        fontWeight: 900,
                        fontFamily: FONT.mono,
                      }}
                    >
                      03
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 32,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      KELOMPOK 3 · 不規則動詞
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 20,
                      color: C.textSecondary,
                      marginTop: 6,
                    }}
                  >
                    Tidak Beraturan: する & 来る
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 32,
                    fontWeight: 900,
                    color: C.fuji,
                  }}
                >
                  する ➔ しない
                </div>
              </Surface>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
