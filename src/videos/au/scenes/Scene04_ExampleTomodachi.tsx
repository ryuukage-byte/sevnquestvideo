import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const Scene04_ExampleTomodachi: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Sentence card slide-up with spring
  const pCard = pop(f, fps, 0, SPRING);
  const cardY = (1 - pCard) * 350;

  // Active highlight pulse on 会う
  const pHighlight = pop(f, fps, 15, BOUNCY);

  // Moving underline from 友達 to 会う at f = 67 to 83
  const pUnderline = prog(f, 67, 16, (t) => t);

  // Translation slide-up at f = 83
  const pTrans = pop(f, fps, 83, SPRING);
  const transY = (1 - pTrans) * 80;

  // Fast swipe out at f >= 123
  const pSwipeOut = prog(f, 123, 4, (t) => t);
  const swipeX = -pSwipeOut * 1300;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        transform: `translateX(${swipeX}px)`,
      }}
    >
      {sfx && (
        <>
          <Sfx name="pop" at={0} volume={0.65} />
          <Sfx name="chime" at={15} volume={0.6} />
          <Sfx name="tick" at={83} volume={0.5} />
          <Sfx name="swipe" at={123} volume={0.55} />
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
          opacity: pCard,
        }}
      >
        <Pill color={C.gold} size={26}>
          CONTOH KALIMAT · 会う
        </Pill>
      </div>

      {/* Main Sentence Card Area */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 80,
          right: 80,
          transform: `translateY(${cardY}px)`,
        }}
      >
        <Surface
          tone="card"
          radius={48}
          border={C.borderPrimary}
          style={{
            padding: '70px 50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
          }}
        >
          {/* Japanese Sentence: 友達に会う。 */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              flexWrap: 'nowrap',
              fontFamily: FONT.jp,
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.4,
              color: C.text,
              letterSpacing: 2,
            }}
          >
            {/* 友達に with furigana */}
            <ruby style={{rubyPosition: 'over'}}>
              友達
              <rt
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 26,
                  fontWeight: 700,
                  color: C.indigoSoft,
                  letterSpacing: 2,
                }}
              >
                ともだち
              </rt>
            </ruby>
            <span style={{color: C.textSecondary, marginLeft: 8, marginRight: 16}}>に</span>

            {/* Active Highlighted: 会う。 */}
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'baseline',
                background: `rgba(240,190,82,${0.15 + 0.1 * pHighlight})`,
                padding: '6px 20px',
                borderRadius: 20,
                border: `2px solid ${C.gold}`,
                boxShadow: `0 0 ${20 + 20 * pHighlight}px rgba(240,190,82,0.4)`,
                color: C.gold,
                transform: `scale(${1 + 0.05 * pHighlight})`,
                transition: 'transform 0.15s ease',
              }}
            >
              <ruby style={{rubyPosition: 'over'}}>
                会
                <rt
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 26,
                    fontWeight: 700,
                    color: C.goldSoft,
                  }}
                >
                  あ
                </rt>
              </ruby>
              う。
            </span>
          </div>

          {/* Flowing Underline from 友達 to 会う */}
          {f >= 67 && (
            <div style={{width: 520, height: 6, marginTop: 24, position: 'relative'}}>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: 6,
                  width: `${pUnderline * 100}%`,
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${C.indigoSoft} 0%, ${C.gold} 100%)`,
                  boxShadow: '0 0 16px rgba(240,190,82,0.6)',
                }}
              />
            </div>
          )}
        </Surface>

        {/* Translation Card: Bertemu teman. */}
        {f >= 83 && (
          <div
            style={{
              marginTop: 36,
              transform: `translateY(${transY}px)`,
              opacity: pTrans,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={C.gold}
              style={{
                padding: '36px 60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: 52,
                  fontWeight: 800,
                  color: C.text,
                }}
              >
                Bertemu teman.
              </span>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 32,
                    fontWeight: 900,
                    color: C.gold,
                  }}
                >
                  会う
                </span>
                <ArrowRight size={28} color={C.gold} />
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 30,
                    fontWeight: 700,
                    color: C.textSecondary,
                  }}
                >
                  bertemu
                </span>
              </div>
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
