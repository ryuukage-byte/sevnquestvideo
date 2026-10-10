import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  TouchIndicator,
  SevnQuestAppScreen,
} from '../components';

export const Scene06_SelectLearn: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:23.20: Other items dim to 45%
  const dimNonLearn = f >= sec(23.20);

  // 00:23.75: Highlight LEARN with gold outline & subtle pulse
  const highlightLearn = f >= sec(23.75);

  // 00:24.20: Touch indicator moves to Learn tab at bottom
  // In SevnQuestAppScreen bottom bar, Learn tab is approx x = 110, y = 1450
  const touchEnter = prog(f, 24.10, 24.40, EASE);
  const touchPressProg = prog(f, 24.45, 24.75, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI);

  // 00:25.00: Page transition
  const pageTransition = prog(f, 24.95, 25.35, EASE_IO);

  // 00:25.49: Small check "✓ Learn"
  const checkProg = prog(f, 25.40, 25.65, EASE);

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
      <Sfx name="click" at={sec(24.55)} />
      <Sfx name="ding" at={sec(25.49)} />

      {/* Top Banner Indicator */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 40,
        }}
      >
        {checkProg > 0.05 ? (
          <div
            style={{
              opacity: checkProg,
              transform: `scale(${interpolate(checkProg, [0, 1], [0.85, 1])})`,
              background: 'rgba(79, 174, 134, 0.22)',
              border: `1.5px solid ${C.matcha}`,
              borderRadius: 20,
              padding: '6px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 20,
                color: C.matcha,
              }}
            >
              ✓ Learn
            </span>
          </div>
        ) : (
          <div
            style={{
              opacity: prog(f, 22.8, 23.2, EASE),
              background: 'rgba(23, 28, 38, 0.88)',
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
            PILIH LEARN 📖
          </div>
        )}
      </div>

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={0.96} translateY={30}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1,
              transform: `scale(${interpolate(pageTransition, [0, 1], [1, 1.02])})`,
            }}
          >
            <SevnQuestAppScreen
              activeTab="learn"
              highlightLearn={highlightLearn}
              learnPress={touchPress}
              dimNonLearn={dimNonLearn}
            />
          </div>

          {/* Touch Indicator on Learn tab */}
          {f >= sec(24.1) && f <= sec(24.9) && (
            <TouchIndicator
              x={120}
              y={1450}
              press={touchPress}
              opacity={touchEnter}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
