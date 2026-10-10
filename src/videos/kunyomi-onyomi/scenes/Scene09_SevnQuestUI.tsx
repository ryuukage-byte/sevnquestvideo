import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {LogoMark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene09_SevnQuestUI: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:51.80: SevnQuest Top App Bar
  const pAppBar = pop(frame, fps, sec(51.8), SPRING);

  // 00:52.10: FLASHCARD card enters ("Mau hafalan pakai flashcard? Bisa.")
  const pMethod1 = pop(frame, fps, sec(52.1), BOUNCY);

  // 00:54.30: KANJI WRITING card enters ("Mau latihan nulis kanji? Bisa.")
  const pMethod2 = pop(frame, fps, sec(54.3), BOUNCY);

  // 00:57.00: KOSAKATA & SOAL cards enter ("Mau belajar dari kosa kata atau latihan soal? Bisa juga.")
  const pMethod3 = pop(frame, fps, sec(57.0), BOUNCY);
  const pMethod4 = pop(frame, fps, sec(58.2), BOUNCY);

  // 00:61.00: "YOUR WAY TO LEARN" message appears
  const isYourWayPhase = frame >= sec(60.88);
  const pYourWay = pop(frame, fps, sec(61.0), SPRING);

  // 00:65.50: "TERUS BELAJAR" climax message appears
  const isTerusBelajarPhase = frame >= sec(65.38);
  const pTerusBelajar = pop(frame, fps, sec(65.5), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(52.1)} volume={0.65} />
          <Sfx name="ding" at={sec(53.2)} volume={0.6} />
          <Sfx name="stroke" at={sec(54.4)} volume={0.5} />
          <Sfx name="pop" at={sec(54.6)} volume={0.65} />
          <Sfx name="pop" at={sec(57.1)} volume={0.65} />
          <Sfx name="pop" at={sec(58.3)} volume={0.65} />
          <Sfx name="chime" at={sec(61.0)} volume={0.7} />
          <Sfx name="sparkle" at={sec(65.6)} volume={0.75} />
        </>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 40px',
        }}
      >
        {/* ================= SEVNQUEST APP TOP HEADER ================= */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: 40,
            right: 40,
            opacity: pAppBar,
            transform: `translateY(${(1 - pAppBar) * -30}px)`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(25, 30, 42, 0.95)',
            borderRadius: 32,
            padding: '16px 28px',
            border: `1.5px solid ${C.borderPrimary}`,
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            zIndex: 30,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <LogoMark size={56} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span
                style={{
                  fontFamily: FONT.fantasy,
                  fontWeight: 900,
                  fontSize: 26,
                  letterSpacing: 2,
                  color: '#ffffff',
                }}
              >
                SEVN<span style={{color: C.gold}}>QUEST</span>
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.indigoSoft,
                  letterSpacing: 1,
                }}
              >
                LEARNING HUB · METODE BEBAS
              </span>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(240, 190, 82, 0.18)',
              border: `1.5px solid ${C.gold}`,
              borderRadius: 20,
              padding: '6px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{fontSize: 18}}>🔥</span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontWeight: 800,
                fontSize: 18,
                color: C.gold,
              }}
            >
              LEVEL UP
            </span>
          </div>
        </div>

        {/* ================= 4 LEARNING METHODS GRID ================= */}
        {!isTerusBelajarPhase && (
          <div
            style={{
              position: 'absolute',
              top: 330,
              width: '100%',
              maxWidth: 960,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              zIndex: 20,
            }}
          >
            {/* METHOD 1: FLASHCARD (00:52.10) */}
            <div
              style={{
                opacity: pMethod1,
                transform: `scale(${pMethod1}) translateY(${(1 - pMethod1) * 20}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={32}
                border={frame >= sec(53.0) && frame < sec(54.2) ? C.matcha : C.borderSubtle}
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: 36}}>🗂️</span>
                  <Pill color={C.indigoSoft} size={16} filled>
                    METODE 01
                  </Pill>
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 30,
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: 1,
                  }}
                >
                  FLASHCARD
                </div>
                <div
                  style={{
                    background: 'rgba(15, 20, 30, 0.6)',
                    borderRadius: 16,
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span style={{fontFamily: FONT.jp, fontSize: 32, fontWeight: 900, color: C.gold}}>
                    食べる
                  </span>
                  <span style={{fontFamily: FONT.body, fontSize: 18, color: C.matcha, fontWeight: 700}}>
                    BISA! ✓
                  </span>
                </div>
              </Surface>
            </div>

            {/* METHOD 2: KANJI WRITING (00:54.30) */}
            <div
              style={{
                opacity: pMethod2,
                transform: `scale(${pMethod2}) translateY(${(1 - pMethod2) * 20}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={32}
                border={frame >= sec(55.0) && frame < sec(56.9) ? C.gold : C.borderSubtle}
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: 36}}>✍️</span>
                  <Pill color={C.gold} size={16} filled>
                    METODE 02
                  </Pill>
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 30,
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: 1,
                  }}
                >
                  KANJI WRITING
                </div>
                <div
                  style={{
                    background: 'rgba(15, 20, 30, 0.6)',
                    borderRadius: 16,
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.textSecondary}}>
                    Kakijun 9 Goresan
                  </span>
                  <span style={{fontFamily: FONT.body, fontSize: 18, color: C.gold, fontWeight: 700}}>
                    BISA! ✓
                  </span>
                </div>
              </Surface>
            </div>

            {/* METHOD 3: KOSAKATA (00:57.00) */}
            <div
              style={{
                opacity: pMethod3,
                transform: `scale(${pMethod3}) translateY(${(1 - pMethod3) * 20}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={32}
                border={frame >= sec(57.2) && frame < sec(60.0) ? C.matcha : C.borderSubtle}
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: 36}}>📚</span>
                  <Pill color={C.matcha} size={16} filled>
                    METODE 03
                  </Pill>
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 30,
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: 1,
                  }}
                >
                  KOSAKATA
                </div>
                <div
                  style={{
                    background: 'rgba(15, 20, 30, 0.6)',
                    borderRadius: 16,
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span style={{fontFamily: FONT.jp, fontSize: 24, fontWeight: 900, color: C.matcha}}>
                    手紙 · 電車
                  </span>
                  <span style={{fontFamily: FONT.body, fontSize: 18, color: C.matcha, fontWeight: 700}}>
                    BISA! ✓
                  </span>
                </div>
              </Surface>
            </div>

            {/* METHOD 4: LATIHAN SOAL (00:58.20) */}
            <div
              style={{
                opacity: pMethod4,
                transform: `scale(${pMethod4}) translateY(${(1 - pMethod4) * 20}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={32}
                border={frame >= sec(58.5) && frame < sec(60.8) ? C.fuji : C.borderSubtle}
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: 36}}>🎯</span>
                  <Pill color={C.fuji} size={16} filled>
                    METODE 04
                  </Pill>
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 30,
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: 1,
                  }}
                >
                  LATIHAN SOAL
                </div>
                <div
                  style={{
                    background: 'rgba(15, 20, 30, 0.6)',
                    borderRadius: 16,
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.textSecondary}}>
                    Quiz & Drill
                  </span>
                  <span style={{fontFamily: FONT.body, fontSize: 18, color: C.fuji, fontWeight: 700}}>
                    BISA JUGA! ✓
                  </span>
                </div>
              </Surface>
            </div>
          </div>
        )}

        {/* ================= STAGE HIGHLIGHT: YOUR WAY TO LEARN (00:60.88 - 00:65.38) ================= */}
        {isYourWayPhase && !isTerusBelajarPhase && (
          <div
            style={{
              position: 'absolute',
              top: 860,
              width: '100%',
              maxWidth: 880,
              opacity: pYourWay,
              transform: `scale(${pYourWay}) translateY(${(1 - pYourWay) * 20}px)`,
              zIndex: 30,
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={C.gold}
              style={{
                padding: '36px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(240,190,82,0.35)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 48,
                  fontWeight: 900,
                  color: C.gold,
                  letterSpacing: 2,
                  textAlign: 'center',
                  textShadow: '0 0 30px rgba(240,190,82,0.6)',
                }}
              >
                YOUR WAY TO LEARN
              </span>
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: 24,
                  fontWeight: 600,
                  color: C.text,
                  textAlign: 'center',
                }}
              >
                Pilih metode yang paling nyaman untuk ritme belajarmu.
              </span>
            </Surface>
          </div>
        )}

        {/* ================= CLIMAX: TERUS BELAJAR (00:65.38 - 00:70.62) ================= */}
        {isTerusBelajarPhase && (
          <div
            style={{
              position: 'absolute',
              top: 420,
              width: '100%',
              maxWidth: 960,
              opacity: pTerusBelajar,
              transform: `scale(${pTerusBelajar})`,
              zIndex: 35,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={`2px solid ${C.matcha}`}
              style={{
                padding: '70px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 28,
                boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 60px rgba(79,174,134,0.35)',
                background: 'linear-gradient(180deg, #1d2c25 0%, #131b17 100%)',
              }}
            >
              <Pill color={C.matcha} size={26} filled>
                FILOSOFI SEVNQUEST
              </Pill>

              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 76,
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: 2,
                  textAlign: 'center',
                  lineHeight: 1.1,
                  textShadow: '0 8px 32px rgba(0,0,0,0.6)',
                }}
              >
                YANG TERPENTING:
              </div>

              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 84,
                  fontWeight: 900,
                  color: C.gold,
                  letterSpacing: 3,
                  textAlign: 'center',
                  lineHeight: 1.05,
                  textShadow: '0 0 45px rgba(240,190,82,0.7)',
                }}
              >
                TERUS BELAJAR.
              </div>

              <div
                style={{
                  marginTop: 16,
                  borderTop: '1.5px dashed rgba(151,181,224,0.35)',
                  paddingTop: 24,
                  width: '85%',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 600,
                    color: C.indigoSoft,
                    lineHeight: 1.4,
                  }}
                >
                  Bukan soal harus pakai cara apa, tapi konsistensi melangkah setiap hari.
                </span>
              </div>
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
