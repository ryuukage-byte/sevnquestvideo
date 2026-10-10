import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog} from '../../../shared/anim';
import {CheckIcon, Pill, Stamp, Surface} from '../../../shared/components/ui';
import {Sfx} from '../../../shared/components/Sfx';
import {C, FONT} from '../../../shared/theme';

export const Scene06_KeywordsAndSnap: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Keyword 1: "menjadi satu" at f = 10
  const pKw1 = pop(f, fps, 10, BOUNCY);

  // Keyword 2: "sesuai" at f = 75
  const pKw2 = pop(f, fps, 75, BOUNCY);

  // Keyword 3: "cocok" at f = 140
  const pKw3 = pop(f, fps, 140, BOUNCY);

  // Shapes movement towards center:
  // Step 1: f=10 to 60 (moves 35% closer)
  // Step 2: f=75 to 130 (moves 70% closer + straightens)
  // Step 3: f=140 to 199 (moves 92% closer, vibrating near boundary)
  // Pause at f=199 to 215
  // Snap at f=215!
  const step1 = prog(f, 10, 50);
  const step2 = prog(f, 75, 50);
  const step3 = prog(f, 140, 50);
  const isSnapped = f >= 215;

  const dist = isSnapped
    ? 0
    : 160 * (1 - step1 * 0.35 - step2 * 0.35 - step3 * 0.22);
  const rotA = isSnapped ? 0 : -8 * (1 - step2);
  const rotB = isSnapped ? 0 : 12 * (1 - step2);

  // Vibration during anticipation (f = 199 to 215)
  const isVibrating = f >= 199 && f < 215;
  const vibX = isVibrating ? (Math.random() - 0.5) * 6 : 0;
  const vibY = isVibrating ? (Math.random() - 0.5) * 6 : 0;

  // Snap ripple & checkmark at f = 215
  const pSnap = pop(f, fps, 215, BOUNCY);
  const ripple = prog(f, 215, 30);
  const pCheck = prog(f, 215, 20);

  // Exit transition at f >= 344
  const pExit = prog(f, 344, 13);
  const exitScale = 1 - pExit * 0.2;
  const exitOpacity = 1 - pExit;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {sfx && (
        <>
          <Sfx name="pop" at={10} volume={0.55} />
          <Sfx name="pop" at={75} volume={0.55} />
          <Sfx name="pop" at={140} volume={0.6} />
          <Sfx name="click" at={215} volume={0.8} />
          <Sfx name="impact" at={215} volume={0.7} />
          <Sfx name="sparkle" at={216} volume={0.65} />
          <Sfx name="whoosh" at={344} volume={0.5} />
        </>
      )}

      {/* Hero Kanji Header */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Surface
          tone="elevated"
          radius={40}
          border={isSnapped ? C.matcha : C.borderPrimary}
          style={{
            padding: '24px 60px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: isSnapped
              ? '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(79,174,134,0.4)'
              : '0 16px 40px rgba(0,0,0,0.6)',
          }}
        >
          <span
            style={{
              fontFamily: FONT.jp,
              fontSize: 90,
              fontWeight: 900,
              color: isSnapped ? C.matcha : C.text,
              textShadow: isSnapped ? '0 0 30px rgba(79,174,134,0.6)' : undefined,
            }}
          >
            合う
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 26,
              fontWeight: 700,
              color: C.indigoSoft,
            }}
          >
            あ・う
          </span>
        </Surface>

        {/* 3 Sequential Keywords */}
        <div
          style={{
            marginTop: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {f >= 10 && (
            <div style={{opacity: pKw1, transform: `scale(${pKw1})`}}>
              <Pill color={C.indigoSoft} size={30} filled={f < 75}>
                ① menjadi satu
              </Pill>
            </div>
          )}
          {f >= 75 && (
            <div style={{opacity: pKw2, transform: `scale(${pKw2})`}}>
              <Pill color={C.teal} size={30} filled={f >= 75 && f < 140}>
                ② sesuai
              </Pill>
            </div>
          )}
          {f >= 140 && (
            <div style={{opacity: pKw3, transform: `scale(${pKw3})`}}>
              <Pill color={C.matcha} size={32} filled={f >= 140}>
                ③ cocok
              </Pill>
            </div>
          )}
        </div>
      </div>

      {/* Visual Alignment & Snap Area */}
      <div
        style={{
          position: 'absolute',
          top: 920,
          left: 0,
          right: 0,
          height: 520,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate(${vibX}px, ${vibY}px)`,
        }}
      >
        {/* Ripple Effect upon Snap */}
        {isSnapped && ripple < 1 && (
          <div
            style={{
              position: 'absolute',
              width: 360,
              height: 360,
              borderRadius: 180,
              border: `4px solid ${C.matcha}`,
              transform: `scale(${1 + ripple * 0.9})`,
              opacity: 1 - ripple,
              boxShadow: '0 0 40px rgba(79,174,134,0.6)',
            }}
          />
        )}

        {/* Left Lock Shape */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${-dist}px) rotate(${rotA}deg)`,
            width: 220,
            height: 220,
            borderRadius: isSnapped ? '36px 0 0 36px' : 36,
            background: isSnapped
              ? 'linear-gradient(135deg, #4fae86 0%, #265942 100%)'
              : 'linear-gradient(135deg, #3d5885 0%, #1f2738 100%)',
            border: `3px solid ${isSnapped ? C.matcha : C.indigoSoft}`,
            boxShadow: isSnapped
              ? '0 20px 45px rgba(79,174,134,0.4)'
              : '0 16px 36px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.1s ease',
          }}
        >
          {isSnapped ? (
            <CheckIcon size={64} color="#ffffff" draw={pCheck} />
          ) : (
            <span style={{fontFamily: FONT.display, fontSize: 44, fontWeight: 800, color: C.text}}>
              合
            </span>
          )}
        </div>

        {/* Right Lock Shape */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${dist}px) rotate(${rotB}deg)`,
            width: 220,
            height: 220,
            borderRadius: isSnapped ? '0 36px 36px 0' : 36,
            background: isSnapped
              ? 'linear-gradient(135deg, #4fae86 0%, #265942 100%)'
              : 'linear-gradient(135deg, #3d5885 0%, #1f2738 100%)',
            border: `3px solid ${isSnapped ? C.matcha : C.matcha}`,
            boxShadow: isSnapped
              ? '0 20px 45px rgba(79,174,134,0.4)'
              : '0 16px 36px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: isSnapped ? 'none' : undefined,
            transition: 'background 0.1s ease',
          }}
        >
          {isSnapped ? (
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 32,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: 2,
              }}
            >
              MATCH!
            </span>
          ) : (
            <span style={{fontFamily: FONT.display, fontSize: 44, fontWeight: 800, color: C.matcha}}>
              う
            </span>
          )}
        </div>

        {/* Payoff Stamp at f >= 215: cocok · selaras */}
        {isSnapped && (
          <div
            style={{
              position: 'absolute',
              top: 380,
              transform: `scale(${pSnap})`,
              opacity: pSnap,
            }}
          >
            <Stamp text="cocok ・ selaras" color={C.matcha} size={42} rotate={-2} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
