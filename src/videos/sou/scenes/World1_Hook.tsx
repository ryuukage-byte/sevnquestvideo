import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  ContextCard,
  GCard,
  Hi,
  Jp,
  Label,
  NarrationSub,
  Pill,
  SOFT,
  SouAnchor,
  Win,
  mix,
  pp,
  ps,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World1_Hook: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 15.0s

  // S01 (0.0s - 3.0s): Hook - Sou besar & Karakter bingung
  const souPop = pp(T, 0.2, BOUNCY);
  const q1 = pp(T, 0.7, BOUNCY);
  const q2 = pp(T, 1.2, BOUNCY);
  const q3 = pp(T, 1.7, BOUNCY);

  // S02 (3.0s - 9.0s): Tiga kata muncul berurutan di sekeliling そう
  const card1Pop = pp(T, 3.2, BOUNCY);
  const card2Pop = pp(T, 4.4, BOUNCY);
  const card3Pop = pp(T, 5.6, BOUNCY);
  const qBannerPop = pp(T, 6.8, BOUNCY);

  // S03 (9.0s - 15.0s): Ketiga kartu ditarik benang merah ke pusat そう
  const threadProgress = ps(T, 9.2, 11.0);
  const zoomCenter = ps(T, 9.5, 11.5);
  const centralFormulaPop = pp(T, 11.2, BOUNCY);
  const bannerTransPop = pp(T, 12.8, SOFT);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* Radial atmosphere glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, #2a354f55 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ========================================================
          BAGIAN 1: 00:00 - 00:03 (HOOK INSTAN)
          ======================================================== */}
      <Win T={T} a={0} b={3.0}>
        <At y={500}>
          <div
            style={{
              padding: '8px 24px',
              borderRadius: 999,
              background: `${C.gold}22`,
              border: `1.5px solid ${C.gold}88`,
              color: C.gold,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: 2,
              marginBottom: 24,
            }}
          >
            PERNAH BINGUNG DENGAN
          </div>
          <SouAnchor size={160} scale={souPop} />
        </At>

        {/* Karakter Avatar SevnQuest bingung */}
        <At y={980}>
          <div style={{position: 'relative'}}>
            <Avatar
              gender="male"
              expression="confused"
              height={300}
              bubble="question"
              idleBob
            />

            {q1 > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: -70,
                  top: 20,
                  fontSize: 54,
                  color: C.indigoSoft,
                  transform: `scale(${q1})`,
                  textShadow: '0 0 16px rgba(111,147,207,0.8)',
                  fontWeight: 900,
                }}
              >
                ?
              </div>
            )}
            {q2 > 0 && (
              <div
                style={{
                  position: 'absolute',
                  right: -80,
                  top: 10,
                  fontSize: 60,
                  color: C.gold,
                  transform: `scale(${q2})`,
                  textShadow: '0 0 16px rgba(240,190,82,0.8)',
                  fontWeight: 900,
                }}
              >
                ?
              </div>
            )}
            {q3 > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  top: -65,
                  fontSize: 48,
                  color: C.hanko,
                  transform: `scale(${q3})`,
                  textShadow: '0 0 16px rgba(226,85,91,0.8)',
                  fontWeight: 900,
                }}
              >
                ?
              </div>
            )}
          </div>
        </At>
      </Win>

      {/* ========================================================
          BAGIAN 2: 00:03 - 00:09 (TIGA TERJEMAHAN KOEKSISTENSI)
          ======================================================== */}
      <Win T={T} a={3.0} b={9.0}>
        <At y={440}>
          <SouAnchor size={120} />
        </At>

        {/* Tiga Kartu Konteks Muncul Berurutan & Hadir Bersama */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 620,
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            padding: '0 30px',
          }}
        >
          {/* Kartu 1: Begitu */}
          <ContextCard
            w={310}
            title="“begitu”"
            subtitle="そうです / そうですか"
            icon="💬"
            active={T >= 3.2 && T < 4.4}
            scale={card1Pop}
          />
          {/* Kartu 2: Kelihatannya */}
          <ContextCard
            w={310}
            title="“kelihatannya”"
            subtitle="おいしそう / 降りそう"
            icon="👁️"
            active={T >= 4.4 && T < 5.6}
            scale={card2Pop}
          />
          {/* Kartu 3: Katanya */}
          <ContextCard
            w={310}
            title="“katanya”"
            subtitle="おいしいそうです"
            icon="👂"
            active={T >= 5.6 && T < 6.8}
            scale={card3Pop}
          />
        </div>

        {/* Visual Pertanyaan: Kok satu kata bisa punya arti berbeda? */}
        {qBannerPop > 0 && (
          <At y={1050} style={{transform: `translate(-50%, -50%) scale(${qBannerPop})`}}>
            <GCard
              color={C.gold}
              glow={0.5}
              style={{
                width: 820,
                padding: '24px 36px',
                flexDirection: 'column',
                gap: 10,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <Pill color={C.hanko} size={28} filled>KENAPA BISA?</Pill>
              </div>
              <Label size={38} color={C.text}>
                Kok satu kata bisa punya arti berbeda?
              </Label>
              <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary}}>
                Bukan tiga kata terpisah, melainkan cara menunjuk yang berubah!
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ========================================================
          BAGIAN 3: 00:09 - 00:15 (COLLAPSE KE BENANG MERAH)
          ======================================================== */}
      <Win T={T} a={9.0} b={15.0}>
        <At y={440}>
          <SouAnchor size={140} scale={mix(1, 1.15, zoomCenter)} />
        </At>

        {/* SVG Benang Merah ditarik menuju そう */}
        {threadProgress > 0 && (
          <svg
            width={1080}
            height={1920}
            style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
          >
            <path
              d="M 220 720 Q 380 580 540 480"
              stroke={C.gold}
              strokeWidth={5}
              strokeDasharray="8 8"
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              strokeDashoffset={1 - threadProgress}
            />
            <path
              d="M 540 700 L 540 500"
              stroke={C.gold}
              strokeWidth={5}
              strokeDasharray="8 8"
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              strokeDashoffset={1 - threadProgress}
            />
            <path
              d="M 860 720 Q 700 580 540 480"
              stroke={C.gold}
              strokeWidth={5}
              strokeDasharray="8 8"
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              strokeDashoffset={1 - threadProgress}
            />
          </svg>
        )}

        {/* Formula Sentral: そう ➔ begitu / seperti itu */}
        {centralFormulaPop > 0 && (
          <At y={740} style={{transform: `translate(-50%, -50%) scale(${centralFormulaPop})`}}>
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
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <Jp size={68} color={C.gold}>そう</Jp>
                <Pill color={C.matcha} size={28} filled>BENANG MERAH</Pill>
              </div>
              <Label size={40} color={C.text}>
                = BEGITU / SEPERTI ITU
              </Label>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.3}}>
                Menunjuk pada suatu <Hi color={C.gold}>keadaan atau informasi</Hi> yang dianggap “seperti itu”.
              </span>
            </GCard>
          </At>
        )}

        {/* Banner Transisi Menuju Dunia 2 */}
        {bannerTransPop > 0 && (
          <At y={1100} style={{transform: `translate(-50%, -50%) scale(${bannerTransPop})`}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                background: 'rgba(240, 190, 82, 0.12)',
                border: `1.5px solid ${C.gold}`,
                borderRadius: 999,
                padding: '14px 34px',
                color: C.goldSoft,
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 26,
                boxShadow: `0 0 30px ${C.gold}33`,
              }}
            >
              <span>⚡</span>
              <span>BENANG MERAHNYA? KITA BEDAH DARI DASAR!</span>
            </div>
          </At>
        )}

        {/* Avatar Protag percaya diri di bawah */}
        <At y={1340}>
          <Avatar
            gender="male"
            expression="confident"
            height={230}
            idleBob
          />
        </At>
      </Win>

      {/* ========================================================
          SUBTITLES NARASI (ZONA AMAN Y = 1510)
          ======================================================== */}
      <NarrationSub t={T} at={0.0} until={3.0}>
        Pernah bingung dengan <span style={{color: C.gold}}>そう</span>?
      </NarrationSub>
      <NarrationSub t={T} at={3.0} until={9.0}>
        Kok satu kata bisa punya arti: <Hi>“begitu”</Hi>, <Hi>“kelihatannya”</Hi>, dan <Hi>“katanya”</Hi>?
      </NarrationSub>
      <NarrationSub t={T} at={9.0} until={15.0}>
        Benang merahnya cuma satu: <span style={{color: C.gold}}>そう</span> menunjuk keadaan sebagai <Hi>“seperti itu”</Hi>.
      </NarrationSub>
    </div>
  );
};
