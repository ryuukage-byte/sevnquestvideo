import React from 'react';
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

export const Act4_KosakataKanji: React.FC<{dur: number}> = ({dur}) => {
  const T = useT();

  return (
    <BlockFade dur={dur}>
      <WorldHeader num="04" title="Kosakata & Akar Kanji" badge="KOSAKATA & KANJI" />

      {/* CUE 17-20: 57.07 - 68.0s (Lokal T: 0.0 - 11.0s) | Contoh 3 Kosakata Nyata */}
      <Win T={T} a={0.0} b={11.2} dy={30}>
        <At y={710}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              width: 900,
            }}
          >
            <CategoryPill label="CONTOH KATA DASAR" color={C.gold} />

            <div style={{display: 'flex', gap: 20, width: '100%', justifyContent: 'center'}}>
              {[
                {
                  kanji: '食べる',
                  furi: 'たべる',
                  arti: 'makan',
                  icon: '🍱',
                  showT: 1.5,
                  active: T >= 1.5 && T < 4.8,
                },
                {
                  kanji: '飲む',
                  furi: 'のむ',
                  arti: 'minum',
                  icon: '🍵',
                  showT: 5.0,
                  active: T >= 5.0 && T < 8.2,
                },
                {
                  kanji: '行く',
                  furi: 'いく',
                  arti: 'pergi',
                  icon: '🚶',
                  showT: 8.4,
                  active: T >= 8.4,
                },
              ].map((item, i) => {
                const s = pp(T, item.showT);
                return (
                  <div
                    key={item.kanji}
                    style={{
                      flex: 1,
                      padding: '24px 16px',
                      borderRadius: 24,
                      background: item.active ? '#253348' : '#18202d',
                      border: `2px solid ${item.active ? C.gold : C.indigo}`,
                      boxShadow: item.active
                        ? `0 12px 30px rgba(0,0,0,0.6), 0 0 25px ${C.gold}55`
                        : '0 8px 20px rgba(0,0,0,0.4)',
                      transform: `scale(${s}) translateY(${item.active ? -10 : 0}px)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 8,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{fontSize: 36, marginBottom: 4}}>{item.icon}</div>
                    {/* Furigana */}
                    <div
                      style={{
                        fontFamily: FONT.jp,
                        fontWeight: 700,
                        fontSize: 18,
                        color: C.gold,
                        letterSpacing: 2,
                      }}
                    >
                      {item.furi}
                    </div>
                    {/* Kanji */}
                    <JpText size={46} color={item.active ? '#ffffff' : C.text}>
                      {item.kanji}
                    </JpText>
                    {/* Arti */}
                    <div
                      style={{
                        fontFamily: FONT.display,
                        fontWeight: 800,
                        fontSize: 22,
                        color: item.active ? C.goldSoft : C.textSecondary,
                        marginTop: 4,
                      }}
                    >
                      {item.arti}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </At>
        {T < 1.7 ? (
          <NarrationSub text="Misalnya:" />
        ) : T < 5.3 ? (
          <NarrationSub text="食べる — たべる — makan" />
        ) : T < 8.6 ? (
          <NarrationSub text="飲む — のむ — minum" />
        ) : (
          <NarrationSub text="行く — いく — pergi" />
        )}
      </Win>

      {/* CUE 21: 68.74 - 72.35s (Lokal T: 11.4 - 15.6s) | Sambil kosakata bertambah, mulai kenal kanji */}
      <Win T={T} a={11.4} b={15.7} dy={30}>
        <At y={710}>
          <GlassCard w={860} border={C.gold} glow={`${C.gold}44`} scale={pp(T, 11.6)}>
            <CategoryPill label="TRANSISI ALAMI" color={C.gold} />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 40,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.3,
                marginTop: 18,
              }}
            >
              Sambil Kosakata Bertambah,
              <br />
              <span style={{color: C.gold}}>Kamu Bisa Mulai Mengenal Kanji!</span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginTop: 24,
                justifyContent: 'center',
              }}
            >
              {['食', '飲', '行'].map((k) => (
                <div
                  key={k}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 24,
                    background: '#222d40',
                    border: `2px solid ${C.gold}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 25px ${C.gold}33`,
                  }}
                >
                  <JpText size={52} color={C.gold}>
                    {k}
                  </JpText>
                </div>
              ))}
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="Nah, sambil kosakata kamu bertambah, kamu bisa mulai mengenal kanji." />
      </Win>

      {/* CUE 22-25: 72.98 - 80.35s (Lokal T: 15.9 - 23.5s) | Bedah Akar Kanji: 食べる->食, 飲む->飲, 行く->行 */}
      <Win T={T} a={15.9} b={23.5} dy={30}>
        <At y={710}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              width: 880,
            }}
          >
            <CategoryPill label="AKAR KANJI DI DALAM KATA" color={C.gold} />

            <div style={{display: 'flex', flexDirection: 'column', gap: 16, width: '100%'}}>
              {[
                {
                  word: '食べる',
                  kanji: '食',
                  makna: 'Konsep Makanan',
                  startT: 16.5,
                  active: T >= 16.5 && T < 19.3,
                },
                {
                  word: '飲む',
                  kanji: '飲',
                  makna: 'Konsep Minuman',
                  startT: 19.5,
                  active: T >= 19.5 && T < 21.6,
                },
                {
                  word: '行く',
                  kanji: '行',
                  makna: 'Konsep Perjalanan / Gerak',
                  startT: 21.7,
                  active: T >= 21.7,
                },
              ].map((row) => (
                <div
                  key={row.word}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 28px',
                    borderRadius: 20,
                    background: row.active ? '#25344a' : '#18202d',
                    border: `2px solid ${row.active ? C.gold : C.indigo}`,
                    boxShadow: row.active ? `0 0 25px ${C.gold}44` : 'none',
                    transform: `scale(${row.active ? 1.03 : 1})`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                    <JpText size={36} color={C.text}>
                      {row.word}
                    </JpText>
                    <span style={{fontSize: 26, color: C.gold}}>➔</span>
                    <div
                      style={{
                        padding: '4px 18px',
                        borderRadius: 14,
                        background: `${C.gold}25`,
                        border: `1.5px solid ${C.gold}`,
                      }}
                    >
                      <JpText size={40} color={C.gold}>
                        {row.kanji}
                      </JpText>
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontWeight: 700,
                      fontSize: 20,
                      color: row.active ? '#ffffff' : C.textSecondary,
                    }}
                  >
                    {row.makna}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </At>
        {T < 16.8 ? (
          <NarrationSub text="Misalnya:" />
        ) : T < 19.6 ? (
          <NarrationSub text="食べる → 食" />
        ) : T < 21.7 ? (
          <NarrationSub text="飲む → 飲" />
        ) : (
          <NarrationSub text="行く → 行" />
        )}
      </Win>

      {/* CUE 26 & 27: 80.90 - 89.97s (Lokal T: 23.7 - 32.9s) | Jangan lihat kanji hanya sebagai gambar */}
      <Win T={T} a={23.7} b={32.9} dy={30}>
        <At y={580}>
          <GlassCard w={880} border={C.matcha} glow={`${C.matcha}44`} scale={pp(T, 24.0)}>
            {T < 28.0 ? (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                <CategoryPill label="MINDSET KANJI" color={C.hanko} bg={`${C.hanko}25`} />
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 38,
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  Jangan Lihat Kanji Hanya Sebagai
                  <br />
                  <span style={{color: C.hanko}}>“Gambar Mati yang Harus Dihafal”</span>
                </div>
                <div style={{fontSize: 60}}>❌ 🖼️</div>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                <CategoryPill label="STRATEGI TERBAIK" color={C.matcha} />
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 38,
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  Pelajari Kanji <span style={{color: C.gold}}>Bersama Kata</span>
                  <br />
                  yang Menggunakannya!
                </div>
                <div
                  style={{
                    padding: '16px 28px',
                    borderRadius: 18,
                    background: '#16221c',
                    border: `1.5px solid ${C.matcha}`,
                    fontFamily: FONT.body,
                    fontWeight: 700,
                    fontSize: 22,
                    color: C.matcha,
                    textAlign: 'center',
                  }}
                >
                  🌿 Kanji + Kata Utuh = Ingatan Menempel Lebih Kuat & Alami
                </div>
              </div>
            )}
          </GlassCard>
        </At>

        {/* Karakter di Pojok Kanan Bawah (~1/9 Layar) */}
        {T < 28.0 ? (
          <CornerAvatar
            gender="male"
            expression="confused"
            height={440}
            position="bottom-right"
            bubbleText="Bentuknya rumit..."
            glowColor={C.hanko}
            scale={pp(T, 24.2)}
          />
        ) : (
          <CornerAvatar
            gender="male"
            expression="satisfied"
            height={440}
            position="bottom-right"
            bubbleText="Jauh lebih paham!"
            glowColor={C.matcha}
            scale={pp(T, 28.2)}
          />
        )}
        {T < 28.0 ? (
          <NarrationSub text="Jadi jangan melihat kanji hanya sebagai gambar yang harus dihafal." />
        ) : (
          <NarrationSub text="Lebih bagus kalau kamu belajar kanji bersama kata yang menggunakannya." />
        )}
      </Win>
    </BlockFade>
  );
};
