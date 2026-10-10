import React from 'react';
import {LogoMark} from '../../shared/components/Logo';
import {Surface} from '../../shared/components/ui';
import {C, FONT} from '../../shared/theme';
import {SevnQuestAppScreen} from '../iphone/components/SevnQuestAppScreen';
import {hexA} from './kit';

// Layar in-app untuk fitur Library → Tata Bahasa → Konjugasi.
// Repo belum menyimpan screenshot/komponen layar-layar ini, jadi dirakit dari token & komponen SevnQuest
// yang sama (Surface, LogoMark, SevnQuestAppScreen, warna/font tema). Koordinat = ruang iPhoneShell 760×1540.

export type TabId = 'learn' | 'tower' | 'library' | 'profile';

export const TAB_X: Record<TabId, number> = {learn: 109, tower: 290, library: 471, profile: 652};
export const TAB_Y = 1470;

const TABS: {id: TabId; label: string; icon: React.ReactNode}[] = [
  {id: 'learn', label: 'Learn', icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />},
  {id: 'tower', label: 'Tower', icon: <polygon points="12 2 2 22 22 22" />},
  {id: 'library', label: 'Library', icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>},
  {id: 'profile', label: 'Profile', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>},
];

export const BottomTabs: React.FC<{active: TabId; press?: TabId | null}> = ({active, press}) => (
  <div
    style={{
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 16,
      height: 108,
      background: '#191e2a',
      borderRadius: 30,
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 30,
    }}
  >
    {TABS.map((t) => {
      const on = t.id === active;
      return (
        <div
          key={t.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '8px 22px',
            borderRadius: 20,
            background: on ? 'rgba(240,190,82,0.2)' : 'transparent',
            border: on ? `2px solid ${C.gold}` : '2px solid transparent',
            transform: `scale(${press === t.id ? 0.88 : 1})`,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={on ? C.gold : 'rgba(255,255,255,0.55)'} strokeWidth="2.2" strokeLinecap="round">
            {t.icon}
          </svg>
          <span style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 17, color: on ? C.gold : 'rgba(255,255,255,0.55)'}}>{t.label}</span>
        </div>
      );
    })}
  </div>
);

const Frame: React.FC<{title: string; sub?: string; children: React.ReactNode; tab: TabId; pressTab?: TabId | null}> = ({
  title,
  sub,
  children,
  tab,
  pressTab,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 50% 12%, #1e2638 0%, #12151d 62%, #0a0d13 100%)',
      overflow: 'hidden',
    }}
  >
    <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(240,190,82,0.12) 0%, transparent 55%)'}} />
    <div style={{position: 'absolute', top: 92, left: 36, right: 36, display: 'flex', alignItems: 'center', gap: 18}}>
      <LogoMark size={54} />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 46, color: C.text, lineHeight: 1.05}}>{title}</span>
        {sub && <span style={{fontFamily: FONT.body, fontSize: 20, color: C.indigoSoft}}>{sub}</span>}
      </div>
    </div>
    <div style={{position: 'absolute', top: 200, left: 36, right: 36, bottom: 150}}>{children}</div>
    <BottomTabs active={tab} press={pressTab} />
  </div>
);

const Row: React.FC<{label: string; sub: string; jp: string; active?: number}> = ({label, sub, jp, active = 0}) => (
  <Surface
    tone="card"
    radius={34}
    border={hexA(C.gold, 0.18 + 0.82 * active)}
    style={{
      height: 190,
      marginBottom: 24,
      padding: '0 36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: `0 12px 30px rgba(0,0,0,0.45), 0 0 ${50 * active}px ${hexA(C.gold, 0.35 * active)}`,
      transform: `scale(${1 - 0.03 * active})`,
    }}
  >
    <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
      <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 44, color: active > 0.3 ? C.gold : C.text}}>{label}</span>
      <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary}}>{sub}</span>
    </div>
    <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 74, color: hexA(C.indigoSoft, 0.9)}}>{jp}</span>
  </Surface>
);

export const HomeScreenPhone: React.FC<{pressTab?: TabId | null}> = ({pressTab}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <SevnQuestAppScreen activeTab="learn" />
    <BottomTabs active="learn" press={pressTab} />
  </div>
);

export const LibraryScreen: React.FC<{hit?: number}> = ({hit = 0}) => (
  <Frame title="Library" sub="Semua materi belajar" tab="library">
    <Row label="Kotoba" sub="Kosakata N5–N1" jp="言" />
    <Row label="Kanji" sub="Urutan goresan" jp="漢" />
    <Row label="Tata Bahasa" sub="Pola & penggunaan" jp="文" active={hit} />
    <Row label="Chokai" sub="Latihan menyimak" jp="聴" />
  </Frame>
);

export const GrammarScreen: React.FC<{hit?: number}> = ({hit = 0}) => (
  <Frame title="Tata Bahasa" sub="Library › Tata Bahasa" tab="library">
    <Row label="Partikel" sub="は・が・を・に" jp="は" />
    <Row label="Kata Sifat" sub="い-adj & な-adj" jp="形" />
    <Row label="Konjugasi" sub="る・た・て・ない" jp="活" active={hit} />
    <Row label="Pola Kalimat" sub="〜ほうがいい dan lainnya" jp="型" />
  </Frame>
);

