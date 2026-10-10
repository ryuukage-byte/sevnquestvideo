import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene04_KunyomiExamples: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:16.00: Card 1 (食べる -> たべる)
  const pCard1 = pop(frame, fps, sec(16.0), SPRING);

  // 00:17.00: Card 2 (見る -> 見｜る + callout -> みる)
  const pCard2 = pop(frame, fps, sec(17.0), BOUNCY);

  // 00:17.60: Callout "る = OKURIGANA"
  const pCallout2 = pop(frame, fps, sec(17.6), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(16.1)} volume={0.65} />
          <Sfx name="pop" at={sec(17.1)} volume={0.65} />
          <Sfx name="ding" at={sec(17.6)} volume={0.6} />
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
        <div style={{position: 'absolute', top: 240}}>
          <Pill color={C.matcha} size={28} filled>
            CONTOH KUNYOMI (訓読み)
          </Pill>
        </div>

        {/* Headline */}
        <div
          style={{
            position: 'absolute',
            top: 340,
            textAlign: 'center',
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
            DUA CONTOH UTAMA
          </span>
        </div>

        {/* Stack of Example Cards */}
        <div
          style={{
            position: 'absolute',
            top: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            width: '100%',
            maxWidth: 960,
          }}
        >
          {/* ================= CARD 1: 食べる → たべる ================= */}
          <div
            style={{
              opacity: pCard1,
              transform: `scale(${pCard1}) translateY(${(1 - pCard1) * 20}px)`,
            }}
          >
            <Surface
              tone="card"
              radius={36}
              border={C.matcha}
              style={{
                padding: '36px 36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              }}
            >
              {/* Left word: 食べる */}
              <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                <div
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 72,
                    fontWeight: 900,
                    color: '#ffffff',
                  }}
                >
                  <span style={{color: C.gold}}>食</span>べる
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 18,
                      color: C.indigoSoft,
                      fontWeight: 700,
                    }}
                  >
                    食: KANJI
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 18,
                      color: C.gold,
                      fontWeight: 700,
                    }}
                  >
                    べる: OKURIGANA
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight size={38} color={C.matcha} />

              {/* Right Reading: たべる */}
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <div
                  style={{
                    background: 'rgba(79,174,134,0.18)',
                    border: `2px solid ${C.matcha}`,
                    borderRadius: 22,
                    padding: '12px 28px',
                    fontFamily: FONT.jp,
                    fontSize: 52,
                    fontWeight: 900,
                    color: C.matcha,
                  }}
                >
                  たべる
                </div>
              </div>
            </Surface>
          </div>

          {/* ================= CARD 2: 見る → 見｜る (る = OKURIGANA) → みる ================= */}
          <div
            style={{
              opacity: pCard2,
              transform: `scale(${pCard2}) translateY(${(1 - pCard2) * 20}px)`,
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={pCallout2 > 0.5 ? C.gold : C.borderPrimary}
              style={{
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                boxShadow:
                  pCallout2 > 0.5
                    ? '0 24px 60px rgba(0,0,0,0.65), 0 0 35px rgba(240,190,82,0.25)'
                    : '0 20px 50px rgba(0,0,0,0.6)',
                transition: 'border 0.3s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                {/* Visual: 見｜る */}
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 84,
                      fontWeight: 900,
                      color: C.gold,
                    }}
                  >
                    見
                  </span>
                  {/* Divider line */}
                  <div
                    style={{
                      width: 3,
                      height: 70,
                      background: C.thread,
                      margin: '0 16px',
                      borderRadius: 2,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 84,
                      fontWeight: 900,
                      color: '#ffffff',
                    }}
                  >
                    る
                  </span>
                </div>

                {/* Arrow */}
                <ArrowRight size={38} color={C.matcha} />

                {/* Result Reading: みる */}
                <div
                  style={{
                    background: 'rgba(79,174,134,0.18)',
                    border: `2px solid ${C.matcha}`,
                    borderRadius: 22,
                    padding: '12px 28px',
                    fontFamily: FONT.jp,
                    fontSize: 52,
                    fontWeight: 900,
                    color: C.matcha,
                  }}
                >
                  みる
                </div>
              </div>

              {/* Explicit Educational Callout: る = OKURIGANA */}
              {frame >= sec(17.4) && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    opacity: pCallout2,
                    transform: `scale(${pCallout2})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'rgba(240, 190, 82, 0.15)',
                    border: `1.5px solid ${C.gold}`,
                    borderRadius: 16,
                    padding: '6px 18px',
                  }}
                >
                  <span style={{fontSize: 22}}>💡</span>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 22,
                      fontWeight: 800,
                      color: C.gold,
                      letterSpacing: 1,
                    }}
                  >
                    る ＝ OKURIGANA
                  </span>
                  <span style={{fontSize: 20, color: C.textSecondary}}>·</span>
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 20,
                      fontWeight: 700,
                      color: C.text,
                    }}
                  >
                    maka kanji 見 dibaca Kunyomi (み)
                  </span>
                </div>
              )}
            </Surface>
          </div>
        </div>

        {/* Bottom Tag */}
        <div style={{position: 'absolute', top: 1040, opacity: pCard2}}>
          <Pill color={C.indigoSoft} size={24}>
            POLA KUNYOMI TERKONFIRMASI ✅
          </Pill>
        </div>
      </div>
    </AbsoluteFill>
  );
};
