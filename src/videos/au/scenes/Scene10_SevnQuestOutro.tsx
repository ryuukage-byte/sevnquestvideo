import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, pop, prog, SPRING} from '../../../shared/anim';
import {LogoMark, Pagoda, Wordmark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {PhysicalButton, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

const TIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Scene10_SevnQuestOutro: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Match dissolve entry at f = 0 to 22
  const pDissolve = prog(f, 0, 22);

  // Question reveal at f = 22 to 65: "Belajar Jepang lebih dalam?"
  const pQuestion = pop(f, fps, 22, SPRING);

  // Hero Branding Lockup at f >= 55
  const isHeroPhase = f >= 55;
  const pHero = pop(f, fps, 55, BOUNCY);
  const heroShockwave = prog(f, 55, 30);

  // Parallax UI cards behind brand lockup
  const bgCardFloat = Math.sin(f / 16) * 6;

  // Final CTA button & domain at f >= 85
  const pCta = pop(f, fps, 85, BOUNCY);
  // Simulated tactile button press at f = 118
  const btnPress = prog(f, 118, 4) * (1 - prog(f, 122, 4));

  return (
    <AbsoluteFill style={{opacity: pDissolve, pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="rise" at={0} volume={0.5} />
          <Sfx name="pop" at={22} volume={0.6} />
          <Sfx name="sparkle" at={65} volume={0.7} />
          <Sfx name="chime" at={66} volume={0.65} />
          <Sfx name="click" at={130} volume={0.75} />
        </>
      )}

      {/* ================= PHASE 1: PRODUCT HOOK (f = 22 to 65) ================= */}
      {f < 65 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            opacity: pQuestion,
            transform: `scale(${pQuestion})`,
          }}
        >
          <Pill color={C.gold} size={28} style={{marginBottom: 36}}>
            PETUALANGAN BAHASA JEPANG
          </Pill>
          <span
            style={{
              fontFamily: FONT.display,
              fontSize: 64,
              fontWeight: 900,
              color: C.text,
              textAlign: 'center',
              lineHeight: 1.25,
              textShadow: '0 8px 30px rgba(0,0,0,0.8)',
            }}
          >
            Belajar Jepang{' '}
            <span
              style={{
                color: C.gold,
                textShadow: '0 0 30px rgba(240,190,82,0.5)',
              }}
            >
              lebih dalam?
            </span>
          </span>

          {/* Interactive UI Mockup Card Preview */}
          <div style={{marginTop: 50, width: '100%', maxWidth: 680}}>
            <Surface
              tone="elevated"
              radius={44}
              border={C.gold}
              style={{
                padding: '40px 50px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontFamily: FONT.jp, fontSize: 32, fontWeight: 900, color: C.gold}}>
                  会う · 合う
                </span>
                <Pill color={C.matcha} size={20}>
                  KOTOBA QUEST
                </Pill>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: '78%',
                    background: `linear-gradient(90deg, ${C.matcha} 0%, ${C.gold} 100%)`,
                  }}
                />
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontFamily: FONT.mono, fontSize: 20, color: C.textSecondary}}>
                  EXP: +350 XP
                </span>
                <span style={{fontFamily: FONT.mono, fontSize: 20, color: C.gold}}>
                  LEVEL UP!
                </span>
              </div>
            </Surface>
          </div>
        </div>
      )}

      {/* ================= PHASE 2: HERO BRAND LOCKUP & FINAL CTA (f >= 65) ================= */}
      {isHeroPhase && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Parallax Background UI Cards */}
          <div
            style={{
              position: 'absolute',
              top: 360,
              width: 760,
              height: 480,
              borderRadius: 48,
              border: '1.5px solid rgba(111,147,207,0.15)',
              background: 'rgba(31,36,47,0.4)',
              transform: `translateY(${bgCardFloat}px) scale(0.95)`,
              zIndex: 1,
            }}
          />

          {/* Expanding Shockwave Ring upon Hero Slam */}
          {heroShockwave < 1 && (
            <div
              style={{
                position: 'absolute',
                top: 480,
                width: 400,
                height: 400,
                borderRadius: 200,
                border: `3px solid ${C.gold}`,
                transform: `scale(${1 + heroShockwave * 1.5})`,
                opacity: 1 - heroShockwave,
                zIndex: 2,
              }}
            />
          )}

          {/* Hero Branding Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${pHero})`,
              zIndex: 3,
            }}
          >
            {/* Pagoda Vector */}
            <div style={{marginBottom: 10}}>
              <Pagoda size={190} glow={0.6} />
            </div>

            {/* Compass LogoMark & Wordmark */}
            <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 16}}>
              <LogoMark size={110} glow={0.5} />
              <Wordmark size={90} />
            </div>

            {/* Tagline Pill */}
            <div style={{marginTop: 24}}>
              <Pill color={C.indigoSoft} size={24}>
                KOTOBA · KANJI · BUNPOU · RPG
              </Pill>
            </div>
          </div>

          {/* ================= FINAL CTA (f >= 85) ================= */}
          {f >= 85 && (
            <div
              style={{
                position: 'absolute',
                bottom: 230,
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: pCta,
                transform: `translateY(${(1 - pCta) * 40}px)`,
                zIndex: 4,
              }}
            >
              {/* Tactile 3D Button: Coba SevnQuest. */}
              <PhysicalButton
                label="COBA SEVNQUEST"
                tone="gold"
                w={480}
                h={96}
                fontSize={38}
                press={btnPress}
              />

              {/* Website URL */}
              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 32,
                    fontWeight: 800,
                    color: C.text,
                    letterSpacing: 2,
                  }}
                >
                  www.sevnsoul.site
                </span>
                <div style={{width: 8, height: 8, borderRadius: 4, background: C.gold}} />
              </div>

              {/* 10-Tier Avatar Progression Lineup */}
              <div
                style={{
                  marginTop: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '10px 24px',
                  borderRadius: 30,
                  background: 'rgba(18,21,29,0.7)',
                  border: '1px solid rgba(151,181,224,0.2)',
                  maxWidth: 900,
                }}
              >
                {TIERS.map((tier, idx) => {
                  const pAv = pop(f, fps, 88 + idx * 2, BOUNCY);
                  return (
                    <div
                      key={tier}
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 23,
                        background: '#252c3d',
                        border: `1.5px solid ${tier === 10 ? C.gold : 'rgba(151,181,224,0.3)'}`,
                        overflow: 'hidden',
                        opacity: pAv,
                        transform: `scale(${pAv})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Img
                        src={staticFile(`avatars/male/tier-${tier}.png`)}
                        style={{width: 42, height: 42, objectFit: 'contain'}}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
