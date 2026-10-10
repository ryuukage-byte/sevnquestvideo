import React from 'react';
import {TOKENS} from '../styles/tokens';

export interface VoiceCaptionProps {
  text: string;
  highlightText?: string;
  highlightColor?: string;
  y?: number;
  style?: React.CSSProperties;
}

export const VoiceCaption: React.FC<VoiceCaptionProps> = ({
  text,
  highlightText,
  highlightColor = TOKENS.colors.souCyan,
  y = 1520, // Inside safe caption zone
  style,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: y,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 90,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(9, 14, 30, 0.88)',
          border: '1.5px solid rgba(85, 221, 245, 0.25)',
          backdropFilter: 'blur(12px)',
          borderRadius: 22,
          padding: '14px 28px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          maxWidth: 960,
        }}
      >
        <span
          style={{
            fontFamily: TOKENS.fonts.body,
            fontWeight: 700,
            fontSize: 28,
            color: TOKENS.colors.textPrimary,
            lineHeight: 1.35,
            letterSpacing: 0.3,
          }}
        >
          {highlightText && text.includes(highlightText) ? (
            text.split(highlightText).map((part, i, arr) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      color: highlightColor,
                      fontWeight: 900,
                      textShadow: `0 0 16px ${highlightColor}`,
                    }}
                  >
                    {highlightText}
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span>{text}</span>
          )}
        </span>
      </div>
    </div>
  );
};
