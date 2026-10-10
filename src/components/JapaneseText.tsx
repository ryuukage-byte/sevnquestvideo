import React from 'react';
import {TOKENS} from '../styles/tokens';

export interface JapaneseSegment {
  text: string;
  highlight?: boolean;
  highlightColor?: string;
  badge?: string;
  underline?: boolean;
}

export interface JapaneseTextProps {
  segments?: JapaneseSegment[];
  text?: string;
  size?: number; // Main font size (e.g. 72 - 120px)
  translation?: string;
  translationSize?: number;
  highlightPart?: string; // Substring to highlight in single-text mode
  highlightColor?: string;
  color?: string;
  glow?: boolean;
  align?: 'center' | 'left' | 'right';
  style?: React.CSSProperties;
}

export const JapaneseText: React.FC<JapaneseTextProps> = ({
  segments,
  text,
  size = 84,
  translation,
  translationSize = 34,
  highlightPart,
  highlightColor = TOKENS.colors.souCyan,
  color = TOKENS.colors.textPrimary,
  glow = true,
  align = 'center',
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        justifyContent: 'center',
        textAlign: align,
        width: '100%',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {/* Main Japanese Text */}
      <div
        style={{
          fontFamily: TOKENS.fonts.jp,
          fontWeight: 900,
          fontSize: size,
          color,
          lineHeight: 1.25,
          letterSpacing: 2,
          display: 'inline-flex',
          alignItems: 'baseline',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
          textShadow: glow
            ? `0 0 30px ${highlightColor}66, 0 8px 24px rgba(0,0,0,0.85)`
            : '0 6px 18px rgba(0,0,0,0.8)',
        }}
      >
        {segments ? (
          segments.map((seg, i) => {
            const hColor = seg.highlightColor || highlightColor;
            return (
              <span
                key={i}
                style={{
                  color: seg.highlight ? hColor : color,
                  position: 'relative',
                  backgroundColor: seg.highlight ? `${hColor}22` : 'transparent',
                  padding: seg.highlight ? '0 6px' : '0',
                  borderRadius: 8,
                  borderBottom: seg.underline || seg.highlight ? `4px solid ${hColor}` : 'none',
                  textShadow: seg.highlight ? `0 0 20px ${hColor}` : undefined,
                  whiteSpace: 'nowrap',
                }}
              >
                {seg.text}
                {seg.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -24,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 16,
                      fontFamily: TOKENS.fonts.body,
                      fontWeight: 700,
                      color: hColor,
                      backgroundColor: TOKENS.colors.bgDeep,
                      padding: '2px 8px',
                      borderRadius: 10,
                      border: `1px solid ${hColor}`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {seg.badge}
                  </span>
                )}
              </span>
            );
          })
        ) : highlightPart && text ? (
          text.split(highlightPart).map((part, i, arr) => (
            <React.Fragment key={i}>
              <span style={{whiteSpace: 'nowrap'}}>{part}</span>
              {i < arr.length - 1 && (
                <span
                  style={{
                    color: highlightColor,
                    backgroundColor: `${highlightColor}22`,
                    padding: '0 6px',
                    borderRadius: 8,
                    borderBottom: `4px solid ${highlightColor}`,
                    textShadow: `0 0 24px ${highlightColor}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {highlightPart}
                </span>
              )}
            </React.Fragment>
          ))
        ) : (
          <span style={{whiteSpace: 'nowrap'}}>{text}</span>
        )}
      </div>

      {/* Translation below */}
      {translation && (
        <div
          style={{
            marginTop: 14,
            fontFamily: TOKENS.fonts.body,
            fontWeight: 700,
            fontSize: translationSize,
            color: TOKENS.colors.textSecondary,
            letterSpacing: 0.5,
            lineHeight: 1.3,
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
          }}
        >
          {translation}
        </div>
      )}
    </div>
  );
};
