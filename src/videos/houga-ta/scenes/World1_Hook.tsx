import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  Avatar,
  BOUNCY,
  Cap,
  ChatBubble,
  EASE_IN,
  GCard,
  Hi,
  Jp,
  Label,
  Line,
  SOFT,
  VerbSentence,
  Win,
  bump,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 0;

// Slot huruf akhir: る keluar ke atas, た masuk dari bawah (morph terlihat jelas)
const MorphEnd: React.FC<{t: number; at: number; size: number}> = ({t, at, size}) => {
  const p = ps(t, at, at + 0.55);
  const glow = bump(t, at, at + 1.6);
  return (
    <span style={{position: 'relative', display: 'inline-block', width: size, height: size * 1.15, verticalAlign: 'bottom'}}>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          textAlign: 'center',
          color: C.indigoSoft,
          opacity: 1 - p,
          transform: `translateY(${-p * 70}px) scale(${1 - 0.3 * p})`,
        }}
      >
        る
      </span>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          textAlign: 'center',
          color: C.gold,
          opacity: p,
          transform: `translateY(${(1 - p) * 70}px) scale(${mix(0.7, 1, p) + 0.2 * glow})`,
          textShadow: `0 0 ${50 * glow + 14}px ${hexA(C.gold, 0.85)}`,
        }}
      >
        た
      </span>
      <span
        style={{
          position: 'absolute',
          left: size * 0.1,
          right: size * 0.1,
          bottom: -6,
          height: 10,
          borderRadius: 5,
          background: C.gold,
          transformOrigin: '0 50%',
          transform: `scaleX(${ps(t, at + 0.3, at + 0.9)})`,
        }}
      />
    </span>
  );
};

