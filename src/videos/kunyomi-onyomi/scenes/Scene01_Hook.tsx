import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene01_Hook: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:00.20: Top Header pill enters
  const pHeader = pop(frame, fps, sec(0.2), SPRING);

  // 00:00.80: Card 1 (Kanji + Hiragana = Kunyomi) enters
  const pCard1 = pop(frame, fps, sec(0.8), BOUNCY);

  // 00:03.30: Card 2 (Kanji + Kanji = Onyomi) enters
  const pCard2 = pop(frame, fps, sec(3.3), BOUNCY);

  // 00:05.20: Big questioning glow & pulse
  const pQuestion = pop(frame, fps, sec(5.0), SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(0.8)} volume={0.65} />
          <Sfx name="whoosh" at={sec(3.2)} volume={0.4} />
          <Sfx name="pop" at={sec(3.4)} volume={0.65} />
          <Sfx name="chime" at={sec(5.0)} volume={0.5} />
        </>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
        }}
      >
        {/* Top Header Pill */}
        <div
          style={{
            position: 'absolute',
            top: 240,
            opacity: pHeader,
            transform: `scale(${pHeader}) translateY(${(1 - pHeader) * 20}px)`,
          }}
        >
          <Pill color={C.gold} size={28} filled>
            🤔 RUMOR POPULER BAHASA JEPANG
          </Pill>
        </div>

        {/* Main Title / Question */}
        <div
          style={{
            position: 'absolute',
            top: 340,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 68,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: -0.5,
              textShadow: '0 8px 30px rgba(0,0,0,0.6)',
            }}
          >
            BENER GAK SIH?
          </span>
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 28,
              fontWeight: 600,
              color: C.indigoSoft,
              letterSpacing: 1,
            }}
          >
            Pola Rumus Cara Baca Kanji
          </span>
        </div>

        {/* Comparison Formulas Stack */}
        <div
          style={{
            position: 'absolute',
            top: 540,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            width: '100%',
            maxWidth: 960,
          }}
        >
          {/* FORMULA 1: KANJI + HIRAGANA = KUNYOMI */}
          {frame >= sec(0.6) && (
            <div
              style={{
                opacity: pCard1,
                transform: `scale(${pCard1}) translateY(${(1 - pCard1) * 30}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={frame >= sec(2.0) ? C.matcha : C.borderSubtle}
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow:
                    frame >= sec(2.0)
                      ? '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(79,174,134,0.3)'
                      : '0 20px 50px rgba(0,0,0,0.6)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <div
                    style={{
                      background: 'rgba(226, 85, 91, 0.18)',
                      border: `2px solid ${C.hanko}`,
                      borderRadius: 20,
                      padding: '10px 22px',
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 32,
                      color: C.hanko,
                    }}
                  >
                    KANJI
                  </div>
                  <span style={{fontSize: 36, fontWeight: 900, color: C.textSecondary}}>+</span>
                  <div
                    style={{
                      background: 'rgba(151, 181, 224, 0.18)',
                      border: `2px solid ${C.indigoSoft}`,
                      borderRadius: 20,
                      padding: '10px 22px',
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 32,
                      color: C.indigoSoft,
                    }}
                  >
                    HIRAGANA
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <span style={{fontSize: 40, fontWeight: 900, color: C.gold}}>＝</span>
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${C.matchaDeep}, ${C.matcha})`,
                      borderRadius: 24,
                      padding: '12px 28px',
                      boxShadow: '0 8px 24px rgba(79,174,134,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#d4f5e7',
                        lineHeight: 1,
                      }}
                    >
                      訓読み
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 34,
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: 2,
                      }}
                    >
                      KUNYOMI
                    </span>
                  </div>
                </div>
              </Surface>
            </div>
          )}

          {/* FORMULA 2: KANJI + KANJI = ONYOMI */}
          {frame >= sec(3.1) && (
            <div
              style={{
                opacity: pCard2,
                transform: `scale(${pCard2}) translateY(${(1 - pCard2) * 30}px)`,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={frame >= sec(4.5) ? C.fuji : C.borderSubtle}
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow:
                    frame >= sec(4.5)
                      ? '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(155,101,201,0.3)'
                      : '0 20px 50px rgba(0,0,0,0.6)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <div
                    style={{
                      background: 'rgba(226, 85, 91, 0.18)',
                      border: `2px solid ${C.hanko}`,
                      borderRadius: 20,
                      padding: '10px 22px',
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 32,
                      color: C.hanko,
                    }}
                  >
                    KANJI
                  </div>
                  <span style={{fontSize: 36, fontWeight: 900, color: C.textSecondary}}>+</span>
                  <div
                    style={{
                      background: 'rgba(226, 85, 91, 0.18)',
                      border: `2px solid ${C.hanko}`,
                      borderRadius: 20,
                      padding: '10px 22px',
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 32,
                      color: C.hanko,
                    }}
                  >
                    KANJI
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <span style={{fontSize: 40, fontWeight: 900, color: C.gold}}>＝</span>
                  <div
                    style={{
                      background: `linear-gradient(135deg, #6c3f96, ${C.fuji})`,
                      borderRadius: 24,
                      padding: '12px 28px',
                      boxShadow: '0 8px 24px rgba(155,101,201,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#eedeff',
                        lineHeight: 1,
                      }}
                    >
                      音読み
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 34,
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: 2,
                      }}
                    >
                      ONYOMI
                    </span>
                  </div>
                </div>
              </Surface>
            </div>
          )}
        </div>

        {/* Bottom Curiosity Tag */}
        {frame >= sec(5.0) && (
          <div
            style={{
              position: 'absolute',
              top: 1040,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: pQuestion,
              transform: `scale(${pQuestion})`,
            }}
          >
            <Pill color={C.goldSoft} size={26}>
              APAKAH BENAR SELALU BEGITU?
            </Pill>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
