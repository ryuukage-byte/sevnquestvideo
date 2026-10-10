import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  HomeScreenMock,
  SafariMock,
  TouchIndicator,
} from '../components';

export const Scene02_OpenSafari: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:04.14 -> 00:04.65: Top label enters
  const labelProg = prog(f, 4.25, 4.65, EASE);

  // 00:05.16: Spotlight on Safari icon (dims others to 45%)
  const spotProg = prog(f, 5.0, 5.25, EASE);
  const dimOthers = interpolate(spotProg, [0, 1], [1, 0.45]);

  // 00:05.58 -> 00:05.84: Touch indicator moves towards Safari
  // In HomeScreenMock dock, Safari is icon index 2 (center-left), approx x = 280, y = 1420
  const touchEnter = prog(f, 5.4, 5.65, EASE);
  const touchPressProg = prog(f, 5.75, 6.05, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI); // 0 -> 1 -> 0

  // 00:06.20: Safari window expands from icon into fullscreen
  const openSafariProg = prog(f, 6.10, 6.45, EASE_IO);

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
      <Sfx name="tap" at={sec(5.84)} />
      <Sfx name="pop" at={sec(6.20)} />

      {/* Top Step Banner */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          zIndex: 40,
          opacity: labelProg,
          transform: `translateY(${interpolate(labelProg, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            background: 'rgba(23, 28, 38, 0.85)',
            border: `1.5px solid ${C.gold}`,
            borderRadius: 20,
            padding: '6px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 900,
              fontSize: 18,
              color: C.gold,
              letterSpacing: 1.5,
            }}
          >
            STEP 1
          </span>
          <span style={{color: 'rgba(255,255,255,0.4)'}}>|</span>
          <span
            style={{
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 22,
              color: '#ffffff',
              letterSpacing: 0.5,
            }}
          >
            BUKA SAFARI
          </span>
        </div>
      </div>

      {/* iPhone Shell */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={0.92} translateY={30}>
          {/* Layer 1: Home Screen */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1 - openSafariProg,
              transform: `scale(${interpolate(openSafariProg, [0, 1], [1, 0.95])})`,
              pointerEvents: openSafariProg > 0.8 ? 'none' : 'auto',
            }}
          >
            <HomeScreenMock
              showSevnQuest={true}
              safariHighlight={spotProg > 0.2}
              safariPress={touchPress}
              dimOthers={dimOthers}
            />
          </div>

          {/* Layer 2: Safari App Window (Expands from bottom dock) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: openSafariProg,
              transform: `scale(${interpolate(openSafariProg, [0, 1], [0.3, 1])})`,
              transformOrigin: '38% 90%', // Expands from Safari icon in dock!
            }}
          >
            <SafariMock isStartPage={true} />
          </div>

          {/* Touch pointer on Safari icon in dock */}
          {f >= sec(5.4) && f <= sec(6.15) && (
            <TouchIndicator
              x={280}
              y={1420}
              press={touchPress}
              opacity={touchEnter}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
