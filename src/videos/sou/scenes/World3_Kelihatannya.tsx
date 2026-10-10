import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  GCard,
  Hi,
  Jp,
  Label,
  NarrationSub,
  Pill,
  SouAnchor,
  Win,
  mix,
  pp,
  ps,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World3_Kelihatannya: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 51.0s (01:05 - 01:56)

  // 1. Transisi & Makanan (0.0s - 8.0s)
  const introPop = pp(T, 0.3, BOUNCY);
  const ramenPop = pp(T, 2.5, BOUNCY);

  // 2. おいしい ➔ おいしそう (8.0s - 22.0s)
  const oishiiIn = pp(T, 8.5, BOUNCY);
  const dropI = ps(T, 12.0, 13.0);
  const souAttach = ps(T, 13.0, 14.2);
  const cardOishisouIn = pp(T, 15.0, BOUNCY);

  // 3. Alur Observasi (22.0s - 38.0s)
  const flowStep1 = pp(T, 22.5, BOUNCY);
  const flowStep2 = pp(T, 26.0, BOUNCY);
  const flowStep3 = pp(T, 30.0, BOUNCY);

  // 4. 雨が降りそう (38.0s - 51.0s)
  const cloudPop = pp(T, 38.5, BOUNCY);
  const rainCardIn = pp(T, 42.0, BOUNCY);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* ========================================================
          BAGIAN 1: 01:05 - 01:13 (TRANSISI MENUJU PENGLIHATAN)
          ======================================================== */}
      <Win T={T} a={0} b={8.0}>
        <At y={480} style={{transform: `translate(-50%, -50%) scale(${introPop})`}}>
          <SouAnchor size={130} />
          <div
            style={{
              marginTop: 18,
              color: C.textSecondary,
              fontFamily: FONT.body,
              fontSize: 26,
              textAlign: 'center',
            }}
          >
            Kini informasinya bersumber dari:
          </div>
          <div
            style={{
              marginTop: 10,
              background: 'rgba(240, 190, 82, 0.15)',
              border: `2px solid ${C.gold}`,
              borderRadius: 20,
              padding: '12px 34px',
              color: C.gold,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 32,
              boxShadow: `0 0 24px ${C.gold}44`,
            }}
          >
            👁️ PENGAMATAN VISUAL LANGSUNG
          </div>
        </At>

        {/* Visual Mangkuk Ramen */}
        {ramenPop > 0 && (
          <At y={920} style={{transform: `translate(-50%, -50%) scale(${ramenPop})`}}>
            <div
              style={{
                width: 240,
                height: 240,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #3d2c1d 0%, #1a1612 100%)',
                border: `3px solid ${C.gold}`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px ${C.gold}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 100,
              }}
            >
              🍜
            </div>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 2: 01:13 - 01:27 (おいしい ➔ おいしそう)
          ======================================================== */}
      <Win T={T} a={8.0} b={22.0}>
        {/* Transformasi Kata: おいしい ➔ おいし + そう */}
        <At y={460} style={{transform: `translate(-50%, -50%) scale(${oishiiIn})`}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: C.card,
              border: `2px solid ${C.borderSubtle}`,
              borderRadius: 28,
              padding: '20px 48px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{fontFamily: FONT.jp, fontSize: 72, fontWeight: 900, color: '#ffffff', whiteSpace: 'nowrap'}}>
              おいし
            </span>

            {/* Huruf い yang lepas ke bawah */}
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 72,
                fontWeight: 900,
                color: C.hanko,
                display: 'inline-block',
                transform: `translateY(${dropI * 80}px) scale(${1 - dropI * 0.4})`,
                opacity: 1 - dropI,
              }}
            >
              い
            </span>

            {/* Kata そう yang menempel menggantikan い */}
            {souAttach > 0 && (
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 76,
                  fontWeight: 900,
                  color: C.gold,
                  display: 'inline-block',
                  transform: `scale(${mix(0.5, 1, souAttach)})`,
                  opacity: souAttach,
                  textShadow: `0 0 30px ${C.gold}`,
                  marginLeft: 10,
                }}
              >
                そう
              </span>
            )}
          </div>
        </At>

        {/* Karakter Avatar Mengamati Makanan */}
        <At y={740}>
          <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
            <div style={{fontSize: 90}}>🍜</div>
            <Avatar gender="male" expression="excited" height={220} idleBob />
          </div>
        </At>

        {/* Kartu Status SevnQuest: おいしそう */}
        {cardOishisouIn > 0 && (
          <At y={1080} style={{transform: `translate(-50%, -50%) scale(${cardOishisouIn})`}}>
            <GCard
              color={C.gold}
              glow={0.8}
              style={{
                width: 860,
                padding: '28px 44px',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <Jp size={74} color={C.gold}>おいしそう</Jp>
                <Pill color={C.matcha} size={30} filled>IMPRESSION</Pill>
              </div>
              <Label size={42} color={C.text}>= KELIHATANNYA ENAK</Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                Belum dicicipi! Kita cuma menangkap kesan dari{' '}
                <Hi color={C.gold}>tampilan visualnya</Hi>.
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 3: 01:27 - 01:43 (ALUR OBSERVASI ➔ KESAN)
          ======================================================== */}
      <Win T={T} a={22.0} b={38.0}>
        <At y={360}>
          <Label size={36} color={C.indigoSoft}>
            ALUR LOGIKA KESAN VISUAL
          </Label>
        </At>

        {/* Step 1: Melihat */}
        {flowStep1 > 0 && (
          <At y={500} style={{transform: `translate(-50%, -50%) scale(${flowStep1})`}}>
            <div
              style={{
                width: 680,
                background: C.card,
                border: `2px solid ${C.indigo}`,
                borderRadius: 24,
                padding: '16px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <span style={{fontSize: 36}}>👁️</span>
              <div>
                <div style={{fontFamily: FONT.display, fontSize: 28, color: '#ffffff', fontWeight: 800}}>
                  1. Melihat (見る)
                </div>
                <div style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary}}>
                  Mata menangkap tampilan makanan/benda
                </div>
              </div>
            </div>
          </At>
        )}

        {/* Step 2: Mendapat Kesan */}
        {flowStep2 > 0 && (
          <At y={700} style={{transform: `translate(-50%, -50%) scale(${flowStep2})`}}>
            <div
              style={{
                width: 680,
                background: C.card,
                border: `2px solid ${C.gold}`,
                borderRadius: 24,
                padding: '16px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <span style={{fontSize: 36}}>💡</span>
              <div>
                <div style={{fontFamily: FONT.display, fontSize: 28, color: C.gold, fontWeight: 800}}>
                  2. Mendapat Kesan
                </div>
                <div style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary}}>
                  Otak menyimpulkan: “keadaannya tampak seperti itu”
                </div>
              </div>
            </div>
          </At>
        )}

        {/* Step 3: Terucap おいしそう */}
        {flowStep3 > 0 && (
          <At y={900} style={{transform: `translate(-50%, -50%) scale(${flowStep3})`}}>
            <div
              style={{
                width: 680,
                background: `${C.gold}22`,
                border: `2.5px solid ${C.gold}`,
                borderRadius: 24,
                padding: '18px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: `0 0 30px ${C.gold}44`,
              }}
            >
              <span style={{fontSize: 36}}>✨</span>
              <div>
                <div style={{fontFamily: FONT.jp, fontSize: 36, color: C.gold, fontWeight: 900}}>
                  3. おいしそう!
                </div>
                <div style={{fontFamily: FONT.body, fontSize: 20, color: '#ffffff', fontWeight: 700}}>
                  “Kelihatannya enak!”
                </div>
              </div>
            </div>
          </At>
        )}

        <At y={1140}>
          <Avatar gender="male" expression="confident" height={220} idleBob />
        </At>
      </Win>

      {/* ========================================================
          BAGIAN 4: 01:43 - 01:56 (CONTOH 2: 雨が降りそう)
          ======================================================== */}
      <Win T={T} a={38.0} b={51.0}>
        {/* Awan Mendung & Gerimis */}
        <At y={480} style={{transform: `translate(-50%, -50%) scale(${cloudPop})`}}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{fontSize: 110, filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.8))'}}>
              ☁️🌧️
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 24,
                fontWeight: 800,
                color: C.indigoSoft,
                background: C.card,
                padding: '6px 20px',
                borderRadius: 999,
                border: `1.5px solid ${C.indigo}`,
              }}
            >
              Langit gelap & awan tebal terlihat
            </div>
          </div>
        </At>

        {/* Kartu Status SevnQuest: 雨が降りそう */}
        {rainCardIn > 0 && (
          <At y={920} style={{transform: `translate(-50%, -50%) scale(${rainCardIn})`}}>
            <GCard
              color={C.indigoSoft}
              glow={0.8}
              style={{
                width: 860,
                padding: '28px 44px',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <Jp size={70} color={C.gold}>雨が降りそう</Jp>
                <Pill color={C.indigoSoft} size={30} filled>OBSERVATION</Pill>
              </div>
              <Label size={42} color={C.text}>= SEPERTINYA AKAN HUJAN</Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                Melihat awan gelap ➔ Mendapat kesan ➔{' '}
                <Hi color={C.gold}>“keadaannya mengarah ke hujan!”</Hi>
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          SUBTITLES NARASI
          ======================================================== */}
      <NarrationSub t={T} at={0.0} until={8.0}>
        Sekarang, bagaimana kalau konteksnya berubah menjadi apa yang kita amati sendiri?
      </NarrationSub>
      <NarrationSub t={T} at={8.0} until={22.0}>
        Melihat makanan: huruf <Hi color={C.hanko}>い</Hi> lepas, diganti <Hi color={C.gold}>そう</Hi> ➔ <Hi>おいしそう</Hi> (kelihatannya enak).
      </NarrationSub>
      <NarrationSub t={T} at={22.0} until={38.0}>
        Melihat ➔ mendapat kesan ➔ terucaplah “<span style={{color: C.gold}}>おいしそう</span>”.
      </NarrationSub>
      <NarrationSub t={T} at={38.0} until={51.0}>
        Melihat awan mendung: “<span style={{color: C.gold}}>雨が降りそう</span>” (sepertinya akan hujan).
      </NarrationSub>
    </div>
  );
};
