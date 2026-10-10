import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const Scene07_ExamplesAu: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Part 1: 気が合う (f = 0 to 132)
  const isPart1 = f < 135;
  const pCard1 = pop(f, fps, 0, SPRING);
  const pTrans1 = pop(f, fps, 72, SPRING);

  // Synchronized waveform for 気が合う
  const waveSync = Math.sin(f / 4) * 14;

  // Transition to Part 2: crossfade around f = 132 - 142
  const pCross = prog(f, 132, 10);

  // Part 2: サイズが合う (f = 142 to 180)
  const pCard2 = pop(f, fps, 142, SPRING);
  const pSlotSnap = pop(f, fps, 155, BOUNCY);
  const pTrans2 = pop(f, fps, 165, BOUNCY);

  // Collapse to two main cards at f >= 180
  const pCollapse = prog(f, 180, 17);
  const collapseX = pCollapse * 260;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={0} volume={0.6} />
          <Sfx name="chime" at={30} volume={0.55} />
          <Sfx name="tick" at={72} volume={0.5} />
          <Sfx name="pop" at={142} volume={0.6} />
          <Sfx name="click" at={155} volume={0.7} />
          <Sfx name="ding" at={165} volume={0.65} />
          <Sfx name="whoosh" at={180} volume={0.5} />
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
        <Pill color={C.matcha} size={26}>
          {isPart1 ? 'CONTOH 1 · 気が合う' : 'CONTOH 2 · サイズが合う'}
        </Pill>
      </div>

      {/* ================= PART 1: 気が合う ================= */}
      {isPart1 && (
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: 80,
            right: 80,
            opacity: pCard1 * (1 - pCross),
            transform: `translateY(${(1 - pCard1) * 200}px)`,
          }}
        >
          <Surface
            tone="card"
            radius={48}
            border={C.borderPrimary}
            style={{
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >
            {/* Sentence: 気が合う。 */}
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 82,
                fontWeight: 900,
                color: C.text,
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
              }}
            >
              <ruby style={{rubyPosition: 'over'}}>
                気
                <rt style={{fontFamily: FONT.jp, fontSize: 28, color: C.indigoSoft}}>き</rt>
              </ruby>
              <span style={{color: C.textSecondary}}>が</span>
              <span
                style={{
                  background: 'rgba(79,174,134,0.2)',
                  padding: '6px 24px',
                  borderRadius: 20,
                  border: `2px solid ${C.matcha}`,
                  boxShadow: '0 0 28px rgba(79,174,134,0.45)',
                  color: C.matcha,
                }}
              >
                合う。
              </span>
            </div>

            {/* Synchronized Energy Reaction (2 Avatars + Synchronized Waveform) */}
            <div
              style={{
                marginTop: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 40,
                width: '100%',
              }}
            >
              {/* Left Avatar */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  border: `3px solid ${C.matcha}`,
                  boxShadow: '0 0 24px rgba(79,174,134,0.4)',
                  overflow: 'hidden',
                  background: '#19222c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Img
                  src={staticFile('avatars/male/tier-3.png')}
                  style={{width: 125, height: 125, objectFit: 'contain'}}
                />
              </div>

              {/* Synchronized Sine Waveform SVG */}
              <svg width={200} height={80} viewBox="0 0 200 80">
                <path
                  d={`M 10 40 Q 50 ${40 + waveSync} 100 40 T 190 40`}
                  fill="none"
                  stroke={C.matcha}
                  strokeWidth={4}
                  strokeLinecap="round"
                  style={{filter: 'drop-shadow(0 0 10px #4fae86)'}}
                />
                <circle cx={100} cy={40} r={8} fill={C.gold} />
              </svg>

              {/* Right Avatar */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  border: `3px solid ${C.matcha}`,
                  boxShadow: '0 0 24px rgba(79,174,134,0.4)',
                  overflow: 'hidden',
                  background: '#19222c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Img
                  src={staticFile('avatars/male/tier-4.png')}
                  style={{width: 125, height: 125, objectFit: 'contain'}}
                />
              </div>
            </div>
          </Surface>

          {/* Translation: Cocok / nyambung dengan seseorang */}
          {f >= 72 && (
            <div
              style={{
                marginTop: 36,
                opacity: pTrans1,
                transform: `translateY(${(1 - pTrans1) * 30}px)`,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.matcha}
                style={{
                  padding: '30px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 44,
                    fontWeight: 800,
                    color: C.text,
                    textAlign: 'center',
                  }}
                >
                  <span style={{color: C.gold, textShadow: '0 0 20px rgba(240,190,82,0.4)'}}>
                    Cocok / nyambung
                  </span>{' '}
                  dengan seseorang
                </span>
              </Surface>
            </div>
          )}
        </div>
      )}

      {/* ================= PART 2: サイズが合う ================= */}
      {!isPart1 && (
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: 80,
            right: 80,
            opacity: pCard2 * (1 - pCollapse),
            transform: `translateY(${(1 - pCard2) * 200}px)`,
          }}
        >
          <Surface
            tone="card"
            radius={48}
            border={C.borderPrimary}
            style={{
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >
            {/* Sentence: サイズが合う。 */}
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 82,
                fontWeight: 900,
                color: C.text,
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
              }}
            >
              <span>サイズ</span>
              <span style={{color: C.textSecondary}}>が</span>
              <span
                style={{
                  background: 'rgba(79,174,134,0.2)',
                  padding: '6px 24px',
                  borderRadius: 20,
                  border: `2px solid ${C.matcha}`,
                  boxShadow: '0 0 28px rgba(79,174,134,0.45)',
                  color: C.matcha,
                }}
              >
                合う。
              </span>
            </div>

            {/* Visual: Box fitting into matching slot */}
            <div
              style={{
                marginTop: 48,
                position: 'relative',
                width: 320,
                height: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Slot Frame */}
              <div
                style={{
                  position: 'absolute',
                  width: 240,
                  height: 120,
                  borderRadius: 24,
                  border: `3px dashed ${pSlotSnap > 0.5 ? C.matcha : C.thread}`,
                  background: 'rgba(0,0,0,0.3)',
                  boxShadow:
                    pSlotSnap > 0.5 ? '0 0 30px rgba(79,174,134,0.4), inset 0 0 20px rgba(79,174,134,0.2)' : 'none',
                }}
              />
              {/* Perfect fit block dropping into slot */}
              <div
                style={{
                  position: 'absolute',
                  width: 236,
                  height: 116,
                  borderRadius: 22,
                  background: 'linear-gradient(135deg, #4fae86 0%, #265942 100%)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
                  transform: `translateY(${(1 - pSlotSnap) * -160}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                {pSlotSnap > 0.5 && <CheckIcon size={38} color="#ffffff" />}
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 28,
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: 2,
                  }}
                >
                  PERFECT FIT
                </span>
              </div>
            </div>
          </Surface>

          {/* Translation: Ukurannya pas. */}
          {f >= 165 && (
            <div
              style={{
                marginTop: 36,
                display: 'flex',
                justifyContent: 'center',
                opacity: pTrans2,
              }}
            >
              <Surface
                tone="elevated"
                radius={36}
                border={C.gold}
                style={{
                  padding: '28px 50px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 48,
                    fontWeight: 800,
                    color: C.text,
                  }}
                >
                  Ukurannya{' '}
                  <span
                    style={{
                      color: C.gold,
                      display: 'inline-block',
                      transform: `scale(${1 + 0.15 * pTrans2})`,
                      textShadow: '0 0 24px rgba(240,190,82,0.6)',
                    }}
                  >
                    pas.
                  </span>
                </span>
              </Surface>
            </div>
          )}
        </div>
      )}

      {/* Collapse Animation into two cards at f >= 180 */}
      {f >= 180 && (
        <div
          style={{
            position: 'absolute',
            top: 700,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 40,
            opacity: pCollapse,
          }}
        >
          {/* Card 会う coming in from left */}
          <div style={{transform: `translateX(${-300 + collapseX}px)`}}>
            <Surface tone="card" radius={36} style={{padding: '30px 45px'}}>
              <span style={{fontFamily: FONT.jp, fontSize: 60, fontWeight: 900, color: C.gold}}>
                会う
              </span>
            </Surface>
          </div>
          {/* Card 合う coming in from right */}
          <div style={{transform: `translateX(${300 - collapseX}px)`}}>
            <Surface tone="card" radius={36} style={{padding: '30px 45px'}}>
              <span style={{fontFamily: FONT.jp, fontSize: 60, fontWeight: 900, color: C.matcha}}>
                合う
              </span>
            </Surface>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
