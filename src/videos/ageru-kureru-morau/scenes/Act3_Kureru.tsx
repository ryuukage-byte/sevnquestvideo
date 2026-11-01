import React from 'react';
import {C} from '../../../shared/theme';
import {ExampleCard, FormulaCard, Tok, TransCard} from '../Cards';
import {At, MaskWords, io, ps, useF} from '../kit';

// A3 · くれる (S11–S18, 27.4–51.6 dtk). Arah pemberian berbalik: menuju "kita" / saya.

const RUBY: Record<string, string> = {私: 'わたし', 友: 'とも', 達: 'だち', 本: 'ほん'};

export const Act3_Kureru: React.FC = () => {
  const f = useF();
  const L = (a: number) => ps(f, a, a + 0.25);

  const formula: Tok[][] = [
    [{t: 'Pemberi', lit: L(40.0)}, {t: 'が', jp: true, lit: L(40.3)}, {t: 'Penerima', lit: L(40.6)}, {t: 'に', jp: true, lit: L(40.9)}],
    [{t: 'Benda', lit: L(41.7)}, {t: 'を', jp: true, lit: L(42.0)}, {t: 'くれる', jp: true, lit: L(42.4)}],
  ];

  return (
    <>
      {/* S12: kelompok kita */}
      <At y={760}>
        <MaskWords
          f={f}
          words={[
            {t: 'KELOMPOK', at: 34.8},
            {t: 'KITA', at: 35.4, color: C.gold},
          ]}
          size={84}
          out={39.3}
        />
      </At>

      {/* S13–S15: pola kalimat くれる */}
      <At y={600} o={io(f, 39.5, 43.55, 0.25, 0.25)}>
        <FormulaCard lines={formula} />
      </At>

      {/* S16–S17: contoh + terjemahan */}
      <At y={560} o={io(f, 43.6, 47.4, 0.25, 0.25)}>
        <ExampleCard lines={['友達が私に', '本をくれました。']} rubies={RUBY} />
      </At>
      <At y={760} o={io(f, 44.7, 47.4, 0.25, 0.2)}>
        <TransCard text="Teman memberikan buku kepada saya." />
      </At>

      {/* S18: menuju saya */}
      <At y={600}>
        <MaskWords
          f={f}
          words={[
            {t: 'MENUJU', at: 47.6},
            {t: 'SAYA', at: 48.0, color: C.gold},
          ]}
          size={96}
          out={50.9}
        />
      </At>
    </>
  );
};
