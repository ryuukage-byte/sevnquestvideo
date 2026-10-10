import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {EASE_IO, pop, prog, SPRING} from '../../../shared/anim';
import {Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const GroupThreeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Header entrance
  const pHeader = pop(frame, fps, 10, SPRING);

  // Card 1: する -> しない (suru morph at frame 238)
  const pSuruEnter = pop(frame, fps, 30, SPRING);
  const pSuruMorph = prog(frame, 238, 24, EASE_IO);

  // Card 2: 来る -> 来ない (kuru morph at frame 390)
  const pKuruEnter = pop(frame, fps, 60, SPRING);
  const pKuruMorph = prog(frame, 390, 24, EASE_IO);

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
      {/* Background Fuji Purple Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 850,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,167,234,0.18) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ============================================================ */}
      {/* HEADER BANNER */}
      {/* ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${0.9 + 0.1 * pHeader})`,
          opacity: pHeader,
        }}
      >
        <div
          style={{
            padding: '10px 28px',
            borderRadius: 999,
            background: `${C.fuji}22`,
            border: `2px solid ${C.fuji}`,
            color: C.fuji,
            fontFamily: FONT.mono,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 2,
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          }}
        >
          KATA KERJA TIDAK BERATURAN (HANYA 2 KATA!)
        </div>

        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 40,
            fontWeight: 900,
            color: C.text,
            letterSpacing: -0.5,
          }}
        >
          KELOMPOK 3 · 不規則動詞 (IRREGULAR)
        </div>
      </div>

      {/* ============================================================ */}
      {/* DUAL CARDS FOR THE 2 IRREGULAR VERBS */}
      {/* ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 550,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
        }}
      >
        {/* Card 1: する -> しない */}
        <div
          style={{
            transform: `scale(${0.9 + 0.1 * pSuruEnter})`,
            opacity: pSuruEnter,
          }}
        >
          <Surface
            tone="elevated"
            radius={36}
            border={pSuruMorph > 0.5 ? C.gold : C.fuji}
            style={{
              width: 880,
              padding: '36px 44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow:
                pSuruMorph > 0.5
                  ? `0 24px 60px rgba(0,0,0,0.8), 0 0 35px ${C.gold}44`
                  : '0 20px 50px rgba(0,0,0,0.7)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 22,
                  color: C.textSecondary,
                  letterSpacing: 1.5,
                }}
              >
                01. KATA KERJA: SURU (MELAKUKAN)
              </div>
              <div
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 88,
                  fontWeight: 900,
                  marginTop: 6,
                  color: pSuruMorph > 0.5 ? C.gold : C.text,
                  textShadow: pSuruMorph > 0.5 ? `0 0 35px ${C.gold}` : 'none',
                }}
              >
                {pSuruMorph > 0.5 ? 'しない' : 'する'}
              </div>
            </div>

            <div style={{textAlign: 'right'}}>
              <div
                style={{
                  padding: '10px 24px',
                  borderRadius: 16,
                  background: pSuruMorph > 0.5 ? `${C.gold}22` : C.card,
                  border: `2px solid ${pSuruMorph > 0.5 ? C.gold : C.borderSubtle}`,
                  color: pSuruMorph > 0.5 ? C.gold : C.textSecondary,
                  fontFamily: FONT.mono,
                  fontSize: 24,
                  fontWeight: 900,
                }}
              >
                {pSuruMorph > 0.5 ? 'SHINAI (TIDAK MELAKUKAN)' : 'SURU ➔ SHINAI'}
              </div>
              <div style={{marginTop: 8, fontSize: 18, color: C.textMuted, fontFamily: FONT.mono}}>
                Bukan suranai ❌
              </div>
            </div>
          </Surface>
        </div>

        {/* Card 2: 来る -> 来ない (Kanji reading shift: ku -> ko) */}
        <div
          style={{
            transform: `scale(${0.9 + 0.1 * pKuruEnter})`,
            opacity: pKuruEnter,
          }}
        >
          <Surface
            tone="elevated"
            radius={36}
            border={pKuruMorph > 0.5 ? C.gold : C.fuji}
            style={{
              width: 880,
              padding: '36px 44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow:
                pKuruMorph > 0.5
                  ? `0 24px 60px rgba(0,0,0,0.8), 0 0 35px ${C.gold}44`
                  : '0 20px 50px rgba(0,0,0,0.7)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 22,
                  color: C.textSecondary,
                  letterSpacing: 1.5,
                }}
              >
                02. KATA KERJA: KURU (DATANG)
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  marginTop: 6,
                }}
              >
                <ruby
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 88,
                    fontWeight: 900,
                    color: C.text,
                  }}
                >
                  来
                  <rt
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      color: pKuruMorph > 0.5 ? C.gold : C.matcha,
                      letterSpacing: 2,
                    }}
                  >
                    {pKuruMorph > 0.5 ? 'こ' : 'く'}
                  </rt>
                </ruby>

                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 88,
                    fontWeight: 900,
                    color: pKuruMorph > 0.5 ? C.gold : C.text,
                    textShadow: pKuruMorph > 0.5 ? `0 0 35px ${C.gold}` : 'none',
                  }}
                >
                  {pKuruMorph > 0.5 ? 'ない' : 'る'}
                </span>
              </div>
            </div>

            <div style={{textAlign: 'right'}}>
              <div
                style={{
                  padding: '10px 24px',
                  borderRadius: 16,
                  background: pKuruMorph > 0.5 ? `${C.gold}22` : C.card,
                  border: `2px solid ${pKuruMorph > 0.5 ? C.gold : C.borderSubtle}`,
                  color: pKuruMorph > 0.5 ? C.gold : C.textSecondary,
                  fontFamily: FONT.mono,
                  fontSize: 24,
                  fontWeight: 900,
                }}
              >
                {pKuruMorph > 0.5 ? 'KONAI (TIDAK DATANG)' : 'KURU ➔ KONAI'}
              </div>
              <div style={{marginTop: 8, fontSize: 18, color: C.textMuted, fontFamily: FONT.mono}}>
                Kanji sama, bacaan: <strong style={{color: C.gold}}>ku ➔ ko</strong>
              </div>
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
};
