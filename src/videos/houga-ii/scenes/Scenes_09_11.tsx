import React from 'react';
import {AbsoluteFill} from 'remotion';
import {EASE_IO, mix} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {AtY, Avatar, BOUNCY, Cap, FORM, Formula, Hi, JpSpan, SOFT, VerbSentence, hexA, pp, ps, sec, useT} from '../kit';

// ---------- S09 · 0:12.16 → 0:15.59 · karakter membandingkan dua kartu ----------
const MiniCard: React.FC<{end: 'ru' | 'ta'; dx: number; rot: number; p: number}> = ({end, dx, rot, p}) => (
  <div style={{transform: `translateX(${dx}px) rotate(${rot}deg) scale(${p})`, opacity: p}}>
    <Surface
      tone="elevated"
      radius={40}
      border={FORM[end].color}
      style={{width: 460, padding: '20px 0 10px', display: 'flex', justifyContent: 'center'}}
    >
      <VerbSentence kanji="食" ruby="た" kana="べ" end={end} size={52} hlVerb={1} tail={0.9} />
    </Surface>
  </div>
);

export const Scene09_Confused: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const t = useT();
  const sway = Math.sin(t * 3.1) * 16; // kartu bergeser halus kiri/kanan
  const pL = pp(t, 0.1, SOFT);
  const pR = pp(t, 0.3, SOFT);
  const pAv = pp(t, 0.0, SOFT);
  const q1 = pp(t, 0.9, BOUNCY);
  const q2 = pp(t, 1.2, BOUNCY);
  const bob = Math.sin(t * 4) * 5;
  const tilt = Math.sin(t * 2.2) * 3;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(0.1)} volume={0.4} />
          <Sfx name="pop" at={sec(0.3)} volume={0.4} />
          <Sfx name="pop" at={sec(0.9)} volume={0.5} />
          <Sfx name="tick" at={sec(1.2)} volume={0.4} />
          <Sfx name="swipe" at={sec(1.7)} volume={0.3} />
        </>
      )}
      {/* kartu kiri & kanan, bergeser berlawanan */}
      <div style={{position: 'absolute', left: 40, top: 560}}>
        <MiniCard end="ta" dx={sway} rot={-3 + sway * 0.1} p={pL} />
      </div>
      <div style={{position: 'absolute', right: 40, top: 640}}>
        <MiniCard end="ru" dx={-sway} rot={3 - sway * 0.1} p={pR} />
      </div>
      {/* karakter di tengah */}
      <AtY y={1100} style={{opacity: pAv, transform: `translateY(calc(-50% + ${bob}px)) rotate(${tilt}deg) scale(${pAv})`}}>
        <Avatar tier={1} height={470} />
      </AtY>
      {/* indikator bingung */}
      <div style={{position: 'absolute', left: 500, top: 760, opacity: q1, transform: `scale(${q1}) rotate(-8deg)`}}>
        <Pill color={C.gold} size={54} filled>
          ?
        </Pill>
      </div>
      <div style={{position: 'absolute', left: 640, top: 840, opacity: q2, transform: `scale(${q2}) rotate(10deg)`}}>
        <Pill color={C.hanko} size={40}>
          ??
        </Pill>
      </div>
      <Cap t={t} at={0.35} until={1.55}>
        <Hi c={C.indigoSoft}>Mirip</Hi> bentuknya.
      </Cap>
      <Cap t={t} at={1.7}>
        <Hi>Beda</Hi> konteksnya.
      </Cap>
    </AbsoluteFill>
  );
};

// ---------- S10 · 0:15.59 → 0:18.47 · dua kartu belajar ----------
const FormCard: React.FC<{end: 'ru' | 'ta'; y: number; p: number}> = ({end, y, p}) => (
  <AtY y={y} style={{opacity: p, transform: `translateY(-50%) scale(${mix(0.9, 1, p)})`}}>
    <Surface
      tone="elevated"
      radius={54}
      border={FORM[end].color}
      style={{
        width: 900,
        padding: '38px 0 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 50px ${hexA(FORM[end].color, 0.16)}`,
      }}
    >
      <Pill color={FORM[end].color} size={26}>
        {end === 'ru' ? 'KARTU 1' : 'KARTU 2'}
      </Pill>
      <Formula end={end} size={96} />
    </Surface>
  </AtY>
);

