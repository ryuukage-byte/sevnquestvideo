import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  GCard,
  Hi,
  HighlightI,
  Jp,
  Label,
  MotionArrow,
  NarrationSub,
  Pill,
  SouAnchor,
  Win,
  pp,
  ps,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World5_KatanyaRecap: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 34.0s (02:41 - 03:15)

  // 1. Transfer Informasi (0.0s - 9.0s)
  const transferHeaderPop = pp(T, 0.3, BOUNCY);
  const arrowTransfer = ps(T, 2.5, 4.0);
  const cardKatanyaIn = pp(T, 4.5, BOUNCY);

  // 2. Rekap 5 Kartu (9.0s - 22.0s)
  const r1 = pp(T, 9.5, BOUNCY);
  const r2 = pp(T, 11.5, BOUNCY);
  const r3 = pp(T, 13.5, BOUNCY);
  const r4 = pp(T, 15.5, BOUNCY);
  const r5 = pp(T, 17.5, BOUNCY);

  // 3. Collapse ke Pohon Konsep (22.0s - 34.0s)
  const treePop = pp(T, 25.0, BOUNCY);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* ========================================================
          BAGIAN 1: 02:41 - 02:50 (TRANSFER INFORMASI ORANG LAIN)
          ======================================================== */}
      <Win T={T} a={0} b={9.0}>
        <At y={360} style={{transform: `translate(-50%, -50%) scale(${transferHeaderPop})`}}>
          <Label size={34} color={C.hanko}>
            INFORMASI DARI PIHAK LAIN (HEARSAY)
          </Label>
        </At>

        {/* Transfer Visual: Orang A ➔ Informasi ➔ Orang B */}
        <div style={{position: 'absolute', left: 100, top: 480}}>
          <Avatar gender="female" expression="happy" height={200} />
          <div style={{color: C.textSecondary, fontFamily: FONT.body, fontSize: 18, textAlign: 'center', marginTop: 8}}>
            Orang Lain
          </div>
        </div>

        <div style={{position: 'absolute', right: 100, top: 480}}>
          <Avatar gender="male" expression="neutral" height={200} />
          <div style={{color: C.textSecondary, fontFamily: FONT.body, fontSize: 18, textAlign: 'center', marginTop: 8}}>
            Kita (Mendengar)
          </div>
        </div>

        {arrowTransfer > 0 && (
          <MotionArrow
            x1={300}
            y1={580}
            x2={780}
            y2={580}
            p={arrowTransfer}
            color={C.gold}
            w={6}
            label="meneruskan kabar"
          />
        )}

        {/* Kartu Status SevnQuest: おいしいそうです */}
        {cardKatanyaIn > 0 && (
          <At y={880} style={{transform: `translate(-50%, -50%) scale(${cardKatanyaIn})`}}>
            <GCard
              color={C.hanko}
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
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span style={{fontFamily: FONT.jp, fontSize: 64, fontWeight: 700, color: '#ffffff'}}>
                    おいし
                  </span>
                  <HighlightI>い</HighlightI>
                  <span style={{fontFamily: FONT.jp, fontSize: 64, fontWeight: 700, color: C.gold}}>
                    そうです
                  </span>
                </div>
                <Pill color={C.hanko} size={28} filled>KATANYA</Pill>
              </div>
              <Label size={40} color={C.text}>= KATANYA ENAK</Label>
              <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>
                Kata sifat utuh + <Hi color={C.gold}>そうです</Hi> = menyampaikan kabar yang kita dengar!
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 2: 02:50 - 03:03 (REKAP 5 KARTU CONTOH)
          ======================================================== */}
      <Win T={T} a={9.0} b={22.0}>
        <At y={330}>
          <Label size={34} color={C.gold}>
            REKAP 5 CONTOH PENGGUNAAN そう
          </Label>
        </At>

        {/* Grid 5 Kartu SevnQuest */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Card 1 */}
          {r1 > 0 && (
            <div style={{transform: `scale(${r1})`, width: 940}}>
              <GCard color={C.gold} style={{padding: '16px 30px', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <Jp size={40} color={C.gold}>そうです</Jp>
                  <Pill color={C.matcha} size={22} filled>KONFIRMASI</Pill>
                </div>
                <Label size={25} color={C.text}>= Begitu (memang seperti itu)</Label>
              </GCard>
            </div>
          )}

          {/* Card 2 */}
          {r2 > 0 && (
            <div style={{transform: `scale(${r2})`, width: 940}}>
              <GCard color={C.indigoSoft} style={{padding: '16px 30px', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <Jp size={40} color={C.gold}>そうですか</Jp>
                  <Pill color={C.indigoSoft} size={22} filled>PERTANYAAN</Pill>
                </div>
                <Label size={25} color={C.text}>= Begitukah? (oh, begitu?)</Label>
              </GCard>
            </div>
          )}

          {/* Card 3 */}
          {r3 > 0 && (
            <div style={{transform: `scale(${r3})`, width: 940}}>
              <GCard color={C.gold} style={{padding: '16px 30px', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <Jp size={40} color={C.gold}>おいしそう</Jp>
                  <Pill color={C.matcha} size={22} filled>KESAN PENGLIHATAN</Pill>
                </div>
                <Label size={25} color={C.text}>= Kelihatannya enak</Label>
              </GCard>
            </div>
          )}

          {/* Card 4 */}
          {r4 > 0 && (
            <div style={{transform: `scale(${r4})`, width: 940}}>
              <GCard color={C.indigoSoft} style={{padding: '16px 30px', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <Jp size={40} color={C.gold}>雨が降りそう</Jp>
                  <Pill color={C.indigoSoft} size={22} filled>OBSERVASI KEADAAN</Pill>
                </div>
                <Label size={25} color={C.text}>= Sepertinya akan hujan</Label>
              </GCard>
            </div>
          )}

          {/* Card 5 */}
          {r5 > 0 && (
            <div style={{transform: `scale(${r5})`, width: 940}}>
              <GCard color={C.hanko} style={{padding: '16px 30px', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{fontFamily: FONT.jp, fontSize: 38, color: '#fff'}}>おいし</span>
                    <HighlightI>い</HighlightI>
                    <span style={{fontFamily: FONT.jp, fontSize: 38, color: C.gold}}>そうです</span>
                  </div>
                  <Pill color={C.hanko} size={22} filled>HEARSAY</Pill>
                </div>
                <Label size={25} color={C.text}>= Katanya enak</Label>
              </GCard>
            </div>
          )}
        </div>
      </Win>

      {/* ========================================================
          BAGIAN 3: 03:03 - 03:15 (COLLAPSE KE POHON KONSEP)
          ======================================================== */}
      <Win T={T} a={22.0} b={34.0}>
        <At y={440}>
          <SouAnchor size={140} />
          <div
            style={{
              marginTop: 14,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 34,
              color: '#ffffff',
            }}
          >
            = BEGITU / SEPERTI ITU
          </div>
        </At>

        {/* Bagan Pohon Percabangan: KESAN vs INFORMASI */}
        {treePop > 0 && (
          <At y={860} style={{transform: `translate(-50%, -50%) scale(${treePop})`}}>
            <div style={{display: 'flex', gap: 32}}>
              {/* Cabang Kiri: Kesan */}
              <GCard
                color={C.gold}
                glow={0.7}
                style={{
                  width: 420,
                  padding: '24px 30px',
                  flexDirection: 'column',
                  gap: 12,
                  textAlign: 'center',
                }}
              >
                <Pill color={C.matcha} size={24} filled>CABANG 1</Pill>
                <div style={{fontFamily: FONT.display, fontSize: 32, fontWeight: 900, color: C.gold}}>
                  KESAN LANGSUNG
                </div>
                <span style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary}}>
                  Dari apa yang dilihat secara visual (おいしそう, 降りそう)
                </span>
              </GCard>

              {/* Cabang Kanan: Informasi */}
              <GCard
                color={C.hanko}
                glow={0.7}
                style={{
                  width: 420,
                  padding: '24px 30px',
                  flexDirection: 'column',
                  gap: 12,
                  textAlign: 'center',
                }}
              >
                <Pill color={C.hanko} size={24} filled>CABANG 2</Pill>
                <div style={{fontFamily: FONT.display, fontSize: 32, fontWeight: 900, color: C.hanko}}>
                  INFORMASI KABAR
                </div>
                <span style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary}}>
                  Dari sumber lain yang didengar (おいしいそうです)
                </span>
              </GCard>
            </div>
          </At>
        )}
      </Win>

      {/* ========================================================
          SUBTITLES NARASI
          ======================================================== */}
      <NarrationSub t={T} at={0.0} until={9.0}>
        <Hi color={C.hanko}>おいしいそうです</Hi> = meneruskan informasi dari orang lain: “katanya enak”.
      </NarrationSub>
      <NarrationSub t={T} at={9.0} until={22.0}>
        Lihat kelimanya: semuanya berakar dari gagasan <Hi color={C.gold}>そう</Hi> (seperti itu).
      </NarrationSub>
      <NarrationSub t={T} at={22.0} until={34.0}>
        Artinya berubah bukan karena katanya berbeda, melainkan karena <Hi>konteksnya yang berbeda</Hi>!
      </NarrationSub>
    </div>
  );
};
