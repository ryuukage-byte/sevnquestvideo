import React from 'react';
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

export const Act6_Roadmap: React.FC<{dur: number}> = ({dur}) => {
  const T = useT();

  return (
    <BlockFade dur={dur}>
      <WorldHeader num="06" title="Hapus Beban & Roadmap" badge="ROADMAP JELAS" />

      {/* CUE 38-41: 118.94 - 131.16s (Lokal T: 0.0 - 12.5s) | Beban Pikiran & Overthinking */}
      <Win T={T} a={0.0} b={12.6} dy={30}>
        <At y={580}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              width: 880,
            }}
          >
            <CategoryPill label="JEBAKAN OVERTHINKING" color={C.hanko} bg={`${C.hanko}25`} />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 36,
                color: '#ffffff',
                textAlign: 'center',
              }}
            >
              Jangan Langsung Berpikir:
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 14, width: '100%', marginTop: 8}}>
              {[
                {
                  text: '“Aku harus hafal ribuan kosakata.”',
                  icon: '📚',
                  showT: 3.5,
                  active: T >= 3.5,
                },
                {
                  text: '“Aku harus hafal semua grammar N5.”',
                  icon: '📑',
                  showT: 5.8,
                  active: T >= 5.8,
                },
                {
                  text: '“Aku harus hafal banyak kanji.”',
                  icon: '⛩️',
                  showT: 8.9,
                  active: T >= 8.9,
                },
              ].map((row) => (
                <div
                  key={row.text}
                  style={{
                    padding: '18px 24px',
                    borderRadius: 20,
                    background: row.active ? '#241b22' : '#181a24',
                    border: `1.5px solid ${row.active ? C.hanko : 'rgba(255,255,255,0.1)'}`,
                    opacity: row.active ? 1 : 0.4,
                    transform: `scale(${row.active ? 1 : 0.96})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    boxShadow: row.active ? `0 0 20px ${C.hanko}33` : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{fontSize: 32}}>{row.icon}</span>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 26,
                      color: row.active ? '#ffc5c8' : C.textSecondary,
                    }}
                  >
                    {row.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </At>
        <CornerAvatar
          gender="male"
          expression="scared"
          height={450}
          position="bottom-right"
          bubbleText="Banyak banget..."
          glowColor={C.hanko}
          scale={pp(T, 0.4)}
        />
        {T < 3.5 ? (
          <NarrationSub text="Jadi kalau kamu benar-benar baru mulai, jangan langsung berpikir:" />
        ) : T < 5.8 ? (
          <NarrationSub text="“Aku harus hafal ribuan kosakata.”" />
        ) : T < 8.9 ? (
          <NarrationSub text="“Aku harus hafal semua grammar N5.”" />
        ) : (
          <NarrationSub text="“Aku harus hafal banyak kanji.”" />
        )}
      </Win>

      {/* CUE 42: 131.86 - 133.58s (Lokal T: 12.8 - 14.8s) | NGGAK PERLU! */}
      <Win T={T} a={12.8} b={14.8} dy={0}>
        <At y={700}>
          <div
            style={{
              transform: `scale(${pp(T, 12.9, {damping: 10, mass: 0.8, stiffness: 220})})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <Avatar
              gender="male"
              expression="happy"
              height={460}
              style={{filter: `drop-shadow(0 0 35px ${C.gold}88) drop-shadow(0 20px 40px rgba(0,0,0,0.85))`}}
            />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 84,
                color: C.gold,
                textTransform: 'uppercase',
                textShadow: `0 0 50px ${C.gold}88, 0 10px 30px rgba(0,0,0,0.9)`,
                letterSpacing: 2,
              }}
            >
              NGGAK PERLU.
            </div>
          </div>
        </At>
        <NarrationSub text="Nggak perlu." />
      </Win>

      {/* CUE 43 & 44: 134.13 - 142.23s (Lokal T: 15.0 - 23.29s) | Roadmap 5 Langkah Bertahap */}
      <Win T={T} a={15.0} b={23.29} dy={30}>
        <At y={580}>
          <GlassCard w={920} border={C.gold} glow={`${C.gold}44`} scale={pp(T, 15.2)}>
            <CategoryPill label="PONDASI SEDIKIT DEMI SEDIKIT" color={C.gold} />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 34,
                color: '#ffffff',
                textAlign: 'center',
                marginTop: 14,
                marginBottom: 20,
              }}
            >
              Bangun Pondasinya Secara Alami:
            </div>

            {/* 5-Step Chain */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                width: '100%',
              }}
            >
              {[
                {step: '1', title: 'HURUF', desc: 'Hiragana & Katakana', color: C.matcha, delay: 17.0},
                {step: '2', title: 'KOSAKATA', desc: 'Kata dasar sehari-hari', color: C.indigo, delay: 18.0},
                {step: '3', title: 'KANJI', desc: 'Akar konsep bersama kata', color: C.gold, delay: 19.0},
                {step: '4', title: 'POLA KALIMAT', desc: 'Merangkai dengan partikel', color: C.teal, delay: 20.0},
                {step: '5', title: 'PENGGUNAAN', desc: 'Bicara, dengar, & pahami', color: C.gold, delay: 21.0},
              ].map((s, idx) => {
                const lit = T >= s.delay;
                return (
                  <div
                    key={s.step}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 20px',
                      borderRadius: 16,
                      background: lit ? '#222c3d' : '#141822',
                      border: `1.5px solid ${lit ? s.color : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: lit ? `0 0 16px ${s.color}44` : 'none',
                      transform: `scale(${lit ? 1.02 : 1})`,
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          background: lit ? `${s.color}33` : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${lit ? s.color : 'transparent'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: FONT.mono,
                          fontWeight: 800,
                          fontSize: 16,
                          color: lit ? s.color : C.textMuted,
                        }}
                      >
                        {s.step}
                      </div>
                      <div style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 20, color: lit ? '#ffffff' : C.textMuted}}>
                        {s.title}
                      </div>
                    </div>
                    <div style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 15, color: lit ? s.color : C.textMuted}}>
                      {s.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </At>
        <CornerAvatar
          gender="male"
          expression="confident"
          height={420}
          position="bottom-right"
          glowColor={C.gold}
          scale={pp(T, 15.5)}
        />
        {T < 17.0 ? (
          <NarrationSub text="Bangun pondasinya sedikit demi sedikit:" />
        ) : (
          <NarrationSub text="Huruf → Kosakata → Kanji → Pola kalimat → Penggunaan." />
        )}
      </Win>
    </BlockFade>
  );
};
