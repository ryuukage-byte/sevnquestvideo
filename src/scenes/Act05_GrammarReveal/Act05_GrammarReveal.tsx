import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CameraRig} from '../../components/CameraRig';
import {SouCore} from '../../components/SouCore';
import {JapaneseText} from '../../components/JapaneseText';
import {CharacterActor} from '../../components/CharacterActor';
import {SituationCard} from '../../components/SituationCard';
import {GrammarBreakdown} from '../../components/GrammarBreakdown';
import {VoiceCaption} from '../../components/VoiceCaption';
import {CAPTIONS} from '../../timeline/captions';
import {TOKENS} from '../../styles/tokens';

export const Act05_GrammarReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Current caption lookup
  let activeCaption = CAPTIONS['seg-32'];
  if (frame >= 1208) activeCaption = CAPTIONS['seg-37'];
  else if (frame >= 871) activeCaption = CAPTIONS['seg-36'];
  else if (frame >= 557) activeCaption = CAPTIONS['seg-35'];
  else if (frame >= 341) activeCaption = CAPTIONS['seg-34'];
  else if (frame >= 261) activeCaption = CAPTIONS['seg-33'];

  return (
    <CameraRig>
      {/* --- SEGMENTS 32 & 33: Two Characters & Difference Detector (0..341) --- */}
      {frame < 341 && (
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
                fontSize: 44,
                color: TOKENS.colors.souCyan,
                letterSpacing: 1,
              }}
            >
              KESAN SENDIRI VS INFORMASI ORANG LAIN
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: TOKENS.fonts.body,
                fontWeight: 700,
                fontSize: 24,
                color: TOKENS.colors.directAmber,
              }}
            >
              Perhatikan keberadaan huruf [い] yang mengubah sumber informasi!
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 800,
              transform: 'translate(-50%, -50%)',
              width: '100%',
            }}
          >
            <GrammarBreakdown
              mode="oishisou-vs-oishiisou"
              highlightDifference={frame >= 261}
            />
          </div>

          <CharacterActor
            gender="female"
            expression="excited"
            tier={4}
            x={260}
            y={1360}
            height={320}
            nameBadge="👀 KESAN SENDIRI"
          />
          <CharacterActor
            gender="male"
            expression="surprised"
            tier={4}
            x={820}
            y={1360}
            height={320}
            nameBadge="👂 INFORMASI ORANG"
          />
        </>
      )}

      {/* --- SEGMENT 34: Left Fullscreen - Direct Observation (341..557) --- */}
      {frame >= 341 && frame < 557 && (
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
              text="おいしそうです"
              size={110}
              translation="Kelihatannya enak."
              highlightPart="しそう"
              highlightColor={TOKENS.colors.directAmber}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 840,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              badge="KESAN SENDIRI"
              title="👀 Mata → Makanan → Kesan Enak"
              subtitle="Kesan langsung dari hasil pengamatan mata sendiri."
              accentColor={TOKENS.colors.directAmber}
              active={true}
              width={760}
              height={200}
            />
          </div>

          <CharacterActor
            gender="female"
            expression="satisfied"
            tier={4}
            x={540}
            y={1360}
            height={360}
          />
        </>
      )}

      {/* --- SEGMENT 35: Right Fullscreen - Information Transfer ORANG A -> ORANG B (557..871) --- */}
      {frame >= 557 && frame < 871 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 360,
              left: 540,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <JapaneseText
              text="おいしいそうです"
              size={110}
              translation="Katanya enak."
              highlightPart="しいそう"
              highlightColor={TOKENS.colors.hearsayPink}
            />
          </div>

          {/* Transfer Flow Diagram: ORANG A -> INFORMASI -> ORANG B */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 760,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <SituationCard
              badge="SUMBER"
              title="ORANG A"
              subtitle="Pemberi info"
              accentColor={TOKENS.colors.hearsayPink}
              width={240}
              active={true}
            />
            <span style={{fontSize: 32, color: TOKENS.colors.hearsayPink}}>➔</span>
            <SituationCard
              badge="PESAN"
              title="INFORMASI"
              subtitle='"Enak lho!"'
              accentColor={TOKENS.colors.souCyan}
              width={260}
              active={true}
            />
            <span style={{fontSize: 32, color: TOKENS.colors.hearsayPink}}>➔</span>
            <SituationCard
              badge="PENUTUR"
              title="ORANG B"
              subtitle="Penerima kabar"
              accentColor={TOKENS.colors.hearsayPink}
              width={240}
              active={true}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1040,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              badge="INFORMASI DARI ORANG LAIN"
              title="📱 Pembicara menerima info dari luar"
              subtitle="Bukan melihat sendiri, melainkan meneruskan kabar orang lain."
              accentColor={TOKENS.colors.hearsayPink}
              active={true}
              width={760}
              height={140}
            />
          </div>

          <CharacterActor
            gender="male"
            expression="happy"
            tier={4}
            x={540}
            y={1360}
            height={360}
          />
        </>
      )}

      {/* --- SEGMENT 36 & 37: Two Flows Converge & Hearsay Stamp (871..1432) --- */}
      {frame >= 871 && (
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
                color: TOKENS.colors.souCyan,
              }}
            >
              DUA JALUR MENUJU そう
            </div>
          </div>

          {/* Converging flows */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 760,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              gap: 24,
            }}
          >
            <SituationCard
              badge="MATA (KESAN)"
              title="MELIHAT → KESAN"
              subtitle="おいしそう"
              accentColor={TOKENS.colors.directAmber}
              active={true}
              width={420}
            />
            <SituationCard
              badge="TELINGA (INFORMASI)"
              title="MENDENGAR → KABAR"
              subtitle="おいしいそう"
              accentColor={TOKENS.colors.hearsayPink}
              active={true}
              width={420}
            />
          </div>

          {/* Central Convergence Orb */}
          <SouCore x={540} y={1080} size={130} />

          {/* Stamp in seg 37 */}
          {frame >= 1208 && (
            <div
              style={{
                position: 'absolute',
                top: 1220,
                left: 540,
                transform: 'translateX(-50%) rotate(-4deg)',
                backgroundColor: TOKENS.colors.bgDeep,
                border: `3px solid ${TOKENS.colors.hearsayPink}`,
                borderRadius: 20,
                padding: '12px 36px',
                boxShadow: `0 0 30px ${TOKENS.colors.hearsayPinkGlow}`,
              }}
            >
              <span
                style={{
                  fontFamily: TOKENS.fonts.display,
                  fontWeight: 900,
                  fontSize: 36,
                  color: TOKENS.colors.hearsayPink,
                  letterSpacing: 2,
                }}
              >
                KATANYA ENAK [HEARSAY]
              </span>
            </div>
          )}
        </>
      )}

      <VoiceCaption
        text={activeCaption.text}
        highlightText={activeCaption.highlightText}
      />
    </CameraRig>
  );
};
