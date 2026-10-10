import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  AddToHomeScreenMock,
} from '../components';

export const Scene09_CheckAppName: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:37.40: Camera push towards name field
  const pushProg = prog(f, 37.35, 38.20, EASE_IO);
  // 00:40.33: Camera pull-back slightly
  const pullProg = prog(f, 40.25, 41.00, EASE_IO);

  const shellScale = interpolate(pushProg, [0, 1], [1.15, 1.42]) - pullProg * 0.15;
  const shellY = interpolate(pushProg, [0, 1], [0, 200]) - pullProg * 100;

  // 00:38.01: Helper label "CEK NAMANYA"
  const labelProg = prog(f, 37.95, 38.30, EASE);

  // 00:38.77: Outline input gold
  const nameHighlight = f >= sec(38.77);

  // 00:41.06: Check icon appears
  const showCheckmark = f >= sec(41.06);

  // 00:41.50: Scale bounce on name "1 -> 1.05 -> 1"
  const bounceProg = prog(f, 41.45, 41.85, EASE_IO);
  const nameScale = 1 + Math.sin(bounceProg * Math.PI) * 0.05;

  // 00:42.28: Badge "✓ SevnQuest"
  const badgeProg = prog(f, 42.20, 42.50, EASE);

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
      <Sfx name="ding" at={sec(42.28)} />

      {/* Top Banner Indicator */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 40,
        }}
      >
        {badgeProg > 0.05 ? (
          <div
            style={{
              opacity: badgeProg,
              transform: `scale(${interpolate(badgeProg, [0, 1], [0.85, 1])})`,
              background: 'rgba(79, 174, 134, 0.25)',
              border: `2px solid ${C.matcha}`,
              borderRadius: 22,
              padding: '8px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 22,
                color: C.matcha,
                letterSpacing: 0.5,
              }}
            >
              ✓ SevnQuest
            </span>
          </div>
        ) : (
          <div
            style={{
              opacity: labelProg,
              transform: `translateY(${interpolate(labelProg, [0, 1], [-15, 0])}px)`,
              background: 'rgba(23, 28, 38, 0.9)',
              border: `1.5px solid ${C.gold}`,
              borderRadius: 20,
              padding: '6px 22px',
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 20,
              color: C.gold,
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            CEK NAMANYA ✍️
          </div>
        )}
      </div>

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={shellScale} translateY={shellY}>
          <AddToHomeScreenMock
            nameHighlight={nameHighlight}
            nameScale={nameScale}
            showCheckmark={showCheckmark}
          />
        </IPhoneShell>
      </div>
    </div>
  );
};
