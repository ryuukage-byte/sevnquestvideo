import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {animateProg, EASINGS} from '../../animation/presets';
import {CameraRig} from '../../components/CameraRig';
import {SouCore} from '../../components/SouCore';
import {CharacterActor} from '../../components/CharacterActor';
import {SituationCard} from '../../components/SituationCard';
import {VoiceCaption} from '../../components/VoiceCaption';
import {CAPTIONS} from '../../timeline/captions';
import {TOKENS} from '../../styles/tokens';

export const Act07_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();

  // Current caption lookup
  let activeCaption = CAPTIONS['seg-46'];
  if (frame >= 1580) activeCaption = CAPTIONS['seg-53'];
  else if (frame >= 1508) activeCaption = CAPTIONS['seg-52'];
  else if (frame >= 1320) activeCaption = CAPTIONS['seg-51'];
  else if (frame >= 1116) activeCaption = CAPTIONS['seg-50'];
  else if (frame >= 765) activeCaption = CAPTIONS['seg-49'];
  else if (frame >= 558) activeCaption = CAPTIONS['seg-48'];
  else if (frame >= 193) activeCaption = CAPTIONS['seg-47'];

  // Iris contract in seg 53
  const outroContract =
    frame >= 1580
      ? 1 - animateProg(frame - 1580, 0, 80, EASINGS.outExpo)
      : 1;

  return (
    <CameraRig>
      {/* --- SEGMENT 46: Arrow Transform & "Begitu Yang Mana?" (0..193) --- */}
      {frame < 193 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 420,
              left: 540,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 64,
                color: TOKENS.colors.souCyan,
                textShadow: `0 0 30px ${TOKENS.colors.souCyanGlow}`,
              }}
            >
              BEGITU YANG MANA?
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: TOKENS.fonts.body,
                fontSize: 28,
                fontWeight: 700,
                color: TOKENS.colors.textSecondary,
              }}
            >
              Selalu cari tahu konteks yang ditunjuk!
            </div>
          </div>

          <SouCore x={540} y={880} size={130} arrowMode={true} />

          <CharacterActor
            gender="male"
            expression="confident"
            tier={5}
            x={540}
            y={1360}
            height={360}
          />
        </>
      )}

      {/* --- SEGMENTS 47 & 48: Three Contexts Orbiting Sou (193..765) --- */}
      {frame >= 193 && frame < 765 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 380,
              left: 540,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 48,
                color: TOKENS.colors.textPrimary,
              }}
            >
              3 KONTEKS PENENTU ARTI
            </div>
          </div>

          {/* Central Stable Sou Core */}
          <SouCore x={540} y={820} size={140} glowIntensity={1.2} />

          {/* 3 Panels with 2.5D Depth */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1160,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              gap: 20,
              width: 960,
              justifyContent: 'center',
            }}
          >
            <SituationCard
              badge="1. PERCAKAPAN"
              title="DIBICARAKAN"
              subtitle="Arti: 'Begitu'"
              accentColor={TOKENS.colors.souCyan}
              active={frame < 380}
              width={290}
            />
            <SituationCard
              badge="2. PENAMPILAN"
              title="TERLIHAT"
              subtitle="Arti: 'Kelihatannya'"
              accentColor={TOKENS.colors.directAmber}
              active={frame >= 380 && frame < 558}
              width={290}
            />
            <SituationCard
              badge="3. INFORMASI"
              title="DIDENGAR"
              subtitle="Arti: 'Katanya'"
              accentColor={TOKENS.colors.hearsayPink}
              active={frame >= 558}
              width={290}
            />
          </div>
        </>
      )}

      {/* --- SEGMENT 49: "Jangan Hafal, Pahami!" (765..1116) --- */}
      {frame >= 765 && frame < 1116 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 360,
              left: 540,
              transform: 'translateX(-50%)',
              textAlign: 'center',
              width: '90%',
            }}
          >
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 38,
                color: TOKENS.colors.dangerRed,
                marginBottom: 12,
              }}
            >
              JANGAN HAFAL HAFALAN MATI:
            </div>

            {/* 3 Crossed out lines */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                alignItems: 'center',
                fontFamily: TOKENS.fonts.body,
                fontSize: 30,
                fontWeight: 800,
                color: TOKENS.colors.textMuted,
                textDecoration: 'line-through',
              }}
            >
              <div>そう = begitu ✕</div>
              <div>そう = kelihatannya ✕</div>
              <div>そう = katanya ✕</div>
            </div>

            <div
              style={{
                marginTop: 24,
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 50,
                color: TOKENS.colors.souCyan,
                textShadow: `0 0 35px ${TOKENS.colors.souCyanGlow}`,
                lineHeight: 1.2,
              }}
            >
              PAHAMI APA YANG DITUNJUK<br />OLEH そう!
            </div>
          </div>

          <CharacterActor
            gender="male"
            expression="confident"
            tier={6}
            x={540}
            y={1280}
            height={360}
          />
        </>
      )}

      {/* --- SEGMENTS 50 & 51: Memory Portal (1116..1508) --- */}
      {frame >= 1116 && frame < 1508 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 380,
              left: 540,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 44,
                color: TOKENS.colors.conceptViolet,
              }}
            >
              SEMUA KEADAAN TERHUBUNG
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: TOKENS.fonts.body,
                fontWeight: 700,
                fontSize: 26,
                color: TOKENS.colors.textSecondary,
              }}
            >
              "Oh, ini menunjuk ke keadaan seperti itu!"
            </div>
          </div>

          {/* Floating Memory Cards */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 860,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              width: 900,
              justifyContent: 'center',
            }}
          >
            <SituationCard title="📅 Libur" accentColor={TOKENS.colors.souCyan} width={260} height={120} />
            <SituationCard title="🍜 Ramen" accentColor={TOKENS.colors.directAmber} width={260} height={120} />
            <SituationCard title="☁️ Hujan" accentColor={TOKENS.colors.souCyan} width={260} height={120} />
            <SituationCard title="📱 Chat Kabar" accentColor={TOKENS.colors.hearsayPink} width={260} height={120} />
            <SituationCard title="💭 Pikiran" accentColor={TOKENS.colors.conceptViolet} width={260} height={120} />
          </div>

          <SouCore x={540} y={1240} size={110} />
        </>
      )}

      {/* --- SEGMENTS 52 & 53: Final Summary & SevnQuest Brand CTA (1508..1662) --- */}
      {frame >= 1508 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 360,
              left: 540,
              transform: `translateX(-50%) scale(${outroContract})`,
              textAlign: 'center',
              width: '90%',
              opacity: outroContract,
            }}
          >
            <div
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: 120,
                color: TOKENS.colors.souCyan,
                textShadow: `0 0 50px ${TOKENS.colors.souCyan}`,
                lineHeight: 1,
              }}
            >
              そう
            </div>

            <div style={{fontSize: 36, color: TOKENS.colors.souCyan, margin: '8px 0'}}>↓</div>
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 40,
                color: TOKENS.colors.textPrimary,
              }}
            >
              "seperti itu"
            </div>
            <div style={{fontSize: 36, color: TOKENS.colors.souCyan, margin: '8px 0'}}>↓</div>
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 34,
                color: TOKENS.colors.directAmber,
                letterSpacing: 1,
              }}
            >
              KONTEKS MENENTUKAN CARA MENERJEMAHKANNYA
            </div>

            <div
              style={{
                marginTop: 20,
                fontFamily: TOKENS.fonts.body,
                fontWeight: 700,
                fontSize: 28,
                color: TOKENS.colors.textSecondary,
              }}
            >
              Bukan cuma hafal arti. Pahami logikanya.
            </div>
          </div>

          {/* Central Logo Resolve & CTA */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1080,
              transform: `translate(-50%, -50%) scale(${outroContract})`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Img
              src={staticFile('brand/logo.png')}
              style={{
                width: 130,
                height: 130,
                objectFit: 'contain',
                filter: `drop-shadow(0 0 25px ${TOKENS.colors.souCyan})`,
                marginBottom: 12,
              }}
            />
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 44,
                color: TOKENS.colors.textPrimary,
                letterSpacing: 4,
              }}
            >
              SEVNQUEST
            </div>

            {/* COBA SEKARANG Button */}
            <div
              style={{
                marginTop: 24,
                padding: '16px 48px',
                borderRadius: 28,
                background: 'linear-gradient(135deg, #F9C56B 0%, #D97706 100%)',
                boxShadow: '0 8px 30px rgba(249, 197, 107, 0.4)',
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 34,
                color: '#090E1E',
                letterSpacing: 2,
              }}
            >
              COBA SEKARANG →
            </div>

            {/* Official URL */}
            <div
              style={{
                marginTop: 14,
                fontFamily: TOKENS.fonts.mono,
                fontWeight: 700,
                fontSize: 22,
                color: TOKENS.colors.souCyan,
                letterSpacing: 1.5,
              }}
            >
              sevnquest.sevnsoul.site
            </div>
          </div>
        </>
      )}

      {/* Voice Caption */}
      <VoiceCaption
        text={activeCaption.text}
        highlightText={activeCaption.highlightText}
      />
    </CameraRig>
  );
};
