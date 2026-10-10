import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  BOUNCY,
  Cap,
  GCard,
  Hi,
  Jp,
  Line,
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

const START = 128.0;

export const World7_TwoFunctions: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- 128.0s - 139.0s: Split Screen & Dua Fungsi Utama ----------
  const splitIn = ps(T, 128.2, 129.2);
  const topPop = pp(T, 128.4, BOUNCY);
  const leftPop = pp(T, 129.5, SOFT);
  const rightPop = pp(T, 131.0, SOFT);

  // ---------- 139.0s - 150.0s: Empat Kartu Visual Grouping ----------
  const groupIn = ps(T, 139.0, 140.0);
  const card1 = pp(T, 140.2, SOFT);
  const card2 = pp(T, 141.5, SOFT);
  const card3 = pp(T, 143.0, SOFT);
  const card4 = pp(T, 144.5, SOFT);

  // ---------- 150.0s - 156.0s: Don't Memorize Blindly (Erase Card) ----------
  const noteIn = pp(T, 150.2, BOUNCY);
  const strikeNote = ps(T, 151.4, 152.0);
  const ruleIn = pp(T, 152.6, BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={S(128.2)} volume={0.4} />
          <Sfx name="pop" at={S(128.5)} volume={0.5} />
          <Sfx name="swipe" at={S(129.5)} volume={0.4} />
          <Sfx name="swipe" at={S(131.0)} volume={0.4} />
          <Sfx name="chime" at={S(132.5)} volume={0.65} />
          {/* Empat kartu */}
          <Sfx name="pop" at={S(140.2)} volume={0.4} />
          <Sfx name="pop" at={S(141.5)} volume={0.4} />
          <Sfx name="pop" at={S(143.0)} volume={0.4} />
          <Sfx name="pop" at={S(144.5)} volume={0.4} />
          <Sfx name="sparkle" at={S(146.0)} volume={0.5} />
          {/* Erase note */}
          <Sfx name="pop" at={S(150.2)} volume={0.45} />
          <Sfx name="swipe" at={S(151.4)} volume={0.6} />
          <Sfx name="chime" at={S(152.6)} volume={0.7} />
        </>
      )}

      {/* ==================== FASE 1: MASTER SPLIT SCREEN (128.0s - 139.0s) ==================== */}
      <Win T={T} a={128.0} b={139.0} dy={0}>
        {/* Header Puncak: ている */}
        <At y={320} style={{opacity: topPop, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, topPop)})`}}>
          <GCard color={C.gold} glow={0.8} style={{padding: '18px 48px'}}>
            <Jp size={84} color={C.gold}>ている</Jp>
          </GCard>
        </At>

        {/* Panah Cabang Kiri & Kanan */}
        <div style={{position: 'absolute', inset: 0, opacity: splitIn}}>
          <Line d="M500 380 L320 460" p={splitIn} color={C.teal} w={6} head={{x: 320, y: 460, rot: -150}} />
          <Line d="M580 380 L760 460" p={splitIn} color={C.gold} w={6} head={{x: 760, y: 460, rot: -30}} />
        </div>

        {/* KOLOM KIRI: ① AKTIVITAS */}
        <At x={300} y={740} style={{opacity: leftPop, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, leftPop)})`}}>
          <GCard color={C.teal} glow={0.5} style={{width: 440, height: 560, flexDirection: 'column', gap: 18, padding: '28px 24px'}}>
            <Pill color={C.teal} size={28} filled>① AKTIVITAS</Pill>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 32, color: C.text}}>
              Sedang Berlangsung
            </span>
            <div style={{height: 1, width: '100%', background: 'rgba(255,255,255,0.1)'}} />
            <Jp size={52} color={C.gold}>食べている</Jp>
            <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary}}>sedang makan</span>

            {/* Visual Garis: ━━━━ ● ━━━━ NOW */}
            <div style={{position: 'relative', width: 360, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{position: 'absolute', width: '100%', height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3}} />
              <div style={{position: 'absolute', width: 180, height: 10, background: C.teal, borderRadius: 5}} />
              <div style={{position: 'absolute', width: 22, height: 22, borderRadius: 11, background: C.gold, border: '2px solid #fff'}} />
            </div>
            <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.gold, letterSpacing: 1}}>MELINTASI NOW</span>
          </GCard>
        </At>

        {/* KOLOM KANAN: ② KEADAAN HASIL */}
        <At x={780} y={740} style={{opacity: rightPop, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, rightPop)})`}}>
          <GCard color={C.gold} glow={0.6} style={{width: 440, height: 560, flexDirection: 'column', gap: 18, padding: '28px 24px'}}>
            <Pill color={C.gold} size={28} filled>② KEADAAN HASIL</Pill>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 32, color: C.text}}>
              Masih Berlaku
            </span>
            <div style={{height: 1, width: '100%', background: 'rgba(255,255,255,0.1)'}} />
            <Jp size={52} color={C.gold}>知っている</Jp>
            <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary}}>sudah tahu / kenal</span>

            {/* Visual Garis: EVENT ●━━━━━━━━━━━━ NOW */}
            <div style={{position: 'relative', width: 360, height: 60, display: 'flex', alignItems: 'center'}}>
              <div style={{position: 'absolute', left: 40, right: 40, height: 10, background: C.matcha, borderRadius: 5}} />
              <div style={{position: 'absolute', left: 40, width: 20, height: 20, borderRadius: 10, background: C.hanko, border: '2px solid #fff'}} />
              <div style={{position: 'absolute', right: 40, width: 22, height: 22, borderRadius: 11, background: C.gold, border: '2px solid #fff'}} />
            </div>
            <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.matcha, letterSpacing: 1}}>STATUS BERTAHAN</span>
          </GCard>
        </At>
      </Win>

      {/* ==================== FASE 2: EMPAT KARTU GROUPING (139.0s - 150.0s) ==================== */}
      <Win T={T} a={139.0} b={150.0} dy={0}>
        {/* Header Tag */}
        <At y={290} style={{opacity: groupIn}}>
          <Pill color={C.gold} size={32}>
            PENGELOMPOKAN 4 CONTOH UTAMA
          </Pill>
        </At>

        {/* GROUP 1: AKTIVITAS (Atas) */}
        <div style={{position: 'absolute', inset: 0, opacity: groupIn}}>
          <At x={540} y={380}>
            <Pill color={C.teal} size={28}>KELOMPOK AKTIVITAS (SEDANG BERJALAN)</Pill>
          </At>

          <At x={300} y={510} style={{opacity: card1, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, card1)})`}}>
            <GCard color={C.teal} style={{width: 440, height: 170, padding: '16px 24px', justifyContent: 'space-between'}}>
              <div>
                <Jp size={46} color={C.gold}>食べている</Jp>
                <div style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>sedang makan</div>
              </div>
              <Pill color={C.teal} size={20}>ACTIVITY</Pill>
            </GCard>
          </At>

          <At x={780} y={510} style={{opacity: card2, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, card2)})`}}>
            <GCard color={C.teal} style={{width: 440, height: 170, padding: '16px 24px', justifyContent: 'space-between'}}>
              <div>
                <Jp size={46} color={C.teal}>読んでいる</Jp>
                <div style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>sedang membaca</div>
              </div>
              <Pill color={C.teal} size={20}>ACTIVITY</Pill>
            </GCard>
          </At>

          {/* GROUP 2: KEADAAN HASIL (Bawah) */}
          <At x={540} y={670}>
            <Pill color={C.gold} size={28}>KELOMPOK KEADAAN HASIL (STATUS TETAP)</Pill>
          </At>

          <At x={300} y={800} style={{opacity: card3, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, card3)})`}}>
            <GCard color={C.gold} style={{width: 440, height: 170, padding: '16px 24px', justifyContent: 'space-between'}}>
              <div>
                <Jp size={46} color={C.gold}>知っている</Jp>
                <div style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>tahu / kenal</div>
              </div>
              <Pill color={C.gold} size={20}>STATE</Pill>
            </GCard>
          </At>

          <At x={780} y={800} style={{opacity: card4, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, card4)})`}}>
            <GCard color={C.gold} style={{width: 440, height: 170, padding: '16px 24px', justifyContent: 'space-between'}}>
              <div>
                <Jp size={46} color={C.gold}>結婚している</Jp>
                <div style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>sudah menikah</div>
              </div>
              <Pill color={C.gold} size={20}>STATE</Pill>
            </GCard>
          </At>
        </div>
      </Win>

      {/* ==================== FASE 3: JANGAN HAFAL BUTA (150.0s - 156.0s) ==================== */}
      <Win T={T} a={150.0} b={156.0} dy={0}>
        <At y={660} style={{opacity: noteIn, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, noteIn)})`}}>
          <GCard color={C.gold} glow={0.6} style={{width: 840, padding: '40px 50px', flexDirection: 'column', gap: 28, textAlign: 'center'}}>
            {/* Rumus Lama Dicoret */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              <Strike p={strikeNote} color={C.hanko} height={16}>
                <span style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 62, color: C.textSecondary}}>
                  ている = sedang ❌
                </span>
              </Strike>
            </div>

            {/* Rumus Logika Sebenarnya */}
            {T >= 152.4 && (
              <div style={{opacity: ruleIn, transform: `scale(${mix(0.9, 1, ruleIn)})`, display: 'flex', flexDirection: 'column', gap: 16}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16}}>
                  <Pill color={C.gold} size={36}>ている</Pill>
                  <span style={{fontFamily: FONT.display, fontSize: 36, color: C.textSecondary}}>+</span>
                  <Pill color={C.teal} size={36}>KATA KERJA</Pill>
                  <span style={{fontFamily: FONT.display, fontSize: 36, color: C.textSecondary}}>+</span>
                  <Pill color={C.matcha} size={36}>KONTEKS</Pill>
                </div>

                <div
                  style={{
                    padding: '16px 32px',
                    borderRadius: 24,
                    background: hexA(C.gold, 0.18),
                    border: `2px solid ${C.gold}`,
                    fontFamily: FONT.display,
                    fontWeight: 800,
                    fontSize: 42,
                    color: C.gold,
                  }}
                >
                  LIHAT KATA KERJA + KONTEKS!
                </div>
              </div>
            )}
          </GCard>
        </At>
      </Win>

      {/* ==================== CAPTIONS ==================== */}
      <Cap t={T} at={128.2} until={134.5} size={50}>
        Kesimpulannya, <Hi>ている</Hi> punya 2 fungsi besar:
      </Cap>
      <Cap t={T} at={134.8} until={138.8} size={50}>
        <Hi>① Aktivitas sedang berjalan</Hi>, dan <Hi>② Keadaan hasil</Hi>.
      </Cap>
      <Cap t={T} at={139.2} until={144.5} size={50}>
        Makan dan membaca masuk ke <Hi>kelompok aktivitas</Hi>.
      </Cap>
      <Cap t={T} at={144.8} until={149.8} size={50}>
        Sedangkan tahu dan menikah masuk ke <Hi>kelompok keadaan hasil</Hi>.
      </Cap>
      <Cap t={T} at={150.2} until={155.8} size={50}>
        Jangan hafal mati <Hi>ている = sedang</Hi>. Lihat kata kerja dan konteksnya!
      </Cap>
    </AbsoluteFill>
  );
};
