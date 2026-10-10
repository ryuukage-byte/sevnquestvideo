import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {ArrowRight, CheckIcon, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  Avatar,
  BOUNCY,
  Cap,
  GCard,
  Hi,
  Jp,
  Label,
  Line,
  SOFT,
  SPRING,
  Strike,
  VerbSentence,
  Win,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 21;

export const World2_Concept: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // S05
  const lam = pp(T, 21.2, BOUNCY);
  const strike = ps(T, 22.4, 23.0);
  const card = pp(T, 23.9, SPRING);

  // S06
  const c1 = pp(T, 26.3, SOFT);
  const c2 = pp(T, 28.0, BOUNCY);
  const arr = ps(T, 27.2, 27.9);
  const hop = Math.abs(Math.sin(Math.max(0, T - 28.1) * 7)) * 36 * (1 - ps(T, 28.1, 29.6, (x) => x));
  const chk = ps(T, 28.4, 28.9);

  // S07
  const sp = pp(T, 32.1, SOFT);
  const knob = ps(T, 33.0, 34.6, (x) => x * x * (3 - 2 * x));
  const sentence = pp(T, 35.2, BOUNCY);
  const hl = ps(T, 35.5, 36.2);

  // S08
  const hp = pp(T, 37.05, BOUNCY);
  const bar = ps(T, 37.3, 39.0);
  const pct = Math.round(mix(35, 100, bar));
  const beat = 1 + 0.12 * Math.max(0, Math.sin(T * 9)) * ps(T, 38.5, 38.8);

  // S09
  const hgi = pp(T, 40.2, BOUNCY);
  const ab = pp(T, 40.5, SOFT);
  const rise = ps(T, 42.1, 42.8);

  // S10
  const fm = ps(T, 44.3, 45.2);
  const tr = pp(T, 45.7, BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="impact-soft" at={S(21.2)} volume={0.5} />
          <Sfx name="swipe" at={S(22.4)} volume={0.5} />
          <Sfx name="error-soft" at={S(22.9)} volume={0.4} />
          <Sfx name="whoosh-soft" at={S(23.9)} volume={0.4} />
          <Sfx name="pop" at={S(23.95)} volume={0.5} />
          <Sfx name="pop" at={S(26.3)} volume={0.45} />
          <Sfx name="stroke" at={S(27.2)} volume={0.3} />
          <Sfx name="chime" at={S(28.05)} volume={0.5} />
          <Sfx name="pop" at={S(32.1)} volume={0.45} />
          <Sfx name="swipe" at={S(33.0)} volume={0.4} />
          <Sfx name="click" at={S(34.6)} volume={0.6} />
          <Sfx name="impact-soft" at={S(35.2)} volume={0.55} />
          <Sfx name="pop" at={S(37.05)} volume={0.45} />
          <Sfx name="rise" at={S(37.3)} volume={0.3} />
          <Sfx name="success" at={S(39.0)} volume={0.5} />
          <Sfx name="pop" at={S(40.2)} volume={0.45} />
          <Sfx name="pop" at={S(40.5)} volume={0.4} />
          <Sfx name="whoosh-soft" at={S(42.1)} volume={0.35} />
          <Sfx name="success" at={S(42.6)} volume={0.5} />
          <Sfx name="whoosh-soft" at={S(44.3)} volume={0.4} />
          <Sfx name="impact-soft" at={S(45.7)} volume={0.55} />
          <Sfx name="sparkle" at={S(45.8)} volume={0.4} />
        </>
      )}

      {/* ---------- S05 · bukan cuma lampau ---------- */}
      <Win T={T} a={21.0} b={25.7} dy={0}>
        <At y={640} style={{opacity: lam * (1 - 0.55 * ps(T, 24.0, 24.6)), transform: `translate(-50%,-50%) scale(${mix(0.7, 1, lam)})`}}>
          <Strike p={strike}>
            <Label size={210} color={C.text} style={{fontWeight: 900, letterSpacing: 4}}>LAMPAU</Label>
          </Strike>
        </At>
        <At y={1060} style={{opacity: card, transform: `translate(-50%,-50%) translateY(${(1 - card) * 260}px)`}}>
          <GCard color={C.gold} glow={card} w={860} style={{flexDirection: 'column', gap: 14, padding: '44px 40px'}}>
            <Jp size={150} color={C.gold}>た</Jp>
            <Label size={62}>bukan cuma “<Hi>lampau</Hi>”</Label>
          </GCard>
        </At>
      </Win>
      <Cap t={T} at={24.5} until={25.6}>
        <Hi>た</Hi> ≠ hanya “lampau”
      </Cap>

      {/* ---------- S06 · membayangkan tindakan sudah dilakukan ---------- */}
      <Win T={T} a={26.0} b={31.7} dy={0}>
        <At y={430} style={{opacity: c1, transform: `translate(-50%,-50%) scale(${c1})`, flexDirection: 'column', gap: 6}}>
          <Pill color={C.indigoSoft} size={36}>TINDAKAN</Pill>
          <Jp size={120} color={C.indigoSoft}>食べる</Jp>
        </At>
        <Line d="M540 560 V690" p={arr} color={C.gold} w={8} />
        <Line d="M508 664 L540 700 L572 664" p={ps(T, 27.7, 27.95)} color={C.gold} w={8} />
        <At y={850} style={{opacity: c2, transform: `translate(-50%,-50%) scale(${c2})`, flexDirection: 'column', gap: 6}}>
          <Pill color={C.matcha} size={36}>SELESAI</Pill>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Jp size={120} color={C.gold}>食べた</Jp>
            <span style={{color: C.matcha}}>
              <CheckIcon size={90} draw={chk} stroke={4} />
            </span>
          </div>
        </At>
        <At y={1240} style={{opacity: c1, transform: `translate(-50%,-50%) translateY(${-hop}px)`}}>
          <Avatar tier={4} height={460} />
        </At>
      </Win>
      <Cap t={T} at={26.6} until={31.6} size={58}>
        Bayangkan tindakannya <Hi>SUDAH</Hi> dilakukan
      </Cap>

      {/* ---------- S07 · belum makan → sudah makan ---------- */}
      <Win T={T} a={32.0} b={36.8} dy={0}>
        <At x={300} y={620} style={{opacity: sp * mix(1, 0.4, knob), transform: `translate(-50%,-50%) scale(${sp})`}}>
          <GCard color={C.textMuted} w={420} h={170}><Label size={44} color={C.textSecondary}>BELUM MAKAN</Label></GCard>
        </At>
        <At x={780} y={620} style={{opacity: sp * mix(0.45, 1, knob), transform: `translate(-50%,-50%) scale(${sp})`}}>
          <GCard color={C.gold} w={420} h={170} glow={knob}><Label size={44} color={C.gold}>SUDAH MAKAN</Label></GCard>
        </At>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: sp}}>
          <rect x={270} y={830} width={540} height={22} rx={11} fill="rgba(255,255,255,0.12)" />
          <rect x={270} y={830} width={540 * knob} height={22} rx={11} fill={C.gold} />
          <circle cx={270 + 540 * knob} cy={841} r={34} fill={C.goldSoft} stroke={C.gold} strokeWidth={6} />
        </svg>
        {T >= 35.2 && (
          <At y={1130} style={{opacity: sentence, transform: `translate(-50%,-50%) scale(${mix(0.75, 1, sentence)})`}}>
            <VerbSentence kanji="食" ruby="た" kana="べ" end="ta" size={118} hlVerb={hl} hlEnd={hl} />
          </At>
        )}
      </Win>

      {/* ---------- S08 · hasil yang dibayangkan ---------- */}
      <Win T={T} a={37.0} b={39.7} dy={0}>
        <At y={560} style={{opacity: hp, transform: `translate(-50%,-50%) scale(${hp * beat})`}}>
          <svg width={240} height={240} viewBox="0 0 100 100" style={{filter: `drop-shadow(0 0 24px ${hexA(C.hanko, 0.55)})`}}>
            <path d="M50 88C20 66 8 48 8 32A21 21 0 0 1 50 24A21 21 0 0 1 92 32C92 48 80 66 50 88Z" fill={C.hanko} />
          </svg>
        </At>
        <At y={810} style={{opacity: hp}}>
          <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 110, color: C.text, fontVariantNumeric: 'tabular-nums', minWidth: 330, textAlign: 'center', textShadow: '0 8px 30px rgba(0,0,0,0.8)'}}>
            {pct}%
          </span>
        </At>
        <At y={950} style={{opacity: hp}}>
          <Surface tone="inset" radius={28} stitch={false} style={{width: 820, height: 56, overflow: 'hidden'}}>
            <div style={{width: `${pct}%`, height: '100%', borderRadius: 28, background: `linear-gradient(90deg, ${C.matcha}, ${C.gold})`}} />
          </Surface>
        </At>
        <At y={1130} style={{gap: 60, opacity: ps(T, 38.2, 38.6)}}>
          <span style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Label size={64}>kenyang</Label>
            <span style={{color: C.matcha}}><CheckIcon size={70} draw={ps(T, 38.4, 38.8)} stroke={4} /></span>
          </span>
          <span style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Label size={64}>sehat</Label>
            <span style={{color: C.matcha}}><CheckIcon size={70} draw={ps(T, 38.8, 39.2)} stroke={4} /></span>
          </span>
        </At>
      </Win>

      {/* ---------- S09 · ほうがいい = pilihan itu lebih baik ---------- */}
      <Win T={T} a={40.0} b={43.7} dy={0}>
        <At y={430} style={{opacity: hgi, transform: `translate(-50%,-50%) scale(${mix(1.4, 1, hgi)})`}}>
          <Jp size={140} color={C.gold}>ほうがいい</Jp>
        </At>
        <At x={300} y={900 + 0} style={{opacity: ab, transform: `translate(-50%,-50%) scale(${ab})`}}>
          <GCard color={C.textMuted} w={380} h={380} glow={0}><Label size={190} color={C.textSecondary} style={{fontWeight: 900}}>A</Label></GCard>
        </At>
        <At x={780} y={900} style={{opacity: ab, transform: `translate(-50%,-50%) translateY(${-60 * rise}px) scale(${ab * (1 + 0.08 * rise)})`}}>
          <GCard color={C.gold} w={380} h={380} glow={rise}>
            <Label size={190} color={C.gold} style={{fontWeight: 900}}>B</Label>
            <div style={{position: 'absolute', right: -18, top: -18, width: 84, height: 84, borderRadius: 42, background: C.matcha, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: rise, transform: `scale(${rise})`, color: '#fff'}}>
              <CheckIcon size={52} stroke={4.5} />
            </div>
          </GCard>
        </At>
      </Win>
      <Cap t={T} at={41.2} until={43.7} size={56}>
        <Hi>ほうがいい</Hi>
        <br />
        = pilihan itu lebih baik
      </Cap>

      {/* ---------- S10 · makna natural ---------- */}
      <Win T={T} a={44.0} b={48.6} dy={0}>
        <At y={mix(800, 360, fm)} style={{transform: `translate(-50%,-50%) scale(${mix(1, 0.78, fm)})`, opacity: mix(0.2, 1, ps(T, 44.0, 44.4)) * mix(1, 0.8, fm)}}>
          <VerbSentence kanji="食" ruby="た" kana="べ" end="ta" size={118} hlVerb={1} hlEnd={0.4} />
        </At>
        <Line d="M540 500 V640" p={ps(T, 45.0, 45.6)} color={C.gold} w={8} />
        <Line d="M508 612 L540 650 L572 612" p={ps(T, 45.5, 45.7)} color={C.gold} w={8} />
        <At y={940} style={{opacity: tr, transform: `translate(-50%,-50%) scale(${mix(0.6, 1, tr)})`}}>
          <Label size={140} color={C.gold} style={{fontWeight: 900, textShadow: `0 0 60px ${hexA(C.gold, 0.5)}, 0 10px 30px rgba(0,0,0,0.7)`}}>
            Sebaiknya
          </Label>
        </At>
        <At y={1110} style={{opacity: tr, transform: `translate(-50%,-50%) scale(${mix(0.6, 1, tr)})`}}>
          <Label size={140} color={C.text} style={{fontWeight: 900}}>makan.</Label>
        </At>
        <At y={1290} style={{opacity: ps(T, 46.6, 47.2), gap: 16}}>
          <Pill color={C.matcha} size={32}>SARAN</Pill>
          <span style={{color: C.textSecondary}}><ArrowRight size={40} /></span>
          <Pill color={C.gold} size={32}>PILIHAN LEBIH BAIK</Pill>
        </At>
      </Win>
    </AbsoluteFill>
  );
};
