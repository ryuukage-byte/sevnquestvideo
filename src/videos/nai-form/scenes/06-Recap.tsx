import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {pop, SPRING} from '../../../shared/anim';
import {Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';

export const RecapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const camZoom = interpolate(frame, [0, 100], [1.06, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pEnter = pop(frame, fps, 10, SPRING);
  const pNode = pop(frame, fps, 40, SPRING);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${camZoom})`,
        pointerEvents: 'none',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 850,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,190,82,0.2) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 340,
          textAlign: 'center',
          transform: `scale(${0.9 + 0.1 * pEnter})`,
          opacity: pEnter,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 48,
            fontWeight: 900,
            color: C.gold,
            letterSpacing: -0.5,
          }}
        >
          RINGKASAN BENTUK NAI
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: FONT.mono,
            fontSize: 24,
            color: C.textSecondary,
            letterSpacing: 2,
          }}
        >
          3 KELOMPOK DALAM SATU SISTEM
        </div>
      </div>

      {/* 3 Unified Pillar Rows */}
      <div
        style={{
          position: 'absolute',
          top: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          transform: `scale(${0.92 + 0.08 * pEnter})`,
          opacity: pEnter,
        }}
      >
        {/* Row 1: Group 1 */}
        <Surface
          tone="elevated"
          radius={28}
          border={C.gold}
          style={{
            width: 880,
            padding: '24px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(240,190,82,0.25)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <span
              style={{
                background: C.gold,
                color: '#101420',
                padding: '6px 14px',
                borderRadius: 10,
                fontSize: 20,
                fontWeight: 900,
                fontFamily: FONT.mono,
              }}
            >
              G1
            </span>
            <div>
              <div style={{fontSize: 28, fontWeight: 900, color: C.text}}>
                五段動詞 (GODAN)
              </div>
              <div style={{fontSize: 20, color: C.goldSoft, fontFamily: FONT.mono, marginTop: 4}}>
                U ➔ A + ない (う ➔ わ)
              </div>
            </div>
          </div>
          <div style={{fontFamily: FONT.jp, fontSize: 34, fontWeight: 900, color: C.gold}}>
            書かない · 買わない
          </div>
        </Surface>

        {/* Row 2: Group 2 */}
        <Surface
          tone="card"
          radius={28}
          border={C.matcha}
          style={{
            width: 880,
            padding: '24px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <span
              style={{
                background: C.matcha,
                color: '#101420',
                padding: '6px 14px',
                borderRadius: 10,
                fontSize: 20,
                fontWeight: 900,
                fontFamily: FONT.mono,
              }}
            >
              G2
            </span>
            <div>
              <div style={{fontSize: 28, fontWeight: 900, color: C.text}}>
                一段動詞 (ICHIDAN)
              </div>
              <div style={{fontSize: 20, color: C.matcha, fontFamily: FONT.mono, marginTop: 4}}>
                る ➔ ない
              </div>
            </div>
          </div>
          <div style={{fontFamily: FONT.jp, fontSize: 34, fontWeight: 900, color: C.matcha}}>
            食べない · 見ない
          </div>
        </Surface>

        {/* Row 3: Group 3 */}
        <Surface
          tone="card"
          radius={28}
          border={C.fuji}
          style={{
            width: 880,
            padding: '24px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <span
              style={{
                background: C.fuji,
                color: '#fff',
                padding: '6px 14px',
                borderRadius: 10,
                fontSize: 20,
                fontWeight: 900,
                fontFamily: FONT.mono,
              }}
            >
              G3
            </span>
            <div>
              <div style={{fontSize: 28, fontWeight: 900, color: C.text}}>
                不規則動詞 (IRREGULAR)
              </div>
              <div style={{fontSize: 20, color: C.fuji, fontFamily: FONT.mono, marginTop: 4}}>
                Khusus (Hanya 2 kata)
              </div>
            </div>
          </div>
          <div style={{fontFamily: FONT.jp, fontSize: 34, fontWeight: 900, color: C.fuji}}>
            しない · 来ない
          </div>
        </Surface>
      </div>

      {/* Central Connecting Node: NAI */}
      <div
        style={{
          position: 'absolute',
          top: 960,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${0.9 + 0.1 * pNode})`,
          opacity: pNode,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${C.goldSoft} 0%, ${C.gold} 70%, #d49520 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(240,190,82,0.8), 0 0 120px rgba(240,190,82,0.4)',
          }}
        >
          <span style={{fontFamily: FONT.jp, fontSize: 52, fontWeight: 900, color: '#101420'}}>
            ない
          </span>
        </div>
        <div
          style={{
            marginTop: 16,
            fontFamily: FONT.mono,
            fontSize: 22,
            fontWeight: 800,
            color: C.goldSoft,
            letterSpacing: 3,
          }}
        >
          SEVNQUEST CONJUGATION SYSTEM
        </div>
      </div>
    </div>
  );
};
