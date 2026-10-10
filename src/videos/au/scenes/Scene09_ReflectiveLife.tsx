import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {C, FONT} from '../../../shared/theme';

// Partikel lembut melayang di malam washi
const PARTICLES = [
  {x: 180, y: 500, vx: 0.3, vy: -0.4, r: 4, op: 0.3},
  {x: 820, y: 720, vx: -0.2, vy: -0.5, r: 6, op: 0.4},
  {x: 320, y: 1100, vx: 0.4, vy: -0.3, r: 5, op: 0.25},
  {x: 740, y: 1350, vx: -0.3, vy: -0.4, r: 4, op: 0.35},
  {x: 500, y: 1550, vx: 0.2, vy: -0.6, r: 7, op: 0.2},
];

export const Scene09_ReflectiveLife: React.FC<{dur: number; sfx?: boolean}> = ({dur, sfx = true}) => {
  const f = useCurrentFrame();

  // Transisi masuk yang tenang (slow dissolve over 24 frames)
  const fadeIn = interpolate(f, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // 1. Teks Pembuka Refleksi (f = 24 to 106)
  // “Mungkin ini juga berlaku dalam hidup.”
  // Masuk pelan: opacity + slight vertical drift (tanpa bounce)
  const pIntroText = interpolate(f, [24, 56], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  const introY = interpolate(f, [24, 56], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const introFadeOut = interpolate(f, [90, 106], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Figur yang datang dan pergi (Flow f = 106 to 227)
  const isPassingPhase = f >= 106 && f < 240;

  // Tag "会う — bertemu" (f = 106 to 158)
  const pTagAu = interpolate(f, [106, 126], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tag "合う — cocok" (f = 158 to 227)
  const pTagAi = interpolate(f, [158, 178], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Passing travelers across center:
  // Traveler 1: floats from top-left diagonally down right (crosses around f = 135)
  const t1 = (f - 106) / 100;
  const t1X = -150 + t1 * 1380;
  const t1Y = 700 + Math.sin(t1 * Math.PI) * 160;

  // Traveler 2: floats from right towards center, stays near, then drifts away at f >= 158
  const t2Progress = (f - 115) / 100;
  const t2Separation = f >= 158 ? (f - 158) * 4.5 : 0;
  const t2X = 950 - Math.min(1, t2Progress) * 420 + t2Separation;
  const t2Y = 960 + Math.sin(t2Progress * 4) * 20;

  // Traveler 3: passes from bottom-left to top-right
  const t3 = (f - 130) / 100;
  const t3X = -100 + t3 * 1300;
  const t3Y = 1250 - t3 * 350;

  // 3. Karakter Utama di Tengah
  // Bernapas tenang, scale drift sangat lambat
  const centerScale = interpolate(f, [0, dur], [1.0, 1.04], {
    easing: Easing.inOut(Easing.quad),
  });
  const centerBreath = Math.sin(f / 24) * 4;

  // 4. Frasa Filosofis Akhir (f = 243 to 384)
  // Line 1: "Tidak semua yang datang…" (f = 250)
  const pLine1 = interpolate(f, [250, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const line1Y = interpolate(f, [250, 280], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Line 2: "ditakdirkan untuk cocok." (f = 315)
  const pLine2 = interpolate(f, [315, 345], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const line2Y = interpolate(f, [315, 345], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn,
        pointerEvents: 'none',
      }}
    >
      {sfx && (
        <>
          <Sfx name="descend" at={158} volume={0.35} />
        </>
      )}

      {/* Floating Gentle Light Dust */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x + Math.sin(f / 30 + i) * 20,
            top: ((p.y + f * p.vy) % 1920 + 1920) % 1920,
            width: p.r,
            height: p.r,
            borderRadius: p.r / 2,
            background: C.goldSoft,
            opacity: p.op,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* 1. Teks Refleksi Awal (f < 106) */}
      {f < 106 && (
        <div
          style={{
            position: 'absolute',
            top: 480,
            left: 80,
            right: 80,
            textAlign: 'center',
            opacity: pIntroText * introFadeOut,
            transform: `translateY(${introY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT.body,
              fontSize: 50,
              fontWeight: 600,
              fontStyle: 'italic',
              color: C.text,
              lineHeight: 1.4,
              letterSpacing: 1.5,
              textShadow: '0 4px 24px rgba(0,0,0,0.8)',
            }}
          >
            &ldquo;Mungkin ini juga berlaku{' '}
            <span style={{color: C.goldSoft, fontStyle: 'normal', fontWeight: 700}}>
              dalam hidup.
            </span>
            &rdquo;
          </span>
        </div>
      )}

      {/* 2. Visual Karakter Tengah & Figur-figur yang Melintas */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${centerScale})`,
        }}
      >
        {/* Karakter Utama (Avatar Tier-1) di Tengah */}
        <div
          style={{
            position: 'absolute',
            top: 860,
            transform: `translateY(${centerBreath}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Subtle serene halo */}
          <div
            style={{
              position: 'absolute',
              width: 220,
              height: 220,
              borderRadius: 110,
              background: 'radial-gradient(circle, rgba(111,147,207,0.18) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              width: 170,
              height: 170,
              borderRadius: 85,
              border: `2px solid rgba(151,181,224,0.4)`,
              background: 'radial-gradient(circle at 35% 35%, #2a3345, #121620)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Img
              src={staticFile('avatars/male/tier-1.png')}
              style={{width: 150, height: 150, objectFit: 'contain'}}
            />
          </div>
        </div>

        {/* Travelers Flowing Past (f >= 106 and < 240) */}
        {isPassingPhase && (
          <>
            {/* Traveler 1 (Passing by) */}
            <div
              style={{
                position: 'absolute',
                left: t1X,
                top: t1Y,
                width: 90,
                height: 90,
                borderRadius: 45,
                border: '1.5px solid rgba(151,181,224,0.3)',
                background: 'rgba(38,49,74,0.5)',
                overflow: 'hidden',
                opacity: 0.6,
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
              }}
            >
              <Img
                src={staticFile('avatars/male/tier-2.png')}
                style={{width: 80, height: 80, objectFit: 'contain', opacity: 0.75}}
              />
            </div>

            {/* Traveler 2 (Near center, then separates) */}
            <div
              style={{
                position: 'absolute',
                left: t2X,
                top: t2Y,
                width: 100,
                height: 100,
                borderRadius: 50,
                border: `1.5px solid ${f >= 158 ? 'rgba(151,181,224,0.2)' : 'rgba(79,174,134,0.4)'}`,
                background: 'rgba(38,49,74,0.6)',
                overflow: 'hidden',
                opacity: f >= 158 ? Math.max(0.15, 0.7 - (f - 158) * 0.01) : 0.7,
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                transition: 'opacity 0.2s ease',
              }}
            >
              <Img
                src={staticFile('avatars/male/tier-3.png')}
                style={{width: 90, height: 90, objectFit: 'contain'}}
              />
            </div>

            {/* Traveler 3 */}
            <div
              style={{
                position: 'absolute',
                left: t3X,
                top: t3Y,
                width: 85,
                height: 85,
                borderRadius: 45,
                border: '1.5px solid rgba(151,181,224,0.25)',
                background: 'rgba(38,49,74,0.4)',
                overflow: 'hidden',
                opacity: 0.5,
              }}
            >
              <Img
                src={staticFile('avatars/male/tier-5.png')}
                style={{width: 75, height: 75, objectFit: 'contain', opacity: 0.7}}
              />
            </div>

            {/* Phase Subtitle Tags */}
            <div
              style={{
                position: 'absolute',
                top: 420,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {f < 158 && (
                <div style={{opacity: pTagAu}}>
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 44,
                      fontWeight: 700,
                      color: C.goldSoft,
                      letterSpacing: 2,
                    }}
                  >
                    <span style={{fontFamily: FONT.jp, fontWeight: 900, color: C.gold}}>会う</span> — bertemu
                  </span>
                </div>
              )}
              {f >= 158 && (
                <div style={{opacity: pTagAi}}>
                  <span
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 44,
                      fontWeight: 700,
                      color: C.textSecondary,
                      letterSpacing: 2,
                    }}
                  >
                    <span style={{fontFamily: FONT.jp, fontWeight: 900, color: C.matcha}}>合う</span> — cocok
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 3. Frasa Filosofis Akhir: Reveal per Frasa (f >= 243) */}
      {f >= 243 && (
        <div
          style={{
            position: 'absolute',
            top: 460,
            left: 60,
            right: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 20,
          }}
        >
          {/* Line 1: Tidak semua yang datang… */}
          <div
            style={{
              opacity: pLine1,
              transform: `translateY(${line1Y}px)`,
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 54,
                fontWeight: 700,
                color: C.text,
                letterSpacing: 1.5,
                lineHeight: 1.3,
                textShadow: '0 4px 20px rgba(0,0,0,0.85)',
              }}
            >
              Tidak semua yang{' '}
              <span
                style={{
                  color: C.goldSoft,
                  fontWeight: 900,
                  textShadow: '0 0 24px rgba(240,190,82,0.4)',
                }}
              >
                datang…
              </span>
            </span>
          </div>

          {/* Line 2: ditakdirkan untuk cocok. */}
          {f >= 315 && (
            <div
              style={{
                opacity: pLine2,
                transform: `translateY(${line2Y}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 58,
                  fontWeight: 800,
                  color: C.text,
                  letterSpacing: 2,
                  lineHeight: 1.3,
                  textShadow: '0 4px 24px rgba(0,0,0,0.85)',
                }}
              >
                ditakdirkan untuk{' '}
                <span
                  style={{
                    color: C.matcha,
                    fontWeight: 900,
                    textShadow: '0 0 28px rgba(79,174,134,0.5)',
                  }}
                >
                  cocok.
                </span>
              </span>
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
