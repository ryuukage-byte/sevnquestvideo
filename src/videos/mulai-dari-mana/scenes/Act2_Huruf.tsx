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

export const Act2_Huruf: React.FC<{dur: number}> = ({dur}) => {
  const T = useT();
  const f = useCurrentFrame();

  return (
    <BlockFade dur={dur}>
      <WorldHeader num="02" title="Titik Beda: Sistem Huruf" badge="PERBEDAAN" />

      {/* CUE 08: 23.25 - 27.01s (Lokal T: 0.0 - 3.8s) | Ada satu hal yang langsung beda */}
      <Win T={T} a={0.0} b={4.1} dy={25}>
        <At y={720}>
          <div
            style={{
              transform: `scale(${pp(T, 0.2)})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <CategoryPill label="PERBEDAAN MENCOLOK" color={C.indigoSoft} />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 46,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              Kalau Bahasa Jepang,
              <br />
              ada satu hal yang langsung
              <br />
              <span style={{color: C.gold}}>kelihatan berbeda:</span>
            </div>
          </div>
        </At>
        <NarrationSub text="Nah, kalau bahasa Jepang, ada satu hal yang langsung kelihatan berbeda:" />
      </Win>

      {/* CUE 09: 27.69 - 28.22s (Lokal T: 4.4 - 5.5s) | HURUFNYA. */}
      <Win T={T} a={4.2} b={5.5} dy={0}>
        <At y={700}>
          <div
            style={{
              transform: `scale(${pp(T, 4.4, {damping: 10, mass: 0.8, stiffness: 220})})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 90,
                color: C.gold,
                letterSpacing: 4,
                textTransform: 'uppercase',
                textShadow: `0 0 50px ${C.gold}88, 0 10px 30px rgba(0,0,0,0.9)`,
              }}
            >
              HURUFNYA!
            </div>
            <div
              style={{
                display: 'flex',
                gap: 18,
                marginTop: 8,
              }}
            >
              {['あ', 'ア', '漢'].map((char, i) => (
                <div
                  key={char}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 24,
                    background: '#1d2536',
                    border: `2px solid ${C.gold}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 20px ${C.gold}44`,
                    transform: `translateY(${Math.sin(f / 8 + i) * 6}px)`,
                  }}
                >
                  <JpText size={48} color={C.gold}>
                    {char}
                  </JpText>
                </div>
              ))}
            </div>
          </div>
        </At>
        <NarrationSub text="hurufnya." />
      </Win>

      {/* CUE 10: 28.95 - 35.40s (Lokal T: 5.7 - 12.8s) | Alfabet vs Hiragana Katakana Kanji */}
      <Win T={T} a={5.6} b={12.9} dy={30}>
        <At y={720}>
          <GlassCard w={880} border={C.indigo} scale={pp(T, 5.8)}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 20,
              }}
            >
              {/* Kolom Kiri: Alfabet Kita */}
              <div
                style={{
                  width: '36%',
                  padding: '20px 16px',
                  borderRadius: 24,
                  background: '#141822',
                  border: `1.5px solid ${C.indigo}66`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 18, color: C.textSecondary}}>
                  KITA TERBIASA
                </div>
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 42,
                    color: '#ffffff',
                    letterSpacing: 4,
                  }}
                >
                  A B C
                </div>
                <div style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 15, color: C.textMuted}}>
                  1 Sistem Alfabet
                </div>
              </div>

              {/* Kolom Kanan: 3 Sistem Jepang */}
              <div
                style={{
                  width: '58%',
                  padding: '20px',
                  borderRadius: 24,
                  background: '#1c2436',
                  border: `2px solid ${C.gold}`,
                  boxShadow: `0 0 25px ${C.gold}22`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 800,
                    fontSize: 18,
                    color: C.gold,
                    textAlign: 'center',
                  }}
                >
                  BAHASA JEPANG PUNYA 3:
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                  <div style={{textAlign: 'center'}}>
                    <div
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: 18,
                        background: '#242f44',
                        border: `1.5px solid ${C.indigo}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <JpText size={38} color="#ffffff">
                        あ
                      </JpText>
                    </div>
                    <div style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 15, color: C.text, marginTop: 6}}>
                      Hiragana
                    </div>
                  </div>

                  <div style={{textAlign: 'center'}}>
                    <div
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: 18,
                        background: '#242f44',
                        border: `1.5px solid ${C.matcha}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <JpText size={38} color={C.matcha}>
                        ア
                      </JpText>
                    </div>
                    <div style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 15, color: C.matcha, marginTop: 6}}>
                      Katakana
                    </div>
                  </div>

                  <div style={{textAlign: 'center'}}>
                    <div
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: 18,
                        background: '#242f44',
                        border: `1.5px solid ${C.gold}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <JpText size={38} color={C.gold}>
                        漢
                      </JpText>
                    </div>
                    <div style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 15, color: C.gold, marginTop: 6}}>
                      Kanji
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="Kita terbiasa dengan alfabet A, B, C, sedangkan bahasa Jepang punya hiragana, katakana, dan kanji." />
      </Win>

      {/* CUE 11: 36.32 - 41.12s (Lokal T: 13.0 - 18.58s) | Jangan langsung loncat ke grammar rumit */}
      <Win T={T} a={13.0} b={18.58} dy={30}>
        <At y={580}>
          <GlassCard w={880} border={C.hanko} glow={`${C.hanko}55`} scale={pp(T, 13.3)}>
            <div style={{textAlign: 'center', marginBottom: 16}}>
              <CategoryPill label="PERINGATAN PENTING" color={C.hanko} bg={`${C.hanko}25`} />
              <div
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 900,
                  fontSize: 40,
                  color: '#ffffff',
                  marginTop: 10,
                }}
              >
                JANGAN LANGSUNG LONCAT!
              </div>
            </div>

            <div
              style={{
                width: '100%',
                padding: '24px 28px',
                borderRadius: 22,
                background: '#20161a',
                border: `2px solid ${C.hanko}`,
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 28,
                color: '#ffc5c8',
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              ❌ Jangan paksakan langsung menghafal rumus grammar rumit sebelum menguasai pondasi huruf & kosakata dasarnya.
            </div>
          </GlassCard>
        </At>

        {/* Karakter Crying Besar di Pojok Kanan Bawah (~1/9 Layar) */}
        <CornerAvatar
          gender="male"
          expression="crying"
          height={450}
          position="bottom-right"
          bubbleText="Pusing banget..."
          glowColor={C.hanko}
          scale={pp(T, 13.5)}
        />
        <NarrationSub text="Jadi kalau kamu benar-benar mulai dari nol, jangan langsung loncat ke grammar yang rumit." />
      </Win>
    </BlockFade>
  );
};
