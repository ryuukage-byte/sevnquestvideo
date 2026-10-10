import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  SafariMock,
  TouchIndicator,
  SevnQuestAppScreen,
} from '../components';

export const Scene03_EnterWebsite: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:06.95: Address bar glow
  const barGlow = f >= sec(6.95);

  // 00:07.44: Touch address bar
  const touchEnter = prog(f, 7.15, 7.40, EASE);
  const touchPress = Math.sin(prog(f, 7.35, 7.55, EASE_IO) * Math.PI);

  // Typing animation progression:
  // 00:07.85: "sevnquest"
  // 00:08.20: ".sevnsoul"
  // 00:08.75: ".site"
  // 00:09.20: "sevnquest.sevnsoul.site"
  const fullText = 'sevnquest.sevnsoul.site';
  let displayedUrl = '';
  if (f >= sec(9.20)) {
    displayedUrl = fullText;
  } else if (f >= sec(8.75)) {
    const chars = Math.round(interpolate(f, [sec(8.75), sec(9.20)], [18, 23], {extrapolateRight: 'clamp'}));
    displayedUrl = fullText.slice(0, chars);
  } else if (f >= sec(8.20)) {
    const chars = Math.round(interpolate(f, [sec(8.20), sec(8.75)], [9, 18], {extrapolateRight: 'clamp'}));
    displayedUrl = fullText.slice(0, chars);
  } else if (f >= sec(7.85)) {
    const chars = Math.round(interpolate(f, [sec(7.85), sec(8.20)], [0, 9], {extrapolateRight: 'clamp'}));
    displayedUrl = fullText.slice(0, chars);
  }

  // 00:09.50: Zoom-in to URL ~120% (Zoom rule for readability!)
  const zoomProg = prog(f, 9.45, 9.85, EASE_IO);
  const phoneScale = interpolate(zoomProg, [0, 1], [0.92, 1.15]);
  const phoneY = interpolate(zoomProg, [0, 1], [30, 220]); // Brings address bar closer to screen center

  // 00:10.15: Enter / Go pressed
  const enterPressProg = prog(f, 10.05, 10.25, EASE_IO);
  const enterPress = Math.sin(enterPressProg * Math.PI);

  // 00:10.45 -> 00:11.10: Loading progress line 0 -> 100%
  const loadProg = prog(f, 10.35, 10.95, EASE);

  // 00:10.85 -> 00:11.10: Landing page reveal
  const pageReveal = prog(f, 10.85, 11.10, EASE_IO);

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
      <Sfx name="tap" at={sec(7.44)} />
      <Sfx name="click" at={sec(10.15)} />

      {/* iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={phoneScale} translateY={phoneY}>
          <SafariMock
            url={displayedUrl}
            isStartPage={f < sec(7.85)}
            addressBarGlow={barGlow}
            urlScale={interpolate(zoomProg, [0, 1], [1, 1.12])}
            loadingProgress={loadProg}
          >
            {/* Landing page inside Safari */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: pageReveal,
                transform: `scale(${interpolate(pageReveal, [0, 1], [0.95, 1])})`,
              }}
            >
              <SevnQuestAppScreen />
            </div>
          </SafariMock>

          {/* Touch on Address Bar at 00:07.44 */}
          {f >= sec(7.15) && f <= sec(7.65) && (
            <TouchIndicator
              x={380}
              y={90}
              press={touchPress}
              opacity={touchEnter}
            />
          )}

          {/* Touch on Keyboard "Go" Button at bottom right at 00:10.15 */}
          {f >= sec(9.95) && f <= sec(10.35) && (
            <TouchIndicator
              x={640}
              y={1400}
              press={enterPress}
              opacity={1}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
