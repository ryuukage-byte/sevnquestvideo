import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, NotEqual, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const Scene08_SideBySideSummary: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Part 1: Split Screen Side-by-Side (f = 0 to 83)
  const isSummaryActive = f < 83;
  const pCardLeft = pop(f, fps, 0, SPRING);
  const pCardRight = pop(f, fps, 0, SPRING);

  // Card Left lights up at f = 5, Card Right lights up at f = 35
  const isLeftLit = f >= 5 && f < 35;
  const isRightLit = f >= 35 && f < 83;

  // NotEqual stamp in center at f = 61
  const pNotEqual = pop(f, fps, 61, BOUNCY);

  // Part 2: Headline "KANJI ITU PENTING." (f = 83 to 135)
  const isHeadline = f >= 83 && f < 139;
  const pHead = pop(f, fps, 83, BOUNCY);
  const headPush = 1 + prog(f, 83, 50) * 0.08;
  const headFadeOut = f >= 129 ? 1 - prog(f, 129, 10) : 1;

  // Part 3: Branch Diagram (f = 139 to 266)
  const isDiagram = f >= 139;
  const pDiagTop = pop(f, fps, 139, BOUNCY);
  const branchDraw = prog(f, 150, 30);
  const pDiagLeft = pop(f, fps, 165, SPRING);
  const pDiagRight = pop(f, fps, 175, SPRING);
  const pDiagPill = pop(f, fps, 195, BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="chime" at={5} volume={0.6} />
          <Sfx name="chime" at={35} volume={0.6} />
          <Sfx name="impact" at={61} volume={0.65} />
          <Sfx name="impact" at={83} volume={0.8} />
          <Sfx name="sparkle" at={139} volume={0.65} />
          <Sfx name="ding" at={165} volume={0.6} />
        </>
      )}

      {/* Header Pill */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pill color={C.gold} size={26}>
          {isDiagram ? 'STRUKTUR UTAMA' : 'KESIMPULAN VISUAL'}
        </Pill>
      </div>

      {/* ================= PART 1: SIDE-BY-SIDE SUMMARY ================= */}
      {isSummaryActive && (
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: 50,
            right: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 28,
              width: '100%',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Left Card: 会う */}
            <div
              style={{
                flex: 1,
                maxWidth: 460,
                opacity: pCardLeft,
                transform: `scale(${isLeftLit ? 1.05 : 1})`,
                transition: 'transform 0.2s ease',
              }}
            >
              <Surface
                tone="elevated"
                radius={44}
                border={isLeftLit ? C.gold : C.borderPrimary}
                style={{
                  padding: '50px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: isLeftLit
                    ? '0 20px 50px rgba(240,190,82,0.35)'
                    : '0 16px 36px rgba(0,0,0,0.6)',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 120,
                    fontWeight: 900,
                    color: isLeftLit ? C.gold : C.text,
                    lineHeight: 1,
                    textShadow: isLeftLit ? '0 0 30px rgba(240,190,82,0.6)' : undefined,
                  }}
                >
                  会う
                </span>
                <div style={{marginTop: 32, display: 'flex', alignItems: 'center', gap: 10}}>
                  <ArrowRight size={24} color={C.gold} />
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 40,
                      fontWeight: 800,
                      color: C.text,
                    }}
                  >
                    ketemu
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 24,
                    color: C.textSecondary,
                    marginTop: 8,
                  }}
                >
                  (seseorang)
                </span>
              </Surface>
            </div>

            {/* Right Card: 合う */}
            <div
              style={{
                flex: 1,
                maxWidth: 460,
                opacity: pCardRight,
                transform: `scale(${isRightLit ? 1.05 : 1})`,
                transition: 'transform 0.2s ease',
              }}
            >
              <Surface
                tone="elevated"
                radius={44}
                border={isRightLit ? C.matcha : C.borderPrimary}
                style={{
                  padding: '50px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: isRightLit
                    ? '0 20px 50px rgba(79,174,134,0.35)'
                    : '0 16px 36px rgba(0,0,0,0.6)',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 120,
                    fontWeight: 900,
                    color: isRightLit ? C.matcha : C.text,
                    lineHeight: 1,
                    textShadow: isRightLit ? '0 0 30px rgba(79,174,134,0.6)' : undefined,
                  }}
                >
                  合う
                </span>
                <div style={{marginTop: 32, display: 'flex', alignItems: 'center', gap: 10}}>
                  <ArrowRight size={24} color={C.matcha} />
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 40,
                      fontWeight: 800,
                      color: C.text,
                    }}
                  >
                    cocok
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 24,
                    color: C.textSecondary,
                    marginTop: 8,
                  }}
                >
                  (pas / selaras)
                </span>
              </Surface>
            </div>
          </div>

          {/* Not Equal Symbol / Stamp in between at f >= 61 */}
          {f >= 61 && (
            <div
              style={{
                marginTop: 60,
                opacity: pNotEqual,
                transform: `scale(${pNotEqual})`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.hanko}
                style={{
                  padding: '24px 50px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  boxShadow: '0 0 35px rgba(226,85,91,0.35)',
                }}
              >
                <span style={{fontFamily: FONT.jp, fontSize: 50, fontWeight: 900, color: C.gold}}>
                  会う
                </span>
                <NotEqual size={44} color={C.text} slash={C.hanko} p={prog(f, 61, 15)} />
                <span style={{fontFamily: FONT.jp, fontSize: 50, fontWeight: 900, color: C.matcha}}>
                  合う
                </span>
              </Surface>
            </div>
          )}
        </div>
      )}

      {/* ================= PART 2: HEADLINE KANJI ITU PENTING ================= */}
      {isHeadline && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: headFadeOut,
            transform: `scale(${pHead * headPush})`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 60px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 88,
                fontWeight: 900,
                color: C.text,
                lineHeight: 1.15,
                letterSpacing: 2,
                textShadow: '0 8px 30px rgba(0,0,0,0.85)',
              }}
            >
              KANJI ITU
            </span>
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 108,
                fontWeight: 900,
                letterSpacing: 3,
                background: `linear-gradient(180deg, ${C.goldSoft} 0%, ${C.gold} 60%, #b88a1f 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 6px 30px rgba(240,190,82,0.6))',
              }}
            >
              PENTING.
            </span>
          </div>
        </div>
      )}

      {/* ================= PART 3: BRANCH DIAGRAM ================= */}
      {isDiagram && (
        <div
          style={{
            position: 'absolute',
            top: 340,
            left: 60,
            right: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Top Node: あう (1 Pengucapan) */}
          <div style={{opacity: pDiagTop, transform: `scale(${pDiagTop})`}}>
            <Surface
              tone="elevated"
              radius={40}
              border={C.gold}
              style={{
                padding: '24px 60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 16px 40px rgba(240,190,82,0.3)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 88,
                  fontWeight: 900,
                  color: C.text,
                  lineHeight: 1,
                }}
              >
                あう
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 22,
                  fontWeight: 700,
                  color: C.gold,
                  marginTop: 8,
                }}
              >
                1 PENGUCAPAN
              </span>
            </Surface>
          </div>

          {/* Branching SVG Lines */}
          <svg width={700} height={200} viewBox="0 0 700 200" style={{marginTop: 10}}>
            {/* Left Branch ↙ */}
            <path
              d="M 350 10 C 350 80 180 100 180 190"
              fill="none"
              stroke={C.gold}
              strokeWidth={4}
              strokeDasharray={280}
              strokeDashoffset={280 * (1 - branchDraw)}
              strokeLinecap="round"
            />
            {/* Right Branch ↘ */}
            <path
              d="M 350 10 C 350 80 520 100 520 190"
              fill="none"
              stroke={C.matcha}
              strokeWidth={4}
              strokeDasharray={280}
              strokeDashoffset={280 * (1 - branchDraw)}
              strokeLinecap="round"
            />
          </svg>

          {/* Two Target Kanji Nodes */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 10,
              gap: 20,
            }}
          >
            {/* Left Kanji Node: 会う */}
            <div
              style={{
                flex: 1,
                opacity: pDiagLeft,
                transform: `scale(${pDiagLeft})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={C.gold}
                style={{padding: '30px 40px', width: '100%', textAlign: 'center'}}
              >
                <div style={{fontFamily: FONT.jp, fontSize: 80, fontWeight: 900, color: C.gold}}>
                  会う
                </div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 700,
                    color: C.text,
                    marginTop: 10,
                  }}
                >
                  Bertemu orang
                </div>
              </Surface>
            </div>

            {/* Right Kanji Node: 合う */}
            <div
              style={{
                flex: 1,
                opacity: pDiagRight,
                transform: `scale(${pDiagRight})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Surface
                tone="card"
                radius={36}
                border={C.matcha}
                style={{padding: '30px 40px', width: '100%', textAlign: 'center'}}
              >
                <div style={{fontFamily: FONT.jp, fontSize: 80, fontWeight: 900, color: C.matcha}}>
                  合う
                </div>
                <div
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 700,
                    color: C.text,
                    marginTop: 10,
                  }}
                >
                  Cocok / Pas
                </div>
              </Surface>
            </div>
          </div>

          {/* Bottom Reinforcement Pill */}
          {f >= 195 && (
            <div
              style={{
                marginTop: 48,
                opacity: pDiagPill,
                transform: `scale(${pDiagPill})`,
              }}
            >
              <Pill color={C.indigoSoft} size={28} filled>
                1 Pengucapan → 2 Kanji → 2 Makna
              </Pill>
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
