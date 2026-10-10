import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CameraRig} from '../../components/CameraRig';
import {SouCore} from '../../components/SouCore';
import {JapaneseText} from '../../components/JapaneseText';
import {MeaningConnector} from '../../components/MeaningConnector';
import {CharacterActor} from '../../components/CharacterActor';
import {SituationCard} from '../../components/SituationCard';
import {VoiceCaption} from '../../components/VoiceCaption';
import {CAPTIONS} from '../../timeline/captions';
import {TOKENS} from '../../styles/tokens';

export const Act02_MeaningPointer: React.FC = () => {
  const frame = useCurrentFrame();

  // Current caption lookup
  let activeCaption = CAPTIONS['seg-04'];
  if (frame >= 2471) activeCaption = CAPTIONS['seg-13'];
  else if (frame >= 2211) activeCaption = CAPTIONS['seg-12'];
  else if (frame >= 1868) activeCaption = CAPTIONS['seg-11'];
  else if (frame >= 1682) activeCaption = CAPTIONS['seg-10'];
  else if (frame >= 1481) activeCaption = CAPTIONS['seg-09'];
  else if (frame >= 1085) activeCaption = CAPTIONS['seg-08'];
  else if (frame >= 888) activeCaption = CAPTIONS['seg-07'];
  else if (frame >= 744) activeCaption = CAPTIONS['seg-06'];
  else if (frame >= 333) activeCaption = CAPTIONS['seg-05'];

  // Whip-pan camera in seg 08
  const whipPanX =
    frame >= 1085 && frame < 1481
      ? Math.sin(((frame - 1085) / 100) * Math.PI) * -120
      : 0;

  return (
    <CameraRig x={whipPanX}>
      {/* --- SEGMENT 04: Concept Intro: KEADAAN / INFORMASI -> そう -> "seperti itu" (0..333) --- */}
      {frame < 333 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 420,
              left: 540,
              transform: 'translateX(-50%)',
              textAlign: 'center',
              width: '90%',
            }}
          >
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontSize: 44,
                fontWeight: 900,
                color: TOKENS.colors.souCyan,
                textShadow: `0 0 25px ${TOKENS.colors.souCyanGlow}`,
              }}
            >
              KONSEP FUNDAMENTAL
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: TOKENS.fonts.body,
                fontSize: 26,
                fontWeight: 700,
                color: TOKENS.colors.textSecondary,
              }}
            >
              そう = Menunjuk keadaan tertentu
            </div>
          </div>

          {/* Hierarchy Flow: KEADAAN / INFORMASI -> そう -> seperti itu */}
          {/* Card 1: KEADAAN / INFORMASI */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 620,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              badge="TITIK ACUAN"
              title="KEADAAN / INFORMASI"
              subtitle="Hal yang sudah diketahui / dibahas"
              accentColor={TOKENS.colors.conceptViolet}
              active={true}
              width={480}
              height={140}
            />
          </div>

          {/* Arrow 1 */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 720,
              transform: 'translate(-50%, -50%)',
              fontSize: 36,
              color: TOKENS.colors.souCyan,
              fontWeight: 900,
            }}
          >
            ↓
          </div>

          {/* Central SouCore */}
          <SouCore x={540} y={810} size={110} label="そう" />

          {/* Arrow 2 */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 900,
              transform: 'translate(-50%, -50%)',
              fontSize: 36,
              color: TOKENS.colors.souCyan,
              fontWeight: 900,
            }}
          >
            ↓
          </div>

          {/* Card 2: SEPERTI ITU */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1000,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              title='"SEPERTI ITU"'
              subtitle="Arti dasar: begitu"
              accentColor={TOKENS.colors.souCyan}
              active={true}
              width={380}
              height={120}
            />
          </div>

          <CharacterActor
            gender="male"
            expression="confident"
            tier={4}
            x={540}
            y={1400}
            height={320}
          />
        </>
      )}

      {/* --- SEGMENT 05: Pointer System Signature (333..744) --- */}
      {frame >= 333 && frame < 744 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 400,
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
                fontSize: 44,
                color: TOKENS.colors.souCyan,
                textShadow: `0 0 20px ${TOKENS.colors.souCyanGlow}`,
              }}
            >
              SISTEM PENUNJUK (POINTER)
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: TOKENS.fonts.body,
                fontWeight: 700,
                fontSize: 24,
                color: TOKENS.colors.directAmber,
              }}
            >
              Menunjuk sesuatu yang sudah dianggap/diketahui sebagai keadaan tertentu
            </div>
          </div>

          {/* Left: Sou Core */}
          <SouCore x={300} y={800} size={120} label="そう" />

          {/* Meaning Connector */}
          <MeaningConnector
            x1={300}
            y1={800}
            x2={760}
            y2={800}
            active={true}
            label="MENUNJUK KE..."
            color={TOKENS.colors.souCyan}
          />

          {/* Right: Target card */}
          <div
            style={{
              position: 'absolute',
              left: 760,
              top: 800,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              title="SUATU KEADAAN"
              subtitle="Yang sudah diketahui / disepakati"
              accentColor={TOKENS.colors.souCyan}
              active={true}
              width={420}
              height={180}
            />
          </div>

          <CharacterActor
            gender="female"
            expression="confident"
            tier={5}
            x={540}
            y={1360}
            height={360}
          />
        </>
      )}

      {/* --- SEGMENTS 06 & 07: Convo Simulation: "Besok libur" -> "Sou desu" (744..1085) --- */}
      {frame >= 744 && frame < 1085 && (
        <>
          {/* Character A on Left with Calendar */}
          <CharacterActor
            gender="female"
            expression="happy"
            tier={3}
            x={280}
            y={1200}
            height={360}
            speechBubble={
              <div>
                <div style={{fontSize: 24, color: TOKENS.colors.textMuted}}>
                  明日は休みです。
                </div>
                <div style={{fontSize: 26, fontWeight: 900, color: TOKENS.colors.souCyan}}>
                  "Besok libur."
                </div>
              </div>
            }
          />

          {/* Calendar visual */}
          <div
            style={{
              position: 'absolute',
              left: 280,
              top: 650,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              badge="KALENDER"
              title="BESOK — LIBUR ☀"
              subtitle="Hari libur resmi"
              accentColor={TOKENS.colors.souCyan}
              active={true}
              width={340}
              height={140}
            />
          </div>

          {/* Character B on Right with "Sou desu" */}
          {frame >= 888 && (
            <>
              <CharacterActor
                gender="male"
                expression="satisfied"
                tier={4}
                x={800}
                y={1200}
                height={360}
                speechBubble={
                  <div>
                    <div style={{fontSize: 34, fontWeight: 900, color: TOKENS.colors.souCyan}}>
                      そうです。
                    </div>
                    <div style={{fontSize: 22, color: TOKENS.colors.textSecondary}}>
                      Memang begitu.
                    </div>
                  </div>
                }
              />

              {/* Cyan orb travels from B's bubble toward A's calendar */}
              <MeaningConnector
                x1={760}
                y1={980}
                x2={280}
                y2={650}
                active={true}
                color={TOKENS.colors.souCyan}
                strokeWidth={5}
                label="Menunjuk libur"
              />
            </>
          )}
        </>
      )}

      {/* --- SEGMENTS 08 & 09: "Begitu Yang Mana?" & Dialog Reference (1085..1682) --- */}
      {frame >= 1085 && frame < 1682 && (
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
                fontSize: 54,
                color: TOKENS.colors.souCyan,
                textShadow: `0 0 30px ${TOKENS.colors.souCyanGlow}`,
              }}
            >
              BEGITU YANG MANA?
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: TOKENS.fonts.body,
                fontSize: 26,
                fontWeight: 700,
                color: TOKENS.colors.textSecondary,
              }}
            >
              そう menunjuk kembali ke informasi yang barusan disebut!
            </div>
          </div>

          {/* Dialog Reference Box */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 760,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <SituationCard
              badge="PERCAKAPAN"
              title="A: 明日は休みです。 (Besok libur)"
              subtitle="B: そうです。 (Begitu)"
              accentColor={TOKENS.colors.souCyan}
              active={true}
              width={700}
              height={180}
            />
            <div
              style={{
                padding: '10px 24px',
                borderRadius: 20,
                background: 'rgba(85, 221, 245, 0.15)',
                border: `2px solid ${TOKENS.colors.souCyan}`,
                fontFamily: TOKENS.fonts.display,
                fontWeight: 800,
                fontSize: 26,
                color: TOKENS.colors.souCyan,
              }}
            >
              そう ➔ Menunjuk ke "Besok libur"
            </div>
          </div>

          <CharacterActor
            gender="male"
            expression="confident"
            tier={4}
            x={540}
            y={1360}
            height={340}
          />
        </>
      )}

      {/* --- SEGMENTS 10 & 11: Morph: そうですか。 & Question Reaction (1682..2211) --- */}
      {frame >= 1682 && frame < 2211 && (
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
            <JapaneseText
              text="そうですか。"
              size={110}
              translation="Begitukah? / Oh, begitu?"
              highlightPart="ですか"
              highlightColor={TOKENS.colors.directAmber}
            />
            <div
              style={{
                marginTop: 12,
                fontFamily: TOKENS.fonts.body,
                fontSize: 28,
                fontWeight: 800,
                color: TOKENS.colors.directAmber,
              }}
            >
              Memastikan: "Apakah keadaannya seperti itu?"
            </div>
          </div>

          {/* Characters confirming info with dotted connector */}
          <CharacterActor
            gender="male"
            expression="confused"
            tier={3}
            x={320}
            y={1200}
            height={360}
            nameBadge="Penanya"
          />
          <CharacterActor
            gender="female"
            expression="neutral"
            tier={4}
            x={760}
            y={1200}
            height={360}
            nameBadge="Lawan Bicara"
          />

          <MeaningConnector
            x1={320}
            y1={980}
            x2={760}
            y2={980}
            dotted={true}
            color={TOKENS.colors.directAmber}
            strokeWidth={4}
            label="Begitukah? (Konfirmasi keadaan)"
          />
        </>
      )}

      {/* --- SEGMENTS 12 & 13: そう思います & Visual Breakdown (2211..2999) --- */}
      {frame >= 2211 && (
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
                color: TOKENS.colors.conceptViolet,
              }}
            >
              BEDAH STRUKTUR:
            </div>
            {/* Visual Break: そう + 思います */}
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: TOKENS.fonts.jp,
                  fontSize: 72,
                  fontWeight: 900,
                  color: TOKENS.colors.souCyan,
                  textShadow: `0 0 20px ${TOKENS.colors.souCyan}`,
                }}
              >
                そう
              </span>
              <span style={{fontSize: 48, color: TOKENS.colors.textMuted}}>+</span>
              <span
                style={{
                  fontFamily: TOKENS.fonts.jp,
                  fontSize: 72,
                  fontWeight: 900,
                  color: TOKENS.colors.conceptViolet,
                }}
              >
                思います
              </span>
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: TOKENS.fonts.body,
                fontSize: 32,
                fontWeight: 800,
                color: TOKENS.colors.textPrimary,
              }}
            >
              そう思います = "Saya pikir begitu."
            </div>
          </div>

          {/* Relationship Diagram Card */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 880,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              badge="INTI MAKNA TETAP"
              title="そう = seperti itu / begitu"
              subtitle="Pikiran di dalam kepala mengacu pada keadaan tersebut."
              accentColor={TOKENS.colors.conceptViolet}
              active={true}
              width={760}
              height={180}
            />
          </div>

          <CharacterActor
            gender="male"
            expression="satisfied"
            tier={5}
            x={540}
            y={1360}
            height={360}
            thoughtBubble={
              <span style={{fontWeight: 800, color: TOKENS.colors.conceptViolet}}>
                "Saya pikir keadaannya seperti itu!"
              </span>
            }
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
