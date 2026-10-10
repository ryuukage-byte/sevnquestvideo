import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  ContextCard,
  NarrationSub,
  SouAnchor,
  Win,
  pp,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World7_ContextShift: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 7.66s (relatif terhadap start 72.5s)
  // Subtitle timeline:
  // S30: 0.0 - 2.0s (Lalu tanya: 'Begitu yang mana?')
  // S31: 2.0 - 4.0s (Hal yang tadi dibicarakan? Keadaan yang terlihat? Informasi yang didengar?)
  // S32: 4.0 - 6.0s (Begitu konteksnya berubah, terjemahannya juga bisa ikut berubah)
  // S33: 6.0 - 7.66s ('Oh, ini sedang menunjuk ke keadaan yang seperti itu.' Ketemu そう? Lihat konteksnya)

  // S30: Pertanyaan Kunci Masuk
  const questionPop = pp(T, 0.2, BOUNCY);

  // S31: 3 Kartu Konteks
  const c1 = pp(T, 2.1, BOUNCY);
  const c2 = pp(T, 2.7, BOUNCY);
  const c3 = pp(T, 3.3, BOUNCY);

  // S32: Konteks Bergeser Dinamis (4.0s - 6.0s)
  // Shift state: 0 (4.0 - 4.6s), 1 (4.6 - 5.3s), 2 (5.3 - 6.0s)
  const shiftIdx = T < 4.6 ? 0 : T < 5.3 ? 1 : 2;

  // S33: Final Hold & Fade Out
  const finalPop = pp(T, 6.2, BOUNCY);

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* S30: Pertanyaan Kunci: BEGITU YANG MANA? (0.0s - 2.0s) */}
      <Win T={T} a={0} b={1.85} inD={0.15} outD={0.15}>
        <At y={480}>
          <div
            style={{
              padding: '6px 20px',
              borderRadius: 999,
              background: 'rgba(226, 85, 91, 0.2)',
              border: '2px solid #e2555b',
              color: '#ff6b72',
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            PERTANYAAN PALING PENTING:
          </div>

          <div
            style={{
              background: '#232a3d',
              border: `3px solid ${C.gold}`,
              borderRadius: 32,
              padding: '28px 56px',
              textAlign: 'center',
              boxShadow: `0 18px 44px rgba(0,0,0,0.7), 0 0 36px ${C.gold}44`,
              transform: `scale(${questionPop})`,
            }}
          >
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 54,
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: 1,
              }}
            >
              “BEGITU YANG MANA?”
            </div>
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 22,
                fontWeight: 700,
                color: C.goldSoft,
                marginTop: 6,
              }}
            >
              Tanyakan selalu konteks apa yang sedang ditunjuk!
            </div>
          </div>
        </At>

        <At y={960}>
          <Avatar gender="male" expression="confident" height={240} bubble="question" />
        </At>
      </Win>

      {/* S31: Tiga Konteks Rujukan (2.0s - 4.0s) */}
      <Win T={T} a={2.0} b={3.85} inD={0.15} outD={0.15}>
        <At y={320}>
          <SouAnchor size={120} />
          <div
            style={{
              marginTop: 14,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 26,
              color: '#ffffff',
            }}
          >
            Cek salah satu dari 3 hal ini:
          </div>
        </At>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 520,
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            padding: '0 40px',
          }}
        >
          <ContextCard
            w={300}
            title="1. Dibicarakan"
            subtitle="Pernyataan lawan bicara ➔ “Begitu”"
            icon="💬"
            active={T >= 2.1 && T < 2.7}
            scale={c1}
          />
          <ContextCard
            w={300}
            title="2. Terlihat"
            subtitle="Kesan visual langsung ➔ “Kelihatannya”"
            icon="👁️"
            active={T >= 2.7 && T < 3.3}
            scale={c2}
          />
          <ContextCard
            w={300}
            title="3. Didengar"
            subtitle="Informasi orang lain ➔ “Katanya”"
            icon="👂"
            active={T >= 3.3}
            scale={c3}
          />
        </div>

        <At y={980}>
          <div style={{display: 'flex', gap: 20, alignItems: 'center'}}>
            <Avatar gender="female" expression="excited" height={210} />
            <Avatar gender="male" expression="happy" height={210} flip />
          </div>
        </At>
      </Win>

      {/* S32: Morfologi Konteks: Kata そう Tetap di Tengah, Konteks Berganti (4.0s - 6.0s) */}
      <Win T={T} a={4.0} b={5.85} inD={0.15} outD={0.15}>
        {/* KATA JANGKAR TETAP DI TENGAH SESUAI KONSEP VISUAL UTAMA */}
        <At y={420}>
          <SouAnchor size={150} glow />
          <div
            style={{
              marginTop: 10,
              fontFamily: FONT.mono,
              fontSize: 18,
              color: C.goldSoft,
            }}
          >
            (Jangkar Tetap Tidak Berubah)
          </div>
        </At>

        {/* Konteks Berganti Halus */}
        <At y={740}>
          <div
            style={{
              width: 720,
              background: '#232c40',
              border: `2.5px solid ${C.gold}`,
              borderRadius: 24,
              padding: '24px 36px',
              textAlign: 'center',
              boxShadow: `0 14px 36px rgba(0,0,0,0.6), 0 0 28px ${C.gold}33`,
            }}
          >
            {shiftIdx === 0 && (
              <div>
                <div style={{fontSize: 22, color: C.indigoSoft, fontWeight: 700}}>
                  Konteks: Hal yang tadi dibicarakan 💬
                </div>
                <div style={{fontSize: 42, color: '#ffffff', fontWeight: 900, marginTop: 6}}>
                  Terjemahan ➔ <span style={{color: C.gold}}>“Begitu”</span>
                </div>
              </div>
            )}
            {shiftIdx === 1 && (
              <div>
                <div style={{fontSize: 22, color: C.indigoSoft, fontWeight: 700}}>
                  Konteks: Keadaan yang terlihat mata 👁️
                </div>
                <div style={{fontSize: 42, color: '#ffffff', fontWeight: 900, marginTop: 6}}>
                  Terjemahan ➔ <span style={{color: C.gold}}>“Kelihatannya”</span>
                </div>
              </div>
            )}
            {shiftIdx === 2 && (
              <div>
                <div style={{fontSize: 22, color: '#ff8ca3', fontWeight: 700}}>
                  Konteks: Informasi kabar dari orang lain 👂
                </div>
                <div style={{fontSize: 42, color: '#ffffff', fontWeight: 900, marginTop: 6}}>
                  Terjemahan ➔ <span style={{color: '#ff5c7c'}}>“Katanya”</span>
                </div>
              </div>
            )}
          </div>
        </At>

        <At y={1080}>
          <div style={{fontSize: 20, color: C.textSecondary, fontWeight: 700}}>
            Konteksnya bergeser ➔ Terjemahannya ikut menyesuaikan!
          </div>
        </At>
      </Win>

      {/* S33: Final Outro (6.0s - 7.66s) */}
      <Win T={T} a={6.0} b={7.66} inD={0.15} outD={0.15}>
        <At y={460}>
          <SouAnchor size={140} scale={finalPop} />

          <div
            style={{
              marginTop: 24,
              background: `linear-gradient(180deg, #283652 0%, ${C.card} 100%)`,
              border: `3px solid ${C.gold}`,
              borderRadius: 32,
              padding: '28px 54px',
              textAlign: 'center',
              boxShadow: `0 18px 44px rgba(0,0,0,0.8), 0 0 36px ${C.gold}44`,
              transform: `scale(${finalPop})`,
            }}
          >
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 48,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              KETEMU <span style={{color: C.gold}}>そう</span>?
              <br />
              LIHAT KONTEKSNYA.
            </div>
            <div
              style={{
                fontFamily: FONT.body,
                fontSize: 22,
                fontWeight: 700,
                color: C.goldSoft,
                marginTop: 10,
              }}
            >
              “Oh, ini sedang menunjuk ke keadaan yang seperti itu.”
            </div>
          </div>
        </At>

        {/* Karakter Avatar Mengangguk Puas */}
        <At y={1020}>
          <div style={{display: 'flex', alignItems: 'center', gap: 32}}>
            <Avatar gender="female" expression="happy" height={220} bubble="sparkle" />
            <Avatar gender="male" expression="satisfied" height={220} flip bubble="idea" />
          </div>
        </At>

        {/* SevnQuest Branding Badge di Bawah */}
        <At y={1300}>
          <div
            style={{
              fontFamily: FONT.display,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 4,
              color: C.textMuted,
              textTransform: 'uppercase',
            }}
          >
            SEVNQUEST • BELAJAR JEPANG DENGAN LOGIKA INTUITIF
          </div>
        </At>
      </Win>

      {/* Subtitle Narasi */}
      <NarrationSub t={T} at={0.0} until={1.85}>
        “Lalu tanya: ‘Begitu yang mana?’”
      </NarrationSub>
      <NarrationSub t={T} at={2.0} until={3.85}>
        “Hal yang tadi dibicarakan? Keadaan yang terlihat? Informasi yang didengar?”
      </NarrationSub>
      <NarrationSub t={T} at={4.0} until={5.85}>
        “Begitu konteksnya berubah, terjemahannya juga ikut berubah.”
      </NarrationSub>
      <NarrationSub t={T} at={6.0} until={7.66}>
        “‘Oh, ini sedang menunjuk ke keadaan yang seperti itu.’ Ketemu そう? Lihat konteksnya.”
      </NarrationSub>
    </div>
  );
};
