import React from 'react';
import {interpolateColors} from 'remotion';
import {Surface} from '../../../shared/components/ui';
import {C, FONT, FPS} from '../../../shared/theme';
import {At, BOUNCY, Big, EASE_IN, EASE_IO, Kana, bump, hexA, io, kf, mix, ps, sp, useF} from '../kit';
import {Actor, CakeSlices, Cursor, Door, FILE_WIN, FileWindow, IMPORTANT_ROW, KeyIcon, PLATE_BG, PlateBase, Table, TrashIcon, fileRowY, sliceDir} from '../props';

// S11 "Contohnya:" → tiga contoh (S12–S17). Satu tata letak yang dipakai tiga kali:
// kartu kalimat Jepang · panggung ilustrasi · kartu terjemahan. Yang berganti hanya isinya, dan
// tiap pergantian diantar objeknya sendiri (kunci terlempar → piring menggelinding → jendela file).

const JP = 88;
const STAGE = {y: 1000, w: 940, h: 390};
const TR = {y: 1312, w: 960, h: 150};

interface Group {
  parts: {t: string; r?: string}[];
  at: number;
  line: 0 | 1;
  hl?: {at: number; color: string};
}
interface Example {
  in: number;
  out: number;
  groups: Group[];
  tr: {open: number; close: number; text: [string, string, string]};
}

// Kalimat muncul per kelompok makna (bukan per karakter); sorotan mengikuti urutan informasi.
const EX: Example[] = [
  {
    in: 35.55,
    out: 40.05,
    groups: [
      {parts: [{t: '鍵', r: 'かぎ'}, {t: 'を'}], at: 35.83, line: 0},
      {parts: [{t: '家', r: 'いえ'}, {t: 'に'}], at: 36.25, line: 0},
      {parts: [{t: '忘', r: 'わす'}, {t: 'れ'}, {t: 'て'}, {t: 'し'}, {t: 'ま'}, {t: 'っ'}, {t: 'た'}], at: 36.7, line: 1, hl: {at: 37.42, color: C.gold}},
    ],
    tr: {open: 38.0, close: 39.9, text: ['Aku ', 'malah', ' ketinggalan kunci di rumah.']},
  },
  {
    in: 40.2,
    out: 44.75,
    groups: [
      {parts: [{t: 'ケ'}, {t: 'ー'}, {t: 'キ'}, {t: 'を'}], at: 40.45, line: 0},
      {parts: [{t: '全', r: 'ぜん'}, {t: '部', r: 'ぶ'}], at: 40.95, line: 0, hl: {at: 41.1, color: C.indigoSoft}},
      {parts: [{t: '食', r: 'た'}, {t: 'べ'}, {t: 'て'}, {t: 'し'}, {t: 'ま'}, {t: 'っ'}, {t: 'た'}], at: 41.4, line: 1, hl: {at: 42.0, color: C.gold}},
    ],
    tr: {open: 42.66, close: 44.55, text: ['Aku malah menghabiskan ', 'semua', ' kuenya.']},
  },
  {
    in: 44.9,
    out: 49.45,
    groups: [
      {parts: [{t: '大', r: 'だい'}, {t: '事', r: 'じ'}, {t: 'な'}], at: 45.16, line: 0, hl: {at: 45.9, color: C.indigoSoft}},
      {parts: [{t: 'フ'}, {t: 'ァ'}, {t: 'イ'}, {t: 'ル'}, {t: 'を'}], at: 45.55, line: 0, hl: {at: 45.98, color: C.indigoSoft}},
      {parts: [{t: '消', r: 'け'}, {t: 'し'}, {t: 'て'}, {t: 'し'}, {t: 'ま'}, {t: 'っ'}, {t: 'た'}], at: 46.1, line: 1, hl: {at: 46.8, color: C.gold}},
    ],
    tr: {open: 47.4, close: 49.3, text: ['Aku ', 'tidak sengaja', ' menghapus file penting.']},
  },
];

