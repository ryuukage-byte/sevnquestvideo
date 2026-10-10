import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {NotEqual, Pill} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {
  At,
  Avatar,
  BOUNCY,
  Cap,
  GCard,
  Hi,
  Jp,
  Label,
  SOFT,
  Strike,
  Win,
  bump,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 16.0;

export const World2_PatternBreak: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // ---------- 16.0s - 20.0s: Tampil 知っている ----------
  const shiruIn = pp(T, 16.2, BOUNCY);
  const assumeIn = pp(T, 17.5, SOFT);

  // ---------- 20.0s - 24.5s: Glitch & Strike ❌ ----------
  const glitch = bump(T, 20.0, 20.6);
  const strikeP = ps(T, 20.3, 20.8);
  const tahuIn = pp(T, 20.9, BOUNCY);
  const shockP = pp(T, 21.6, BOUNCY);

  // Jitter offset untuk glitch effect
  const jitterX = glitch > 0.05 ? Math.sin(T * 120) * 16 * glitch : 0;
  const jitterY = glitch > 0.05 ? Math.cos(T * 90) * 10 * glitch : 0;

  // ---------- 24.5s - 28.5s: Formula Clash ----------
  const clashIn = ps(T, 24.5, 25.4);
  // Dua kartu mendekat menuju tengah
  const snapT = ps(T, 25.8, 26.2);
  // Clash impact & bounce
  const clashBounce = bump(T, 26.1, 26.9);
  const notEqDraw = ps(T, 26.1, 26.6);

  // ---------- 28.5s - 31.0s: Attention Reset ----------
  const resetFade = ps(T, 28.2, 28.6);
  const resetPop = pp(T, 28.6, BOUNCY);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="whoosh-soft" at={S(16.2)} volume={0.4} />
          <Sfx name="pop" at={S(17.5)} volume={0.4} />
          {/* Glitch & Error */}
          <Sfx name="buzz" at={S(20.0)} volume={0.65} />
          <Sfx name="error" at={S(20.3)} volume={0.6} />
          <Sfx name="impact-soft" at={S(20.9)} volume={0.7} />
          <Sfx name="tick" at={S(21.6)} volume={0.5} />
          {/* Clash */}
          <Sfx name="swipe" at={S(24.5)} volume={0.4} />
          <Sfx name="impact" at={S(26.1)} volume={0.75} />
          <Sfx name="error-soft" at={S(26.2)} volume={0.5} />
          {/* Attention Reset */}
          <Sfx name="chime" at={S(28.6)} volume={0.7} />
          <Sfx name="sparkle" at={S(28.8)} volume={0.5} />
        </>
      )}

      {/* ==================== BAGIAN 1: 知っている & BREAK (16s - 24.5s) ==================== */}
      <Win T={T} a={16.0} b={24.4} dy={0}>
        {/* Teks Utama: 知っている dengan glitch jitter */}
        <At
          y={480}
          style={{
            transform: `translate(-50%,-50%) translate(${jitterX}px, ${jitterY}px) scale(${mix(0.8, 1, shiruIn)})`,
            opacity: shiruIn,
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <span style={{fontFamily: FONT.mono, fontSize: 32, color: C.indigoSoft, letterSpacing: 2}}>
              shitte iru
            </span>
            <Jp size={160}>
              <span style={{color: glitch > 0.2 ? C.hanko : C.text}}>知って</span>
              <span style={{color: C.gold}}>いる</span>
            </Jp>
          </div>
        </At>

        {/* Asumsi awal: "sedang mengetahui?" (17.5s - 20.8s) */}
        {T < 21.0 && (
          <At y={740} style={{opacity: assumeIn * (1 - ps(T, 20.6, 20.9)), transform: `translate(-50%,-50%) scale(${mix(0.85, 1, assumeIn)})`}}>
            <GCard color={C.indigoSoft} style={{padding: '20px 42px'}}>
              <Strike p={strikeP} color={C.hanko} height={14}>
                <Label size={54} color={C.textSecondary}>
                  sedang mengetahui...?
                </Label>
              </Strike>
            </GCard>
          </At>
        )}

        {/* Koreksi tegas: TAHU! (20.9s - 24.5s) */}
        {T >= 20.9 && (
          <At y={760} style={{opacity: tahuIn, transform: `translate(-50%,-50%) scale(${mix(1.3, 1, tahuIn)})`}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
              <GCard color={C.gold} glow={0.9} style={{padding: '24px 56px', border: `3px solid ${C.gold}`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                  <span style={{fontFamily: FONT.display, fontWeight: 900, fontSize: 80, color: C.gold}}>
                    = TAHU
                  </span>
                </div>
              </GCard>
              <Pill color={C.hanko} size={34}>
                BUKAN SEDANG TAHU!
              </Pill>
            </div>
          </At>
        )}

        {/* Ekspresi Kaget / Bingung: !? + Avatar (21.6s - 24.5s) */}
        {T >= 21.6 && (
          <At y={1080} style={{opacity: shockP, transform: `translate(-50%,-50%) scale(${mix(0.7, 1, shockP)})`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <Avatar tier={3} height={160} />
              <span
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 900,
                  fontSize: 120,
                  color: C.gold,
                  textShadow: `0 0 40px ${hexA(C.gold, 0.7)}`,
                }}
              >
                !?
              </span>
            </div>
          </At>
        )}
      </Win>

      {/* ==================== BAGIAN 2: FORMULA CLASH (24.5s - 28.4s) ==================== */}
      <Win T={T} a={24.4} b={28.4} dy={0}>
        <div style={{position: 'absolute', inset: 0, opacity: 1 - resetFade}}>
          {/* Header */}
          <At y={380}>
            <Pill color={C.indigoSoft} size={34}>
              KONTRADIKSI LOGIKA
            </Pill>
          </At>

          {/* Kartu Kiri: ている = sedang */}
          <At
            x={mix(-120, 240, clashIn) + snapT * 40 - clashBounce * 50}
            y={680}
          >
            <GCard color={C.teal} glow={clashBounce * 0.8} style={{width: 380, height: 260, flexDirection: 'column', gap: 12}}>
              <Jp size={64} color={C.gold}>ている</Jp>
              <Label size={38} color={C.text}>= SEDANG</Label>
              <span style={{fontFamily: FONT.mono, fontSize: 20, color: C.textSecondary}}>Aktivitas</span>
            </GCard>
          </At>

          {/* Simbol NotEqual di tengah yang muncul saat clash */}
          <At x={540} y={680} style={{zIndex: 10, opacity: notEqDraw, transform: `translate(-50%,-50%) scale(${mix(0.5, 1.2, notEqDraw)})`}}>
            <NotEqual size={170} color={C.text} slash={C.hanko} p={notEqDraw} />
          </At>

          {/* Kartu Kanan: 知っている = tahu */}
          <At
            x={mix(1200, 840, clashIn) - snapT * 40 + clashBounce * 50}
            y={680}
          >
            <GCard color={C.hanko} glow={clashBounce * 0.8} style={{width: 380, height: 260, flexDirection: 'column', gap: 12}}>
              <Jp size={60} color={C.text}>知っている</Jp>
              <Label size={38} color={C.gold}>= TAHU</Label>
              <span style={{fontFamily: FONT.mono, fontSize: 20, color: C.textSecondary}}>Bukan sedang tahu</span>
            </GCard>
          </At>

          {/* Label status mismatch */}
          {T >= 26.2 && (
            <At y={980}>
              <GCard color={C.hanko} style={{padding: '16px 36px'}}>
                <Label size={42} color={C.hanko}>
                  ❌ Rumusnya tidak cocok!
                </Label>
              </GCard>
            </At>
          )}
        </div>
      </Win>

      {/* ==================== BAGIAN 3: ATTENTION RESET (28.4s - 31.0s) ==================== */}
      <Win T={T} a={28.4} b={31.0} dy={0}>
        <At y={740} style={{opacity: resetPop, transform: `translate(-50%,-50%) scale(${mix(0.85, 1, resetPop)})`}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, textAlign: 'center', padding: '0 60px'}}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                background: 'rgba(240,190,82,0.15)',
                border: `2px solid ${C.gold}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.display,
                fontWeight: 900,
                fontSize: 64,
                color: C.gold,
                boxShadow: `0 0 50px ${hexA(C.gold, 0.4)}`,
              }}
            >
              ?
            </div>

            <span
              style={{
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 66,
                color: C.text,
                lineHeight: 1.25,
                textShadow: '0 8px 30px rgba(0,0,0,0.85)',
              }}
            >
              Apa sebenarnya
              <br />
              fungsi <Hi>ている</Hi>?
            </span>
          </div>
        </At>
      </Win>

      {/* ==================== CAPTIONS ==================== */}
      <Cap t={T} at={16.2} until={19.8} size={50}>
        Tapi bagaimana dengan <Hi>知っている</Hi>?
      </Cap>
      <Cap t={T} at={20.1} until={24.2} size={52}>
        Bukan “sedang mengetahui”, melainkan <Hi>tahu</Hi>!
      </Cap>
      <Cap t={T} at={24.6} until={28.2} size={50}>
        Kalau <Hi>ている</Hi> selalu berarti "sedang", rumusnya jadi rusak.
      </Cap>
      <Cap t={T} at={28.5} until={31.0} size={54}>
        Lalu apa sebenarnya fungsi <Hi>ている</Hi>?
      </Cap>
    </AbsoluteFill>
  );
};
