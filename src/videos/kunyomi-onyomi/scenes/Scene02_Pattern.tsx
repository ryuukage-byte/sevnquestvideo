import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene02_Pattern: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:06.80: Headline "JAWABANNYA:"
  const pHead = pop(frame, fps, sec(6.75), SPRING);

  // 00:07.10: "ADA BENERNYA" card pops
  const pCard1 = pop(frame, fps, sec(7.1), SPRING);

  // 00:08.60: "TAPI GAK SELALU" card pops
  const pCard2 = pop(frame, fps, sec(8.6), SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="ding" at={sec(7.1)} volume={0.65} />
          <Sfx name="pop" at={sec(8.6)} volume={0.7} />
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
            top: 260,
            opacity: pHead,
            transform: `scale(${pHead})`,
          }}
        >
          <Pill color={C.indigoSoft} size={26}>
            VERIFIKASI RUMUS
          </Pill>
        </div>

        {/* Main Headline */}
        <div
          style={{
            position: 'absolute',
            top: 360,
            textAlign: 'center',
            opacity: pHead,
            transform: `translateY(${(1 - pHead) * 15}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 60,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: 1,
            }}
          >
            JAWABANNYA?
          </span>
        </div>

        {/* Split Verdict Cards */}
        <div
          style={{
            position: 'absolute',
            top: 520,
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            width: '100%',
            maxWidth: 960,
          }}
        >
          {/* Verdict 1: ADA BENERNYA */}
          {frame >= sec(6.9) && (
            <div
              style={{
                width: '100%',
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
                  gap: 28,
                  boxShadow:
                    '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(79,174,134,0.25)',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 28,
                    background: 'rgba(79,174,134,0.2)',
                    border: `2px solid ${C.matcha}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon size={52} color={C.matcha} stroke={4} />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 48,
                      fontWeight: 900,
                      color: C.matcha,
                      letterSpacing: 0.5,
                    }}
                  >
                    ADA BENERNYA
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 26,
                      color: C.textSecondary,
                      fontWeight: 600,
                    }}
                  >
                    Sebagai pola umum dan kecenderungan frekuensi
                  </div>
                </div>
              </Surface>
            </div>
          )}

          {/* Verdict 2: TAPI GAK SELALU */}
          {frame >= sec(8.4) && (
            <div
              style={{
                width: '100%',
                opacity: pCard2,
                transform: `scale(${pCard2}) translateY(${(1 - pCard2) * 20}px)`,
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
                  gap: 28,
                  boxShadow:
                    '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(240,190,82,0.25)',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 28,
                    background: 'rgba(240,190,82,0.2)',
                    border: `2px solid ${C.gold}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 44,
                  }}
                >
                  ⚡
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 48,
                      fontWeight: 900,
                      color: C.gold,
                      letterSpacing: 0.5,
                    }}
                  >
                    TAPI GAK SELALU
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 26,
                      color: C.textSecondary,
                      fontWeight: 600,
                    }}
                  >
                    Bukan rumus pasti yang tanpa pengecualian
                  </div>
                </div>
              </Surface>
            </div>
          )}
        </div>

        {/* Bottom Insight Pill */}
        {frame >= sec(9.2) && (
          <div
            style={{
              position: 'absolute',
              top: 1040,
              opacity: pCard2,
            }}
          >
            <Pill color={C.indigoSoft} size={26}>
              POLA ≠ RUMUS MATEMATIKA
            </Pill>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
