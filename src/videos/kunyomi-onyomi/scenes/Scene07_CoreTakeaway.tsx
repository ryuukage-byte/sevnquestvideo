import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene07_CoreTakeaway: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:36.00: Top Header
  const pHeader = pop(frame, fps, sec(36.0), SPRING);

  // 00:36.50 - 00:39.50: Sequential Steps Pop
  const pStep1 = pop(frame, fps, sec(36.4), SPRING);
  const pStep2 = pop(frame, fps, sec(37.2), SPRING);
  const pStep3 = pop(frame, fps, sec(38.0), SPRING);
  const pStep4 = pop(frame, fps, sec(38.8), SPRING);
  const pStep5 = pop(frame, fps, sec(39.6), BOUNCY);

  // 00:41.20: Core Message Quote Banner Pops
  const pQuote = pop(frame, fps, sec(41.2), BOUNCY);

  const STEPS = [
    {no: '01', label: 'BELUM TAHU', color: C.textSecondary, icon: '❓', p: pStep1},
    {no: '02', label: 'PAKAI POLA', color: C.indigoSoft, icon: '📐', p: pStep2},
    {no: '03', label: 'TEBAK DULU', color: C.gold, icon: '🎯', p: pStep3},
    {no: '04', label: 'CEK KOSAKATA', color: C.fuji, icon: '📖', p: pStep4},
    {no: '05', label: 'PAHAM', color: C.matcha, icon: '✨', p: pStep5},
  ];

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="tick" at={sec(36.4)} volume={0.4} />
          <Sfx name="tick" at={sec(37.2)} volume={0.4} />
          <Sfx name="tick" at={sec(38.0)} volume={0.4} />
          <Sfx name="tick" at={sec(38.8)} volume={0.4} />
          <Sfx name="ding" at={sec(39.6)} volume={0.7} />
          <Sfx name="chime" at={sec(41.3)} volume={0.75} />
          <Sfx name="sparkle" at={sec(42.5)} volume={0.5} />
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
        <div style={{position: 'absolute', top: 220, opacity: pHeader}}>
          <Pill color={C.gold} size={28} filled>
            CORE TAKEAWAY · ALUR BELAJAR
          </Pill>
        </div>

        {/* Section Headline */}
        <div
          style={{
            position: 'absolute',
            top: 310,
            textAlign: 'center',
            opacity: pHeader,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 52,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: 0.5,
            }}
          >
            CARA KERJA YANG BENAR
          </span>
        </div>

        {/* ================= 5-STEP VERTICAL WORKFLOW ================= */}
        <div
          style={{
            position: 'absolute',
            top: 410,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            width: '100%',
            maxWidth: 820,
          }}
        >
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.no}>
              {/* Step Card */}
              <div
                style={{
                  width: '100%',
                  opacity: step.p,
                  transform: `scale(${step.p}) translateY(${(1 - step.p) * 15}px)`,
                }}
              >
                <Surface
                  tone={idx === 4 ? 'elevated' : 'card'}
                  radius={28}
                  border={idx === 4 ? C.matcha : step.p > 0.5 ? step.color : C.borderSubtle}
                  style={{
                    padding: '16px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow:
                      idx === 4
                        ? '0 16px 40px rgba(79,174,134,0.3), 0 0 25px rgba(79,174,134,0.2)'
                        : '0 8px 24px rgba(0,0,0,0.4)',
                    background:
                      idx === 4
                        ? `linear-gradient(180deg, #1d3329 0%, #15221c 100%)`
                        : undefined,
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                    <div
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 22,
                        fontWeight: 800,
                        color: step.color,
                        background: `${step.color}22`,
                        padding: '4px 12px',
                        borderRadius: 12,
                      }}
                    >
                      {step.no}
                    </div>
                    <span
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 34,
                        fontWeight: 900,
                        color: idx === 4 ? C.matcha : C.text,
                        letterSpacing: 1.5,
                      }}
                    >
                      {step.label}
                    </span>
                  </div>

                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span style={{fontSize: 30}}>{step.icon}</span>
                    {idx === 4 && <CheckIcon size={34} color={C.matcha} stroke={4} />}
                  </div>
                </Surface>
              </div>

              {/* Down Arrow between steps */}
              {idx < STEPS.length - 1 && (
                <div
                  style={{
                    color: C.gold,
                    fontSize: 20,
                    fontWeight: 900,
                    opacity: STEPS[idx + 1].p > 0.2 ? 1 : 0.2,
                    lineHeight: 1,
                  }}
                >
                  ↓
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ================= GOLDEN TAKEAWAY QUOTE CARD ================= */}
        {frame >= sec(41.0) && (
          <div
            style={{
              position: 'absolute',
              top: 1040,
              width: '100%',
              maxWidth: 960,
              opacity: pQuote,
              transform: `scale(${pQuote}) translateY(${(1 - pQuote) * 20}px)`,
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={`2px solid ${C.gold}`}
              style={{
                padding: '36px 36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                boxShadow:
                  '0 24px 60px rgba(0,0,0,0.7), 0 0 45px rgba(240,190,82,0.3)',
                background:
                  'linear-gradient(180deg, #2b271d 0%, #1d1b17 100%)',
              }}
            >
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 36,
                  fontWeight: 900,
                  color: '#ffffff',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  letterSpacing: 0.5,
                }}
              >
                “Pakai pola untuk <span style={{color: C.gold}}>menebak</span>,<br />
                pakai kosakata untuk <span style={{color: C.matcha}}>memastikan</span>.”
              </div>

              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.goldSoft,
                  letterSpacing: 2,
                  marginTop: 6,
                }}
              >
                ★ PRINSIP BELAJAR SEVNQUEST ★
              </span>
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