export const Scene10_WhichOne: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const t = useT();
  const title = pp(t, 0.05, SOFT);
  const c1 = pp(t, 0.2, SOFT);
  const c2 = pp(t, 0.45, SOFT);
  const push = ps(t, 0.7, 2.4, EASE_IO); // kartu didorong ke tengah
  const y1 = mix(560, 740, push);
  const y2 = mix(1240, 1100, push);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={sec(0.05)} volume={0.35} />
          <Sfx name="pop" at={sec(0.2)} volume={0.4} />
          <Sfx name="pop" at={sec(0.45)} volume={0.4} />
          <Sfx name="swipe" at={sec(0.8)} volume={0.35} />
        </>
      )}
      <AtY y={330} style={{opacity: title, transform: `translateY(-50%) scale(${title})`}}>
        <span
          style={{
            fontFamily: FONT.display,
            fontWeight: 900,
            fontSize: 70,
            color: C.text,
            letterSpacing: 2,
            textAlign: 'center',
            lineHeight: 1.1,
            textShadow: '0 8px 30px rgba(0,0,0,0.85)',
          }}
        >
          KAPAN PAKAI
          <br />
          <span style={{color: C.gold, textShadow: `0 0 30px ${hexA(C.gold, 0.5)}`}}>YANG MANA?</span>
        </span>
      </AtY>
      <FormCard end="ru" y={y1} p={c1} />
      <FormCard end="ta" y={y2} p={c2} />
    </AbsoluteFill>
  );
};

// ---------- S11 · 0:18.47 → 0:21.01 · situasi sederhana ----------
export const Scene11_Situation: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const t = useT();
  const pT = pp(t, 0.05, BOUNCY);
  const pAv = pp(t, 0.25, SOFT);
  const bob = Math.sin(t * 3.4) * 7;
  const chip1 = pp(t, 1.05, BOUNCY);
  const chip2 = pp(t, 1.35, BOUNCY);
  const z = (i: number) => {
    const p = ps(t, 0.7 + i * 0.35, 1.4 + i * 0.35, (x) => x);
    return {opacity: Math.sin(Math.PI * p), transform: `translate(${p * 40}px, ${-p * 70}px)`};
  };
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={sec(0.02)} volume={0.35} />
          <Sfx name="pop" at={sec(0.05)} volume={0.4} />
          <Sfx name="pop" at={sec(1.05)} volume={0.4} />
          <Sfx name="pop" at={sec(1.35)} volume={0.4} />
        </>
      )}
      <AtY y={420} style={{opacity: pT, transform: `translateY(-50%) scale(${pT})`}}>
        <Pill color={C.gold} size={54} filled>
          SITUASI SEDERHANA
        </Pill>
      </AtY>
      <AtY y={960} style={{transform: `translateY(calc(-50% + ${bob}px)) scale(${pAv})`, opacity: pAv}}>
        <Avatar tier={1} height={430} />
      </AtY>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: 640 + i * 46,
            top: 720 - i * 56,
            fontFamily: FONT.hand,
            fontWeight: 700,
            fontSize: 70 - i * 6 + 10,
            color: C.indigoSoft,
            ...z(i),
          }}
        >
          z
        </span>
      ))}
      <div style={{position: 'absolute', left: 90, top: 1260, opacity: chip1, transform: `scale(${chip1})`}}>
        <Surface tone="elevated" radius={36} border={FORM.ru.color} style={{padding: '14px 44px'}}>
          <JpSpan style={{fontSize: 80, color: C.text}}>
            <ruby>
              寝<rt style={{fontSize: 24, color: C.gold}}>ね</rt>
            </ruby>
            る
          </JpSpan>
        </Surface>
      </div>
      <div style={{position: 'absolute', right: 90, top: 1260, opacity: chip2, transform: `scale(${chip2})`}}>
        <Surface tone="elevated" radius={36} border={C.gold} style={{padding: '14px 44px'}}>
          <JpSpan style={{fontSize: 80, color: C.text}}>
            <ruby>
              起<rt style={{fontSize: 24, color: C.gold}}>お</rt>
            </ruby>
            きる
          </JpSpan>
        </Surface>
      </div>
    </AbsoluteFill>
  );
};
