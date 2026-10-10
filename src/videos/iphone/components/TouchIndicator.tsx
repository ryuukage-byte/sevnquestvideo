import React from 'react';

export interface TouchIndicatorProps {
  x: number;
  y: number;
  press?: number; // 0..1
  opacity?: number;
  visible?: boolean;
  style?: React.CSSProperties;
}

export const TouchIndicator: React.FC<TouchIndicatorProps> = ({
  x,
  y,
  press = 0,
  opacity = 1,
  visible = true,
  style,
}) => {
  if (!visible || opacity <= 0) return null;

  // Press animation: drops from scale 1 down to 0.72, then releases
  const scale = 1 - press * 0.28;
  const rippleScale = 1 + press * 0.8;
  const rippleOpacity = press * 0.6;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 999,
        opacity,
        ...style,
      }}
    >
      {/* Outer Ripple on press */}
      {press > 0.05 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 16px rgba(255, 255, 255, 0.6)',
            opacity: rippleOpacity,
            transition: 'all 0.08s ease-out',
          }}
        />
      )}

      {/* Main Touch Pointer Disc */}
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(8px)',
          border: '2.5px solid rgba(255, 255, 255, 0.95)',
          boxShadow:
            '0 4px 18px rgba(0, 0, 0, 0.45), 0 0 16px rgba(255, 255, 255, 0.6), inset 0 1px 3px rgba(255, 255, 255, 0.8)',
          transform: `scale(${scale})`,
          transition: 'transform 0.08s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner core dot */}
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
          }}
        />
      </div>
    </div>
  );
};
