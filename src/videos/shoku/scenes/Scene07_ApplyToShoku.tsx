import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene07_ApplyToShoku: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // Phase transition at 00:52.20: Question phase
  const isQuestionPhase = frame >= sec(52.2);

  // Left branch focus: 42.59 to 46.72
  const pTaberuIn = pop(frame, fps, sec(42.59), SPRING);

  // 00:43.80: た scale 1 -> 1.18
  const pTaScale = interpolate(frame, [sec(43.8), sec(44.2)], [1.0, 1.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 00:44.60: Connector 食べる -> た
  const pConn1 = progBetweenSec(frame, 44.6, 45.2, EASE);

  // 00:45.59: Badge 訓読み gets check
  const pCheck1 = pop(frame, fps, sec(45.59), BOUNCY);

  // 00:46.72: Focus shifts right (left dims to 35%, right 100%)
  const pShiftRight = progBetweenSec(frame, 46.72, 47.1, EASE);
  const pRebalance = progBetweenSec(frame, 51.5, 52.0, EASE);
  const leftOpacity = 1 - 0.65 * pShiftRight + 0.65 * pRebalance;
  const rightOpacity = 0.35 + 0.65 * pShiftRight;

  // 00:47.00: Appears 食事
  const pShokujiIn = pop(frame, fps, sec(47.0), SPRING);

  // 00:48.51: Connector drawn
  const pConn2 = progBetweenSec(frame, 48.51, 49.1, EASE);

  // 00:49.34: しょく scales up
  const pShokuScale = interpolate(frame, [sec(49.34), sec(49.8)], [1.0, 1.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 00:50.86: Badge 音読み gets check
  const pCheck2 = pop(frame, fps, sec(50.86), BOUNCY);

  // 00:52.20: Diagram recedes (zoom out)
  const pZoomOut = progBetweenSec(frame, 52.2, 52.7, EASE_IO);
  const diagramScale = 1 - 0.25 * pZoomOut;
  const diagramOpacity = 1 - 0.85 * pZoomOut;

  // 00:52.70: Center big "?"
  const pBigQ = pop(frame, fps, sec(52.7), BOUNCY);

  // 00:53.10: Left "た"
  const pQTa = pop(frame, fps, sec(53.1), BOUNCY);

  // 00:53.45: Right "しょく"
  const pQShoku = pop(frame, fps, sec(53.45), BOUNCY);

  // 00:54.32: pulse た
  const pTaPulse = progBetweenSec(frame, 54.32, 54.6, EASE);
  const taPulseScale = 1 + Math.sin(pTaPulse * Math.PI) * 0.15;

  // 00:54.63: pulse しょく
  const pShokuPulse = progBetweenSec(frame, 54.63, 54.95, EASE);
  const shokuPulseScale = 1 + Math.sin(pShokuPulse * Math.PI) * 0.15;

  // 00:55.20: Headline "KAPAN PAKAI YANG MANA?"
  const pHeadline = pop(frame, fps, sec(55.2), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="ding" at={sec(45.59)} volume={0.65} />
          <Sfx name="ding" at={sec(50.86)} volume={0.65} />
        </>
      )}

      {/* ================= STAGE 1: DUAL BRANCH VALIDATION ================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: diagramOpacity,
          transform: `scale(${diagramScale})`,
        }}
      >
        {/* Left Column: Kunyomi + 食べる */}
        <div
          style={{
            position: 'absolute',
            left: 100,
            top: 360,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: leftOpacity,
          }}
        >
          {/* Badge: 訓読み */}
          <div style={{position: 'relative'}}>
            <Surface
              tone="card"
              radius={32}
              border={C.matcha}
              style={{padding: '24px 36px', display: 'flex', alignItems: 'center', gap: 14}}
            >
              <span style={{fontFamily: FONT.jp, fontSize: 50, fontWeight: 900, color: C.matcha}}>
                訓読み
              </span>
              {frame >= sec(45.59) && (
                <div style={{transform: `scale(${pCheck1})`}}>
                  <CheckIcon size={40} color={C.matcha} draw={pCheck1} />
                </div>
              )}
            </Surface>
          </div>

          {/* Example 食べる Card */}
          <div
            style={{
              marginTop: 40,
              opacity: pTaberuIn,
              transform: `scale(${pTaberuIn})`,
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={C.gold}
              style={{
                width: 360,
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
              }}
            >
              <span style={{fontFamily: FONT.jp, fontSize: 80, fontWeight: 900, color: C.text}}>
                <span style={{color: C.gold}}>食</span>べる
              </span>

              {/* Connector arrow line */}
              <div
                style={{
                  height: 3,
                  width: `${pConn1 * 100}%`,
                  background: C.matcha,
                  margin: '18px 0',
                  borderRadius: 2,
                }}
              />

              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 54,
                  fontWeight: 900,
                  color: C.matcha,
                  transform: `scale(${pTaScale})`,
                  display: 'inline-block',
                }}
              >
                た
              </span>
            </Surface>
          </div>
        </div>

        {/* Right Column: Onyomi + 食事 */}
        <div
          style={{
            position: 'absolute',
            right: 100,
            top: 360,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: rightOpacity,
          }}
        >
          {/* Badge: 音読み */}
          <div style={{position: 'relative'}}>
            <Surface
              tone="card"
              radius={32}
              border={C.fuji}
              style={{padding: '24px 36px', display: 'flex', alignItems: 'center', gap: 14}}
            >
              <span style={{fontFamily: FONT.jp, fontSize: 50, fontWeight: 900, color: C.fuji}}>
                音読み
              </span>
              {frame >= sec(50.86) && (
                <div style={{transform: `scale(${pCheck2})`}}>
                  <CheckIcon size={40} color={C.fuji} draw={pCheck2} />
                </div>
              )}
            </Surface>
          </div>

          {/* Example 食事 Card */}
          {frame >= sec(47.0) && (
            <div
              style={{
                marginTop: 40,
                opacity: pShokujiIn,
                transform: `scale(${pShokujiIn})`,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.gold}
                style={{
                  width: 360,
                  padding: '36px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 80, fontWeight: 900, color: C.text}}>
                  <span style={{color: C.gold}}>食</span>事
                </span>

                {/* Connector line */}
                <div
                  style={{
                    height: 3,
                    width: `${pConn2 * 100}%`,
                    background: C.fuji,
                    margin: '18px 0',
                    borderRadius: 2,
                  }}
                />

                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 54,
                    fontWeight: 900,
                    color: C.fuji,
                    transform: `scale(${pShokuScale})`,
                    display: 'inline-block',
                  }}
                >
                  しょく
                </span>
              </Surface>
            </div>
          )}
        </div>
      </div>

      {/* ================= STAGE 2: QUESTION CONFRONTATION ================= */}
      {isQuestionPhase && (
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
          {/* Headline: KAPAN PAKAI YANG MANA? */}
          {frame >= sec(55.2) && (
            <div
              style={{
                position: 'absolute',
                top: 360,
                opacity: pHeadline,
                transform: `scale(${pHeadline})`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 56,
                  fontWeight: 900,
                  color: C.gold,
                  textAlign: 'center',
                  letterSpacing: 2,
                  textShadow: '0 0 35px rgba(240,190,82,0.5)',
                }}
              >
                KAPAN PAKAI YANG MANA?
              </span>
            </div>
          )}

          {/* Big "?" in Center */}
          {frame >= sec(52.7) && (
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pBigQ,
                transform: `scale(${pBigQ})`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 260,
                  fontWeight: 900,
                  color: C.gold,
                  textShadow: '0 0 50px rgba(240,190,82,0.6)',
                }}
              >
                ?
              </span>
            </div>
          )}

          {/* Left Choice: た */}
          {frame >= sec(53.1) && (
            <div
              style={{
                position: 'absolute',
                left: 140,
                top: 940,
                opacity: pQTa,
                transform: `scale(${pQTa * taPulseScale})`,
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={C.matcha}
                style={{
                  width: 220,
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 90,
                    fontWeight: 900,
                    color: C.matcha,
                  }}
                >
                  た
                </span>
              </Surface>
            </div>
          )}

          {/* Right Choice: しょく */}
          {frame >= sec(53.45) && (
            <div
              style={{
                position: 'absolute',
                right: 140,
                top: 940,
                opacity: pQShoku,
                transform: `scale(${pQShoku * shokuPulseScale})`,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.fuji}
                style={{
                  width: 220,
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 76,
                    fontWeight: 900,
                    color: C.fuji,
                  }}
                >
                  しょく
                </span>
              </Surface>
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
