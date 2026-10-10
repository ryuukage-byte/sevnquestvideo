import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {MaskText} from '../../../shared/components/MaskText';
import {Pill} from '../../../shared/components/ui';
import {
  IPhoneShell,
  HomeScreenMock,
  TouchIndicator,
  SevnQuestAppScreen,
} from '../components';

export const Scene01_ResultFirst: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:00.19 - Phone enters from bottom (scale 0.86 -> 1, rotate 2deg -> 0deg, translateY 300 -> 0)
  const phoneEnter = prog(f, 0.19, 0.65, EASE_IO);
  const phoneScale = interpolate(phoneEnter, [0, 1], [0.86, 0.98]);
  const phoneRotate = interpolate(phoneEnter, [0, 1], [2, 0]);
  const phoneInitialY = interpolate(phoneEnter, [0, 1], [350, 0]);

  // 00:00.75 -> 00:01.05 Touch indicator approaches and taps SevnQuest icon
  // In HomeScreenMock, SevnQuest icon is in Row 2, column 4.
  // Within shell (760x1540): approx x = 600, y = 300
  const touchEnter = prog(f, 0.55, 0.75, EASE);
  const touchPressProg = prog(f, 0.95, 1.15, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI); // 0 -> 1 -> 0

  // 00:01.30 - SevnQuest expands to fullscreen inside the phone
  const appOpenProg = prog(f, 1.25, 1.55, EASE_IO);

  // 00:01.72 - Phone shifts slightly downwards to give room for headline
  const phoneShiftProg = prog(f, 1.72, 2.10, EASE_IO);
  const phoneY = phoneInitialY + phoneShiftProg * 140;

  // 00:02.09 - Headline enters
  const headProg = prog(f, 2.09, 2.50, EASE);

  // 00:02.70 - Pill enters
  const pillProg = prog(f, 2.70, 2.95, EASE);

  // 00:03.25 - Step indicator appears
  const stepProg = prog(f, 3.25, 3.55, EASE);

  // 00:03.95 - 00:04.14: Exit transition up
  const exitProg = prog(f, 3.95, 4.14, EASE);
  const exitY = exitProg * -120;
  const exitAlpha = 1 - exitProg;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: W,
        height: H,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Sfx name="whoosh-soft" at={sec(0.19)} />
      <Sfx name="tap" at={sec(1.05)} />
      <Sfx name="pop" at={sec(2.09)} />
      <Sfx name="ding" at={sec(2.70)} />

      {/* Top Headline Section (appears after phone shifts down at 00:02.09) */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          zIndex: 40,
          opacity: exitAlpha,
          transform: `translateY(${exitY}px)`,
        }}
      >
        <div style={{opacity: headProg}}>
          <MaskText
            text="PASANG SEVNQUEST DI iPHONE"
            size={52}
            weight={900}
            font={FONT.display}
            start={sec(2.09)}
            hl={{iPHONE: C.gold, SEVNQUEST: C.gold}}
            style={{
              textAlign: 'center',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          />
        </div>

        {/* Pill: ± 1 MENIT */}
        <div
          style={{
            opacity: pillProg,
            transform: `scale(${interpolate(pillProg, [0, 1], [0.8, 1])})`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Pill color={C.gold} size={18} filled>
            ⏱️ ± 1 MENIT
          </Pill>
        </div>

        {/* Step Indicator: 1 2 3 4 (● ○ ○ ○) */}
        <div
          style={{
            opacity: stepProg,
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            marginTop: 6,
            background: 'rgba(23, 28, 38, 0.75)',
            backdropFilter: 'blur(12px)',
            padding: '8px 24px',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {[1, 2, 3, 4].map((step) => {
            const active = step === 1;
            return (
              <div
                key={step}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontWeight: active ? 800 : 500,
                    fontSize: 16,
                    color: active ? C.gold : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {step}
                </span>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: active ? C.gold : 'rgba(255,255,255,0.25)',
                    boxShadow: active ? `0 0 10px ${C.gold}` : 'none',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main iPhone Body */}
      <div
        style={{
          position: 'relative',
          opacity: Math.min(1, phoneEnter * 1.5),
          zIndex: 20,
        }}
      >
        <IPhoneShell
          scale={phoneScale}
          rotation={phoneRotate}
          translateY={phoneY}
        >
          {/* Layer 1: Home Screen with App Icons */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1 - appOpenProg,
              transform: `scale(${interpolate(appOpenProg, [0, 1], [1, 0.92])})`,
              pointerEvents: appOpenProg > 0.8 ? 'none' : 'auto',
            }}
          >
            <HomeScreenMock
              showSevnQuest={true}
              sevnQuestPress={touchPress}
              sevnQuestHighlight={f >= sec(0.45) && f < sec(1.30)}
            />
          </div>

          {/* Layer 2: SevnQuest Fullscreen App View (Opens at 00:01.30) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: appOpenProg,
              transform: `scale(${interpolate(appOpenProg, [0, 1], [0.85, 1])})`,
              transformOrigin: '75% 25%', // Expands outwards from the icon's position!
            }}
          >
            <SevnQuestAppScreen />
          </div>

          {/* Touch Pointer inside Phone Frame */}
          {f >= sec(0.65) && f <= sec(1.35) && (
            <TouchIndicator
              x={570}
              y={260}
              press={touchPress}
              opacity={touchEnter * (1 - prog(f, 1.25, 1.35, EASE))}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
