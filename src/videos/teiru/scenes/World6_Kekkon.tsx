import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, Pill} from '../../../shared/components/ui';
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
  SingleLifeIcons,
  SOFT,
  Strike,
  WeddingRings,
  Win,
  bump,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 89.0;

export const World6_Kekkon: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- 89.0s - 96.0s: Pembuka 結婚している & Coretan ----------
  const kekkonIn = pp(T, 89.2, BOUNCY);
  const assumeIn = pp(T, 90.5, SOFT);
  const strikeP = ps(T, 91.8, 92.4);
  const correctIn = pp(T, 92.8, BOUNCY);

  // ---------- 96.0s - 107.0s: Dua Dunia Terpisah (World A & World B) ----------
  const zoomWorlds = ps(T, 96.0, 97.2);
  const bobA = Math.sin(T * 4) * 8;
  const bobB = Math.cos(T * 4) * 8;

  // ---------- 107.0s - 116.0s: Pertemuan & Event 💍 結婚する ----------
  const glideTogether = ps(T, 107.2, 109.5, (x) => x * x * (3 - 2 * x));
  const ringsPop = pp(T, 109.5, BOUNCY);
  const eventFlash = bump(T, 109.5, 110.5);

  // ---------- 116.0s - 128.0s: Keadaan Baru & Timeline Menuju NOW ----------
  const unitedIn = ps(T, 116.0, 117.0);
  const tlDraw = ps(T, 117.2, 119.5);
  const nowPop = pp(T, 119.5, BOUNCY);
  const stateCardIn = pp(T, 120.5, BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={S(89.2)} volume={0.4} />
          <Sfx name="pop" at={S(90.5)} volume={0.4} />
          <Sfx name="swipe" at={S(91.8)} volume={0.5} />
          <Sfx name="error-soft" at={S(92.0)} volume={0.4} />
          <Sfx name="chime" at={S(92.8)} volume={0.7} />
          {/* Zoom ke dua dunia */}
          <Sfx name="whoosh" at={S(96.0)} volume={0.45} />
          {/* Mendekat & Event Cincin */}
          <Sfx name="swipe" at={S(107.5)} volume={0.4} />
          <Sfx name="impact" at={S(109.5)} volume={0.75} />
          <Sfx name="sparkle" at={S(109.8)} volume={0.65} />
          {/* Timeline berlanjut */}
          <Sfx name="stroke" at={S(117.2)} volume={0.4} />
          <Sfx name="chime" at={S(119.5)} volume={0.7} />
          <Sfx name="pop" at={S(120.5)} volume={0.55} />
        </>
      )}

      {/* ==================== FASE 1: HOOK KATA (89.0s - 96.0s) ==================== */}
      <Win T={T} a={89.0} b={96.0} dy={0}>
        <At y={480} style={{opacity: kekkonIn, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, kekkonIn)})`}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <span style={{fontFamily: FONT.mono, fontSize: 32, color: C.indigoSoft, letterSpacing: 2}}>
              kekkon shite iru
            </span>
            <Jp size={140}>
              <span style={{color: C.text}}>結婚して</span>
              <span style={{color: C.gold}}>いる</span>
            </Jp>
          </div>
        </At>

        {/* Coretan sedang menikah */}
        {T < 93.0 && (
          <At y={740} style={{opacity: assumeIn}}>
            <GCard color={C.indigoSoft} style={{padding: '20px 42px'}}>
              <Strike p={strikeP} color={C.hanko} height={14}>
                <Label size={52} color={C.textSecondary}>
                  sedang menikah...?
                </Label>
              </Strike>
            </GCard>
          </At>
        )}

        {/* Koreksi: SUDAH MENIKAH ✓ */}
        {T >= 92.5 && (
          <At y={760} style={{opacity: correctIn, transform: `translate(-50%,-50%) scale(${mix(1.2, 1, correctIn)})`}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
              <GCard color={C.matcha} glow={0.8} style={{padding: '24px 50px', gap: 18}}>
                <span style={{color: C.matcha}}>
                  <CheckIcon size={56} stroke={4.2} />
                </span>
                <Label size={60} color={C.text}>
                  SUDAH MENIKAH
                </Label>
              </GCard>
              <Pill color={C.gold} size={30}>
                STATUS PERNIKAHAN SAAT INI
              </Pill>
            </div>
          </At>
        )}
      </Win>

      {/* ==================== FASE 2: DUA DUNIA TERPISAH (96.0s - 107.2s) ==================== */}
      <Win T={T} a={96.0} b={107.2} dy={0}>
        {/* Label Atas */}
        <At y={320} style={{opacity: zoomWorlds}}>
          <Pill color={C.indigoSoft} size={34}>
            SEBELUM MENIKAH — DUA KEHIDUPAN TERPISAH
          </Pill>
        </At>

        {/* DUNIA A (Kiri: Pria Lajang) */}
        <At
          x={300}
          y={660 + bobA}
          style={{opacity: zoomWorlds, transform: `translate(-50%,-50%) scale(${zoomWorlds})`}}
        >
          <GCard color={C.indigoSoft} style={{width: 440, height: 480, flexDirection: 'column', gap: 24, padding: '30px 24px'}}>
            <Pill color={C.indigoSoft} size={26}>DUNIA A</Pill>
            <Avatar tier={1} height={160} />
            <span style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 30, color: C.text}}>
              Lajang (Pria)
            </span>
            <SingleLifeIcons size={44} color={C.indigoSoft} />
          </GCard>
        </At>

        {/* Garis Pemisah Antar Dunia */}
        <At x={540} y={660} style={{opacity: zoomWorlds}}>
          <div style={{width: 2, height: 420, background: 'dashed rgba(151,181,224,0.3)'}} />
        </At>

        {/* DUNIA B (Kanan: Wanita Lajang) */}
        <At
          x={780}
          y={660 + bobB}
          style={{opacity: zoomWorlds, transform: `translate(-50%,-50%) scale(${zoomWorlds})`}}
        >
          <GCard color={C.teal} style={{width: 440, height: 480, flexDirection: 'column', gap: 24, padding: '30px 24px'}}>
            <Pill color={C.teal} size={26}>DUNIA B</Pill>
            <Avatar tier={1} female height={160} />
            <span style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 30, color: C.text}}>
              Lajang (Wanita)
            </span>
            <SingleLifeIcons size={44} color={C.teal} />
          </GCard>
        </At>
      </Win>

      {/* ==================== FASE 3: PERTEMUAN & EVENT 💍 結婚する (107.0s - 116.0s) ==================== */}
      <Win T={T} a={107.0} b={116.0} dy={0}>
        {/* Flash Cahaya saat Cincin Bersatu */}
        {eventFlash > 0.05 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              opacity: eventFlash * 0.35,
            }}
          />
        )}

        {/* Avatar Pria & Wanita meluncur mendekati tengah */}
        <At x={mix(300, 430, glideTogether)} y={mix(660, 690, glideTogether)}>
          <Avatar tier={1} height={160} />
        </At>
        <At x={mix(780, 650, glideTogether)} y={mix(660, 690, glideTogether)}>
          <Avatar tier={1} female height={160} />
        </At>

        {/* Pusat Event Cincin: 結婚する */}
        {T >= 109.0 && (
          <At y={390} style={{opacity: ringsPop, transform: `translate(-50%,-50%) scale(${mix(0.6, 1, ringsPop)})`}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
              <WeddingRings size={140} sparkle={1} color={C.gold} />
              <GCard color={C.gold} glow={0.8} style={{padding: '16px 36px', gap: 14}}>
                <Jp size={64} color={C.gold}>結婚する</Jp>
                <Pill color={C.hanko} size={24} filled>EVENT (UPACARA)</Pill>
              </GCard>
              <Label size={32} color={C.textSecondary}>
                Terjadi di satu titik waktu!
              </Label>
            </div>
          </At>
        )}
      </Win>

      {/* ==================== FASE 4: SETELAH EVENT & TIMELINE (116.0s - 128.0s) ==================== */}
      <Win T={T} a={116.0} b={128.0} dy={0}>
        {/* Header Tag */}
        <At y={320} style={{opacity: unitedIn}}>
          <Pill color={C.matcha} size={34}>
            KEADAAN BARU: SEBAGAI PASANGAN
          </Pill>
        </At>

        {/* Pasangan Suami-Istri Bersatu */}
        <At y={500} style={{opacity: unitedIn}}>
          <GCard color={C.matcha} glow={0.4} style={{padding: '20px 48px', gap: 28}}>
            <Avatar tier={1} height={130} />
            <span style={{fontSize: 38, color: C.gold}}>💍</span>
            <Avatar tier={1} female height={130} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
              <Label size={36} color={C.text}>PASANGAN SUAMI-ISTRI</Label>
              <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>Suami & Istri — Satu keluarga baru</span>
            </div>
          </GCard>
        </At>

        {/* ========== TIMELINE: 💍 EVENT ━━━━━━━━━━━━ ● NOW ========== */}
        <div style={{position: 'absolute', inset: 0, opacity: tlDraw}}>
          {/* Garis Status Pernikahan */}
          <Line d="M220 740 H880" p={tlDraw} color={C.matcha} w={14} />

          {/* Titik Event Upacara di Masa Lalu */}
          <At x={220} y={740}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                background: C.gold,
                boxShadow: `0 0 30px ${hexA(C.gold, 0.9)}`,
                border: '3px solid #ffffff',
              }}
            />
          </At>
          <At x={220} y={675}>
            <Pill color={C.gold} size={24}>💍 EVENT</Pill>
          </At>

          {/* Titik NOW */}
          <At x={880} y={740} style={{opacity: nowPop}}>
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
          <At x={880} y={675} style={{opacity: nowPop}}>
            <Pill color={C.gold} size={28} filled>NOW</Pill>
          </At>
        </div>

        {/* Kartu Status 結婚している */}
        {T >= 120.0 && (
          <At y={960} style={{opacity: stateCardIn, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, stateCardIn)})`}}>
            <GCard color={C.gold} glow={0.7} style={{width: 840, padding: '28px 40px', flexDirection: 'column', gap: 14, textAlign: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <Jp size={78} color={C.gold}>結婚している</Jp>
                <Pill color={C.matcha} size={30} filled>STATE</Pill>
              </div>
              <Label size={42} color={C.text}>= SUDAH MENIKAH</Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                Upacaranya cuma berlangsung di hari pernikahan,
                <br />
                tetapi <span style={{color: C.matcha, fontWeight: 700}}>keadaan hasil pernikahannya</span> terus berlanjut hingga detik ini!
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ==================== CAPTIONS ==================== */}
      <Cap t={T} at={89.2} until={92.4} size={50}>
        Contoh kedua yang paling terkenal: <Hi>結婚している</Hi>.
      </Cap>
      <Cap t={T} at={92.8} until={96.0} size={50}>
        Bukan “sedang menikah di pelaminan”, melainkan <Hi>sudah menikah</Hi>!
      </Cap>
      <Cap t={T} at={96.5} until={106.5} size={50}>
        Sebelum menikah, ada dua orang yang hidup di dua dunia terpisah.
      </Cap>
      <Cap t={T} at={107.2} until={115.5} size={50}>
        Lalu peristiwa <Hi>結婚する</Hi> terjadi di satu hari upacara pernikahan.
      </Cap>
      <Cap t={T} at={116.0} until={122.0} size={50}>
        Setelah itu, tercipta <Hi>keadaan baru</Hi> sebagai pasangan suami-istri.
      </Cap>
      <Cap t={T} at={122.5} until={128.0} size={50}>
        Keadaan pernikahan itu terus berlangsung sampai sekarang: <Hi>結婚している</Hi>!
      </Cap>
    </AbsoluteFill>
  );
};
