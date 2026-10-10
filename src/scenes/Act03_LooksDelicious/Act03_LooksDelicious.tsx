import React from 'react';
import {useCurrentFrame} from 'remotion';
import {animateProg, EASINGS} from '../../animation/presets';
import {CameraRig} from '../../components/CameraRig';
import {SouCore} from '../../components/SouCore';
import {JapaneseText} from '../../components/JapaneseText';
import {MeaningConnector} from '../../components/MeaningConnector';
import {CharacterActor} from '../../components/CharacterActor';
import {SituationCard} from '../../components/SituationCard';
import {ParticleField} from '../../components/ParticleField';
import {VoiceCaption} from '../../components/VoiceCaption';
import {CAPTIONS} from '../../timeline/captions';
import {TOKENS} from '../../styles/tokens';

export const Act03_LooksDelicious: React.FC = () => {
  const frame = useCurrentFrame();

  // Current caption lookup
  let activeCaption = CAPTIONS['seg-14'];
  if (frame >= 2112) activeCaption = CAPTIONS['seg-21'];
  else if (frame >= 1631) activeCaption = CAPTIONS['seg-20'];
  else if (frame >= 1309) activeCaption = CAPTIONS['seg-19'];
  else if (frame >= 1102) activeCaption = CAPTIONS['seg-18'];
  else if (frame >= 697) activeCaption = CAPTIONS['seg-17'];
  else if (frame >= 471) activeCaption = CAPTIONS['seg-16'];
  else if (frame >= 178) activeCaption = CAPTIONS['seg-15'];

  // Camera zoom during ramen hero
  const ramenZoom =
    frame >= 178 && frame < 471
      ? 1 + animateProg(frame - 178, 0, 250, EASINGS.outExpo) * 0.12
      : 1;

  return (
    <CameraRig zoom={ramenZoom}>
      {/* Background warm amber glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: TOKENS.colors.bgWarmAmber,
          opacity: frame >= 178 ? 0.9 : 0.2,
          transition: 'opacity 0.3s ease',
        }}
      />

      <ParticleField
        count={30}
        type={frame >= 178 && frame < 697 ? 'steam' : 'ambient'}
        color={TOKENS.colors.directAmber}
      />

      {/* --- SEGMENT 14: Tapi... Morph そう into おいしそう (0..178) --- */}
      {frame < 178 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 440,
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
                fontSize: 64,
                color: TOKENS.colors.directAmber,
                textShadow: `0 0 35px ${TOKENS.colors.directAmberGlow}`,
              }}
            >
              TAPI... BAGAIMANA INI?
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
              Informasi kini didapat dari <span style={{color: TOKENS.colors.directAmber}}>apa yang dilihat langsung</span>!
            </div>
          </div>

          {/* Morph preview: そう -> おいしそう */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 820,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <JapaneseText text="そう" size={80} highlightColor={TOKENS.colors.souCyan} />
            <span style={{fontSize: 48, color: TOKENS.colors.directAmber}}>➔</span>
            <JapaneseText text="おいしそう" size={90} highlightColor={TOKENS.colors.directAmber} />
          </div>

          <CharacterActor
            gender="male"
            expression="surprised"
            tier={3}
            x={540}
            y={1340}
            height={340}
          />
        </>
      )}

      {/* --- SEGMENT 15: Ramen Hero: おいしい -> おいしそう (178..471) --- */}
      {frame >= 178 && frame < 471 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 340,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                padding: '8px 24px',
                borderRadius: 20,
                background: 'rgba(0,0,0,0.4)',
                marginBottom: 12,
              }}
            >
              <span style={{fontFamily: TOKENS.fonts.jp, fontSize: 36, color: TOKENS.colors.textMuted}}>
                おいしい
              </span>
              <span style={{color: TOKENS.colors.directAmber, fontSize: 28}}>➔</span>
              <span style={{fontFamily: TOKENS.fonts.jp, fontSize: 44, fontWeight: 900, color: TOKENS.colors.directAmber}}>
                おいし<span style={{color: TOKENS.colors.souCyan}}>そう</span>
              </span>
            </div>
            <JapaneseText
              text="おいしそう"
              size={110}
              translation="Kelihatannya enak. (Kesan Pengamatan)"
              highlightPart="そう"
              highlightColor={TOKENS.colors.directAmber}
            />
          </div>

          {/* Steaming Ramen Illustration / Card */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 890,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              badge="OBSERVASI VISUAL LANGSUNG"
              title="🍜 Ramen Panas Berasap"
              subtitle="Kesan visual timbul sebelum mencicipi!"
              accentColor={TOKENS.colors.directAmber}
              active={true}
              width={640}
              height={250}
            >
              <div
                style={{
                  fontSize: 76,
                  marginTop: 6,
                  filter: 'drop-shadow(0 0 20px rgba(249, 197, 107, 0.6))',
                }}
              >
                🍜✨🥢
              </div>
            </SituationCard>
          </div>

          <CharacterActor
            gender="female"
            expression="excited"
            tier={4}
            x={540}
            y={1360}
            height={340}
          />
        </>
      )}

      {/* --- SEGMENT 16 & 17: Infographic: Objek, Pengamat, Kesan & Belum Makan (471..1102) --- */}
      {frame >= 471 && frame < 1102 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 400,
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
                color: TOKENS.colors.directAmber,
              }}
            >
              PROSES KESAN VISUAL
            </div>
          </div>

          {/* 3 Pillars: Objek, Pengamat, Kesan */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 760,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              gap: 20,
              width: 960,
              justifyContent: 'center',
            }}
          >
            <SituationCard
              badge="1. OBJEK"
              title="🍜 Ramen"
              subtitle="Tampilan fisik"
              accentColor={TOKENS.colors.directAmber}
              width={290}
              active={true}
            />
            <SituationCard
              badge="2. PENGAMAT"
              title="👀 Mata"
              subtitle="Melihat langsung"
              accentColor={TOKENS.colors.souCyan}
              width={290}
              active={true}
            />
            <SituationCard
              badge="3. KESAN"
              title="✨ Enak!"
              subtitle="Kesimpulan pikiran"
              accentColor={TOKENS.colors.directAmber}
              width={290}
              active={true}
            />
          </div>

          {/* Line of sight: Eye to Ramen */}
          <MeaningConnector
            x1={400}
            y1={1200}
            x2={680}
            y2={1200}
            active={true}
            color={TOKENS.colors.directAmber}
            strokeWidth={4}
            label="Melihat tampilan"
          />

          {/* Belum Makan Badge */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1040,
              transform: 'translate(-50%, -50%)',
              backgroundColor: TOKENS.colors.bgDeep,
              border: `2px solid ${TOKENS.colors.dangerRed}`,
              borderRadius: 24,
              padding: '12px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 8px 24px rgba(239,68,68,0.4)',
            }}
          >
            <span style={{fontSize: 28}}>🚫🥄</span>
            <span
              style={{
                fontFamily: TOKENS.fonts.body,
                fontWeight: 900,
                fontSize: 26,
                color: TOKENS.colors.dangerRed,
              }}
            >
              BELUM MAKAN SAMA SEKALI!
            </span>
          </div>

          <CharacterActor
            gender="male"
            expression="confused"
            tier={3}
            x={260}
            y={1360}
            height={340}
          />
        </>
      )}

      {/* --- SEGMENT 18 & 19: Connector & Observation Flow (1102..1631) --- */}
      {frame >= 1102 && frame < 1631 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 380,
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
                fontSize: 48,
                color: TOKENS.colors.directAmber,
              }}
            >
              BUKAN SEKADAR "BEGITU ENAK"!
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: TOKENS.fonts.body,
                fontSize: 26,
                fontWeight: 700,
                color: TOKENS.colors.textSecondary,
              }}
            >
              Melainkan kesan yang ditunjuk dari pengamatan mata:
            </div>
          </div>

          {/* Flow Diagram: 見る -> Kesan -> おいしそう -> Kelihatannya enak */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 780,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <SituationCard
                badge="1. LIHAT"
                title="見る"
                subtitle="Melihat penampilan"
                accentColor={TOKENS.colors.souCyan}
                width={280}
                active={true}
              />
              <span style={{fontSize: 32, color: TOKENS.colors.directAmber}}>➔</span>
              <SituationCard
                badge="2. KESAN"
                title="Mendapat Kesan"
                subtitle="Keadaan enak"
                accentColor={TOKENS.colors.directAmber}
                width={320}
                active={true}
              />
            </div>
            <span style={{fontSize: 32, color: TOKENS.colors.directAmber}}>↓</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <SituationCard
                badge="3. KATA"
                title="おいしそう"
                subtitle="Menunjuk keadaan itu"
                accentColor={TOKENS.colors.souCyan}
                width={320}
                active={true}
              />
              <span style={{fontSize: 32, color: TOKENS.colors.directAmber}}>➔</span>
              <SituationCard
                badge="4. ARTI"
                title='"Kelihatannya enak"'
                subtitle="Terjemahan wajar"
                accentColor={TOKENS.colors.directAmber}
                width={340}
                active={true}
              />
            </div>
          </div>

          {/* Sou Core Anchor */}
          <SouCore x={540} y={1160} size={110} coreColor={TOKENS.colors.souCyan} />

          <CharacterActor
            gender="female"
            expression="satisfied"
            tier={4}
            x={540}
            y={1400}
            height={320}
          />
        </>
      )}

      {/* --- SEGMENTS 20 & 21: "Sou Berubah Arti? ✕" & Translation Portal (1631..2295) --- */}
      {frame >= 1631 && (
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
                fontSize: 54,
                color: TOKENS.colors.dangerRed,
                textDecoration: 'line-through',
              }}
            >
              そう BERUBAH ARTI? ✕
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: TOKENS.fonts.body,
                fontWeight: 800,
                fontSize: 32,
                color: TOKENS.colors.souCyan,
              }}
            >
              Inti そう Tetap Sama: Menunjuk Keadaan!
            </div>
          </div>

          {/* Portal Transformation Box */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 860,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <SituationCard
              title="BEGITU"
              subtitle="(Arti Dasar)"
              accentColor={TOKENS.colors.souCyan}
              width={300}
              active={true}
            />
            <div style={{fontSize: 48, color: TOKENS.colors.directAmber}}>➔</div>
            <SituationCard
              title="KELIHATANNYA ENAK"
              subtitle="(Terjemahan Natural)"
              accentColor={TOKENS.colors.directAmber}
              width={380}
              active={true}
            />
          </div>

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

      <VoiceCaption
        text={activeCaption.text}
        highlightText={activeCaption.highlightText}
      />
    </CameraRig>
  );
};
