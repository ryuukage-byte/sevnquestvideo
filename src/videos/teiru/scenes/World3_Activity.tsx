import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  BOUNCY,
  BookIcon,
  Cap,
  GCard,
  Hi,
  Jp,
  Label,
  Line,
  RamenBowl,
  SOFT,
  Strike,
  Win,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 31.0;

export const World3_Activity: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- 31.0s - 36.5s: Formula & Strike ----------
  const formulaIn = pp(T, 31.2, BOUNCY);
  const claimIn = pp(T, 32.2, SOFT);
  const strikeP = ps(T, 33.2, 33.7);
  const replaceIn = pp(T, 34.0, BOUNCY);

  // ---------- 36.5s - 41.0s: Dua Kartu Bergerak ----------
  const cardsIn = ps(T, 36.3, 37.0);
  const steamLoop = (T * 1.6) % 1;
  const flipLoop = (T * 1.4) % 1;

  // ---------- 41.0s - 45.0s: Timeline Melintasi NOW ----------
  const tlIn = ps(T, 41.0, 41.8);
  const wavePulse = Math.sin(T * 8) * 6;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={S(31.2)} volume={0.4} />
          <Sfx name="pop" at={S(32.2)} volume={0.4} />
          {/* Strike sound */}
          <Sfx name="swipe" at={S(33.2)} volume={0.5} />
          <Sfx name="sparkle" at={S(34.0)} volume={0.6} />
          {/* Cards enter */}
          <Sfx name="pop" at={S(36.5)} volume={0.45} />
          <Sfx name="stroke" at={S(36.8)} volume={0.4} />
          {/* Timeline reveal */}
          <Sfx name="whoosh" at={S(41.0)} volume={0.5} />
          <Sfx name="chime" at={S(41.8)} volume={0.6} />
        </>
      )}

      {/* ==================== BAGIAN 1: RUMUS & PEMATAHAN (31.0s - 36.2s) ==================== */}
      <Win T={T} a={31.0} b={36.2} dy={0}>
        {/* Rumus Vて + いる */}
        <At y={480} style={{opacity: formulaIn, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, formulaIn)})`}}>
          <GCard color={C.indigoSoft} style={{padding: '24px 50px', gap: 24}}>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: C.text}}>
              V<Jp size={64} color={C.gold}>て</Jp>
            </span>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 52, color: C.textSecondary}}>
              +
            </span>
            <Jp size={64} color={C.gold}>いる</Jp>
          </GCard>
        </At>

        {/* SELALU = SEDANG (dengan coretan) */}
        <At y={740} style={{opacity: claimIn}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <Strike p={strikeP} color={C.hanko} height={12}>
                <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 54, color: C.textSecondary}}>
                  SELALU
                </span>
              </Strike>
              <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 54, color: C.textSecondary}}>
                = SEDANG
              </span>
            </div>

            {/* Pengganti: BISA PUNYA BEBERAPA FUNGSI */}
            {T >= 34.0 && (
              <div style={{opacity: replaceIn, transform: `scale(${mix(0.8, 1, replaceIn)})`}}>
                <Pill color={C.gold} size={36} filled>
                  BISA PUNYA BEBERAPA FUNGSI
                </Pill>
              </div>
            )}
          </div>
        </At>
      </Win>

      {/* ==================== BAGIAN 2: DUA KARTU AKTIVITAS (36.2s - 45.0s) ==================== */}
      <Win T={T} a={36.2} b={45.0} dy={0}>
        {/* Label Tag */}
        <At y={340} style={{opacity: cardsIn}}>
          <Pill color={C.teal} size={34}>
            FUNGSI ① : AKTIVITAS (CURRENT ACTION)
          </Pill>
        </At>

        {/* Dua Kartu Side by Side */}
        <div style={{position: 'absolute', inset: 0, opacity: cardsIn}}>
          {/* Kartu 1: 食べている */}
          <At x={300} y={640}>
            <GCard color={C.gold} style={{width: 440, height: 420, flexDirection: 'column', gap: 16, padding: '24px 20px'}}>
              <RamenBowl size={130} steam={steamLoop} />
              <Jp size={56} color={C.gold}>食べている</Jp>
              <Label size={34} color={C.text}>sedang makan</Label>
              <Pill color={C.matcha} size={22}>BERLANGSUNG</Pill>
            </GCard>
          </At>

          {/* Kartu 2: 読んでいる */}
          <At x={780} y={640}>
            <GCard color={C.indigoSoft} style={{width: 440, height: 420, flexDirection: 'column', gap: 16, padding: '24px 20px'}}>
              <BookIcon size={130} flip={flipLoop} />
              <Jp size={56} color={C.indigoSoft}>読んでいる</Jp>
              <Label size={34} color={C.text}>sedang membaca</Label>
              <Pill color={C.matcha} size={22}>BERLANGSUNG</Pill>
            </GCard>
          </At>
        </div>

        {/* ==================== TIMELINE: PAST ━━━━ ● NOW ━━━━ FUTURE (41.0s - 45.0s) ==================== */}
        {T >= 40.8 && (
          <div style={{position: 'absolute', inset: 0, opacity: tlIn}}>
            {/* Garis Garis Timeline */}
            <Line d="M120 1020 H960" p={tlIn} color="rgba(151,181,224,0.3)" w={6} />

            {/* Segmen Gelombang Aktivitas yang Melintasi NOW */}
            <Line
              d="M360 1020 H720"
              p={tlIn}
              color={C.gold}
              w={14}
            />

            {/* Titik PAST */}
            <At x={200} y={1020}>
              <div style={{width: 16, height: 16, borderRadius: 8, background: C.textMuted}} />
            </At>
            <At x={200} y={1080}>
              <span style={{fontFamily: FONT.mono, fontSize: 24, color: C.textMuted, letterSpacing: 2}}>PAST</span>
            </At>

            {/* Titik NOW (Titik Fokus Utama) */}
            <At x={540} y={1020}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: C.gold,
                  boxShadow: `0 0 ${30 + wavePulse * 2}px ${hexA(C.gold, 0.9)}`,
                  transform: `scale(${1 + wavePulse * 0.05})`,
                }}
              />
            </At>
            <At x={540} y={1090}>
              <Pill color={C.gold} size={30} filled>NOW</Pill>
            </At>

            {/* Titik FUTURE */}
            <At x={880} y={1020}>
              <div style={{width: 16, height: 16, borderRadius: 8, background: C.textMuted}} />
            </At>
            <At x={880} y={1080}>
              <span style={{fontFamily: FONT.mono, fontSize: 24, color: C.textMuted, letterSpacing: 2}}>FUTURE</span>
            </At>

            {/* Penjelasan rentang aktivitas */}
            <At y={1200}>
              <Label size={38} color={C.textSecondary}>
                Aksi aktif melintasi momen saat ini (NOW)
              </Label>
            </At>
          </div>
        )}
      </Win>

      {/* ==================== CAPTIONS ==================== */}
      <Cap t={T} at={31.2} until={34.0} size={50}>
        Pola <Hi>Vて + いる</Hi> ternyata tidak selalu berarti "sedang".
      </Cap>
      <Cap t={T} at={34.2} until={36.5} size={50}>
        Pola ini bisa punya <Hi>beberapa fungsi</Hi>.
      </Cap>
      <Cap t={T} at={36.8} until={40.8} size={50}>
        Fungsi pertama adalah <Hi>aktivitas</Hi> yang memang sedang berjalan.
      </Cap>
      <Cap t={T} at={41.2} until={45.0} size={50}>
        Aksinya aktif dimulai di masa lalu dan melewati titik <Hi>NOW</Hi>.
      </Cap>
    </AbsoluteFill>
  );
};
