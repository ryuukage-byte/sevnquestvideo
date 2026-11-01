import React from 'react';
import {Surface} from '../../shared/components/ui';
import {C, FONT} from '../../shared/theme';
import {Kana, hexA} from './kit';

// Kartu konten — semua memakai Surface dari src/shared (SEVNQUEST.md §5).

// ───────────────────────────── pola kalimat ─────────────────────────────
export type Tok = {t: string; jp?: boolean; lit?: number};

/** Satu baris pola. Teks Jepang emas; sorotan = kotak 13% + garis bawah 6px. */
export const FormulaLine: React.FC<{toks: Tok[]}> = ({toks}) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, height: 120}}>
    {toks.map((k, i) => {
      const lit = Math.max(0, Math.min(1, k.lit ?? 0));
      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            padding: '4px 8px 6px',
            fontFamily: k.jp ? FONT.jp : FONT.body,
            fontWeight: k.jp ? 900 : 700,
            fontSize: k.jp ? 84 : 44,
            lineHeight: 1.1,
            color: k.jp ? C.gold : lit > 0.5 ? C.text : C.textSecondary,
            background: hexA(C.gold, 0.13 * lit),
            borderBottom: `6px solid ${hexA(C.gold, lit)}`,
            borderRadius: 8,
            transform: `scale(${1 + 0.08 * lit})`,
            textShadow: k.jp ? '0 6px 18px rgba(0,0,0,0.7)' : undefined,
          }}
        >
          {k.t}
        </span>
      );
    })}
  </div>
);

/** Kartu pola: dua baris, berisi FormulaLine. */
export const FormulaCard: React.FC<{lines: Tok[][]; width?: number; height?: number}> = ({lines, width = 940, height = 330}) => (
  <Surface tone="card" radius={36} style={{width, height, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14}}>
    {lines.map((l, i) => (
      <FormulaLine key={i} toks={l} />
    ))}
  </Surface>
);

// ───────────────────────────── contoh kalimat ─────────────────────────────
/** Furigana: kanji di-ruby di atasnya (Kana di kit). Tanda baca tidak diberi kotak. */
export const RubyLine: React.FC<{text: string; rubies: Record<string, string>; size: number; color?: string}> = ({text, rubies, size, color = C.text}) => (
  <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: size * 1.9}}>
    {[...text].map((ch, i) =>
      ch === '。' ? (
        <span key={i} style={{fontFamily: FONT.jp, fontWeight: 900, fontSize: size, lineHeight: 1, color: C.textSecondary, width: size * 0.45, textAlign: 'left'}}>
          。
        </span>
      ) : (
        <Kana key={i} ch={ch} ruby={rubies[ch]} size={size} color={color} glow={rubies[ch] ? 0.4 : 0} />
      ),
    )}
  </div>
);

/** Kartu contoh: dua baris kalimat Jepang, satu kartu jahitan. */
export const ExampleCard: React.FC<{lines: string[]; rubies: Record<string, string>; size?: number; height?: number}> = ({
  lines,
  rubies,
  size = 80,
  height = 280,
}) => (
  <Surface tone="card" radius={36} style={{width: 940, height, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
    {lines.map((l, i) => (
      <RubyLine key={i} text={l} rubies={rubies} size={size} />
    ))}
  </Surface>
);

// ───────────────────────────── terjemahan ─────────────────────────────
/** Kartu terjemahan: elevated, border emas 50%, tab emas 140×6 di tepi atas. */
export const TransCard: React.FC<{text: string; height?: number}> = ({text, height = 90}) => (
  <Surface
    tone="elevated"
    stitch={false}
    radius={30}
    border={hexA(C.gold, 0.5)}
    style={{width: 940, height, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px', boxSizing: 'border-box'}}
  >
    <div style={{position: 'absolute', left: '50%', top: -3, width: 140, height: 6, marginLeft: -70, borderRadius: 3, background: C.gold}} />
    <span style={{fontFamily: FONT.body, fontWeight: 700, fontSize: 40, lineHeight: 1.25, color: C.text, textAlign: 'center'}}>{text}</span>
  </Surface>
);
