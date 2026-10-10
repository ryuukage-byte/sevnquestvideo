import React from 'react';
import {C, FONT} from '../../../shared/theme';
import {LogoMark} from '../../../shared/components/Logo';
import {Surface} from '../../../shared/components/ui';

export interface SevnQuestAppScreenProps {
  activeTab?: 'learn' | 'tower' | 'kotoba' | 'profile';
  showLanyard?: boolean;
  lanyardComponent?: React.ReactNode;
  highlightLearn?: boolean;
  learnPress?: number;
  dimNonLearn?: boolean;
  style?: React.CSSProperties;
}

export const SevnQuestAppScreen: React.FC<SevnQuestAppScreenProps> = ({
  activeTab = 'learn',
  showLanyard = false,
  lanyardComponent,
  highlightLearn = false,
  learnPress = 0,
  dimNonLearn = false,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 50% 20%, #1e2638 0%, #12151d 60%, #0a0d13 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '70px 24px 28px 24px',
        color: '#ffffff',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Decorative Sashiko / Stitched background lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(240,190,82,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Optional Lanyard hanging from top in Scene 05 */}
      {showLanyard && lanyardComponent && (
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
          }}
        >
          {lanyardComponent}
        </div>
      )}

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <LogoMark size={44} />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span
              style={{
                fontFamily: FONT.fantasy,
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: 1.5,
                color: '#ffffff',
              }}
            >
              SEVN<span style={{color: C.gold}}>QUEST</span>
            </span>
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 12,
                color: C.indigoSoft,
                letterSpacing: 0.5,
              }}
            >
              N5 · Kotoba & Kanji
            </span>
          </div>
        </div>

        {/* Level / Streak Pill */}
        <div
          style={{
            background: 'rgba(240, 190, 82, 0.15)',
            border: `1.5px solid ${C.gold}`,
            borderRadius: 16,
            padding: '5px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{fontSize: 14}}>🔥</span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 14,
              color: C.gold,
            }}
          >
            7 HARI
          </span>
        </div>
      </div>

      {/* Main Learning Content Body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
          zIndex: 10,
          padding: '16px 0',
        }}
      >
        {/* Hero Kanji Card */}
        <Surface
          tone="card"
          radius={26}
          border="rgba(240, 190, 82, 0.35)"
          style={{
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 14,
              fontWeight: 700,
              color: C.indigoSoft,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Kotoba Hari Ini
          </div>
          <div
            style={{
              fontFamily: FONT.jp,
              fontSize: 76,
              fontWeight: 900,
              color: C.gold,
              lineHeight: 1,
              textShadow: '0 4px 18px rgba(240,190,82,0.4)',
            }}
          >
            食べる
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 22,
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            たべる · makan
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 14,
              color: 'rgba(255,255,255,0.6)',
              fontStyle: 'italic',
            }}
          >
            “ご飯を食べる” (Makan nasi)
          </div>
        </Surface>

        {/* Mini Quest Progress List */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: FONT.body,
              fontSize: 14,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <span>Target Harian</span>
            <span style={{color: C.gold, fontWeight: 700}}>18 / 20 Kotoba</span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: 10,
              borderRadius: 5,
              background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '90%',
                height: '100%',
                background: `linear-gradient(90deg, ${C.matcha}, ${C.gold})`,
                borderRadius: 5,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom In-App Tab Bar (with LEARN, TOWER, KOTOBA, PROFILE) */}
      <div
        style={{
          background: 'rgba(25, 30, 42, 0.95)',
          borderRadius: 24,
          padding: '12px 14px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
          zIndex: 20,
        }}
      >
        {/* Tab 1: LEARN (Target in Scene 06) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '6px 14px',
            borderRadius: 16,
            background: highlightLearn
              ? 'rgba(240, 190, 82, 0.22)'
              : activeTab === 'learn'
              ? 'rgba(255,255,255,0.08)'
              : 'transparent',
            border: highlightLearn ? `2px solid ${C.gold}` : '2px solid transparent',
            boxShadow: highlightLearn
              ? `0 0 20px rgba(240,190,82,0.6)`
              : 'none',
            transform: `scale(${1 - learnPress * 0.12})`,
            transition: 'all 0.1s ease',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={highlightLearn || activeTab === 'learn' ? C.gold : 'rgba(255,255,255,0.5)'} strokeWidth="2.4" strokeLinecap="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span
            style={{
              fontFamily: FONT.body,
              fontWeight: 800,
              fontSize: 13,
              color: highlightLearn || activeTab === 'learn' ? C.gold : 'rgba(255,255,255,0.5)',
              letterSpacing: 0.5,
            }}
          >
            Learn
          </span>
        </div>

        {/* Tab 2: Tower */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            opacity: dimNonLearn ? 0.35 : 0.7,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <polygon points="12 2 2 22 22 22" />
          </svg>
          <span style={{fontFamily: FONT.body, fontSize: 13, color: '#fff'}}>
            Tower
          </span>
        </div>

        {/* Tab 3: Kotoba */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            opacity: dimNonLearn ? 0.35 : 0.7,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span style={{fontFamily: FONT.body, fontSize: 13, color: '#fff'}}>
            Kotoba
          </span>
        </div>

        {/* Tab 4: Profile */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            opacity: dimNonLearn ? 0.35 : 0.7,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style={{fontFamily: FONT.body, fontSize: 13, color: '#fff'}}>
            Profile
          </span>
        </div>
      </div>
    </div>
  );
};
