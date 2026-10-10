import React from 'react';
import {interpolate, spring} from 'remotion';
import {C, FONT} from '../../../shared/theme';

export interface KanaShiftProps {
  frame: number;
  fps: number;
  startFrame: number;
  kanjiStem: string; // e.g. "書"
  uKana: string; // e.g. "く"
  aKana: string; // e.g. "か"
  romajiU: string; // e.g. "ku"
  romajiA: string; // e.g. "ka"
  englishWord: string; // e.g. "menulis"
  isException?: boolean; // If true: triggers U -> WA bounce
  exceptionKana?: string; // e.g. "わ"
  exceptionRomaji?: string; // e.g. "wa"
}

/**
 * Kana Shift Mechanical Typography Rail:
 * Shows the vowel transformation from U-row (う段) to A-row (あ段)
 * with kana matrix slider, rail tracks, and exception bounce.
 */
export const KanaMorphRail: React.FC<KanaShiftProps> = ({
  frame,
  fps,
  startFrame,
  kanjiStem,
  uKana,
  aKana,
  romajiU,
  romajiA,
  englishWord,
  isException = false,
  exceptionKana = 'わ',
  exceptionRomaji = 'wa',
}) => {
  // Step 1: Base verb appears
  const enterSpring =
    frame < startFrame
      ? 0
      : spring({
          frame: frame - startFrame,
          fps,
          config: {damping: 15, stiffness: 150},
        });

  // Step 2: Kana shift begins along rail
  const shiftStart = startFrame + 30;
  const shiftProg = interpolate(
    frame,
    [shiftStart, shiftStart + 35],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  // If exception, U tries to move to A, bounces violently at frame shiftStart + 22, then falls to WA!
  const bounceStart = shiftStart + 24;
  const isBouncing = isException && frame >= bounceStart;

  const bounceSpring =
    !isBouncing
      ? 0
      : spring({
          frame: frame - bounceStart,
          fps,
          config: {damping: 9, stiffness: 180, mass: 0.7}, // bouncy recoil
        });

  // Target Kana: either A-dan or WA (exception)
  const finalKana = isException ? (bounceSpring > 0.6 ? exceptionKana : aKana) : aKana;
  const finalRomaji = isException ? (bounceSpring > 0.6 ? exceptionRomaji : romajiA) : romajiA;

  // New Suffix "ない" appears after transformation
  const naiStart = shiftStart + 40;
  const naiSpring =
    frame < naiStart
      ? 0
      : spring({
          frame: frame - naiStart,
          fps,
          config: {damping: 14, stiffness: 170},
        });

  return (
    <div
      style={{
        position: 'relative',
        width: 920,
        padding: '36px 40px',
        borderRadius: 36,
        background: `linear-gradient(180deg, #1b212f 0%, ${C.card} 100%)`,
        border: `2px solid ${isException ? (isBouncing ? C.hanko : C.gold) : C.indigoSoft}66`,
        boxShadow: isBouncing
          ? `0 24px 60px rgba(0,0,0,0.7), 0 0 50px rgba(226,85,91,0.35)`
          : `0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(111,147,207,0.25)`,
        opacity: enterSpring,
        transform: `scale(${enterSpring})`,
        fontFamily: FONT.body,
      }}
    >
      {/* Header Tag / Meaning */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px',
            borderRadius: 999,
            background: `${C.indigo}22`,
            border: `1.5px solid ${C.indigo}66`,
            color: C.indigoSoft,
            fontSize: 20,
            fontWeight: 800,
            fontFamily: FONT.mono,
            letterSpacing: 1.5,
          }}
        >
          <span>五段動詞 (GODAN)</span>
          <span style={{opacity: 0.5}}>•</span>
          <span>{englishWord}</span>
        </div>

        {isException && isBouncing && (
          <div
            style={{
              padding: '6px 18px',
              borderRadius: 999,
              background: `${C.hanko}25`,
              border: `1.5px solid ${C.hanko}`,
              color: C.hanko,
              fontSize: 20,
              fontWeight: 800,
              fontFamily: FONT.mono,
              letterSpacing: 1.2,
              animation: 'pulse 1s infinite',
            }}
          >
            ⚠️ PENGECUALIAN KHUSUS
          </div>
        )}
      </div>

      {/* Main Verb Display Area */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          minHeight: 140,
        }}
      >
        {/* Kanji Stem */}
        <span
          style={{
            fontFamily: FONT.jp,
            fontSize: 104,
            fontWeight: 900,
            color: C.text,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          {kanjiStem}
        </span>

        {/* Kana Rail Slider Mechanism */}
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 100,
            height: 120,
            padding: '0 16px',
            borderRadius: 24,
            background: C.inset,
            border: `2px solid ${isException && isBouncing ? C.hanko : C.gold}88`,
            boxShadow: `inset 0 4px 12px rgba(0,0,0,0.8)`,
          }}
        >
          {shiftProg < 0.95 ? (
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 94,
                fontWeight: 900,
                color: C.textSecondary,
                opacity: 1 - shiftProg,
                transform: `translateY(${shiftProg * -40}px)`,
              }}
            >
              {uKana}
            </span>
          ) : (
            <span
              style={{
                fontFamily: FONT.jp,
                fontSize: 94,
                fontWeight: 900,
                color: isException ? C.goldSoft : C.matcha,
                transform: isBouncing
                  ? `scale(${1 + (1 - bounceSpring) * 0.3}) rotate(${(1 - bounceSpring) * -12}deg)`
                  : 'none',
                textShadow: `0 0 30px ${isException ? C.gold : C.matcha}88`,
              }}
            >
              {finalKana}
            </span>
          )}
        </div>

        {/* Suffix "+ ない" Attachment */}
        {naiSpring > 0.01 && (
          <span
            style={{
              fontFamily: FONT.jp,
              fontSize: 104,
              fontWeight: 900,
              color: C.gold,
              transform: `translateX(${(1 - naiSpring) * 60}px) scale(${naiSpring})`,
              opacity: naiSpring,
              textShadow: '0 0 35px rgba(240,190,82,0.8), 0 4px 18px rgba(0,0,0,0.9)',
            }}
          >
            ない
          </span>
        )}
      </div>

      {/* Vowel Transition Rail Indicator */}
      <div
        style={{
          marginTop: 28,
          padding: '16px 24px',
          borderRadius: 20,
          background: 'rgba(15,20,30,0.6)',
          border: `1.5px solid ${C.borderSubtle}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <span style={{fontSize: 22, color: C.textMuted, fontFamily: FONT.mono}}>BARIS U:</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              fontFamily: FONT.jp,
              color: shiftProg > 0.5 ? C.textMuted : C.gold,
            }}
          >
            {uKana} ({romajiU})
          </span>
        </div>

        <div style={{color: C.indigoSoft, fontSize: 26, fontWeight: 900}}>➔</div>

        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <span style={{fontSize: 22, color: C.textMuted, fontFamily: FONT.mono}}>
            {isException ? 'PENGECUALIAN:' : 'BARIS A:'}
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              fontFamily: FONT.jp,
              color: isException ? C.goldSoft : C.matcha,
            }}
          >
            {finalKana} ({finalRomaji})
          </span>
        </div>
      </div>
    </div>
  );
};
