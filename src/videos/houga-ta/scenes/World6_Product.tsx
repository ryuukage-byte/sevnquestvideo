import React from 'react';
import {AbsoluteFill} from 'remotion';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, PhysicalButton, Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {IPhoneShell} from '../../iphone/components/iPhoneShell';
import {TouchIndicator} from '../../iphone/components/TouchIndicator';
import {
  At,
  BOUNCY,
  Cap,
  GCard,
  Hi,
  Label,
  SOFT,
  Win,
  bump,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';
import {
  ConjScreen,
  GrammarScreen,
  HomeScreenPhone,
  LibraryScreen,
  TAB_X,
  TAB_Y,
  TabId,
} from '../ProductScreens';

const START = 98;

const KEYS: [number, number, number][] = [
  [102.0, 560, 1000],
  [102.45, TAB_X.library, TAB_Y],
  [102.75, TAB_X.library, TAB_Y],
  [103.3, 380, 853],
  [103.75, 380, 853],
  [104.25, 380, 853],
  [104.8, 380, 853],
];
const pointer = (T: number) => {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [t0, x0, y0] = KEYS[i];
    const [t1, x1, y1] = KEYS[i + 1];
    if (T >= t0 && T <= t1) {
      const p = ps(T, t0, t1, (x) => x * x * (3 - 2 * x));
      return {x: mix(x0, x1, p), y: mix(y0, y1, p)};
    }
  }
  return T < KEYS[0][0] ? {x: KEYS[0][1], y: KEYS[0][2]} : {x: KEYS[KEYS.length - 1][1], y: KEYS[KEYS.length - 1][2]};
};
const press = (T: number, a: number) => ps(T, a, a + 0.1, (x) => x) * (1 - ps(T, a + 0.14, a + 0.26, (x) => x));

const Step: React.FC<{on: boolean; done?: boolean; children: React.ReactNode}> = ({on, done, children}) => (
  <Pill color={on ? C.gold : done ? C.matcha : C.textMuted} size={26} filled={on}>
    {children}
  </Pill>
);

