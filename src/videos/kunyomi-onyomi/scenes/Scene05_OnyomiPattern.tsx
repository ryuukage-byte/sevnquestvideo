import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene05_OnyomiPattern: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:19.00: Header & Rule card
  const pHeader = pop(frame, fps, sec(19.0), SPRING);

  // 00:20.50: Formula badge (Kanji + Kanji -> Onyomi)
  const pFormula = pop(frame, fps, sec(20.5), BOUNCY);

  // 00:23.80: Example 1 (学校 -> がっこう)
  const pEx1 = pop(frame, fps, sec(23.8), SPRING);

  // 00:25.10: Example 2 (電車 -> でんしゃ)
  const pEx2 = pop(frame, fps, sec(25.1), SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(19.1)} volume={0.6} />
          <Sfx name="ding" at={sec(20.6)} volume={0.65} />
          <Sfx name="pop" at={sec(23.9)} volume={0.65} />
          <Sfx name="pop" at={sec(25.2)} volume={0.65} />
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
          <Pill color={C.fuji} size={28} filled>
            POLA 2 · KANJI MAJEMUK (熟語)
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
              fontSize: 56,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            GABUNGAN KANJI → ONYOMI
          </span>
        </div>

        {/* Formula Bar */}
        <div
          style={{
            position: 'absolute',
            top: 430,
            opacity: pFormula,
            transform: `scale(${pFormula})`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'rgba(155, 101, 201, 0.18)',
            border: `2px solid ${C.fuji}`,
            borderRadius: 24,
            padding: '12px 32px',
            boxShadow: '0 12px 36px rgba(155,101,201,0.3)',
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 30,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: 1,
            }}
          >
            KANJI ＋ KANJI
          </span>
          <ArrowRight size={32} color={C.gold} />
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 34,
              fontWeight: 900,
              color: C.fuji,
              letterSpacing: 2,
            }}
          >
            ONYOMI (音読み)
          </span>
        </div>

        {/* Example Cards Container */}
        <div
          style={{
            position: 'absolute',
            top: 550,
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            width: '100%',
            maxWidth: 960,
          }}
        >
          {/* ================= EXAMPLE 1: 学校 → がっこう ================= */}
          {frame >= sec(23.5) && (
            <div
              style={{
                width: '100%',
                opacity: pEx1,
                transform: `scale(${pEx1}) translateY(${(1 - pEx1) * 20}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={C.fuji}
                style={{
                  padding: '36px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                {/* Kanji Compound: 学校 */}
                <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                  <div
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 88,
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    学<span style={{color: C.gold}}>校</span>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                    <span
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 20,
                        color: C.indigoSoft,
                        fontWeight: 700,
                      }}
                    >
                      学 (gaku) + 校 (kou)
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 22,
                        color: C.textSecondary,
                        fontWeight: 600,
                      }}
                    >
                      sekolah
                    </span>
                  </div>
                </div>

                <ArrowRight size={40} color={C.fuji} />

                {/* Onyomi Reading: がっこう */}
                <div
                  style={{
                    background: 'rgba(155, 101, 201, 0.2)',
                    border: `2px solid ${C.fuji}`,
                    borderRadius: 24,
                    padding: '14px 32px',
                    fontFamily: FONT.jp,
                    fontSize: 54,
                    fontWeight: 900,
                    color: C.fuji,
                    boxShadow: '0 8px 24px rgba(155,101,201,0.3)',
                  }}
                >
                  がっこう
                </div>
              </Surface>
            </div>
          )}

          {/* ================= EXAMPLE 2: 電車 → でんしゃ ================= */}
          {frame >= sec(24.8) && (
            <div
              style={{
                width: '100%',
                opacity: pEx2,
                transform: `scale(${pEx2}) translateY(${(1 - pEx2) * 20}px)`,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.fuji}
                style={{
                  padding: '36px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                {/* Kanji Compound: 電車 */}
                <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                  <div
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 88,
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    電<span style={{color: C.gold}}>車</span>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                    <span
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 20,
                        color: C.indigoSoft,
                        fontWeight: 700,
                      }}
                    >
                      電 (den) + 車 (sha)
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.body,
                        fontSize: 22,
                        color: C.textSecondary,
                        fontWeight: 600,
                      }}
                    >
                      kereta listrik
                    </span>
                  </div>
                </div>

                <ArrowRight size={40} color={C.fuji} />

                {/* Onyomi Reading: でんしゃ */}
                <div
                  style={{
                    background: 'rgba(155, 101, 201, 0.2)',
                    border: `2px solid ${C.fuji}`,
                    borderRadius: 24,
                    padding: '14px 32px',
                    fontFamily: FONT.jp,
                    fontSize: 54,
                    fontWeight: 900,
                    color: C.fuji,
                    boxShadow: '0 8px 24px rgba(155,101,201,0.3)',
                  }}
                >
                  でんしゃ
                </div>
              </Surface>
            </div>
          )}
        </div>

        {/* Bottom Tag */}
        {frame >= sec(25.4) && (
          <div style={{position: 'absolute', top: 1040, opacity: pEx2}}>
            <Pill color={C.indigoSoft} size={24}>
              POLA ONYOMI SERING TERJADI PADA JUKUGO 📌
            </Pill>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
