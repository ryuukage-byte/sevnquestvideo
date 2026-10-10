import React from 'react';
import {Avatar, AvatarExpressionType, AvatarGender} from '../../shared/components/Avatar';
import {Surface} from '../../shared/components/ui';
import {C, FONT} from '../../shared/theme';
import {GKey, Glyphs, Kana, glyphPoses, hexA, useF} from './kit';

// Tiga motif cerita — kalender ujian, kotak barang, lembar kalimat — digambar sekali di sini dan dipakai
// ulang dari S01 sampai S30 supaya ceritanya satu. Semua ukuran dalam piksel kanvas 1080×1920.

// ───────────────────────────── kalender ─────────────────────────────
export const CAL_W = 400;
export const CAL_H = 300;

/** Kalender dua halaman: HARI INI (kiri) · BESOK (kanan). `turn` 0..1 = halaman hari ini terangkat. */
export const CalendarCard: React.FC<{turn?: number; exam?: boolean}> = ({turn = 0, exam = false}) => (
  <Surface tone="card" radius={28} style={{width: CAL_W, height: CAL_H, boxSizing: 'border-box', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 56, display: 'flex', borderBottom: `1.5px dashed ${C.thread}`}}>
      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: C.textSecondary}}>
        HARI INI
      </div>
      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: C.gold}}>
        BESOK
      </div>
    </div>
    {/* halaman hari ini */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 56,
        bottom: 0,
        width: '50%',
        borderRight: `1.5px dashed ${C.thread}`,
        transform: `translateY(${-turn * 26}px)`,
        opacity: 1 - turn * 0.5,
        boxSizing: 'border-box',
      }}
    >
      {[0.32, 0.55, 0.78].map((y) => (
        <div key={y} style={{position: 'absolute', left: 28, right: 28, top: `${y * 100}%`, borderTop: `2px dashed ${C.thread}`, opacity: 0.6}} />
      ))}
    </div>
    {/* halaman besok */}
    <div style={{position: 'absolute', right: 0, top: 56, bottom: 0, width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {exam && (
        <div style={{display: 'flex', gap: 4}}>
          <Kana ch="試" ruby="しけん" size={72} color={C.text} />
          <Kana ch="験" size={72} color={C.text} />
        </div>
      )}
    </div>
  </Surface>
);

// ───────────────────────────── kotak barang ─────────────────────────────
export const BOX_W = 300;

export const BoxCard: React.FC = () => (
  <Surface tone="card" radius={36} style={{width: BOX_W, height: BOX_W, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg width={190} height={170} viewBox="0 0 190 170" style={{overflow: 'visible'}}>
      <polygon points="95,18 170,56 95,94 20,56" fill={C.elevated} stroke={C.indigoSoft} strokeWidth={4} strokeLinejoin="round" />
      <polygon points="20,56 95,94 95,158 20,120" fill={C.indigoDeep} stroke={C.indigoSoft} strokeWidth={4} strokeLinejoin="round" />
      <polygon points="95,94 170,56 170,120 95,158" fill="#232937" stroke={C.indigoSoft} strokeWidth={4} strokeLinejoin="round" />
      {/* selotip emas di atas kotak */}
      <polygon points="86,27 104,36 104,103 86,94" fill={C.gold} opacity={0.85} />
    </svg>
  </Surface>
);

// ───────────────────────────── lembar kalimat ─────────────────────────────
export const SHEET_W = 920;
export const SHEET_H = 240;
export const SHEET_CY = 1320;

/** Lembar kalimat kosong; isinya (kalimat Jepang, terjemahan) diletakkan di atasnya oleh babak. */
export const SheetCard: React.FC = () => (
  <Surface tone="elevated" radius={34} border={hexA(C.gold, 0.5)} style={{width: SHEET_W, height: SHEET_H, boxSizing: 'border-box'}}>
    <div style={{position: 'absolute', left: '50%', top: 0, width: 140, height: 6, marginLeft: -70, borderRadius: 3, background: C.gold}} />
  </Surface>
);

// ───────────────────────────── glyph ─────────────────────────────
export type Chars = Record<string, {ch: string; ruby?: string}>;

/** Satu baris glyph ber-ID; posisi dihitung dari `keys` (lihat glyphPoses di kit). */
export const GlyphLine: React.FC<{keys: GKey[]; chars: Chars; color?: (id: string) => string; opacity?: number}> = ({
  keys,
  chars,
  color = () => C.text,
  opacity = 1,
}) => {
  const f = useF();
  return (
    <div style={{position: 'absolute', inset: 0, opacity}}>
      <Glyphs poses={glyphPoses(keys, f)} chars={chars} color={color} />
    </div>
  );
};

// ───────────────────────────── karakter ─────────────────────────────
/** Avatar resmi, ditambatkan di telapak kaki (x, y = lantai). */
export const Actor: React.FC<{
  x: number;
  y: number;
  h: number;
  expression: AvatarExpressionType;
  gender?: AvatarGender;
  bubble?: 'exclamation' | 'question' | 'sweat';
  o?: number;
  s?: number;
  r?: number;
  flip?: boolean;
}> = ({x, y, h, expression, gender = 'male', bubble, o = 1, s = 1, r = 0, flip}) =>
  o <= 0.001 ? null : (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -100%) rotate(${r}deg) scale(${s})`,
        transformOrigin: '50% 100%',
        opacity: o,
      }}
    >
      <Avatar expression={expression} gender={gender} height={h} flip={flip} bubble={bubble} bubblePosition="top-right" />
    </div>
  );
