import React from 'react';
import {C, FONT} from '../../../shared/theme';

export interface IPhoneShellProps {
  scale?: number;
  rotation?: number; // degrees
  translateX?: number;
  translateY?: number;
  transformOrigin?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  showDynamicIsland?: boolean;
  time?: string;
}

export const IPhoneShell: React.FC<IPhoneShellProps> = ({
  scale = 1,
  rotation = 0,
  translateX = 0,
  translateY = 0,
  transformOrigin = 'center center',
  style,
  children,
  showDynamicIsland = true,
  time = '9:41',
}) => {
  // Dimensions of iPhone 16 Pro mockup frame
  const shellW = 760;
  const shellH = 1540;
  const screenRadius = 56;

  return (
    <div
      style={{
        width: shellW,
        height: shellH,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin,
        position: 'relative',
        ...style,
      }}
    >
      {/* Outer Metallic Titanium Edge */}
      <div
        style={{
          position: 'absolute',
          inset: -14,
          borderRadius: screenRadius + 14,
          background:
            'linear-gradient(145deg, #5b6275 0%, #2e3444 25%, #1a1e28 50%, #3e465a 80%, #212634 100%)',
          boxShadow:
            '0 40px 90px rgba(0,0,0,0.75), 0 16px 36px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.28), inset 0 -2px 3px rgba(0,0,0,0.6)',
          zIndex: 1,
        }}
      >
        {/* Subtle Button bumps on left & right */}
        {/* Volume Up */}
        <div
          style={{
            position: 'absolute',
            left: -5,
            top: 260,
            width: 5,
            height: 90,
            borderRadius: '4px 0 0 4px',
            background: '#3a4254',
          }}
        />
        {/* Volume Down */}
        <div
          style={{
            position: 'absolute',
            left: -5,
            top: 370,
            width: 5,
            height: 90,
            borderRadius: '4px 0 0 4px',
            background: '#3a4254',
          }}
        />
        {/* Power Button */}
        <div
          style={{
            position: 'absolute',
            right: -5,
            top: 310,
            width: 5,
            height: 120,
            borderRadius: '0 4px 4px 0',
            background: '#3a4254',
          }}
        />
      </div>

      {/* Screen Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: screenRadius,
          overflow: 'hidden',
          background: C.bgDeep,
          zIndex: 2,
          boxShadow: 'inset 0 0 0 3px #0f1218, inset 0 0 16px rgba(0,0,0,0.8)',
        }}
      >
        {/* Screen Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>

        {/* Status Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 44px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          {/* Time */}
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 22,
              color: '#ffffff',
              letterSpacing: -0.2,
            }}
          >
            {time}
          </div>

          {/* Dynamic Island */}
          {showDynamicIsland && (
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 210,
                height: 44,
                borderRadius: 22,
                background: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 18px',
                boxShadow: '0 3px 12px rgba(0,0,0,0.7)',
              }}
            >
              {/* Camera Lens subtle circle */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#090d18',
                  border: '1.5px solid #1c2338',
                }}
              />
              {/* Microphone/Sensor dot */}
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: '#0c101c',
                }}
              />
            </div>
          )}

          {/* Right Status Icons: Signal, Wifi, Battery */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#ffffff',
            }}
          >
            {/* Cellular signal */}
            <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
              <rect x="1" y="10" width="3.5" height="5" rx="1" fill="#ffffff" />
              <rect x="6.5" y="7" width="3.5" height="8" rx="1" fill="#ffffff" />
              <rect x="12" y="4" width="3.5" height="11" rx="1" fill="#ffffff" />
              <rect x="17.5" y="1" width="3.5" height="14" rx="1" fill="#ffffff" />
            </svg>

            {/* Wifi */}
            <svg width="20" height="15" viewBox="0 0 20 15" fill="#ffffff">
              <path d="M10 13a2 2 0 100 4 2 2 0 000-4zm-4.9-3.5a7 7 0 019.8 0l1.4-1.4a9 9 0 00-12.6 0l1.4 1.4zm-3.5-3.5a12 12 0 0116.8 0l1.4-1.4a14 14 0 00-19.6 0l1.4 1.4z" />
            </svg>

            {/* Battery */}
            <div
              style={{
                width: 28,
                height: 15,
                borderRadius: 4.5,
                border: '1.5px solid rgba(255,255,255,0.85)',
                padding: 1.5,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '100%',
                  borderRadius: 2,
                  background: '#ffffff',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: -4,
                  width: 2.5,
                  height: 6,
                  borderRadius: '0 2px 2px 0',
                  background: 'rgba(255,255,255,0.7)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 220,
            height: 6,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.65)',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />

        {/* Subtle Glass Sheen Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 90,
          }}
        />
      </div>
    </div>
  );
};
