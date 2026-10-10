import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene03_Okurigana: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:10.40: Scene header & card entry
  const pCard = pop(frame, fps, sec(10.4), SPRING);

  // 00:11.20: Divider & Callouts pop: "KANJI" and "OKURIGANA"
  const pDivider = progBetweenSec(frame, 11.0, 11.4, EASE);
  const pKanjiLabel = pop(frame, fps, sec(11.2), SPRING);
  const pOkuriCallout = pop(frame, fps, sec(11.5), BOUNCY);

  // 00:13.20: Transformation phase starts
  const pTransform = progBetweenSec(frame, 13.2, 13.8, EASE_IO);

  // 00:13.80: "KUNYOMI" badge pops in
  const pKunyomiBadge = pop(frame, fps, sec(13.8), BOUNCY);

  // 00:14.20: Ruby furigana / reading glow
  const pReadingGlow = progBetweenSec(frame, 14.0, 14.6, EASE);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(10.5)} volume={0.6} />
          <Sfx name="stroke" at={sec(11.1)} volume={0.4} />
          <Sfx name="pop" at={sec(11.5)} volume={0.6} />
          <Sfx name="chime" at={sec(13.8)} volume={0.7} />
          <Sfx name="sparkle" at={sec(14.2)} volume={0.6} />
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
            top: 230,
            opacity: pCard,
            transform: `scale(${pCard})`,
          }}
        >
          <Pill color={C.matcha} size={26} filled>
            POLA 1 · KANJI + HIRAGANA
          </Pill>
        </div>

        {/* Section Headline */}
        <div
          style={{
            position: 'absolute',
            top: 320,
            textAlign: 'center',
            opacity: pCard,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 54,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: 1,
            }}
          >
            STRUKTUR OKURIGANA
          </span>
        </div>

        {/* ================= MAIN ANNOTATION CONTAINER ================= */}
        <div
          style={{
            position: 'absolute',
            top: 450,
            width: '100%',
            maxWidth: 960,
            opacity: pCard,
            transform: `scale(${pCard})`,
          }}
        >
          <Surface
            tone="elevated"
            radius={44}
            border={pKunyomiBadge > 0.5 ? C.matcha : C.borderPrimary}
            style={{
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow:
                pKunyomiBadge > 0.5
                  ? '0 32px 80px rgba(0,0,0,0.7), 0 0 50px rgba(79,174,134,0.3)'
                  : '0 32px 80px rgba(0,0,0,0.7)',
              transition: 'border 0.3s ease',
            }}
          >
            {/* Upper Annotation Labels Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 60,
                width: '100%',
                height: 70,
                marginBottom: 20,
              }}
            >
              {/* KANJI Label (Points to 食) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  opacity: (1 - pTransform) * pKanjiLabel,
                  transform: `scale(${(1 - pTransform) * pKanjiLabel})`,
                  width: 180,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontWeight: 800,
                    fontSize: 22,
                    color: C.hanko,
                    letterSpacing: 2,
                    background: 'rgba(226, 85, 91, 0.15)',
                    border: `1.5px solid ${C.hanko}`,
                    borderRadius: 12,
                    padding: '4px 14px',
                  }}
                >
                  KANJI
                </span>
                <svg width={20} height={16} viewBox="0 0 20 16">
                  <path d="M10 16 L2 0 L18 0 Z" fill={C.hanko} />
                </svg>
              </div>

              {/* OKURIGANA Callout Bracket (Points to べる) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  opacity: (1 - pTransform) * pOkuriCallout,
                  transform: `scale(${(1 - pTransform) * pOkuriCallout})`,
                  width: 240,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(240, 190, 82, 0.15)',
                    border: `1.5px solid ${C.gold}`,
                    borderRadius: 12,
                    padding: '4px 16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontWeight: 800,
                      fontSize: 22,
                      color: C.gold,
                      letterSpacing: 1.5,
                    }}
                  >
                    OKURIGANA
                  </span>
                </div>
                {/* Visual Bracket Bracket SVG */}
                <svg width={140} height={16} viewBox="0 0 140 16">
                  <path
                    d="M10 2 L70 14 L130 2"
                    stroke={C.gold}
                    strokeWidth={3}
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Core Characters Display */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '20px 0',
              }}
            >
              {/* Kanji Root: 食 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Furigana "た" appearing on transformation */}
                <div
                  style={{
                    position: 'absolute',
                    top: -46,
                    fontFamily: FONT.jp,
                    fontSize: 42,
                    fontWeight: 900,
                    color: C.gold,
                    opacity: pTransform,
                    transform: `translateY(${(1 - pTransform) * 15}px)`,
                  }}
                >
                  た
                </div>

                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 180,
                    fontWeight: 900,
                    color: pTransform > 0.5 ? C.gold : '#ffffff',
                    lineHeight: 1,
                    textShadow:
                      pTransform > 0.5
                        ? '0 0 35px rgba(240,190,82,0.6)'
                        : '0 8px 30px rgba(0,0,0,0.5)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  食
                </span>
              </div>

              {/* Vertical Divider Line: ｜ (disappears on transform) */}
              <div
                style={{
                  width: 4,
                  height: 140 * pDivider,
                  background: `linear-gradient(180deg, transparent, ${C.thread}, transparent)`,
                  margin: '0 24px',
                  opacity: (1 - pTransform) * pDivider,
                  transition: 'opacity 0.2s',
                  borderRadius: 2,
                }}
              />

              {/* Okurigana suffix: べる */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  marginLeft: pTransform > 0 ? -12 * pTransform : 0,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 180,
                    fontWeight: 900,
                    color: pTransform > 0.5 ? C.text : C.goldSoft,
                    lineHeight: 1,
                    textShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  べる
                </span>
              </div>
            </div>

            {/* Reading & Meaning Output Bar (Transforms to: たべる) */}
            <div
              style={{
                marginTop: 36,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                width: '100%',
              }}
            >
              {/* Badge: KUNYOMI */}
              {frame >= sec(13.4) && (
                <div
                  style={{
                    opacity: pKunyomiBadge,
                    transform: `scale(${pKunyomiBadge})`,
                  }}
                >
                  <Pill color={C.matcha} size={30} filled>
                    訓読み · KUNYOMI
                  </Pill>
                </div>
              )}

              {/* Pronunciation & Meaning Card */}
              {frame >= sec(13.8) && (
                <div
                  style={{
                    opacity: pReadingGlow,
                    transform: `translateY(${(1 - pReadingGlow) * 10}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    padding: '12px 36px',
                    borderRadius: 20,
                    background: 'rgba(25, 29, 38, 0.8)',
                    border: `1.5px solid rgba(79,174,134,0.3)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 44,
                      fontWeight: 900,
                      color: C.matcha,
                    }}
                  >
                    たべる
                  </span>
                  <span style={{fontSize: 28, color: C.textSecondary}}>·</span>
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 34,
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    makan
                  </span>
                </div>
              )}
            </div>
          </Surface>
        </div>

        {/* Educational Callout Annotation Note */}
        <div
          style={{
            position: 'absolute',
            top: 1140,
            textAlign: 'center',
            maxWidth: 880,
            opacity: pCard,
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
            Hiragana pengiring (okurigana) adalah sinyal kuat bahwa kanji dibaca <b style={{color: C.matcha}}>Kunyomi</b>.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
