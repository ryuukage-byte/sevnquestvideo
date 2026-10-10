import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  BOUNCY,
  Cap,
  GCard,
  Hi,
  Jp,
  Label,
  Line,
  SOFT,
  SPRING,
  Win,
  bump,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 82;

const HL: React.FC<{p: number; color?: string; children: React.ReactNode}> = ({p, color = C.gold, children}) => (
  <span
    style={{
      position: 'relative',
      display: 'inline-block',
      padding: '0 0.08em',
      borderRadius: '0.16em',
      background: hexA(color, 0.2 * p),
      boxShadow: p > 0.02 ? `0 0 ${50 * p}px ${hexA(color, 0.3 * p)}` : undefined,
      color: p > 0.3 ? color : 'inherit',
    }}
  >
    {children}
    <span
      style={{
        position: 'absolute',
        left: '0.06em',
        right: '0.06em',
        bottom: '0.02em',
        height: 8,
        borderRadius: 4,
        background: color,
        transformOrigin: '0 50%',
        transform: `scaleX(${p})`,
      }}
    />
  </span>
);

const FORMS = [
  {tag: 'た-form', word: '食べた', x: 190, color: C.gold, at: 84.0},
  {tag: 'て-form', word: '食べて', x: 540, color: C.indigoSoft, at: 85.1},
  {tag: 'ない-form', word: '食べない', x: 890, color: C.matcha, at: 86.2},
];

