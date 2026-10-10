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

export const Act1_Dilemma: React.FC<{dur: number}> = ({dur}) => {
  const T = useT();
  const f = useCurrentFrame();

  return (
    <BlockFade dur={dur}>
      <WorldHeader num="01" title="Dilema & Pertanyaan Awal" badge="FONDASI" />

      {/* CUE 01: 0.00 - 3.64s | Bingung mulai dari mana */}
      <Win T={T} a={0.0} b={4.2} dy={30}>
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
            {/* Chat Bubble */}
            <div
              style={{
                padding: '18px 36px',
                borderRadius: 28,
                background: '#1d2536',
                border: `2px solid ${C.gold}`,
                boxShadow: `0 12px 30px rgba(0,0,0,0.6), 0 0 25px ${C.gold}33`,
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 32,
                color: C.goldSoft,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              “Bang, bingung mau mulai dari mana?”
              {/* Triangle tail */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: `12px solid ${C.gold}`,
                }}
              />
            </div>

            {/* Avatar Tier 1 (Minarai) Bingung — Ukuran Besar ~1/9 Layar */}
            <div style={{transform: `translateY(${Math.sin(f / 12) * 6}px)`}}>
              <Avatar
                gender="male"
                expression="confused"
                height={460}
                style={{filter: `drop-shadow(0 0 35px ${C.gold}88) drop-shadow(0 20px 40px rgba(0,0,0,0.8))`}}
              />
            </div>

            {/* Floating Question Marks */}
            <div
              style={{
                position: 'absolute',
                top: 80,
                left: -80,
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 84,
                color: C.gold,
                transform: `rotate(-15deg) translateY(${Math.sin(f / 10) * 8}px)`,
                opacity: 0.9,
              }}
            >
              ?
            </div>
            <div
              style={{
                position: 'absolute',
                top: 120,
                right: -80,
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 94,
                color: C.indigo,
                transform: `rotate(18deg) translateY(${Math.cos(f / 10) * 8}px)`,
                opacity: 0.9,
              }}
            >
              ?
            </div>
          </div>
        </At>
        <NarrationSub text="“Bang, aku mau belajar bahasa Jepang, tapi bingung mau mulai dari mana.”" />
      </Win>

      {/* CUE 02: 4.63 - 9.68s | Masalah umum semua pembelajar */}
      <Win T={T} a={4.3} b={9.8} dy={30}>
        <At y={580}>
          <GlassCard w={880} border={C.indigo} glow={`${C.indigo}44`} scale={pp(T, 4.6)}>
            <div style={{textAlign: 'center', marginBottom: 12}}>
              <CategoryPill label="FAKTA PERJALANAN" color={C.matcha} />
              <div
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 800,
                  fontSize: 38,
                  color: '#ffffff',
                  marginTop: 12,
                }}
              >
                Masalah Wajar Setiap Pembelajar
              </div>
            </div>
            <div
              style={{
                width: '100%',
                padding: '24px 28px',
                borderRadius: 22,
                background: '#141822',
                border: `1.5px dashed ${C.thread}`,
                fontFamily: FONT.body,
                fontWeight: 600,
                fontSize: 26,
                color: C.textSecondary,
                lineHeight: 1.45,
                textAlign: 'center',
              }}
            >
              Ketika mulai belajar bahasa baru dari nol, rasa bingung bukan berarti kamu tidak mampu — melainkan karena peta jalannya belum terlihat jelas.
            </div>
          </GlassCard>
        </At>

        {/* Mentor Avatar di Pojok Kanan Bawah (~1/9 Layar) */}
        <CornerAvatar
          gender="male"
          expression="happy"
          height={440}
          position="bottom-right"
          bubbleText="Tenang aja!"
          glowColor={C.matcha}
          scale={pp(T, 4.7)}
        />
        <NarrationSub text="Oke, ini sebenarnya masalah yang sering ditemukan ketika kita mau belajar bahasa apa pun." />
      </Win>

      {/* CUE 03: 10.37 - 12.81s | Sebelum mulai, perlu tahu dulu */}
      <Win T={T} a={10.0} b={13.0} dy={25}>
        <At y={720}>
          <div
            style={{
              transform: `scale(${pp(T, 10.4)})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <CategoryPill label="LANGKAH 0" color={C.gold} size={18} />
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 48,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.25,
              }}
            >
              Sebelum Mulai Belajar,
              <br />
              <span style={{color: C.gold}}>Kita Perlu Tahu Dulu:</span>
            </div>
          </div>
        </At>
        <NarrationSub text="Karena sebelum mulai belajar, kita perlu tahu dulu:" />
      </Win>

      {/* CUE 04: 13.51 - 15.03s | Bahasa ini sebenarnya seperti apa? */}
      <Win T={T} a={13.1} b={15.2} dy={30}>
        <At y={700}>
          <GlassCard w={840} border={C.gold} glow={`${C.gold}44`} scale={pp(T, 13.5)}>
            <div style={{fontSize: 56, marginBottom: 10}}>🇯🇵</div>
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 44,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.25,
              }}
            >
              “Bahasa ini sebenarnya
              <br />
              <span style={{color: C.gold}}>seperti apa?</span>”
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="“Bahasa ini sebenarnya seperti apa?”" />
      </Win>

      {/* CUE 05: 15.80 - 18.08s | Apakah punya dasar yang sama dengan bahasa kita? */}
      <Win T={T} a={15.3} b={18.3} dy={30}>
        <At y={710}>
          <GlassCard w={860} border={C.indigo} scale={pp(T, 15.8)}>
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 34,
                color: C.goldSoft,
                marginBottom: 24,
              }}
            >
              Apakah punya dasar yang sama?
            </div>
            <div style={{display: 'flex', gap: 24, width: '100%', justifyContent: 'center'}}>
              <div
                style={{
                  flex: 1,
                  padding: '20px',
                  borderRadius: 20,
                  background: '#161b26',
                  border: `1.5px solid ${C.indigo}`,
                  textAlign: 'center',
                }}
              >
                <div style={{fontSize: 32, marginBottom: 6}}>🇮🇩</div>
                <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 22, color: C.text}}>
                  Bahasa Indonesia
                </div>
                <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 16, color: C.textSecondary, marginTop: 6}}>
                  Pola: S - P - O
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '20px',
                  borderRadius: 20,
                  background: '#1f2838',
                  border: `2px solid ${C.gold}`,
                  textAlign: 'center',
                  boxShadow: `0 0 20px ${C.gold}33`,
                }}
              >
                <div style={{fontSize: 32, marginBottom: 6}}>🇯🇵</div>
                <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 22, color: C.gold}}>
                  Bahasa Jepang
                </div>
                <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 16, color: C.goldSoft, marginTop: 6}}>
                  Pola: S - O - P
                </div>
              </div>
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="Apakah punya dasar yang sama dengan bahasa kita?" />
      </Win>

      {/* CUE 06: 18.80 - 19.93s | Bagaimana cara membacanya? */}
      <Win T={T} a={18.5} b={20.1} dy={30}>
        <At y={710}>
          <GlassCard w={820} border={C.fuji} glow={`${C.fuji}44`} scale={pp(T, 18.8)}>
            <div style={{fontSize: 60, marginBottom: 12}}>👁️ ➔ 🗣️</div>
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 42,
                color: '#ffffff',
                textAlign: 'center',
              }}
            >
              Bagaimana cara membacanya?
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="Bagaimana cara membacanya?" />
      </Win>

      {/* CUE 07: 20.71 - 22.22s | Bagaimana cara menyusun kalimatnya? */}
      <Win T={T} a={20.4} b={23.25} dy={30}>
        <At y={710}>
          <GlassCard w={840} border={C.teal} glow={`${C.teal}44`} scale={pp(T, 20.7)}>
            <div style={{fontSize: 60, marginBottom: 12}}>🧩 ➔ 📝</div>
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 42,
                color: '#ffffff',
                textAlign: 'center',
              }}
            >
              Bagaimana cara menyusun kalimatnya?
            </div>
          </GlassCard>
        </At>
        <NarrationSub text="Bagaimana cara menyusun kalimatnya?" />
      </Win>
    </BlockFade>
  );
};
