import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog, SOFT, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const Scene03_HeroAuMeet: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Punch-in hero 会う at local f = 0
  const pHero = pop(f, fps, 0, BOUNCY);
  const breath = Math.sin(f / 16) * 0.02;

  // Dimmed 合う in top-right corner
  const pSmallAu = pop(f, fps, 10, SOFT);

  // Subtitle "bertemu seseorang" appears at f = 30
  const pTextBertemu = pop(f, fps, 30, SPRING);

  // Two characters move in from opposite sides:
  // Starts at f = 35, approaches center, arrives facing each other at f = 185
  const tWalk = prog(f, 35, 150, (t) => 1 - Math.pow(1 - t, 3)); // smooth cubic-out
  const leftCharX = -450 + tWalk * 330; // from -450 to -120
  const rightCharX = 450 - tWalk * 330; // from 450 to 120
  const charBobLeft = Math.sin(f / 6) * 5 * (1 - prog(f, 180, 10));
  const charBobRight = Math.cos(f / 6) * 5 * (1 - prog(f, 180, 10));

  // Hold facing each other f = 193 to 213

  // Connect animation at f = 213 ("dua pihak → bertemu")
  const pConnect = pop(f, fps, 213, SPRING);
  const pLabels = pop(f, fps, 213, BOUNCY);
  const arrowDraw = prog(f, 220, 25);

  // Exit transition at f >= 283 (shrinks up)
  const pExit = prog(f, 283, 13, (t) => t);
  const exitScale = 1 - pExit * 0.15;
  const exitY = -pExit * 200;
  const exitOpacity = 1 - pExit;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity: exitOpacity,
        transform: `translateY(${exitY}px) scale(${exitScale})`,
      }}
    >
      {sfx && (
        <>
          <Sfx name="pop" at={0} volume={0.65} />
          <Sfx name="swipe" at={35} volume={0.45} />
          <Sfx name="pop" at={185} volume={0.55} />
          <Sfx name="click" at={213} volume={0.5} />
          <Sfx name="chime" at={235} volume={0.6} />
          <Sfx name="whoosh" at={283} volume={0.5} />
        </>
      )}

      {/* Dimmed 合う in top-right corner */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          right: 80,
          opacity: 0.3 * pSmallAu,
          transform: `scale(${pSmallAu * 0.75})`,
        }}
      >
        <Surface tone="inset" radius={24} style={{padding: '12px 24px'}}>
          <span style={{fontFamily: FONT.jp, fontSize: 38, fontWeight: 700, color: C.textMuted}}>
            合う
          </span>
        </Surface>
      </div>

      {/* Hero Kanji Card: 会う */}
      <div
        style={{
          position: 'absolute',
          top: 280,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${pHero * (1 + breath)})`,
        }}
      >
        <Surface
          tone="elevated"
          radius={50}
          border={C.gold}
          style={{
            padding: '40px 70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 45px rgba(240,190,82,0.35)',
          }}
        >
          <div
            style={{
              fontFamily: FONT.jp,
              fontSize: 180,
              fontWeight: 900,
              color: C.gold,
              lineHeight: 1,
              textShadow: '0 0 40px rgba(240,190,82,0.6)',
            }}
          >
            会う
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 30,
              fontWeight: 700,
              color: C.goldSoft,
              marginTop: 12,
              letterSpacing: 2,
            }}
          >
            あ・う
          </div>
        </Surface>

        {/* Text on Screen: bertemu seseorang */}
        <div
          style={{
            marginTop: 40,
            opacity: pTextBertemu,
            transform: `translateY(${(1 - pTextBertemu) * 20}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 54,
              fontWeight: 800,
              color: C.text,
              letterSpacing: 1,
            }}
          >
            bertemu <span style={{color: C.gold, textShadow: '0 0 24px rgba(240,190,82,0.5)'}}>seseorang</span>
          </span>
          {f >= 193 && (
            <Pill color={C.gold} size={26} filled={f >= 213}>
              {f >= 213 ? 'dua pihak → bertemu' : '会う ＝ bertemu'}
            </Pill>
          )}
        </div>
      </div>

      {/* Visual Two Characters Approaching & Meeting */}
      <div
        style={{
          position: 'absolute',
          top: 960,
          left: 0,
          right: 0,
          height: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Character A (Left) */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${leftCharX}px) translateY(${charBobLeft}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {f >= 213 && (
            <div style={{opacity: pLabels, transform: `scale(${pLabels})`}}>
              <Pill color={C.indigoSoft} size={22}>
                Pihak A
              </Pill>
            </div>
          )}
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: 95,
              background: 'radial-gradient(circle at 35% 35%, #3d5885, #1f2738)',
              border: `3px solid ${C.indigoSoft}`,
              boxShadow: '0 16px 36px rgba(0,0,0,0.6), 0 0 30px rgba(111,147,207,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Img
              src={staticFile('avatars/male/tier-1.png')}
              style={{width: 170, height: 170, objectFit: 'contain'}}
            />
          </div>
        </div>

        {/* Dynamic Connector Arrow between A and B */}
        {f >= 213 && (
          <div
            style={{
              position: 'absolute',
              width: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pConnect,
            }}
          >
            <svg width={180} height={60} viewBox="0 0 180 60">
              {/* Dashed Sashiko line */}
              <line
                x1={10}
                y1={30}
                x2={170}
                y2={30}
                stroke={C.gold}
                strokeWidth={3}
                strokeDasharray="6 6"
                strokeOpacity={0.7}
              />
              {/* Converging Arrows meeting at center */}
              <path
                d="M 20 30 L 80 30"
                stroke={C.gold}
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={60}
                strokeDashoffset={60 * (1 - arrowDraw)}
              />
              <path
                d="M 160 30 L 100 30"
                stroke={C.gold}
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray={60}
                strokeDashoffset={60 * (1 - arrowDraw)}
              />
              {/* Sparkling center meet node */}
              <circle
                cx={90}
                cy={30}
                r={10 * arrowDraw}
                fill={C.gold}
                style={{filter: 'drop-shadow(0 0 10px #f0be52)'}}
              />
            </svg>
          </div>
        )}

        {/* Character B (Right) */}
        <div
          style={{
            position: 'absolute',
            transform: `translateX(${rightCharX}px) translateY(${charBobRight}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {f >= 213 && (
            <div style={{opacity: pLabels, transform: `scale(${pLabels})`}}>
              <Pill color={C.matcha} size={22}>
                Pihak B
              </Pill>
            </div>
          )}
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: 95,
              background: 'radial-gradient(circle at 35% 35%, #4fae86, #1f2738)',
              border: `3px solid ${C.matcha}`,
              boxShadow: '0 16px 36px rgba(0,0,0,0.6), 0 0 30px rgba(79,174,134,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Img
              src={staticFile('avatars/male/tier-2.png')}
              style={{width: 170, height: 170, objectFit: 'contain'}}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
