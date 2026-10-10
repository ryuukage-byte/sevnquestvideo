import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, FONT} from '../../../shared/theme';

export interface TikTokBioMockProps {
  linkHighlight?: boolean;
  linkPress?: number;
  style?: React.CSSProperties;
}

export const TikTokBioMock: React.FC<TikTokBioMockProps> = ({
  linkHighlight = false,
  linkPress = 0,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#010101',
        color: '#ffffff',
        padding: '76px 28px 36px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        ...style,
      }}
    >
      {/* TikTok Top Nav */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span
          style={{
            fontFamily: FONT.body,
            fontWeight: 700,
            fontSize: 20,
            color: '#fff',
          }}
        >
          @sevnquest
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </div>

      {/* Profile Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          marginTop: 8,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
          }}
        >
          <Img
            src={staticFile('brand/logo.png')}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: FONT.body,
            fontWeight: 800,
            fontSize: 22,
            color: '#ffffff',
          }}
        >
          SevnQuest 🇯🇵
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 28,
            alignItems: 'center',
            marginTop: 4,
          }}
        >
          <div style={{textAlign: 'center'}}>
            <div style={{fontWeight: 800, fontSize: 20}}>42</div>
            <div style={{fontSize: 13, color: 'rgba(255,255,255,0.6)'}}>Following</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontWeight: 800, fontSize: 20}}>85.4K</div>
            <div style={{fontSize: 13, color: 'rgba(255,255,255,0.6)'}}>Followers</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontWeight: 800, fontSize: 20}}>1.2M</div>
            <div style={{fontSize: 13, color: 'rgba(255,255,255,0.6)'}}>Likes</div>
          </div>
        </div>

        {/* Follow / Message Buttons */}
        <div style={{display: 'flex', gap: 10, width: '100%', marginTop: 8}}>
          <div
            style={{
              flex: 1,
              height: 44,
              borderRadius: 8,
              background: '#fe2c55',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 16,
              color: '#ffffff',
            }}
          >
            Following
          </div>
          <div
            style={{
              width: 48,
              height: 44,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bio Text */}
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 16,
          lineHeight: 1.45,
          color: 'rgba(255,255,255,0.9)',
          textAlign: 'center',
          marginTop: 6,
        }}
      >
        Belajar Bahasa Jepang lewat Kotoba & Konteks ⛩️
        <br />
        Kuasai Kanji, Kosakata & Pola Kalimat N5–N1
      </div>

      {/* Link in Bio (The Hero Element in Scene 04) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 22px',
            borderRadius: 14,
            background: linkHighlight
              ? 'rgba(240, 190, 82, 0.18)'
              : 'rgba(255, 255, 255, 0.08)',
            border: linkHighlight
              ? `2px solid ${C.gold}`
              : '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: linkHighlight
              ? `0 0 26px rgba(240,190,82,0.45), inset 0 1px 0 rgba(255,255,255,0.2)`
              : 'none',
            transform: `scale(${1 - linkPress * 0.1})`,
            transition: 'all 0.1s ease',
          }}
        >
          {/* Link chain icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={linkHighlight ? C.gold : '#58a6ff'} strokeWidth="2.5" strokeLinecap="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 18,
              color: linkHighlight ? C.gold : '#58a6ff',
              letterSpacing: 0.2,
            }}
          >
            sevnquest.sevnsoul.site
          </span>
        </div>
      </div>
    </div>
  );
};
