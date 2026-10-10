import React from 'react';
import {interpolateColors} from 'remotion';
import {Surface} from '../../../shared/components/ui';
import {C, FONT, FPS} from '../../../shared/theme';
import {heroPose} from '../PatternHero';
import {At, BOUNCY, Big, EASE, EASE_IN, EASE_IO, GKey, Glyphs, Kana, Threads, bump, glyphPoses, hexA, mix, ps, segBox, sp, useF} from '../kit';
import {SituationCard} from '../props';

// S03 pola diperkenalkan → S04 dua situasi dihubungkan ke pola → S05 formula て／で + しまう
// → S06 てしまう→ちゃう → S07 でしまう→じゃう. Satu komposisi yang terus berubah, bukan lima slide.

const SLOT = {a: {x: 280, y: 870}, b: {x: 800, y: 870}, w: 390, h: 250};
const DE = C.indigoSoft; // keluarga で

// しまう lahir di blok formula (15.3), lalu maju menjadi ekor 食べてしまう (16.2) dan memendek jadi ちゃう (20.0).
const ROW1: GKey[] = [
  {at: 15.3, dur: 0.45, row: ['shi', 'ma', 'u'], size: 104, cx: SLOT.b.x, cy: 898, enter: [620, 0]},
  {at: 16.2, dur: 0.5, row: ['ta', 'be', 'te', 'shi', 'ma', 'u'], size: 120, cy: 800, enter: [-280, 0], stagger: 0.05},
  {
    at: 20.0,
    row: ['ta', 'be', 'cha', 'ya', 'u'],
    size: 120,
    cy: 800,
    snap: true,
    from: {cha: {x: 600, y: 800, s: 36}, ya: {x: 600, y: 800, s: 36}},
    to: {te: {x: 600, y: 800, s: 36}, shi: {x: 600, y: 800, s: 36}, ma: {x: 600, y: 800, s: 36}},
  },
  {at: 20.42, dur: 0.5, row: ['ta', 'be', 'cha', 'ya', 'u'], size: 104, cy: 720},
];
const ROW2: GKey[] = [
  {at: 20.6, dur: 0.45, row: ['no', 'n', 'de', 'shi', 'ma', 'u'], size: 104, cy: 1090, enter: [0, 70], stagger: 0.04},
  {
    at: 22.05,
    row: ['no', 'n', 'ji', 'ya', 'u'],
    size: 104,
    cy: 1090,
    snap: true,
    from: {ji: {x: 592, y: 1090, s: 32}, ya: {x: 592, y: 1090, s: 32}},
    to: {de: {x: 592, y: 1090, s: 32}, shi: {x: 592, y: 1090, s: 32}, ma: {x: 592, y: 1090, s: 32}},
  },
];
const CH1 = {ta: {ch: '食', ruby: 'た'}, be: {ch: 'べ'}, te: {ch: 'て'}, shi: {ch: 'し'}, ma: {ch: 'ま'}, u: {ch: 'う'}, cha: {ch: 'ち'}, ya: {ch: 'ゃ'}};
const CH2 = {no: {ch: '飲', ruby: 'の'}, n: {ch: 'ん'}, de: {ch: 'で'}, shi: {ch: 'し'}, ma: {ch: 'ま'}, u: {ch: 'う'}, ji: {ch: 'じ'}, ya: {ch: 'ゃ'}};
const TAIL1 = ['te', 'shi', 'ma', 'u', 'cha', 'ya'];
const TAIL2 = ['de', 'shi', 'ma', 'u', 'ji', 'ya'];

const Highlight: React.FC<{box: ReturnType<typeof segBox>; color: string; o: number}> = ({box, color, o}) =>
  !box || o <= 0.01 ? null : (
    <div
      style={{
        position: 'absolute',
        left: box.x0 - 6,
        top: box.y - box.s * 0.62,
        width: box.x1 - box.x0 + 12,
        height: box.s * 1.24,
        borderRadius: box.s * 0.2,
        background: hexA(color, 0.13),
        borderBottom: `6px solid ${color}`,
        boxShadow: `0 0 34px ${hexA(color, 0.22)}`,
        boxSizing: 'border-box',
        opacity: o,
      }}
    />
  );

