import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  HighlightSou,
  NarrationSub,
  Win,
  pp,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World5_ContrastI: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 10.0s (relatif terhadap start 55.5s)
  // Subtitle timeline:
  // S24: 0.0 - 2.5s (Terus ada yang satu lagi: おいしいそうです)
  // S25: 2.5 - 5.0s (おいしそうです: 'Kelihatannya enak' - melihat sendiri)
  // S26: 5.0 - 7.5s (おいしいそうです: 'Katanya enak' - dari orang lain)
  // S27: 7.5 - 10.0s ('Informasinya seperti itu')

  // Zoom dan penekanan huruf い
  const pulseI = Math.sin(T * 8) * 0.15;

  const isForm1Active = T >= 2.5 && T < 5.0;
  const isForm2Active = T >= 5.0;

  // S26: Balon ucapan dari orang lain
  const speechFromOther = pp(T, 5.2, BOUNCY);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* Header Penting */}
      <At y={220}>
        <div
          style={{
            padding: '6px 24px',
            borderRadius: 999,
            background: 'rgba(255, 92, 124, 0.2)',
            border: '2px solid #ff5c7c',
            color: '#ff8ca3',
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: 2,
            boxShadow: '0 0 20px rgba(255, 92, 124, 0.4)',
          }}
        >
          ⚠️ PERBEDAAN PALING KRUSIAL: SATU HURUF [い]
        </div>
      </At>

      {/* Kartu 1: おいしそうです (Tanpa い) */}
      <At y={420}>
        <div
          style={{
            width: 820,
            background: isForm1Active ? '#2c374d' : '#1a2230',
            border: `2.5px solid ${isForm1Active ? C.gold : 'rgba(111,147,207,0.2)'}`,
            borderRadius: 24,
            padding: '18px 30px',
            boxShadow: isForm1Active
              ? `0 16px 36px rgba(0,0,0,0.7), 0 0 28px ${C.gold}44`
              : '0 6px 18px rgba(0,0,0,0.4)',
            transform: `scale(${isForm1Active ? 1.05 : 1})`,
            transition: 'all 0.25s ease',
            opacity: isForm2Active ? 0.35 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 46,
                fontWeight: 900,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <span>おいし</span>
              <span
                style={{
                  color: C.textMuted,
                  textDecoration: 'line-through',
                  margin: '0 6px',
                  fontSize: 38,
                }}
              >
                い
              </span>
              <HighlightSou />
              <span>です</span>
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 22,
                fontWeight: 800,
                color: isForm1Active ? C.goldSoft : C.textSecondary,
                marginTop: 4,
              }}
            >
              “Kelihatannya enak”
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 12,
                background: `${C.gold}22`,
                border: `1.5px solid ${C.gold}`,
                color: C.gold,
                fontWeight: 800,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
              }}
            >
              👁️ MELIHAT SENDIRI
            </div>
            <div style={{fontSize: 14, color: C.textMuted, whiteSpace: 'nowrap'}}>Kesan dari mata</div>
          </div>
        </div>
      </At>

      {/* Kartu 2: おいしいそうです (DENGAN い MERAH MUDA MENYALA) */}
      <At y={640}>
        <div
          style={{
            width: 820,
            background: isForm2Active ? '#332333' : '#1a2230',
            border: `3px solid ${isForm2Active ? '#ff5c7c' : 'rgba(255, 92, 124, 0.4)'}`,
            borderRadius: 24,
            padding: '18px 30px',
            boxShadow: isForm2Active
              ? '0 18px 40px rgba(0,0,0,0.8), 0 0 32px rgba(255, 92, 124, 0.5)'
              : '0 6px 18px rgba(0,0,0,0.4)',
            transform: `scale(${isForm2Active ? 1.05 : 1})`,
            transition: 'all 0.25s ease',
            opacity: isForm1Active ? 0.35 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT.jp,
                fontSize: 46,
                fontWeight: 900,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                whiteSpace: 'nowrap',
              }}
            >
              <span>おいし</span>
              {/* HURUF い PALING MENONJOL (PINK / HANKO) */}
              <span
                style={{
                  color: '#ff5c7c',
                  background: 'rgba(255, 92, 124, 0.25)',
                  border: '2px solid #ff5c7c',
                  borderRadius: 12,
                  padding: '2px 10px',
                  margin: '0 6px',
                  display: 'inline-block',
                  transform: `scale(${1.15 + pulseI})`,
                  boxShadow: '0 0 20px rgba(255, 92, 124, 0.9)',
                }}
              >
                い
              </span>
              <HighlightSou />
              <span>です</span>
            </div>
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 22,
                fontWeight: 800,
                color: isForm2Active ? '#ff8ca3' : C.textSecondary,
                marginTop: 4,
              }}
            >
              “Katanya enak” (Informasi dari orang)
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 12,
                background: 'rgba(255, 92, 124, 0.2)',
                border: '1.5px solid #ff5c7c',
                color: '#ff8ca3',
                fontWeight: 800,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              👂 MENDENGAR KABAR
            </div>
            <div style={{fontSize: 14, color: C.textMuted}}>Bukan lihat sendiri</div>
          </div>
        </div>
      </At>

      {/* Visualisasi Adegan Bawah: S25 Melihat Sendiri vs S26-S27 Mendapat Informasi */}
      <Win T={T} a={2.5} b={5.0}>
        <At y={1040}>
          <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
            <Avatar gender="female" expression="happy" height={220} bubble="sparkle" />
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #f9a825 0%, #d84315 80%)',
                border: '6px solid #fff',
                fontSize: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 24px rgba(0,0,0,0.6)',
              }}
            >
              🍜
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              background: '#1d273a',
              border: `1.5px solid ${C.gold}`,
              borderRadius: 18,
              padding: '10px 24px',
              color: C.goldSoft,
              fontWeight: 800,
              fontSize: 22,
              fontFamily: FONT.display,
            }}
          >
            Mata langsung memandang: “Wah, kuahnya gurih, kelihatannya enak!”
          </div>
        </At>
      </Win>

      <Win T={T} a={5.0} b={10.0}>
        <At y={1020}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 720,
            }}
          >
            {/* Orang Lain (Memberi Info) */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div
                style={{
                  background: '#2b213a',
                  border: '1.5px solid #ff5c7c',
                  borderRadius: 16,
                  padding: '8px 16px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 8,
                  transform: `scale(${speechFromOther})`,
                }}
              >
                “Restoran itu ramennya enak lho!”
              </div>
              <Avatar gender="male" expression="excited" height={200} />
            </div>

            {/* Simbol Transfer Informasi */}
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: 36}}>💬 ➔ 👂</div>
              <div style={{fontSize: 14, color: '#ff8ca3', fontWeight: 800, marginTop: 4}}>
                INFORMASI
              </div>
            </div>

            {/* Karakter Menerima Info */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Avatar gender="female" expression="surprised" height={200} flip bubble="idea" />
            </div>
          </div>

          {/* S27: Alur Orang Lain ➔ Informasi ➔ おいしいそうです */}
          {T >= 7.5 && (
            <div
              style={{
                marginTop: 24,
                background: 'rgba(255, 92, 124, 0.15)',
                border: '2px solid #ff5c7c',
                borderRadius: 20,
                padding: '12px 30px',
                color: '#ffffff',
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 22,
                textAlign: 'center',
                boxShadow: '0 0 24px rgba(255, 92, 124, 0.3)',
              }}
            >
              ORANG LAIN ➔ KATA MEREKA ➔ <span style={{color: '#ff8ca3'}}>おいしいそうです</span> (Katanya enak)
            </div>
          )}
        </At>
      </Win>

      {/* Subtitle Narasi */}
      <NarrationSub t={T} at={0.0} until={2.5}>
        “Terus ada yang satu lagi: <span style={{color: '#ff5c7c'}}>おいしいそうです</span>.”
      </NarrationSub>
      <NarrationSub t={T} at={2.5} until={5.0}>
        “<span style={{color: C.gold}}>おいしそうです</span>: ‘Kelihatannya enak’ (melihat sendiri).”
      </NarrationSub>
      <NarrationSub t={T} at={5.0} until={7.5}>
        “<span style={{color: '#ff5c7c'}}>おいしいそうです</span>: ‘Katanya enak’ (mendapat kabar dari orang lain).”
      </NarrationSub>
      <NarrationSub t={T} at={7.5} until={10.0}>
        “‘Informasinya seperti itu.’”
      </NarrationSub>
    </div>
  );
};
