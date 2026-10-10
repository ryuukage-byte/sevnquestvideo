import React from 'react';
import {useCurrentFrame} from 'remotion';
import {AvatarExpression, AvatarExpressionType, AvatarGender} from '../shared/components/Avatar';
import {TOKENS} from '../styles/tokens';

export interface CharacterActorProps {
  gender?: AvatarGender;
  expression?: AvatarExpressionType;
  tier?: number;
  x?: number;
  y?: number;
  height?: number;
  scale?: number;
  flip?: boolean;
  idleBob?: boolean;
  speechBubble?: React.ReactNode;
  thoughtBubble?: React.ReactNode;
  holdingItem?: React.ReactNode;
  nameBadge?: string;
  style?: React.CSSProperties;
}

export const CharacterActor: React.FC<CharacterActorProps> = ({
  gender = 'male',
  expression = 'neutral',
  tier = 3,
  x = 540,
  y = 1200,
  height = 360,
  scale = 1,
  flip = false,
  idleBob = true,
  speechBubble,
  thoughtBubble,
  holdingItem,
  nameBadge,
  style,
}) => {
  const frame = useCurrentFrame();
  const bobY = idleBob ? Math.sin((frame / 60) * Math.PI * 2) * 8 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + bobY,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'bottom center',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Speech or Thought Bubble above head */}
      {speechBubble && (
        <div
          style={{
            position: 'absolute',
            bottom: height + 20,
            background: TOKENS.colors.cardElevated,
            border: `2px solid ${TOKENS.colors.souCyan}`,
            borderRadius: 24,
            padding: '16px 24px',
            color: TOKENS.colors.textPrimary,
            fontFamily: TOKENS.fonts.body,
            boxShadow: `0 12px 30px rgba(0,0,0,0.6), 0 0 20px ${TOKENS.colors.souCyanGlow}`,
            whiteSpace: 'nowrap',
            zIndex: 40,
          }}
        >
          {speechBubble}
          {/* Bubble tail */}
          <div
            style={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `10px solid ${TOKENS.colors.souCyan}`,
            }}
          />
        </div>
      )}

      {thoughtBubble && (
        <div
          style={{
            position: 'absolute',
            bottom: height + 24,
            background: 'rgba(30, 41, 59, 0.95)',
            border: `2px dashed ${TOKENS.colors.conceptViolet}`,
            borderRadius: 32,
            padding: '18px 28px',
            color: TOKENS.colors.textPrimary,
            fontFamily: TOKENS.fonts.body,
            boxShadow: `0 12px 32px rgba(0,0,0,0.7), 0 0 25px ${TOKENS.colors.conceptVioletGlow}`,
            whiteSpace: 'nowrap',
            zIndex: 40,
          }}
        >
          {thoughtBubble}
          {/* Thought bubbles trail */}
          <div
            style={{
              position: 'absolute',
              bottom: -16,
              left: '46%',
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: TOKENS.colors.cardElevated,
              border: `2px solid ${TOKENS.colors.conceptViolet}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -28,
              left: '42%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: TOKENS.colors.cardElevated,
              border: `1px solid ${TOKENS.colors.conceptViolet}`,
            }}
          />
        </div>
      )}

      {/* Main Avatar Expression Image */}
      <div style={{position: 'relative'}}>
        <AvatarExpression
          gender={gender}
          expression={expression}
          tier={tier}
          height={height}
          flip={flip}
          shadow={true}
          idleBob={false} // handled by parent wrapper
        />

        {/* Handheld or side accessory */}
        {holdingItem && (
          <div
            style={{
              position: 'absolute',
              right: flip ? undefined : -20,
              left: flip ? -20 : undefined,
              bottom: 40,
              zIndex: 30,
              filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))',
            }}
          >
            {holdingItem}
          </div>
        )}
      </div>

      {/* Optional Name / Role Badge */}
      {nameBadge && (
        <div
          style={{
            marginTop: 8,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: `1px solid ${TOKENS.colors.cardBorder}`,
            borderRadius: 14,
            padding: '4px 14px',
            color: TOKENS.colors.textSecondary,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: TOKENS.fonts.body,
          }}
        >
          {nameBadge}
        </div>
      )}
    </div>
  );
};
