import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  LanyardPull,
  GesturePath,
  TouchIndicator,
  SevnQuestAppScreen,
} from '../components';

export const Scene05_PullLanyard: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:17.20: Elements dim
  const dimProg = prog(f, 17.15, 17.45, EASE);

  // 00:17.60: Gold outline and label "TARIK INI ↓"
  const highlightLanyard = f >= sec(17.60);

  // 00:18.20: Touch indicator appears on handle
  const touchEnter = prog(f, 17.95, 18.20, EASE);

  // 00:18.65 -> 00:21.61: Dragging downwards with resistance
  // 00:21.61 -> 00:21.97: Hold at max position
  // 00:22.10: Snap back (elastic spring)
  let pullProgress = 0;
  if (f >= sec(22.10)) {
    // Snap back with spring rebound
    const snapProg = prog(f, 22.10, 22.40, EASE_IO);
    pullProgress = Math.max(0, 1 - snapProg);
  } else if (f >= sec(21.61)) {
    pullProgress = 1;
  } else if (f >= sec(18.65)) {
    pullProgress = prog(f, 18.65, 21.61, EASE_IO);
  }

  // 00:19.60 -> 00:21.61: Gesture path dotted arrow
  const gestureProg = prog(f, 19.45, 20.20, EASE);
  const gestureOpacity = gestureProg * (1 - prog(f, 21.60, 21.95, EASE));

  // Finger coordinates:
  // Handle start at x = 380, y = 300
  // Finger drags down to y = 560
  const fingerY = 300 + pullProgress * 230;

  // Touch release at 00:21.97
  const touchVisible = f < sec(22.05);

  // Page displacement (page moves slightly down under tension)
  const pageShiftY = pullProgress * 45;

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
      <Sfx name="tap" at={sec(18.20)} />
      <Sfx name="spring" at={sec(22.10)} />
      <Sfx name="pop" at={sec(22.40)} />

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={0.96} translateY={20}>
          {/* SevnQuest App Screen with Lanyard Mount */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateY(${pageShiftY}px)`,
              transition: 'transform 0.05s ease-out',
            }}
          >
            <SevnQuestAppScreen
              showLanyard={true}
              lanyardComponent={
                <LanyardPull
                  pullProgress={pullProgress}
                  showLabel={f >= sec(17.60) && f < sec(21.61)}
                  highlight={highlightLanyard}
                />
              }
              style={{
                filter: dimProg > 0.1 ? `brightness(${interpolate(dimProg, [0, 1], [1, 0.85])})` : 'none',
              }}
            />
          </div>

          {/* Dotted Gesture Path Arrow */}
          {gestureOpacity > 0.05 && (
            <GesturePath
              x={435}
              startY={310}
              length={190}
              direction="down"
              progress={pullProgress}
              opacity={gestureOpacity}
            />
          )}

          {/* Touch Indicator dragging the Lanyard handle */}
          {touchVisible && touchEnter > 0.05 && (
            <TouchIndicator
              x={380}
              y={fingerY}
              press={pullProgress > 0.05 ? 0.7 : 0}
              opacity={touchEnter}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
