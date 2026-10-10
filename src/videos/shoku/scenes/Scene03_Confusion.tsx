import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, EASE_IO, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Surface, ThinkingFace} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {progBetweenSec, sec} from '../timing';

export const Scene03_Confusion: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:16.89: Merge 3 食 into 1 center 食
  const pMerge = progBetweenSec(frame, 16.89, 17.3, EASE_IO);
  const mergeScale = 0.8 + 0.35 * pMerge;

  // 00:17.30: ThinkingFace rises to bottom center
  const pThinking = pop(frame, fps, sec(17.3), BOUNCY);

  // Bubbles entry
  const pB1 = pop(frame, fps, sec(17.7), BOUNCY); // た？
  const pB2 = pop(frame, fps, sec(18.15), BOUNCY); // しょく？
  const pB3 = pop(frame, fps, sec(18.55), BOUNCY); // どっち？
  const pB4 = pop(frame, fps, sec(19.0), BOUNCY); // ???
  const pB5 = pop(frame, fps, sec(19.2), BOUNCY); // は？

  // Headlines
  const pHead1 = pop(frame, fps, sec(19.6), SPRING); // SATU KANJI
  const pHead2 = pop(frame, fps, sec(20.05), SPRING); // BISA PUNYA BEBERAPA BACAAN

  // 00:20.95: Bubbles sucked into 食 (scale to 0 towards center)
  const pSuck = progBetweenSec(frame, 20.95, 21.4, EASE_IO);
  const bubbleSuckScale = 1 - pSuck;
  const bubbleSuckOpacity = 1 - pSuck;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh" at={sec(20.95)} volume={0.65} />
        </>
      )}

      {/* Main Content */}
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
        {/* Top Headlines */}
        <div
          style={{
            position: 'absolute',
            top: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            zIndex: 10,
          }}
        >
          {frame >= sec(19.6) && (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 48,
                fontWeight: 800,
                color: C.textSecondary,
                letterSpacing: 2,
                opacity: pHead1,
                transform: `scale(${pHead1})`,
              }}
            >
              SATU KANJI
            </span>
          )}

          {frame >= sec(20.05) && (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 56,
                fontWeight: 900,
                color: C.text,
                letterSpacing: 1.5,
                textAlign: 'center',
                opacity: pHead2,
                transform: `scale(${pHead2})`,
              }}
            >
              BISA PUNYA{' '}
              <span
                style={{
                  color: C.gold,
                  textShadow: '0 0 28px rgba(240,190,82,0.5)',
                }}
              >
                BEBERAPA BACAAN
              </span>
            </span>
          )}
        </div>

        {/* Center Merged Kanji 食 */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            transform: `scale(${mergeScale})`,
          }}
        >
          <Surface
            tone="elevated"
            radius={50}
            border={C.gold}
            style={{
              width: 320,
              height: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 220,
                fontWeight: 900,
                color: C.gold,
                textShadow: '0 0 40px rgba(240,190,82,0.5)',
              }}
            >
              食
            </span>
          </Surface>
        </div>

        {/* Floating Question Bubbles around Center */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: bubbleSuckOpacity,
            transform: `scale(${bubbleSuckScale})`,
            transformOrigin: '50% 50%',
            zIndex: 6,
          }}
        >
          {/* Bubble 1: た？ */}
          {frame >= sec(17.7) && (
            <div
              style={{
                position: 'absolute',
                top: 700,
                left: 140,
                opacity: pB1,
                transform: `scale(${pB1})`,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                border={C.indigo}
                style={{padding: '16px 32px'}}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 48,
                    fontWeight: 800,
                    color: C.goldSoft,
                  }}
                >
                  た？
                </span>
              </Surface>
            </div>
          )}

          {/* Bubble 2: しょく？ */}
          {frame >= sec(18.15) && (
            <div
              style={{
                position: 'absolute',
                top: 730,
                right: 130,
                opacity: pB2,
                transform: `scale(${pB2})`,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                border={C.indigo}
                style={{padding: '16px 32px'}}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 48,
                    fontWeight: 800,
                    color: C.goldSoft,
                  }}
                >
                  しょく？
                </span>
              </Surface>
            </div>
          )}

          {/* Bubble 3: どっち？ */}
          {frame >= sec(18.55) && (
            <div
              style={{
                position: 'absolute',
                top: 1100,
                left: 170,
                opacity: pB3,
                transform: `scale(${pB3})`,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                border={C.hanko}
                style={{padding: '16px 32px'}}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 44,
                    fontWeight: 800,
                    color: C.hanko,
                  }}
                >
                  どっち？
                </span>
              </Surface>
            </div>
          )}

          {/* Bubble 4: ??? */}
          {frame >= sec(19.0) && (
            <div
              style={{
                position: 'absolute',
                top: 1120,
                right: 180,
                opacity: pB4,
                transform: `scale(${pB4})`,
              }}
            >
              <Surface
                tone="card"
                radius={24}
                style={{padding: '14px 28px'}}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 40,
                    fontWeight: 800,
                    color: C.indigoSoft,
                  }}
                >
                  ???
                </span>
              </Surface>
            </div>
          )}

          {/* Bubble 5: は？ */}
          {frame >= sec(19.2) && (
            <div
              style={{
                position: 'absolute',
                top: 610,
                left: 480,
                opacity: pB5,
                transform: `scale(${pB5})`,
              }}
            >
              <Surface
                tone="card"
                radius={22}
                style={{padding: '10px 22px'}}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 34,
                    fontWeight: 700,
                    color: C.textSecondary,
                  }}
                >
                  は？
                </span>
              </Surface>
            </div>
          )}
        </div>

        {/* ThinkingFace at bottom center */}
        {frame >= sec(17.3) && (
          <div
            style={{
              position: 'absolute',
              bottom: 490,
              opacity: pThinking,
              transform: `scale(${pThinking})`,
              zIndex: 7,
            }}
          >
            <ThinkingFace size={150} state="thinking" />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
