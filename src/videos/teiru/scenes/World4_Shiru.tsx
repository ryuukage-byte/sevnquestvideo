import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  BOUNCY,
  Cap,
  GCard,
  Hi,
  Jp,
  Label,
  LightbulbIcon,
  Line,
  Win,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 45.0;

export const World4_Shiru: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- 45.0s - 53.0s: Pengenalan 知る & Transformasi ----------
  const shiruIn = pp(T, 45.2, BOUNCY);
  // Transformasi bertahap:
  // Step 1: Belum tahu (46.5s)
  // Step 2: Info tiba -> 知る (48.5s)
  // Step 3: Menjadi tahu (50.5s)
  const step1 = ps(T, 46.5, 47.2);
  const infoFlight = ps(T, 48.2, 49.0);
  const bulbSpark = pp(T, 49.0, BOUNCY);
  const step3 = ps(T, 50.5, 51.2);

  // ---------- 53.0s - 65.0s: Long Timeline Unfold ----------
  const tlEnter = ps(T, 53.2, 54.2);
  const lineDraw = ps(T, 54.0, 56.5);
  const eventPop = pp(T, 56.5, BOUNCY);
  const stateDraw = ps(T, 57.0, 60.5);
  const nowPop = pp(T, 60.5, BOUNCY);

  // ---------- 65.0s - 78.0s: Memasang 知っている ke State ----------
  const attachIn = pp(T, 65.2, BOUNCY);
  const cardHighlight = ps(T, 68.0, 69.5);
  const glowPulse = Math.sin(T * 6) * 0.15;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={S(45.2)} volume={0.4} />
          <Sfx name="pop" at={S(46.5)} volume={0.4} />
          {/* Info tiba & bohlam menyala */}
          <Sfx name="swipe" at={S(48.2)} volume={0.45} />
          <Sfx name="ding" at={S(49.0)} volume={0.75} />
          <Sfx name="sparkle" at={S(49.2)} volume={0.5} />
          {/* Timeline sounds */}
          <Sfx name="whoosh" at={S(53.2)} volume={0.4} />
          <Sfx name="stroke" at={S(54.2)} volume={0.4} />
          <Sfx name="impact-soft" at={S(56.5)} volume={0.65} />
          <Sfx name="stroke" at={S(57.5)} volume={0.4} />
          <Sfx name="chime" at={S(60.5)} volume={0.7} />
          {/* Attach 知っている */}
          <Sfx name="pop" at={S(65.2)} volume={0.6} />
          <Sfx name="sparkle" at={S(68.0)} volume={0.5} />
        </>
      )}

      {/* ==================== FASE 1: KONSEP DASAR 知る (45.0s - 53.0s) ==================== */}
      <Win T={T} a={45.0} b={53.0} dy={0}>
        {/* Judul Besar: 知る */}
        <At y={420} style={{opacity: shiruIn, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, shiruIn)})`}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <span style={{fontFamily: FONT.mono, fontSize: 30, color: C.indigoSoft, letterSpacing: 2}}>
              shiru
            </span>
            <Jp size={150} color={C.gold}>知る</Jp>
            <Pill color={C.gold} size={30}>
              EVENT / PERUBAHAN STATUS
            </Pill>
          </div>
        </At>

        {/* Transformasi Berkelanjutan: ? → 💡 → Tahu */}
        <At y={760}>
          <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
            {/* Kartu 1: Belum Tahu */}
            <div
              style={{
                opacity: step1,
                transform: `scale(${mix(0.85, 1, step1)})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  background: '#202636',
                  border: '2px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.display,
                  fontWeight: 900,
                  fontSize: 64,
                  color: C.textMuted,
                }}
              >
                ?
              </div>
              <Label size={32} color={C.textSecondary}>BELUM TAHU</Label>
            </div>

            {/* Panah Transformasi 1 */}
            {step1 > 0.5 && (
              <span style={{color: C.textMuted, fontSize: 44, opacity: infoFlight}}>➔</span>
            )}

            {/* Kartu 2: 知る (Titik Peristiwa 💡) */}
            {infoFlight > 0.2 && (
              <div
                style={{
                  opacity: bulbSpark,
                  transform: `scale(${mix(0.8, 1.1, bulbSpark)})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{position: 'relative'}}>
                  <LightbulbIcon size={140} glow={bulbSpark} color={C.gold} />
                </div>
                <Label size={34} color={C.gold}>
                  知る (EVENT)
                </Label>
              </div>
            )}

            {/* Panah Transformasi 2 */}
            {bulbSpark > 0.5 && (
              <span style={{color: C.gold, fontSize: 44, opacity: step3}}>➔</span>
            )}

            {/* Kartu 3: Menjadi Tahu */}
            {step3 > 0.2 && (
              <div
                style={{
                  opacity: step3,
                  transform: `scale(${mix(0.85, 1, step3)})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 70,
                    background: hexA(C.matcha, 0.2),
                    border: `3px solid ${C.matcha}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 40px ${hexA(C.matcha, 0.4)}`,
                  }}
                >
                  <CheckIcon size={64} color={C.matcha} stroke={4.5} />
                </div>
                <Label size={32} color={C.matcha}>SUDAH TAHU</Label>
              </div>
            )}
          </div>
        </At>
      </Win>

      {/* ==================== FASE 2: LONG TIMELINE & ATTACH 知っている (53.0s - 78.0s) ==================== */}
      <Win T={T} a={53.0} b={78.0} dy={0}>
        {/* Header Tag */}
        <At y={320} style={{opacity: tlEnter}}>
          <Pill color={C.gold} size={34}>
            LOGIKA PERUBAHAN KEADAAN
          </Pill>
        </At>

        {/* ========== VISUAL TIMELINE UTAMA ========== */}
        <div style={{position: 'absolute', inset: 0, opacity: tlEnter}}>
          {/* Garis Dasar Masa Lalu: Belum Tahu */}
          <Line d="M80 680 H360" p={lineDraw} color="rgba(151,181,224,0.3)" w={6} />

          {/* Label Masa Belum Tahu */}
          <At x={200} y={615} style={{opacity: lineDraw}}>
            <span style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 26, color: C.textMuted}}>
              BELUM TAHU
            </span>
          </At>

          {/* TITIK EVENT: 知る (Titik Perubahan Sekejap) */}
          <At x={360} y={680} style={{opacity: eventPop, transform: `translate(-50%,-50%) scale(${eventPop})`}}>
            <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {/* Lingkaran Titik Peristiwa */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  background: C.gold,
                  boxShadow: `0 0 35px ${hexA(C.gold, 0.9)}`,
                  border: '3px solid #ffffff',
                }}
              />
            </div>
          </At>

          {/* Label Titik 知る di atas titik */}
          <At x={360} y={530} style={{opacity: eventPop}}>
            <GCard color={C.gold} glow={0.5} style={{padding: '12px 26px', gap: 10}}>
              <LightbulbIcon size={36} glow={1} />
              <Jp size={42} color={C.gold}>知る</Jp>
              <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.textSecondary}}>(EVENT)</span>
            </GCard>
          </At>

          {/* GARIS STATE TEBAL BERLANJUT SAMPAI KE NOW */}
          <Line
            d="M360 680 H920"
            p={stateDraw}
            color={C.matcha}
            w={16}
          />

          {/* TITIK SEKARANG (NOW) */}
          <At x={920} y={680} style={{opacity: nowPop, transform: `translate(-50%,-50%) scale(${nowPop})`}}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                background: C.gold,
                boxShadow: `0 0 40px ${hexA(C.gold, 0.95)}`,
                border: '4px solid #ffffff',
              }}
            />
          </At>

          {/* Label NOW */}
          <At x={920} y={745} style={{opacity: nowPop}}>
            <Pill color={C.gold} size={28} filled>NOW</Pill>
          </At>

          {/* Keterangan garis hijau di bawah timeline */}
          <At x={560} y={745} style={{opacity: stateDraw}}>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 26, color: C.matcha}}>
              KEADAAN TAHU TERUS BERLANJUT ➔
            </span>
          </At>
        </div>

        {/* ========== ATTACH 知っている KE BAGIAN CURRENT-STATE (65.0s - 78.0s) ========== */}
        {T >= 65.0 && (
          <At y={960} style={{opacity: attachIn, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, attachIn)})`}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: 880}}>
              {/* Bracket penyambung ke timeline */}
              <div
                style={{
                  width: 500,
                  height: 24,
                  borderLeft: `3px solid ${C.matcha}`,
                  borderRight: `3px solid ${C.matcha}`,
                  borderBottom: `3px solid ${C.matcha}`,
                  opacity: cardHighlight,
                }}
              />

              {/* Kartu Penjelasan Utama */}
              <GCard
                color={C.matcha}
                glow={0.7 + glowPulse}
                style={{
                  width: 840,
                  padding: '30px 40px',
                  flexDirection: 'column',
                  gap: 16,
                  textAlign: 'center',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                  <Jp size={84} color={C.gold}>知っている</Jp>
                  <Pill color={C.matcha} size={32} filled>
                    CURRENT STATE
                  </Pill>
                </div>

                <div style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 44, color: C.text}}>
                  = Keadaan Hasil Setelah Peristiwa
                </div>

                <div style={{fontFamily: FONT.body, fontSize: 26, color: C.textSecondary, lineHeight: 1.35}}>
                  Peristiwa <span style={{color: C.gold, fontWeight: 700}}>知る</span> terjadi sekali di masa lalu.
                  <br />
                  Status <span style={{color: C.matcha, fontWeight: 700}}>“sudah tahu”</span>-nya bertahan hingga sekarang (NOW)!
                </div>
              </GCard>
            </div>
          </At>
        )}
      </Win>

      {/* ==================== CAPTIONS ==================== */}
      <Cap t={T} at={45.2} until={48.8} size={50}>
        Kata dasarnya adalah <Hi>知る (shiru)</Hi>.
      </Cap>
      <Cap t={T} at={49.0} until={53.0} size={50}>
        Artinya bukan “sudah tahu”, melainkan <Hi>momen menjadi tahu</Hi>.
      </Cap>
      <Cap t={T} at={53.5} until={60.0} size={50}>
        Peristiwa mendapatkan info itu terjadi di satu titik.
      </Cap>
      <Cap t={T} at={60.5} until={65.0} size={50}>
        Setelah peristiwa itu lewat, keadaan tahunya <Hi>tetap bertahan</Hi>.
      </Cap>
      <Cap t={T} at={65.5} until={71.5} size={50}>
        Maka <Hi>知っている</Hi> menempel pada status hasil yang berlanjut.
      </Cap>
      <Cap t={T} at={72.0} until={77.8} size={50}>
        <Hi>知る = Peristiwa</Hi> | <Hi>知っている = Keadaan hasilnya</Hi>!
      </Cap>
    </AbsoluteFill>
  );
};
