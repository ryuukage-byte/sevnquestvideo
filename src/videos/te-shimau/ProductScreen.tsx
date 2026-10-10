import React from 'react';
import {LogoMark} from '../../shared/components/Logo';
import {Surface} from '../../shared/components/ui';
import {C, FONT} from '../../shared/theme';
import {BottomTabs} from '../houga-ta/ProductScreens';
import {hexA} from './kit';

// Layar Library › Tata Bahasa › Konjugasi — sama dengan yang dipakai video たほうがいい
// (src/videos/houga-ta/ProductScreens.tsx), ditambah interaksi "ketuk bentuk → lihat langkahnya".
// Koordinat = ruang IPhoneShell 760×1540.

export type FormId = 'masu' | 'te' | 'ta' | 'nai';

const FORMS: {id: FormId; label: string; color: string}[] = [
  {id: 'masu', label: 'ます', color: C.indigoSoft},
  {id: 'te', label: 'て', color: C.teal},
  {id: 'ta', label: 'た', color: C.gold},
  {id: 'nai', label: 'ない', color: C.matcha},
];

const VERBS: {verb: string; stem: string; forms: Record<FormId, string>}[] = [
  {verb: '食べる', stem: '食べ', forms: {masu: '食べます', te: '食べて', ta: '食べた', nai: '食べない'}},
  {verb: '飲む', stem: '飲', forms: {masu: '飲みます', te: '飲んで', ta: '飲んだ', nai: '飲まない'}},
  {verb: '書く', stem: '書', forms: {masu: '書きます', te: '書いて', ta: '書いた', nai: '書かない'}},
  {verb: '話す', stem: '話', forms: {masu: '話します', te: '話して', ta: '話した', nai: '話さない'}},
];

const CARD_H = 244;
const STEP_H = 232; // kartu langkah + jarak
const LIST_TOP = 128; // relatif terhadap area isi (top 200)
/** pusat chip bentuk pada kartu kata kerja pertama, di ruang layar ponsel */
export const chipPos = (id: FormId) => {
  const i = FORMS.findIndex((x) => x.id === id);
  const w = (760 - 72 - 56 - 30) / 4;
  return {x: 36 + 28 + w / 2 + i * (w + 10), y: 200 + LIST_TOP + 24 + 90 + 14 + 46};
};

const VerbCard: React.FC<{v: (typeof VERBS)[number]; active?: FormId | null; on?: number; press?: number}> = ({v, active, on = 0, press = 0}) => (
  <Surface tone="card" radius={34} style={{height: CARD_H, padding: '24px 28px', boxSizing: 'border-box', marginBottom: 22}}>
    <div style={{height: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
      <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 66, lineHeight: 1, color: C.gold}}>{v.verb}</span>
      <span style={{fontFamily: FONT.mono, fontSize: 16, color: C.textSecondary, letterSpacing: 1}}>KATA KERJA</span>
    </div>
    <div style={{display: 'flex', gap: 10, height: 92}}>
      {FORMS.map((fm) => {
        const a = active === fm.id ? on : 0;
        return (
          <div
            key={fm.id}
            style={{
              flex: 1,
              borderRadius: 22,
              background: hexA(fm.color, 0.1 + 0.18 * a),
              border: `1.5px solid ${hexA(fm.color, 0.4 + 0.6 * a)}`,
              boxShadow: a > 0 ? `0 0 ${36 * a}px ${hexA(fm.color, 0.4 * a)}` : undefined,
              transform: `scale(${1 - (active === fm.id ? press : 0) * 0.07})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <span style={{fontFamily: FONT.jp, fontSize: 15, fontWeight: 700, color: fm.color, letterSpacing: 1, lineHeight: 1.2}}>{fm.label}</span>
            <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 32, lineHeight: 1.2, color: C.text}}>{v.forms[fm.id]}</span>
          </div>
        );
      })}
    </div>
  </Surface>
);

export const ConjugationScreen: React.FC<{
  typed?: string;
  focus?: number;
  /** 0..1 kata kerja lain meredup saat pengguna mengetik */
  dim?: number;
  active?: FormId | null;
  on?: number;
  press?: number;
  /** 0..1 kartu langkah untuk bentuk aktif */
  step?: number;
  /** 0..1 daftar terdorong turun memberi tempat kartu langkah */
  push?: number;
}> = ({typed = '', focus = 0, dim = 0, active = null, on = 0, press = 0, step = 0, push = 0}) => {
  const fm = FORMS.find((x) => x.id === active);
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 12%, #1e2638 0%, #12151d 62%, #0a0d13 100%)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(240,190,82,0.12) 0%, transparent 55%)'}} />
      <div style={{position: 'absolute', top: 92, left: 36, right: 36, display: 'flex', alignItems: 'center', gap: 18}}>
        <LogoMark size={54} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 46, color: C.text, lineHeight: 1.05}}>Konjugasi</span>
          <span style={{fontFamily: FONT.body, fontSize: 20, color: C.indigoSoft}}>Library › Tata Bahasa › Konjugasi</span>
        </div>
      </div>
      <div style={{position: 'absolute', top: 200, left: 36, right: 36, bottom: 150}}>
        <Surface
          tone="inset"
          radius={30}
          stitch={false}
          border={hexA(C.gold, 0.2 + 0.8 * focus)}
          style={{height: 104, padding: '0 28px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 16}}
        >
          <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth={2.4} strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          {typed ? (
            <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 48, color: C.text}}>{typed}</span>
          ) : (
            <span style={{fontFamily: FONT.body, fontSize: 30, color: C.textMuted}}>Masukkan kata kerja</span>
          )}
        </Surface>
        <div style={{position: 'absolute', left: 0, right: 0, top: LIST_TOP}}>
          <VerbCard v={VERBS[0]} active={active} on={on} press={press} />
          {/* kata kerja lain meredup, lalu terdorong turun oleh kartu langkah */}
          <div style={{opacity: 1 - dim * 0.62, transform: `translateY(${push * STEP_H}px)`}}>
            <VerbCard v={VERBS[1]} />
            <VerbCard v={VERBS[2]} />
            <VerbCard v={VERBS[3]} />
          </div>
          {fm && (
            <div style={{position: 'absolute', left: 0, right: 0, top: CARD_H + 22, opacity: step, transform: `translateY(${(1 - step) * 36}px)`}}>
              <Surface tone="elevated" radius={30} border={fm.color} style={{height: STEP_H - 22, boxSizing: 'border-box', padding: '22px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8}}>
                <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 700, color: fm.color, letterSpacing: 1.5}}>LANGKAH · BENTUK {fm.label}</span>
                <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 54, lineHeight: 1.2, color: C.text}}>
                  {VERBS[0].stem}
                  <span style={{color: C.textMuted}}>る</span>
                  <span style={{fontFamily: FONT.mono, fontSize: 40, color: C.textSecondary, margin: '0 16px'}}>→</span>
                  {VERBS[0].stem}
                  <span style={{color: fm.color}}>{VERBS[0].forms[fm.id].slice(VERBS[0].stem.length)}</span>
                </span>
                <span style={{fontFamily: FONT.body, fontWeight: 600, fontSize: 26, color: C.textSecondary}}>
                  る dibuang, diganti <span style={{fontFamily: FONT.jp, fontWeight: 900, color: fm.color}}>{VERBS[0].forms[fm.id].slice(VERBS[0].stem.length)}</span>
                </span>
              </Surface>
            </div>
          )}
        </div>
      </div>
      <BottomTabs active="library" />
    </div>
  );
};
