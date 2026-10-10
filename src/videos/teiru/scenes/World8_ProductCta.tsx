import React from 'react';
import {AbsoluteFill} from 'remotion';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {PhysicalButton, Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {IPhoneShell} from '../../iphone/components/iPhoneShell';
import {
  At,
  Avatar,
  BOUNCY,
  Cap,
  GCard,
  Hi,
  Jp,
  SOFT,
  Win,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';
import {
  GrammarScreen,
  LibraryScreen,
  TeiruDetailScreen,
} from '../ProductScreens';

const START = 156.0;

export const World8_ProductCta: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- 156.0s - 162.0s: Kebingungan Pola Gramatika ----------
  const cardsIn = ps(T, 156.2, 157.0);
  const avatarConf = pp(T, 157.2, BOUNCY);
  const textConf = pp(T, 158.0, SOFT);

  // ---------- 162.0s - 171.0s: Phone Rises & SevnQuest UI ----------
  const phoneRise = ps(T, 161.8, 162.8, (x) => x * x * (3 - 2 * x));
  const phoneY = (1 - phoneRise) * 1500;

  // Pergantian Screen di dalam Phone:
  // 162.0s - 164.0s: LibraryScreen
  // 164.0s - 166.0s: GrammarScreen
  // 166.0s - 171.0s: TeiruDetailScreen
  const screenIdx = T < 164.0 ? 'lib' : T < 166.0 ? 'gram' : 'teiru';
  const detailTab: 'arti' | 'fungsi' | 'struktur' | 'contoh' =
    T < 167.5 ? 'arti' : T < 169.5 ? 'fungsi' : 'contoh';

  // ---------- 171.0s - 175.5s: Value Proposition (HAFAL vs PAHAM) ----------
  const phoneExit = ps(T, 171.0, 171.8);
  const compIn = pp(T, 171.6, BOUNCY);
  const tagIn = pp(T, 173.2, BOUNCY);

  // ---------- 175.5s - 179.64s: Brand Outro & CTA ----------
  const ctaIn = pp(T, 175.6, BOUNCY);
  const btnPulse = Math.sin(T * 6) * 0.05;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={S(156.2)} volume={0.4} />
          <Sfx name="pop" at={S(157.2)} volume={0.4} />
          {/* Phone naik */}
          <Sfx name="whoosh" at={S(161.8)} volume={0.5} />
          <Sfx name="click" at={S(164.0)} volume={0.6} />
          <Sfx name="click" at={S(166.0)} volume={0.6} />
          <Sfx name="sparkle" at={S(167.5)} volume={0.45} />
          <Sfx name="chime" at={S(169.5)} volume={0.55} />
          {/* Comparison enter */}
          <Sfx name="swipe" at={S(171.6)} volume={0.4} />
          <Sfx name="impact-soft" at={S(173.2)} volume={0.6} />
          {/* Outro CTA */}
          <Sfx name="chime" at={S(175.6)} volume={0.7} />
          <Sfx name="sparkle" at={S(176.0)} volume={0.5} />
        </>
      )}

      {/* ==================== FASE 1: KEBINGUNGAN BANYAK POLA (156.0s - 161.8s) ==================== */}
      <Win T={T} a={156.0} b={161.8} dy={0}>
        {/* Floating Grammar Cards */}
        <div style={{position: 'absolute', inset: 0, opacity: cardsIn}}>
          <At x={260} y={420}>
            <GCard color={C.gold} style={{padding: '16px 28px'}}>
              <Jp size={42} color={C.gold}>ている</Jp>
            </GCard>
          </At>
          <At x={820} y={420}>
            <GCard color={C.indigoSoft} style={{padding: '16px 28px'}}>
              <Jp size={42} color={C.indigoSoft}>たほうがいい</Jp>
            </GCard>
          </At>
          <At x={260} y={580}>
            <GCard color={C.teal} style={{padding: '16px 28px'}}>
              <Jp size={42} color={C.teal}>てしまう</Jp>
            </GCard>
          </At>
          <At x={820} y={580}>
            <GCard color={C.matcha} style={{padding: '16px 28px'}}>
              <Jp size={42} color={C.matcha}>ようになる</Jp>
            </GCard>
          </At>
        </div>

        {/* Karakter Bingung di Tengah */}
        <At y={500} style={{opacity: avatarConf, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, avatarConf)})`}}>
          <Avatar tier={1} height={190} />
        </At>

        {/* Dialog Bingung */}
        <At y={780} style={{opacity: textConf, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, textConf)})`}}>
          <GCard color={C.indigoSoft} style={{padding: '24px 44px', flexDirection: 'column', gap: 10, textAlign: 'center'}}>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 44, color: C.text}}>
              "Kok polanya mirip-mirip,
            </span>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 44, color: C.gold}}>
              tapi artinya beda banget?"
            </span>
          </GCard>
        </At>
      </Win>

      {/* ==================== FASE 2: SEVNQUEST APP SCREEN (161.8s - 171.5s) ==================== */}
      {T >= 161.8 && T <= 172.5 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateY(${phoneY + phoneExit * 1600}px)`,
          }}
        >
          {/* Shell iPhone di tengah */}
          <At x={540} y={960}>
            <IPhoneShell>
              {screenIdx === 'lib' && <LibraryScreen hit={1} />}
              {screenIdx === 'gram' && <GrammarScreen hit={1} />}
              {screenIdx === 'teiru' && <TeiruDetailScreen activeSection={detailTab} />}
            </IPhoneShell>
          </At>
        </div>
      )}

      {/* ==================== FASE 3: HAFAL VS PAHAM (171.5s - 175.5s) ==================== */}
      <Win T={T} a={171.5} b={175.5} dy={0}>
        <At y={340} style={{opacity: compIn}}>
          <Pill color={C.gold} size={34}>
            PERBANDINGAN CARA BELAJAR
          </Pill>
        </At>

        {/* Dua Box: HAFAL vs PAHAM */}
        <div style={{position: 'absolute', inset: 0, opacity: compIn}}>
          {/* KIRI: HAFAL (SALAH) */}
          <At x={300} y={620}>
            <GCard color={C.hanko} style={{width: 440, height: 420, flexDirection: 'column', gap: 18, padding: '28px 24px'}}>
              <Pill color={C.hanko} size={26} filled>HAFAL MATI ❌</Pill>
              <Jp size={46} color={C.text}>ている = sedang</Jp>
              <div style={{height: 1, width: '100%', background: 'rgba(255,255,255,0.1)'}} />
              <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary, textAlign: 'center'}}>
                Gampang bingung saat ketemu 知っている & 結婚している
              </span>
            </GCard>
          </At>

          {/* KANAN: PAHAM (BENAR) */}
          <At x={780} y={620}>
            <GCard color={C.matcha} glow={0.7} style={{width: 440, height: 420, flexDirection: 'column', gap: 18, padding: '28px 24px'}}>
              <Pill color={C.matcha} size={26} filled>PAHAM LOGIKA ✓</Pill>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
                <Jp size={42} color={C.gold}>ている</Jp>
                <span style={{fontSize: 24, color: C.matcha}}>↓</span>
                <span style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 24, color: C.text}}>Aktivitas vs Keadaan</span>
              </div>
              <div style={{height: 1, width: '100%', background: 'rgba(255,255,255,0.1)'}} />
              <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary, textAlign: 'center'}}>
                Mengerti cara kerjanya di segala situasi & kalimat
              </span>
            </GCard>
          </At>
        </div>

        {/* Tagline Nilai Utama */}
        {T >= 173.0 && (
          <At y={940} style={{opacity: tagIn, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, tagIn)})`}}>
            <GCard color={C.gold} glow={0.8} style={{padding: '24px 50px'}}>
              <span style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 44, color: C.gold}}>
                BUKAN CUMA HAFAL — PAHAM CARA KERJANYA
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ==================== FASE 4: SEVNQUEST BRAND OUTRO & CTA (175.5s - 179.64s) ==================== */}
      <Win T={T} a={175.5} b={179.64} dy={0}>
        <At y={620} style={{opacity: ctaIn, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, ctaIn)})`}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, textAlign: 'center'}}>
            {/* Logo Mark Asli + Wordmark */}
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <LogoMark size={110} />
              <Wordmark size={84} />
            </div>

            {/* Tagline */}
            <div style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 44, color: C.text, lineHeight: 1.3}}>
              Belajar Jepang sampai ngerti logikanya.
            </div>

            {/* Tombol Fisik SevnQuest */}
            <div style={{transform: `scale(${1 + btnPulse})`}}>
              <PhysicalButton
                label="COBA SEKARANG"
                tone="gold"
                w={460}
                h={96}
                fontSize={38}
              />
            </div>

            {/* Website URL */}
            <Pill color={C.indigoSoft} size={30}>
              sevnquest.sevnsoul.site
            </Pill>
          </div>
        </At>
      </Win>

      {/* ==================== CAPTIONS ==================== */}
      <Cap t={T} at={156.2} until={161.5} size={50}>
        Di SevnQuest, kamu gak cuma disuruh hafal mati pola tata bahasa.
      </Cap>
      <Cap t={T} at={162.0} until={171.0} size={50}>
        Buka <Hi>Library › Tata Bahasa</Hi> untuk paham arti, fungsi, dan strukturnya.
      </Cap>
      <Cap t={T} at={171.5} until={175.2} size={50}>
        Bukan cuma hafal terjemahan, tapi <Hi>paham cara kerjanya</Hi>!
      </Cap>
      <Cap t={T} at={175.5} until={179.64} size={52}>
        Belajar bahasa Jepang sampai ngerti logikanya di <Hi>SevnQuest</Hi>.
      </Cap>
    </AbsoluteFill>
  );
};
