import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene08_BetterStrategy: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 00:48.00: Header
  const pHeader = pop(frame, fps, sec(48.0), SPRING);

  // 00:48.50: Line 1: CARA BELAJARNYA
  const pLine1 = pop(frame, fps, sec(48.4), SPRING);

  // 00:49.20: Line 2: JUGA NGGAK HARUS SATU!
  const pLine2 = pop(frame, fps, sec(49.2), BOUNCY);

  // 00:50.00: Expanding portal aura / bridge to SevnQuest
  const pAura = pop(frame, fps, sec(50.0), SPRING);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh" at={sec(48.2)} volume={0.4} />
          <Sfx name="impact" at={sec(49.3)} volume={0.65} />
          <Sfx name="rise" at={sec(50.1)} volume={0.5} />
        </>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
        }}
      >
        {/* Top Header Pill */}
        <div style={{position: 'absolute', top: 280, opacity: pHeader}}>
          <Pill color={C.indigoSoft} size={28} filled>
            💡 PERSPEKTIF BELAJAR SEVNQUEST
          </Pill>
        </div>

        {/* Big Impact Statements */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            textAlign: 'center',
            marginTop: 40,
          }}
        >
          {frame >= sec(48.2) && (
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 58,
                fontWeight: 800,
                color: C.textSecondary,
                letterSpacing: 1,
                opacity: pLine1,
                transform: `scale(${pLine1})`,
              }}
            >
              CARA BELAJARNYA
            </div>
          )}

          {frame >= sec(49.0) && (
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: 72,
                fontWeight: 900,
                color: C.gold,
                letterSpacing: 2,
                opacity: pLine2,
                transform: `scale(${pLine2})`,
                textShadow: '0 0 45px rgba(240,190,82,0.6)',
              }}
            >
              NGGAK HARUS SATU.
            </div>
          )}
        </div>

        {/* Connecting Card Preview */}
        {frame >= sec(49.8) && (
          <div
            style={{
              marginTop: 60,
              width: '100%',
              maxWidth: 780,
              opacity: pAura,
              transform: `scale(${pAura}) translateY(${(1 - pAura) * 20}px)`,
            }}
          >
            <Surface
              tone="elevated"
              radius={36}
              border={C.gold}
              style={{
                padding: '36px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.7), 0 0 35px rgba(240,190,82,0.25)',
              }}
            >
              <span style={{fontSize: 36}}>🎮</span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 26,
                  fontWeight: 800,
                  color: C.goldSoft,
                  letterSpacing: 2,
                }}
              >
                MASUK KE SEVNQUEST ECOSYSTEM →
              </span>
            </Surface>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
