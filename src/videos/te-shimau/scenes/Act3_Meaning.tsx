import React from 'react';
import {CheckIcon, Stamp} from '../../../shared/components/ui';
import {C, FPS} from '../../../shared/theme';
import {At, BOUNCY, EASE_IN, EASE_IO, MaskWords, bump, hexA, kf, mix, ps, sp, useF} from '../kit';
import {Actor, CakeSlices, Cursor, Door, FILE_WIN, FileWindow, IMPORTANT_ROW, KeyIcon, PlateBase, SituationCard, Table, fileRowY, sliceDir} from '../props';

// S08 "Lalu, kapan pola ini digunakan?" → S09 tindakan selesai → S10 penyesalan / tidak disengaja.
// Kartu kue dari S08 membesar menjadi panggung; panggung yang sama lalu berganti isi (kunci → file).

const PLATE = {x: 450, y: 860, d: 420, r: 155};
const EAT = [26.15, 26.4, 26.65, 26.9, 27.15];
const WIN_S = 0.86;
const WIN = {x: 540, y: 905};

export const Act3_Meaning: React.FC = () => {
  const f = useF();
  const t = f / FPS;

  // ── S08 ──
  const merge = ps(f, 25.35, 25.86, EASE_IO);
  const antic = bump(f, 24.95, 25.4);
  const keyIn = sp(f, 24.2);
  const cakeIn = sp(f, 24.35);

  // panggung (lahir dari kartu kue)
  const stage = {
    x: mix(mix(1400, 830, cakeIn) + antic * 30, 540, merge),
    y: kf(f, [[25.35, 1150], [25.86, 900], [28.6, 900], [29.3, 960]]),
    w: mix(380, 860, merge),
    h: kf(f, [[25.35, 340], [25.86, 760], [28.6, 760], [29.3, 620]]),
  };
  const stageOut = ps(f, 33.95, 34.5, EASE_IN);
  const stageO = Math.min(1, cakeIn * 2) * (1 - stageOut);

  // ── S09: kue habis = tindakan tuntas ──
  const cakeO = ps(f, 25.65, 25.95) * (1 - ps(f, 28.75, 29.15));
  const gone = EAT.map((e) => ps(f, e, e + 0.2, EASE_IN));
  const flyP = ps(f, 27.35, 27.65, EASE_IO);
  const [sx, sy] = sliceDir(5);
  const mouth = {x: 790, y: 1075};
  const fly = {
    i: 5,
    dx: (mouth.x - (PLATE.x + sx * PLATE.r * 0.58)) * flyP,
    dy: (mouth.y - (PLATE.y + sy * PLATE.r * 0.58)) * flyP - Math.sin(Math.PI * flyP) * 70,
    s: 1 - 0.7 * flyP,
    o: 1 - ps(f, 27.6, 27.68),
  };
  const progress = (gone.reduce((a, g) => a + g, 0) + flyP) / 6;
  const ringC = 2 * Math.PI * 240;
  const done = ps(f, 27.7, 27.95);
  const doneStamp = sp(f, 27.85, BOUNCY);

  // ── S10 ──
  const keyScene = ps(f, 29.25, 29.65) * (1 - ps(f, 32.05, 32.35));
  const keySlide = ps(f, 32.05, 32.4, EASE_IN) * -900;
  const fileIn = ps(f, 32.1, 32.5);
  const arc = ps(f, 30.1, 30.7, EASE_IO);
  const curP = ps(f, 32.2, 32.5, EASE_IO);
  const sel = ps(f, 32.45, 32.55);
  const del = ps(f, 32.72, 33.02);
  const st1 = sp(f, 31.55, BOUNCY);
  const st2 = sp(f, 33.0, BOUNCY);

  // karakter berjalan dari sisi piring ke dekat pintu
  const actor = {
    x: kf(f, [[28.9, 790], [29.5, 610], [32.05, 610], [32.4, 420]]),
    y: kf(f, [[28.9, 1250], [29.5, 1218]]),
    h: 320,
  };
  const actorExp = t < 27.7 ? 'happy' : t < 28.72 ? 'satisfied' : t < 30.6 ? 'awkward' : 'shocked';

  return (
    <>
      {/* S08 — pertanyaan */}
      {t < 26 && (
        <>
          <At y={610}>
            <MaskWords f={f} size={84} out={25.35} words={[{t: 'LALU,', at: 23.67, color: C.textSecondary}]} />
          </At>
          <At y={730}>
            <MaskWords
              f={f}
              size={104}
              out={25.38}
              words={[
                {t: 'KAPAN', at: 24.1, color: C.gold},
                {t: 'POLA', at: 24.28},
                {t: 'INI', at: 24.44},
              ]}
            />
          </At>
          <At y={850}>
            <MaskWords f={f} size={104} out={25.41} words={[{t: 'DIGUNAKAN?', at: 24.66}]} />
          </At>
          {/* kartu kunci: masuk dari kiri, lalu menyelip ke belakang panggung */}
          <At x={mix(mix(-320, 250, keyIn) - antic * 30, 540, merge)} y={mix(1150, 900, merge)} s={mix(1, 0.8, merge)} o={Math.min(1, keyIn * 2) * (1 - ps(f, 25.45, 25.8))}>
            <SituationCard kind="key" w={380} h={340} art={0.9} />
          </At>
        </>
      )}

      {/* panggung */}
      {t >= 24.3 && stageO > 0.001 && (
        <div style={{position: 'absolute', inset: 0, opacity: stageO, transform: `translateY(${stageOut * 70}px) scale(${1 - stageOut * 0.08})`, transformOrigin: '540px 960px'}}>
          <At x={stage.x} y={stage.y}>
            <SituationCard kind="cake" w={stage.w} h={stage.h} art={0.9} artO={1 - ps(f, 25.35, 25.6)} />
          </At>

          {/* S09 */}
          {cakeO > 0.001 && (
            <div style={{position: 'absolute', inset: 0, opacity: cakeO}}>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                <circle cx={PLATE.x} cy={PLATE.y} r={240} fill="none" stroke={C.borderSubtle} strokeWidth={12} />
                <circle
                  cx={PLATE.x}
                  cy={PLATE.y}
                  r={240}
                  fill="none"
                  stroke={C.matcha}
                  strokeWidth={12}
                  strokeLinecap="round"
                  strokeDasharray={ringC}
                  strokeDashoffset={ringC * (1 - progress)}
                  transform={`rotate(-90 ${PLATE.x} ${PLATE.y})`}
                  style={{filter: `drop-shadow(0 0 ${10 * done}px ${C.matcha})`}}
                />
              </svg>
              <At x={PLATE.x} y={PLATE.y}>
                <PlateBase d={PLATE.d} crumbs={ps(f, 27.6, 27.8)} />
              </At>
              <At x={PLATE.x} y={PLATE.y}>
                <div style={{position: 'absolute', left: -PLATE.r - 6, top: -PLATE.r - 6}}>
                  <CakeSlices r={PLATE.r} gone={gone} fly={fly} />
                </div>
              </At>
              <At x={PLATE.x} y={PLATE.y} s={0.6 + 0.4 * done} o={done}>
                <div style={{width: 120, height: 120, borderRadius: '50%', background: C.matcha, border: `4px solid ${C.matchaDeep}`, boxShadow: `0 0 40px ${hexA(C.matcha, 0.5)}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <CheckIcon size={76} color="#06241a" draw={ps(f, 27.75, 28.0)} stroke={3.4} />
                </div>
              </At>
              <At x={PLATE.x} y={1186} s={2 - doneStamp} o={Math.min(1, doneStamp * 2)}>
                <Stamp text="SELESAI DILAKUKAN" color={C.matcha} size={38} rotate={-4} style={{whiteSpace: 'nowrap'}} />
              </At>
            </div>
          )}

          {/* S10a — kunci tertinggal */}
          {keyScene > 0.001 && (
            <div style={{position: 'absolute', inset: 0, opacity: keyScene, transform: `translateX(${keySlide}px)`}}>
              <div style={{position: 'absolute', left: 150, right: 150, top: 1218, borderTop: `3px dashed ${C.thread}`}} />
              <div style={{position: 'absolute', left: 170, top: 1100}}>
                <Table w={200} h={118} />
              </div>
              <At x={270} y={1058}>
                <KeyIcon size={130} glow={0.5 + 0.5 * Math.sin(f / 3.5)} />
              </At>
              <div style={{position: 'absolute', left: 730, top: 818}}>
                <Door w={170} h={400} open={0.4} />
              </div>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                <path d="M560 950 Q420 800 290 1000" fill="none" stroke={C.hanko} strokeWidth={5} strokeLinecap="round" strokeDasharray="5 15" pathLength={100} opacity={arc} />
              </svg>
            </div>
          )}
          {t >= 25.5 && t < 32.45 && (
            <Actor
              x={actor.x}
              y={actor.y}
              h={actor.h}
              expression={actorExp}
              bubble={t >= 30.6 ? 'exclamation' : undefined}
              o={ps(f, 25.7, 25.95) * (1 - ps(f, 32.05, 32.3))}
            />
          )}

          {/* S10b — file penting terhapus */}
          {fileIn > 0.001 && (
            <div style={{position: 'absolute', inset: 0, opacity: fileIn, transform: `translateX(${(1 - fileIn) * 500}px)`}}>
              <div style={{position: 'absolute', left: WIN.x - (FILE_WIN.w * WIN_S) / 2, top: WIN.y - (FILE_WIN.h * WIN_S) / 2, transform: `scale(${WIN_S})`, transformOrigin: '0 0'}}>
                <FileWindow sel={sel} del={del} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: mix(760, 600, curP),
                  top: mix(1170, WIN.y - (FILE_WIN.h * WIN_S) / 2 + fileRowY(IMPORTANT_ROW) * WIN_S - 6, curP),
                }}
              >
                <Cursor press={bump(f, 32.62, 32.82)} />
              </div>
              <Actor x={870} y={1268} h={230} expression="shocked" bubble="exclamation" s={sp(f, 32.9, BOUNCY)} o={Math.min(1, sp(f, 32.9, BOUNCY) * 2)} />
            </div>
          )}

          {/* dua kata kunci, di bawah panggung — pola utama di atas tidak tertutup */}
          <At x={262} y={1362} s={2 - st1} o={Math.min(1, st1 * 2)}>
            <Stamp text="PENYESALAN" color={C.hanko} size={42} style={{whiteSpace: 'nowrap'}} />
          </At>
          <At x={722} y={1362} s={2 - st2} o={Math.min(1, st2 * 2)}>
            <Stamp text="TIDAK DISENGAJA" color={C.gold} size={42} rotate={-5} style={{whiteSpace: 'nowrap'}} />
          </At>
        </div>
      )}
    </>
  );
};