export const Act2_Pattern: React.FC = () => {
  const f = useF();
  const hero = heroPose(f);


  // ── S04: dua situasi → slot formula ──
  const toSlot = ps(f, 10.75, 11.4, EASE_IO);
  const nudge = ps(f, 10.2, 10.6, EASE_IO) * (1 - toSlot);
  const card = (enterAt: number, x0: number, slot: {x: number; y: number}) => {
    const p = sp(f, enterAt);
    return {
      p,
      x: mix(x0, slot.x, toSlot),
      y: mix(mix(1200, 1060, p) - nudge * 34, slot.y, toSlot),
      w: mix(400, SLOT.w, toSlot),
      h: mix(360, SLOT.h, toSlot),
      s: mix(0.6, 1, p),
    };
  };
  const cardK = card(9.0, 290, SLOT.a);
  const cardC = card(9.15, 790, SLOT.b);
  const artO = 1 - ps(f, 10.75, 11.0);
  const linkP = ps(f, 9.55, 10.15, EASE_IO);
  const linkO = 1 - ps(f, 10.65, 10.9);

  // ── S05: formula ──
  const aIn = ps(f, 12.2, 12.65, EASE);
  const bIn = ps(f, 15.3, 15.75, EASE);
  const aOut = ps(f, 16.15, 16.6, EASE_IN);
  const bOut = ps(f, 16.1, 16.45);
  const plus = sp(f, 14.95, BOUNCY) * (1 - ps(f, 16.1, 16.3));
  const bracket = ps(f, 15.65, 16.05, EASE_IO);
  const bracketO = 1 - ps(f, 16.1, 16.4);
  const ghostA = ps(f, 11.1, 11.4) * (1 - aIn);
  const ghostB = ps(f, 11.1, 11.4) * (1 - bIn);

  // ── S06–S07: bentuk kasual ──
  const p1 = glyphPoses(ROW1, f);
  const p2 = glyphPoses(ROW2, f);
  const hl1 = ps(f, 18.1, 18.4);
  const hl2 = ps(f, 21.0, 21.3);
  const col1 = (id: string) =>
    id === 'cha' || id === 'ya' ? C.gold : TAIL1.indexOf(id) >= 0 ? interpolateColors(hl1, [0, 1], [C.text, C.gold]) : C.text;
  const col2 = (id: string) =>
    id === 'ji' || id === 'ya' ? DE : TAIL2.indexOf(id) >= 0 ? interpolateColors(hl2, [0, 1], [C.text, DE]) : C.text;
  const casual = sp(f, 16.9) * (1 - ps(f, 22.85, 23.1));
  const backing = ps(f, 22.8, 23.05);
  const leave = ps(f, 23.05, 23.6, EASE_IN);
  const groupS = 1 - 0.08 * backing;

  const showSituations = f >= 9.0 * FPS && f < 15.8 * FPS;
  const heroBottom = hero.y + hero.size;

  return (
    <>

      {/* S04 — benang dari situasi ke pola */}
      {showSituations && (
        <Threads
          lines={[
            {from: [cardK.x, cardK.y - cardK.h / 2], to: [400, heroBottom], p: linkP, o: linkO},
            {from: [cardC.x, cardC.y - cardC.h / 2], to: [680, heroBottom], p: linkP, o: linkO},
          ]}
        />
      )}
      {showSituations &&
        ([
          ['key', cardK, ghostA],
          ['cake', cardC, ghostB],
        ] as const).map(([kind, c, ghost]) => {
          const o = Math.min(1, c.p * 2) * (toSlot < 1 ? 1 : ghost);
          return (
            <At key={kind} x={c.x} y={c.y} s={c.s} o={o}>
              <SituationCard kind={kind} w={c.w} h={c.h} artO={artO} art={0.95} dashed={toSlot > 0.45} />
            </At>
          );
        })}

      {/* S05 — KATA KERJA て／で + しまう */}
      {f >= 12.1 * FPS && aOut < 1 && (
        <At x={mix(-320, SLOT.a.x, aIn) - aOut * 700} y={SLOT.a.y} o={1 - aOut}>
          <Surface tone="card" radius={36} style={{width: SLOT.w, height: SLOT.h, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 27, letterSpacing: 2, color: C.textSecondary}}>KATA KERJA BENTUK</span>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Kana ch="て" size={108} color={C.gold} glow={bump(f, 13.05, 13.8)} style={{transform: `scale(${1 + 0.14 * bump(f, 13.05, 13.8)})`}} />
              <span style={{fontFamily: FONT.jp, fontWeight: 700, fontSize: 64, color: C.textMuted, margin: '0 -6px'}}>／</span>
              <Kana ch="で" size={108} color={DE} style={{transform: `scale(${1 + 0.14 * bump(f, 14.25, 15.0)})`, textShadow: `0 0 ${30 * bump(f, 14.25, 15.0)}px ${hexA(DE, 0.7)}, 0 6px 18px rgba(0,0,0,0.7)`}} />
            </div>
          </Surface>
        </At>
      )}
      <At x={540} y={SLOT.a.y} s={plus} o={Math.min(1, plus * 2)}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            background: `linear-gradient(180deg, ${C.goldSoft}, ${C.gold})`,
            boxShadow: `0 6px 0 ${C.goldShadow}, 0 14px 24px rgba(0,0,0,0.5)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 70,
            lineHeight: 1,
            color: '#3a2a05',
          }}
        >
          +
        </div>
      </At>
      {f >= 15.2 * FPS && bOut < 1 && (
        <At x={mix(SLOT.b.x + 620, SLOT.b.x, bIn)} y={SLOT.b.y} o={1 - bOut}>
          <Surface tone="card" radius={36} style={{width: SLOT.w, height: SLOT.h, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 27, letterSpacing: 2, color: C.textSecondary}}>DITAMBAH</span>
          </Surface>
        </At>
      )}
      {bracket > 0.001 && bracketO > 0.001 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: bracketO}}>
          <path d="M90 730V700H990V730" fill="none" stroke={C.gold} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, bracket * 1.6)} />
          <path d="M540 700V456" fill="none" stroke={C.gold} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.max(0, bracket * 2.2 - 1.2)} />
        </svg>
      )}

      {/* S06–S07 — bentuk percakapan santai */}
      <At y={560} s={0.7 + 0.3 * casual} o={Math.min(1, casual * 2)}>
        <Big size={46} color={C.matcha} style={{letterSpacing: 3}}>
          PERCAKAPAN SANTAI
        </Big>
      </At>
      <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 712px', transform: `translateX(${-leave * 1100}px) scale(${groupS})`}}>
        <At y={712} o={backing}>
          <Surface tone="card" radius={40} style={{width: 800, height: 240}} />
        </At>
        <Highlight box={segBox(p1, TAIL1)} color={C.gold} o={hl1} />
        <Glyphs poses={p1} chars={CH1} color={col1} />

      </div>
      {f >= 20.5 * FPS && (
        <div style={{position: 'absolute', inset: 0, transformOrigin: '540px 1082px', transform: `translateX(${leave * 1100}px) scale(${groupS})`}}>
          <At y={1082} o={backing}>
            <Surface tone="card" radius={40} style={{width: 800, height: 240}} />
          </At>
          <Highlight box={segBox(p2, TAIL2)} color={DE} o={hl2} />
          <Glyphs poses={p2} chars={CH2} color={col2} />

        </div>
      )}
    </>
  );
};
