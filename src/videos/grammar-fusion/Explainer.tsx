import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Avatar} from '../../shared/components/Avatar';
import {EASE, EASE_IO, prog} from '../../shared/anim';
import {C, FONT} from '../../shared/theme';
import {
  Bracket,
  Card,
  GlyphLine,
  Key,
  MeaningLine,
  Pill,
  SEG,
  StaticRow,
  Txt,
  colorAt,
  fadeIO,
  layoutPoses,
  lerp,
  poseAt,
  riseStyle,
  segBox,
  springAt,
} from './kit';
import {T} from './timing';

const G = C.gold;
const R = C.hanko;
const B = C.indigoSoft;
const W = C.text;
const JP_MIX = `${FONT.display}, "Noto Serif JP"`;

// ── Rak komponen: potongan grammar menunggu di sini sampai gilirannya dipasang ──
const TRAY_Y = 1345;
const CHIP_S = 46;
const CHIPS = {
  nai: {cx: 235, ids: ['na1', 'i1'], used: T(22.6)},
  nakereba: {cx: 520, ids: ['na1', 'ke', 're', 'ba'], used: T(34.4)},
  naranai: {cx: 830, ids: ['na2', 'ra', 'na3', 'i2'], used: T(52.0)},
};
const chipSlot = (chip: keyof typeof CHIPS, id: string) => {
  const c = CHIPS[chip];
  const i = c.ids.indexOf(id);
  return {x: c.cx + (i - (c.ids.length - 1) / 2) * CHIP_S, y: TRAY_Y, s: CHIP_S};
};
const slots = (chip: keyof typeof CHIPS, ids: string[]) =>
  Object.fromEntries(ids.map((id) => [id, chipSlot(chip, id)]));

// ── Satu konstruksi yang berevolusi sepanjang video ──
const HOOK = [SEG.cond, SEG.naranai];
const S0_SPLIT = {lines: [['ben', 'kyo', '_', 'su', 'ru']], size: 170, gap: 120, cy: 560};
const S1 = {lines: [['ben', 'kyo', 'shi', 'na1', 'i1']], size: 164, cy: 560};

const HERO: Key[] = [
  {at: T(0.25), L: {lines: HOOK, size: 128, cy: 560}, stagger: 2, dur: 16, enter: [0, 70]},
  {at: T(8.7), L: {lines: HOOK, size: 96, cy: 380}, dur: 20},
  // dibongkar jadi komponen
  {
    at: T(12.2),
    L: {lines: [['ben', 'kyo', '_', 'shi', '_', 'na1', 'ke', 're', 'ba'], SEG.naranai], size: 100, gap: 44, cy: 440},
    dur: 18,
  },
  // komponen pindah ke rak; 勉強 tinggal sebagai dasar
  {
    at: T(13.3),
    L: {...S0_SPLIT, hide: ['su', 'ru']},
    dur: 22,
    to: {...slots('nakereba', SEG.nakereba), ...slots('naranai', SEG.naranai)},
  },
  {at: T(14.6), L: S0_SPLIT, enter: [240, 0], stagger: 2, dur: 16},
  {at: T(16.5), L: {lines: [['ben', 'kyo', 'su', 'ru']], size: 180, cy: 560}, snap: true},
  // する → しない
  {
    at: T(22.6),
    L: S1,
    dur: 20,
    from: {shi: {...layoutPoses(S1).shi, y: 560 - 150}, ...slots('nai', SEG.nai)},
  },
  // ない → なければ (な tetap di tempat)
  {at: T(34.4), L: {lines: [SEG.cond], size: 128, cy: 560}, dur: 20, from: slots('nakereba', ['ke', 're', 'ba'])},
  // + ならない: mendekat, lalu menyatu
  {
    at: T(52.0),
    L: {lines: [[...SEG.cond, '_', ...SEG.naranai]], size: 80, gap: 60, cy: 560},
    dur: 22,
    from: slots('naranai', SEG.naranai),
  },
  {at: T(52.9), L: {lines: [SEG.full], size: 84, cy: 560}, snap: true},
  {at: T(61.0), L: {lines: [SEG.full], size: 84, cy: 330}, dur: 22},
  {at: T(77.7), L: {lines: HOOK, size: 128, cy: 500}, dur: 24},
  {at: T(82.9), L: {lines: HOOK, size: 100, cy: 400}, dur: 20},
  {
    at: T(88.8),
    L: {lines: [['ben', 'kyo', 'shi', '_', ...SEG.nakereba, '_', ...SEG.naranai]], size: 74, gap: 50, cy: 420},
    dur: 22,
  },
  {at: T(93.6), L: {lines: [SEG.full], size: 84, cy: 420}, snap: true},
  // jadi anak tangga terakhir dari perjalanan pola
  {at: T(95.4), L: {lines: [SEG.full], size: 60, x0: 150, cy: 1130}, dur: 24},
];

