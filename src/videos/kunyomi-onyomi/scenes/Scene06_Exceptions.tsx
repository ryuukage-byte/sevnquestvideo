import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, NotEqual, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene06_Exceptions: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:26.50: Header
  const pHeader = pop(frame, fps, sec(26.5), SPRING);

  // 00:27.00: Exception 1 (手紙 -> てがみ)
  const pEx1 = pop(frame, fps, sec(27.0), BOUNCY);

  // 00:28.80: Exception 2 (大人 -> おとな)
  const pEx2 = pop(frame, fps, sec(28.8), BOUNCY);

  // 00:31.50: Phase 2 Core Insight: KANJI + KANJI ≠ OTOMATIS ONYOMI
  const pNotEqualCard = pop(frame, fps, sec(31.5), BOUNCY);
  const pSlash = progBetweenSec(frame, 32.0, 32.8);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(27.1)} volume={0.65} />
          <Sfx name="pop" at={sec(28.9)} volume={0.65} />
          <Sfx name="impact" at={sec(31.6)} volume={0.6} />
          <Sfx name="stroke" at={sec(32.2)} volume={0.5} />
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
        <div style={{position: 'absolute', top: 230, opacity: pHeader}}>
          <Pill color={C.gold} size={28} filled>
            ⚠️ HATI-HATI · PENGECUALIAN NYATA
          </Pill>
        </div>

        {/* Section Headline */}
        <div
          style={{
            position: 'absolute',
            top: 320,
            textAlign: 'center',
            opacity: pHeader,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 54,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            TIDAK SELALU ONYOMI!
          </span>
        </div>

        {/* Phase 1: Two Exception Cards (26.5s to 31.5s) */}
        {frame < sec(31.5) ? (
          <div
            style={{
              position: 'absolute',
              top: 480,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
              width: '100%',
              maxWidth: 960,
            }}
          >
            {/* EXCEPTION 1: 手紙 → てがみ */}
            <div
              style={{
                opacity: pEx1,
                transform: `scale(${pEx1}) translateY(${(1 - pEx1) * 20}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={C.gold}
                style={{
                  padding: '36px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                  <div
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 84,
                      fontWeight: 900,
                      color: C.text,
                    }}
                  >
                    手<span style={{color: C.gold}}>紙</span>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                    <span
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 20,
                        color: C.goldSoft,
                        fontWeight: 700,
                      }}
                    >
                      Kanji + Kanji
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 22,
                        color: C.textSecondary,
                        fontWeight: 600,
                      }}
                    >
                      surat
                    </span>
                  </div>
                </div>

                <ArrowRight size={40} color={C.gold} />

                {/* Reading: てがみ (Kunyomi combination!) */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6}}>
                  <div
                    style={{
                      background: 'rgba(240, 190, 82, 0.2)',
                      border: `2px solid ${C.gold}`,
                      borderRadius: 22,
                      padding: '12px 28px',
                      fontFamily: FONT.jp,
                      fontSize: 50,
                      fontWeight: 900,
                      color: C.gold,
                    }}
                  >
                    てがみ
                  </div>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 16,
                      color: C.matcha,
                      fontWeight: 800,
                    }}
                  >
                    KUNYOMI + KUNYOMI
                  </span>
                </div>
              </Surface>
            </div>

            {/* EXCEPTION 2: 大人 → おとな */}
            {frame >= sec(28.5) && (
              <div
                style={{
                  opacity: pEx2,
                  transform: `scale(${pEx2}) translateY(${(1 - pEx2) * 20}px)`,
                }}
              >
                <Surface
                  tone="elevated"
                  radius={36}
                  border={C.gold}
                  style={{
                    padding: '36px 36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                    <div
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 84,
                        fontWeight: 900,
                        color: C.text,
                      }}
                    >
                      大<span style={{color: C.gold}}>人</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                      <span
                        style={{
                          fontFamily: FONT.mono,
                          fontSize: 20,
                          color: C.goldSoft,
                          fontWeight: 700,
                        }}
                      >
                        Kanji + Kanji
                      </span>
                      <span
                        style={{
                          fontFamily: FONT.body,
                          fontSize: 22,
                          color: C.textSecondary,
                          fontWeight: 600,
                        }}
                      >
                        orang dewasa
                      </span>
                    </div>
                  </div>

                  <ArrowRight size={40} color={C.gold} />

                  {/* Reading: おとな */}
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6}}>
                    <div
                      style={{
                        background: 'rgba(240, 190, 82, 0.2)',
                        border: `2px solid ${C.gold}`,
                        borderRadius: 22,
                        padding: '12px 28px',
                        fontFamily: FONT.jp,
                        fontSize: 50,
                        fontWeight: 900,
                        color: C.gold,
                      }}
                    >
                      おとな
                    </div>
                    <span
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 16,
                        color: C.indigoSoft,
                        fontWeight: 800,
                      }}
                    >
                      JUKUJIKUN (BACAAN KHUSUS)
                    </span>
                  </div>
                </Surface>
              </div>
            )}
          </div>
        ) : (
          /* ================= PHASE 2: KANJI + KANJI ≠ OTOMATIS ONYOMI ================= */
          <div
            style={{
              position: 'absolute',
              top: 450,
              width: '100%',
              maxWidth: 960,
              opacity: pNotEqualCard,
              transform: `scale(${pNotEqualCard})`,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={C.gold}
              style={{
                padding: '60px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 36,
                boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 45px rgba(240,190,82,0.25)',
              }}
            >
              <Pill color={C.hanko} size={24} filled>
                KESIMPULAN PENTING
              </Pill>

              {/* Main Equation: KANJI + KANJI ≠ OTOMATIS ONYOMI */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: 1,
                  }}
                >
                  KANJI ＋ KANJI
                </div>

                {/* NotEqual Graphic */}
                <NotEqual size={140} color={C.text} slash={C.hanko} p={pSlash} />

                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 52,
                    fontWeight: 900,
                    color: C.fuji,
                    letterSpacing: 2,
                    textShadow: '0 0 30px rgba(155,101,201,0.5)',
                  }}
                >
                  OTOMATIS ONYOMI
                </div>
              </div>

              {/* Clarification: Kata tidak salah! */}
              <div
                style={{
                  borderTop: '1.5px dashed rgba(151,181,224,0.3)',
                  paddingTop: 24,
                  width: '90%',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 26,
                    fontWeight: 600,
                    color: C.indigoSoft,
                    lineHeight: 1.4,
                  }}
                >
                  Kata-kata ini sama sekali tidak salah — bahasa Jepang memang memiliki kosakata asli yang memakai dua kanji.
                </span>
              </div>
            </Surface>
          </div>
        )}

        {/* Bottom Tag */}
        <div style={{position: 'absolute', top: 1140}}>
          <Pill color={C.indigoSoft} size={24}>
            POLA = PETUNJUK AWAL, BUKAN HUKUM MUTLAK 🔍
          </Pill>
        </div>
      </div>
    </AbsoluteFill>
  );
};