export const World5_Conj: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // S19
  const center = pp(T, 82.2, BOUNCY);
  const focus = ps(T, 87.4, 88.1);

  // S20
  const box = pp(T, 90.1, SOFT);
  const word = Math.floor(ps(T, 90.5, 91.2, (x) => x) * 2);
  const query = pp(T, 92.0, SPRING);
  const qm = pp(T, 92.6, BOUNCY);

  // S21
  const r1 = pp(T, 94.1, SOFT);
  const h1 = ps(T, 94.7, 95.3);
  const ar = ps(T, 95.0, 95.6);
  const r2 = pp(T, 95.5, SOFT);
  const h2 = ps(T, 96.0, 96.6);
  const chip = pp(T, 96.2, BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="impact-soft" at={S(82.2)} volume={0.5} />
          <Sfx name="whoosh-soft" at={S(84.0)} volume={0.35} />
          <Sfx name="pop" at={S(84.4)} volume={0.45} />
          <Sfx name="whoosh-soft" at={S(85.1)} volume={0.35} />
          <Sfx name="pop" at={S(85.5)} volume={0.45} />
          <Sfx name="whoosh-soft" at={S(86.2)} volume={0.35} />
          <Sfx name="pop" at={S(86.6)} volume={0.45} />
          <Sfx name="chime" at={S(87.4)} volume={0.5} />
          <Sfx name="pop" at={S(90.1)} volume={0.4} />
          <Sfx name="tick" at={S(90.6)} volume={0.55} />
          <Sfx name="tick" at={S(90.95)} volume={0.55} />
          <Sfx name="click" at={S(91.8)} volume={0.6} />
          <Sfx name="pop" at={S(92.0)} volume={0.45} />
          <Sfx name="tick" at={S(92.6)} volume={0.6} />
          <Sfx name="pop" at={S(94.1)} volume={0.4} />
          <Sfx name="stroke" at={S(94.7)} volume={0.35} />
          <Sfx name="swipe" at={S(95.0)} volume={0.3} />
          <Sfx name="pop" at={S(95.5)} volume={0.45} />
          <Sfx name="stroke" at={S(96.0)} volume={0.4} />
          <Sfx name="chime" at={S(96.2)} volume={0.5} />
        </>
      )}

      {/* ---------- S19 · 食べる → た・て・ない ---------- */}
      <Win T={T} a={82.0} b={89.6} dy={0}>
        <At y={560} style={{opacity: center, transform: `translate(-50%,-50%) scale(${mix(0.6, 1, center) * (1 - 0.08 * focus)})`, flexDirection: 'column', gap: 12}}>
          <Pill color={C.indigoSoft} size={30}>JISHO-KEI</Pill>
          <GCard color={C.indigoSoft} w={560} h={230} glow={0.2}>
            <Jp size={150}>食べる</Jp>
          </GCard>
        </At>
        {FORMS.map((f, i) => {
          const p = pp(T, f.at, SPRING);
          const d = ps(T, f.at, f.at + 0.7);
          const isTa = i === 0;
          const dim = isTa ? 1 : 1 - 0.55 * focus;
          const sc = isTa ? 1 + 0.12 * focus : 1;
          return (
            <React.Fragment key={f.word}>
              <Line d={`M540 690 C540 800 ${f.x} 780 ${f.x} 930`} p={d} color={hexA(f.color, 0.7)} w={6} />
              <At
                x={mix(540, f.x, p)}
                y={mix(600, 1090, p)}
                style={{opacity: p * dim, transform: `translate(-50%,-50%) scale(${mix(0.5, 1, p) * sc})`, flexDirection: 'column', gap: 10}}
              >
                <Pill color={f.color} size={28} filled={isTa && focus > 0.5}>{f.tag}</Pill>
                <GCard color={f.color} w={320} h={190} glow={isTa ? focus : 0} style={{padding: '14px 8px'}}>
                  <Jp size={isTa ? 70 : 62} color={f.color}>{f.word}</Jp>
                </GCard>
              </At>
            </React.Fragment>
          );
        })}
      </Win>
      <Cap t={T} at={87.6} until={89.6} size={54}>
        Satu kata, <Hi>banyak bentuk</Hi>
      </Cap>

      {/* ---------- S20 · pertanyaan: 書く → た形 ---------- */}
      <Win T={T} a={90.0} b={93.7} dy={0}>
        <At y={640} style={{opacity: box, transform: `translate(-50%,-50%) scale(${box})`}}>
          <Surface tone="inset" radius={40} stitch={false} border={C.gold} style={{width: 880, height: 150, display: 'flex', alignItems: 'center', padding: '0 48px', gap: 20}}>
            <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth={2.4} strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 84, color: C.text}}>
              {'書く'.slice(0, word)}
              <span style={{color: C.gold, opacity: Math.sin(T * 12) > 0 ? 1 : 0}}>|</span>
            </span>
          </Surface>
        </At>
        <At y={960} style={{opacity: query, transform: `translate(-50%,-50%) translateY(${(1 - query) * 60}px)`}}>
          <GCard color={C.gold} w={820} h={250} glow={bump(T, 92.0, 93.5)} style={{gap: 22}}>
            <Jp size={96}>書く</Jp>
            <Label size={70} color={C.textSecondary}>→</Label>
            <Jp size={96} color={C.gold}>た形</Jp>
            <Label size={90} color={C.text}>=</Label>
            <span style={{display: 'inline-block', transform: `scale(${qm}) rotate(${(1 - qm) * -40}deg)`}}>
              <Label size={120} color={C.hanko}>?</Label>
            </span>
          </GCard>
        </At>
      </Win>

      {/* ---------- S21 · 書く → 書いた ---------- */}
      <Win T={T} a={94.0} b={97.6} dy={0}>
        <At y={560} style={{opacity: r1, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, r1)})`}}>
          <Jp size={230}>
            書<HL p={h1}>く</HL>
          </Jp>
        </At>
        <Line d="M540 760 V880" p={ar} color={C.indigoSoft} w={8} />
        <Line d="M508 852 L540 890 L572 852" p={ps(T, 95.4, 95.6)} color={C.indigoSoft} w={8} />
        <At y={1080} style={{opacity: r2, transform: `translate(-50%,-50%) translateY(${(1 - r2) * 40}px)`}}>
          <Jp size={230}>
            書<HL p={h2}>いた</HL>
          </Jp>
        </At>
        <At y={1290} style={{opacity: chip, transform: `translate(-50%,-50%) scale(${chip})`}}>
          <Pill color={C.gold} size={42} filled>く → いた</Pill>
        </At>
      </Win>
      <Cap t={T} at={95.9} until={97.6} size={58}>
        Kenapa <Hi>く</Hi> jadi <Hi>いた</Hi>?
      </Cap>
    </AbsoluteFill>
  );
};
