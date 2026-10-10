import React from 'react';
import {TOKENS} from '../styles/tokens';

export interface SituationCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  active?: boolean;
  accentColor?: string;
  width?: number | string;
  height?: number | string;
  scale?: number;
  glow?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const SituationCard: React.FC<SituationCardProps> = ({
  title,
  subtitle,
  icon,
  badge,
  badgeColor = TOKENS.colors.souCyan,
  active = false,
  accentColor = TOKENS.colors.souCyan,
  width = 540,
  height = 'auto',
  scale = 1,
  glow = false,
  children,
  style,
}) => {
  const borderColor = active ? accentColor : TOKENS.colors.cardBorder;

  return (
    <div
      style={{
        width,
        height,
        transform: `scale(${scale})`,
        borderRadius: 32,
        background: active
          ? `linear-gradient(180deg, #1d283e 0%, #131b2c 100%)`
          : `linear-gradient(180deg, #182030 0%, #0f1522 100%)`,
        border: `2px solid ${borderColor}`,
        boxShadow: active || glow
          ? `0 16px 40px rgba(0,0,0,0.65), 0 0 30px ${accentColor}44, inset 0 1px 0 rgba(255,255,255,0.15)`
          : `0 12px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)`,
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        transition: 'transform 0.2s ease',
        ...style,
      }}
    >
      {/* Top badge */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: TOKENS.colors.bgDeep,
            border: `1.5px solid ${badgeColor}`,
            borderRadius: 16,
            padding: '4px 16px',
            color: badgeColor,
            fontFamily: TOKENS.fonts.body,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: 1,
            boxShadow: `0 4px 14px rgba(0,0,0,0.5)`,
          }}
        >
          {badge}
        </div>
      )}

      {/* Optional Icon */}
      {icon && (
        <div
          style={{
            marginBottom: 16,
            fontSize: 44,
            filter: `drop-shadow(0 4px 12px ${accentColor}55)`,
          }}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      {title && (
        <div
          style={{
            fontFamily: TOKENS.fonts.display,
            fontWeight: 900,
            fontSize: 34,
            color: TOKENS.colors.textPrimary,
            letterSpacing: 0.5,
            marginBottom: subtitle ? 8 : 0,
          }}
        >
          {title}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontFamily: TOKENS.fonts.body,
            fontWeight: 600,
            fontSize: 20,
            color: TOKENS.colors.textSecondary,
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Custom Card Children */}
      {children && <div style={{width: '100%', marginTop: title ? 16 : 0}}>{children}</div>}
    </div>
  );
};
