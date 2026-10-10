import React from 'react';
import {useCurrentFrame} from 'remotion';
import {animateProg, EASINGS} from '../../animation/presets';
import {CameraRig} from '../../components/CameraRig';
import {JapaneseText} from '../../components/JapaneseText';
import {CharacterActor} from '../../components/CharacterActor';
import {SituationCard} from '../../components/SituationCard';
import {ComparisonStage} from '../../components/ComparisonStage';
import {VoiceCaption} from '../../components/VoiceCaption';
import {CAPTIONS} from '../../timeline/captions';
import {TOKENS} from '../../styles/tokens';

export const Act04_WeatherComparison: React.FC = () => {
  const frame = useCurrentFrame();

  // Current caption lookup
  let activeCaption = CAPTIONS['seg-22'];
  if (frame >= 2490) activeCaption = CAPTIONS['seg-31'];
  else if (frame >= 2210) activeCaption = CAPTIONS['seg-30'];
  else if (frame >= 1844) activeCaption = CAPTIONS['seg-29'];
  else if (frame >= 1417) activeCaption = CAPTIONS['seg-28'];
  else if (frame >= 1347) activeCaption = CAPTIONS['seg-27'];
  else if (frame >= 989) activeCaption = CAPTIONS['seg-26'];
  else if (frame >= 802) activeCaption = CAPTIONS['seg-25'];
  else if (frame >= 533) activeCaption = CAPTIONS['seg-24'];
  else if (frame >= 263) activeCaption = CAPTIONS['seg-23'];

  // Camera pan/zoom
  const skyZoom =
    frame < 802
      ? 1 + animateProg(frame, 0, 800, EASINGS.outExpo) * 0.08
      : frame >= 2210 && frame < 2490
        ? 1.08
        : 1;

  return (
    <CameraRig zoom={skyZoom}>
      {/* City Sky Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: TOKENS.colors.bgSkyCloud,
          opacity: 0.95,
        }}
      />

      {/* Floating Dark Clouds */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 540 + Math.sin(frame * 0.02) * 40,
          transform: 'translateX(-50%)',
          fontSize: 110,
          opacity: 0.45,
          filter: 'blur(2px)',
          userSelect: 'none',
        }}
      >
        ☁️ ⛅ ☁️
      </div>

      {/* --- SEGMENTS 22, 23, 24: Ame ga furisou & 3 Signs (0..802) --- */}
      {frame < 802 && (
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
              text="雨が降りそう"
              size={110}
              translation="Sepertinya akan hujan."
              highlightPart="そう"
              highlightColor={TOKENS.colors.directAmber}
            />
            <div
              style={{
                marginTop: 12,
                padding: '8px 24px',
                borderRadius: 20,
                background: 'rgba(249, 197, 107, 0.15)',
                border: `1.5px solid ${TOKENS.colors.directAmber}`,
                fontFamily: TOKENS.fonts.display,
                fontWeight: 800,
                fontSize: 24,
                color: TOKENS.colors.directAmber,
                display: 'inline-block',
              }}
            >
              observasi (awan mendung) ➔ kesan ➔ そう
            </div>
          </div>

          {/* 3 Signs Container */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 860,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              gap: 20,
              width: 960,
              justifyContent: 'center',
            }}
          >
            <SituationCard
              badge="TANDA 1"
              title="☁️ Langit Mendung"
              subtitle="Cahaya meredup"
              accentColor={TOKENS.colors.directAmber}
              width={290}
              active={true}
            />
            <SituationCard
              badge="TANDA 2"
              title="🌫️ Awan Tebal"
              subtitle="Menggantung rendah"
              accentColor={TOKENS.colors.directAmber}
              width={290}
              active={true}
            />
            <SituationCard
              badge="TANDA 3"
              title="💨 Angin Kencang"
              subtitle="Hawa dingin terasa"
              accentColor={TOKENS.colors.directAmber}
              width={290}
              active={true}
            />
          </div>

          {/* Character Looking Upward at Sky */}
          <CharacterActor
            gender="male"
            expression="confused"
            tier={3}
            x={540}
            y={1360}
            height={360}
            thoughtBubble={
              <span style={{fontWeight: 800, color: TOKENS.colors.directAmber}}>
                "Langitnya gelap banget... sepertinya akan hujan nih."
              </span>
            }
          />
        </>
      )}

      {/* --- SEGMENTS 25..31: Comparison Stage: そう vs よう (802..2591) --- */}
      {frame >= 802 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 760,
              transform: 'translate(-50%, -50%)',
              width: '100%',
            }}
          >
            <ComparisonStage
              centerHeader="そう vs よう"
              leftTitle="そう (KESAN LANGSUNG)"
              leftJapanese="雨が降りそう"
              leftSubtitle="Kesan langsung / tampak dari keadaan"
              rightTitle="よう (PERBANDINGAN)"
              rightJapanese="雨が降るようだ"
              rightSubtitle="Perbandingan / keadaan dianggap seperti sesuatu"
              activeSide={
                frame >= 2210 && frame < 2490
                  ? 'left'
                  : frame >= 1347 && frame < 1844
                    ? 'right'
                    : 'both'
              }
            />
          </div>

          {/* Diagram Info below */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1140,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SituationCard
              title="Perbedaan Titik Tolak (Basis Pengamatan)"
              subtitle="そう berakar dari kesan langsung kasat mata, よう dari pertimbangan & perbandingan situasi menyeluruh."
              accentColor={TOKENS.colors.conceptViolet}
              active={true}
              width={760}
              height={165}
            />
          </div>

          <CharacterActor
            gender="female"
            expression="confident"
            tier={5}
            x={540}
            y={1440}
            height={320}
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