const heroColor = (id: string, f: number) => {
  const ladder: [number, string] = [T(95.5), SEG.naranai.includes(id) ? G : W];
  if (SEG.tailNai.includes(id))
    return colorAt(f, [[0, G], [T(3.4), R], [T(12.2), G], [T(56.3), R], [T(75.2), G], [T(83.3), R], [T(86.5), G], [T(88.9), R], [T(91.6), G], ladder]);
  if (SEG.naranai.includes(id)) return colorAt(f, [[0, G], [T(56.3), R], [T(75.2), G], [T(88.9), R], [T(91.6), G], ladder]);
  if (id === 'na1' || id === 'i1')
    return colorAt(f, [[0, G], [T(25.5), R], [T(31.6), G], [T(33.2), R], [T(34.6), B], [T(37.6), G], [T(39.2), B], [T(47.4), G], [T(54.5), B], [T(75.2), G], [T(88.9), B], [T(91.6), G], ladder]);
  if (['ke', 're', 'ba'].includes(id))
    return colorAt(f, [[0, B], [T(37.6), G], [T(39.2), B], [T(47.4), G], [T(54.5), B], [T(75.2), G], [T(88.9), B], [T(91.6), G], ladder]);
  return colorAt(f, [[0, G], [T(54.5), B], [T(75.2), G], ladder]);
};

const heroGlow = (id: string, f: number) => {
  if (SEG.suru.includes(id)) return fadeIO(f, T(21.4), T(22.7), 8, 4) * 0.8;
  if (SEG.naranai.includes(id)) return fadeIO(f, T(52.0), T(54.2), 10, 14) * 0.7 + fadeIO(f, T(75.2), T(81.8), 8, 20) * 0.45;
  return fadeIO(f, T(75.2), T(81.8), 8, 20) * 0.45;
};

// ───────────────────────────── bagian-bagian ─────────────────────────────

