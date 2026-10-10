import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  BOUNCY,
  Cap,
  EASE_IN,
  Formula,
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

const START = 66;

const Node: React.FC<{p: number; y: number; color: string; label: string; sub?: string; glow?: number}> = ({
  p,
  y,
  color,
  label,
  sub,
  glow = 0,
}) => (
  <At y={y} style={{opacity: p, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, p)}) translateY(${(1 - p) * 30}px)`}}>
    <GCard color={color} w={800} h={180} glow={glow} style={{flexDirection: 'column', gap: 6}}>
      <Label size={58} color={color}>{label}</Label>
      {sub && <Label size={34} color={C.textSecondary} style={{fontWeight: 600}}>{sub}</Label>}
    </GCard>
  </At>
);

export const World4_Core: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // S15 — reset / hard zoom
  const dark = ps(T, 66.0, 66.4) * (1 - ps(T, 69.0, 69.5));
  const jadi = pp(T, 66.2, SOFT);
  const hit = ps(T, 67.2, 67.45, EASE_IN);
  const zoom = mix(0.55, 1, hit) * (1 + 0.1 * ps(T, 67.5, 69.0, (x) => x));
  const ken = pp(T, 67.35, BOUNCY);

  // S16 — diagram
  const n1 = pp(T, 69.4, SPRING);
  const l1 = ps(T, 70.2, 70.9);
  const n2 = pp(T, 70.9, SPRING);
  const l2 = ps(T, 71.7, 72.4);
  const n3 = pp(T, 72.4, SPRING);

  // S17 — formula
  const card = pp(T, 74.1, SOFT);
  const vta = pp(T, 74.5, BOUNCY);
  const plus = ps(T, 75.2, 75.5);
  const hou = pp(T, 75.7, BOUNCY);
  const comb = ps(T, 77.4, 77.9);
  const glow = bump(T, 77.4, 79.0);

  // S18 — meaning
  const up = ps(T, 80.0, 80.7);
  const m1 = pp(T, 80.6, SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="rise" at={S(66.2)} volume={0.35} />
          <Sfx name="pop" at={S(66.3)} volume={0.45} />
          <Sfx name="impact" at={S(67.3)} volume={0.55} />
          <Sfx name="pop" at={S(69.4)} volume={0.45} />
          <Sfx name="stroke" at={S(70.2)} volume={0.3} />
          <Sfx name="pop" at={S(70.9)} volume={0.45} />
          <Sfx name="stroke" at={S(71.7)} volume={0.3} />
          <Sfx name="chime" at={S(72.4)} volume={0.55} />
          <Sfx name="pop" at={S(74.1)} volume={0.4} />
          <Sfx name="pop" at={S(74.5)} volume={0.45} />
          <Sfx name="pop" at={S(75.7)} volume={0.45} />
          <Sfx name="click" at={S(77.4)} volume={0.7} />
          <Sfx name="sparkle" at={S(77.5)} volume={0.5} />
          <Sfx name="whoosh-soft" at={S(80.0)} volume={0.4} />
          <Sfx name="pop" at={S(80.6)} volume={0.5} />
        </>
      )}

      {/* ---------- S15 · Jadi… kenapa た? ---------- */}
      <AbsoluteFill
        style={{
          opacity: dark,
          background: 'radial-gradient(70% 50% at 50% 46%, rgba(6,8,13,0.72) 0%, rgba(4,5,9,0.93) 100%)',
        }}
      />
      <Win T={T} a={66.0} b={68.9} dy={0} outD={0.5}>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 48%'}}>
          <At y={640} style={{opacity: jadi}}>
            <Label size={120} color={C.textSecondary} style={{fontWeight: 600}}>Jadi…</Label>
          </At>
          <At y={920} style={{opacity: ken, gap: 22, alignItems: 'baseline', transform: `translate(-50%,-50%) scale(${mix(0.7, 1, ken)})`}}>
            <Label size={170} color={C.text} style={{fontWeight: 900}}>kenapa</Label>
          </At>
          <At y={1250} style={{opacity: ken, transform: `translate(-50%,-50%) scale(${mix(0.4, 1, ken)})`}}>
            <Jp size={460} color={C.gold} style={{textShadow: `0 0 90px ${hexA(C.gold, 0.5)}`}}>た</Jp>
            <span style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 300, color: C.hanko, marginLeft: 12, transform: 'rotate(8deg)', display: 'inline-block'}}>?</span>
          </At>
        </div>
      </Win>

      {/* ---------- S16 · diagram logika ---------- */}
      <Win T={T} a={69.2} b={73.8} dy={0}>
        <Node p={n1} y={500} color={C.indigoSoft} label="TINDAKAN" sub="食べる" />
        <Line d="M540 600 V740" p={l1} color={C.gold} w={8} />
        <Line d="M508 714 L540 752 L572 714" p={ps(T, 70.7, 70.9)} color={C.gold} w={8} />
        <Node p={n2} y={860} color={C.gold} label="DIBAYANGKAN SELESAI" sub="食べた" />
        <Line d="M540 960 V1100" p={l2} color={C.matcha} w={8} />
        <Line d="M508 1074 L540 1112 L572 1074" p={ps(T, 72.2, 72.4)} color={C.matcha} w={8} />
        <Node p={n3} y={1220} color={C.matcha} label="DINILAI HASILNYA" sub="ほうがいい" glow={bump(T, 72.4, 73.8)} />
      </Win>
      <Cap t={T} at={72.6} until={73.8} size={50} y={1470}>
        Tindakan → <Hi>sudah dilakukan</Hi> → nilai hasil
      </Cap>

      {/* ---------- S17–18 · rumus + makna ---------- */}
      <Win T={T} a={74.0} b={81.7} dy={0} outD={0.25}>
        <At y={mix(800, 520, up)} style={{opacity: card, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, card) * mix(1, 0.88, up)})`}}>
          <Surface
            tone="elevated"
            radius={56}
            border={hexA(C.gold, 0.6 + 0.4 * glow)}
            style={{
              width: 940,
              height: 560,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 28px 70px rgba(0,0,0,0.65), 0 0 ${90 * glow}px ${hexA(C.gold, 0.4 * glow)}`,
            }}
          >
            <div style={{position: 'absolute', top: 36, left: 48}}>
              <Pill color={C.matcha} size={22}>BUNPOU QUEST · RUMUS</Pill>
            </div>
            <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 1 - comb, transform: `scale(${1 - 0.2 * comb})`, filter: `blur(${comb * 6}px)`}}>
              <div style={{opacity: vta, transform: `translateX(${(1 - vta) * -260}px)`}}>
                <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 130, color: C.text}}>V<Jp size={130} color={C.gold} style={{display: 'inline'}}>た</Jp></span>
              </div>
              <div style={{opacity: plus}}>
                <Label size={80} color={C.textSecondary}>+</Label>
              </div>
              <div style={{opacity: hou, transform: `translateX(${(1 - hou) * 260}px)`}}>
                <Jp size={120}>ほうがいい</Jp>
              </div>
            </div>
            <div style={{position: 'absolute', opacity: comb, transform: `scale(${mix(0.8, 1, comb) + 0.06 * glow})`}}>
              <Formula end="ta" size={96} />
            </div>
          </Surface>
        </At>
        <At y={1010} style={{opacity: ps(T, 80.5, 81.0) , transform: `translate(-50%,-50%) translateY(${(1 - m1) * 40}px)`, flexDirection: 'column', gap: 16}}>
          <Label size={72}>Kalau dilakukan,</Label>
          <Label size={72} color={C.gold}>hasilnya mungkin lebih baik</Label>
        </At>
      </Win>
    </AbsoluteFill>
  );
};
