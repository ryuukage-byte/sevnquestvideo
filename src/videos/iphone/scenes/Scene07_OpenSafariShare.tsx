import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {
  IPhoneShell,
  SafariMock,
  ShareSheetMock,
  TouchIndicator,
  SevnQuestAppScreen,
} from '../components';

export const Scene07_OpenSafariShare: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:26.90: Caption top STEP 2 | TAMBAHKAN KE HOME SCREEN
  const stepProg = prog(f, 26.75, 27.15, EASE);

  // 00:27.50 -> 00:29.20: Camera zooms into bottom Safari toolbar
  // Toolbar fills 40-50% of the visual space (Zoom rule)
  const zoomProg = prog(f, 27.50, 28.60, EASE_IO);
  const shellScale = interpolate(zoomProg, [0, 1], [0.94, 1.45]);
  const shellY = interpolate(zoomProg, [0, 1], [20, -420]); // Pan down so bottom toolbar is prominently centered!

  // 00:29.20: Share button gets gold circle
  const shareHighlight = f >= sec(29.20) && f < sec(31.00);

  // 00:29.79 -> 00:30.45: Touch indicator moves & taps Share button
  // Center of Safari bottom toolbar: x = 380, y = 1465 inside shell
  const touchEnter = prog(f, 29.60, 29.85, EASE);
  const touchPressProg = prog(f, 30.15, 30.45, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI);

  // 00:30.75 -> 00:31.55: Share Sheet rises from bottom
  const sheetRiseProg = prog(f, 30.75, 31.55, EASE_IO);

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
      <Sfx name="tap" at={sec(30.45)} />
      <Sfx name="whoosh-soft" at={sec(30.75)} />

      {/* Top Banner: STEP 2 — TAMBAHKAN KE HOME SCREEN */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 40,
          opacity: stepProg,
          transform: `translateY(${interpolate(stepProg, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            background: 'rgba(23, 28, 38, 0.88)',
            border: `1.5px solid ${C.gold}`,
            padding: '8px 24px',
            borderRadius: 22,
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
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
            STEP 2
          </span>
          <span style={{color: 'rgba(255,255,255,0.3)'}}>|</span>
          <span
            style={{
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 22,
              color: '#ffffff',
            }}
          >
            TEKAN TOMBOL SHARE
          </span>
        </div>
      </div>

      {/* Main iPhone Frame */}
      <div style={{position: 'relative', zIndex: 20}}>
        <IPhoneShell scale={shellScale} translateY={shellY}>
          <SafariMock
            url="sevnquest.sevnsoul.site"
            shareHighlight={shareHighlight}
            sharePress={touchPress}
            style={{
              filter: sheetRiseProg > 0.1 ? `blur(${sheetRiseProg * 6}px) brightness(0.75)` : 'none',
              transition: 'filter 0.2s ease',
            }}
          >
            <SevnQuestAppScreen />
          </SafariMock>

          {/* Share Sheet rising up */}
          {sheetRiseProg > 0.01 && (
            <ShareSheetMock
              style={{
                transform: `translateY(${interpolate(sheetRiseProg, [0, 1], [100, 0])}%)`,
              }}
            />
          )}

          {/* Touch Indicator on Share button */}
          {f >= sec(29.60) && f <= sec(30.65) && (
            <TouchIndicator
              x={380}
              y={1475}
              press={touchPress}
              opacity={touchEnter}
            />
          )}
        </IPhoneShell>
      </div>
    </div>
  );
};
