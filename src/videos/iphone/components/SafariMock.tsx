import React from 'react';
import {C, FONT} from '../../../shared/theme';

export interface SafariMockProps {
  url?: string;
  isStartPage?: boolean;
  addressBarGlow?: boolean;
  urlScale?: number;
  loadingProgress?: number; // 0..1
  shareHighlight?: boolean;
  sharePress?: number;
  showToolbar?: boolean;
  zoomToolbar?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const SafariMock: React.FC<SafariMockProps> = ({
  url = 'sevnquest.sevnsoul.site',
  isStartPage = false,
  addressBarGlow = false,
  urlScale = 1,
  loadingProgress = 0,
  shareHighlight = false,
  sharePress = 0,
  showToolbar = true,
  zoomToolbar = false,
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#12151d',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Top Address Bar / Header */}
      <div
        style={{
          paddingTop: 66,
          paddingBottom: 14,
          paddingLeft: 20,
          paddingRight: 20,
          background: 'rgba(23, 27, 36, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Address capsule */}
        <div
          style={{
            position: 'relative',
            height: 48,
            borderRadius: 14,
            background: addressBarGlow
              ? 'rgba(38, 48, 70, 0.95)'
              : 'rgba(31, 36, 47, 0.85)',
            border: addressBarGlow
              ? `2px solid ${C.gold}`
              : '1px solid rgba(255,255,255,0.12)',
            boxShadow: addressBarGlow
              ? `0 0 24px rgba(240,190,82,0.4), inset 0 1px 0 rgba(255,255,255,0.15)`
              : 'inset 0 1px 2px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            transform: `scale(${urlScale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease',
          }}
        >
          {/* Left: AA font button */}
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 600,
              fontSize: 16,
              color: 'rgba(255,255,255,0.5)',
              userSelect: 'none',
            }}
          >
            AA
          </div>

          {/* Center: Lock + URL text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              maxWidth: '75%',
              overflow: 'hidden',
            }}
          >
            {!isStartPage && url && (
              <svg width="14" height="15" viewBox="0 0 24 24" fill={C.gold}>
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            )}
            <span
              style={{
                fontFamily: FONT.mono,
                fontWeight: 600,
                fontSize: 18,
                color: isStartPage ? 'rgba(255,255,255,0.4)' : C.text,
                letterSpacing: 0.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {url || 'Search or enter website'}
            </span>
          </div>

          {/* Right: Reload icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>

          {/* Loading bar line right below/inside */}
          {loadingProgress > 0 && loadingProgress < 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: `${loadingProgress * 100}%`,
                height: 2.5,
                background: `linear-gradient(90deg, ${C.indigo}, ${C.gold})`,
                borderRadius: '0 0 14px 14px',
              }}
            />
          )}
        </div>
      </div>

      {/* Main Page Area */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isStartPage ? (
          /* Safari Start Page Favorites */
          <div
            style={{
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            <div
              style={{
                fontFamily: FONT.body,
                fontWeight: 700,
                fontSize: 32,
                color: '#ffffff',
              }}
            >
              Favorites
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20,
              }}
            >
              {['Apple', 'iCloud', 'Google', 'Twitter'].map((fav, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 18,
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontFamily: FONT.body,
                      fontWeight: 700,
                      fontSize: 22,
                    }}
                  >
                    {fav[0]}
                  </div>
                  <span
                    style={{
                      fontFamily: FONT.body,
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {fav}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Bottom Safari Navigation Toolbar */}
      {showToolbar && (
        <div
          style={{
            height: zoomToolbar ? 140 : 86,
            paddingBottom: 20,
            paddingLeft: 24,
            paddingRight: 24,
            background: 'rgba(23, 27, 36, 0.96)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 40,
            transform: zoomToolbar ? 'scale(1.15)' : 'none',
            transformOrigin: 'bottom center',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Back button */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>

          {/* Forward button */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>

          {/* Share Button (Center Piece) */}
          <div
            style={{
              position: 'relative',
              width: 52,
              height: 52,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: shareHighlight
                ? 'rgba(240, 190, 82, 0.22)'
                : 'transparent',
              boxShadow: shareHighlight
                ? `0 0 0 3px ${C.gold}, 0 0 24px rgba(240,190,82,0.65)`
                : 'none',
              transform: `scale(${1 - sharePress * 0.15})`,
              transition: 'transform 0.1s ease',
            }}
          >
            {/* iOS Share Sheet Icon: Square with upward pointing arrow */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={shareHighlight ? C.gold : '#007aff'}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>

          {/* Bookmarks button */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>

          {/* Tabs button */}
          <div
            style={{
              width: 22,
              height: 22,
              border: '2px solid rgba(255,255,255,0.6)',
              borderRadius: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            1
          </div>
        </div>
      )}
    </div>
  );
};
