import React from 'react';
import {C, FONT} from '../../../shared/theme';
import {SevnQuestAppIcon} from './SevnQuestAppIcon';

export interface HomeScreenMockProps {
  showSevnQuest?: boolean;
  sevnQuestScale?: number;
  sevnQuestPress?: number;
  sevnQuestHighlight?: boolean;
  safariHighlight?: boolean;
  safariPress?: number;
  dimOthers?: number; // opacity for other icons (default 1)
  style?: React.CSSProperties;
}

interface GenericApp {
  id: string;
  name: string;
  color: string;
  iconSvg: React.ReactNode;
}

export const HomeScreenMock: React.FC<HomeScreenMockProps> = ({
  showSevnQuest = true,
  sevnQuestScale = 1,
  sevnQuestPress = 0,
  sevnQuestHighlight = false,
  safariHighlight = false,
  safariPress = 0,
  dimOthers = 1,
  style,
}) => {
  const iconSize = 92;
  const radius = iconSize * 0.224;

  const genericApps: GenericApp[] = [
    {
      id: 'calendar',
      name: 'Calendar',
      color: '#ffffff',
      iconSvg: (
        <div style={{color: '#ff3b30', textAlign: 'center', lineHeight: 1}}>
          <div style={{fontSize: 14, fontWeight: 700}}>MON</div>
          <div style={{fontSize: 34, fontWeight: 300, color: '#111'}}>5</div>
        </div>
      ),
    },
    {
      id: 'photos',
      name: 'Photos',
      color: '#ffffff',
      iconSvg: (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background:
              'conic-gradient(from 0deg, #ff3b30, #ff9500, #ffcc00, #34c759, #007aff, #5856d6, #af52de, #ff2d55, #ff3b30)',
            opacity: 0.9,
          }}
        />
      ),
    },
    {
      id: 'camera',
      name: 'Camera',
      color: 'linear-gradient(180deg, #6c757d 0%, #495057 100%)',
      iconSvg: (
        <svg width="40" height="34" viewBox="0 0 24 20" fill="#ffffff">
          <path d="M4 4h3l2-3h6l2 3h3a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      ),
    },
    {
      id: 'notes',
      name: 'Notes',
      color: 'linear-gradient(180deg, #ffd166 0%, #ffb703 100%)',
      iconSvg: (
        <div
          style={{
            width: 44,
            height: 48,
            background: '#ffffff',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            padding: 8,
          }}
        >
          <div style={{height: 3, background: '#ffd166', borderRadius: 2}} />
          <div style={{height: 3, background: '#ccd0d8', borderRadius: 2}} />
          <div style={{height: 3, background: '#ccd0d8', borderRadius: 2}} />
        </div>
      ),
    },
    {
      id: 'settings',
      name: 'Settings',
      color: 'linear-gradient(180deg, #8e9aaf 0%, #687080 100%)',
      iconSvg: (
        <svg width="44" height="44" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm8.94-2.5a7.51 7.51 0 000-1l2.12-1.65-2-3.46-2.49 1a7.46 7.46 0 00-1.73-1l-.38-2.65h-4l-.38 2.65a7.46 7.46 0 00-1.73 1l-2.49-1-2 3.46 2.12 1.65a7.51 7.51 0 000 1l-2.12 1.65 2 3.46 2.49-1a7.46 7.46 0 001.73 1l.38 2.65h4l.38-2.65a7.46 7.46 0 001.73-1l2.49 1 2-3.46-2.12-1.65z" />
        </svg>
      ),
    },
    {
      id: 'reminders',
      name: 'Reminders',
      color: '#ffffff',
      iconSvg: (
        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{width: 10, height: 10, borderRadius: '50%', background: '#007aff'}} />
            <div style={{width: 32, height: 4, background: '#e0e4ec', borderRadius: 2}} />
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{width: 10, height: 10, borderRadius: '50%', background: '#ff9500'}} />
            <div style={{width: 24, height: 4, background: '#e0e4ec', borderRadius: 2}} />
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{width: 10, height: 10, borderRadius: '50%', background: '#34c759'}} />
            <div style={{width: 30, height: 4, background: '#e0e4ec', borderRadius: 2}} />
          </div>
        </div>
      ),
    },
    {
      id: 'maps',
      name: 'Maps',
      color: 'linear-gradient(180deg, #80ed99 0%, #38b000 100%)',
      iconSvg: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '76px 28px 36px 28px',
        background:
          'radial-gradient(ellipse at 50% 20%, #202b44 0%, #101624 50%, #090c14 100%)',
        ...style,
      }}
    >
      {/* Subtle Wallpaper Pattern (Sashiko or soft glow dots) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(111,147,207,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(240,190,82,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main App Grid (4 columns) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '28px 14px',
          justifyItems: 'center',
          alignItems: 'start',
          zIndex: 10,
        }}
      >
        {/* Row 1 Apps */}
        {genericApps.slice(0, 4).map((app) => (
          <div
            key={app.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              opacity: dimOthers,
              transition: 'opacity 0.2s',
            }}
          >
            <div
              style={{
                width: iconSize,
                height: iconSize,
                borderRadius: radius,
                background: app.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {app.iconSvg}
            </div>
            <span
              style={{
                fontFamily: FONT.body,
                fontWeight: 500,
                fontSize: 18,
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {app.name}
            </span>
          </div>
        ))}

        {/* Row 2 Apps: Settings, Reminders, Maps, and SevnQuest! */}
        {genericApps.slice(4, 7).map((app) => (
          <div
            key={app.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              opacity: dimOthers,
              transition: 'opacity 0.2s',
            }}
          >
            <div
              style={{
                width: iconSize,
                height: iconSize,
                borderRadius: radius,
                background: app.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {app.iconSvg}
            </div>
            <span
              style={{
                fontFamily: FONT.body,
                fontWeight: 500,
                fontSize: 18,
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {app.name}
            </span>
          </div>
        ))}

        {/* SEVNQUEST APP ICON slot (Position 4 in Row 2) */}
        {showSevnQuest && (
          <div
            style={{
              transform: `scale(${sevnQuestScale})`,
              transformOrigin: 'center center',
            }}
          >
            <SevnQuestAppIcon
              size={iconSize}
              press={sevnQuestPress}
              highlight={sevnQuestHighlight}
              showLabel={true}
              label="SevnQuest"
            />
          </div>
        )}
      </div>

      {/* Page dots indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 9,
          marginBottom: 14,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.3)',
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.3)',
          }}
        />
      </div>

      {/* Bottom Floating Glass Dock */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: 36,
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow:
            '0 16px 36px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.2)',
          zIndex: 15,
        }}
      >
        {/* Phone */}
        <div
          style={{
            width: iconSize * 0.9,
            height: iconSize * 0.9,
            borderRadius: radius * 0.9,
            background: 'linear-gradient(180deg, #34c759 0%, #28a745 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
            opacity: dimOthers,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.37-.68.25-1.02A11.36 11.36 0 018.57 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.61c0-.55-.45-1-.99-1z" />
          </svg>
        </div>

        {/* Safari (Target in Scene 02) */}
        <div
          style={{
            width: iconSize * 0.9,
            height: iconSize * 0.9,
            borderRadius: radius * 0.9,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: safariHighlight
              ? `0 0 0 4px ${C.gold}, 0 0 28px rgba(240,190,82,0.8), 0 8px 20px rgba(0,0,0,0.4)`
              : '0 6px 14px rgba(0,0,0,0.3)',
            transform: `scale(${1 - safariPress * 0.12})`,
            position: 'relative',
          }}
        >
          {/* Safari Compass needle */}
          <svg width="56" height="56" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="28" fill="url(#safariBg)" />
            <defs>
              <linearGradient id="safariBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#48bfe3" />
                <stop offset="100%" stopColor="#0077b6" />
              </linearGradient>
            </defs>
            {/* Compass marks */}
            <circle cx="30" cy="30" r="22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="2 4" />
            {/* Needle */}
            <polygon points="30,10 35,30 25,30" fill="#ff3b30" />
            <polygon points="30,50 35,30 25,30" fill="#ffffff" />
            <circle cx="30" cy="30" r="3.5" fill="#ffffff" />
          </svg>
        </div>

        {/* Messages */}
        <div
          style={{
            width: iconSize * 0.9,
            height: iconSize * 0.9,
            borderRadius: radius * 0.9,
            background: 'linear-gradient(180deg, #34c759 0%, #28a745 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
            opacity: dimOthers,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>

        {/* Music */}
        <div
          style={{
            width: iconSize * 0.9,
            height: iconSize * 0.9,
            borderRadius: radius * 0.9,
            background:
              'linear-gradient(180deg, #ff2d55 0%, #ff375f 50%, #fa114f 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
            opacity: dimOthers,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
