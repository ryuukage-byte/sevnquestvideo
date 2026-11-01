import React from 'react';
import {C} from '../../../shared/theme';
import {ExampleCard, FormulaCard, Tok, TransCard} from '../Cards';
import {At, MaskWords, io, ps, useF} from '../kit';

// A4 · もらう (S19–S26, 51.1–71.0 dtk). Dilihat dari sudut pandang penerima (私).
// Kamera dorong ke 私 dilakukan di Stage.tsx (mulai 54.4 dtk).

const RUBY: Record<string, string> = {私: 'わたし', 友: 'とも', 達: 'だち', 本: 'ほん'};

export const Act4_Morau: React.FC = () => {
  const f = useF();
  const L = (a: number) => ps(f, a, a + 0.25);

  const formula: Tok[][] = [
    [{t: 'Penerima', lit: L(59.2)}, {t: 'は', jp: true, lit: L(59.5)}, {t: 'Pemberi', lit: L(59.9)}, {t: 'に', jp: true, lit: L(60.2)}],
    [{t: 'Benda', lit: L(61.0)}, {t: 'を', jp: true, lit: L(61.3)}, {t: 'もらう', jp: true, lit: L(61.7)}],
  ];

  return (
    <>
      {/* S20: sudut pandang */}
      <At y={600}>
        <MaskWords
          f={f}
          words={[
            {t: 'SUDUT', at: 54.7},
            {t: 'PANDANG', at: 55.2, color: C.gold},
          ]}
          size={96}
          out={58.6}
        />
      </At>

      {/* S22: pola kalimat もらう */}
      <At y={600} o={io(f, 58.7, 62.4, 0.25, 0.25)}>
        <FormulaCard lines={formula} />
      </At>

      {/* S24–S25: contoh + terjemahan */}
      <At y={560} o={io(f, 63.0, 66.4, 0.25, 0.25)}>
        <ExampleCard lines={['私は友達に', '本をもらいました。']} rubies={RUBY} />
      </At>
      <At y={760} o={io(f, 64.4, 66.4, 0.25, 0.2)}>
        <TransCard text="Saya menerima buku dari teman." />
      </At>

      {/* S26: penerima & pemberi */}
      <At y={600}>
        <MaskWords
          f={f}
          words={[
            {t: 'PENERIMA', at: 66.6, color: C.indigoSoft},
            {t: 'PEMBERI', at: 67.1, color: C.gold},
          ]}
          size={84}
          out={70.5}
        />
      </At>
    </>
  );
};
