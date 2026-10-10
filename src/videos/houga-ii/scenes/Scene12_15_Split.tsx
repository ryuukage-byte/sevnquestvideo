import React from 'react';
import {AbsoluteFill} from 'remotion';
import {EASE_IO, mix} from '../../../shared/anim';
import {RollingNumber} from '../../../shared/components/RollingNumber';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {BOUNCY, Cap, Hi, JpSpan, MoonIcon, SOFT, SunIcon, hexA, pp, ps, sec, useT} from '../kit';

// Rasio asli 49 : 51 — lebar panel mengikuti angka, bukan 50/50.
const TOTAL = 920;
const GAP = 12;
const WL = ((TOTAL - GAP) * 49) / 100;
const WR = ((TOTAL - GAP) * 51) / 100;
const LEFT = (1080 - TOTAL) / 2;
const TOP = 430;
const HEIGHT = 780;

const Panel: React.FC<{
  w: number;
  tone: string;
  value: number;
  word: React.ReactNode;
  icon: React.ReactNode;
  scale: number;
  opacity: number;
  glow: number;
  p: number;
  fromX: number;
  badge?: React.ReactNode;
}> = ({w, tone, value, word, icon, scale, opacity, glow, p, fromX, badge}) => (
  <div
    style={{
      width: w,
      height: HEIGHT,
      opacity: opacity * p,
      transform: `translateX(${(1 - p) * fromX}px) scale(${scale})`,
      position: 'relative',
    }}
  >
    <Surface
      tone="elevated"
      radius={54}
      border={hexA(tone, 0.4 + 0.6 * glow)}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 26,
        boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 ${70 * glow}px ${hexA(tone, 0.4 * glow)}`,
      }}
    >
      {icon}
      <div style={{fontSize: 96, color: C.text, lineHeight: 1.4}}>{word}</div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 6}}>
        <RollingNumber value={value} digits={2} size={150} color={tone} font={FONT.display} weight={800} />
        <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 70, color: hexA(tone, 0.85)}}>%</span>
      </div>
    </Surface>
    {badge}
  </div>
);

// S12–S15 · 0:21.01 → 0:38.08 · satu komponen, fokus berpindah. (lokal: S13=6.63, S14=9.64, S15=12.55)
export const Scene12_15_Split: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const t = useT();
  const pL = pp(t, 0.05, SOFT);
  const pR = pp(t, 0.15, SOFT);
  const v49 = 49 * ps(t, 0.9, 3.5);
  const v51 = 51 * ps(t, 1.0, 3.7);

  const fl = ps(t, 6.63, 7.0) - ps(t, 9.64, 10.0);
  const fr = ps(t, 9.64, 10.0) - ps(t, 12.55, 12.9);
  const dom = ps(t, 3.8, 4.5);

  const sL = 1 + 0.07 * fl - 0.02 * fr;
  const sR = 1 + 0.03 * dom * (1 - fl) + 0.07 * fr - 0.02 * fl;
  const oL = 1 - 0.65 * fr;
  const oR = 1 - 0.65 * fl;
  const gL = fl;
  const gR = 0.35 * dom * (1 - fl) + 0.65 * fr + 0.35 * ps(t, 12.55, 13, (x) => x) * (1 - fr);

  const check = pp(t, 10.2, BOUNCY);
  const checkDraw = ps(t, 10.25, 10.7);

  // S15
  const vs = pp(t, 12.55, BOUNCY);
  const arrow = ps(t, 14.4, 15.3, EASE_IO);
  const ring = ps(t, 15.4, 15.8);
  const ringPulse = 1 + 0.015 * Math.sin(t * 7);

  const tickTimes = Array.from({length: 9}, (_, i) => 1.0 + i * 0.3);
  const rightCx = LEFT + WL + GAP + WR / 2;
  const leftCx = LEFT + WL / 2;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={sec(0.02)} volume={0.35} />
          <Sfx name="pop" at={sec(0.05)} volume={0.4} />
          <Sfx name="pop" at={sec(0.15)} volume={0.4} />
          {tickTimes.map((s) => (
            <Sfx key={s} name="tick" at={sec(s)} volume={0.3} />
          ))}
          <Sfx name="ding" at={sec(3.7)} volume={0.35} />
          <Sfx name="swipe" at={sec(6.63)} volume={0.3} />
          <Sfx name="swipe" at={sec(9.64)} volume={0.3} />
          <Sfx name="success" at={sec(10.2)} volume={0.5} />
          <Sfx name="pop" at={sec(12.55)} volume={0.5} />
          <Sfx name="swipe" at={sec(14.4)} volume={0.35} />
          <Sfx name="ding" at={sec(15.4)} volume={0.45} />
        </>
      )}

      <div style={{position: 'absolute', left: LEFT, top: TOP, display: 'flex', gap: GAP, alignItems: 'center'}}>
        <Panel
          w={WL}
          tone={C.indigoSoft}
          value={v49}
          p={pL}
          fromX={120}
          scale={sL}
          opacity={oL}
          glow={gL}
          icon={<MoonIcon size={170} />}
          word={
            <JpSpan>
              <ruby>
                寝<rt style={{fontSize: 30, color: C.gold}}>ね</rt>
              </ruby>
              る
            </JpSpan>
          }
        />
        <Panel
          w={WR}
          tone={C.gold}
          value={v51}
          p={pR}
          fromX={-120}
          scale={sR}
          opacity={oR}
          glow={gR}
          icon={<SunIcon size={170} spin={t * 18} />}
          word={
            <JpSpan>
              <ruby>
                起<rt style={{fontSize: 30, color: C.gold}}>お</rt>
              </ruby>
              きる
            </JpSpan>
          }
          badge={
            t >= 10.2 && fr > 0.05 ? (
              <div
                style={{
                  position: 'absolute',
                  top: -34,
                  right: -22,
                  width: 108,
                  height: 108,
                  borderRadius: 54,
                  background: C.matcha,
                  border: `4px solid ${C.matchaDeep}`,
                  boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transform: `scale(${check})`,
                  opacity: check,
                }}
              >
                <CheckIcon size={64} draw={checkDraw} stroke={3.6} />
              </div>
            ) : null
          }
        />
      </div>

      {/* S15: VS di sambungan dua panel */}
      {t >= 12.55 && (
        <div
          style={{
            position: 'absolute',
            left: LEFT + WL + GAP / 2 - 70,
            width: 140,
            top: TOP + HEIGHT / 2 - 40,
            display: 'flex',
            justifyContent: 'center',
            opacity: vs,
            transform: `scale(${vs})`,
            zIndex: 5,
          }}
        >
          <Pill color={C.text} size={42} filled>
            VS
          </Pill>
        </div>
      )}

      {/* S15: panah memilih opsi yang lebih baik + cincin pemilih */}
      {t >= 14.4 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path
            d={`M${leftCx} ${TOP + HEIGHT + 30} Q${(leftCx + rightCx) / 2} ${TOP + HEIGHT + 150} ${rightCx - 18} ${TOP + HEIGHT + 40}`}
            fill="none"
            stroke={C.gold}
            strokeWidth={7}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - arrow}
          />
          <path
            d={`M${rightCx - 38} ${TOP + HEIGHT + 62}L${rightCx - 14} ${TOP + HEIGHT + 38}L${rightCx - 8} ${TOP + HEIGHT + 72}`}
            fill="none"
            stroke={C.gold}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={arrow > 0.96 ? 1 : 0}
          />
        </svg>
      )}
      {t >= 15.4 && (
        <div
          style={{
            position: 'absolute',
            left: LEFT + WL + GAP - 14,
            top: TOP - 14,
            width: WR + 28,
            height: HEIGHT + 28,
            borderRadius: 66,
            border: `5px dashed ${C.gold}`,
            opacity: ring * 0.9,
            transform: `scale(${mix(1.06, 1, ring) * ringPulse})`,
          }}
        />
      )}

      <Cap t={t} at={12.55} y={210} size={54}>
        <Hi c={C.text}>MEMBANDINGKAN</Hi> <Hi>2 PILIHAN</Hi>
      </Cap>
      <Cap t={t} at={14.6}>
        Mana yang <Hi>lebih baik</Hi>?
      </Cap>
    </AbsoluteFill>
  );
};
