import React from 'react';
import {LogoMark} from '../../shared/components/Logo';
import {Surface} from '../../shared/components/ui';
import {C, FONT} from '../../shared/theme';
import {SevnQuestAppScreen} from '../iphone/components/SevnQuestAppScreen';
import {hexA} from './kit';

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
    <Row label="〜ている" sub="Aktivitas vs Hasil" jp="て" active={hit} />
    <Row label="〜たほうがいい" sub="Saran & rekomendasi" jp="方" />
    <Row label="〜てしまう" sub="Penyesalan & selesai" jp="仕" />
    <Row label="〜ようになる" sub="Perubahan kemampuan" jp="様" />
  </Frame>
);

// Detail Screen untuk "〜ている" dengan 4 Section: Arti, Fungsi, Struktur, Contoh
export const TeiruDetailScreen: React.FC<{
  activeSection?: 'arti' | 'fungsi' | 'struktur' | 'contoh';
}> = ({activeSection = 'fungsi'}) => {
  const sections = [
    {id: 'arti', label: 'Arti'},
    {id: 'fungsi', label: 'Fungsi'},
    {id: 'struktur', label: 'Struktur'},
    {id: 'contoh', label: 'Contoh'},
  ] as const;

  return (
    <Frame title="〜ている" sub="Tata Bahasa › N5 / N4" tab="library">
      {/* Tab Switcher: Arti | Fungsi | Struktur | Contoh */}
      <div style={{display: 'flex', gap: 12, marginBottom: 20}}>
        {sections.map((s) => {
          const on = s.id === activeSection;
          return (
            <div
              key={s.id}
              style={{
                flex: 1,
                padding: '14px 0',
                borderRadius: 20,
                textAlign: 'center',
                fontFamily: FONT.display,
                fontWeight: 800,
                fontSize: 22,
                background: on ? 'rgba(240,190,82,0.22)' : 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${on ? C.gold : 'rgba(255,255,255,0.1)'}`,
                color: on ? C.gold : C.textSecondary,
                boxShadow: on ? `0 0 20px ${hexA(C.gold, 0.3)}` : undefined,
              }}
            >
              {s.label}
            </div>
          );
        })}
      </div>

      {/* Konten detail sesuai section */}
      <Surface tone="card" radius={32} style={{padding: '24px 28px', marginBottom: 20}}>
        {activeSection === 'fungsi' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{width: 32, height: 32, borderRadius: 16, background: C.matcha, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#092116', fontSize: 18}}>1</div>
              <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 26, color: C.text}}>Aktivitas Berlangsung</span>
            </div>
            <div style={{fontFamily: FONT.body, fontSize: 21, color: C.textSecondary, lineHeight: 1.35}}>
              Aksi yang sedang dilakukan saat ini.
              <br />
              <span style={{fontFamily: FONT.jp, fontWeight: 700, color: C.gold}}>食べている</span> (sedang makan), <span style={{fontFamily: FONT.jp, fontWeight: 700, color: C.gold}}>読んでいる</span> (sedang membaca)
            </div>

            <div style={{height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0'}} />

            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{width: 32, height: 32, borderRadius: 16, background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#2a1e05', fontSize: 18}}>2</div>
              <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 26, color: C.text}}>Keadaan Hasil (Resultatif)</span>
            </div>
            <div style={{fontFamily: FONT.body, fontSize: 21, color: C.textSecondary, lineHeight: 1.35}}>
              Perubahan sudah terjadi, statusnya masih berlaku hingga kini.
              <br />
              <span style={{fontFamily: FONT.jp, fontWeight: 700, color: C.gold}}>知っている</span> (tahu / kenal), <span style={{fontFamily: FONT.jp, fontWeight: 700, color: C.gold}}>結婚している</span> (sudah menikah)
            </div>
          </div>
        )}

        {activeSection === 'struktur' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.gold, letterSpacing: 1.5}}>RUMUS KONJUGASI</span>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 44, color: C.text}}>Vて</span>
              <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 36, color: C.textSecondary}}>+</span>
              <span style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 44, color: C.gold}}>いる</span>
            </div>
            <div style={{fontFamily: FONT.body, fontSize: 21, color: C.textSecondary}}>
              Bentuk て dari kata kerja disambung dengan いる / います.
            </div>
          </div>
        )}

        {activeSection === 'contoh' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <div>
              <div style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 28, color: C.text}}>ご飯を食べている。</div>
              <div style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary}}>Sedang makan nasi. (Aktivitas)</div>
            </div>
            <div style={{height: 1, background: 'rgba(255,255,255,0.08)'}} />
            <div>
              <div style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: 28, color: C.gold}}>田中さんを知っている。</div>
              <div style={{fontFamily: FONT.body, fontSize: 20, color: C.textSecondary}}>Saya kenal Tanaka. (Keadaan)</div>
            </div>
          </div>
        )}

        {activeSection === 'arti' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            <span style={{fontFamily: FONT.display, fontWeight: 800, fontSize: 28, color: C.text}}>Bukan cuma "sedang"</span>
            <div style={{fontFamily: FONT.body, fontSize: 21, color: C.textSecondary, lineHeight: 1.4}}>
              Arti ている bergantung pada jenis kata kerjanya (aksi berdurasi vs perubahan sekejap).
            </div>
          </div>
        )}
      </Surface>

      {/* Badge interaktif */}
      <Surface tone="inset" radius={24} style={{padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 20, color: C.textSecondary}}>Level: JLPT N5–N4</span>
        <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: C.gold}}>SEVNQUEST LOGIC SYSTEM</span>
      </Surface>
    </Frame>
  );
};
