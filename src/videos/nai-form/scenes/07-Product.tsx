import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {pop, SPRING} from '../../../shared/anim';
import {CheckIcon, PhysicalButton} from '../../../shared/components/ui';
import {LogoMark} from '../../../shared/components/Logo';
import {C, FONT} from '../../../shared/theme';

export const ProductScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Camera choreography across UI exploration
  const camZoom = interpolate(frame, [0, 100, 530, 800, 1100], [0.96, 1.0, 1.04, 1.0, 0.98], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const camY = interpolate(frame, [220, 530, 770, 1100], [0, 20, -20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Practice button press and feedback (frames 670 - 700)
  const buttonPress = interpolate(frame, [670, 685, 700], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const isCorrect = frame >= 685;

  // Multi-form orbit transition (frames 950+)
  const orbitProgress = interpolate(frame, [950, 1060], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pAppEnter = pop(frame, fps, 10, SPRING);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${camZoom}) translateY(${camY}px)`,
        pointerEvents: 'none',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 850,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111,147,207,0.18) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ============================================================ */}
      {/* SEVNQUEST LIVING APPLICATION INTERFACE */}
      {/* ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          width: 920,
          height: 1120,
          borderRadius: 44,
          background: 'linear-gradient(180deg, #181d29 0%, #10141f 100%)',
          border: `2px solid ${C.borderPrimary}`,
          boxShadow: '0 30px 80px rgba(0,0,0,0.85), 0 0 60px rgba(111,147,207,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: (1 - orbitProgress * 0.9) * pAppEnter,
          filter: orbitProgress > 0.1 ? `blur(${orbitProgress * 10}px)` : 'none',
          transform: `scale(${0.92 + 0.08 * pAppEnter - orbitProgress * 0.05})`,
          zIndex: 20,
        }}
      >
        {/* 1. App Topbar */}
        <div
          style={{
            height: 96,
            padding: '0 32px',
            borderBottom: `1.5px solid ${C.borderSubtle}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(25,32,46,0.7)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <LogoMark size={52} glow={0.4} />
            <div style={{fontFamily: FONT.fantasy, fontSize: 32, fontWeight: 900, color: C.text}}>
              SEVN<span style={{color: C.gold}}>QUEST</span>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 999,
                background: 'rgba(240,190,82,0.15)',
                border: `1.5px solid ${C.gold}66`,
                color: C.gold,
                fontSize: 18,
                fontWeight: 800,
                fontFamily: FONT.mono,
              }}
            >
              <span>🔥</span>
              <span>14 HARI</span>
            </div>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                background: 'rgba(79,174,134,0.15)',
                border: `1.5px solid ${C.matcha}66`,
                color: C.matcha,
                fontSize: 18,
                fontWeight: 800,
                fontFamily: FONT.mono,
              }}
            >
              LVL 5 • DESHI
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs */}
        <div
          style={{
            padding: '14px 32px',
            display: 'flex',
            gap: 14,
            borderBottom: `1px solid ${C.borderSubtle}`,
          }}
        >
          <div
            style={{
              padding: '8px 22px',
              borderRadius: 14,
              background: C.gold,
              color: '#101420',
              fontSize: 20,
              fontWeight: 900,
              fontFamily: FONT.mono,
            }}
          >
            KONJUGASI STUDIO
          </div>
          <div
            style={{
              padding: '8px 22px',
              borderRadius: 14,
              color: C.textMuted,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: FONT.mono,
            }}
          >
            KOSAKATA
          </div>
          <div
            style={{
              padding: '8px 22px',
              borderRadius: 14,
              color: C.textMuted,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: FONT.mono,
            }}
          >
            TATA BAHASA
          </div>
        </div>

        {/* 3. Main Studio Workspace */}
        <div
          style={{
            flex: 1,
            padding: '30px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          {/* Active Verb Header Card */}
          <div
            style={{
              padding: '22px 28px',
              borderRadius: 24,
              background: C.inset,
              border: `2px solid ${C.borderPrimary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{fontSize: 18, color: C.textSecondary, fontFamily: FONT.mono}}>
                VERBA PILIHAN • GODAN (KELOMPOK 1)
              </div>
              <div
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 50,
                  fontWeight: 900,
                  color: C.text,
                  marginTop: 4,
                }}
              >
                飲む <span style={{fontSize: 26, color: C.textMuted}}>(のむ • Meminum)</span>
              </div>
            </div>

            <div
              style={{
                padding: '10px 22px',
                borderRadius: 16,
                background: `${C.gold}22`,
                border: `2px solid ${C.gold}`,
                color: C.gold,
                fontSize: 24,
                fontWeight: 900,
                fontFamily: FONT.jp,
              }}
            >
              ない形 (Bentuk NAI)
            </div>
          </div>

          {/* Pattern Rule Breakdown */}
          <div
            style={{
              padding: '22px 28px',
              borderRadius: 22,
              background: 'rgba(21,28,44,0.85)',
              border: `1.5px solid ${C.indigoSoft}66`,
            }}
          >
            <div style={{fontSize: 18, fontWeight: 800, color: C.indigoSoft, fontFamily: FONT.mono}}>
              POLA PERUBAHAN SECARA VISUAL:
            </div>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: 30,
                fontWeight: 900,
                fontFamily: FONT.jp,
                color: C.text,
              }}
            >
              <span>飲</span>
              <span style={{color: C.textMuted}}>む (mu)</span>
              <span style={{color: C.gold}}>➔</span>
              <span style={{color: C.matcha}}>ま (ma)</span>
              <span style={{color: C.gold}}>+ ない</span>
              <span style={{fontSize: 28, color: C.goldSoft}}>➔ 飲まない</span>
            </div>
          </div>

          {/* Interactive Practice */}
          <div
            style={{
              padding: '26px 28px',
              borderRadius: 24,
              background: C.card,
              border: `2px solid ${isCorrect ? C.matcha : C.borderSubtle}`,
              boxShadow: isCorrect ? `0 0 40px rgba(79,174,134,0.3)` : 'none',
            }}
          >
            <div style={{fontSize: 18, fontWeight: 800, color: C.textSecondary, marginBottom: 8}}>
              LATIHAN INTERAKTIF LANGSUNG:
            </div>
            <div style={{fontSize: 28, fontWeight: 900, color: C.text, fontFamily: FONT.jp}}>
              Ubah kata kerja: <strong style={{color: C.gold}}>話す (hanasu)</strong> ke bentuk NAI!
            </div>

            <div style={{display: 'flex', gap: 16, marginTop: 20}}>
              <PhysicalButton
                label={
                  <span style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    {isCorrect && <CheckIcon size={26} color="#06241a" />}
                    話さない (hanasanai)
                  </span>
                }
                tone={isCorrect ? 'green' : 'indigo'}
                w={450}
                h={66}
                fontSize={24}
                press={buttonPress}
              />
              <PhysicalButton
                label="話しない"
                tone="ghost"
                w={350}
                h={66}
                fontSize={24}
              />
            </div>

            {isCorrect && (
              <div
                style={{
                  marginTop: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: C.matcha,
                  fontSize: 20,
                  fontWeight: 900,
                  fontFamily: FONT.mono,
                }}
              >
                <CheckIcon size={26} color={C.matcha} />
                <span>BENAR! +20 EXP DIPEROLEH · POLA GODAN TERVERIFIKASI</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ORBITAL MULTI-FORM CARD SYSTEM (Frame 950+) */}
      {/* ============================================================ */}
      {orbitProgress > 0.01 && (
        <div
          style={{
            position: 'absolute',
            top: 720,
            left: 540,
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: 540,
            pointerEvents: 'none',
            opacity: orbitProgress,
            zIndex: 40,
          }}
        >
          {/* Center Master Card: 食べる */}
          <div
            style={{
              position: 'absolute',
              left: 450,
              top: 270,
              transform: 'translate(-50%, -50%)',
              padding: '28px 48px',
              borderRadius: 36,
              background: 'linear-gradient(180deg, #2a344a 0%, #151a26 100%)',
              border: `3px solid ${C.gold}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.85), 0 0 50px rgba(240,190,82,0.5)',
              textAlign: 'center',
              zIndex: 20,
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 72, fontWeight: 900, color: C.text}}>
              食べる
            </div>
            <div style={{fontSize: 22, color: C.gold, fontFamily: FONT.mono, fontWeight: 800}}>
              AKAR KATA KERJA
            </div>
          </div>

          {/* SATELLITES */}
          {/* Nai Form */}
          <div
            style={{
              position: 'absolute',
              left: 450,
              top: 70,
              transform: 'translate(-50%, -50%)',
              padding: '18px 36px',
              borderRadius: 24,
              background: C.card,
              border: `2px solid ${C.gold}`,
              boxShadow: '0 10px 30px rgba(240,190,82,0.5)',
              textAlign: 'center',
              zIndex: 25,
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 40, fontWeight: 900, color: C.gold}}>
              食べない
            </div>
            <div style={{fontSize: 16, color: C.textSecondary, fontFamily: FONT.mono}}>
              BENTUK NAI (NEGATIF)
            </div>
          </div>

          {/* Masu Form */}
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 270,
              transform: 'translate(-50%, -50%)',
              padding: '16px 30px',
              borderRadius: 22,
              background: C.card,
              border: `1.5px solid ${C.borderSubtle}`,
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 34, fontWeight: 900, color: C.text}}>
              食べます
            </div>
            <div style={{fontSize: 15, color: C.textMuted, fontFamily: FONT.mono}}>
              BENTUK MASU
            </div>
          </div>

          {/* Ta Form */}
          <div
            style={{
              position: 'absolute',
              left: 750,
              top: 270,
              transform: 'translate(-50%, -50%)',
              padding: '16px 30px',
              borderRadius: 22,
              background: C.card,
              border: `1.5px solid ${C.borderSubtle}`,
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 34, fontWeight: 900, color: C.text}}>
              食べた
            </div>
            <div style={{fontSize: 15, color: C.textMuted, fontFamily: FONT.mono}}>
              BENTUK TA (LAMPAU)
            </div>
          </div>

          {/* Te Form */}
          <div
            style={{
              position: 'absolute',
              left: 450,
              top: 470,
              transform: 'translate(-50%, -50%)',
              padding: '16px 30px',
              borderRadius: 22,
              background: C.card,
              border: `1.5px solid ${C.borderSubtle}`,
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 34, fontWeight: 900, color: C.text}}>
              食べて
            </div>
            <div style={{fontSize: 15, color: C.textMuted, fontFamily: FONT.mono}}>
              BENTUK TE (SAMBUNG)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
