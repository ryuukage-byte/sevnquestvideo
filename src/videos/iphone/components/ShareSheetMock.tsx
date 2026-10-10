import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, FONT} from '../../../shared/theme';

export interface ShareSheetMockProps {
  scrollY?: number; // px scrolled upwards
  addHomeHighlight?: boolean;
  addHomePress?: number;
  dimOthers?: boolean;
  style?: React.CSSProperties;
}

export const ShareSheetMock: React.FC<ShareSheetMockProps> = ({
  scrollY = 0,
  addHomeHighlight = false,
  addHomePress = 0,
  dimOthers = false,
  style,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '84%',
        background: 'rgba(28, 32, 44, 0.94)',
        backdropFilter: 'blur(36px)',
        WebkitBackdropFilter: 'blur(36px)',
        borderRadius: '38px 38px 0 0',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.18)',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 50,
        ...style,
      }}
    >
      {/* Drag Indicator Pill */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 12,
          paddingBottom: 8,
        }}
      >
        <div
          style={{
            width: 44,
            height: 5,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.3)',
          }}
        />
      </div>

      {/* Target Preview Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '12px 28px 18px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Img
            src={staticFile('brand/logo.png')}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 2}}>
          <span
            style={{
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 20,
              color: '#ffffff',
            }}
          >
            SevnQuest
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            sevnquest.sevnsoul.site
          </span>
        </div>
      </div>

      {/* Scrollable Container with scrollY displacement */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          transform: `translateY(${-scrollY}px)`,
          transition: 'transform 0.1s ease',
        }}
      >
        {/* Horizontal Quick Share Icons (AirDrop, Messages, Mail) */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            paddingBottom: 4,
            opacity: dimOthers ? 0.35 : 0.85,
          }}
        >
          {['AirDrop', 'Messages', 'Mail', 'WhatsApp', 'Notes'].map((name, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                minWidth: 70,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {name[0]}
              </div>
              <span
                style={{
                  fontFamily: FONT.body,
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Action Group 1: Copy, Bookmark */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 18,
            overflow: 'hidden',
            opacity: dimOthers ? 0.35 : 0.85,
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span style={{fontFamily: FONT.body, fontSize: 18, color: '#fff'}}>
              Copy
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </div>
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{fontFamily: FONT.body, fontSize: 18, color: '#fff'}}>
              Add Bookmark
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>

        {/* Action Group 2: The HERO ACTION - ADD TO HOME SCREEN */}
        <div
          style={{
            background: addHomeHighlight
              ? 'rgba(240, 190, 82, 0.16)'
              : 'rgba(255, 255, 255, 0.08)',
            border: addHomeHighlight
              ? `2.5px solid ${C.gold}`
              : '1.5px solid transparent',
            boxShadow: addHomeHighlight
              ? `0 0 28px rgba(240,190,82,0.5), inset 0 1px 0 rgba(255,255,255,0.2)`
              : 'none',
            borderRadius: 18,
            overflow: 'hidden',
            transform: `scale(${1 - addHomePress * 0.06})`,
            transition: 'all 0.1s ease',
          }}
        >
          <div
            style={{
              padding: '18px 22px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT.body,
                fontWeight: addHomeHighlight ? 800 : 600,
                fontSize: 22,
                color: addHomeHighlight ? C.gold : '#ffffff',
                letterSpacing: 0.3,
              }}
            >
              Add to Home Screen
            </span>
            {/* Square with plus icon */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke={addHomeHighlight ? C.gold : '#ffffff'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
        </div>

        {/* Action Group 3: Add to Favorites, Find on Page */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 18,
            overflow: 'hidden',
            opacity: dimOthers ? 0.35 : 0.85,
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span style={{fontFamily: FONT.body, fontSize: 18, color: '#fff'}}>
              Add to Favorites
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{fontFamily: FONT.body, fontSize: 18, color: '#fff'}}>
              Find on Page
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
