import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {Surface, Pill} from '../../../shared/components/ui';
import {SevnQuestAppIcon, TouchIndicator} from '../components';

export const Scene12_NoMoreSearching: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:53.70 -> 00:54.30: Left Card (SEBELUM) enters
  const leftEnter = prog(f, 53.70, 54.20, EASE);

  // 00:56.36: Red strike-through / NotEqual on Old Workflow
  const strikeProg = prog(f, 56.30, 56.55, EASE);

  // 00:56.55: Right Card (SEKARANG) enters
  const rightEnter = prog(f, 56.50, 57.00, EASE);

  // 00:57.50: Touch tap on SevnQuest icon
  const tapPressProg = prog(f, 57.45, 57.75, EASE_IO);
  const iconPress = Math.sin(tapPressProg * Math.PI);

  // 00:58.20: Big Headline "1 TAP."
  const head1Prog = prog(f, 58.15, 58.45, EASE);

  // 00:58.55: Line 2 "LANGSUNG BELAJAR."
  const head2Prog = prog(f, 58.50, 58.80, EASE);

  // 00:58.80 -> 00:59.08: Left card fades out
  const leftExitProg = prog(f, 58.70, 59.08, EASE);
  const leftOpacity = (1 - leftExitProg) * (strikeProg > 0.5 ? 0.35 : 1);

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
        padding: '0 40px',
      }}
    >
      <Sfx name="error-soft" at={sec(56.36)} />
      <Sfx name="tap" at={sec(57.50)} />
      <Sfx name="ding" at={sec(58.55)} />

      {/* Top Headline Section */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 30,
        }}
      >
        {head1Prog > 0.05 && (
          <div
            style={{
              opacity: head1Prog,
              transform: `scale(${interpolate(head1Prog, [0, 1], [0.85, 1])})`,
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 68,
              color: C.gold,
              textShadow: '0 0 30px rgba(240,190,82,0.6)',
              letterSpacing: -1,
              textAlign: 'center',
            }}
          >
            1 TAP.
          </div>
        )}

        {head2Prog > 0.05 && (
          <div
            style={{
              opacity: head2Prog,
              transform: `translateY(${interpolate(head2Prog, [0, 1], [15, 0])}px)`,
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 46,
              color: '#ffffff',
              letterSpacing: 0.5,
              textAlign: 'center',
            }}
          >
            LANGSUNG BELAJAR
          </div>
        )}
      </div>

      {/* Split Comparison Cards Layout */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
          width: '100%',
          marginTop: 80,
          zIndex: 20,
        }}
      >
        {/* LEFT CARD: SEBELUM (Old 3-step workflow) */}
        {leftEnter > 0.05 && (
          <div
            style={{
              opacity: leftEnter * leftOpacity,
              transform: `translateX(${interpolate(leftEnter, [0, 1], [-60, 0])}px)`,
              position: 'relative',
              flex: 1,
              maxWidth: 460,
            }}
          >
            <Surface
              tone="inset"
              radius={32}
              border="rgba(255,255,255,0.12)"
              style={{
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 18,
                position: 'relative',
              }}
            >
              <Pill color={C.textSecondary} size={16} filled>
                SEBELUM
              </Pill>

              {/* Step items */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: FONT.body,
                  fontWeight: 600,
                  fontSize: 22,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <span>🧭</span>
                  <span>Buka Safari</span>
                </div>
                <div style={{color: C.indigoSoft}}>↓</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <span>⌨️</span>
                  <span>Ketik URL</span>
                </div>
                <div style={{color: C.indigoSoft}}>↓</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <span>🌐</span>
                  <span>Cari Website</span>
                </div>
              </div>

              {/* Red Strike-through Overlay */}
              {strikeProg > 0.05 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(226, 85, 91, 0.18)',
                    border: `2px solid ${C.hanko}`,
                  }}
                >
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    <line
                      x1="15"
                      y1="15"
                      x2="85"
                      y2="85"
                      stroke={C.hanko}
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <line
                      x1="85"
                      y1="15"
                      x2="15"
                      y2="85"
                      stroke={C.hanko}
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </Surface>
          </div>
        )}

        {/* RIGHT CARD: SEKARANG (1 Tap Icon -> Belajar) */}
        {rightEnter > 0.05 && (
          <div
            style={{
              opacity: rightEnter,
              transform: `translateX(${interpolate(rightEnter, [0, 1], [60, 0])}px)`,
              flex: 1,
              maxWidth: 460,
              position: 'relative',
            }}
          >
            <Surface
              tone="elevated"
              radius={32}
              border={`2px solid ${C.gold}`}
              style={{
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 28px rgba(240,190,82,0.25)',
              }}
            >
              <Pill color={C.gold} size={16} filled>
                SEKARANG ✨
              </Pill>

              {/* SevnQuest App Icon with tap effect */}
              <div style={{position: 'relative', marginTop: 8}}>
                <SevnQuestAppIcon
                  size={110}
                  press={iconPress}
                  highlight={true}
                  showLabel={false}
                />

                {/* Touch indicator on icon */}
                {f >= sec(57.30) && f <= sec(58.00) && (
                  <TouchIndicator
                    x={55}
                    y={55}
                    press={iconPress}
                    opacity={1}
                  />
                )}
              </div>

              <div style={{color: C.gold, fontSize: 24, fontWeight: 900}}>↓</div>

              <div
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 900,
                  fontSize: 26,
                  color: '#ffffff',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                LANGSUNG
                <br />
                BELAJAR 🇯🇵
              </div>
            </Surface>
          </div>
        )}
      </div>
    </div>
  );
};
