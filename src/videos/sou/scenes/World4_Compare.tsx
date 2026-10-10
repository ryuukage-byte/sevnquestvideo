import React from 'react';
import {
  At,
  BOUNCY,
  GCard,
  Hi,
  HighlightI,
  Jp,
  Label,
  NarrationSub,
  Pill,
  Win,
  pp,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World4_Compare: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 45.0s (01:56 - 02:41)

  // 1. そう vs よう (0.0s - 18.0s)
  const compareHeaderPop = pp(T, 0.3, BOUNCY);
  const cardSouIn = pp(T, 2.5, BOUNCY);
  const cardYouIn = pp(T, 4.5, BOUNCY);

  // 2. Basis Perbedaan (18.0s - 30.0s)
  const diffIn = pp(T, 18.5, BOUNCY);

  // 3. Pembeda Krusial: おいしそうです vs おいしいそうです (30.0s - 45.0s)
  const grammarHeaderPop = pp(T, 30.5, BOUNCY);
  const card1Grammar = pp(T, 32.5, BOUNCY);
  const card2Grammar = pp(T, 35.5, BOUNCY);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* ========================================================
          BAGIAN 1 & 2: 01:56 - 02:26 (そう VS よう)
          ======================================================== */}
      <Win T={T} a={0} b={30.0}>
        <At y={340} style={{transform: `translate(-50%, -50%) scale(${compareHeaderPop})`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <span style={{fontFamily: FONT.jp, fontSize: 56, fontWeight: 900, color: C.gold}}>
              そう
            </span>
            <span style={{fontFamily: FONT.display, fontSize: 32, fontWeight: 800, color: C.textMuted}}>
              VS
            </span>
            <span style={{fontFamily: FONT.jp, fontSize: 56, fontWeight: 900, color: C.indigoSoft}}>
              よう
            </span>
          </div>
        </At>

        {/* Dua Kartu Sebelahan: 雨が降りそう vs 雨が降るようだ */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 450,
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            padding: '0 30px',
          }}
        >
          {/* Kartu Kiri: そう */}
          <div style={{transform: `scale(${cardSouIn})`, width: 480}}>
            <GCard
              color={C.gold}
              glow={0.6}
              style={{
                width: '100%',
                padding: '24px 28px',
                flexDirection: 'column',
                gap: 12,
                textAlign: 'center',
              }}
            >
              <Pill color={C.gold} size={24} filled>KESAN LANGSUNG</Pill>
              <Jp size={48} color={C.gold}>雨が降りそう</Jp>
              <Label size={28} color={C.text}>Sepertinya akan hujan</Label>
              <span style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary, lineHeight: 1.3}}>
                Tampak jelas dari keadaan seketika di depan mata.
              </span>
            </GCard>
          </div>

          {/* Kartu Kanan: よう */}
          <div style={{transform: `scale(${cardYouIn})`, width: 480}}>
            <GCard
              color={C.indigoSoft}
              glow={0.5}
              style={{
                width: '100%',
                padding: '24px 28px',
                flexDirection: 'column',
                gap: 12,
                textAlign: 'center',
              }}
            >
              <Pill color={C.indigoSoft} size={24} filled>PERBANDINGAN</Pill>
              <Jp size={48} color={C.indigoSoft}>雨が降るようだ</Jp>
              <Label size={28} color={C.text}>Tampaknya akan hujan</Label>
              <span style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary, lineHeight: 1.3}}>
                Berdasarkan dugaan menyeluruh atau data perbandingan.
              </span>
            </GCard>
          </div>
        </div>

        {/* Ringkasan Perbedaan (18.0s - 30.0s) */}
        {diffIn > 0 && (
          <At y={980} style={{transform: `translate(-50%, -50%) scale(${diffIn})`}}>
            <GCard
              color={C.gold}
              glow={0.6}
              style={{
                width: 860,
                padding: '24px 40px',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'center',
              }}
            >
              <Label size={34} color={C.text}>
                FOKUS UTAMA KEDUANYA BERBEDA
              </Label>
              <div style={{display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 8}}>
                <div style={{color: C.gold, fontFamily: FONT.body, fontSize: 22}}>
                  <strong>そう</strong> = Kesan spontan dari tampilan luar
                </div>
                <div style={{color: C.indigoSoft, fontFamily: FONT.body, fontSize: 22}}>
                  <strong>よう</strong> = Analisis & perumpamaan
                </div>
              </div>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 3: 02:26 - 02:41 (PEMBEDA KRUSIAL HURUF い)
          ======================================================== */}
      <Win T={T} a={30.0} b={45.0}>
        <At y={350} style={{transform: `translate(-50%, -50%) scale(${grammarHeaderPop})`}}>
          <div
            style={{
              padding: '10px 32px',
              borderRadius: 999,
              background: `${C.hanko}22`,
              border: `2px solid ${C.hanko}`,
              color: C.hanko,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 26,
              letterSpacing: 1.5,
            }}
          >
            ⚠️ PEMBEDA PALING PENTING: HURUF [い]
          </div>
        </At>

        {/* Kartu 1: おいしそうです (Kesan Sendiri) */}
        {card1Grammar > 0 && (
          <At y={570} style={{transform: `translate(-50%, -50%) scale(${card1Grammar})`}}>
            <GCard
              color={C.gold}
              glow={0.7}
              style={{
                width: 880,
                padding: '24px 36px',
                flexDirection: 'column',
                gap: 12,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, whiteSpace: 'nowrap'}}>
                <Jp size={52} color={C.gold} style={{whiteSpace: 'nowrap'}}>おいしそうです</Jp>
                <Pill color={C.matcha} size={24} filled>KESAN SENDIRI</Pill>
              </div>
              <Label size={36} color={C.text}>= KELIHATANNYA ENAK</Label>
              <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>
                Huruf <Hi color={C.hanko}>い DIBUANG</Hi> ➔ Berdasarkan apa yang kita lihat langsung!
              </span>
            </GCard>
          </At>
        )}

        {/* Kartu 2: おいしいそうです (Katanya Enak / Informasi Orang Lain) */}
        {card2Grammar > 0 && (
          <At y={910} style={{transform: `translate(-50%, -50%) scale(${card2Grammar})`}}>
            <GCard
              color={C.hanko}
              glow={0.8}
              style={{
                width: 880,
                padding: '24px 36px',
                flexDirection: 'column',
                gap: 12,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, whiteSpace: 'nowrap'}}>
                <div style={{display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                  <span style={{fontFamily: FONT.jp, fontSize: 52, fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap'}}>
                    おいし
                  </span>
                  <HighlightI>い</HighlightI>
                  <span style={{fontFamily: FONT.jp, fontSize: 52, fontWeight: 700, color: C.gold, whiteSpace: 'nowrap'}}>
                    そうです
                  </span>
                </div>
                <Pill color={C.hanko} size={24} filled>KATANYA / HEARSAY</Pill>
              </div>
              <Label size={36} color={C.text}>= KATANYA ENAK</Label>
              <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>
                Huruf <Hi color={C.hanko}>い UTUH</Hi> ➔ Berdasarkan informasi dari orang lain!
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          SUBTITLES NARASI
          ======================================================== */}
      <NarrationSub t={T} at={0.0} until={18.0}>
        <span style={{color: C.gold}}>雨が降りそう</span> vs <span style={{color: C.indigoSoft}}>雨が降るようだ</span>: keduanya mirip, tapi titik beratnya berbeda.
      </NarrationSub>
      <NarrationSub t={T} at={18.0} until={30.0}>
        <Hi color={C.gold}>そう</Hi> itu kesan spontan dari keadaan, sedangkan <Hi color={C.indigoSoft}>よう</Hi> lebih ke perbandingan dugaan.
      </NarrationSub>
      <NarrationSub t={T} at={30.0} until={45.0}>
        Hati-hati: <Hi color={C.gold}>おいしそうです</Hi> (kelihatannya enak), tapi <Hi color={C.hanko}>おいしいそうです</Hi> (katanya enak)!
      </NarrationSub>
    </div>
  );
};
