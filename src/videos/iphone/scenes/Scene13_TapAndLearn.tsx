import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {EASE, EASE_IO} from '../../../shared/anim';
import {C, FONT, W, H} from '../../../shared/theme';
import {sec, prog} from '../timing';
import {Sfx} from '../../../shared/components/Sfx';
import {Surface} from '../../../shared/components/ui';
import {
  IPhoneShell,
  HomeScreenMock,
  TouchIndicator,
} from '../components';

export const Scene13_TapAndLearn: React.FC<{globalFrame?: number}> = ({
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const f = globalFrame !== undefined ? globalFrame : localFrame;

  // 00:59.60: Focus on SevnQuest icon (dim others)
  const focusProg = prog(f, 59.45, 59.85, EASE);
  const dimOthers = interpolate(focusProg, [0, 1], [1, 0.2]);

  // 00:59.98 -> 01:00.40: Touch indicator enters & taps icon
  // In HomeScreenMock, icon is at x = 570, y = 260 inside shell
  const touchEnter = prog(f, 59.85, 60.15, EASE);
  const touchPressProg = prog(f, 60.30, 60.55, EASE_IO);
  const touchPress = Math.sin(touchPressProg * Math.PI);

  // 01:00.70: Zoom-through transition!
  const zoomThroughProg = prog(f, 60.60, 61.20, EASE_IO);
  const shellScale = interpolate(zoomThroughProg, [0, 1], [0.95, 2.2]);
  const shellOpacity = interpolate(zoomThroughProg, [0, 0.7, 1], [1, 0.4, 0]);

  // 01:01.47 -> 01:03.00: Floating UI cards enter fullscreen!
  // Card 1: Kotoba (食べる)
  const card1Prog = prog(f, 61.35, 61.80, EASE);
  // Card 2: Kanji (食)
  const card2Prog = prog(f, 61.90, 62.30, EASE);
  // Card 3: Streak / Progress card
  const card3Prog = prog(f, 62.45, 62.80, EASE);

  // 01:03.55: Headline "LANJUT BELAJAR 🇯🇵"
  const headProg = prog(f, 63.45, 63.80, EASE);

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
      <Sfx name="tap" at={sec(60.40)} />
      <Sfx name="whoosh" at={sec(60.70)} />
      <Sfx name="pop" at={sec(61.80)} />
      <Sfx name="ding" at={sec(63.55)} />

      {/* Layer 1: iPhone Frame (Zooms through at 01:00.70) */}
      {shellOpacity > 0.01 && (
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            opacity: shellOpacity,
            transformOrigin: '70% 30%', // Zooms in from the SevnQuest icon location!
          }}
        >
          <IPhoneShell scale={shellScale} translateY={30}>
            <HomeScreenMock
              showSevnQuest={true}
              sevnQuestHighlight={focusProg > 0.5}
              sevnQuestPress={touchPress}
              dimOthers={dimOthers}
            />

            {/* Touch Indicator */}
            {f >= sec(59.90) && f <= sec(60.70) && (
              <TouchIndicator
                x={570}
                y={260}
                press={touchPress}
                opacity={touchEnter}
              />
            )}
          </IPhoneShell>
        </div>
      )}

      {/* Layer 2: Fullscreen Floating Educational Cards (Visible after zoom-through) */}
      {zoomThroughProg > 0.4 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 50px',
            gap: 24,
            zIndex: 30,
            opacity: interpolate(zoomThroughProg, [0.4, 0.9], [0, 1]),
          }}
        >
          {/* Top Headline: LANJUT BELAJAR 🇯🇵 */}
          <div
            style={{
              opacity: headProg,
              transform: `scale(${interpolate(headProg, [0, 1], [0.85, 1])})`,
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 54,
              color: C.gold,
              textShadow: '0 0 28px rgba(240,190,82,0.5)',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            LANJUT BELAJAR 🇯🇵
          </div>

          {/* Card 1: Kotoba Card */}
          {card1Prog > 0.01 && (
            <div
              style={{
                width: '100%',
                maxWidth: 680,
                opacity: card1Prog,
                transform: `translateY(${interpolate(card1Prog, [0, 1], [40, 0])}px)`,
              }}
            >
              <Surface
                tone="card"
                radius={28}
                border="rgba(240, 190, 82, 0.4)"
                style={{
                  padding: '28px 36px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 64,
                      fontWeight: 900,
                      color: C.gold,
                      lineHeight: 1,
                    }}
                  >
                    食べる
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#ffffff',
                      marginTop: 6,
                    }}
                  >
                    たべる · makan
                  </div>
                </div>
                <div
                  style={{
                    background: 'rgba(240, 190, 82, 0.15)',
                    border: `1.5px solid ${C.gold}`,
                    borderRadius: 18,
                    padding: '8px 18px',
                    fontFamily: FONT.mono,
                    fontWeight: 800,
                    fontSize: 18,
                    color: C.gold,
                  }}
                >
                  N5 KOTOBA
                </div>
              </Surface>
            </div>
          )}

          {/* Card 2: Kanji Card */}
          {card2Prog > 0.01 && (
            <div
              style={{
                width: '100%',
                maxWidth: 680,
                opacity: card2Prog,
                transform: `translateY(${interpolate(card2Prog, [0, 1], [40, 0])}px)`,
              }}
            >
              <Surface
                tone="elevated"
                radius={28}
                border="rgba(111,147,207,0.4)"
                style={{
                  padding: '24px 36px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                  <div
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 58,
                      fontWeight: 900,
                      color: '#ffffff',
                    }}
                  >
                    食
                  </div>
                  <div>
                    <div style={{fontFamily: FONT.body, fontSize: 18, color: C.indigoSoft}}>
                      KUN: <span style={{color: '#fff', fontWeight: 700}}>た</span>
                    </div>
                    <div style={{fontFamily: FONT.body, fontSize: 18, color: C.indigoSoft}}>
                      ON: <span style={{color: C.gold, fontWeight: 700}}>しょく</span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: 'rgba(79, 174, 134, 0.2)',
                    border: `1.5px solid ${C.matcha}`,
                    borderRadius: 18,
                    padding: '8px 18px',
                    fontFamily: FONT.mono,
                    fontWeight: 800,
                    fontSize: 16,
                    color: C.matcha,
                  }}
                >
                  KANJI MASTERED ✓
                </div>
              </Surface>
            </div>
          )}

          {/* Card 3: Daily Streak */}
          {card3Prog > 0.01 && (
            <div
              style={{
                width: '100%',
                maxWidth: 680,
                opacity: card3Prog,
                transform: `translateY(${interpolate(card3Prog, [0, 1], [40, 0])}px)`,
              }}
            >
              <Surface
                tone="inset"
                radius={24}
                border="rgba(255,255,255,0.12)"
                style={{
                  padding: '18px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <span style={{fontSize: 26}}>🔥</span>
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontWeight: 800,
                      fontSize: 20,
                      color: '#ffffff',
                    }}
                  >
                    Streak 7 Hari
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontWeight: 700,
                    fontSize: 18,
                    color: C.gold,
                  }}
                >
                  Level 12 (N5)
                </span>
              </Surface>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
