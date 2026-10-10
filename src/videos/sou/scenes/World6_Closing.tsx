import React from 'react';
import {
  At,
  BOUNCY,
  GCard,
  Hi,
  Label,
  NarrationSub,
  PhysicalButton,
  Pill,
  SouAnchor,
  Win,
  pp,
  ps,
  useT,
} from '../kit';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {C, FONT} from '../../../shared/theme';

export const World6_Closing: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 27.48s (03:15 - 03:42.48)

  // 1. Coret Hafalan 3 Arti (0.0s - 13.0s)
  const crossHeaderIn = pp(T, 0.3, BOUNCY);
  const strike1 = ps(T, 2.0, 3.2);
  const strike2 = ps(T, 3.4, 4.6);
  const strike3 = ps(T, 4.8, 6.0);
  const cardPrincipleIn = pp(T, 7.0, BOUNCY);

  // 2. Ringkasan & CTA SevnQuest (13.0s - 27.48s)
  const finalSummaryIn = pp(T, 13.5, BOUNCY);
  const brandIn = pp(T, 17.5, BOUNCY);
  const btnIn = pp(T, 20.0, BOUNCY);
  const btnPress = ps(T, 22.0, 23.0);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* ========================================================
          BAGIAN 1: 03:15 - 03:28 (JANGAN HAFAL 3 ARTI ➔ CORET)
          ======================================================== */}
      <Win T={T} a={0} b={13.0}>
        <At y={360} style={{transform: `translate(-50%, -50%) scale(${crossHeaderIn})`}}>
          <Label size={36} color={C.hanko}>
            JANGAN HAFAL SECARA TERPISAH!
          </Label>
        </At>

        {/* 3 Baris Hafalan Dicoret */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 450,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Baris 1: そう = begitu */}
          <div
            style={{
              position: 'relative',
              background: C.card,
              border: `1.5px solid ${C.borderSubtle}`,
              borderRadius: 20,
              padding: '14px 44px',
              fontFamily: FONT.display,
              fontSize: 32,
              fontWeight: 800,
              color: '#edf0f6',
              opacity: strike1 > 0.8 ? 0.88 : 1,
            }}
          >
            そう = begitu
            {strike1 > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  top: '50%',
                  height: 6,
                  background: C.hanko,
                  borderRadius: 3,
                  transform: `scaleX(${strike1})`,
                  transformOrigin: 'left center',
                }}
              />
            )}
          </div>

          {/* Baris 2: そう = kelihatannya */}
          <div
            style={{
              position: 'relative',
              background: C.card,
              border: `1.5px solid ${C.borderSubtle}`,
              borderRadius: 20,
              padding: '14px 44px',
              fontFamily: FONT.display,
              fontSize: 32,
              fontWeight: 800,
              color: '#edf0f6',
              opacity: strike2 > 0.8 ? 0.88 : 1,
            }}
          >
            そう = kelihatannya
            {strike2 > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  top: '50%',
                  height: 6,
                  background: C.hanko,
                  borderRadius: 3,
                  transform: `scaleX(${strike2})`,
                  transformOrigin: 'left center',
                }}
              />
            )}
          </div>

          {/* Baris 3: そう = katanya */}
          <div
            style={{
              position: 'relative',
              background: C.card,
              border: `1.5px solid ${C.borderSubtle}`,
              borderRadius: 20,
              padding: '14px 44px',
              fontFamily: FONT.display,
              fontSize: 32,
              fontWeight: 800,
              color: '#edf0f6',
              opacity: strike3 > 0.8 ? 0.88 : 1,
            }}
          >
            そう = katanya
            {strike3 > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  top: '50%',
                  height: 6,
                  background: C.hanko,
                  borderRadius: 3,
                  transform: `scaleX(${strike3})`,
                  transformOrigin: 'left center',
                }}
              />
            )}
          </div>
        </div>

        {/* Kartu Prinsip Emas SevnQuest */}
        {cardPrincipleIn > 0 && (
          <At y={860} style={{transform: `translate(-50%, -50%) scale(${cardPrincipleIn})`}}>
            <GCard
              color={C.gold}
              glow={0.9}
              style={{
                width: 860,
                padding: '28px 44px',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'center',
              }}
            >
              <Pill color={C.gold} size={28} filled>KUNCI UTAMA</Pill>
              <Label size={36} color={C.text}>
                PAHAMI APA YANG DITUNJUK OLEH そう
              </Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.goldSoft, lineHeight: 1.35}}>
                Jangan sekadar menghafal terjemahan kata per kata. Pahami pola logikanya!
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 2: 03:28 - 03:42.48 (RINGKASAN & BRANDING SEVNQUEST)
          ======================================================== */}
      <Win T={T} a={13.0} b={27.48}>
        {/* Ringkasan Konseptual */}
        {finalSummaryIn > 0 && (
          <At y={440} style={{transform: `translate(-50%, -50%) scale(${finalSummaryIn})`}}>
            <GCard
              color={C.gold}
              glow={0.7}
              style={{
                width: 860,
                padding: '24px 38px',
                flexDirection: 'column',
                gap: 12,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <SouAnchor size={70} />
                <span style={{fontSize: 32, color: C.indigoSoft}}>➔</span>
                <span style={{fontFamily: FONT.display, fontSize: 32, fontWeight: 800, color: '#fff'}}>
                  “SEPERTI ITU”
                </span>
              </div>
              <Label size={30} color={C.gold}>
                KONTEKS MENENTUKAN CARA MENERJEMAHKANNYA!
              </Label>
            </GCard>
          </At>
        )}

        {/* Branding SevnQuest Asli: LogoMark + Wordmark */}
        {brandIn > 0 && (
          <At y={760} style={{transform: `translate(-50%, -50%) scale(${brandIn})`}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center'}}>
              {/* Logo Mark Asli SevnQuest + Wordmark */}
              <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                <LogoMark size={110} glow={0.5} />
                <Wordmark size={84} />
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 34,
                  fontWeight: 800,
                  color: C.text,
                  lineHeight: 1.3,
                  textAlign: 'center',
                }}
              >
                Bukan cuma hafal arti. Pahami logikanya.
              </div>
            </div>
          </At>
        )}

        {/* Tombol CTA Fisik SevnQuest */}
        {btnIn > 0 && (
          <At y={1060} style={{transform: `translate(-50%, -50%) scale(${btnIn})`}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
              <PhysicalButton
                tone="gold"
                label="COBA SEKARANG →"
                w={480}
                h={88}
                fontSize={34}
                press={btnPress}
              />
              <Pill color={C.indigoSoft} size={28}>
                sevnquest.sevnsoul.site
              </Pill>
            </div>
          </At>
        )}
      </Win>

      {/* ========================================================
          SUBTITLES NARASI
          ======================================================== */}
      <NarrationSub t={T} at={0.0} until={13.0}>
        Jangan hafal: そう = begitu, kelihatannya, katanya. Tapi <Hi color={C.gold}>pahami apa yang ditunjuknya</Hi>!
      </NarrationSub>
      <NarrationSub t={T} at={13.0} until={27.48}>
        Bukan cuma hafal arti. Pahami logikanya di <span style={{color: C.gold}}>SevnQuest</span>!
      </NarrationSub>
    </div>
  );
};
