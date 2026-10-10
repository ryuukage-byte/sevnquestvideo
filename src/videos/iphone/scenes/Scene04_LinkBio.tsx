import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  TikTokBioMock,
  TouchIndicator,
  SevnQuestAppScreen,
} from '../components';

export const Scene04_LinkBio: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:12.09: Badge CARA 2 enters
  const badgeProg = prog(f, 12.00, 12.35, EASE);

  // 00:12.55: Text LEWAT LINK BIO enters
  const textProg = prog(f, 12.45, 12.75, EASE);

  // 00:13.29 -> 00:13.69: Camera focus on bio link
  const focusProg = prog(f, 13.25, 13.65, EASE_IO);
  const shellScale = interpolate(focusProg, [0, 1], [0.92, 1.05]);
  const shellY = interpolate(focusProg, [0, 1], [80, 20]);

  // 00:13.69: Link outline highlight
  const linkHighlight = f >= sec(13.69);

  // 00:14.20: Small arrow down
  const arrowProg = prog(f, 14.15, 14.45, EASE);

  // 00:14.80: Touch indicator taps link
  // Inside TikTokBioMock (760x1540): link is centered at approx x = 380, y = 560
  const touchEnter = prog(f, 14.50, 14.75, EASE);
  const touchPressProg = prog(f, 14.75, 15.05, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI);

  // 00:15.20: TikTok page slides out, SevnQuest landing page enters
  const pageTransition = prog(f, 15.15, 15.65, EASE_IO);

  // 00:16.00: Checkmark text "link di bio TikTok ✓"
  const checkProg = prog(f, 15.95, 16.25, EASE);

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
      <Sfx name="tap" at={sec(14.80)} />
      <Sfx name="pop" at={sec(12.09)} />
      <Sfx name="ding" at={sec(16.00)} />

      {/* Top Banner: CARA 2 — LEWAT LINK BIO */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 40,
          opacity: badgeProg,
          transform: `translateY(${interpolate(badgeProg, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(23, 28, 38, 0.88)',
            border: `1.5px solid ${C.gold}`,
            padding: '8px 24px',
            borderRadius: 22,
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
            CARA 2
          </span>
          <span style={{color: 'rgba(255,255,255,0.3)'}}>|</span>
          <span
            style={{
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 22,
              color: '#ffffff',
              opacity: textProg,
            }}
          >
            LEWAT LINK BIO
          </span>
        </div>

        {/* Checkmark confirmation at 00:16.00 */}
        {checkProg > 0.05 && (
          <div
            style={{
              opacity: checkProg,
              transform: `scale(${interpolate(checkProg, [0, 1], [0.8, 1])})`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(79, 174, 134, 0.2)',
              border: `1.5px solid ${C.matcha}`,
              padding: '4px 16px',
              borderRadius: 16,
              color: C.matcha,
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            <span>✓ link di bio TikTok</span>
          </div>
        )}
      </div>

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={shellScale} translateY={shellY}>
          {/* Layer 1: TikTok Profile Screen */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1 - pageTransition,
              transform: `translateX(${interpolate(pageTransition, [0, 1], [0, -100])}%)`,
              pointerEvents: pageTransition > 0.8 ? 'none' : 'auto',
            }}
          >
            <TikTokBioMock
              linkHighlight={linkHighlight}
              linkPress={touchPress}
            />

            {/* Small helper Arrow pointing down to link */}
            {arrowProg > 0.05 && pageTransition < 0.2 && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 480,
                  transform: 'translateX(-50%)',
                  opacity: arrowProg * (1 - prog(f, 14.8, 15.0, EASE)),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 800,
                    fontSize: 16,
                    color: C.gold,
                    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                  }}
                >
                  KLIK DISINI
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={C.gold}>
                  <path d="M12 21l-8-9h5V3h6v9h5z" />
                </svg>
              </div>
            )}
          </div>

          {/* Layer 2: SevnQuest Landing Page Entering */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: pageTransition,
              transform: `translateX(${interpolate(pageTransition, [0, 1], [100, 0])}%)`,
            }}
          >
            <SevnQuestAppScreen />
          </div>

          {/* Touch Indicator on Bio Link */}
          {f >= sec(14.45) && f <= sec(15.15) && (
            <TouchIndicator
              x={380}
              y={560}
              press={touchPress}
              opacity={touchEnter}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
