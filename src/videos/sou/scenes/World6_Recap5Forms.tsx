import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  HighlightI,
  HighlightSou,
  NarrationSub,
  SouAnchor,
  Win,
  pp,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

const RECAP_ITEMS = [
  {jp: <span><HighlightSou />です</span>, id: '“Memang begitu”', tag: 'Pernyataan setuju', time: 0.3},
  {jp: <span><HighlightSou />ですか</span>, id: '“Begitukah?”', tag: 'Pertanyaan keadaan', time: 1.0},
  {jp: <span><HighlightSou />思います</span>, id: '“Berpikir begitu”', tag: 'Pendapat pribadi', time: 1.7},
  {jp: <span>おいし<HighlightSou /></span>, id: '“Kelihatannya enak”', tag: 'Kesan visual langsung', time: 2.4},
  {jp: <span>おいし<HighlightI>い</HighlightI><HighlightSou />です</span>, id: '“Katanya enak”', tag: 'Informasi dari orang', time: 3.1},
];

export const World6_Recap5Forms: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 7.0s (relatif terhadap start 65.5s)
  // Subtitle timeline:
  // S28: 0.0 - 4.0s (Jadi coba lihat semuanya...)
  // S29: 4.0 - 7.0s (Jangan buru-buru menghafal... Pegang satu bayangan saja: そう = begitu)

  const singleImagePop = pp(T, 4.2, BOUNCY);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* S28: 5 Baris Rekap (0.0s - 4.0s) */}
      <Win T={T} a={0} b={4.0}>
        <At y={240}>
          <div
            style={{
              padding: '6px 24px',
              borderRadius: 999,
              background: `${C.gold}22`,
              border: `1.5px solid ${C.gold}`,
              color: C.gold,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            SINTESIS: LIMA BENTUK UTAMA
          </div>
        </At>

        {/* 5 Baris Kartu */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 340,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {RECAP_ITEMS.map((item, idx) => {
            const rowPop = pp(T, item.time, BOUNCY);
            return (
              <div
                key={idx}
                style={{
                  width: 760,
                  background: '#1d2535',
                  border: `2px solid ${C.borderPrimary}`,
                  borderRadius: 20,
                  padding: '14px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  transform: `scale(${rowPop})`,
                  opacity: rowPop,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 16,
                      fontWeight: 800,
                      color: C.gold,
                      background: `${C.gold}22`,
                      borderRadius: 8,
                      padding: '4px 8px',
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <div
                    style={{
                      fontFamily: FONT.jp,
                      fontSize: 38,
                      fontWeight: 900,
                      color: '#ffffff',
                    }}
                  >
                    {item.jp}
                  </div>
                </div>

                <div style={{textAlign: 'right'}}>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 22,
                      fontWeight: 800,
                      color: C.goldSoft,
                    }}
                  >
                    {item.id}
                  </div>
                  <div style={{fontSize: 14, color: C.indigoSoft}}>{item.tag}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Win>

      {/* S29: Pegang Satu Bayangan Inti: そう = begitu / seperti itu (4.0s - 7.0s) */}
      <Win T={T} a={4.0} b={7.0}>
        <At y={420}>
          <div
            style={{
              padding: '8px 28px',
              borderRadius: 999,
              background: 'rgba(240, 190, 82, 0.15)',
              border: `2px solid ${C.gold}`,
              color: C.gold,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            JANGAN BURU-BURU MENGHAFAL SEMUANYA
          </div>

          <SouAnchor size={140} scale={singleImagePop} />

          <div
            style={{
              marginTop: 24,
              background: '#222c3f',
              border: `2.5px solid ${C.gold}`,
              borderRadius: 28,
              padding: '24px 48px',
              textAlign: 'center',
              boxShadow: `0 16px 40px rgba(0,0,0,0.7), 0 0 32px ${C.gold}33`,
              transform: `scale(${singleImagePop})`,
            }}
          >
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 44,
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: 6,
              }}
            >
              <HighlightSou /> = “Begitu / Seperti itu”
            </div>
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 22,
                fontWeight: 700,
                color: C.goldSoft,
              }}
            >
              Satu bayangan kunci untuk memahami semua konteks.
            </div>
          </div>
        </At>

        {/* Karakter Avatar di Bawah */}
        <At y={1080}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <Avatar gender="female" expression="confident" height={220} bubble="idea" />
            <div
              style={{
                background: '#1d273a',
                border: `1.5px solid ${C.indigo}`,
                borderRadius: 20,
                padding: '16px 26px',
                color: '#edf0f6',
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 22,
                maxWidth: 360,
              }}
            >
              “Pegang satu bayangan dasarnya dulu, maka rumus mana pun akan masuk akal!”
            </div>
          </div>
        </At>
      </Win>

      {/* Subtitle Narasi */}
      <NarrationSub t={T} at={0.0} until={4.0}>
        “Jadi coba lihat semuanya… polanya sebenarnya satu.”
      </NarrationSub>
      <NarrationSub t={T} at={4.0} until={7.0}>
        “Jangan buru-buru menghafal. Pegang satu bayangan saja: <span style={{color: C.gold}}>そう = begitu</span>.”
      </NarrationSub>
    </div>
  );
};
