import React from 'react';
import {useCurrentFrame, interpolate, spring} from 'remotion';
import {EASE, EASE_IO, BOUNCY} from '../../../shared/anim';
import {C, FONT, W, H, FPS} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {Confetti} from '../../../shared/components/Confetti';
import {
  IPhoneShell,
  AddToHomeScreenMock,
  HomeScreenMock,
  TouchIndicator,
} from '../components';

export const Scene10_TapAdd: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:43.90: Add button starts to glow
  const addHighlight = f >= sec(43.90) && f < sec(46.00);

  // 00:44.39 -> 00:45.81: Touch indicator moves towards Add button
  // Add button is top right: x = 680, y = 90 inside shell
  const touchEnter = prog(f, 44.30, 44.75, EASE);
  const touchPressProg = prog(f, 45.65, 45.95, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI);

  // 00:45.96: Quick zoom-out transition to Home Screen
  const zoomOutProg = prog(f, 45.90, 46.30, EASE_IO);
  const shellScale = interpolate(zoomOutProg, [0, 1], [1.2, 0.94]);
  const shellY = interpolate(zoomOutProg, [0, 1], [60, 20]);

  // 00:46.55: SevnQuest app icon spawns using BOUNCY spring!
  const iconSpring = spring({
    frame: Math.max(0, f - sec(46.55)),
    fps: FPS,
    config: BOUNCY,
  });
  const sevnQuestScale = f >= sec(46.55) ? iconSpring : 0;

  // 00:47.00: Confetti / sparkle
  const showConfetti = f >= sec(46.85);

  // 00:47.20: Badge "SELESAI ✓"
  const doneBadgeProg = prog(f, 47.15, 47.45, EASE);

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
      <Sfx name="click" at={sec(45.81)} />
      <Sfx name="success" at={sec(47.62)} />

      {/* Confetti Explosion on successful add */}
      {showConfetti && (
        <div style={{position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none'}}>
          <Confetti
            x={540}
            y={800}
            t={prog(f, 46.85, 47.60, EASE)}
            n={32}
            spread={600}
          />
        </div>
      )}

      {/* Top Badge: SELESAI ✓ */}
      {doneBadgeProg > 0.05 && (
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 60,
            opacity: doneBadgeProg,
            transform: `scale(${interpolate(doneBadgeProg, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              background: 'rgba(79, 174, 134, 0.28)',
              border: `2px solid ${C.matcha}`,
              borderRadius: 24,
              padding: '10px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 24px rgba(79,174,134,0.4)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 26,
                color: C.matcha,
                letterSpacing: 1,
              }}
            >
              SELESAI ✓
            </span>
          </div>
        </div>
      )}

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={shellScale} translateY={shellY}>
          {/* Layer 1: Home Screen with Spawning SevnQuest App Icon */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: zoomOutProg,
            }}
          >
            <HomeScreenMock
              showSevnQuest={f >= sec(46.55)}
              sevnQuestScale={sevnQuestScale}
              sevnQuestHighlight={f >= sec(46.70)}
            />
          </div>

          {/* Layer 2: AddToHomeScreenMock (Fades out during zoom-out) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1 - zoomOutProg,
              pointerEvents: zoomOutProg > 0.8 ? 'none' : 'auto',
            }}
          >
            <AddToHomeScreenMock
              addHighlight={addHighlight}
              addPress={touchPress}
            />
          </div>

          {/* Touch Indicator on Add button (top-right) */}
          {f >= sec(44.30) && f <= sec(46.00) && (
            <TouchIndicator
              x={680}
              y={90}
              press={touchPress}
              opacity={touchEnter}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
