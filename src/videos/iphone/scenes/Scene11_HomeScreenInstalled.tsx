import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  HomeScreenMock,
  TouchIndicator,
  SevnQuestAppScreen,
} from '../components';

export const Scene11_HomeScreenInstalled: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:48.10: Camera push to SevnQuest icon
  const pushProg = prog(f, 48.05, 48.60, EASE_IO);
  const shellScale = interpolate(pushProg, [0, 1], [0.94, 1.18]);
  const shellY = interpolate(pushProg, [0, 1], [20, 80]);

  // 00:48.52: Gold outline on icon
  const iconHighlight = f >= sec(48.52) && f < sec(50.80);

  // 00:49.20: Text "SEVNQUEST SUDAH TERPASANG"
  const textProg = prog(f, 49.15, 49.50, EASE);

  // 00:50.10 -> 00:50.45: Touch indicator taps icon
  // In HomeScreenMock, Row 2 column 4: approx x = 570, y = 260
  const touchEnter = prog(f, 49.95, 50.15, EASE);
  const touchPressProg = prog(f, 50.35, 50.60, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI);

  // 00:50.70: App window expands fullscreen (without Safari controls!)
  const appExpandProg = prog(f, 50.65, 51.15, EASE_IO);

  // 00:51.76: Small label "OPEN LIKE AN APP"
  const labelProg = prog(f, 51.70, 52.00, EASE);

  // 00:53.20: Phone light rotation -1deg -> 0deg
  const rotProg = prog(f, 53.00, 53.40, EASE_IO);
  const shellRotate = interpolate(rotProg, [0, 1], [-1, 0]);

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
      <Sfx name="tap" at={sec(50.45)} />
      <Sfx name="pop" at={sec(50.70)} />

      {/* Top Banner Indicator */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 40,
        }}
      >
        {/* Banner 1: SEVNQUEST SUDAH TERPASANG */}
        {f < sec(51.20) && (
          <div
            style={{
              opacity: textProg,
              transform: `translateY(${interpolate(textProg, [0, 1], [-15, 0])}px)`,
              background: 'rgba(23, 28, 38, 0.92)',
              border: `1.5px solid ${C.gold}`,
              borderRadius: 22,
              padding: '8px 26px',
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 22,
              color: C.gold,
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            SEVNQUEST SUDAH TERPASANG ✨
          </div>
        )}

        {/* Banner 2: OPEN LIKE AN APP (after fullscreen open) */}
        {f >= sec(51.20) && (
          <div
            style={{
              opacity: labelProg,
              transform: `scale(${interpolate(labelProg, [0, 1], [0.85, 1])})`,
              background: 'rgba(79, 174, 134, 0.22)',
              border: `1.5px solid ${C.matcha}`,
              borderRadius: 22,
              padding: '8px 26px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
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
              📱 SEPERTI APLIKASI ASLI (STANDALONE)
            </span>
          </div>
        )}
      </div>

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell
          scale={shellScale}
          translateY={shellY}
          rotation={shellRotate}
        >
          {/* Layer 1: Home Screen */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1 - appExpandProg,
              transform: `scale(${interpolate(appExpandProg, [0, 1], [1, 0.92])})`,
            }}
          >
            <HomeScreenMock
              showSevnQuest={true}
              sevnQuestHighlight={iconHighlight}
              sevnQuestPress={touchPress}
            />
          </div>

          {/* Layer 2: Standalone Fullscreen Web App View */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: appExpandProg,
              transform: `scale(${interpolate(appExpandProg, [0, 1], [0.85, 1])})`,
              transformOrigin: '75% 25%',
            }}
          >
            {/* Native App Screen WITHOUT any Safari toolbar / address bar! */}
            <SevnQuestAppScreen />
          </div>

          {/* Touch on App Icon */}
          {f >= sec(49.95) && f <= sec(50.80) && (
            <TouchIndicator
              x={570}
              y={260}
              press={touchPress}
              opacity={touchEnter}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
