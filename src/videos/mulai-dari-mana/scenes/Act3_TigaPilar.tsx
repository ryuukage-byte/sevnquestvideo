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

export const Act3_TigaPilar: React.FC<{dur: number}> = ({dur}) => {
  const T = useT();
  const f = useCurrentFrame();

  return (
    <BlockFade dur={dur}>
      <WorldHeader num="03" title="Tiga Pilar Utama" badge="PONDASI 1-2-3" />

      {/* CUE 12 & 13: 41.83 - 48.17s (Lokal T: 0.0 - 6.5s) | 3 Hal Utama yang Perlu Dibangun */}
      <Win T={T} a={0.0} b={6.6} dy={30}>
        <At y={580}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              width: 900,
            }}
          >
            <CategoryPill label="BLUEPRINT FONDASI" color={C.gold} />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 38,
                color: '#ffffff',
                textAlign: 'center',
              }}
            >
              3 Hal Utama yang Perlu Kamu Bangun:
            </div>

            {/* 3 Pillars */}
            <div
              style={{
                display: 'flex',
                gap: 20,
                width: '100%',
                justifyContent: 'center',
                marginTop: 8,
              }}
            >
              {[
                {num: '1', title: 'HURUF', jp: '文字', desc: 'Hiragana & Katakana', color: C.matcha, delay: 0.3},
                {num: '2', title: 'KOSAKATA', jp: '単語', desc: 'Kata Kerja & Benda', color: C.indigo, delay: 0.6},
                {num: '3', title: 'POLA KALIMAT', jp: '文法', desc: 'Partikel & Struktur', color: C.gold, delay: 0.9},
              ].map((p, i) => {
                const s = pp(T, p.delay);
                return (
                  <div
                    key={p.num}
                    style={{
                      flex: 1,
                      padding: '28px 18px',
                      borderRadius: 24,
                      background: '#19202e',
                      border: `2px solid ${p.color}`,
                      boxShadow: `0 12px 30px rgba(0,0,0,0.5), 0 0 20px ${p.color}33`,
                      transform: `scale(${s}) translateY(${Math.sin(f / 10 + i) * 4}px)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        background: `${p.color}25`,
                        border: `1.5px solid ${p.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: FONT.mono,
                        fontWeight: 900,
                        fontSize: 22,
                        color: p.color,
                      }}
                    >
                      {p.num}
                    </div>
                    <JpText size={42} color={p.color}>
                      {p.jp}
                    </JpText>
                    <div style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 22, color: '#ffffff'}}>
                      {p.title}
                    </div>
                    <div style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 14, color: C.textSecondary}}>
                      {p.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </At>
        <CornerAvatar
          gender="male"
          expression="confident"
          height={420}
          position="bottom-right"
          glowColor={C.gold}
          scale={pp(T, 1.2)}
        />
        {T < 3.8 ? (
          <NarrationSub text="Secara sederhana, ada 3 hal utama yang perlu kamu bangun:" />
        ) : (
          <NarrationSub text="Huruf, kosakata, dan pola kalimat." />
        )}
      </Win>

      {/* CUE 14 & 15: 49.02 - 54.60s (Lokal T: 6.8 - 13.0s) | Pertama, huruf: Hiragana & Katakana */}
      <Win T={T} a={6.8} b={13.0} dy={30}>
        <At y={580}>
          <GlassCard w={860} border={C.matcha} glow={`${C.matcha}44`} scale={pp(T, 7.0)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 18}}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: `${C.matcha}25`,
                  border: `2px solid ${C.matcha}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.mono,
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.matcha,
                }}
              >
                1
              </div>
              <div style={{textAlign: 'left'}}>
                <CategoryPill label="LANGKAH PERTAMA" color={C.matcha} />
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 40,
                    color: '#ffffff',
                    marginTop: 4,
                  }}
                >
                  KUASAI HURUF DULU
                </div>
              </div>
            </div>

            <div style={{display: 'flex', gap: 24, width: '100%', marginTop: 8}}>
              <div
                style={{
                  flex: 1,
                  padding: '22px 18px',
                  borderRadius: 20,
                  background: '#152220',
                  border: `1.5px solid ${C.matcha}`,
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 24, color: C.matcha, marginBottom: 8}}>
                  HIRAGANA
                </div>
                <div style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 34, color: '#ffffff', letterSpacing: 6}}>
                  あいうえお
                </div>
                <div style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 15, color: C.textSecondary, marginTop: 10}}>
                  Untuk kata asli Jepang & partikel
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: '22px 18px',
                  borderRadius: 20,
                  background: '#152220',
                  border: `1.5px solid ${C.matcha}`,
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 24, color: C.matcha, marginBottom: 8}}>
                  KATAKANA
                </div>
                <div style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 34, color: '#ffffff', letterSpacing: 6}}>
                  アイウエオ
                </div>
                <div style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 15, color: C.textSecondary, marginTop: 10}}>
                  Untuk kata serapan asing
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 20,
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 20,
                color: C.goldSoft,
                textAlign: 'center',
              }}
            >
              💡 Target: Sampai lancar membaca tanpa mengeja satu per satu!
            </div>
          </GlassCard>
        </At>
        <CornerAvatar
          gender="male"
          expression="happy"
          height={420}
          position="bottom-right"
          glowColor={C.matcha}
          scale={pp(T, 7.2)}
        />
        {T < 9.0 ? (
          <NarrationSub text="Pertama, huruf." />
        ) : (
          <NarrationSub text="Mulai dari hiragana dan katakana dulu sampai kamu terbiasa membaca." />
        )}
      </Win>

      {/* CUE 16: 55.24 - 57.07s (Lokal T: 13.2 - 15.24s) | Setelah itu bangun kosakata */}
      <Win T={T} a={13.1} b={15.24} dy={30}>
        <At y={580}>
          <GlassCard w={860} border={C.indigo} glow={`${C.indigo}55`} scale={pp(T, 13.3)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: `${C.indigo}25`,
                  border: `2px solid ${C.indigo}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.mono,
                  fontWeight: 900,
                  fontSize: 26,
                  color: C.indigo,
                }}
              >
                2
              </div>
              <div style={{textAlign: 'left'}}>
                <CategoryPill label="LANGKAH KEDUA" color={C.indigo} />
                <div
                  style={{
                    fontFamily: FONT.display,
                    fontWeight: 900,
                    fontSize: 40,
                    color: '#ffffff',
                    marginTop: 4,
                  }}
                >
                  MULAI BANGUN KOSAKATA
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                fontFamily: FONT.body,
                fontWeight: 600,
                fontSize: 24,
                color: C.textSecondary,
                lineHeight: 1.4,
                textAlign: 'center',
              }}
            >
              Kumpulkan perbendaharaan kata dasar sehari-hari yang sering kamu dengar dan gunakan.
            </div>
          </GlassCard>
        </At>
        <CornerAvatar
          gender="male"
          expression="happy"
          height={420}
          position="bottom-right"
          glowColor={C.indigo}
          scale={pp(T, 13.4)}
        />
        <NarrationSub text="Setelah itu, mulai bangun kosakata." />
      </Win>
    </BlockFade>
  );
};
