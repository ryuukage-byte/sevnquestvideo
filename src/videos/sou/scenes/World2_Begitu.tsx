import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  DialogueBalloon,
  GCard,
  Hi,
  Jp,
  Label,
  MotionArrow,
  NarrationSub,
  Pill,
  SOFT,
  SouAnchor,
  Win,
  pp,
  ps,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World2_Begitu: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 50.0s (00:15 - 01:05)

  // 1. Konsep Dasar (0.0s - 12.0s)
  const conceptIn = pp(T, 0.3, BOUNCY);
  const cardDefIn = pp(T, 5.0, BOUNCY);

  // 2. Contoh Percakapan (12.0s - 28.0s)
  const b1In = pp(T, 12.4, BOUNCY);
  const b2In = pp(T, 15.0, BOUNCY);
  const arrowBack = ps(T, 18.0, 19.5);
  const cardSouDesuIn = pp(T, 20.0, BOUNCY);

  // 3. そうですか (28.0s - 37.0s)
  const cardSouDesukaIn = pp(T, 28.5, BOUNCY);
  const qPop = pp(T, 30.5, BOUNCY);

  // 4. そう思います (37.0s - 50.0s)
  const cardOmoimasuIn = pp(T, 37.5, BOUNCY);
  const splitAnim = ps(T, 40.0, 41.5);
  const transOut = pp(T, 45.0, SOFT);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* ========================================================
          BAGIAN 1: 00:15 - 00:27 (KONSEP DASAR MENUNJUK KEADAAN)
          ======================================================== */}
      <Win T={T} a={0} b={12.0}>
        <At y={420} style={{transform: `translate(-50%, -50%) scale(${conceptIn})`}}>
          {/* Alur Konsep: KEADAAN / INFORMASI ➔ そう ➔ "seperti itu" */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <div
              style={{
                background: C.card,
                border: `2px solid ${C.indigo}`,
                borderRadius: 24,
                padding: '16px 36px',
                color: C.indigoSoft,
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: 1,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              📋 KEADAAN / INFORMASI
            </div>

            <div style={{fontSize: 32, color: C.gold}}>⬇️</div>

            <SouAnchor size={120} />

            <div style={{fontSize: 32, color: C.gold}}>⬇️</div>

            <div
              style={{
                background: `${C.gold}22`,
                border: `2px solid ${C.gold}`,
                borderRadius: 24,
                padding: '16px 36px',
                color: C.gold,
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 32,
                boxShadow: `0 0 30px ${C.gold}44`,
              }}
            >
              “SEPERTI ITU / BEGITU”
            </div>
          </div>
        </At>

        {/* Kartu Definisi Khas SevnQuest */}
        {cardDefIn > 0 && (
          <At y={950} style={{transform: `translate(-50%, -50%) scale(${cardDefIn})`}}>
            <GCard
              color={C.gold}
              glow={0.7}
              style={{
                width: 860,
                padding: '28px 44px',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <Jp size={68} color={C.gold}>そう</Jp>
                <Pill color={C.matcha} size={28} filled>POINTER</Pill>
              </div>
              <Label size={36} color={C.text}>
                = MENUNJUK PADA SUATU KEADAAN
              </Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                <Hi color={C.gold}>そう</Hi> menunjuk pada sesuatu yang sudah dianggap atau diketahui sebagai keadaan tertentu.
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 2: 00:27 - 00:43 (CONTOH: そうです)
          ======================================================== */}
      <Win T={T} a={12.0} b={28.0}>
        {/* Balon Pembicara A (Kiri) */}
        <div
          style={{
            position: 'absolute',
            left: 280,
            top: 360,
            transform: `scale(${b1In})`,
            transformOrigin: 'left center',
          }}
        >
          <DialogueBalloon
            speaker="Pembicara A"
            japanese="明日は休みです。"
            translation="“Besok libur.”"
            side="left"
            active={T < 15.0 || (T >= 18.0 && T < 22.0)}
            icon="📅"
          />
        </div>
        <div style={{position: 'absolute', left: 80, top: 380}}>
          <Avatar gender="male" expression="happy" height={190} />
        </div>

        {/* Balon Pembicara B (Kanan) */}
        <div
          style={{
            position: 'absolute',
            right: 280,
            top: 550,
            transform: `scale(${b2In})`,
            transformOrigin: 'right center',
          }}
        >
          <DialogueBalloon
            speaker="Pembicara B"
            japanese="そうです。"
            translation="“Begitu (memang seperti itu).”"
            side="right"
            active={T >= 15.0}
            icon="✅"
          />
        </div>
        <div style={{position: 'absolute', right: 80, top: 570}}>
          <Avatar gender="female" expression="confident" height={190} />
        </div>

        {/* Panah menunjuk kembali ke informasi Pembicara A */}
        {arrowBack > 0 && (
          <MotionArrow
            x1={760}
            y1={600}
            x2={400}
            y2={450}
            p={arrowBack}
            color={C.gold}
            w={6}
            label="menunjuk ke keadaan"
          />
        )}

        {/* Kartu Status SevnQuest: そうです */}
        {cardSouDesuIn > 0 && (
          <At y={960} style={{transform: `translate(-50%, -50%) scale(${cardSouDesuIn})`}}>
            <GCard
              color={C.gold}
              glow={0.7}
              style={{
                width: 860,
                padding: '28px 44px',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <Jp size={76} color={C.gold}>そうです</Jp>
                <Pill color={C.matcha} size={30} filled>CONFIRM</Pill>
              </div>
              <Label size={42} color={C.text}>= BEGITU / MEMANG SEPERTI ITU</Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                Kata <Hi color={C.gold}>そう</Hi> menunjuk kembali ke informasi bahwa{' '}
                <span style={{color: C.matcha, fontWeight: 700}}>besok libur</span>!
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 3: 00:43 - 00:52 (CONTOH: そうですか)
          ======================================================== */}
      <Win T={T} a={28.0} b={37.0}>
        <At y={540}>
          <div style={{position: 'relative'}}>
            <Avatar
              gender="female"
              expression="surprised"
              height={260}
              bubble="question"
              idleBob
            />
            {qPop > 0 && (
              <div
                style={{
                  position: 'absolute',
                  right: -60,
                  top: -20,
                  fontSize: 70,
                  color: C.gold,
                  transform: `scale(${qPop})`,
                  fontWeight: 900,
                  textShadow: `0 0 24px ${C.gold}`,
                }}
              >
                ?
              </div>
            )}
          </div>
        </At>

        {/* Kartu Status SevnQuest: そうですか */}
        {cardSouDesukaIn > 0 && (
          <At y={950} style={{transform: `translate(-50%, -50%) scale(${cardSouDesukaIn})`}}>
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
                <Jp size={76} color={C.gold}>そうですか</Jp>
                <Pill color={C.indigoSoft} size={30} filled>QUESTION</Pill>
              </div>
              <Label size={42} color={C.text}>= BEGITUKAH? / OH, BEGITU?</Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                Mempertanyakan keadaan: <Hi color={C.indigoSoft}>“Apakah keadaannya memang seperti itu?”</Hi>
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 4: 00:52 - 01:05 (CONTOH: そう思います)
          ======================================================== */}
      <Win T={T} a={37.0} b={50.0}>
        {/* Pemisahan Tipografi: そう + 思います */}
        <At y={480}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              background: C.card,
              border: `2px solid ${C.gold}`,
              borderRadius: 30,
              padding: '20px 48px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
            }}
          >
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 72,
                fontWeight: 900,
                color: C.gold,
                transform: `translateX(${-splitAnim * 20}px)`,
                textShadow: `0 0 25px ${C.gold}88`,
              }}
            >
              そう
            </span>
            <span style={{fontSize: 40, color: C.textSecondary}}>+</span>
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 64,
                fontWeight: 800,
                color: '#ffffff',
                transform: `translateX(${splitAnim * 20}px)`,
              }}
            >
              思います
            </span>
          </div>
        </At>

        {/* Kartu Status SevnQuest: そう思います */}
        {cardOmoimasuIn > 0 && (
          <At y={860} style={{transform: `translate(-50%, -50%) scale(${cardOmoimasuIn})`}}>
            <GCard
              color={C.gold}
              glow={0.7}
              style={{
                width: 860,
                padding: '28px 44px',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <Jp size={68} color={C.gold}>そう思います</Jp>
                <Pill color={C.gold} size={30} filled>OPINION</Pill>
              </div>
              <Label size={42} color={C.text}>= SAYA PIKIR BEGITU</Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                Pikiran / pendapat saya mengarah ke hal yang <Hi color={C.gold}>“seperti itu”</Hi>.
              </span>
            </GCard>
          </At>
        )}

        {/* Banner Transisi Menuju Dunia 3 */}
        {transOut > 0 && (
          <At y={1180} style={{transform: `translate(-50%, -50%) scale(${transOut})`}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: 'rgba(79, 174, 134, 0.15)',
                border: `1.5px solid ${C.matcha}`,
                borderRadius: 999,
                padding: '14px 36px',
                color: C.matcha,
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 24,
                boxShadow: `0 0 24px ${C.matcha}33`,
              }}
            >
              <span>👁️</span>
              <span>LALU BAGAIMANA KALAU KONTEKSNYA KITA LIHAT SENDIRI?</span>
            </div>
          </At>
        )}
      </Win>

      {/* ========================================================
          SUBTITLES NARASI
          ======================================================== */}
      <NarrationSub t={T} at={0.0} until={12.0}>
        <span style={{color: C.gold}}>そう</span> menunjuk ke sesuatu yang dianggap atau diketahui sebagai keadaan tertentu.
      </NarrationSub>
      <NarrationSub t={T} at={12.0} until={28.0}>
        Misal: “Besok libur” ➔ dijawab “<span style={{color: C.gold}}>そうです</span>” artinya memang keadaannya begitu!
      </NarrationSub>
      <NarrationSub t={T} at={28.0} until={37.0}>
        Kalau ditambah <Hi>か</Hi>: “<span style={{color: C.gold}}>そうですか</span>” = “Apakah keadaannya begitu?”
      </NarrationSub>
      <NarrationSub t={T} at={37.0} until={50.0}>
        Begitu juga dengan “<span style={{color: C.gold}}>そう思います</span>”: saya pikir juga keadaannya seperti itu.
      </NarrationSub>
    </div>
  );
};
