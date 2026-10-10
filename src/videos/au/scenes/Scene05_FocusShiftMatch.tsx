import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const Scene05_FocusShiftMatch: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Focus shift entry:
  // f = 0 to 33: Two kanji side-by-side, 会う dims to 30%, 合う scales up to 1.15
  const pShift = prog(f, 0, 20, (t) => t);
  const leftOpacity = 1 - pShift * 0.7; // 1.0 down to 0.3
  const rightScale = 1 + pShift * 0.15;

  // Punch-in hero 合う to center at f = 33
  const pHero = pop(f, fps, 33, BOUNCY);
  const centerShift = prog(f, 33, 20); // shifts 合う card from 240 to center 0

  // Two mismatched shapes appear below 合う at f = 45
  const pShapes = pop(f, fps, 45, SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh" at={0} volume={0.5} />
          <Sfx name="pop" at={33} volume={0.65} />
        </>
      )}

      {/* Header Pill */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pill color={C.matcha} size={26}>
          FOKUS: 合う
        </Pill>
      </div>

      {/* Main Area */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Kanji: 会う (Fades out and exits left as hero centers) */}
        {f < 50 && (
          <div
            style={{
              position: 'absolute',
              transform: `translateX(-240px) scale(${0.9})`,
              opacity: leftOpacity * (1 - centerShift),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Surface
              tone="inset"
              radius={44}
              style={{
                padding: '44px 56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 160,
                  fontWeight: 900,
                  color: C.textMuted,
                  lineHeight: 1,
                }}
              >
                会う
              </div>
            </Surface>
          </div>
        )}

        {/* Right Kanji: 合う (Shifts to center and becomes hero) */}
        <div
          style={{
            position: 'absolute',
            top: f >= 33 ? 320 : undefined,
            transform:
              f >= 33
                ? `scale(${pHero * 1.05})`
                : `translateX(${240 * (1 - centerShift)}px) scale(${rightScale})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Surface
            tone="elevated"
            radius={50}
            border={C.matcha}
            style={{
              padding: '40px 70px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 45px rgba(79,174,134,0.35)',
            }}
          >
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 180,
                fontWeight: 900,
                color: C.matcha,
                lineHeight: 1,
                textShadow: '0 0 40px rgba(79,174,134,0.6)',
              }}
            >
              合う
            </div>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 30,
                fontWeight: 700,
                color: C.goldSoft,
                marginTop: 12,
                letterSpacing: 2,
              }}
            >
              あ・う
            </div>
          </Surface>
        </div>

        {/* Two Mismatched Puzzle/Geometric Shapes Below at f >= 45 */}
        {f >= 45 && (
          <div
            style={{
              position: 'absolute',
              top: 880,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 120,
              opacity: pShapes,
              transform: `scale(${pShapes})`,
            }}
          >
            {/* Shape 1 (Left Piece) */}
            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: '36px 12px 36px 36px',
                background: 'linear-gradient(135deg, #3d5885 0%, #1f2738 100%)',
                border: `3px dashed ${C.indigoSoft}`,
                boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-8deg)',
              }}
            >
              <span style={{fontFamily: FONT.mono, fontSize: 32, fontWeight: 800, color: C.indigoSoft}}>
                A
              </span>
            </div>

            {/* Shape 2 (Right Piece, not aligned yet) */}
            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: '12px 36px 36px 36px',
                background: 'linear-gradient(135deg, #4fae86 0%, #1d4030 100%)',
                border: `3px dashed ${C.matcha}`,
                boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(14deg)',
              }}
            >
              <span style={{fontFamily: FONT.mono, fontSize: 32, fontWeight: 800, color: C.matcha}}>
                B
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
