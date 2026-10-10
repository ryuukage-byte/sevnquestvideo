import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene10_BetterLearningModel: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 01:12.10: Headline line 1: BELAJAR KANJI
  const pHead1 = pop(frame, fps, sec(72.1), SPRING);

  // 01:12.55: Headline line 2: BERSAMA KOTOBA.
  const pHead2 = pop(frame, fps, sec(72.55), SPRING);

  // 01:13.00: KANJI pill enters
  const pPill1 = pop(frame, fps, sec(73.0), BOUNCY);

  // 01:13.30: + KOTOBA pill enters
  const pPill2 = pop(frame, fps, sec(73.3), BOUNCY);

  // 01:13.65: + READING pill enters
  const pPill3 = pop(frame, fps, sec(73.65), BOUNCY);

  // 01:14.00 - 01:14.30: All snap into unified Kotoba Card
  const isSnapPhase = frame >= sec(74.0);
  const pSnapCard = pop(frame, fps, sec(74.0), BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="chime" at={sec(74.3)} volume={0.7} />
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
        {/* Top Headlines */}
        <div
          style={{
            position: 'absolute',
            top: 280,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {frame >= sec(72.1) && (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 54,
                fontWeight: 800,
                color: C.textSecondary,
                letterSpacing: 2,
                opacity: pHead1,
                transform: `scale(${pHead1})`,
              }}
            >
              BELAJAR KANJI
            </span>
          )}

          {frame >= sec(72.55) && (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 64,
                fontWeight: 900,
                color: C.gold,
                letterSpacing: 2,
                opacity: pHead2,
                transform: `scale(${pHead2})`,
                textShadow: '0 0 35px rgba(240,190,82,0.5)',
              }}
            >
              BERSAMA KOTOBA.
            </span>
          )}
        </div>

        {/* Phase 1: Separate elements entry (01:13.00 to 01:14.00) */}
        {!isSnapPhase ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              marginTop: 100,
            }}
          >
            {frame >= sec(73.0) && (
              <div style={{opacity: pPill1, transform: `scale(${pPill1})`}}>
                <Pill color={C.hanko} size={30} filled>
                  KANJI
                </Pill>
              </div>
            )}

            {frame >= sec(73.3) && (
              <div style={{opacity: pPill2, transform: `scale(${pPill2})`}}>
                <Pill color={C.indigoSoft} size={30} filled>
                  + KOTOBA
                </Pill>
              </div>
            )}

            {frame >= sec(73.65) && (
              <div style={{opacity: pPill3, transform: `scale(${pPill3})`}}>
                <Pill color={C.gold} size={30} filled>
                  + READING
                </Pill>
              </div>
            )}
          </div>
        ) : (
          /* Phase 2: Snapped Unified Kotoba Card (01:14.00+) */
          <div
            style={{
              marginTop: 120,
              opacity: pSnapCard,
              transform: `scale(${pSnapCard})`,
            }}
          >
            <Surface
              tone="elevated"
              radius={44}
              border={C.gold}
              style={{
                width: 720,
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 32px 80px rgba(0,0,0,0.75)',
              }}
            >
              {/* Card Header Badge */}
              <div style={{marginBottom: 20}}>
                <Pill color={C.indigoSoft} size={22}>
                  KOTOBA · N5
                </Pill>
              </div>

              {/* Japanese word: 食べる */}
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 120,
                  fontWeight: 900,
                  color: C.text,
                }}
              >
                <span style={{color: C.gold}}>食</span>べる
              </span>

              {/* Reading: たべる */}
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 50,
                  fontWeight: 700,
                  color: C.goldSoft,
                  letterSpacing: 4,
                  marginTop: 10,
                }}
              >
                たべる
              </span>

              {/* Indonesian Meaning: makan */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 18,
                  borderTop: '1.5px dashed rgba(151,181,224,0.3)',
                  width: '80%',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 40,
                    fontWeight: 800,
                    color: C.matcha,
                    letterSpacing: 1,
                  }}
                >
                  makan
                </span>
              </div>
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
