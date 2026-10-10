import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  ShareSheetMock,
  AddToHomeScreenMock,
  GesturePath,
  TouchIndicator,
  SafariMock,
} from '../components';

export const Scene08_AddToHomeScreen: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // Zoomed perspective for high readability on TikTok (Zoom rule)
  // Scale 1.25, focused slightly lower
  const shellScale = 1.25;
  const shellY = -180;

  // 00:32.20 -> 00:34.32: Swipe gesture up and scroll
  const swipeProg = prog(f, 32.40, 34.10, EASE_IO);
  const scrollY = interpolate(swipeProg, [0, 1], [0, 140]);

  // Gesture path dotted line (upward scroll)
  const gestureActive = f >= sec(32.40) && f <= sec(34.20);
  const gestureProgress = prog(f, 32.40, 33.60, EASE);

  // 00:34.70: Other menus dim to 40%
  const dimOthers = f >= sec(34.70);

  // 00:34.94: Gold highlight around Add to Home Screen
  const addHomeHighlight = f >= sec(34.94);

  // 00:35.46 -> 00:36.00: Touch indicator moves & taps Add to Home Screen
  // In ShareSheetMock with scrollY=140, the Add to Home Screen row is approx x = 380, y = 730
  const touchEnter = prog(f, 35.10, 35.40, EASE);
  const touchPressProg = prog(f, 35.85, 36.15, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI);

  // 00:36.42: Share Sheet slides down
  const sheetExitProg = prog(f, 36.35, 36.75, EASE_IO);

  // 00:36.70: AddToHomeScreenMock appears
  const modalEnterProg = prog(f, 36.65, 36.95, EASE_IO);

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
      <Sfx name="swipe" at={sec(32.62)} />
      <Sfx name="click" at={sec(36.00)} />

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={shellScale} translateY={shellY}>
          {/* Blurred Background Safari */}
          <SafariMock
            url="sevnquest.sevnsoul.site"
            style={{filter: 'blur(10px) brightness(0.6)'}}
          />

          {/* Share Sheet Layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1 - sheetExitProg,
              transform: `translateY(${sheetExitProg * 100}%)`,
              pointerEvents: sheetExitProg > 0.8 ? 'none' : 'auto',
            }}
          >
            <ShareSheetMock
              scrollY={scrollY}
              addHomeHighlight={addHomeHighlight}
              addHomePress={touchPress}
              dimOthers={dimOthers}
            />
          </div>

          {/* Gesture Swipe Up dotted arrow */}
          {gestureActive && (
            <GesturePath
              x={380}
              startY={880}
              length={180}
              direction="up"
              progress={gestureProgress}
              opacity={1 - prog(f, 33.80, 34.20, EASE)}
            />
          )}

          {/* Touch Indicator during scroll or tap */}
          {f >= sec(32.30) && f <= sec(34.20) && (
            <TouchIndicator
              x={380}
              y={interpolate(swipeProg, [0, 1], [880, 700])}
              press={0.4}
              opacity={1}
            />
          )}

          {f >= sec(35.20) && f <= sec(36.35) && (
            <TouchIndicator
              x={380}
              y={730}
              press={touchPress}
              opacity={touchEnter}
            />
          )}

          {/* Next Modal Layer: AddToHomeScreenMock (Reveals at 00:36.70) */}
          {modalEnterProg > 0.01 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateY(${interpolate(modalEnterProg, [0, 1], [100, 0])}%)`,
              }}
            >
              <AddToHomeScreenMock />
            </div>
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
