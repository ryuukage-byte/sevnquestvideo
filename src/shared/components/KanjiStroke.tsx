import React from 'react';
import {C} from '../theme';
import data from '../data/kanji_hi.json';

type Pt = [number, number];
const medianPath = (m: Pt[]) => 'M' + m.map((p) => p.join(' ')).join(' L');

// Animasi urutan goresan dari data HanziWriter (sama dengan canvas "Nulis Kanji" di aplikasi).
export const KanjiStroke: React.FC<{
  size: number;
  progress: number; // 0..1 seluruh goresan
  color?: string;
  guide?: boolean;
}> = ({size, progress, color = C.text, guide = true}) => {
  const strokes: string[] = data.strokes;
  const medians = data.medians as Pt[][];
  const n = strokes.length;
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024">
      <g transform="scale(1,-1) translate(0,-900)">
        {guide &&
          strokes.map((d, i) => <path key={'g' + i} d={d} fill="rgba(151,181,224,0.13)" />)}
        {strokes.map((d, i) => {
          const local = Math.min(1, Math.max(0, progress * n - i));
          const eased = 1 - Math.pow(1 - local, 2);
          return (
            <g key={i}>
              <clipPath id={`kc${i}`}>
                <path d={d} />
              </clipPath>
              <path
                d={medianPath(medians[i])}
                clipPath={`url(#kc${i})`}
                stroke={color}
                strokeWidth={150}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                pathLength={1}
                strokeDasharray={1.02}
                strokeDashoffset={1.02 - eased * 1.02}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