const Sentence: React.FC<{f: number; ex: Example}> = ({f, ex}) => {
  const o = io(f, ex.in, ex.out, 0.01, 0.3);
  if (o <= 0.001) return null;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, opacity: o}}>
      {[0, 1].map((line) => (
        <div key={line} style={{display: 'flex', paddingTop: 36}}>
          {ex.groups
            .filter((g) => g.line === line)
            .map((g, gi) => {
              const p = sp(f, g.at, {damping: 18, stiffness: 170, mass: 0.75});
              const h = g.hl ? ps(f, g.hl.at, g.hl.at + 0.3) : 0;
              const color = g.hl ? interpolateColors(h, [0, 1], [C.text, g.hl.color]) : C.text;
              return (
                <span key={gi} style={{position: 'relative', display: 'inline-flex', opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * 34}px)`}}>
                  {g.hl && (
                    <span
                      style={{
                        position: 'absolute',
                        left: -2,
                        right: -2,
                        top: -6,
                        bottom: -12,
                        borderRadius: 16,
                        background: hexA(g.hl.color, 0.13),
                        borderBottom: `6px solid ${g.hl.color}`,
                        boxSizing: 'border-box',
                        transform: `scaleX(${h})`,
                        transformOrigin: 'left center',
                      }}
                    />
                  )}
                  {g.parts.map((c, ci) => (
                    <Kana key={ci} ch={c.t} ruby={c.r} size={JP} color={color} />
                  ))}
                  {line === 1 && <Kana ch="。" size={JP} color={C.textSecondary} style={{width: JP * 0.5, textAlign: 'left'}} />}
                </span>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export const Act4_Examples: React.FC = () => {
  const f = useF();
  const t = f / FPS;
  const idx = t < 40.16 ? 0 : t < 44.82 ? 1 : 2;
  const ex = EX[idx];

  // ── S11 ──
  const word = sp(f, 34.55, BOUNCY);
  const wordUp = ps(f, 35.07, 35.6, EASE_IO);
  const layoutIn = sp(f, 35.25);
  const leave = ps(f, 49.25, 49.7, EASE_IN);
  const frameO = Math.min(1, layoutIn * 2) * (1 - leave);

  // kartu terjemahan + penanda emas yang mengantar dari sorotan ke terjemahan
  const trP = sp(f, ex.tr.open, {damping: 18, stiffness: 160, mass: 0.8}) * (1 - ps(f, ex.tr.close, ex.tr.close + 0.25, EASE_IN));
  const mark = ps(f, ex.tr.open - 0.34, ex.tr.open + 0.04, EASE_IO);
  const markO = io(f, ex.tr.open - 0.34, ex.tr.open + 0.12, 0.06, 0.08);

  // ── contoh 1: kunci di dalam, karakter sudah di luar ──
  const s1 = io(f, 35.5, 40.25, 0.3, 0.3);
  const s1x = ps(f, 39.9, 40.25, EASE_IN) * -700;
  const keyFly = ps(f, 39.77, 40.2, EASE_IN);
  const rummage = t >= 38.1 && t < 38.85 ? Math.sin((t - 38.1) * 26) * 4 : 0;

  // ── contoh 2: kue sampai habis ──
  const EAT = [40.75, 40.95, 41.15, 41.35, 41.55];
  const gone = EAT.map((e) => ps(f, e, e + 0.16, EASE_IN));
  const flyP = ps(f, 41.62, 41.9, EASE_IO);
  const plate = {
    x: kf(f, [[40.2, 1320], [40.62, 540], [42.4, 540], [42.8, 400]]),
    s: kf(f, [[42.4, 1], [42.8, 0.84]]),
    r: 122,
    d: 330,
  };
  const [sx, sy] = sliceDir(5);
  const mouth = {x: 842, y: 1045};
  const fly = {
    i: 5,
    dx: (mouth.x - (plate.x + sx * plate.r * 0.58)) * flyP,
    dy: (mouth.y - (STAGE.y + sy * plate.r * 0.58)) * flyP - Math.sin(Math.PI * flyP) * 50,
    s: 1 - 0.7 * flyP,
    o: 1 - ps(f, 41.86, 41.92),
  };
  // piring kosong → jendela komputer (44.43–45.16)
  const toWin = ps(f, 44.43, 45.1, EASE_IO);
  const WIN_S = 0.95;
  const winTop = STAGE.y - (FILE_WIN.h * WIN_S) / 2;

  // ── contoh 3: file penting terhapus ──
  const rowY = winTop + fileRowY(IMPORTANT_ROW) * WIN_S;
  const cur = {
    x: kf(f, [[45.1, 830], [45.5, 590], [45.95, 590], [46.15, 742], [47.6, 742], [48.15, 520]]),
    y: kf(f, [[45.1, 1160], [45.5, rowY - 4], [45.95, rowY - 4], [46.15, rowY - 62], [47.6, rowY - 62], [48.15, rowY - 2]]),
  };
  const sel = ps(f, 45.52, 45.62);
  const chip = sp(f, 45.9, BOUNCY) * (1 - ps(f, 46.28, 46.4));
  const del = ps(f, 46.22, 46.55);
  const winO = ps(f, 44.95, 45.2);
  // jendela mengecil dan menyatu dengan pola di atas (→ S18)
  const fuse = ps(f, 49.25, 50.0, EASE_IO);

  return (
    <>
      {/* S11 — "CONTOH" lalu naik dan lenyap, memberi tempat kartu kalimat */}
      <At y={mix(760, 366, wordUp)} s={word * mix(1, 0.2, wordUp)} o={Math.min(1, word * 2) * (1 - ps(f, 35.42, 35.6))}>
        <Big size={150} color={C.gold} style={{textShadow: `0 0 50px ${hexA(C.gold, 0.35)}, 0 8px 30px rgba(0,0,0,0.7)`}}>
          CONTOH
        </Big>
      </At>

      {/* kartu kalimat Jepang */}
      <At y={595} s={0.9 + 0.1 * layoutIn} o={frameO} style={{marginTop: -leave * 50}}>
        <Surface tone="card" radius={40} style={{width: 940, height: 370}}>
          {EX.map((e, i) => (
            <Sentence key={i} f={f} ex={e} />
          ))}
        </Surface>
      </At>

      {/* panggung ilustrasi */}
      <At y={STAGE.y} s={0.9 + 0.1 * layoutIn} o={frameO * 0.9}>
        <Surface tone="inset" radius={40} stitch={false} style={{width: STAGE.w, height: STAGE.h}} />
      </At>
      <div style={{position: 'absolute', left: 540 - STAGE.w / 2, top: STAGE.y - STAGE.h / 2, width: STAGE.w, height: STAGE.h, borderRadius: 40, overflow: 'hidden', opacity: 1 - ps(f, 49.2, 49.3)}}>
        <div style={{position: 'absolute', left: -(540 - STAGE.w / 2), top: -(STAGE.y - STAGE.h / 2), width: 1080, height: 1920}}>
          {/* 1 — rumah */}
          {s1 > 0.001 && (
            <div style={{position: 'absolute', inset: 0, opacity: s1, transform: `translateX(${s1x}px)`}}>
              <div style={{position: 'absolute', left: 70, top: 805, width: 536, height: 390, background: `linear-gradient(90deg, ${hexA(C.gold, 0.02)}, ${hexA(C.gold, 0.1)})`}} />
              <div style={{position: 'absolute', left: 100, right: 100, top: 1150, borderTop: `3px dashed ${C.thread}`}} />
              <div style={{position: 'absolute', left: 150, top: 1040}}>
                <Table w={200} h={110} />
              </div>
              <div style={{position: 'absolute', left: 600, top: 850}}>
                <Door w={132} h={300} open={0.45} />
              </div>
              <Actor
                x={kf(f, [[35.5, 720], [36.5, 870]])}
                y={1150}
                h={270}
                r={rummage}
                expression={t < 38.1 ? 'happy' : t < 38.92 ? 'confused' : 'shocked'}
                bubble={t >= 38.92 ? 'exclamation' : t >= 38.1 ? 'question' : undefined}
              />
            </div>
          )}
          {/* 2 — piring (dan morph ke jendela) */}
          {t >= 40.15 && t < 45.25 && (
            <>
              <At x={mix(plate.x, 540, toWin)} y={STAGE.y} r={(1 - ps(f, 40.2, 40.62)) * 200} o={1 - ps(f, 45.1, 45.22)}>
                <div
                  style={{
                    width: mix(plate.d * plate.s, FILE_WIN.w * WIN_S, toWin),
                    height: mix(plate.d * plate.s, FILE_WIN.h * WIN_S, toWin),
                    borderRadius: mix((plate.d * plate.s) / 2, 28, toWin),
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.55)',
                    opacity: mix(1, 0.86, ps(f, 42.4, 42.8)),
                  }}
                >
                  <div style={{position: 'absolute', inset: 0, background: PLATE_BG, opacity: 1 - toWin}} />
                  <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, #232937 0%, ${C.card} 100%)`, opacity: toWin}} />
                </div>
              </At>
              {toWin < 0.02 && (
                <At x={plate.x} y={STAGE.y} s={plate.s} r={(1 - ps(f, 40.2, 40.62)) * 200}>
                  <div style={{position: 'absolute', left: -plate.d / 2, top: -plate.d / 2, opacity: ps(f, 41.85, 42.0)}}>
                    <PlateBase d={plate.d} crumbs={1} />
                  </div>
                  <div style={{position: 'absolute', left: -plate.r - 6, top: -plate.r - 6}}>
                    <CakeSlices r={plate.r} gone={gone} fly={fly} />
                  </div>
                </At>
              )}
              <Actor
                x={850}
                y={1178}
                h={270}
                o={io(f, 40.4, 44.7, 0.3, 0.3)}
                expression={t < 41.95 ? 'happy' : t < 42.85 ? 'surprised' : 'awkward'}
                bubble={t >= 42.85 ? 'sweat' : undefined}
              />
            </>
          )}
        </div>
      </div>

      {/* 1 — kunci: di atas panggung supaya bisa terlempar keluar frame */}
      {t >= 35.5 && keyFly < 1 && (
        <At
          x={mix(250, 1260, keyFly)}
          y={1004 - Math.sin(Math.PI * keyFly * 0.8) * 190}
          r={keyFly * 320}
          o={ps(f, 35.5, 35.8)}
        >
          <KeyIcon size={120} glow={0.45 + 0.4 * Math.sin(f / 3.5) + bump(f, 36.2, 36.9) * 0.4} />
        </At>
      )}

      {/* 3 — jendela file: di luar klip supaya bisa menyatu dengan pola */}
      {t >= 44.9 && fuse < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: winO * (1 - ps(f, 49.6, 50.0)), transformOrigin: '540px 1000px', transform: `translateY(${fuse * -300}px) scale(${1 - fuse * 0.78})`}}>
          <div style={{position: 'absolute', left: 540 - (FILE_WIN.w * WIN_S) / 2, top: winTop, transform: `scale(${WIN_S})`, transformOrigin: '0 0'}}>
            <FileWindow sel={sel} del={del} />
          </div>
          <At x={742} y={rowY - 44} s={chip} o={Math.min(1, chip * 2)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 16, background: C.hanko, border: `1.5px solid ${C.hankoDeep}`, boxShadow: `0 6px 0 ${C.hankoDeep}, 0 12px 22px rgba(0,0,0,0.5)`, fontFamily: FONT.body, fontWeight: 800, fontSize: 28, color: '#fff', transform: `translateY(${bump(f, 46.15, 46.3) * 5}px)`}}>
              <TrashIcon size={28} color="#fff" />
              Hapus
            </div>
          </At>
          <div style={{position: 'absolute', left: cur.x + (t > 48.15 ? Math.sin((t - 48.15) * 9) * 5 : 0), top: cur.y, opacity: ps(f, 45.1, 45.3)}}>
            <Cursor press={bump(f, 46.14, 46.32)} />
          </div>
          <Actor x={900} y={1196} h={220} expression="shocked" bubble="exclamation" s={sp(f, 48.3, BOUNCY)} o={Math.min(1, sp(f, 48.3, BOUNCY) * 2)} />
        </div>
      )}

      {/* penanda emas: sorotan → terjemahan */}
      {markO > 0.001 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - mix(660, 140, mark) / 2,
            top: mix(742, TR.y - TR.h / 2 - 3, mark),
            width: mix(660, 140, mark),
            height: 6,
            borderRadius: 3,
            background: C.gold,
            boxShadow: `0 0 18px ${hexA(C.gold, 0.6)}`,
            opacity: markO,
          }}
        />
      )}
      {/* kartu terjemahan */}
      <At y={TR.y} s={0.86 + 0.14 * trP} o={Math.min(1, trP * 1.8)} style={{marginTop: (1 - trP) * 26}}>
        <Surface tone="elevated" radius={34} border={hexA(C.gold, 0.5)} style={{width: TR.w, height: TR.h, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', left: '50%', top: -3, width: 140, height: 6, marginLeft: -70, borderRadius: 3, background: C.gold}} />
          <div style={{fontFamily: FONT.body, fontWeight: 800, fontSize: ex.tr.text.join('').length > 38 ? 38 : 42, color: C.text, whiteSpace: 'pre'}}>
            {ex.tr.text[0]}
            <span
              style={{
                display: 'inline-block',
                color: C.gold,
                transform: `translateY(${-7 * bump(f, ex.tr.open + 0.3, ex.tr.open + 0.8)}px)`,
                textShadow: `0 0 ${24 * bump(f, ex.tr.open + 0.3, ex.tr.open + 1.0)}px ${hexA(C.gold, 0.7)}`,
              }}
            >
              {ex.tr.text[1]}
            </span>
            {ex.tr.text[2]}
          </div>
        </Surface>
      </At>
    </>
  );
};
