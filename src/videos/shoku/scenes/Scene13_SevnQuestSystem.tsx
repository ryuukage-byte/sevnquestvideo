import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {BOUNCY, pop, SPRING} from '../../../shared/anim';
import {LogoMark} from '../../../shared/components/Logo';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {sec} from '../timing';

export const Scene13_SevnQuestSystem: React.FC<{
  dur?: number;
  sfx?: boolean;
  globalFrame: number;
}> = ({sfx = true, globalFrame: frame}) => {
  const {fps} = useVideoConfig();

  // 01:40.40: LogoMark SevnQuest top-center
  const pLogo = pop(frame, fps, sec(100.4), SPRING);

  // 01:40.85: Main node 食
  const pMainShoku = pop(frame, fps, sec(100.85), BOUNCY);

  // 01:41.30: Node KANJI
  const pNodeKanji = pop(frame, fps, sec(101.3), SPRING);

  // 01:41.85: Node ARTI
  const pNodeArti = pop(frame, fps, sec(101.85), SPRING);

  // 01:43.00: Badge "BUKAN CUMA HAFALAN"
  const pBadgeBukan = pop(frame, fps, sec(103.0), BOUNCY);

  // 01:44.78: Node KOTOBA
  const pNodeKotoba = pop(frame, fps, sec(104.78), BOUNCY);
  const pKotobaEx1 = pop(frame, fps, sec(105.1), SPRING); // 食べる
  const pKotobaEx2 = pop(frame, fps, sec(105.45), SPRING); // 食事
  const pKotobaEx3 = pop(frame, fps, sec(105.8), SPRING); // 食堂

  // 01:47.82: Node READING
  const pNodeReading = pop(frame, fps, sec(107.82), BOUNCY);
  const pReadTa = pop(frame, fps, sec(108.05), BOUNCY); // た
  const pReadShoku = pop(frame, fps, sec(108.3), BOUNCY); // しょく

  // 01:49.11: Node USAGE
  const pNodeUsage = pop(frame, fps, sec(109.11), BOUNCY);
  const pSentence1 = pop(frame, fps, sec(109.5), SPRING); // ご飯を食べる。
  const pSentence2 = pop(frame, fps, sec(109.9), SPRING); // 食事をする。

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="pop" at={sec(100.85)} volume={0.5} />
          <Sfx name="pop" at={sec(104.78)} volume={0.5} />
          <Sfx name="ding" at={sec(109.11)} volume={0.55} />
        </>
      )}

      {/* Top Logo and Header */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          opacity: pLogo,
          transform: `scale(${pLogo})`,
          zIndex: 10,
        }}
      >
        <LogoMark size={76} glow={0.3} />
        <Pill color={C.gold} size={22}>
          SEVNQUEST LEARNING SYSTEM
        </Pill>
      </div>

      {/* Main Learning System Pipeline */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100,
          gap: 20,
        }}
      >
        {/* ROW 1: KANJI + ARTI (Root) */}
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          {frame >= sec(100.85) && (
            <div style={{opacity: pMainShoku, transform: `scale(${pMainShoku})`}}>
              <Surface
                tone="elevated"
                radius={28}
                border={C.gold}
                style={{
                  padding: '16px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.jp,
                    fontSize: 54,
                    fontWeight: 900,
                    color: C.gold,
                  }}
                >
                  食
                </span>
                <span
                  style={{
                    fontFamily: FONT.display,
                    fontSize: 28,
                    fontWeight: 800,
                    color: C.text,
                    opacity: pNodeKanji,
                    transform: `scale(${pNodeKanji})`,
                  }}
                >
                  KANJI
                </span>
              </Surface>
            </div>
          )}

          {frame >= sec(101.85) && (
            <div style={{opacity: pNodeArti, transform: `scale(${pNodeArti})`}}>
              <Surface tone="card" radius={24} style={{padding: '16px 28px'}}>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 28,
                    fontWeight: 800,
                    color: C.textSecondary,
                  }}
                >
                  ARTI: makan
                </span>
              </Surface>
            </div>
          )}

          {frame >= sec(103.0) && (
            <div style={{opacity: pBadgeBukan, transform: `scale(${pBadgeBukan})`}}>
              <Pill color={C.hanko} size={18} filled>
                BUKAN CUMA HAFALAN
              </Pill>
            </div>
          )}
        </div>

        {/* Down Arrow 1 */}
        {frame >= sec(104.78) && (
          <span style={{fontFamily: FONT.mono, fontSize: 32, color: C.indigoSoft}}>
            ↓
          </span>
        )}

        {/* ROW 2: KOTOBA & Real Examples */}
        {frame >= sec(104.78) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              opacity: pNodeKotoba,
              transform: `scale(${pNodeKotoba})`,
            }}
          >
            <Pill color={C.indigoSoft} size={24} filled>
              KOTOBA
            </Pill>

            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              {frame >= sec(105.1) && (
                <div style={{opacity: pKotobaEx1, transform: `scale(${pKotobaEx1})`}}>
                  <Surface tone="card" radius={20} style={{padding: '10px 20px'}}>
                    <span style={{fontFamily: FONT.jp, fontSize: 28, fontWeight: 800, color: C.text}}>
                      <span style={{color: C.gold}}>食</span>べる
                    </span>
                  </Surface>
                </div>
              )}
              {frame >= sec(105.45) && (
                <div style={{opacity: pKotobaEx2, transform: `scale(${pKotobaEx2})`}}>
                  <Surface tone="card" radius={20} style={{padding: '10px 20px'}}>
                    <span style={{fontFamily: FONT.jp, fontSize: 28, fontWeight: 800, color: C.text}}>
                      <span style={{color: C.gold}}>食</span>事
                    </span>
                  </Surface>
                </div>
              )}
              {frame >= sec(105.8) && (
                <div style={{opacity: pKotobaEx3, transform: `scale(${pKotobaEx3})`}}>
                  <Surface tone="card" radius={20} style={{padding: '10px 20px'}}>
                    <span style={{fontFamily: FONT.jp, fontSize: 28, fontWeight: 800, color: C.text}}>
                      <span style={{color: C.gold}}>食</span>堂
                    </span>
                  </Surface>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Down Arrow 2 */}
        {frame >= sec(107.82) && (
          <span style={{fontFamily: FONT.mono, fontSize: 32, color: C.indigoSoft}}>
            ↓
          </span>
        )}

        {/* ROW 3: READING */}
        {frame >= sec(107.82) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: pNodeReading,
              transform: `scale(${pNodeReading})`,
            }}
          >
            <Pill color={C.matcha} size={24} filled>
              READING
            </Pill>

            {frame >= sec(108.05) && (
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 32,
                  fontWeight: 800,
                  color: C.goldSoft,
                  opacity: pReadTa,
                }}
              >
                た
              </span>
            )}
            {frame >= sec(108.3) && (
              <span
                style={{
                  fontFamily: FONT.jp,
                  fontSize: 32,
                  fontWeight: 800,
                  color: C.goldSoft,
                  opacity: pReadShoku,
                }}
              >
                · しょく
              </span>
            )}
          </div>
        )}

        {/* Down Arrow 3 */}
        {frame >= sec(109.11) && (
          <span style={{fontFamily: FONT.mono, fontSize: 32, color: C.indigoSoft}}>
            ↓
          </span>
        )}

        {/* ROW 4: USAGE (Context Sentences) */}
        {frame >= sec(109.11) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              opacity: pNodeUsage,
              transform: `scale(${pNodeUsage})`,
            }}
          >
            <Pill color={C.fuji} size={24} filled>
              USAGE (KONTEKS NYATA)
            </Pill>

            <div style={{display: 'flex', flexDirection: 'column', gap: 10, width: 620}}>
              {frame >= sec(109.5) && (
                <div style={{opacity: pSentence1, transform: `translateX(${(1 - pSentence1) * -40}px)`}}>
                  <Surface tone="card" radius={22} style={{padding: '12px 24px'}}>
                    <span style={{fontFamily: FONT.jp, fontSize: 30, fontWeight: 700, color: C.text}}>
                      ご飯を<span style={{color: C.gold}}>食べる</span>。
                      <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary, marginLeft: 16}}>
                        (Makan nasi)
                      </span>
                    </span>
                  </Surface>
                </div>
              )}

              {frame >= sec(109.9) && (
                <div style={{opacity: pSentence2, transform: `translateX(${(1 - pSentence2) * 40}px)`}}>
                  <Surface tone="card" radius={22} style={{padding: '12px 24px'}}>
                    <span style={{fontFamily: FONT.jp, fontSize: 30, fontWeight: 700, color: C.text}}>
                      <span style={{color: C.gold}}>食事</span>をする。
                      <span style={{fontFamily: FONT.body, fontSize: 22, color: C.textSecondary, marginLeft: 16}}>
                        (Menyantap hidangan)
                      </span>
                    </span>
                  </Surface>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
