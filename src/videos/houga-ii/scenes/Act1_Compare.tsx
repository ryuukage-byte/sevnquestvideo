import React from 'react';
import {AbsoluteFill} from 'remotion';
import {EASE_IN, EASE_IO, mix} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {NotEqual, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {AtY, BOUNCY, Cap, FORM, Hi, JpSpan, SOFT, VerbSentence, bump, hexA, pp, ps, sec, useT, verbWidth} from '../kit';

const SIZE = 108;
const VERB_W = verbWidth(3, SIZE); // 食べた / 食べる
const TOTAL_W = VERB_W + 5 * SIZE;
const LEFT0 = (1080 - TOTAL_W) / 2;
const TAIL_L = LEFT0 + VERB_W;
const TAIL_R = TAIL_L + 5 * SIZE;

// S01–S08 · 0:00.00 → 0:12.16 · satu panggung, kalimat A (食べた) & B (食べる) berpindah posisi.
export const Act1_Compare: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const t = useT();

  // ---- posisi vertikal per fase ----
  const toTop = ps(t, 1.18, 1.7, EASE_IO); // S02: kalimat A naik
  const apart = ps(t, 3.98, 4.5, EASE_IO); // S05: dua kalimat menjauh
  const split = ps(t, 9.15, 9.8, EASE_IO); // S08: pecah jadi た-form / る-form
  let yA: number;
  let yB: number;
  if (t < 6.41) {
    yA = mix(960, 760, toTop);
    yB = 1160;
    yA = mix(yA, 640, apart);
    yB = mix(yB, 1280, apart);
  } else {
    yA = mix(720, 660, split);
    yB = mix(1080, 1140, split);
  }

  // ---- grup: S06 zoom-out cepat, S07 kembali dari tengah ----
  const zoomOut = ps(t, 5.58, 6.41, EASE_IN);
  const zoomIn = ps(t, 6.41, 7.05);
  let gScale = 1;
  let gOpacity = 1;
  if (t >= 5.58 && t < 6.41) {
    gScale = mix(1, 0.12, zoomOut);
    gOpacity = 1 - ps(t, 5.9, 6.41, (x) => x);
  } else if (t >= 6.41) {
    gScale = mix(0.55, 1, zoomIn);
    gOpacity = ps(t, 6.41, 6.8, (x) => x);
  }

  // ---- S01: blur → tajam, 96% → 100% ----
  const enter = ps(t, 0, 0.42);
  const s1Scale = mix(0.96, 1, ps(t, 0, 1.18));
  const aBlur = (1 - enter) * 18;

  // ---- sorotan ----
  const hlA = ps(t, 0.35, 0.75);
  const hlB = ps(t, 2.45, 2.85);
  const pB = pp(t, 2.14, SOFT);
  const endA = bump(t, 3.11, 3.52);
  const endB = bump(t, 3.5, 3.98);

  // ---- ekor ほうがいい: redup saat fokus た/る (S04) & saat S08 ----
  let tail = 1;
  tail = mix(tail, 0.3, ps(t, 3.11, 3.3));
  tail = mix(tail, 1, ps(t, 3.98, 4.3));
  if (t >= 6.41) tail = mix(1, 0.2, ps(t, 9.15, 9.65));

  // ---- elemen tengah ----
  const neqIn = pp(t, 2.3, BOUNCY);
  const neqOut = 1 - ps(t, 3.0, 3.15, (x) => x);
  const vsIn = pp(t, 3.11, BOUNCY);
  const vsOut = 1 - ps(t, 3.9, 4.05, (x) => x);
  const qIn = pp(t, 4.0, BOUNCY);

  // ---- S07: konektor ke ほうがいい yang identik ----
  const rect = ps(t, 7.1, 7.9);
  const lineP = ps(t, 7.4, 8.3);
  const rectOut = 1 - ps(t, 9.15, 9.5, (x) => x);
  const samePill = pp(t, 8.0, BOUNCY);

  // ---- S08: label た-form / る-form ----
  const lblA = pp(t, 9.55, BOUNCY);
  const lblB = pp(t, 9.85, BOUNCY);
  const verbHl = t >= 9.15 ? 1 : 1;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="impact-soft" at={sec(0.02)} volume={0.55} />
          <Sfx name="swipe" at={sec(1.18)} volume={0.28} />
          <Sfx name="pop" at={sec(2.14)} volume={0.4} />
          <Sfx name="tick" at={sec(2.35)} volume={0.4} />
          <Sfx name="tick" at={sec(3.11)} volume={0.45} />
          <Sfx name="tick" at={sec(3.5)} volume={0.45} />
          <Sfx name="pop" at={sec(4.0)} volume={0.55} />
          <Sfx name="whoosh" at={sec(5.6)} volume={0.45} />
          <Sfx name="swipe" at={sec(6.45)} volume={0.35} />
          <Sfx name="tick" at={sec(7.45)} volume={0.35} />
          <Sfx name="tick" at={sec(7.75)} volume={0.35} />
          <Sfx name="pop" at={sec(8.0)} volume={0.4} />
          <Sfx name="whoosh-soft" at={sec(9.15)} volume={0.3} />
          <Sfx name="pop" at={sec(9.55)} volume={0.45} />
          <Sfx name="pop" at={sec(9.85)} volume={0.45} />
        </>
      )}

      <AbsoluteFill style={{opacity: gOpacity, transform: `scale(${gScale})`, transformOrigin: '50% 50%'}}>
        {/* kalimat A: 食べた */}
        <AtY
          y={yA}
          style={{
            opacity: enter,
            filter: aBlur > 0.2 ? `blur(${aBlur}px)` : undefined,
            transform: `translateY(-50%) scale(${s1Scale})`,
          }}
        >
          <VerbSentence
            kanji="食"
            ruby="た"
            kana="べ"
            end="ta"
            size={SIZE}
            hlVerb={hlA}
            hlEnd={endA}
            tail={tail}
          />
        </AtY>

        {/* kalimat B: 食べる */}
        {t >= 2.14 && (
          <AtY y={yB + (1 - pB) * 70} style={{opacity: pB}}>
            <VerbSentence
              kanji="食"
              ruby="た"
              kana="べ"
              end="ru"
              size={SIZE}
              hlVerb={hlB}
              hlEnd={endB}
              tail={tail}
            />
          </AtY>
        )}

        {/* S03: ≠? (komponen NotEqual yang sudah ada) */}
        {t >= 2.3 && t < 3.2 && (
          <AtY y={960} style={{opacity: neqOut * neqIn, transform: `translateY(-50%) scale(${neqIn})`}}>
            <NotEqual size={150} color={C.text} slash={C.hanko} p={ps(t, 2.3, 2.8)} />
            <span
              style={{
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 110,
                color: C.gold,
                marginLeft: 8,
                alignSelf: 'center',
                opacity: ps(t, 2.7, 2.95, (x) => x),
              }}
            >
              ?
            </span>
          </AtY>
        )}

        {/* S04: た vs る */}
        {t >= 3.11 && t < 4.1 && (
          <AtY y={960} style={{opacity: vsOut, transform: `translateY(-50%) scale(${vsIn})`}}>
            <Surface tone="elevated" radius={44} style={{padding: '14px 46px', display: 'flex', alignItems: 'baseline', gap: 28}}>
              <JpSpan style={{fontSize: 92, color: FORM.ta.color, textShadow: `0 0 26px ${hexA(FORM.ta.color, 0.5)}`}}>た</JpSpan>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 38, color: C.textSecondary}}>vs</span>
              <JpSpan style={{fontSize: 92, color: FORM.ru.color, textShadow: `0 0 26px ${hexA(FORM.ru.color, 0.5)}`}}>る</JpSpan>
            </Surface>
          </AtY>
        )}

        {/* S05: tanda tanya pop di tengah */}
        {t >= 4.0 && t < 6.41 && (
          <AtY y={960} style={{opacity: qIn, transform: `translateY(-50%) scale(${qIn})`}}>
            <Surface
              tone="elevated"
              radius={130}
              border={C.gold}
              style={{
                width: 260,
                height: 260,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 60px ${hexA(C.gold, 0.28)}`,
              }}
            >
              <span style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 200, color: C.gold, lineHeight: 1}}>?</span>
            </Surface>
          </AtY>
        )}

        {/* S07: konektor + kotak putus-putus di ほうがいい */}
        {t >= 7.1 && (
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: rectOut}}>
            <rect
              x={TAIL_L - 14}
              y={yA - 100}
              width={TAIL_R - TAIL_L + 28}
              height={yB - yA + 200}
              rx={40}
              fill="none"
              stroke={C.gold}
              strokeWidth={3}
              strokeDasharray="14 12"
              opacity={0.75 * rect}
            />
            {[TAIL_L + 40, TAIL_R - 40].map((x, i) => (
              <g key={i}>
                <path
                  d={`M${x} ${yA + 92}V${yB - 92}`}
                  stroke={C.gold}
                  strokeWidth={4}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - lineP}
                />
                <path
                  d={`M${x - 10} ${yB - 108}L${x} ${yB - 92}L${x + 10} ${yB - 108}`}
                  stroke={C.gold}
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={lineP > 0.95 ? 1 : 0}
                />
                <path
                  d={`M${x - 10} ${yA + 108}L${x} ${yA + 92}L${x + 10} ${yA + 108}`}
                  stroke={C.gold}
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={lineP > 0.95 ? 1 : 0}
                />
              </g>
            ))}
          </svg>
        )}
        {t >= 8.0 && (
          <div
            style={{
              position: 'absolute',
              left: (TAIL_L + TAIL_R) / 2 - 130,
              width: 260,
              top: (yA + yB) / 2 - 36,
              display: 'flex',
              justifyContent: 'center',
              opacity: samePill * rectOut,
              transform: `scale(${samePill})`,
            }}
          >
            <Pill color={C.gold} size={32} filled>
              SAMA PERSIS
            </Pill>
          </div>
        )}

        {/* S08: label た-form / る-form di bawah kata kerja */}
        {t >= 9.55 && (
          <div
            style={{
              position: 'absolute',
              left: LEFT0 + VERB_W / 2 - 150,
              width: 300,
              top: yA + 110,
              display: 'flex',
              justifyContent: 'center',
              opacity: lblA,
              transform: `scale(${lblA})`,
            }}
          >
            <Pill color={FORM.ta.color} size={32} filled={verbHl === 1}>
              <JpSpan style={{fontSize: 36}}>た</JpSpan>-form
            </Pill>
          </div>
        )}
        {t >= 9.85 && (
          <div
            style={{
              position: 'absolute',
              left: LEFT0 + VERB_W / 2 - 150,
              width: 300,
              top: yB + 110,
              display: 'flex',
              justifyContent: 'center',
              opacity: lblB,
              transform: `scale(${lblB})`,
            }}
          >
            <Pill color={FORM.ru.color} size={32} filled>
              <JpSpan style={{fontSize: 36}}>る</JpSpan>-form
            </Pill>
          </div>
        )}
      </AbsoluteFill>

      {/* teks storyboard */}
      <Cap t={t} at={4.1} until={5.4}>
        Bedanya apa?
      </Cap>
      <Cap t={t} at={6.7} until={9.0}>
        Kelihatannya <Hi>mirip...</Hi>
      </Cap>
      <Cap t={t} at={9.3}>
        Tapi <Hi>fungsinya</Hi> berbeda.
      </Cap>
    </AbsoluteFill>
  );
};
