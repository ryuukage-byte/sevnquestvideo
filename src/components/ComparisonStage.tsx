import React from 'react';
import {TOKENS} from '../styles/tokens';

export interface ComparisonStageProps {
  leftTitle: string;
  leftSubtitle: string;
  leftJapanese: string;
  rightTitle: string;
  rightSubtitle: string;
  rightJapanese: string;
  centerHeader?: string;
  activeSide?: 'left' | 'right' | 'both';
  scale?: number;
  style?: React.CSSProperties;
}

export const ComparisonStage: React.FC<ComparisonStageProps> = ({
  leftTitle,
  leftSubtitle,
  leftJapanese,
  rightTitle,
  rightSubtitle,
  rightJapanese,
  centerHeader = 'そう vs よう',
  activeSide = 'both',
  scale = 1,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          marginBottom: 32,
          padding: '10px 32px',
          borderRadius: 24,
          backgroundColor: '#0E1422',
          border: `2px solid ${TOKENS.colors.souCyan}`,
          boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 20px ${TOKENS.colors.souCyanGlow}`,
          fontFamily: TOKENS.fonts.display,
          fontWeight: 900,
          fontSize: 32,
          color: TOKENS.colors.textPrimary,
          letterSpacing: 1,
        }}
      >
        {centerHeader}
      </div>

      {/* Split Cards Container */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          width: 980,
          justifyContent: 'center',
        }}
      >
        {/* Left Card: そう */}
        <div
          style={{
            flex: 1,
            padding: '32px 24px',
            borderRadius: 28,
            backgroundColor: activeSide === 'left' ? '#1c283f' : '#131a29',
            border: `2px solid ${activeSide === 'left' ? TOKENS.colors.directAmber : 'rgba(249, 197, 107, 0.3)'}`,
            boxShadow:
              activeSide === 'left'
                ? `0 16px 36px rgba(0,0,0,0.6), 0 0 25px ${TOKENS.colors.directAmberGlow}`
                : `0 8px 20px rgba(0,0,0,0.4)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: activeSide === 'right' ? 0.45 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div
            style={{
              padding: '4px 14px',
              borderRadius: 12,
              backgroundColor: `${TOKENS.colors.directAmber}22`,
              color: TOKENS.colors.directAmber,
              fontFamily: TOKENS.fonts.body,
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            {leftTitle}
          </div>

          <div
            style={{
              fontFamily: TOKENS.fonts.jp,
              fontWeight: 900,
              fontSize: 42,
              color: TOKENS.colors.textPrimary,
              marginBottom: 14,
            }}
          >
            {leftJapanese}
          </div>

          <div
            style={{
              fontFamily: TOKENS.fonts.body,
              fontWeight: 600,
              fontSize: 20,
              color: TOKENS.colors.textSecondary,
              lineHeight: 1.3,
            }}
          >
            {leftSubtitle}
          </div>
        </div>

        {/* Right Card: よう */}
        <div
          style={{
            flex: 1,
            padding: '32px 24px',
            borderRadius: 28,
            backgroundColor: activeSide === 'right' ? '#231d3f' : '#131a29',
            border: `2px solid ${activeSide === 'right' ? TOKENS.colors.conceptViolet : 'rgba(167, 139, 250, 0.3)'}`,
            boxShadow:
              activeSide === 'right'
                ? `0 16px 36px rgba(0,0,0,0.6), 0 0 25px ${TOKENS.colors.conceptVioletGlow}`
                : `0 8px 20px rgba(0,0,0,0.4)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: activeSide === 'left' ? 0.45 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div
            style={{
              padding: '4px 14px',
              borderRadius: 12,
              backgroundColor: `${TOKENS.colors.conceptViolet}22`,
              color: TOKENS.colors.conceptViolet,
              fontFamily: TOKENS.fonts.body,
              fontWeight: 800,
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            {rightTitle}
          </div>

          <div
            style={{
              fontFamily: TOKENS.fonts.jp,
              fontWeight: 900,
              fontSize: 42,
              color: TOKENS.colors.textPrimary,
              marginBottom: 14,
            }}
          >
            {rightJapanese}
          </div>

          <div
            style={{
              fontFamily: TOKENS.fonts.body,
              fontWeight: 600,
              fontSize: 20,
              color: TOKENS.colors.textSecondary,
              lineHeight: 1.3,
            }}
          >
            {rightSubtitle}
          </div>
        </div>
      </div>
    </div>
  );
};
