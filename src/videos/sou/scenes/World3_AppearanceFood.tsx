import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  ContextCard,
  HighlightSou,
  MotionArrow,
  NarrationSub,
  Win,
  pp,
  ps,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World3_AppearanceFood: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 17.0s (relatif terhadap start 29.5s)
  // Subtitle timeline:
  // S13: 0.0 - 2.3s (Nah, sekarang masuk ke yang biasanya bikin orang bingung)
  // S14: 2.3 - 4.7s (おいしそう: Kelihatannya enak)
  // S15: 4.7 - 7.1s (Kamu lihat makanan. Kamu belum makan)
  // S16: 7.1 - 9.5s (Dari penampilannya, kamu mendapat kesan)
  // S17: 9.5 - 12.0s (Makanya kalau diterjemahkan: Kelihatannya enak)
  // S18: 12.0 - 14.5s (Sama juga: 雨が降りそう)
  // S19: 14.5 - 17.0s (Dari situ kamu merasa: tanda mengarah ke hujan)

  // S13 - S14: Piring Makanan masuk
  const ramenPop = pp(T, 0.4, BOUNCY);
  const textOishiPop = pp(T, 2.5, BOUNCY);

  // S15: Garis pandang mata ke makanan
  const eyeLine = ps(T, 4.9, 5.8);

  // S16: Flow partikel cahaya dari makanan ke pikiran
  const lightStream = ps(T, 7.3, 8.5);

  // S17: Garis bawah emas terjemahan
  const underlineW = ps(T, 9.8, 10.8);

  // S18 - S19: Cuaca Mendung (雨が降りそう)
  const cloudPop = pp(T, 12.2, BOUNCY);
  const rainTextPop = pp(T, 12.6, BOUNCY);
  const tag1Pop = pp(T, 14.7, BOUNCY);
  const tag2Pop = pp(T, 15.5, BOUNCY);
  const rainArrow = ps(T, 15.8, 16.6);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* S13 - S17: Contoh Makanan: おいしそう (0.0s - 12.0s) */}
      <Win T={T} a={0} b={12.0}>
        {/* Header Kategori */}
        <At y={240}>
          <div
            style={{
              padding: '6px 22px',
              borderRadius: 999,
              background: 'rgba(240, 190, 82, 0.15)',
              border: `1.5px solid ${C.gold}`,
              color: C.goldSoft,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            KASUS 2: KESAN DARI TAMPILAN FISIK
          </div>
        </At>

        {/* Teks Jepang Besar: おいしそう (S14 - S17) */}
        {T >= 2.2 && (
          <At y={380}>
            <div
              style={{
                background: '#1d2332',
                border: `2px solid ${C.borderPrimary}`,
                borderRadius: 24,
                padding: '16px 40px',
                textAlign: 'center',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                transform: `scale(${textOishiPop})`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 70,
                  fontWeight: 900,
                  color: '#ffffff',
                }}
              >
                おいし<HighlightSou />。
              </div>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 28,
                  fontWeight: 800,
                  color: C.goldSoft,
                  marginTop: 6,
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                “Kelihatannya enak”
                {/* S17: Garis bawah dinamis */}
                {T >= 9.5 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: -4,
                      height: 4,
                      width: `${underlineW * 100}%`,
                      background: C.gold,
                      borderRadius: 2,
                      boxShadow: `0 0 12px ${C.gold}`,
                    }}
                  />
                )}
              </div>
            </div>
          </At>
        )}

        {/* Piring Makanan Ilustrasi + Efek Asap Hangat */}
        <At y={T >= 2.2 ? 680 : 540}>
          <div
            style={{
              transform: `scale(${ramenPop})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Visual Ramen / Piring Makanan Bergaya Kartun */}
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #f9a825 0%, #d84315 70%, #3e2723 100%)',
                border: '8px solid #efebe9',
                boxShadow: '0 18px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 90,
                position: 'relative',
              }}
            >
              🍜
              {/* Efek Garpu / Sendok di Samping */}
              <div
                style={{
                  position: 'absolute',
                  right: -50,
                  top: 20,
                  fontSize: 50,
                  transform: 'rotate(25deg)',
                }}
              >
                🥢
              </div>
            </div>

            {/* S15: Badge "Belum Dicicipi" */}
            {T >= 4.7 && (
              <div
                style={{
                  marginTop: 14,
                  padding: '6px 18px',
                  borderRadius: 999,
                  background: 'rgba(226, 85, 91, 0.2)',
                  border: '1.5px solid #e2555b',
                  color: '#ff6b72',
                  fontFamily: FONT.display,
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: 1,
                  boxShadow: '0 0 16px rgba(226,85,91,0.4)',
                }}
              >
                ✕ BELUM DICICIPI (Belum Dimakan)
              </div>
            )}
          </div>
        </At>

        {/* Karakter Avatar Melihat Makanan */}
        <At y={1080}>
          <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <Avatar
              gender="female"
              expression={T >= 7.0 ? 'excited' : 'happy'}
              height={220}
              bubble={T >= 7.0 ? 'idea' : undefined}
            />

            {/* Balon Pikiran Karakter */}
            <div
              style={{
                background: '#1e2636',
                border: `2px solid ${C.indigo}`,
                borderRadius: 24,
                padding: '16px 26px',
                maxWidth: 340,
                boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{fontSize: 16, color: C.indigoSoft, fontWeight: 700}}>
                Kesan dari Tampilan:
              </div>
              <div style={{fontSize: 24, color: '#ffffff', fontWeight: 800, marginTop: 4}}>
                “Tampilannya menggiurkan... kayaknya enak!”
              </div>
            </div>
          </div>
        </At>

        {/* S15: Garis Pandang Mata (Eye Line) */}
        {T >= 4.7 && T < 7.1 && eyeLine > 0 && (
          <svg
            width={1080}
            height={1920}
            style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
          >
            <path
              d="M 460 1000 Q 500 860 540 760"
              stroke="#6f93cf"
              strokeWidth={4}
              strokeDasharray="6 6"
              fill="none"
              pathLength={1}
              strokeDashoffset={1 - eyeLine}
            />
          </svg>
        )}

        {/* S16: Garis Alur Cahaya Menuju Pikiran */}
        {T >= 7.1 && lightStream > 0 && (
          <svg
            width={1080}
            height={1920}
            style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
          >
            <path
              d="M 540 780 Q 560 920 620 1020"
              stroke={C.gold}
              strokeWidth={5}
              fill="none"
              pathLength={1}
              strokeDashoffset={1 - lightStream}
            />
          </svg>
        )}
      </Win>

      {/* S18 - S19: Langit Mendung: 雨が降りそう (12.0s - 17.0s) */}
      <Win T={T} a={12.0} b={17.0}>
        {/* Header Cuaca */}
        <At y={240}>
          <div
            style={{
              padding: '6px 22px',
              borderRadius: 999,
              background: `${C.indigo}22`,
              border: `1.5px solid ${C.indigo}`,
              color: C.indigoSoft,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            CONTOH KEDUA: KESAN DARI TANDA ALAM
          </div>
        </At>

        {/* Teks Jepang: 雨が降りそう */}
        <At y={380}>
          <div
            style={{
              background: '#1d2332',
              border: `2px solid ${C.borderPrimary}`,
              borderRadius: 24,
              padding: '16px 40px',
              textAlign: 'center',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
              transform: `scale(${rainTextPop})`,
            }}
          >
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 66,
                fontWeight: 900,
                color: '#ffffff',
              }}
            >
              雨が降り<HighlightSou />。
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 26,
                fontWeight: 800,
                color: C.goldSoft,
                marginTop: 6,
              }}
            >
              “Kayaknya bakal hujan.” (Hujan belum turun!)
            </div>
          </div>
        </At>

        {/* Visual Awan Mendung & Langit Gelap */}
        <At y={620}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              transform: `scale(${cloudPop})`,
            }}
          >
            <div
              style={{
                fontSize: 100,
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.8))',
              }}
            >
              ☁️
            </div>
            <div
              style={{
                fontSize: 120,
                filter: 'drop-shadow(0 18px 36px rgba(0,0,0,0.9))',
              }}
            >
              ⛈️
            </div>
          </div>
        </At>

        {/* S19: Dua Tanda Tersorot */}
        <At y={860}>
          <div style={{display: 'flex', gap: 24}}>
            <ContextCard
              w={300}
              title="Langit Gelap"
              subtitle="Tanda visual 1"
              icon="🌑"
              active={tag1Pop > 0.5}
              scale={tag1Pop}
            />
            <ContextCard
              w={300}
              title="Awan Tebal"
              subtitle="Tanda visual 2"
              icon="☁️"
              active={tag2Pop > 0.5}
              scale={tag2Pop}
            />
          </div>
        </At>

        {/* S19: Panah ke Perkiraan Hujan */}
        {T >= 15.5 && (
          <>
            <MotionArrow
              x1={540}
              y1={960}
              x2={540}
              y2={1100}
              p={rainArrow}
              color={C.gold}
              w={6}
              label="Kesan: bakal turun hujan"
            />
            <At y={1220}>
              <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                <Avatar gender="male" expression="awkward" height={190} bubble="sweat" />
                <div
                  style={{
                    background: '#1d273a',
                    border: `1.5px solid ${C.indigo}`,
                    borderRadius: 20,
                    padding: '14px 22px',
                    color: '#edf0f6',
                    fontFamily: FONT.display,
                    fontWeight: 700,
                    fontSize: 22,
                    maxWidth: 340,
                  }}
                >
                  “Melihat tanda-tanda ini, kesannya sebentar lagi hujan.”
                </div>
              </div>
            </At>
          </>
        )}
      </Win>

      {/* Subtitle Narasi */}
      <NarrationSub t={T} at={0.0} until={2.3}>
        “Nah, sekarang masuk ke yang biasanya bikin orang bingung…”
      </NarrationSub>
      <NarrationSub t={T} at={2.3} until={4.7}>
        “<span style={{color: C.gold}}>おいしそう</span>。… ‘Kelihatannya enak.’”
      </NarrationSub>
      <NarrationSub t={T} at={4.7} until={7.1}>
        “Kamu lihat makanan. Kamu belum makan.”
      </NarrationSub>
      <NarrationSub t={T} at={7.1} until={9.5}>
        “Dari penampilannya, kamu mendapat kesan: enak.”
      </NarrationSub>
      <NarrationSub t={T} at={9.5} until={12.0}>
        “Makanya kalau diterjemahkan secara natural: ‘Kelihatannya enak.’”
      </NarrationSub>
      <NarrationSub t={T} at={12.0} until={14.5}>
        “Sama juga: <span style={{color: C.gold}}>雨が降りそう</span> (Kayaknya bakal hujan).”
      </NarrationSub>
      <NarrationSub t={T} at={14.5} until={17.0}>
        “Dari tanda langit gelap dan awan tebal, kamu menangkap kesan akan hujan.”
      </NarrationSub>
    </div>
  );
};
