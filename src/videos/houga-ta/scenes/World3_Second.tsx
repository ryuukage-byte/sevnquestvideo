import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx} from '../../../shared/components/Sfx';
import {CheckIcon, NotEqual, Pill, Surface} from '../../../shared/components/ui';
import {C, FONT} from '../../../shared/theme';
import {IPhoneShell} from '../../iphone/components/iPhoneShell';
import {
  At,
  Avatar,
  BOUNCY,
  Cap,
  ChatBubble,
  HeartIcon,
  Hi,
  Label,
  Line,
  SOFT,
  SPRING,
  Strike,
  Win,
  hexA,
  mix,
  pp,
  ps,
  sec,
  useAbs,
} from '../kit';

const START = 49;
const MSG = '早めに伝えたほうがいい。';

export const World3_Second: React.FC<{sfx?: boolean}> = ({sfx = true}) => {
  const T = useAbs(START);
  const S = (x: number) => sec(x - START);

  // S11 — phone + pesan diketik + notifikasi
  const phoneIn = ps(T, 49.0, 49.9);
  const phoneOut = ps(T, 53.6, 54.3);
  const typed = Math.floor(ps(T, 50.1, 51.9, (x) => x) * MSG.length);
  const sent = ps(T, 52.0, 52.3);
  const notif = pp(T, 52.5, SPRING);

  // S12 — timeline
  const base = ps(T, 54.1, 55.2);
  const early = ps(T, 55.4, 56.4);
  const n1 = pp(T, 54.3, SOFT);
  const n2 = pp(T, 54.7, SOFT);
  const n3 = pp(T, 55.0, SOFT);
  const good = pp(T, 56.5, BOUNCY);

  // S13
  const saran = pp(T, 59.1, BOUNCY);
  const wajib = pp(T, 60.1, SPRING);
  const strike = ps(T, 60.6, 61.0);
  const neq = pp(T, 61.2, BOUNCY);

  // S14
  const bub = pp(T, 62.1, SOFT);
  const heart = pp(T, 62.7, BOUNCY);
  const crack = ps(T, 64.0, 65.2, (x) => x * x);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {sfx && (
        <>
          <Sfx name="swipe" at={S(49.0)} volume={0.4} />
          <Sfx name="tick" at={S(50.3)} volume={0.35} />
          <Sfx name="tick" at={S(50.7)} volume={0.35} />
          <Sfx name="tick" at={S(51.1)} volume={0.35} />
          <Sfx name="tick" at={S(51.5)} volume={0.35} />
          <Sfx name="click" at={S(52.0)} volume={0.6} />
          <Sfx name="ding" at={S(52.5)} volume={0.55} />
          <Sfx name="whoosh-soft" at={S(53.6)} volume={0.35} />
          <Sfx name="pop" at={S(54.3)} volume={0.4} />
          <Sfx name="pop" at={S(54.7)} volume={0.4} />
          <Sfx name="pop" at={S(55.0)} volume={0.4} />
          <Sfx name="stroke" at={S(55.4)} volume={0.35} />
          <Sfx name="success" at={S(56.5)} volume={0.5} />
          <Sfx name="impact-soft" at={S(59.1)} volume={0.55} />
          <Sfx name="pop" at={S(60.1)} volume={0.4} />
          <Sfx name="swipe" at={S(60.6)} volume={0.5} />
          <Sfx name="error-soft" at={S(60.95)} volume={0.4} />
          <Sfx name="impact-soft" at={S(61.2)} volume={0.5} />
          <Sfx name="pop" at={S(62.1)} volume={0.4} />
          <Sfx name="pop" at={S(62.7)} volume={0.45} />
          <Sfx name="thud" at={S(64.0)} volume={0.5} />
          <Sfx name="descend" at={S(64.1)} volume={0.35} />
        </>
      )}

      {/* ---------- S11 · pesan kedua ---------- */}
      <Win T={T} a={49.0} b={54.0} dy={0} outD={0.3}>
        <div
          style={{
            position: 'absolute',
            left: 160,
            top: 20,
            transform: `translateY(${(1 - phoneIn) * 1500 + phoneOut * 1500}px) scale(0.78)`,
            transformOrigin: '50% 50%',
          }}
        >
          <IPhoneShell>
            <div
              style={{
                flex: 1,
                background: 'radial-gradient(ellipse at 50% 0%, #1e2638 0%, #12151d 70%)',
                padding: '110px 36px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 22, borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                <Avatar tier={2} height={84} />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 34, color: C.text}}>Bang Sevn</span>
                  <span style={{fontFamily: FONT.body, fontSize: 22, color: C.matcha}}>online</span>
                </div>
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 22}}>
                <div style={{alignSelf: 'flex-start', opacity: ps(T, 49.6, 50.0)}}>
                  <ChatBubble size={34}>Kapan sebaiknya bilang?</ChatBubble>
                </div>
                <div style={{opacity: ps(T, 50.0, 50.2), transform: `translateY(${(1 - sent) * 0}px)`}}>
                  <ChatBubble mine size={44}>
                    <span style={{fontFamily: FONT.jp, fontWeight: 900}}>
                      {MSG.slice(0, typed)}
                      {sent < 1 && <span style={{opacity: Math.sin(T * 12) > 0 ? 1 : 0, color: C.gold}}>|</span>}
                    </span>
                  </ChatBubble>
                </div>
              </div>
              <div
                style={{
                  height: 76,
                  borderRadius: 38,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </div>
            {/* notifikasi masuk dari atas */}
            <div
              style={{
                position: 'absolute',
                left: 28,
                right: 28,
                top: 70,
                transform: `translateY(${(1 - notif) * -220}px)`,
                opacity: notif,
                zIndex: 200,
              }}
            >
              <Surface tone="elevated" radius={34} border={C.gold} style={{padding: '22px 28px', display: 'flex', gap: 20, alignItems: 'center'}}>
                <div style={{width: 20, height: 20, borderRadius: 10, background: C.gold}} />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 800, color: C.gold, letterSpacing: 1.5}}>SEVNQUEST</span>
                  <span style={{fontFamily: FONT.body, fontSize: 28, fontWeight: 700, color: C.text}}>Lebih awal itu lebih baik</span>
                </div>
              </Surface>
            </div>
          </IPhoneShell>
        </div>
      </Win>
      <Cap t={T} at={52.2} until={53.9} size={56}>
        Sebaiknya <Hi>beri tahu lebih awal</Hi>
      </Cap>

      {/* ---------- S12 · lebih awal ---------- */}
      <Win T={T} a={54.0} b={58.6} dy={0}>
        <Line d="M200 880 H880" p={base} color={hexA(C.indigoSoft, 0.4)} w={8} />
        <Line d="M200 880 H540" p={early} color={C.gold} w={14} />
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          {early > 0 && early < 1 && <circle cx={200 + 340 * early} cy={880} r={22} fill={C.goldSoft} />}
          <circle cx={200} cy={880} r={26 * n1} fill={C.gold} />
          <circle cx={540} cy={880} r={26 * n2} fill={C.indigoSoft} />
          <circle cx={880} cy={880} r={26 * n3} fill={C.hanko} />
        </svg>
        <At x={200} y={800} style={{opacity: n1}}><Pill color={C.gold} size={34} filled>LEBIH AWAL</Pill></At>
        <At x={540} y={800} style={{opacity: n2}}><Pill color={C.indigoSoft} size={34}>SEKARANG</Pill></At>
        <At x={880} y={800} style={{opacity: n3}}><Pill color={C.hanko} size={34}>TERLAMBAT</Pill></At>
        <At x={260} y={1040} style={{opacity: good, transform: `translate(-50%,-50%) scale(${good})`, flexDirection: 'column', gap: 12}}>
          <span style={{color: C.matcha}}><CheckIcon size={110} stroke={4.5} draw={good} /></span>
          <Label size={44} color={C.matcha}>hasil lebih baik</Label>
        </At>
        <At x={880} y={1040} style={{opacity: n3 * 0.6, flexDirection: 'column', gap: 12}}>
          <Label size={110} color={C.hanko}>?</Label>
          <Label size={44} color={C.textSecondary}>mungkin terlambat</Label>
        </At>
      </Win>
      <Cap t={T} at={55.8} until={58.6} size={54}>
        <Hi>Lebih awal</Hi>
        <br />→ hasil mungkin lebih baik
      </Cap>

      {/* ---------- S13 · saran ≠ keharusan ---------- */}
      <Win T={T} a={59.0} b={61.8} dy={0}>
        <At y={640} style={{opacity: saran, transform: `translate(-50%,-50%) scale(${mix(1.5, 1, saran)})`}}>
          <Label size={250} color={C.gold} style={{fontWeight: 900, textShadow: `0 0 70px ${hexA(C.gold, 0.45)}, 0 10px 30px rgba(0,0,0,0.7)`}}>
            SARAN
          </Label>
        </At>
        <At y={930} style={{opacity: wajib, transform: `translate(-50%,-50%) scale(${wajib})`}}>
          <Strike p={strike}>
            <Label size={150} color={C.hanko} style={{fontWeight: 900}}>WAJIB</Label>
          </Strike>
        </At>
        <At y={1220} style={{opacity: neq, transform: `translate(-50%,-50%) scale(${mix(0.8, 1, neq)})`, gap: 14}}>
          <Label size={62} color={C.gold}>SARAN</Label>
          <NotEqual size={110} />
          <Label size={62}>KEHARUSAN</Label>
        </At>
      </Win>

      {/* ---------- S14 · punchline ---------- */}
      <Win T={T} a={62.0} b={65.7} dy={0}>
        <At x={560} y={520} style={{opacity: bub, transform: `translate(-50%,-50%) translateY(${(1 - bub) * 200}px)`, gap: 20}}>
          <Avatar tier={2} height={140} />
          <ChatBubble mine size={42}>
            <span style={{fontFamily: FONT.jp, fontWeight: 900}}>早めに伝えたよ</span>
          </ChatBubble>
        </At>
        <At y={960} style={{opacity: heart * (1 - crack), transform: `translate(-50%,-50%) scale(${heart * (1 + 0.04 * Math.sin(T * 8) * (1 - crack))})`}}>
          <HeartIcon size={420} crack={crack} />
        </At>
      </Win>
      <Cap t={T} at={64.3} until={65.7}>
        hasilnya tetap <Hi c={C.hanko}>belum pasti</Hi>
      </Cap>
    </AbsoluteFill>
  );
};
