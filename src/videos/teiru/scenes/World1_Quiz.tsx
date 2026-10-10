import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  Avatar,
  BOUNCY,
  BookIcon,
  Cap,
  GCard,
  Hi,
  Jp,
  Label,
  QuizCircles,
  RamenBowl,
  SOFT,
  Win,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 0;

export const World1_Quiz: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- S01: 食べている (0.0s - 3.8s) ----------
  const bigPop = pp(T, 0.2, BOUNCY);
  const artPop = pp(T, 1.4, SOFT);
  const hlTeiru = ps(T, 1.8, 2.5);

  // ---------- S02: Countdown Dots (3.8s - 5.8s) ----------
  const cdIn = ps(T, 3.7, 4.0);
  const cdStep = T < 4.2 ? 0 : T < 4.8 ? 1 : T < 5.4 ? 2 : 3;

  // ---------- S03: Jawaban 1 - Sedang Makan (5.5s - 8.5s) ----------
  const ans1In = pp(T, 5.6, BOUNCY);
  const check1 = ps(T, 6.2, 6.7);
  const steamLoop = (T * 1.5) % 1;

  // ---------- Horizontal Pan ke Quiz 2 (8.4s - 8.9s) ----------
  const pan = ps(T, 8.4, 9.0, (x) => x * x * (3 - 2 * x));
  const panOffset = pan * 1080;

  // ---------- S04: 読んでいる (8.8s - 15.8s) ----------
  const readPop = pp(T, 9.1, BOUNCY);
  const cd2Step = T < 10.4 ? 0 : T < 11.0 ? 1 : T < 11.6 ? 2 : 3;
  const ans2In = pp(T, 11.8, BOUNCY);
  const check2 = ps(T, 12.3, 12.8);
  const pageFlip = (T * 1.2) % 1;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={S(0.2)} volume={0.4} />
          <Sfx name="pop" at={S(0.4)} volume={0.5} />
          <Sfx name="sparkle" at={S(1.8)} volume={0.45} />
          {/* Tick SFX countdown 1 */}
          <Sfx name="tick" at={S(4.2)} volume={0.65} />
          <Sfx name="tick" at={S(4.8)} volume={0.65} />
          <Sfx name="tick" at={S(5.4)} volume={0.8} />
          {/* Jawaban reveal */}
          <Sfx name="chime" at={S(5.7)} volume={0.65} />
          <Sfx name="pop" at={S(6.2)} volume={0.5} />
          {/* Pan Swipe */}
          <Sfx name="swipe" at={S(8.4)} volume={0.5} />
          <Sfx name="pop" at={S(9.1)} volume={0.5} />
          {/* Tick SFX countdown 2 */}
          <Sfx name="tick" at={S(10.4)} volume={0.65} />
          <Sfx name="tick" at={S(11.0)} volume={0.65} />
          <Sfx name="tick" at={S(11.6)} volume={0.8} />
          {/* Jawaban 2 reveal */}
          <Sfx name="chime" at={S(11.9)} volume={0.65} />
          <Sfx name="pop" at={S(12.3)} volume={0.5} />
        </>
      )}

      {/* ==================== PANEL 1: 食べている ==================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${-panOffset}px)`,
        }}
      >
        {/* Teks Utama: 食べている */}
        <Win T={T} a={0.0} b={8.3} dy={0}>
          <At y={520} style={{transform: `translate(-50%,-50%) scale(${mix(0.8, 1, bigPop)})`, opacity: bigPop}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
              <span style={{fontFamily: FONT.mono, fontSize: 32, color: C.indigoSoft, letterSpacing: 2}}>
                tabete iru
              </span>
              <Jp size={150}>
                食べて
                <span
                  style={{
                    color: C.gold,
                    textShadow: `0 0 ${40 * hlTeiru + 20}px ${hexA(C.gold, 0.75)}`,
                    transform: `scale(${1 + 0.08 * hlTeiru})`,
                    display: 'inline-block',
                  }}
                >
                  いる
                </span>
              </Jp>
            </div>
          </At>

          {/* Prompt: Artinya...? (0.0s - 3.8s) */}
          {T < 3.8 && (
            <At y={740} style={{opacity: artPop, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, artPop)})`}}>
              <Pill color={C.gold} size={40}>Artinya...?</Pill>
            </At>
          )}

          {/* Countdown Dots (3.8s - 5.5s) */}
          {T >= 3.7 && T < 5.6 && (
            <At y={740} style={{opacity: cdIn, transform: `translate(-50%,-50%) scale(${cdIn})`}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                <QuizCircles step={cdStep} size={36} />
                <span style={{fontFamily: FONT.mono, fontSize: 24, color: C.textSecondary, letterSpacing: 3}}>
                  THINKING…
                </span>
              </div>
            </At>
          )}

          {/* Reveal Jawaban: SEDANG MAKAN ✓ + Avatar + Ramen (5.6s - 8.3s) */}
          {T >= 5.5 && (
            <At y={860} style={{opacity: ans1In, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, ans1In)})`}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32}}>
                {/* Visual Ramen & Avatar */}
                <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
                  <Avatar tier={1} height={160} />
                  <RamenBowl size={160} steam={steamLoop} />
                </div>

                {/* Badge Jawaban */}
                <GCard color={C.matcha} glow={check1} style={{padding: '24px 44px', gap: 16}}>
                  <span style={{color: C.matcha}}>
                    <CheckIcon size={52} draw={check1} stroke={4} />
                  </span>
                  <Label size={56} color={C.text}>
                    SEDANG MAKAN
                  </Label>
                </GCard>
              </div>
            </At>
          )}
        </Win>
      </div>

      {/* ==================== PANEL 2: 読んでいる ==================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${1080 - panOffset}px)`,
        }}
      >
        <Win T={T} a={8.2} b={16.0} dy={0}>
          {/* Teks Utama: 読んでいる */}
          <At y={520} style={{transform: `translate(-50%,-50%) scale(${mix(0.8, 1, readPop)})`, opacity: readPop}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
              <span style={{fontFamily: FONT.mono, fontSize: 32, color: C.indigoSoft, letterSpacing: 2}}>
                yonde iru
              </span>
              <Jp size={150}>
                読んで
                <span style={{color: C.gold, textShadow: `0 0 35px ${hexA(C.gold, 0.75)}`}}>
                  いる
                </span>
              </Jp>
            </div>
          </At>

          {/* Countdown Dots 2 (8.8s - 11.7s) */}
          {T < 11.7 && (
            <At y={740}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                <QuizCircles step={cd2Step} size={36} />
                <span style={{fontFamily: FONT.mono, fontSize: 24, color: C.textSecondary, letterSpacing: 3}}>
                  THINKING…
                </span>
              </div>
            </At>
          )}

          {/* Reveal Jawaban: SEDANG MEMBACA ✓ + Avatar + Book (11.7s - 16.0s) */}
          {T >= 11.7 && (
            <At y={860} style={{opacity: ans2In, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, ans2In)})`}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32}}>
                {/* Visual Book & Avatar */}
                <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
                  <Avatar tier={2} height={160} />
                  <BookIcon size={160} flip={pageFlip} />
                </div>

                {/* Badge Jawaban */}
                <GCard color={C.matcha} glow={check2} style={{padding: '24px 44px', gap: 16}}>
                  <span style={{color: C.matcha}}>
                    <CheckIcon size={52} draw={check2} stroke={4} />
                  </span>
                  <Label size={56} color={C.text}>
                    SEDANG MEMBACA
                  </Label>
                </GCard>
              </div>
            </At>
          )}
        </Win>
      </div>

      {/* ==================== CAPTIONS (ZONA AMAN BAWAH) ==================== */}
      <Cap t={T} at={0.3} until={3.5} size={50}>
        Kalau ada kata <Hi>食べている</Hi>... artinya apa?
      </Cap>
      <Cap t={T} at={5.6} until={8.3} size={52}>
        Banyak yang langsung jawab: <Hi>sedang makan</Hi> ✓
      </Cap>
      <Cap t={T} at={8.8} until={11.5} size={50}>
        Lalu kalau <Hi>読んでいる</Hi>?
      </Cap>
      <Cap t={T} at={11.8} until={15.8} size={52}>
        Artinya <Hi>sedang membaca</Hi> ✓ Kelihatannya simpel, kan?
      </Cap>
    </AbsoluteFill>
  );
};
