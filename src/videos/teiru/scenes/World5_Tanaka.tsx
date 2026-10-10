import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  Avatar,
  BOUNCY,
  Cap,
  ChatBubble,
  GCard,
  Hi,
  Jp,
  Win,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 78.0;

export const World5_Tanaka: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- 78.0s - 82.5s: Pertanyaan Pertama ----------
  const q1In = pp(T, 78.5, BOUNCY);

  // ---------- 82.5s - 85.5s: Jawaban Kedua ----------
  const a1In = pp(T, 82.5, BOUNCY);

  // ---------- 85.0s - 89.0s: Highlight 知っています ----------
  const hlIn = ps(T, 84.8, 85.6);
  const glowLoop = Math.sin(T * 8) * 0.2;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="swipe" at={S(78.5)} volume={0.4} />
          <Sfx name="pop" at={S(78.7)} volume={0.5} />
          <Sfx name="swipe" at={S(82.5)} volume={0.4} />
          <Sfx name="pop" at={S(82.7)} volume={0.5} />
          <Sfx name="chime" at={S(85.0)} volume={0.65} />
          <Sfx name="sparkle" at={S(85.2)} volume={0.45} />
        </>
      )}

      <Win T={T} a={78.0} b={89.0} dy={0}>
        {/* Header Tag */}
        <At y={320}>
          <Pill color={C.indigoSoft} size={32}>
            CONTOH DALAM PERCAKAPAN NYATA
          </Pill>
        </At>

        {/* ========== BUBBLE 1: PENANYA (Kiri) ========== */}
        <div style={{position: 'absolute', inset: 0, opacity: q1In}}>
          {/* Avatar Penanya */}
          <At x={170} y={480} style={{transform: `translate(-50%,-50%) scale(${mix(0.8, 1, q1In)})`}}>
            <Avatar tier={1} height={140} />
          </At>

          {/* Bubble Pertanyaan */}
          <At x={610} y={480} style={{transform: `translate(-50%,-50%) scale(${mix(0.85, 1, q1In)})`}}>
            <ChatBubble width={680} size={38}>
              <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <Jp size={46} color={C.text}>
                  田中さんを<span style={{color: C.gold}}>知っています</span>か？
                </Jp>
                <span style={{fontFamily: FONT.body, fontSize: 24, color: C.indigoSoft}}>
                  Kamu kenal Tanaka?
                </span>
              </div>
            </ChatBubble>
          </At>
        </div>

        {/* ========== BUBBLE 2: PENJAWAB (Kanan) ========== */}
        {T >= 82.2 && (
          <div style={{position: 'absolute', inset: 0, opacity: a1In}}>
            {/* Bubble Jawaban */}
            <At x={470} y={720} style={{transform: `translate(-50%,-50%) scale(${mix(0.85, 1, a1In)})`}}>
              <ChatBubble mine width={680} size={38} tint={hlIn > 0.5 ? C.gold : undefined}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                  <Jp size={46} color={C.text}>
                    はい、
                    <span
                      style={{
                        color: C.gold,
                        textShadow: `0 0 ${35 * hlIn}px ${hexA(C.gold, 0.85)}`,
                        fontWeight: 900,
                      }}
                    >
                      知っています
                    </span>
                    。
                  </Jp>
                  <span style={{fontFamily: FONT.body, fontSize: 24, color: '#e0eaff'}}>
                    Iya, saya kenal.
                  </span>
                </div>
              </ChatBubble>
            </At>

            {/* Avatar Penjawab */}
            <At x={910} y={720} style={{transform: `translate(-50%,-50%) scale(${mix(0.8, 1, a1In)})`}}>
              <Avatar tier={2} height={140} />
            </At>
          </div>
        )}

        {/* ========== PENJELASAN LOGIKA DI BAWAH CHAT (85.0s - 89.0s) ========== */}
        {T >= 84.8 && (
          <At y={980} style={{opacity: hlIn, transform: `translate(-50%,-50%) scale(${mix(0.9, 1, hlIn)})`}}>
            <GCard color={C.gold} glow={0.6 + glowLoop} style={{width: 820, padding: '24px 36px', flexDirection: 'column', gap: 10, textAlign: 'center'}}>
              <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 36, color: C.gold}}>
                "Kenal" = Status Relasi yang Berlanjut
              </span>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary, lineHeight: 1.35}}>
                Bukan sedang sibuk mencari info tentang Tanaka,
                <br />
                melainkan berada dalam status <span style={{color: C.text, fontWeight: 700}}>sudah kenal</span> dengannya.
              </span>
            </GCard>
          </At>
        )}
      </Win>

      {/* ==================== CAPTIONS ==================== */}
      <Cap t={T} at={78.5} until={82.0} size={50}>
        Contohnya dalam kalimat: <Hi>田中さんを知っていますか？</Hi>
      </Cap>
      <Cap t={T} at={82.5} until={85.5} size={52}>
        Dijawab: <Hi>はい、知っています</Hi> (Iya, saya kenal).
      </Cap>
      <Cap t={T} at={85.8} until={89.0} size={50}>
        Menunjukkan <Hi>keadaan kenal</Hi> yang terus berlaku sampai sekarang.
      </Cap>
    </AbsoluteFill>
  );
};
