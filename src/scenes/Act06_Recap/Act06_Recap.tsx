import React from 'react';
import {useCurrentFrame} from 'remotion';
import {animateProg, EASINGS} from '../../animation/presets';
import {CameraRig} from '../../components/CameraRig';
import {SouCore} from '../../components/SouCore';
import {MeaningConnector} from '../../components/MeaningConnector';
import {SituationCard} from '../../components/SituationCard';
import {VoiceCaption} from '../../components/VoiceCaption';
import {CAPTIONS} from '../../timeline/captions';
import {TOKENS} from '../../styles/tokens';

export const Act06_Recap: React.FC = () => {
  const frame = useCurrentFrame();

  // Current caption lookup
  let activeCaption = CAPTIONS['seg-38'];
  if (frame >= 1057) activeCaption = CAPTIONS['seg-45'];
  else if (frame >= 741) activeCaption = CAPTIONS['seg-44'];
  else if (frame >= 652) activeCaption = CAPTIONS['seg-43'];
  else if (frame >= 471) activeCaption = CAPTIONS['seg-42'];
  else if (frame >= 299) activeCaption = CAPTIONS['seg-41'];
  else if (frame >= 214) activeCaption = CAPTIONS['seg-40'];
  else if (frame >= 156) activeCaption = CAPTIONS['seg-39'];

  // Camera zoom during merge
  const recapZoom =
    frame >= 1057
      ? 1 + animateProg(frame - 1057, 0, 300, EASINGS.outExpo) * 0.15
      : 1;

  // Active highlighted card index
  let activeIdx = -1;
  if (frame >= 156 && frame < 214) activeIdx = 0;
  else if (frame >= 214 && frame < 299) activeIdx = 1;
  else if (frame >= 299 && frame < 471) activeIdx = 2;
  else if (frame >= 471 && frame < 652) activeIdx = 3;
  else if (frame >= 652 && frame < 741) activeIdx = 4;

  const recapCards = [
    { jp: 'そうです', id: 'begitu', color: TOKENS.colors.souCyan },
    { jp: 'そうですか', id: 'begitukah?', color: TOKENS.colors.souCyan },
    { jp: 'おいしそう', id: 'kelihatannya enak', color: TOKENS.colors.directAmber },
    { jp: '雨が降りそう', id: 'sepertinya akan hujan', color: TOKENS.colors.directAmber },
    { jp: 'おいしいそうです', id: 'katanya enak', color: TOKENS.colors.hearsayPink },
  ];

  return (
    <CameraRig zoom={recapZoom}>
      {/* Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 540,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            fontFamily: TOKENS.fonts.display,
            fontWeight: 900,
            fontSize: frame >= 741 ? 44 : 52,
            color: frame >= 741 ? TOKENS.colors.conceptViolet : TOKENS.colors.souCyan,
            letterSpacing: 1,
            textShadow: `0 0 25px ${TOKENS.colors.souCyanGlow}`,
          }}
        >
          {frame >= 1057
            ? 'SATU INTI · DUA CABANG KONTEKS'
            : frame >= 741
              ? 'BUKAN SEKADAR 5 ARTI UNTUK DIHAFAL!'
              : '5 CONTOH REKAP'}
        </div>
        {frame >= 1057 && (
          <div
            style={{
              marginTop: 10,
              fontFamily: TOKENS.fonts.body,
              fontSize: 26,
              fontWeight: 700,
              color: TOKENS.colors.textSecondary,
            }}
          >
            そう = "begitu / seperti itu" ➔ Konteks menentukan cara menerjemahkannya
          </div>
        )}
      </div>

      {/* Central SouCore */}
      <SouCore
        x={540}
        y={frame >= 1057 ? 800 : 800}
        size={frame >= 1057 ? 160 : 120}
        labelSize={frame >= 1057 ? 64 : 50}
        glowIntensity={1.3}
      />

      {/* When collapsed (frame >= 1057): Show KESAN vs INFORMASI branches */}
      {frame >= 1057 ? (
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 1100,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left Branch: KESAN */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{fontSize: 32, color: TOKENS.colors.directAmber, fontWeight: 900}}>↖ KESAN</div>
            <SituationCard
              title="KESAN PENGAMATAN"
              subtitle="Tampak langsung di depan mata"
              accentColor={TOKENS.colors.directAmber}
              active={true}
              width={380}
              height={140}
            />
          </div>

          {/* Right Branch: INFORMASI */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{fontSize: 32, color: TOKENS.colors.hearsayPink, fontWeight: 900}}>INFORMASI ↗</div>
            <SituationCard
              title="INFORMASI LUAR"
              subtitle="Didengar / didapat dari pihak lain"
              accentColor={TOKENS.colors.hearsayPink}
              active={true}
              width={380}
              height={140}
            />
          </div>
        </div>
      ) : (
        /* Semicircle / 5 Sequential Cards */
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          {recapCards.map((card, idx) => {
            // Angle in semicircle arc
            const angle = -140 + idx * 70; // -140, -70, 0, 70, 140 deg
            const rad = (angle * Math.PI) / 180;
            const radius = 380;
            const cardX = 540 + Math.sin(rad) * radius;
            const cardY = 880 + Math.cos(rad) * radius * 0.7;

            const isCardActive = activeIdx === idx || frame >= 741;
            const cardVisible = idx <= Math.max(activeIdx, frame >= 741 ? 4 : -1);

            if (!cardVisible) return null;

            return (
              <React.Fragment key={idx}>
                <MeaningConnector
                  x1={540}
                  y1={880}
                  x2={cardX}
                  y2={cardY}
                  color={card.color}
                  strokeWidth={isCardActive ? 4 : 2}
                  active={isCardActive}
                />

                <div
                  style={{
                    position: 'absolute',
                    left: cardX,
                    top: cardY,
                    transform: `translate(-50%, -50%) scale(${isCardActive ? 1.05 : 0.85})`,
                    zIndex: isCardActive ? 40 : 20,
                    opacity: isCardActive ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <SituationCard
                    title={card.jp}
                    subtitle={`→ ${card.id}`}
                    accentColor={card.color}
                    active={isCardActive}
                    width={280}
                    height={130}
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      <VoiceCaption
        text={activeCaption.text}
        highlightText={activeCaption.highlightText}
      />
    </CameraRig>
  );
};