export interface VerbForms {
  verb: string;
  masu: string;
  te: string;
  ta: string;
  nai: string;
}

export const VERBS: VerbForms[] = [
  {verb: '食べる', masu: '食べます', te: '食べて', ta: '食べた', nai: '食べない'},
  {verb: '書く', masu: '書きます', te: '書いて', ta: '書いた', nai: '書かない'},
  {verb: '行く', masu: '行きます', te: '行って', ta: '行った', nai: '行かない'},
  {verb: '飲む', masu: '飲みます', te: '飲んで', ta: '飲んだ', nai: '飲まない'},
  {verb: '話す', masu: '話します', te: '話して', ta: '話した', nai: '話さない'},
  {verb: '買う', masu: '買います', te: '買って', ta: '買った', nai: '買わない'},
];

const FormChip: React.FC<{label: string; word: string; color: string; on?: number}> = ({label, word, color, on = 0}) => (
  <div
    style={{
      flex: 1,
      padding: '12px 10px',
      borderRadius: 22,
      background: hexA(color, 0.1 + 0.15 * on),
      border: `1.5px solid ${hexA(color, 0.4 + 0.6 * on)}`,
      boxShadow: on > 0 ? `0 0 ${36 * on}px ${hexA(color, 0.35 * on)}` : undefined,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    }}
  >
    <span style={{fontFamily: FONT.mono, fontSize: 15, fontWeight: 700, color, letterSpacing: 1}}>{label}</span>
    <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 32, color: C.text}}>{word}</span>
  </div>
);

const VerbCard: React.FC<{v: VerbForms; hiTa?: number}> = ({v, hiTa = 0}) => (
  <Surface tone="card" radius={34} style={{padding: '24px 28px', marginBottom: 22}}>
    <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14}}>
      <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 66, color: C.gold}}>{v.verb}</span>
      <span style={{fontFamily: FONT.mono, fontSize: 16, color: C.textSecondary, letterSpacing: 1}}>KATA KERJA</span>
    </div>
    <div style={{display: 'flex', gap: 10}}>
      <FormChip label="ます" word={v.masu} color={C.indigoSoft} />
      <FormChip label="て" word={v.te} color={C.teal} />
      <FormChip label="た" word={v.ta} color={C.gold} on={hiTa} />
      <FormChip label="ない" word={v.nai} color={C.matcha} />
    </div>
  </Surface>
);

export const ConjScreen: React.FC<{
  scroll?: number; // 0..1
  mode?: 'list' | 'process' | 'result';
  typed?: string;
  focus?: number;
  procP?: number;
  resultP?: number;
}> = ({scroll = 0, mode = 'list', typed = '', focus = 0, procP = 0, resultP = 1}) => {
  const listH = VERBS.length * 258;
  const offset = scroll * Math.max(0, listH - 780);
  return (
    <Frame title="Konjugasi" sub="Library › Tata Bahasa › Konjugasi" tab="library">
      <Surface
        tone="inset"
        radius={30}
        stitch={false}
        border={hexA(C.gold, 0.2 + 0.8 * focus)}
        style={{height: 104, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}
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
      <div style={{position: 'relative', height: 780, overflow: 'hidden'}}>
        {mode === 'list' && (
          <div style={{transform: `translateY(${-offset}px)`}}>
            {VERBS.map((v) => (
              <VerbCard key={v.verb} v={v} />
            ))}
          </div>
        )}
        {mode === 'process' && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, paddingTop: 200}}>
            <div style={{display: 'flex', gap: 18}}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    background: C.gold,
                    opacity: 0.35 + 0.65 * Math.max(0, Math.sin(procP * Math.PI * 4 - i * 1.1)),
                    transform: `translateY(${-14 * Math.max(0, Math.sin(procP * Math.PI * 4 - i * 1.1))}px)`,
                  }}
                />
              ))}
            </div>
            <span style={{fontFamily: FONT.mono, fontSize: 24, color: C.textSecondary, letterSpacing: 2}}>MEMPROSES…</span>
          </div>
        )}
        {mode === 'result' && (
          <div style={{opacity: resultP, transform: `translateY(${(1 - resultP) * 40}px)`}}>
            <VerbCard v={VERBS[0]} hiTa={resultP} />
            <Surface tone="elevated" radius={30} border={C.gold} style={{padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 8}}>
              <span style={{fontFamily: FONT.mono, fontSize: 17, color: C.gold, letterSpacing: 1.5}}>LANGKAH</span>
              <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 40, color: C.text}}>
                食べ<span style={{color: C.indigoSoft}}>る</span> → 食べ<span style={{color: C.gold}}>た</span>
              </span>
              <span style={{fontFamily: FONT.body, fontSize: 24, color: C.textSecondary}}>る dibuang, diganti た</span>
            </Surface>
          </div>
        )}
      </div>
    </Frame>
  );
};
