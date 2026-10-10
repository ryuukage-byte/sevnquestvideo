import React from 'react';
import {useCurrentFrame} from 'remotion';
import {
  At,
  BlockFade,
  CategoryPill,
  CornerAvatar,
  GlassCard,
  JpText,
  NarrationSub,
  Win,
  WorldHeader,
  pp,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const Act5_PolaKalimat: React.FC<{dur: number}> = ({dur}) => {
  const T = useT();
  const f = useCurrentFrame();

  return (
    <BlockFade dur={dur}>
      <WorldHeader num="05" title="Merangkai Pola Kalimat" badge="POLA KALIMAT" />

      {/* CUE 28: 89.97 - 93.06s (Lokal T: 0.0 - 3.5s) | Masuk ke pola kalimat */}
      <Win T={T} a={0.0} b={3.7} dy={30}>
        <At y={710}>
          <GlassCard w={860} border={C.gold} glow={`${C.gold}44`} scale={pp(T, 0.2)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: `${C.gold}25`,
                  border: `2px solid ${C.gold}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.mono,
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.gold,
                }}
              >
                3
              </div>
              <div style={{textAlign: 'left'}}>
                <CategoryPill label="LANGKAH KETIGA" color={C.gold} />
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 40,
                    color: '#ffffff',
                    marginTop: 4,
                  }}
                >
                  MASUK KE POLA KALIMAT
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 22,
                fontFamily: FONT.body,
                fontWeight: 600,
                fontSize: 24,
                color: C.textSecondary,
                lineHeight: 1.45,
                textAlign: 'center',
              }}
            >
              Setelah punya sedikit bekal kosakata, sekarang saatnya belajar bagaimana merangkai kata-kata tersebut menjadi kalimat utuh.
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="Setelah kamu punya sedikit bekal kosakata, baru mulai masuk ke pola kalimat." />
      </Win>

      {/* CUE 29-32: 94.23 - 102.17s (Lokal T: 4.0 - 12.5s) | 3 Bahan Kosakata: 私, 学校, 行く */}
      <Win T={T} a={4.0} b={12.6} dy={30}>
        <At y={710}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22,
              width: 880,
            }}
          >
            <CategoryPill label="3 BAHAN KOSAKATA" color={C.indigo} />

            <div style={{display: 'flex', gap: 18, width: '100%', justifyContent: 'center'}}>
              {[
                {
                  jp: '私',
                  arti: 'saya',
                  color: C.indigo,
                  showT: 4.4,
                  active: T >= 4.4 && T < 6.8,
                },
                {
                  jp: '学校',
                  arti: 'sekolah',
                  color: C.teal,
                  showT: 7.0,
                  active: T >= 7.0 && T < 9.5,
                },
                {
                  jp: '行く',
                  arti: 'pergi',
                  color: C.gold,
                  showT: 9.7,
                  active: T >= 9.7,
                },
              ].map((b) => {
                const s = pp(T, b.showT);
                return (
                  <div
                    key={b.jp}
                    style={{
                      flex: 1,
                      padding: '24px 16px',
                      borderRadius: 22,
                      background: b.active ? '#25354c' : '#18202e',
                      border: `2px solid ${b.active ? b.color : C.indigo}`,
                      boxShadow: b.active ? `0 0 25px ${b.color}55` : 'none',
                      transform: `scale(${s}) translateY(${b.active ? -8 : 0}px)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 10,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <JpText size={48} color={b.active ? '#ffffff' : b.color}>
                      {b.jp}
                    </JpText>
                    <div style={{fontSize: 20, color: C.gold}}>＝</div>
                    <div
                      style={{
                        fontFamily: FONT.display,
                        fontWeight: 800,
                        fontSize: 24,
                        color: b.active ? '#ffffff' : C.textSecondary,
                      }}
                    >
                      {b.arti}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </At>
        {T < 4.4 ? (
          <NarrationSub text="Misalnya kamu sudah tahu:" />
        ) : T < 6.8 ? (
          <NarrationSub text="私 = saya" />
        ) : T < 9.5 ? (
          <NarrationSub text="学校 = sekolah" />
        ) : (
          <NarrationSub text="行く = pergi" />
        )}
      </Win>

      {/* CUE 33-36: 102.89 - 113.39s (Lokal T: 12.8 - 23.8s) | Menggabungkan jadi kalimat utuh */}
      <Win T={T} a={12.8} b={23.8} dy={30}>
        <At y={580}>
          <GlassCard w={920} border={C.gold} glow={`${C.gold}55`} scale={pp(T, 13.0)}>
            <CategoryPill label="KALIMAT TERSUSUN" color={C.gold} />

            {/* Kalimat Utama Jepang */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 24,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {/* 私 */}
              <div style={{padding: '8px 16px', borderRadius: 14, background: '#1c2636', border: `1.5px solid ${C.indigo}`}}>
                <JpText size={44} color="#ffffff">私</JpText>
              </div>
              {/* は */}
              <div style={{padding: '8px 14px', borderRadius: 14, background: `${C.gold}25`, border: `2px solid ${C.gold}`}}>
                <JpText size={44} color={C.gold}>は</JpText>
              </div>
              {/* 学校 */}
              <div style={{padding: '8px 16px', borderRadius: 14, background: '#1c2636', border: `1.5px solid ${C.teal}`}}>
                <JpText size={44} color="#ffffff">学校</JpText>
              </div>
              {/* に */}
              <div style={{padding: '8px 14px', borderRadius: 14, background: `${C.gold}25`, border: `2px solid ${C.gold}`}}>
                <JpText size={44} color={C.gold}>に</JpText>
              </div>
              {/* 行きます */}
              <div style={{padding: '8px 18px', borderRadius: 14, background: '#1c2636', border: `1.5px solid ${C.matcha}`}}>
                <JpText size={44} color="#ffffff">行きます</JpText>
              </div>
            </div>

            {/* Romaji */}
            <div
              style={{
                marginTop: 20,
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 26,
                color: C.goldSoft,
                letterSpacing: 1,
                opacity: T >= 15.0 ? 1 : 0,
                transform: `scale(${T >= 15.0 ? 1 : 0.9})`,
                transition: 'all 0.3s ease',
              }}
            >
              Watashi wa gakkou ni ikimasu.
            </div>

            {/* Terjemahan Bahasa Indonesia */}
            <div
              style={{
                marginTop: 16,
                padding: '12px 28px',
                borderRadius: 16,
                background: '#151c28',
                border: `1.5px solid ${C.thread}`,
                fontFamily: FONT.body,
                fontWeight: 800,
                fontSize: 28,
                color: '#ffffff',
                opacity: T >= 18.0 ? 1 : 0,
                transform: `scale(${T >= 18.0 ? 1 : 0.9})`,
                transition: 'all 0.3s ease',
              }}
            >
              “Saya pergi ke sekolah.”
            </div>
          </GlassCard>
        </At>

        {/* Karakter Pembelajar Senang di Pojok Kanan Bawah (~1/9 Layar) */}
        <CornerAvatar
          gender="male"
          expression="excited"
          height={420}
          position="bottom-right"
          bubbleText="Tersusun rapi!"
          glowColor={C.gold}
          scale={pp(T, 13.5)}
        />
        {T < 15.0 ? (
          <NarrationSub text="Kemudian kamu belajar bagaimana menggabungkannya: 私は学校に行きます。" />
        ) : T < 18.0 ? (
          <NarrationSub text="Watashi wa gakkou ni ikimasu." />
        ) : (
          <NarrationSub text="“Saya pergi ke sekolah.”" />
        )}
      </Win>

      {/* CUE 37: 114.04 - 118.94s (Lokal T: 24.0 - 28.97s) | Memahami partikel wa, ni, o, de */}
      <Win T={T} a={24.0} b={28.97} dy={30}>
        <At y={710}>
          <GlassCard w={880} border={C.indigo} glow={`${C.indigo}55`} scale={pp(T, 24.2)}>
            <CategoryPill label="ORBIT PARTIKEL & POLA" color={C.indigoSoft} />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 34,
                color: '#ffffff',
                textAlign: 'center',
                marginTop: 16,
              }}
            >
              Dari Sini Baru Kamu Pahami Fungsinya:
            </div>

            <div style={{display: 'flex', gap: 16, marginTop: 20, justifyContent: 'center'}}>
              {[
                {p: 'は', label: 'Topik Kalimat'},
                {p: 'に', label: 'Tujuan / Waktu'},
                {p: 'を', label: 'Objek Tindakan'},
                {p: 'で', label: 'Tempat / Alat'},
              ].map((item, i) => (
                <div
                  key={item.p}
                  style={{
                    padding: '16px 14px',
                    borderRadius: 18,
                    background: '#1b2434',
                    border: `1.5px solid ${C.gold}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    transform: `translateY(${Math.sin(f / 8 + i) * 4}px)`,
                  }}
                >
                  <JpText size={38} color={C.gold}>
                    {item.p}
                  </JpText>
                  <div style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 13, color: C.textSecondary}}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 18,
                fontFamily: FONT.body,
                fontWeight: 600,
                fontSize: 18,
                color: C.goldSoft,
                textAlign: 'center',
              }}
            >
              Plus perubahan bentuk kata kerja (〜ます, 〜て) dan pola lainnya!
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="Dari sini baru kamu mulai memahami fungsi は, に, を, で, perubahan kata kerja, dan pola-pola lainnya." />
      </Win>
    </BlockFade>
  );
};