export const World1_Hook: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // S01
  const bubble = pp(T, 0.2, SOFT);
  const big = pp(T, 0.9, BOUNCY);
  const lamp = pp(T, 2.0, SOFT);
  const q = pp(T, 2.7, BOUNCY);
  const qRot = Math.sin(T * 6) * 7 * Math.min(1, q) + (1 - q) * -40;

  // S02
  const taP = pp(T, 5.15, BOUNCY);
  const tl = ps(T, 5.8, 7.2);
  const arrowHead = ps(T, 7.0, 7.4);

  // S03
  const r1 = pp(T, 10.15, SOFT);
  const ar = ps(T, 11.0, 11.6);
  const r2 = pp(T, 11.4, SOFT);

  // S04
  const lIn = ps(T, 14.2, 15.0);
  const rIn = ps(T, 14.5, 15.3);
  const snap = ps(T, 17.0, 17.35, EASE_IN);
  const merged = pp(T, 17.3, BOUNCY);
  const hl = ps(T, 18.2, 19.0);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="swipe" at={S(0.2)} volume={0.35} />
          <Sfx name="pop" at={S(0.3)} volume={0.45} />
          <Sfx name="impact-soft" at={S(0.95)} volume={0.55} />
          <Sfx name="pop" at={S(2.0)} volume={0.4} />
          <Sfx name="tick" at={S(2.75)} volume={0.6} />
          <Sfx name="whoosh-soft" at={S(5.0)} volume={0.4} />
          <Sfx name="impact-soft" at={S(5.2)} volume={0.55} />
          <Sfx name="stroke" at={S(5.9)} volume={0.3} />
          <Sfx name="pop" at={S(10.15)} volume={0.4} />
          <Sfx name="swipe" at={S(11.0)} volume={0.3} />
          <Sfx name="chime" at={S(11.45)} volume={0.55} />
          <Sfx name="swipe" at={S(14.2)} volume={0.35} />
          <Sfx name="swipe" at={S(14.5)} volume={0.35} />
          <Sfx name="click" at={S(17.1)} volume={0.7} />
          <Sfx name="sparkle" at={S(17.3)} volume={0.45} />
          <Sfx name="chime" at={S(18.2)} volume={0.4} />
        </>
      )}

      {/* ---------- S01 · chat + たほうがいい + た = lampau? ---------- */}
      <Win T={T} a={0.0} b={4.7} dy={0}>
        <At x={150} y={470} style={{opacity: bubble, transform: `translate(-50%,-50%) translateY(${(1 - bubble) * 420}px)`}}>
          <Avatar tier={1} height={170} />
        </At>
        <At
          x={600}
          y={470}
          style={{opacity: bubble, transform: `translate(-50%,-50%) translateY(${(1 - bubble) * 420}px)`}}
        >
          <ChatBubble width={640} size={40}>
            Bang, <Hi>たほうがいい</Hi> kan artinya saran…
          </ChatBubble>
        </At>
        <At y={880} style={{opacity: big, transform: `translate(-50%,-50%) scale(${mix(1.5, 1, big)})`}}>
          <Jp size={150} color={C.text}>
            <span style={{color: C.gold}}>た</span>ほうがいい
          </Jp>
        </At>
        <At y={1160} style={{gap: 24, alignItems: 'baseline', opacity: lamp, transform: `translate(-50%,-50%) translateY(${(1 - lamp) * 40}px)`}}>
          <Jp size={150} color={C.gold}>た</Jp>
          <Label size={84} color={C.text}>= lampau</Label>
          <span
            style={{
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 150,
              color: C.hanko,
              display: 'inline-block',
              transform: `scale(${q}) rotate(${qRot}deg)`,
              textShadow: `0 0 30px ${hexA(C.hanko, 0.6)}`,
            }}
          >
            ?
          </span>
        </At>
      </Win>
      <Cap t={T} at={0.4} until={2.3}>
        <Hi>たほうがいい</Hi> = saran?
      </Cap>
      <Cap t={T} at={2.6} until={4.6}>
        Tapi <Hi>た</Hi> = lampau?
      </Cap>

      {/* ---------- S02 · た-form + timeline ---------- */}
      <Win T={T} a={5.0} b={9.7} dy={0}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.9}}>
          <circle cx={870} cy={1150} r={13} fill={C.indigoSoft} opacity={tl} />
          <circle cx={210} cy={1150} r={13} fill={C.gold} opacity={tl} />
        </svg>
        <Line d="M850 1150 H240" p={tl} color={hexA(C.indigoSoft, 0.6)} w={6} />
        <Line d="M285 1115 L238 1150 L285 1185" p={arrowHead} color={hexA(C.indigoSoft, 0.6)} w={6} />
        <At x={210} y={1235} style={{opacity: tl}}>
          <Pill color={C.gold} size={34}>PAST</Pill>
        </At>
        <At x={870} y={1235} style={{opacity: tl}}>
          <Pill color={C.indigoSoft} size={34}>NOW</Pill>
        </At>
        <At y={760} style={{transform: `translate(-50%,-50%) scale(${taP})`, opacity: taP}}>
          <Jp size={560} color={C.gold} style={{textShadow: `0 0 80px ${hexA(C.gold, 0.45)}, 0 12px 40px rgba(0,0,0,0.6)`}}>
            た
          </Jp>
        </At>
      </Win>
      <Cap t={T} at={5.4} until={9.6} size={52}>
        <Hi>た-form</Hi>
        <br />
        sering menunjukkan sesuatu yang sudah terjadi
      </Cap>

      {/* ---------- S03 · 食べる → 食べた ---------- */}
      <Win T={T} a={10.0} b={13.7} dy={0}>
        <At y={660} style={{opacity: r1, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, r1)})`}}>
          <Jp size={190}>食べる</Jp>
        </At>
        <Line d="M540 800 V900" p={ar} color={C.indigoSoft} w={8} />
        <Line d="M508 872 L540 910 L572 872" p={ps(T, 11.4, 11.6)} color={C.indigoSoft} w={8} />
        <At y={1090} style={{opacity: r2, transform: `translate(-50%,-50%) translateY(${(1 - r2) * 40}px)`}}>
          <Jp size={190}>
            食べ
            <MorphEnd t={T} at={11.9} size={190} />
          </Jp>
        </At>
      </Win>
      <Cap t={T} at={10.3} until={13.6} size={54}>
        食べる → <Hi>食べた</Hi>
        <br />
        Makan → Sudah makan
      </Cap>

      {/* ---------- S04 · 食べた + ほうがいい ---------- */}
      <Win T={T} a={14.0} b={20.7} dy={0}>
        {snap < 1 && (
          <>
            <At
              x={mix(-300, 280, lIn) + snap * 90}
              y={800}
              style={{opacity: 1 - ps(T, 17.2, 17.4), transform: `translate(-50%,-50%) scale(${1 + 0.06 * bump(T, 16.6, 17.4)})`}}
            >
              <GCard color={C.gold} glow={snap}>
                <Jp size={92} color={C.gold}>食べた</Jp>
              </GCard>
            </At>
            <At
              x={mix(1400, 720, rIn) - snap * 90}
              y={800}
              style={{opacity: 1 - ps(T, 17.2, 17.4), transform: `translate(-50%,-50%) scale(${1 + 0.06 * bump(T, 16.6, 17.4)})`}}
            >
              <GCard color={C.indigoSoft} glow={snap}>
                <Jp size={92}>ほうがいい</Jp>
              </GCard>
            </At>
            <At y={800} style={{opacity: ps(T, 15.0, 15.4) * (1 - snap)}}>
              <Label size={70} color={C.textSecondary}>+</Label>
            </At>
          </>
        )}
        {T >= 17.3 && (
          <At y={800} style={{opacity: merged, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, merged)})`}}>
            <GCard color={C.gold} glow={hl} style={{padding: '26px 30px'}}>
              <VerbSentence kanji="食" ruby="た" kana="べ" end="ta" size={104} hlVerb={hl} hlEnd={hl} />
            </GCard>
          </At>
        )}
        {T >= 18.2 && (
          <At y={1080} style={{opacity: ps(T, 18.2, 18.8), gap: 18}}>
            <Pill color={C.matcha} size={36}>SEBAIKNYA</Pill>
            <span style={{color: C.textSecondary}}><ArrowRight size={44} /></span>
            <Pill color={C.gold} size={36}>MAKAN</Pill>
          </At>
        )}
      </Win>
      <Cap t={T} at={14.6} until={17.6} size={56}>
        <Hi>食べた</Hi> + ほうがいい
      </Cap>
      <Cap t={T} at={17.9} until={20.8} size={56}>
        = “<Hi>Sebaiknya makan</Hi>”?
      </Cap>
    </AbsoluteFill>
  );
};
