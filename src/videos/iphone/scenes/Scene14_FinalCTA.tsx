import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {PhysicalButton} from '../../../shared/components/ui';
import {
  IPhoneShell,
  HomeScreenMock,
} from '../components';

export const Scene14_FinalCTA: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 01:04.30: Phone pull-back into background/center
  const phoneEnter = prog(f, 63.96, 64.50, EASE_IO);
  const phoneScale = interpolate(phoneEnter, [0, 1], [0.8, 0.72]);
  const phoneY = interpolate(phoneEnter, [0, 1], [120, 100]);

  // 01:04.70: LogoMark enters top-center
  const logoProg = prog(f, 64.65, 65.00, EASE);

  // 01:05.05 -> 01:05.60: Text transforms from "PENGGUNA iPHONE?" to "PASANG SEVNQUEST DI HOME SCREEN"
  const text1Prog = prog(f, 65.00, 65.30, EASE);
  const text2Prog = prog(f, 65.55, 65.90, EASE);

  // 01:06.21: Step summary badge
  const stepSummaryProg = prog(f, 66.15, 66.50, EASE);

  // 01:06.54: PhysicalButton tone="gold" enters: "COBA SEKARANG →"
  const btnProg = prog(f, 66.50, 66.90, EASE);

  // 01:07.10: Button micro-bounce
  const btnBounceProg = prog(f, 67.05, 67.35, EASE_IO);
  const btnBounceScale = 1 + Math.sin(btnBounceProg * Math.PI) * 0.05;

  // 01:07.45: Domain "sevnquest.sevnsoul.site"
  const domainProg = prog(f, 67.40, 67.75, EASE);

  // 01:07.80: App icon micro-bounce on the phone
  const iconBounceProg = prog(f, 67.75, 68.05, EASE_IO);
  const iconBounce = Math.sin(iconBounceProg * Math.PI) * 0.15;

  // 01:08.20: Gold shimmer passes across button
  const shimmerProg = prog(f, 68.15, 68.75, EASE);

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
        justifyContent: 'space-between',
        padding: '120px 40px 140px 40px',
        overflow: 'hidden',
      }}
    >
      <Sfx name="pop" at={sec(64.70)} />
      <Sfx name="ding" at={sec(66.54)} />
      <Sfx name="sparkle" at={sec(68.20)} />

      {/* Top Brand Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 40,
        }}
      >
        {/* Logo and Wordmark */}
        <div
          style={{
            opacity: logoProg,
            transform: `scale(${interpolate(logoProg, [0, 1], [0.8, 1])})`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <LogoMark size={64} />
          <Wordmark size={48} />
        </div>

        {/* Dynamic Question / Headline */}
        <div
          style={{
            minHeight: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {f < sec(65.55) ? (
            <div
              style={{
                opacity: text1Prog,
                transform: `translateY(${interpolate(text1Prog, [0, 1], [-12, 0])}px)`,
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 48,
                color: '#ffffff',
                letterSpacing: 0.5,
              }}
            >
              PENGGUNA iPHONE? 📱
            </div>
          ) : (
            <div
              style={{
                opacity: text2Prog,
                transform: `scale(${interpolate(text2Prog, [0, 1], [0.9, 1])})`,
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 44,
                lineHeight: 1.15,
                color: '#ffffff',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              }}
            >
              PASANG SEVNQUEST
              <br />
              <span
                style={{
                  color: C.gold,
                  textShadow: '0 0 24px rgba(240,190,82,0.5)',
                }}
              >
                DI HOME SCREEN
              </span>
            </div>
          )}
        </div>

        {/* Step Summary Flow */}
        <div
          style={{
            opacity: stepSummaryProg,
            transform: `translateY(${interpolate(stepSummaryProg, [0, 1], [15, 0])}px)`,
            background: 'rgba(23, 28, 38, 0.85)',
            border: '1.5px solid rgba(240, 190, 82, 0.35)',
            borderRadius: 22,
            padding: '10px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: FONT.body,
            fontWeight: 700,
            fontSize: 16,
            color: 'rgba(255,255,255,0.85)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          }}
        >
          <span>Safari</span>
          <span style={{color: C.gold}}>→</span>
          <span>Share</span>
          <span style={{color: C.gold}}>→</span>
          <span style={{color: C.gold}}>Add to Home Screen</span>
          <span style={{color: C.gold}}>→</span>
          <span>Add</span>
        </div>
      </div>

      {/* Background/Center Floating iPhone */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          opacity: interpolate(phoneEnter, [0, 1], [0, 0.88]),
        }}
      >
        <IPhoneShell scale={phoneScale} translateY={phoneY}>
          <HomeScreenMock
            showSevnQuest={true}
            sevnQuestScale={1 + iconBounce}
            sevnQuestHighlight={true}
          />
        </IPhoneShell>
      </div>

      {/* Bottom CTA Button & Domain */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 40,
          width: '100%',
          paddingBottom: 20,
        }}
      >
        {/* Physical Button Tone="gold" */}
        <div
          style={{
            opacity: btnProg,
            transform: `scale(${interpolate(btnProg, [0, 1], [0.8, 1]) * btnBounceScale})`,
            position: 'relative',
          }}
        >
          <PhysicalButton
            label="COBA SEKARANG →"
            tone="gold"
            w={480}
            h={84}
            fontSize={32}
            press={0}
          />

          {/* Shimmer light sweep */}
          {shimmerProg > 0.05 && shimmerProg < 0.95 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 10,
                left: `${interpolate(shimmerProg, [0, 1], [-30, 120])}%`,
                width: 70,
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                transform: 'skewX(-25deg)',
                pointerEvents: 'none',
                borderRadius: 26,
              }}
            />
          )}
        </div>

        {/* Domain name */}
        <div
          style={{
            opacity: domainProg,
            transform: `translateY(${interpolate(domainProg, [0, 1], [10, 0])}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 22,
              color: C.indigoSoft,
              letterSpacing: 1,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            sevnquest.sevnsoul.site
          </span>
        </div>
      </div>
    </div>
  );
};
