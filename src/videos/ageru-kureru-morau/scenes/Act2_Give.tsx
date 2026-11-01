import React from 'react';
import {C} from '../../../shared/theme';
import {ExampleCard, FormulaCard, Tok, TransCard} from '../Cards';
import {At, MaskWords, io, ps, useF} from '../kit';

// A2 · あげる (S03–S10, 8.6–27.6 dtk). Pola, contoh, lalu makna pemberi → penerima.
// Panggung dan buku ada di Stage.tsx; di sini hanya kartu di zona atas (y 420–800).

const RUBY: Record<string, string> = {私: 'わたし', 友: 'とも', 達: 'だち', 本: 'ほん'};

export const Act2_Give: React.FC = () => {
  const f = useF();
  const L = (a: number) => ps(f, a, a + 0.25);

  const formula: Tok[][] = [
    [{t: 'Pemberi', lit: L(17.0)}, {t: 'は', jp: true, lit: L(17.3)}, {t: 'Penerima', lit: L(17.6)}, {t: 'に', jp: true, lit: L(17.9)}],
    [{t: 'Benda', lit: L(18.7)}, {t: 'を', jp: true, lit: L(19.0)}, {t: 'あげる', jp: true, lit: L(19.4)}],
  ];

  return (
    <>
      {/* S05–S06: pola kalimat */}
      <At y={600} o={io(f, 16.8, 20.25, 0.25, 0.25)}>
        <FormulaCard lines={formula} />
      </At>

      {/* S08–S09: contoh + terjemahan */}
      <At y={560} o={io(f, 20.85, 24.45, 0.25, 0.25)}>
        <ExampleCard lines={['私は友達に', '本をあげました。']} rubies={RUBY} />
      </At>
      <At y={760} o={io(f, 22.6, 24.45, 0.25, 0.2)}>
        <TransCard text="Saya memberikan buku kepada teman." />
      </At>

      {/* S10: pemberi & penerima */}
      <At y={600}>
        <MaskWords
          f={f}
          words={[
            {t: 'PEMBERI', at: 25.0, color: C.gold},
            {t: 'PENERIMA', at: 25.4, color: C.indigoSoft},
          ]}
          size={84}
          out={28.6}
        />
      </At>
    </>
  );
};
