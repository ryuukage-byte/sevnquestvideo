import React from 'react';
import {FONT} from '../theme';

// Odometer: setiap digit berupa kolom 0–9(0) yang bergulir; digit tinggi hanya bergerak saat digit di bawahnya "wrap".
export const RollingNumber: React.FC<{
  value: number;
  digits?: number;
  size: number;
  color?: string;
  font?: string;
  weight?: number;
}> = ({value, digits = 1, size, color = '#fff', font = FONT.mono, weight = 800}) => {
  const v = Math.max(0, value);
  const nDigits = Math.max(digits, String(Math.floor(v)).length);
  const lh = size * 1.1;
  const cols = [];
  for (let k = nDigits - 1; k >= 0; k--) {
    const x = v / Math.pow(10, k);
    const n = Math.floor(x);
    const fr = x - n;
    const off = (n % 10) + (k === 0 ? fr : Math.min(1, Math.max(0, (fr - 0.88) / 0.12)));
    cols.push(
      <div key={k} style={{height: lh, overflow: 'hidden', width: size * 0.62}}>
        <div style={{transform: `translateY(${-off * lh}px)`}}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => (
            <div key={i} style={{height: lh, lineHeight: `${lh}px`, textAlign: 'center'}}>
              {d}
            </div>
          ))}
        </div>
      </div>,
    );
  }
  return (
    <div style={{display: 'inline-flex', fontFamily: font, fontWeight: weight, fontSize: size, color, fontVariantNumeric: 'tabular-nums'}}>
      {cols}
    </div>
  );
};
