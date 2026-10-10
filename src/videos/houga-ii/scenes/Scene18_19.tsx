import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BOUNCY, mix} from '../../../shared/anim';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, PhysicalButton, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {AtY, Form, FORM, Hi, JpSpan, SOFT, bump, hexA, pp, ps, sec, useT} from '../kit';

// ---------- S18 · 1:03.45 → 1:19.31 · recap: Vる → COMPARISON, Vた → ADVICE ----------
const RecapCard: React.FC<{
  end: Form;
  left: number;
  p: number;
  emph: number;
  pulse: number;
  arrow: number;
  label: string;
  sub: string;
  labelP: number;
  subP: number;
}> = ({end, left, p, emph, pulse, arrow, label, sub, labelP, subP}) => {
  const acc = FORM[end];
  const s = 1 + 0.22 * emph + 0.05 * pulse * emph;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left,
          top: 520,
          width: 440,
          height: 430,
          opacity: p,
          transform: `translateY(${(1 - p) * 60}px) scale(${p})`,
        }}
      >
        <Surface
          tone="elevated"
          radius={54}
          border={hexA(acc.color, 0.5 + 0.5 * emph)}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 ${80 * emph}px ${hexA(acc.color, 0.35 * emph)}`,
          }}
        >
          <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 120, color: C.text, lineHeight: 1}}>V</span>
          <JpSpan
            style={{
              fontSize: 210,
              lineHeight: 1,
              color: acc.color,
              display: 'inline-block',
              transform: `scale(${s})`,
              textShadow: `0 0 ${24 + 40 * emph}px ${hexA(acc.color, 0.6)}`,
            }}
          >
            {acc.ch}
          </JpSpan>
        </Surface>
      </div>
      {/* panah ke bawah */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path
          d={`M${left + 220} 975V1060`}
          stroke={acc.color}
          strokeWidth={7}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - arrow}
        />
        <path
          d={`M${left + 196} 1038L${left + 220} 1064L${left + 244} 1038`}
          stroke={acc.color}
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={arrow > 0.95 ? 1 : 0}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          left,
          width: 440,
          top: 1090,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div style={{opacity: labelP, transform: `scale(${labelP})`}}>
          <Pill color={acc.color} size={40} filled>
            {label}
          </Pill>
        </div>
        <span
          style={{
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 42,
            color: C.text,
            opacity: subP,
            transform: `translateY(${(1 - subP) * 16}px)`,
            textShadow: '0 8px 30px rgba(0,0,0,0.8)',
          }}
        >
          {sub}
        </span>
      </div>
    </>
  );
};

export const Scene18_Recap: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const t = useT();
  const pHead = pp(t, 0.2, BOUNCY);
  const pL = pp(t, 1.6, SOFT);
  const pR = pp(t, 1.9, SOFT);
  const aL = ps(t, 3.6, 4.2);
  const aR = ps(t, 3.9, 4.5);
  const lL = pp(t, 4.4, BOUNCY);
  const lR = pp(t, 4.7, BOUNCY);
  const sL = pp(t, 5.4, SOFT);
  const sR = pp(t, 5.7, SOFT);
  const emph = ps(t, 9.0, 9.8);
  const headDim = 1 - 0.85 * emph;
  const pulse = (end: Form) => 0.5 + 0.5 * Math.sin(t * 3.2 + (end === 'ta' ? Math.PI : 0));
  const closing = pp(t, 10.2, BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="impact-soft" at={sec(0.2)} volume={0.5} />
          <Sfx name="pop" at={sec(1.6)} volume={0.45} />
          <Sfx name="pop" at={sec(1.9)} volume={0.45} />
          <Sfx name="swipe" at={sec(3.6)} volume={0.3} />
          <Sfx name="pop" at={sec(4.4)} volume={0.5} />
          <Sfx name="pop" at={sec(4.7)} volume={0.5} />
          <Sfx name="whoosh-soft" at={sec(9.0)} volume={0.4} />
          <Sfx name="success" at={sec(9.5)} volume={0.55} />
        </>
      )}
      <AtY y={340} style={{opacity: pHead * headDim, transform: `translateY(-50%) scale(${mix(0.9, 1, pHead) * (1 - 0.1 * emph)})`}}>
        <JpSpan style={{fontSize: 118, color: C.text, textShadow: '0 6px 24px rgba(0,0,0,0.55)'}}>ほうがいい</JpSpan>
      </AtY>
      <RecapCard
        end="ru"
        left={80}
        p={pL}
        emph={emph}
        pulse={pulse('ru')}
        arrow={aL}
        label="COMPARISON"
        sub="A vs B"
        labelP={lL}
        subP={sL}
      />
      <RecapCard
        end="ta"
        left={560}
        p={pR}
        emph={emph}
        pulse={pulse('ta')}
        arrow={aR}
        label="ADVICE"
        sub="saran"
        labelP={lR}
        subP={sR}
      />
      {t >= 10.2 && (
        <AtY y={1480} style={{opacity: closing, transform: `translateY(-50%) scale(${closing})`, gap: 26, alignItems: 'center'}}>
          <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 56, color: FORM.ru.color}}>
            <JpSpan>る</JpSpan> = banding
          </span>
          <span style={{color: C.textSecondary}}>
            <ArrowRight size={44} />
          </span>
          <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 56, color: FORM.ta.color}}>
            <JpSpan>た</JpSpan> = saran
          </span>
        </AtY>
      )}
    </AbsoluteFill>
  );
};

// ---------- S19 · 1:19.31 → 1:24.12 · CTA ----------
export const Scene19_Cta: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const t = useT();
  const pQ = pp(t, 0.05, SOFT);
  const qOut = 1 - ps(t, 1.35, 1.65, (x) => x);
  const pLogo = pp(t, 1.5, BOUNCY);
  const shock = ps(t, 1.5, 2.3);
  const pCard = pp(t, 1.9, SOFT);
  const pBtn = pp(t, 2.5, BOUNCY);
  const press = ps(t, 3.3, 3.45, (x) => x) * (1 - ps(t, 3.5, 3.65, (x) => x));
  const pulse = 1 + 0.07 * bump(t, 3.4, 4.0);
  const pUrl = pp(t, 3.0, SOFT);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(0.05)} volume={0.4} />
          <Sfx name="whoosh-soft" at={sec(1.35)} volume={0.35} />
          <Sfx name="sparkle" at={sec(1.5)} volume={0.6} />
          <Sfx name="chime" at={sec(1.55)} volume={0.55} />
          <Sfx name="pop" at={sec(2.5)} volume={0.45} />
          <Sfx name="click" at={sec(3.35)} volume={0.7} />
        </>
      )}
      {t < 1.7 && (
        <AtY y={800} style={{opacity: pQ * qOut, transform: `translateY(-50%) scale(${pQ})`}}>
          <span
            style={{
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 78,
              lineHeight: 1.18,
              textAlign: 'center',
              color: C.text,
              padding: '0 70px',
              textShadow: '0 8px 30px rgba(0,0,0,0.85)',
            }}
          >
            Masih bingung <Hi>pola kalimat</Hi> Jepang?
          </span>
        </AtY>
      )}

      {t >= 1.5 && (
        <>
          {shock < 1 && (
            <div
              style={{
                position: 'absolute',
                left: 540 - 200,
                top: 520 - 200,
                width: 400,
                height: 400,
                borderRadius: 200,
                border: `3px solid ${C.gold}`,
                transform: `scale(${1 + shock * 1.6})`,
                opacity: 1 - shock,
              }}
            />
          )}
          <AtY y={520} style={{opacity: pLogo, transform: `translateY(-50%) scale(${pLogo})`, gap: 26, alignItems: 'center'}}>
            <LogoMark size={150} glow={0.5} />
            <Wordmark size={88} />
          </AtY>
          <AtY y={860} style={{opacity: pCard, transform: `translateY(calc(-50% + ${(1 - pCard) * 40}px))`}}>
            <Surface
              tone="elevated"
              radius={44}
              border={C.gold}
              style={{width: 780, padding: '34px 48px', display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0 20px 50px rgba(0,0,0,0.7)'}}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <JpSpan style={{fontSize: 46, color: C.gold}}>〜ほうがいい</JpSpan>
                <Pill color={C.matcha} size={20}>
                  BUNPOU QUEST
                </Pill>
              </div>
              <div style={{height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden'}}>
                <div
                  style={{
                    height: '100%',
                    width: `${78 * ps(t, 2.0, 2.8)}%`,
                    background: `linear-gradient(90deg, ${C.matcha} 0%, ${C.gold} 100%)`,
                  }}
                />
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontFamily: FONT.mono, fontSize: 20, color: C.textSecondary}}>
                  V<JpSpan style={{color: FORM.ru.color}}>る</JpSpan> · V<JpSpan style={{color: FORM.ta.color}}>た</JpSpan>
                </span>
                <span style={{fontFamily: FONT.mono, fontSize: 20, color: C.gold}}>+120 XP</span>
              </div>
            </Surface>
          </AtY>
        </>
      )}

      {t >= 2.5 && (
        <AtY y={1190} style={{opacity: pBtn, transform: `translateY(-50%) scale(${pBtn * pulse})`}}>
          <PhysicalButton label="Belajar di SevnQuest" tone="gold" w={660} h={104} fontSize={42} press={press} />
        </AtY>
      )}
      {t >= 3.0 && (
        <AtY y={1340} style={{opacity: pUrl, transform: `translateY(-50%) translateY(${(1 - pUrl) * 20}px)`, gap: 14, alignItems: 'center'}}>
          <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
          <span style={{fontFamily: FONT.mono, fontSize: 38, fontWeight: 800, color: C.text, letterSpacing: 1.5}}>
            sevnquest.sevnsoul.site
          </span>
          <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
        </AtY>
      )}
    </AbsoluteFill>
  );
};
