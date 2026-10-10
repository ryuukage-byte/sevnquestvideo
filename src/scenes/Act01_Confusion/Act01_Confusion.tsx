import React from 'react';
import {useCurrentFrame} from 'remotion';
import {springPop} from '../../animation/springs';
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

export const Act01_Confusion: React.FC = () => {
  const frame = useCurrentFrame();

  // Segment boundaries (frames @ 60 FPS)
  // Seg 1: 0..184 (0.00 - 3.07s)
  // Seg 2: 184..549 (3.07 - 9.15s)
  // Seg 3: 549..899 (9.15 - 14.98s)

  // Segment 1 animations
  const hookScale = springPop(frame, 60, 4, {damping: 10, stiffness: 240, mass: 0.6});
  const hookShake = frame < 30 ? Math.max(0, 1 - frame / 30) * 12 : 0;
  const glitch = frame >= 8 && frame <= 14 ? (Math.random() - 0.5) * 16 : 0;

  // Segment 2: Three cards entry
  const seg2Local = frame - 184;
  const c1Prog = springPop(seg2Local, 60, 0);
  const c2Prog = springPop(seg2Local, 60, 15);
  const c3Prog = springPop(seg2Local, 60, 30);
  const stackProg = animateProg(seg2Local, 280, 70, EASINGS.inOutCubic);

  // Segment 3: Convergence
  const seg3Local = frame - 549;
  const convergeProgress = animateProg(seg3Local, 0, 70, EASINGS.outExpo);
  const coreRevealScale = springPop(seg3Local, 60, 60, {damping: 14, stiffness: 140, mass: 0.9});

  // Current caption
  let activeCaption = CAPTIONS['seg-01'];
  if (frame >= 549) activeCaption = CAPTIONS['seg-03'];
  else if (frame >= 184) activeCaption = CAPTIONS['seg-02'];

  return (
    <CameraRig
      shake={hookShake}
      rotate={frame < 184 ? (1 - Math.min(1, frame / 40)) * -4 : 0}
      zoom={frame < 184 ? 1 + (1 - Math.min(1, frame / 30)) * 0.15 : 1}
    >
      <ParticleField
        count={40}
        type={frame >= 549 && frame < 650 ? 'converge' : 'ambient'}
        convergeTarget={{x: 540, y: 840}}
        convergeProgress={convergeProgress}
      />

      {/* --- SEGMENT 1: Instant Hook (0 - 184 frames) --- */}
      {frame < 184 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 540 + glitch,
              top: 760,
              transform: 'translate(-50%, -50%)',
              zIndex: 40,
            }}
          >
            <JapaneseText
              text="そう"
              size={180}
              highlightColor={TOKENS.colors.souCyan}
              glow={true}
              style={{transform: `scale(${hookScale})`}}
            />
            <div
              style={{
                marginTop: 20,
                fontFamily: TOKENS.fonts.display,
                fontWeight: 800,
                fontSize: 38,
                color: TOKENS.colors.textPrimary,
                textAlign: 'center',
                letterSpacing: 0.5,
                whiteSpace: 'nowrap',
              }}
            >
              Pernah bingung dengan <span style={{color: TOKENS.colors.souCyan, fontWeight: 900}}>そう</span>?
            </div>
          </div>

          {/* Three floating question marks */}
          <div
            style={{
              position: 'absolute',
              left: 320,
              top: 660,
              fontSize: 64,
              color: TOKENS.colors.souCyan,
              fontFamily: TOKENS.fonts.display,
              fontWeight: 900,
              transform: `scale(${hookScale})`,
              filter: `drop-shadow(0 0 16px ${TOKENS.colors.souCyan})`,
            }}
          >
            ?
          </div>
          <div
            style={{
              position: 'absolute',
              left: 740,
              top: 680,
              fontSize: 72,
              color: TOKENS.colors.directAmber,
              fontFamily: TOKENS.fonts.display,
              fontWeight: 900,
              transform: `scale(${hookScale})`,
              filter: `drop-shadow(0 0 16px ${TOKENS.colors.directAmber})`,
            }}
          >
            ?
          </div>
          <div
            style={{
              position: 'absolute',
              left: 530,
              top: 560,
              fontSize: 80,
              color: TOKENS.colors.hearsayPink,
              fontFamily: TOKENS.fonts.display,
              fontWeight: 900,
              transform: `scale(${hookScale})`,
              filter: `drop-shadow(0 0 16px ${TOKENS.colors.hearsayPink})`,
            }}
          >
            ?
          </div>

          {/* Character Surprised */}
          <CharacterActor
            gender="male"
            expression="surprised"
            tier={3}
            x={540}
            y={1340}
            height={380}
            scale={hookScale}
          />
        </>
      )}

      {/* --- SEGMENT 2: Three Meanings Cards (184 - 549 frames) --- */}
      {frame >= 184 && frame < 549 && (
        <>
          {/* Visual Question */}
          <div
            style={{
              position: 'absolute',
              top: 400,
              left: 540,
              transform: 'translateX(-50%)',
              fontFamily: TOKENS.fonts.display,
              fontWeight: 900,
              fontSize: 46,
              color: TOKENS.colors.textPrimary,
              textAlign: 'center',
              lineHeight: 1.3,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              zIndex: 50,
            }}
          >
            Kok satu kata bisa punya<br />
            <span style={{color: TOKENS.colors.directAmber}}>arti berbeda?</span>
          </div>

          {/* Central Anchor */}
          <SouCore x={540} y={700} size={110} scale={1} />

          {/* Tangled connectors */}
          <MeaningConnector
            x1={540}
            y1={700}
            x2={300 + stackProg * 240}
            y2={950 + stackProg * 60}
            color={TOKENS.colors.souCyan}
            strokeWidth={4}
          />
          <MeaningConnector
            x1={540}
            y1={700}
            x2={780 - stackProg * 240}
            y2={950 + stackProg * 75}
            color={TOKENS.colors.directAmber}
            strokeWidth={4}
          />
          <MeaningConnector
            x1={540}
            y1={700}
            x2={540}
            y2={1140 - stackProg * 100}
            color={TOKENS.colors.hearsayPink}
            strokeWidth={4}
          />

          {/* Card 1: BEGITU (Cyan) */}
          <div
            style={{
              position: 'absolute',
              left: 300 + stackProg * 240,
              top: 950 + stackProg * 60,
              transform: `translate(-50%, -50%) scale(${c1Prog * (1 - stackProg * 0.15)}) rotate(${stackProg * -12}deg)`,
              zIndex: 35,
            }}
          >
            <SituationCard
              title="BEGITU"
              subtitle="Menunjuk hal/keadaan"
              accentColor={TOKENS.colors.souCyan}
              active={true}
              width={340}
              height={140}
            />
          </div>

          {/* Card 2: KELIHATANNYA (Amber) */}
          <div
            style={{
              position: 'absolute',
              left: 780 - stackProg * 240,
              top: 950 + stackProg * 75,
              transform: `translate(-50%, -50%) scale(${c2Prog * (1 - stackProg * 0.1)}) rotate(${stackProg * 8}deg)`,
              zIndex: 36,
            }}
          >
            <SituationCard
              title="KELIHATANNYA"
              subtitle="Kesan visual langsung"
              accentColor={TOKENS.colors.directAmber}
              active={true}
              width={360}
              height={140}
            />
          </div>

          {/* Card 3: KATANYA (Pink) */}
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1140 - stackProg * 100,
              transform: `translate(-50%, -50%) scale(${c3Prog * (1 - stackProg * 0.05)}) rotate(${stackProg * 3}deg)`,
              zIndex: 37,
            }}
          >
            <SituationCard
              title="KATANYA"
              subtitle="Kabar dari orang lain"
              accentColor={TOKENS.colors.hearsayPink}
              active={true}
              width={340}
              height={140}
            />
          </div>

          {/* Confused Character */}
          <CharacterActor
            gender="male"
            expression="confused"
            tier={3}
            x={540}
            y={1400}
            height={320}
            scale={1}
          />
        </>
      )}

      {/* --- SEGMENT 3: The One Core Reveal (549 - 899 frames) --- */}
      {frame >= 549 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 480,
              left: 0,
              right: 0,
              opacity: convergeProgress,
              transform: `scale(${coreRevealScale})`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 68,
                color: TOKENS.colors.souCyan,
                textShadow: `0 0 30px ${TOKENS.colors.souCyan}`,
                letterSpacing: 2,
              }}
            >
              そう = BEGITU
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: TOKENS.fonts.body,
                fontWeight: 700,
                fontSize: 32,
                color: TOKENS.colors.textSecondary,
              }}
            >
              atau "seperti itu"
            </div>
          </div>

          {/* Stable Cyan Orb with surrounding concepts */}
          <SouCore
            x={540}
            y={840}
            size={160}
            scale={coreRevealScale}
            glowIntensity={1.2}
            labelSize={64}
          />

          {/* Surrounding labels */}
          <div
            style={{
              position: 'absolute',
              left: 280,
              top: 840,
              transform: 'translate(-50%, -50%)',
              padding: '10px 24px',
              borderRadius: 20,
              background: 'rgba(85, 221, 245, 0.15)',
              border: `2px solid ${TOKENS.colors.souCyan}`,
              fontFamily: TOKENS.fonts.display,
              fontWeight: 900,
              fontSize: 28,
              color: TOKENS.colors.souCyan,
            }}
          >
            "begitu"
          </div>
          <div
            style={{
              position: 'absolute',
              left: 800,
              top: 840,
              transform: 'translate(-50%, -50%)',
              padding: '10px 24px',
              borderRadius: 20,
              background: 'rgba(85, 221, 245, 0.15)',
              border: `2px solid ${TOKENS.colors.souCyan}`,
              fontFamily: TOKENS.fonts.display,
              fontWeight: 900,
              fontSize: 28,
              color: TOKENS.colors.souCyan,
            }}
          >
            "seperti itu"
          </div>

          {/* Transition: Benang merahnya? */}
          {frame >= 760 && (
            <div
              style={{
                position: 'absolute',
                top: 1100,
                left: 540,
                transform: 'translateX(-50%)',
                padding: '14px 36px',
                borderRadius: 24,
                background: 'rgba(249, 197, 107, 0.2)',
                border: `2px solid ${TOKENS.colors.directAmber}`,
                boxShadow: `0 0 25px ${TOKENS.colors.directAmberGlow}`,
                fontFamily: TOKENS.fonts.display,
                fontWeight: 900,
                fontSize: 36,
                color: TOKENS.colors.directAmber,
                textAlign: 'center',
                animation: 'pulse 1s infinite',
                zIndex: 45,
              }}
            >
              Benang merahnya?
            </div>
          )}

          <CharacterActor
            gender="female"
            expression="satisfied"
            tier={4}
            x={540}
            y={1360}
            height={360}
            scale={coreRevealScale}
            thoughtBubble={
              <span style={{fontWeight: 800, color: TOKENS.colors.souCyan}}>
                "Kuncinya cuma satu inti ini!"
              </span>
            }
          />
        </>
      )}

      {/* Synchronized Voice Caption */}
      <VoiceCaption
        text={activeCaption.text}
        highlightText={activeCaption.highlightText}
      />
    </CameraRig>
  );
};
