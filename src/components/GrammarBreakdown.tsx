import React from 'react';
import {useCurrentFrame} from 'remotion';
import {TOKENS} from '../styles/tokens';

export interface GrammarBreakdownProps {
  mode: 'oishisou-vs-oishiisou' | 'desu-vs-desuka' | 'generic';
  highlightDifference?: boolean;
  scale?: number;
  style?: React.CSSProperties;
}

export const GrammarBreakdown: React.FC<GrammarBreakdownProps> = ({
  mode,
  highlightDifference = true,
  scale = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin((frame / 60) * Math.PI * 3) * 0.05;

  if (mode === 'oishisou-vs-oishiisou') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          width: '100%',
          transform: `scale(${scale})`,
          ...style,
        }}
      >
        {/* Top: おいしそうです (Direct Impression) */}
        <div
          style={{
            width: 880,
            padding: '24px 32px',
            borderRadius: 28,
            backgroundColor: 'rgba(21, 28, 44, 0.9)',
            border: `2px solid ${TOKENS.colors.directAmber}`,
            boxShadow: `0 12px 30px rgba(0,0,0,0.6), 0 0 25px ${TOKENS.colors.directAmberGlow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'baseline', gap: 6}}>
            <span
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: 52,
                color: TOKENS.colors.textPrimary,
              }}
            >
              おい
            </span>
            <span
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: 58,
                color: TOKENS.colors.directAmber,
                backgroundColor: `${TOKENS.colors.directAmber}22`,
                padding: '4px 10px',
                borderRadius: 12,
                borderBottom: `4px solid ${TOKENS.colors.directAmber}`,
                textShadow: `0 0 20px ${TOKENS.colors.directAmber}`,
              }}
            >
              しそう
            </span>
            <span
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: 48,
                color: TOKENS.colors.textMuted,
              }}
            >
              です
            </span>
          </div>

          {/* Meaning Tag */}
          <div style={{textAlign: 'right'}}>
            <div
              style={{
                fontFamily: TOKENS.fonts.body,
                fontWeight: 800,
                fontSize: 26,
                color: TOKENS.colors.directAmber,
              }}
            >
              Kelihatannya enak
            </div>
            <div
              style={{
                fontFamily: TOKENS.fonts.body,
                fontWeight: 600,
                fontSize: 16,
                color: TOKENS.colors.textMuted,
              }}
            >
              Kesan langsung (Mata)
            </div>
          </div>
        </div>

        {/* Center: Difference Detector Arrow Indicator */}
        {highlightDifference && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              backgroundColor: '#0A0E1A',
              border: `1.5px solid ${TOKENS.colors.souCyan}`,
              borderRadius: 20,
              padding: '8px 24px',
              boxShadow: `0 0 20px ${TOKENS.colors.souCyanGlow}`,
              transform: `scale(${1 + pulse})`,
            }}
          >
            <span style={{fontSize: 20}}>⚡</span>
            <span
              style={{
                fontFamily: TOKENS.fonts.body,
                fontWeight: 800,
                fontSize: 20,
                color: TOKENS.colors.souCyan,
                letterSpacing: 1,
              }}
            >
              PEMBEDA: HURUF 「い」 SEBELUM そう!
            </span>
            <span style={{fontSize: 20}}>⚡</span>
          </div>
        )}

        {/* Bottom: おいしいそうです (Hearsay / Information from others) */}
        <div
          style={{
            width: 880,
            padding: '24px 32px',
            borderRadius: 28,
            backgroundColor: 'rgba(21, 28, 44, 0.9)',
            border: `2px solid ${TOKENS.colors.hearsayPink}`,
            boxShadow: `0 12px 30px rgba(0,0,0,0.6), 0 0 25px ${TOKENS.colors.hearsayPinkGlow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'baseline', gap: 6}}>
            <span
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: 52,
                color: TOKENS.colors.textPrimary,
              }}
            >
              おい
            </span>
            <span
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: 58,
                color: TOKENS.colors.hearsayPink,
                backgroundColor: `${TOKENS.colors.hearsayPink}22`,
                padding: '4px 10px',
                borderRadius: 12,
                borderBottom: `4px solid ${TOKENS.colors.hearsayPink}`,
                textShadow: `0 0 20px ${TOKENS.colors.hearsayPink}`,
              }}
            >
              しいそう
            </span>
            <span
              style={{
                fontFamily: TOKENS.fonts.jp,
                fontWeight: 900,
                fontSize: 48,
                color: TOKENS.colors.textMuted,
              }}
            >
              です
            </span>
          </div>

          {/* Meaning Tag */}
          <div style={{textAlign: 'right'}}>
            <div
              style={{
                fontFamily: TOKENS.fonts.body,
                fontWeight: 800,
                fontSize: 26,
                color: TOKENS.colors.hearsayPink,
              }}
            >
              Katanya enak
            </div>
            <div
              style={{
                fontFamily: TOKENS.fonts.body,
                fontWeight: 600,
                fontSize: 16,
                color: TOKENS.colors.textMuted,
              }}
            >
              Kabar dari orang (Telinga)
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
