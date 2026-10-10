import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Stamp, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene05_WhyCanChange: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:30.41: Center 食 focus
  const pFocus = pop(frame, fps, sec(30.41), BOUNCY);

  // 00:31.20: Top label "1 KANJI"
  const pOneKanji = pop(frame, fps, sec(31.2), BOUNCY);

  // 00:31.66: Branch 1 line (left)
  const pLine1 = progBetweenSec(frame, 31.66, 32.1, EASE);

  // 00:32.10: Node 1 "た"
  const pNodeTa = pop(frame, fps, sec(32.1), BOUNCY);

  // 00:32.80: "1 READING?" label
  const pOneReading = pop(frame, fps, sec(32.8), SPRING);

  // 00:33.20: Shake on "1 READING?"
  const isShaking = frame >= sec(33.2) && frame < sec(33.65);
  const shakeX = isShaking ? Math.sin((frame - sec(33.2)) * 1.5) * 6 : 0;

  // 00:33.65: Stamp "NGGAK SELALU"
  const pStamp = pop(frame, fps, sec(33.65), BOUNCY);

  // 00:34.10: Branch 2 line (right)
  const pLine2 = progBetweenSec(frame, 34.1, 34.55, EASE);

  // 00:34.55: Node 2 "しょく"
  const pNodeShoku = pop(frame, fps, sec(34.55), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="error" at={sec(33.65)} volume={0.65} />
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
        {/* Top Header: 1 KANJI */}
        {frame >= sec(31.2) && (
          <div
            style={{
              position: 'absolute',
              top: 280,
              opacity: pOneKanji,
              transform: `scale(${pOneKanji})`,
            }}
          >
            <Pill color={C.gold} size={28} filled>
              1 KANJI
            </Pill>
          </div>
        )}

        {/* Root Kanji Card: 食 */}
        <div
          style={{
            position: 'absolute',
            top: 400,
            opacity: pFocus,
            transform: `scale(${pFocus})`,
            zIndex: 10,
          }}
        >
          <Surface
            tone="elevated"
            radius={44}
            border={C.gold}
            style={{
              width: 260,
              height: 260,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 180,
                fontWeight: 900,
                color: C.gold,
                textShadow: '0 0 35px rgba(240,190,82,0.5)',
              }}
            >
              食
            </span>
          </Surface>
        </div>

        {/* Tree Branch Lines (SVG) */}
        <svg
          width={1080}
          height={600}
          style={{
            position: 'absolute',
            top: 580,
            left: 0,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {/* Left Branch Line towards (320, 300) from (540, 40) */}
          <path
            d="M540 40 L300 280"
            stroke={C.gold}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={380}
            strokeDashoffset={380 * (1 - pLine1)}
          />

          {/* Right Branch Line towards (760, 280) from (540, 40) */}
          <path
            d="M540 40 L780 280"
            stroke={C.gold}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={380}
            strokeDashoffset={380 * (1 - pLine2)}
          />
        </svg>

        {/* Left Child Node: た */}
        {frame >= sec(32.1) && (
          <div
            style={{
              position: 'absolute',
              top: 860,
              left: 200,
              opacity: pNodeTa,
              transform: `scale(${pNodeTa})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <Surface
              tone="card"
              radius={36}
              border={C.matcha}
              style={{
                width: 200,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 110,
                  fontWeight: 900,
                  color: C.matcha,
                }}
              >
                た
              </span>
            </Surface>

            {/* "1 READING?" label and stamp */}
            {frame >= sec(32.8) && (
              <div
                style={{
                  marginTop: 20,
                  position: 'relative',
                  opacity: pOneReading,
                  transform: `translateX(${shakeX}px)`,
                }}
              >
                <Pill color={C.textSecondary} size={22}>
                  1 CARA BACA?
                </Pill>

                {/* Stamp: NGGAK SELALU */}
                {frame >= sec(33.65) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: -20,
                      opacity: pStamp,
                      transform: `scale(${pStamp})`,
                      zIndex: 20,
                    }}
                  >
                    <Stamp
                      text="NGGAK SELALU"
                      color={C.hanko}
                      size={28}
                      rotate={-12}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Right Child Node: しょく */}
        {frame >= sec(34.55) && (
          <div
            style={{
              position: 'absolute',
              top: 860,
              right: 200,
              opacity: pNodeShoku,
              transform: `scale(${pNodeShoku})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={C.fuji}
              style={{
                width: 200,
                height: 200,
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
                  color: C.fuji,
                }}
              >
                しょく
              </span>
            </Surface>

            <div style={{marginTop: 20}}>
              <Pill color={C.fuji} size={22}>
                BACAAN LAIN
              </Pill>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
