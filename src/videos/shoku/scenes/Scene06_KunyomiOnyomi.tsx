import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene06_KunyomiOnyomi: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:36.60: Initial tree diagram settling
  const pDrop = progBetweenSec(frame, 36.6, 37.2, EASE_IO);
  const dropOffset = pDrop * 40;

  // 00:37.20 & 00:37.45: Left & Right surface containers appear
  const pLeftBox = pop(frame, fps, sec(37.2), SPRING);
  const pRightBox = pop(frame, fps, sec(37.45), SPRING);

  // 00:39.23: Left card reveals "訓読み / KUNYOMI"
  const pKunyomiIn = pop(frame, fps, sec(39.23), BOUNCY);

  // 00:39.90: Left branch glow
  const pLeftGlow = progBetweenSec(frame, 39.9, 40.5, EASE);
  const leftGlowAmt = Math.sin(pLeftGlow * Math.PI) * 20;

  // 00:40.27: Connector line towards right
  const pConnRight = progBetweenSec(frame, 40.27, 41.28, EASE);

  // 00:41.28: Right card reveals "音読み / ONYOMI"
  const pOnyomiIn = pop(frame, fps, sec(41.28), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(39.23)} volume={0.65} />
          <Sfx name="pop" at={sec(41.28)} volume={0.65} />
        </>
      )}

      {/* Main Container */}
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
        {/* Top Header Pill */}
        <div style={{position: 'absolute', top: 220}}>
          <Pill color={C.indigoSoft} size={28}>
            DUA CARA BACA UTAMA
          </Pill>
        </div>

        {/* Center Root Kanji: 食 */}
        <div
          style={{
            position: 'absolute',
            top: 340,
            zIndex: 10,
          }}
        >
          <Surface
            tone="elevated"
            radius={40}
            border={C.gold}
            style={{
              width: 220,
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 150,
                fontWeight: 900,
                color: C.gold,
                textShadow: '0 0 30px rgba(240,190,82,0.5)',
              }}
            >
              食
            </span>
          </Surface>
        </div>

        {/* Branch Lines SVG */}
        <svg
          width={1080}
          height={750}
          style={{
            position: 'absolute',
            top: 480,
            left: 0,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {/* Left Branch to Kunyomi */}
          <path
            d="M540 20 L270 200"
            stroke={pLeftGlow > 0 ? C.matcha : C.borderPrimary}
            strokeWidth={4}
            strokeLinecap="round"
            style={{
              filter: leftGlowAmt > 0 ? `drop-shadow(0 0 ${leftGlowAmt}px ${C.matcha})` : undefined,
            }}
          />
          {/* Right Branch to Onyomi */}
          <path
            d="M540 20 L810 200"
            stroke={frame >= sec(41.28) ? C.fuji : C.borderPrimary}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={380}
            strokeDashoffset={380 * (1 - pConnRight)}
          />

          {/* Left vertical connector: 訓読み -> た */}
          <path
            d="M270 380 L270 470"
            stroke={C.matcha}
            strokeWidth={3}
            strokeDasharray="6 6"
          />
          {/* Right vertical connector: 音読み -> しょく */}
          <path
            d="M810 380 L810 470"
            stroke={C.fuji}
            strokeWidth={3}
            strokeDasharray="6 6"
          />
        </svg>

        {/* ================= LEFT BRANCH: 訓読み (KUNYOMI) ================= */}
        {frame >= sec(37.2) && (
          <div
            style={{
              position: 'absolute',
              top: 670 + dropOffset,
              left: 100,
              width: 340,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: pLeftBox,
              transform: `scale(${pLeftBox})`,
              zIndex: 10,
            }}
          >
            <Surface
              tone="card"
              radius={36}
              border={pKunyomiIn > 0.5 ? C.matcha : C.borderSubtle}
              style={{
                width: '100%',
                padding: '36px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 72,
                  fontWeight: 900,
                  color: C.matcha,
                  opacity: pKunyomiIn,
                  transform: `scale(${0.8 + 0.2 * pKunyomiIn})`,
                  display: 'inline-block',
                }}
              >
                訓読み
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 26,
                  fontWeight: 800,
                  color: C.matcha,
                  letterSpacing: 2,
                  marginTop: 10,
                  opacity: pKunyomiIn,
                }}
              >
                KUNYOMI
              </span>
            </Surface>

            {/* Sub-node: た */}
            <div style={{marginTop: 50}}>
              <Pill color={C.matcha} size={28} filled>
                た
              </Pill>
            </div>
          </div>
        )}

        {/* ================= RIGHT BRANCH: 音読み (ONYOMI) ================= */}
        {frame >= sec(37.45) && (
          <div
            style={{
              position: 'absolute',
              top: 670 + dropOffset,
              right: 100,
              width: 340,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: pRightBox,
              transform: `scale(${pRightBox})`,
              zIndex: 10,
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={pOnyomiIn > 0.5 ? C.fuji : C.borderSubtle}
              style={{
                width: '100%',
                padding: '36px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 72,
                  fontWeight: 900,
                  color: C.fuji,
                  opacity: pOnyomiIn,
                  transform: `scale(${0.8 + 0.2 * pOnyomiIn})`,
                  display: 'inline-block',
                }}
              >
                音読み
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 26,
                  fontWeight: 800,
                  color: C.fuji,
                  letterSpacing: 2,
                  marginTop: 10,
                  opacity: pOnyomiIn,
                }}
              >
                ONYOMI
              </span>
            </Surface>

            {/* Sub-node: しょく */}
            <div style={{marginTop: 50}}>
              <Pill color={C.fuji} size={28} filled>
                しょく
              </Pill>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