const Tray: React.FC<{f: number}> = ({f}) => {
  const o = fadeIO(f, T(13.5), T(60.7), 12, 10);
  if (o <= 0) return null;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: o}}>
      <Txt x={540} y={1272} size={21} font={FONT.mono} weight={700} color={C.textMuted} spacing={4}>
        KOMPONEN GRAMMAR
      </Txt>
      {(Object.keys(CHIPS) as (keyof typeof CHIPS)[]).map((k, i) => {
        const c = CHIPS[k];
        const used = prog(f, c.used, 8, (t) => t);
        const inP = springAt(f, T(13.6) + i * 4);
        const pulse = fadeIO(f, c.used - 34, c.used, 10, 2) * (0.5 + 0.5 * Math.sin(f / 3.2));
        const w = c.ids.length * CHIP_S + 60;
        return (
          <React.Fragment key={k}>
            <Card
              x={c.cx}
              y={TRAY_Y}
              w={w}
              h={88}
              radius={22}
              fill={C.elevated}
              accent={pulse > 0.02 ? G : undefined}
              glow={pulse}
              opacity={inP * (1 - used)}
              scale={0.9 + 0.1 * inP + pulse * 0.04}
            />
            <Card x={c.cx} y={TRAY_Y} w={w} h={88} radius={22} dashed opacity={used * 0.55} />
            <StaticRow
              ids={c.ids}
              size={CHIP_S}
              x0={c.cx - (c.ids.length * CHIP_S) / 2}
              cy={TRAY_Y}
              color={() => G}
              opacity={inP * (1 - used)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const StagePill: React.FC<{f: number}> = ({f}) => {
  const stages: [number, string, string][] = [
    [T(16.7), 'BENTUK KAMUS', G],
    [T(23.0), 'BENTUK NAI · NEGATIF', R],
    [T(34.8), 'BENTUK KONDISIONAL', B],
    [T(53.1), 'POLA KEWAJIBAN', G],
  ];
  return (
    <>
      {stages.map(([at, label, color], i) => {
        const end = stages[i + 1]?.[0] ?? T(60.7);
        const o = fadeIO(f, at, end + 4, 8, 6);
        if (o <= 0) return null;
        return (
          <Pill key={label} x={540} y={400} color={color} size={26} opacity={o} scale={0.85 + 0.15 * springAt(f, at, true)} filled={i === 3}>
            {label}
          </Pill>
        );
      })}
    </>
  );
};

/** Tag fungsi di bawah segmen: "ない = TIDAK". */
const FnTag: React.FC<{
  f: number;
  box: ReturnType<typeof segBox>;
  a: number;
  b: number;
  color: string;
  jp: string;
  meaning: string;
}> = ({f, box, a, b, color, jp, meaning}) => {
  const o = fadeIO(f, T(a), T(b), 6, 8);
  if (o <= 0 || !box) return null;
  const p = springAt(f, T(a));
  return (
    <div style={{opacity: o}}>
      <Bracket box={box} color={color} p={p} />
      <div
        style={{
          position: 'absolute',
          left: Math.min(Math.max(box.cx, 250), 830),
          top: box.b + 78,
          transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * p})`,
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          padding: '12px 30px 14px',
          borderRadius: 20,
          background: `${color}22`,
          border: `2px solid ${color}88`,
          whiteSpace: 'nowrap',
          opacity: Math.min(1, p * 1.5),
        }}
      >
        <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 46, color}}>{jp}</span>
        <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 40, color: W}}>= {meaning}</span>
      </div>
    </div>
  );
};

const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; p: number; color?: string; opacity?: number}> = ({
  x1,
  y1,
  x2,
  y2,
  p,
  color = C.textSecondary,
  opacity = 1,
}) => {
  if (p <= 0.001 || opacity <= 0.001) return null;
  const ex = lerp(x1, x2, p);
  const ey = lerp(y1, y2, p);
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 18;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity}}>
      <path d={`M${x1} ${y1} L${ex} ${ey}`} stroke={color} strokeWidth={6} strokeLinecap="round" />
      <path
        d={`M${ex - h * Math.cos(a - 0.5)} ${ey - h * Math.sin(a - 0.5)} L${ex} ${ey} L${ex - h * Math.cos(a + 0.5)} ${ey - h * Math.sin(a + 0.5)}`}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

/** Kata yang bisa dicoret (dua "TIDAK" saling meniadakan). */
const Strike: React.FC<{p: number; children: React.ReactNode; color?: string}> = ({p, children, color = R}) => (
  <span style={{position: 'relative', display: 'inline-block', opacity: 1 - 0.45 * p}}>
    {children}
    <span
      style={{
        position: 'absolute',
        left: '-4%',
        top: '52%',
        height: 7,
        width: `${108 * p}%`,
        background: color,
        borderRadius: 4,
        transform: 'rotate(-4deg)',
        boxShadow: `0 0 14px ${color}`,
      }}
    />
  </span>
);

// ───────────────────────────── WORLD 01 ─────────────────────────────

const Paradox: React.FC<{f: number; tail: ReturnType<typeof segBox>}> = ({f, tail}) => {
  if (f > T(13.4)) return null;
  const ring = springAt(f, T(3.5)) * (1 - prog(f, T(8.4), 8));
  const chip = springAt(f, T(4.0));
  const must = springAt(f, T(5.7), true);
  const out1 = 1 - prog(f, T(8.3), 8, (t) => t);
  const rowA = springAt(f, T(9.1));
  const rowB = springAt(f, T(10.0));
  const out2 = 1 - prog(f, T(11.7), 10, (t) => t);
  const av = springAt(f, T(6.2), true) * (1 - prog(f, T(11.8), 10, (t) => t));
  const avY = lerp(1420, 1400, prog(f, T(8.7), 20, EASE_IO));
  return (
    <>
      {tail && ring > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: tail.l - 6,
            top: tail.t - 8,
            width: tail.w + 12,
            height: tail.h + 22,
            borderRadius: 26,
            border: `5px solid ${R}`,
            boxShadow: `0 0 40px ${R}66, inset 0 0 30px ${R}22`,
            opacity: ring,
            transform: `scale(${1.25 - 0.25 * ring})`,
          }}
        />
      )}
      {/* ない = TIDAK … tapi keseluruhannya = HARUS BELAJAR */}
      <div style={{opacity: out1}}>
        <Bracket box={tail} color={R} p={chip * (f > T(4.0) ? 1 : 0)} dropTo={792} dropX={540} inset={0} />
        <Card x={540} y={850} w={520} h={116} accent={R} opacity={Math.min(1, chip * 1.4)} scale={0.85 + 0.15 * chip}>
          <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 60, color: R}}>ない</span>
          <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 54, color: W, marginLeft: 22}}>= TIDAK</span>
        </Card>
        <Txt x={540} y={962} size={40} font={FONT.hand} weight={700} color={C.textSecondary} style={riseStyle(prog(f, T(5.3), 10))}>
          tapi artinya malah…
        </Txt>
        <Card x={540} y={1075} w={800} h={150} accent={G} glow={must} opacity={Math.min(1, must * 1.6)} scale={0.7 + 0.3 * must}>
          <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 84, color: G, letterSpacing: 1}}>HARUS BELAJAR</span>
        </Card>
      </div>
      {/* dua kepingan yang seolah bertentangan */}
      <div style={{opacity: out2}}>
        {(
          [
            [rowA, 650, 'ない', R, 'TIDAK', R],
            [rowB, 830, 'ならない', G, 'HARUS?', G],
          ] as const
        ).map(([p, y, jp, jc, label, lc]) => (
          <Card key={jp} x={540} y={y} w={860} h={146} opacity={Math.min(1, p * 1.5)} scale={0.9 + 0.1 * p} style={{justifyContent: 'space-between', padding: '0 70px'}}>
            <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 76, color: jc, width: 320, textAlign: 'center'}}>{jp}</span>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 56, color: C.textMuted}}>→</span>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 66, color: lc, width: 300, textAlign: 'center'}}>{label}</span>
          </Card>
        ))}
      </div>
      {av > 0.01 && (
        <Avatar
          expression="confused"
          height={300}
          bubble="question"
          idleBob
          scale={av}
          style={{position: 'absolute', left: f < T(8.7) ? 800 : 440, top: avY - 300, opacity: Math.min(1, av * 2), display: f < T(8.5) || f > T(8.9) ? 'inline-flex' : 'none'}}
        />
      )}
    </>
  );
};

// ───────────────────────────── WORLD 02–03 ─────────────────────────────

const Building: React.FC<{f: number; poses: ReturnType<typeof poseAt>}> = ({f, poses}) => {
  if (f < T(12.2) || f > T(61)) return null;
  // kotak komponen saat dibongkar
  const parts = fadeIO(f, T(12.4), T(13.4), 8, 4);
  const groups = [SEG.stem, ['shi'], SEG.nakereba, SEG.naranai];
  const plus = fadeIO(f, T(14.9), T(16.55), 8, 3);
  const cmp = fadeIO(f, T(27.4), T(31.6), 10, 8);
  const row2 = prog(f, T(29.2), 12);
  return (
    <>
      {parts > 0 &&
        groups.map((g, i) => {
          const b = segBox(poses, g);
          if (!b) return null;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: b.l - 10,
                top: b.t - 12,
                width: b.w + 20,
                height: b.h + 30,
                borderRadius: 22,
                border: `3px dashed ${C.thread}`,
                background: 'rgba(42,48,64,0.35)',
                opacity: parts,
              }}
            />
          );
        })}
      {plus > 0 && (
        <Txt x={540} y={556} size={110} color={C.textSecondary} opacity={plus} scale={0.6 + 0.4 * springAt(f, T(14.9), true)}>
          +
        </Txt>
      )}

      {/* する disorot sebelum diganti */}
      <Bracket box={segBox(poses, SEG.suru)} color={G} p={springAt(f, T(21.4)) * (f < T(22.6) ? 1 : 0)} />

      <FnTag f={f} box={segBox(poses, SEG.nai)} a={25.5} b={31.6} color={R} jp="ない" meaning="TIDAK" />
      {f < T(34.4) && <Bracket box={segBox(poses, SEG.nai)} color={R} p={springAt(f, T(33.2)) * (f >= T(33.2) ? 1 : 0)} />}
      <div style={{opacity: fadeIO(f, T(35.6), T(37.8), 6, 8)}}>
        <Bracket box={segBox(poses, ['shi', ...SEG.nakereba])} color={B} p={springAt(f, T(35.6))} />
      </div>
      <FnTag f={f} box={segBox(poses, SEG.nakereba)} a={39.2} b={47.4} color={B} jp="なければ" meaning="KALAU TIDAK" />

      {/* arti: kata lama bergeser ketika kata baru masuk */}
      <Txt x={540} y={808} size={22} font={FONT.mono} weight={700} color={C.textMuted} spacing={5} opacity={fadeIO(f, T(18.2), T(54.3), 8, 8)}>
        ARTINYA
      </Txt>
      <MeaningLine
        f={f}
        x={540}
        y={880}
        size={72}
        opacity={1 - prog(f, T(54.0), 8, (t) => t)}
        words={[
          {text: 'KALAU', at: T(44.0), color: B},
          {text: 'TIDAK', at: T(29.2), color: R},
          {text: 'BELAJAR', at: T(18.3)},
          {text: '…', at: T(44.0), color: C.textMuted},
        ]}
      />

      {/* polaritas berbalik */}
      {cmp > 0 && (
        <div style={{opacity: cmp}}>
          <Card x={540} y={1085} w={900} h={236} scale={0.94 + 0.06 * springAt(f, T(27.4))} />
          {(
            [
              [1030, 'ben,kyo,su,ru', 'BELAJAR', C.matcha, '+', 1 - 0.55 * row2],
              [1140, 'ben,kyo,shi,na1,i1', 'TIDAK BELAJAR', R, '−', row2],
            ] as const
          ).map(([y, ids, label, col, sign, o], i) => (
            <div key={i} style={{opacity: o, transform: `translateY(${i === 1 ? (1 - row2) * 20 : 0}px)`}}>
              <div
                style={{
                  position: 'absolute',
                  left: 130,
                  top: y - 27,
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  background: `${col}2a`,
                  border: `2.5px solid ${col}`,
                  color: col,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 38,
                  lineHeight: 1,
                }}
              >
                {sign}
              </div>
              <StaticRow ids={ids.split(',')} size={52} x0={212} cy={y} color={(id) => (SEG.nai.includes(id) ? R : G)} />
              <Txt x={500} y={y} size={42} align="left" color={i === 1 ? W : C.textSecondary}>
                = {i === 1 ? <span style={{color: R}}>TIDAK </span> : null}
                BELAJAR
              </Txt>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ── Alur logika: KONDISI → HASIL. Simpul ini bertahan dari World 03 sampai fusi di World 04. ──
const NODE_A0 = {x: 330, y: 1100, w: 470, h: 170};
const NODE_B0 = {x: 835, y: 1100, w: 330, h: 170};
const NODE_A1 = {x: 540, y: 740, w: 800, h: 150};
const NODE_B1 = {x: 540, y: 1010, w: 800, h: 150};
const NODE_A2 = {x: 540, y: 720, w: 640, h: 130};
const NODE_B2 = {x: 540, y: 890, w: 640, h: 130};
const mixBox = (a: typeof NODE_A0, b: typeof NODE_A0, t: number) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
});

const Logic: React.FC<{f: number; poses: ReturnType<typeof poseAt>}> = ({f, poses}) => {
  if (f < T(44.5) || f > T(82.8)) return null;
  const m1 = prog(f, T(61.0), 24, EASE_IO); // datar → tegak
  const m2 = prog(f, T(73.3), 20, EASE_IO); // merapat untuk fusi
  const A = mixBox(mixBox(NODE_A0, NODE_A1, m1), NODE_A2, m2);
  const Bx = mixBox(mixBox(NODE_B0, NODE_B1, m1), NODE_B2, m2);
  const aIn = springAt(f, T(44.6));
  const bIn = springAt(f, T(45.8));
  const filled = springAt(f, T(56.5), true); // ならない mengisi "hasil"
  const waiting = fadeIO(f, T(47.9), T(56.5), 10, 4);
  const pulse = 0.5 + 0.5 * Math.sin(f / 4);
  const labels = fadeIO(f, T(44.6), T(60.7), 8, 8);
  const hArrow = prog(f, T(45.4), 10) * (1 - prog(f, T(60.5), 6));
  const links = fadeIO(f, T(54.5), T(60.7), 4, 8);
  const vArrow = prog(f, T(64.4), 12) * (1 - prog(f, T(73.2), 6));
  const aGlow = fadeIO(f, T(63.0), T(64.6), 8, 12);
  const bGlow = fadeIO(f, T(65.3), T(73.0), 8, 12);
  const reject = springAt(f, T(66.8), true) * (1 - prog(f, T(73.1), 6));
  const rejArc = prog(f, T(66.3), 14, EASE) * (1 - prog(f, T(73.1), 6));
  const dropKalau = prog(f, T(69.4), 12, EASE_IO);
  const bText2 = prog(f, T(69.5), 10);
  const bText3 = prog(f, T(73.4), 10);
  const plus = springAt(f, T(73.7), true);
  const strikeA = prog(f, T(74.6), 6);
  const strikeB = prog(f, T(74.8), 6);
  const boom = springAt(f, T(75.2), true);
  const fused = prog(f, T(75.2), 10);
  const leave = prog(f, T(77.6), 10, (t) => t);
  const ringP = prog(f, T(75.2), 22, EASE);
  const up = prog(f, T(77.7), 24, EASE_IO);
  const resOut = 1 - prog(f, T(82.5), 8, (t) => t);
  const abOpacity = (1 - 0.5 * fused) * (1 - leave);
  const aSize = lerp(lerp(40, 54, m1), 50, m2);
  const resY = lerp(1135, 860, up);
  const av = springAt(f, T(79.0), true) * resOut;

  return (
    <>
      <div style={{opacity: labels}}>
        <Txt x={NODE_A0.x} y={992} size={22} font={FONT.mono} weight={700} color={B} spacing={5} opacity={Math.min(1, aIn * 2)}>
          KONDISI
        </Txt>
        <Txt x={NODE_B0.x} y={992} size={22} font={FONT.mono} weight={700} color={waiting > 0.5 ? R : filled > 0.5 ? R : C.textMuted} spacing={5} opacity={Math.min(1, bIn * 2)}>
          {waiting > 0.5 ? 'HASIL: ???' : 'HASIL'}
        </Txt>
      </div>
      <Arrow x1={578} y1={1100} x2={656} y2={1100} p={hArrow} opacity={hArrow > 0 ? 1 : 0} color={waiting > 0.3 ? R : C.textSecondary} />

      {/* segmen ↔ maknanya */}
      <div style={{opacity: links}}>
        <Bracket box={segBox(poses, SEG.cond)} color={B} p={springAt(f, T(54.6))} dropTo={1006} dropX={NODE_A0.x} />
        <Bracket box={segBox(poses, SEG.naranai)} color={R} p={springAt(f, T(56.3))} dropTo={1006} dropX={NODE_B0.x} />
      </div>
      <Txt x={540} y={1228} size={33} font={FONT.hand} weight={700} color={C.textSecondary} opacity={fadeIO(f, T(58.3), T(60.7), 10, 8)}>
        *cara memahami polanya — bukan terjemahan kata per kata
      </Txt>

      {/* simpul A — kondisi */}
      <Card {...A} accent={reject > 0.3 && fused < 0.5 ? R : B} glow={aGlow} opacity={Math.min(1, aIn * 1.5) * abOpacity} scale={0.9 + 0.1 * aIn}>
        <div style={{position: 'absolute', opacity: 1 - m1, textAlign: 'center', fontFamily: FONT.display, fontWeight: 800, lineHeight: 1.1}}>
          <div style={{fontSize: 38, color: B}}>KALAU</div>
          <div style={{fontSize: 46, color: W, whiteSpace: 'nowrap'}}>TIDAK BELAJAR</div>
        </div>
        <div style={{position: 'absolute', opacity: m1, display: 'flex', fontFamily: FONT.display, fontWeight: 800, fontSize: aSize, whiteSpace: 'nowrap', color: W}}>
          <span style={{color: B, width: aSize * 3.9 * (1 - dropKalau), opacity: 1 - dropKalau, overflow: 'hidden'}}>KALAU</span>
          <Strike p={strikeA}>TIDAK</Strike>
          <span>&nbsp;BELAJAR</span>
        </div>
      </Card>

      {/* simpul B — hasil: kosong dulu, lalu diisi ならない */}
      <Card
        {...Bx}
        dashed
        accent={waiting > 0.2 ? R : C.thread}
        opacity={Math.min(1, bIn * 1.5) * (1 - filled)}
        scale={0.9 + 0.1 * bIn + waiting * pulse * 0.035}
      >
        <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 92, color: waiting > 0.2 ? R : C.textMuted, opacity: 0.55 + 0.45 * pulse}}>?</span>
      </Card>
      <Card {...Bx} accent={R} glow={bGlow + (1 - prog(f, T(56.5), 20)) * filled} opacity={Math.min(1, filled * 1.6) * abOpacity} scale={0.8 + 0.2 * filled}>
        <div style={{position: 'absolute', opacity: 1 - m1, textAlign: 'center', fontFamily: FONT.display, fontWeight: 800, lineHeight: 1.1}}>
          <div style={{fontSize: 38, color: C.textSecondary}}>ITU</div>
          <div style={{fontSize: 44, color: R, whiteSpace: 'nowrap'}}>TIDAK BOLEH</div>
        </div>
        <div style={{position: 'absolute', opacity: m1 * (1 - bText2), fontFamily: FONT.display, fontWeight: 800, fontSize: 50, whiteSpace: 'nowrap', color: R}}>
          <span style={{color: C.textSecondary}}>ITU </span>TIDAK BOLEH TERJADI
        </div>
        <div style={{position: 'absolute', opacity: bText2 * (1 - bText3), fontFamily: FONT.display, fontWeight: 800, fontSize: 52, whiteSpace: 'nowrap', color: R}}>
          TIDAK DIPERBOLEHKAN
        </div>
        <div style={{position: 'absolute', opacity: bText3, fontFamily: FONT.display, fontWeight: 800, fontSize: 50, whiteSpace: 'nowrap', color: W}}>
          <Strike p={strikeB}>TIDAK</Strike>&nbsp;BOLEH
        </div>
      </Card>

      <Arrow x1={540} y1={826} x2={540} y2={924} p={vArrow} opacity={vArrow > 0 ? 1 : 0} />

      {/* hasil menolak kondisinya */}
      {rejArc > 0.001 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: Math.min(1, rejArc * 3)}}>
          <path
            d="M946 1010 C1030 1010 1030 740 958 740"
            fill="none"
            stroke={R}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={380}
            strokeDashoffset={380 * (1 - rejArc)}
          />
          {rejArc > 0.95 && <path d="M978 722 L954 740 L978 758" fill="none" stroke={R} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      )}
      {reject > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 160,
            top: 740,
            transform: `translate(-50%, -50%) rotate(-8deg) scale(${2.2 - 1.2 * Math.min(1, reject)})`,
            opacity: Math.min(1, reject * 1.6),
            width: 130,
            height: 130,
            borderRadius: 65,
            border: `9px solid ${R}`,
            background: 'rgba(18,21,29,0.82)',
            boxShadow: `0 0 34px ${R}77`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{width: 96, height: 10, borderRadius: 5, background: R, transform: 'rotate(45deg)'}} />
        </div>
      )}

      {/* TIDAK + TIDAK → HARUS */}
      <Txt x={540} y={805} size={64} color={C.textSecondary} opacity={Math.min(1, plus * 1.5) * (1 - leave)} scale={0.5 + 0.5 * plus}>
        +
      </Txt>
      <Arrow x1={540} y1={968} x2={540} y2={1028} p={prog(f, T(75.0), 8)} opacity={(f >= T(75.0) ? 1 : 0) * (1 - leave)} color={G} />
      {ringP > 0 && ringP < 1 && (
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 1135,
            width: 300 + ringP * 900,
            height: 120 + ringP * 420,
            transform: 'translate(-50%, -50%)',
            borderRadius: 999,
            border: `${6 * (1 - ringP)}px solid ${G}`,
            opacity: 1 - ringP,
          }}
        />
      )}
      {f >= T(77.9) && (
        <Pill x={540} y={745} size={24} opacity={prog(f, T(78.2), 10) * resOut}>
          ARTINYA
        </Pill>
      )}
      <Card x={540} y={resY} w={840} h={176} accent={G} glow={0.5 + 0.5 * (1 - prog(f, T(75.2), 40))} opacity={Math.min(1, boom * 1.6) * resOut} scale={(0.5 + 0.5 * boom) * lerp(1, 0.94, up)} fill={C.elevated}>
        <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 92, color: G, letterSpacing: 1, textShadow: `0 0 34px ${G}55`}}>HARUS BELAJAR</span>
      </Card>
      {av > 0.01 && (
        <Avatar expression="excited" height={320} bubble="idea" idleBob scale={Math.min(1.05, av)} style={{position: 'absolute', left: 430, top: 1050, opacity: Math.min(1, av * 2)}} />
      )}
    </>
  );
};

// ───────────────────────────── WORLD 05 ─────────────────────────────

const LADDER = [
  {y: 470, ids: ['ben', 'kyo', 'su', 'ru'], hot: SEG.suru, col: G, label: 'BELAJAR', at: 96.0},
  {y: 690, ids: ['ben', 'kyo', 'shi', 'na1', 'i1'], hot: SEG.nai, col: R, label: 'TIDAK BELAJAR', at: 97.2, delta: '+ ない'},
  {y: 910, ids: SEG.cond, hot: SEG.nakereba, col: B, label: 'KALAU TIDAK BELAJAR…', at: 98.4, delta: 'ない → なければ'},
  {y: 1130, ids: SEG.full, hot: SEG.naranai, col: G, label: 'HARUS BELAJAR', at: 99.6, delta: '+ ならない'},
];

const Revelation: React.FC<{f: number; poses: ReturnType<typeof poseAt>}> = ({f, poses}) => {
  if (f < T(82.8) || f > T(101.9)) return null;
  const card = springAt(f, T(83.3)) * (1 - prog(f, T(88.4), 8, (t) => t));
  const swap = prog(f, T(86.5), 12, EASE_IO);
  const brk = fadeIO(f, T(89.4), T(93.5), 6, 6);
  const badge = springAt(f, T(91.6), true) * (1 - prog(f, T(95.1), 8, (t) => t));
  const collapse = prog(f, T(101.0), 20, EASE_IO);
  const railP = prog(f, T(96.0), T(99.6) - T(96.0), (t) => t);
  return (
    <>
      {card > 0.01 && (
        <Card x={540} y={800} w={920} h={310} opacity={Math.min(1, card * 1.5)} scale={0.9 + 0.1 * card} accent={swap > 0.5 ? G : undefined} glow={swap * 0.6}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34, opacity: 1 - swap, transform: `scale(${1 - 0.1 * swap})`}}>
            <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 116, color: R}}>ない</span>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 104, color: W}}>≠</span>
            <div style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 40, lineHeight: 1.22, color: W}}>
              <div style={{color: C.textSecondary}}>SELALU MEMBUAT</div>
              <div>SELURUH KALIMAT</div>
              <div>
                BERMAKNA <span style={{color: R}}>NEGATIF</span>
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', opacity: swap, transform: `scale(${0.88 + 0.12 * swap})`, textAlign: 'center', fontFamily: FONT.display, fontWeight: 800, fontSize: 74, lineHeight: 1.14, color: W}}>
            <div>MAKNA BERGANTUNG</div>
            <div>
              PADA <span style={{color: G}}>POLA</span>
            </div>
          </div>
        </Card>
      )}

      {/* なければ + ならない → KEWAJIBAN */}
      <div style={{opacity: brk}}>
        <Bracket box={segBox(poses, SEG.nakereba)} color={B} p={springAt(f, T(89.4))} dropTo={705} dropX={600} />
        <Bracket box={segBox(poses, SEG.naranai)} color={R} p={springAt(f, T(90.2))} dropTo={705} dropX={760} />
        <Txt x={676} y={416} size={56} color={C.textSecondary} opacity={prog(f, T(90.0), 8)}>
          +
        </Txt>
      </div>
      {badge > 0.01 && (
        <>
          <Card x={680} y={790} w={560} h={156} accent={G} glow={0.7} fill={C.elevated} opacity={Math.min(1, badge * 1.6)} scale={0.6 + 0.4 * badge}>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 78, color: G, letterSpacing: 2}}>KEWAJIBAN</span>
          </Card>
          <Txt x={540} y={930} size={38} font={JP_MIX} color={C.textSecondary} opacity={prog(f, T(92.3), 10) * Math.min(1, badge)}>
            <span style={{color: G, fontWeight: 900}}>〜なければならない</span>&nbsp;&nbsp;=&nbsp;&nbsp;harus …
          </Txt>
        </>
      )}

      {/* tangga pola: tiap anak tangga mewarisi yang sebelumnya */}
      {f >= T(95.4) && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - collapse, transform: `scale(${1 - 0.55 * collapse})`, transformOrigin: '540px 820px'}}>
          <Pill x={540} y={318} size={24} opacity={prog(f, T(95.7), 10)}>
            DARI BENTUK DASAR → POLA
          </Pill>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d={`M96 470 V${lerp(470, 1130, railP)}`} stroke={C.thread} strokeWidth={4} strokeDasharray="12 10" strokeLinecap="round" />
          </svg>
          {LADDER.map((r, i) => {
            const p = springAt(f, T(r.at));
            const last = i === LADDER.length - 1;
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    position: 'absolute',
                    left: 96 - 17,
                    top: r.y - 17,
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    background: p > 0.5 ? r.col : C.card,
                    border: `3px solid ${r.col}`,
                    transform: `scale(${0.6 + 0.4 * p})`,
                    opacity: last ? 1 : Math.min(1, p * 2),
                    boxShadow: p > 0.5 ? `0 0 18px ${r.col}88` : 'none',
                  }}
                />
                {!last && (
                  <div style={{opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * -40}px)`}}>
                    <StaticRow ids={r.ids} size={60} x0={150} cy={r.y} color={(id) => (r.hot.includes(id) ? r.col : W)} />
                  </div>
                )}
                <Txt x={152} y={r.y + 68} size={32} align="left" color={r.col} opacity={Math.min(1, p * 1.6)} spacing={1}>
                  {r.label}
                </Txt>
                {r.delta && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 96,
                      top: r.y - 110,
                      transform: `translate(-18px, -50%) scale(${0.8 + 0.2 * springAt(f, T(r.at) - 12)})`,
                      transformOrigin: 'left center',
                      opacity: prog(f, T(r.at) - 12, 8),
                      padding: '7px 20px 9px',
                      borderRadius: 999,
                      background: C.elevated,
                      border: `1.5px solid ${r.col}88`,
                      fontFamily: `${FONT.mono}, "Noto Sans JP"`,
                      fontWeight: 700,
                      fontSize: 27,
                      color: r.col,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.delta}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};

// ───────────────────────────── komposisi World 01–05 ─────────────────────────────

export const Explainer: React.FC = () => {
  const f = useCurrentFrame();
  if (f > T(102)) return null;
  const poses = poseAt(HERO, f);
  const tail = segBox(poses, SEG.tailNai);
  // kamera: dorong pelan ke ない saat paradoks, lalu kembali
  const push = prog(f, T(3.2), 28, EASE_IO) - prog(f, T(5.0), 26, EASE_IO);
  const breathe = 1 + 0.006 * Math.sin(f / 46);
  const ladderDim = f >= T(95.4) ? lerp(0.38, 1, prog(f, T(99.6), 10)) : 1;
  const collapse = prog(f, T(101.0), 20, EASE_IO);
  return (
    <div style={{position: 'absolute', inset: 0, transform: `scale(${(1 + 0.07 * push) * breathe})`, transformOrigin: '668px 640px'}}>
      <Tray f={f} />
      <StagePill f={f} />
      <Paradox f={f} tail={tail} />
      <Building f={f} poses={poses} />
      <Logic f={f} poses={poses} />
      <Revelation f={f} poses={poses} />
      <div style={{position: 'absolute', inset: 0, opacity: 1 - collapse, transform: `scale(${1 - 0.55 * collapse})`, transformOrigin: '540px 820px'}}>
        <GlyphLine poses={poses} color={(id) => heroColor(id, f)} glow={(id) => heroGlow(id, f)} opacity={ladderDim} />
      </div>
    </div>
  );
};