export const World6_Product: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ----- phone (S22–S25) -----
  const rise = ps(T, 98.0, 99.1);
  const exit = ps(T, 111.9, 112.6, (x) => x * x);
  const phoneY = (1 - rise) * 1600 + exit * 1700;
  const tilt = (1 - rise) * 8;

  const logoP = pp(T, 98.2, SOFT);
  const logoOut = 1 - ps(T, 101.5, 101.9, (x) => x);

  // navigasi
  const toLib = ps(T, 102.5, 102.85);
  const toGram = ps(T, 103.4, 103.75);
  const toConj = ps(T, 104.3, 104.65);
  const showTouch = T >= 101.8 && T <= 104.9;
  const pt = pointer(T);
  const pr = Math.max(press(T, 102.4), press(T, 103.3), press(T, 104.2));
  const tabPress: TabId | null = press(T, 102.4) > 0.3 ? 'library' : null;
  const hitGram = ps(T, 103.3, 103.5);
  const hitConj = ps(T, 104.2, 104.4);

  // S24
  const scroll = ps(T, 105.3, 108.8, (x) => x * x * (3 - 2 * x));
  // S25
  const typed = '食べる'.slice(0, Math.floor(ps(T, 109.4, 110.3, (x) => x) * 3 + 0.001));
  const focus = ps(T, 109.2, 109.4);
  const mode: 'list' | 'process' | 'result' = T < 109.2 ? 'list' : T < 110.9 ? 'process' : 'result';
  const procP = ps(T, 110.3, 110.9, (x) => x);
  const resultP = ps(T, 110.9, 111.5);
  const step = T < 110.4 ? 0 : T < 110.9 ? 1 : 2;
  const showStepper = T >= 109.0 && T <= 112.0;

  // S26
  const bad = pp(T, 112.4, SOFT);
  const goodP = pp(T, 112.9, BOUNCY);
  const sweep = ps(T, 113.1, 113.6);
  const dimBad = ps(T, 113.2, 113.7);

  // S27
  const logo = pp(T, 114.15, BOUNCY);
  const btn = pp(T, 114.5, BOUNCY);
  const url = pp(T, 114.8, SOFT);
  const pulse = 1 + 0.07 * bump(T, 115.2, 115.75);
  const prs = press(T, 115.1);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh" at={S(98.0)} volume={0.4} />
          <Sfx name="impact-soft" at={S(98.9)} volume={0.5} />
          <Sfx name="pop" at={S(98.2)} volume={0.4} />
          <Sfx name="click" at={S(102.5)} volume={0.6} />
          <Sfx name="swipe" at={S(102.7)} volume={0.3} />
          <Sfx name="click" at={S(103.4)} volume={0.6} />
          <Sfx name="swipe" at={S(103.65)} volume={0.3} />
          <Sfx name="click" at={S(104.3)} volume={0.6} />
          <Sfx name="swipe" at={S(104.55)} volume={0.3} />
          <Sfx name="tick" at={S(109.5)} volume={0.5} />
          <Sfx name="tick" at={S(109.8)} volume={0.5} />
          <Sfx name="tick" at={S(110.1)} volume={0.5} />
          <Sfx name="rise" at={S(110.3)} volume={0.3} />
          <Sfx name="success" at={S(110.95)} volume={0.55} />
          <Sfx name="whoosh-soft" at={S(111.9)} volume={0.4} />
          <Sfx name="error-soft" at={S(112.45)} volume={0.35} />
          <Sfx name="pop" at={S(112.9)} volume={0.5} />
          <Sfx name="chime" at={S(113.1)} volume={0.5} />
          <Sfx name="sparkle" at={S(114.15)} volume={0.6} />
          <Sfx name="chime" at={S(114.2)} volume={0.5} />
          <Sfx name="pop" at={S(114.5)} volume={0.45} />
          <Sfx name="click" at={S(115.15)} volume={0.7} />
        </>
      )}

      {/* ---------- S22–S25 · phone SevnQuest ---------- */}
      <Win T={T} a={98.0} b={112.1} dy={0} inD={0.05} outD={0.6}>
        {logoOut > 0 && (
          <At y={225} style={{opacity: logoP * logoOut, gap: 18, transform: `translate(-50%,-50%) translateY(${(1 - logoP) * -40}px)`}}>
            <LogoMark size={92} glow={0.4} />
            <Wordmark size={64} />
          </At>
        )}
        {showStepper && (
          <At y={235} style={{gap: 14, opacity: ps(T, 109.0, 109.3)}}>
            <Step on={step === 0} done={step > 0}>TYPE</Step>
            <span style={{color: C.textMuted, fontFamily: FONT.mono, fontSize: 26}}>→</span>
            <Step on={step === 1} done={step > 1}>PROCESS</Step>
            <span style={{color: C.textMuted, fontFamily: FONT.mono, fontSize: 26}}>→</span>
            <Step on={step === 2}>RESULT</Step>
          </At>
        )}
        <div
          style={{
            position: 'absolute',
            left: 160,
            top: 110,
            transform: `translateY(${phoneY}px) scale(0.74) rotate(${tilt * 0.3}deg)`,
            transformOrigin: '50% 50%',
          }}
        >
          <IPhoneShell>
            <div style={{position: 'absolute', inset: 0}}>
              {/* home */}
              <div style={{position: 'absolute', inset: 0, opacity: 1 - toLib, transform: `translateX(${-toLib * 120}px)`}}>
                <HomeScreenPhone pressTab={tabPress} />
              </div>
              {/* library */}
              {T >= 102.5 && (
                <div style={{position: 'absolute', inset: 0, opacity: toLib * (1 - toGram), transform: `translateX(${(1 - toLib) * 160 - toGram * 120}px)`}}>
                  <LibraryScreen hit={hitGram} />
                </div>
              )}
              {/* tata bahasa */}
              {T >= 103.4 && (
                <div style={{position: 'absolute', inset: 0, opacity: toGram * (1 - toConj), transform: `translateX(${(1 - toGram) * 160 - toConj * 120}px)`}}>
                  <GrammarScreen hit={hitConj} />
                </div>
              )}
              {/* konjugasi */}
              {T >= 104.3 && (
                <div style={{position: 'absolute', inset: 0, opacity: toConj, transform: `translateX(${(1 - toConj) * 160}px)`}}>
                  <ConjScreen scroll={scroll} mode={mode} typed={typed} focus={focus} procP={procP} resultP={resultP} />
                </div>
              )}
              {showTouch && <TouchIndicator x={pt.x} y={pt.y} press={pr} opacity={ps(T, 101.8, 102.1) * (1 - ps(T, 104.6, 104.9))} />}
            </div>
          </IPhoneShell>
        </div>
      </Win>
      <Cap t={T} at={105.1} until={108.8} y={1500} size={56}>
        Lihat <Hi>semua bentuk</Hi>
      </Cap>
      <Cap t={T} at={109.2} until={111.8} y={1500} size={56}>
        Coba <Hi>kata apa saja</Hi>
      </Cap>
      <Cap t={T} at={102.2} until={104.8} y={1500} size={48}>
        Library → Tata Bahasa → <Hi>Konjugasi</Hi>
      </Cap>

      {/* ---------- S26 · hafal vs paham ---------- */}
      <Win T={T} a={112.3} b={113.9} dy={0} outD={0.25}>
        <At y={640} style={{opacity: bad * (1 - 0.5 * dimBad), transform: `translate(-50%,-50%) scale(${mix(0.85, 1, bad)})`}}>
          <GCard color={C.hanko} w={900} h={250} glow={0} style={{gap: 32, justifyContent: 'space-between', padding: '0 54px'}}>
            <Label size={66} color={C.textSecondary}>Hafal hasil</Label>
            <svg width={90} height={90} viewBox="0 0 24 24" fill="none" stroke={C.hanko} strokeWidth={3.6} strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </GCard>
        </At>
        <At y={960} style={{opacity: goodP, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, goodP)})`}}>
          <GCard color={C.matcha} w={900} h={250} glow={bump(T, 113.1, 114.0)} style={{gap: 32, justifyContent: 'space-between', padding: '0 54px'}}>
            <Label size={66} color={C.text}>Paham proses</Label>
            <span style={{color: C.matcha}}>
              <CheckIcon size={100} stroke={4.2} draw={sweep} />
            </span>
          </GCard>
        </At>
        <div
          style={{
            position: 'absolute',
            left: 90,
            top: 835,
            width: 900,
            height: 250,
            borderRadius: 44,
            overflow: 'hidden',
            opacity: goodP,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 180,
              left: mix(-260, 1000, sweep),
              background: `linear-gradient(100deg, transparent, ${hexA(C.goldSoft, 0.28)}, transparent)`,
            }}
          />
        </div>
      </Win>
      <Cap t={T} at={112.6} until={113.9} size={54}>
        Bukan cuma hafal
        <br />
        Tapi <Hi>paham kenapa</Hi>
      </Cap>

      {/* ---------- S27 · CTA ---------- */}
      {T >= 114.0 && (
        <>
          <At y={520} style={{opacity: logo, transform: `translate(-50%,-50%) scale(${mix(1.25, 1, logo)})`, flexDirection: 'column', gap: 24}}>
            <LogoMark size={190} glow={0.5} />
            <Wordmark size={96} />
          </At>
          <At y={900} style={{opacity: btn, transform: `translate(-50%,-50%) scale(${btn * pulse})`}}>
            <PhysicalButton label="Coba sekarang di SevnQuest" tone="gold" w={820} h={120} fontSize={42} press={prs} />
          </At>
          <At y={1080} style={{opacity: url, gap: 14, transform: `translate(-50%,-50%) translateY(${(1 - url) * 20}px)`}}>
            <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
            <span style={{fontFamily: FONT.mono, fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: 1.5}}>
              sevnquest.sevnsoul.site
            </span>
            <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
          </At>
        </>
      )}
    </AbsoluteFill>
  );
};
