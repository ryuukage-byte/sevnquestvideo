import React from 'react';
import {useCurrentFrame} from 'remotion';
import {
  At,
  Avatar,
  BlockFade,
  CategoryPill,
  CornerAvatar,
  GlassCard,
  NarrationSub,
  Win,
  WorldHeader,
  pp,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const Act7_Cta: React.FC<{dur: number}> = ({dur}) => {
  const T = useT();
  const f = useCurrentFrame();

  return (
    <BlockFade dur={dur}>
      <WorldHeader num="07" title="Filosofi & CTA SevnQuest" badge="TUJUAN NYATA" />

      {/* CUE 45-48: 142.23 - 152.0s (Lokal T: 0.0 - 9.8s) | Bukan cuma hafal, tapi bisa menggunakan */}
      <Win T={T} a={0.0} b={9.8} dy={30}>
        <At y={580}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22,
              width: 900,
            }}
          >
            <CategoryPill label="TUJUAN SEJATI BELAJAR BAHASA" color={C.gold} />

            <div style={{display: 'flex', gap: 20, width: '100%', justifyContent: 'center', marginTop: 6}}>
              {/* Sisi Kiri: Sekadar Hafal */}
              <div
                style={{
                  flex: 1,
                  padding: '24px 18px',
                  borderRadius: 22,
                  background: '#191b24',
                  border: `1.5px solid ${C.hanko}66`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 12,
                  opacity: T >= 2.8 ? 0.6 : 0.9,
                }}
              >
                <div style={{fontSize: 40}}>🤖</div>
                <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 16, color: C.hanko}}>
                  BUKAN CUMA:
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 800,
                    fontSize: 26,
                    color: '#ffffff',
                    lineHeight: 1.25,
                  }}
                >
                  “Aku Hafal
                  <br />
                  Bahasa Jepang”
                </div>
              </div>

              {/* Sisi Kanan: Bisa Menggunakan */}
              <div
                style={{
                  flex: 1,
                  padding: '24px 18px',
                  borderRadius: 22,
                  background: '#222d40',
                  border: `2px solid ${C.gold}`,
                  boxShadow: `0 0 30px ${C.gold}44`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 12,
                  transform: `scale(${T >= 5.5 ? 1.05 : 1})`,
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{fontSize: 40}}>🗣️✨</div>
                <div style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 16, color: C.gold}}>
                  MELAINKAN:
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 28,
                    color: C.goldSoft,
                    lineHeight: 1.25,
                  }}
                >
                  “Aku BISA
                  <br />
                  MENGGUNAKAN!”
                </div>
              </div>
            </div>
          </div>
        </At>
        <CornerAvatar
          gender="male"
          expression="happy"
          height={440}
          position="bottom-right"
          bubbleText="Bisa ngomong!"
          glowColor={C.gold}
          scale={pp(T, 5.5)}
        />
        {T < 2.8 ? (
          <NarrationSub text="Karena tujuan belajar bahasa bukan cuma:" />
        ) : T < 5.0 ? (
          <NarrationSub text="“Aku hafal bahasa Jepang.”" />
        ) : T < 7.2 ? (
          <NarrationSub text="Tapi:" />
        ) : (
          <NarrationSub text="“Aku bisa menggunakan bahasa Jepang.”" />
        )}
      </Win>

      {/* CUE 49 & 50: 152.40 - 161.32s (Lokal T: 10.0 - 19.09s) | Ajakan & Logo SevnQuest Megah */}
      <Win T={T} a={10.0} b={19.09} dy={30}>
        <At y={710}>
          <GlassCard w={880} border={C.gold} glow={`${C.gold}66`} scale={pp(T, 10.2)}>
            <div style={{transform: `translateY(${Math.sin(f / 10) * 5}px)`}}>
              <Avatar
                gender="male"
                expression="happy"
                height={340}
                style={{filter: `drop-shadow(0 0 35px ${C.gold}88) drop-shadow(0 18px 35px rgba(0,0,0,0.8))`}}
              />
            </div>

            <div
              style={{
                marginTop: 20,
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 52,
                color: C.gold,
                letterSpacing: 4,
                textTransform: 'uppercase',
                textShadow: `0 0 40px ${C.gold}88, 0 8px 24px rgba(0,0,0,0.9)`,
              }}
            >
              SEVNQUEST
            </div>

            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 24,
                color: '#ffffff',
                marginTop: 8,
                letterSpacing: 1,
              }}
            >
              Mulai Dari Dasar, Paham Sampai Bisa.
            </div>

            <div
              style={{
                marginTop: 24,
                padding: '14px 36px',
                borderRadius: 999,
                background: `linear-gradient(135deg, ${C.gold}, #c99320)`,
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 24,
                color: '#12151d',
                letterSpacing: 1.5,
                boxShadow: `0 8px 25px ${C.gold}66`,
                transform: `scale(${1 + Math.sin(f / 8) * 0.04})`,
              }}
            >
              COBA SEKARANG
            </div>
          </GlassCard>
        </At>
        {T < 17.4 ? (
          <NarrationSub text="Kalau kamu mau mulai belajar bahasa Jepang dari dasar, tapi masih bingung harus mulai dari mana," />
        ) : (
          <NarrationSub text="coba sekarang di SevnQuest." />
        )}
      </Win>
    </BlockFade>
  );
};
