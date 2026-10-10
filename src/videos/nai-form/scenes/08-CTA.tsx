import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {BOUNCY, EASE_IO, pop, prog, SPRING} from '../../../shared/anim';
import {ArrowRight, PhysicalButton, Stamp, Surface} from '../../../shared/components/ui';
import {LogoMark, Wordmark} from '../../../shared/components/Logo';
import {C, FONT} from '../../../shared/theme';

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Phase 1: Review Examples (Frames 0 - 200)
  const pRecallEnter = pop(frame, fps, 10, SPRING);
  const pRecallExit = prog(frame, 180, 30, EASE_IO);

  // Phase 2: Master Brand & CTA (Frames 180+)
  const pCtaEnter = pop(frame, fps, 190, SPRING);
  const pStamp = pop(frame, fps, 300, BOUNCY);

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
          background: 'radial-gradient(circle, rgba(240,190,82,0.22) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ============================================================ */}
      {/* PHASE 1: RECALL LEARNED CONJUGATIONS (Frames 0 - 200) */}
      {/* ============================================================ */}
      {frame < 220 && (
        <div
          style={{
            position: 'absolute',
            top: 480,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            transform: `scale(${0.9 + 0.1 * pRecallEnter}) translateY(${-pRecallExit * 60}px)`,
            opacity: pRecallEnter * (1 - pRecallExit),
          }}
        >
          <div
            style={{
              fontFamily: FONT.display,
              fontSize: 44,
              fontWeight: 900,
              color: C.gold,
              letterSpacing: -0.5,
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            POLA YANG SUDAH KAMU KUASAI:
          </div>

          {/* Example 1: 書く ➔ 書かない */}
          <Surface
            tone="elevated"
            radius={32}
            border={C.gold}
            style={{
              width: 860,
              padding: '28px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(240,190,82,0.25)',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 56, fontWeight: 900, color: C.text}}>
              書く ➔ <span style={{color: C.gold}}>書かない</span>
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 24, color: C.textSecondary, fontWeight: 700}}>
              kaku ➔ kakanai
            </div>
          </Surface>

          {/* Example 2: 食べる ➔ 食べない */}
          <Surface
            tone="elevated"
            radius={32}
            border={C.matcha}
            style={{
              width: 860,
              padding: '28px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(79,174,134,0.25)',
            }}
          >
            <div style={{fontFamily: FONT.jp, fontSize: 56, fontWeight: 900, color: C.text}}>
              食べる ➔ <span style={{color: C.gold}}>食べない</span>
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 24, color: C.textSecondary, fontWeight: 700}}>
              taberu ➔ tabenai
            </div>
          </Surface>
        </div>
      )}

      {/* ============================================================ */}
      {/* PHASE 2: MASTER BRAND RESOLUTION & FINAL CTA (Frames 180+) */}
      {/* ============================================================ */}
      {frame >= 170 && (
        <div
          style={{
            position: 'absolute',
            top: 360,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${0.92 + 0.08 * pCtaEnter})`,
            opacity: pCtaEnter,
          }}
        >
          {/* Master SevnQuest Card */}
          <Surface
            tone="elevated"
            radius={44}
            border={C.gold}
            style={{
              width: 880,
              padding: '48px 44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 30px 90px rgba(0,0,0,0.85), 0 0 50px rgba(240,190,82,0.35)',
              position: 'relative',
            }}
          >
            {/* LogoMark & Wordmark */}
            <div style={{marginBottom: 16}}>
              <LogoMark size={130} glow={0.5} />
            </div>

            <Wordmark size={74} />

            {/* 3 Main Statements as requested */}
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 42,
                  fontWeight: 900,
                  color: C.gold,
                  letterSpacing: 2,
                  textShadow: '0 0 30px rgba(240,190,82,0.6)',
                }}
              >
                LIHAT POLANYA.
              </div>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 42,
                  fontWeight: 900,
                  color: C.text,
                  letterSpacing: 2,
                }}
              >
                COBA KONJUGASINYA.
              </div>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontSize: 42,
                  fontWeight: 900,
                  color: '#38bdf8',
                  letterSpacing: 2,
                  textShadow: '0 0 30px rgba(56,189,248,0.5)',
                }}
              >
                LATIH KEMAMPUAN BAHASA JEPANGMU.
              </div>
            </div>

            {/* CTA Button: "Coba sekarang di SevnQuest." */}
            <div style={{marginTop: 40}}>
              <PhysicalButton
                label={
                  <span style={{display: 'flex', alignItems: 'center', gap: 14}}>
                    <span>Coba sekarang di SevnQuest.</span>
                    <ArrowRight size={32} color="#3a2a05" />
                  </span>
                }
                tone="gold"
                w={640}
                h={78}
                fontSize={28}
              />
            </div>

            {/* Verified URL Badge */}
            <div
              style={{
                marginTop: 20,
                fontFamily: FONT.mono,
                fontSize: 24,
                color: C.textSecondary,
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              sevnquest.sevnsoul.site
            </div>

            {/* Hanko Mastered Stamp */}
            {pStamp > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  top: 36,
                  right: 44,
                  transform: `scale(${pStamp}) rotate(-12deg)`,
                  opacity: pStamp,
                }}
              >
                <Stamp text="習得 · MASTERED" color={C.hanko} size={32} rotate={-12} />
              </div>
            )}
          </Surface>
        </div>
      )}
    </div>
  );
};
