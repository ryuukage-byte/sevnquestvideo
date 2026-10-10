import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {NotEqual, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene04_TaVsShoku: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:21.43: Left card enters (食べる)
  const pLeftIn = pop(frame, fps, sec(21.43), SPRING);

  // 00:22.82: Underline under 食 on left card
  const pUnderlineLeft = progBetweenSec(frame, 22.82, 23.4, EASE);

  // 00:24.64: Big reading "た" pops above 食
  const pTaPop = pop(frame, fps, sec(24.64), BOUNCY);

  // 00:24.90: Label "KUN READING"
  const pKunLabel = pop(frame, fps, sec(24.9), BOUNCY);

  // 00:25.65: Right card enters (食事)
  const pRightIn = pop(frame, fps, sec(25.65), SPRING);

  // Left card dims to 35% when right enters, then both return to 100% at 29.52
  const pLeftDim = progBetweenSec(frame, 25.65, 26.2, EASE);
  const pRebalance = progBetweenSec(frame, 29.52, 29.8, EASE);
  const leftOpacity = 1 - 0.65 * pLeftDim + 0.65 * pRebalance;

  // 00:27.23: Underline under 食 on right card
  const pUnderlineRight = progBetweenSec(frame, 27.23, 27.8, EASE);

  // 00:29.18: Big reading "しょく" pops above 食 on right
  const pShokuPop = pop(frame, fps, sec(29.18), BOUNCY);

  // 00:29.80: NotEqual enters center
  const pNotEqual = pop(frame, fps, sec(29.8), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="tick" at={sec(24.64)} volume={0.65} />
          <Sfx name="tick" at={sec(29.18)} volume={0.65} />
        </>
      )}

      {/* Main Split Layout */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Title Badge on top */}
        <div style={{position: 'absolute', top: 280}}>
          <Pill color={C.indigoSoft} size={26}>
            PERBANDINGAN BACAAN
          </Pill>
        </div>

        {/* Comparison Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: 40,
            position: 'relative',
          }}
        >
          {/* ================= LEFT CARD: 食べる ================= */}
          {frame >= sec(21.43) && (
            <div
              style={{
                opacity: pLeftIn * leftOpacity,
                transform: `translateX(${(1 - pLeftIn) * -120}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Kun Reading Pill on top */}
              <div
                style={{
                  height: 48,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  opacity: pKunLabel,
                  transform: `scale(${pKunLabel})`,
                }}
              >
                <Pill color={C.matcha} size={20}>
                  KUN READING
                </Pill>
              </div>

              {/* Big Reading "た" */}
              <div
                style={{
                  height: 90,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pTaPop,
                  transform: `scale(${pTaPop})`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 76,
                    fontWeight: 900,
                    color: C.gold,
                    textShadow: '0 0 24px rgba(240,190,82,0.6)',
                  }}
                >
                  た
                </span>
              </div>

              {/* Surface Container */}
              <Surface
                tone="card"
                radius={36}
                border={C.borderPrimary}
                style={{
                  width: 380,
                  padding: '40px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{display: 'flex', alignItems: 'baseline', position: 'relative'}}>
                  {/* Kanji 食 with underline */}
                  <div style={{position: 'relative', display: 'inline-block'}}>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 104,
                        fontWeight: 900,
                        color: C.gold,
                        display: 'inline-block',
                      }}
                    >
                      食
                    </span>
                    {/* Gold Underline */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        height: 5,
                        width: `${pUnderlineLeft * 100}%`,
                        background: C.gold,
                        borderRadius: 3,
                        boxShadow: '0 0 12px rgba(240,190,82,0.8)',
                      }}
                    />
                  </div>

                  {/* べる */}
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 104,
                      fontWeight: 900,
                      color: C.text,
                      display: 'inline-block',
                    }}
                  >
                    べる
                  </span>
                </div>
              </Surface>
            </div>
          )}

          {/* ================= CENTER: NOT EQUAL (≠) ================= */}
          {frame >= sec(29.8) && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: pNotEqual,
                zIndex: 10,
              }}
            >
              <NotEqual size={180} color={C.text} slash={C.hanko} p={pNotEqual} />
            </div>
          )}

          {/* ================= RIGHT CARD: 食事 ================= */}
          {frame >= sec(25.65) && (
            <div
              style={{
                opacity: pRightIn,
                transform: `translateX(${(1 - pRightIn) * 120}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* On Reading Pill on top */}
              <div
                style={{
                  height: 48,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  opacity: pShokuPop,
                  transform: `scale(${pShokuPop})`,
                }}
              >
                <Pill color={C.fuji} size={20}>
                  ON READING
                </Pill>
              </div>

              {/* Big Reading "しょく" */}
              <div
                style={{
                  height: 90,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pShokuPop,
                  transform: `scale(${pShokuPop})`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 76,
                    fontWeight: 900,
                    color: C.gold,
                    textShadow: '0 0 24px rgba(240,190,82,0.6)',
                  }}
                >
                  しょく
                </span>
              </div>

              {/* Surface Container */}
              <Surface
                tone="elevated"
                radius={36}
                border={C.gold}
                style={{
                  width: 380,
                  padding: '40px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
                }}
              >
                <div style={{display: 'flex', alignItems: 'baseline', position: 'relative'}}>
                  {/* Kanji 食 with underline */}
                  <div style={{position: 'relative', display: 'inline-block'}}>
                    <span
                      style={{
                        fontFamily: FONT.jp,
                        fontSize: 104,
                        fontWeight: 900,
                        color: C.gold,
                        display: 'inline-block',
                      }}
                    >
                      食
                    </span>
                    {/* Gold Underline */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        height: 5,
                        width: `${pUnderlineRight * 100}%`,
                        background: C.gold,
                        borderRadius: 3,
                        boxShadow: '0 0 12px rgba(240,190,82,0.8)',
                      }}
                    />
                  </div>

                  {/* 事 */}
                  <span
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 104,
                      fontWeight: 900,
                      color: C.text,
                      display: 'inline-block',
                    }}
                  >
                    事
                  </span>
                </div>
              </Surface>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
