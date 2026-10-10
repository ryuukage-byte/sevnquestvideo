import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, FONT} from '../../../shared/theme';

export interface AddToHomeScreenMockProps {
  nameHighlight?: boolean;
  nameScale?: number;
  showCheckmark?: boolean;
  addHighlight?: boolean;
  addPress?: number;
  style?: React.CSSProperties;
}

export const AddToHomeScreenMock: React.FC<AddToHomeScreenMockProps> = ({
  nameHighlight = false,
  nameScale = 1,
  showCheckmark = false,
  addHighlight = false,
  addPress = 0,
  style,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#151922',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 60,
        ...style,
      }}
    >
      {/* Navigation Bar */}
      <div
        style={{
          paddingTop: 66,
          paddingBottom: 16,
          paddingLeft: 20,
          paddingRight: 20,
          background: 'rgba(28, 34, 48, 0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Cancel */}
        <span
          style={{
            fontFamily: FONT.body,
            fontSize: 18,
            color: '#007aff',
            cursor: 'pointer',
          }}
        >
          Cancel
        </span>

        {/* Center Title */}
        <span
          style={{
            fontFamily: FONT.body,
            fontWeight: 700,
            fontSize: 19,
            color: '#ffffff',
          }}
        >
          Add to Home Screen
        </span>

        {/* Add Button (Target in Scene 10) */}
        <div
          style={{
            padding: '8px 18px',
            borderRadius: 18,
            background: addHighlight
              ? `linear-gradient(180deg, ${C.goldSoft} 0%, ${C.gold} 100%)`
              : '#007aff',
            boxShadow: addHighlight
              ? `0 0 24px rgba(240,190,82,0.8), 0 4px 12px rgba(0,0,0,0.4)`
              : 'none',
            transform: `scale(${1 - addPress * 0.14})`,
            transition: 'all 0.1s ease',
          }}
        >
          <span
            style={{
              fontFamily: FONT.body,
              fontWeight: 800,
              fontSize: 18,
              color: addHighlight ? '#261b05' : '#ffffff',
            }}
          >
            Add
          </span>
        </div>
      </div>

      {/* Main Content Form */}
      <div
        style={{
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Card 1: App Icon + Name Field */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 20,
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            border: nameHighlight
              ? `2px solid ${C.gold}`
              : '1px solid rgba(255,255,255,0.1)',
            boxShadow: nameHighlight
              ? `0 0 24px rgba(240,190,82,0.35)`
              : 'none',
            transform: `scale(${nameScale})`,
            transformOrigin: 'center center',
            transition: 'all 0.15s ease',
          }}
        >
          {/* App Icon */}
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile('brand/logo.png')}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>

          {/* Name Input Container */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 2}}>
              <span
                style={{
                  fontFamily: FONT.body,
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#ffffff',
                }}
              >
                SevnQuest
              </span>
              {/* Blinking Cursor */}
              <div
                style={{
                  width: 2.5,
                  height: 24,
                  background: C.gold,
                  borderRadius: 1,
                  marginLeft: 2,
                }}
              />
            </div>

            {/* Checkmark or Clear */}
            {showCheckmark ? (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: C.matcha,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(79,174,134,0.6)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            ) : (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                ×
              </div>
            )}
          </div>
        </div>

        {/* Card 2: URL row */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 16,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            https://sevnquest.sevnsoul.site
          </span>
        </div>

        {/* Card 3: "Open as Web App" Toggle (Storyboard requested detail!) */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <span
              style={{
                fontFamily: FONT.body,
                fontWeight: 600,
                fontSize: 17,
                color: '#ffffff',
              }}
            >
              Open as Web App
            </span>
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Opens in standalone window without browser controls
            </span>
          </div>

          {/* iOS Toggle Switch in ON state */}
          <div
            style={{
              width: 52,
              height: 32,
              borderRadius: 16,
              background: '#34c759', // Active Green
              position: 'relative',
              boxShadow: '0 2px 6px rgba(52,199,89,0.4)',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>

        {/* Explanatory footer text */}
        <div
          style={{
            fontFamily: FONT.body,
            fontSize: 14,
            lineHeight: 1.4,
            color: 'rgba(255,255,255,0.45)',
            padding: '0 8px',
          }}
        >
          An icon will be added to your Home Screen so you can quickly access this website.
        </div>
      </div>
    </div>
  );
};
