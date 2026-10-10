import React from 'react';
import {C} from '../../shared/theme';
import {GKey, Glyphs, glyphPoses, kf, useF} from './kit';

// Pola 〜ておく sebagai SATU elemen yang hidup dari S01 sampai S29. Tidak pernah dirender ulang —
// glyph ber-ID hanya berpindah, mengecil, atau bermorf. Morph て+お → と (S25) dan kembali (S29)
// memakai ID yang sama sehingga pembaca melihat bentuk yang berubah, bukan dua teks berbeda.

const CHARS = {
  w: {ch: '～'},
  t: {ch: 'て'},
  o: {ch: 'お'},
  k: {ch: 'く'},
  to: {ch: 'と'},
};

// posisi tengah 'to' (hasil morph て+お) pada S25 & S29 — 3 glyph, ukuran 120, cy 1040
const TO = {x: 540, y: 1040, s: 120};

const HERO_KEYS: GKey[] = [
  // S01 — 〜 → て → お → く muncul besar, lalu menyatu di tengah
  {at: 0.11, row: ['w', 't', 'o', 'k'], size: 150, cy: 640, stagger: 0.22, enter: [0, 70], dur: 0.7},
  // S02 — pola berpindah ke area atas sebagai judul; tetap hidup
  {at: 2.4, row: ['w', 't', 'o', 'k'], size: 64, cy: 380, dur: 0.9},
  // S05 — pola utama bergerak ke tengah, poros dua jalur
  {at: 16.4, row: ['w', 't', 'o', 'k'], size: 120, cy: 560, dur: 0.9},
  // S08 — kembali ke judul di atas, berdampingan dengan kalender
  {at: 25.8, row: ['w', 't', 'o', 'k'], size: 64, cy: 380, dur: 0.9},
  // S19 — tengah lagi untuk makna おく
  {at: 64.4, row: ['w', 't', 'o', 'k'], size: 120, cy: 560, dur: 0.9},
  // S21 — di antara kalender dan kotak
  {at: 71.6, row: ['w', 't', 'o', 'k'], size: 120, cy: 640, dur: 0.9},
  // S24 — pindah ke atas lembar kalimat
  {at: 83.6, row: ['w', 't', 'o', 'k'], size: 120, cy: TO.y, dur: 0.8},
  // S25 — て dan お saling mendekat, bermorf menjadi と → 〜とく
  {
    at: 85.9,
    row: ['w', 'to', 'k'],
    size: 120,
    cy: TO.y,
    dur: 0.6,
    from: {to: TO},
    to: {t: TO, o: TO},
  },
  // S29 — kembali menjadi 〜ておく sebagai pola utama tantangan, lalu bergerak ke judul
  {
    at: 95.8,
    row: ['w', 't', 'o', 'k'],
    size: 64,
    cy: 380,
    dur: 0.9,
    from: {t: TO, o: TO},
    to: {to: TO},
  },
];

export const PatternHero: React.FC = () => {
  const f = useF();
  const poses = glyphPoses(HERO_KEYS, f);
  // sedikit condong saat pertama terbentuk, seolah tertarik dari luar layar
  const tilt = kf(f, [
    [0.11, 0],
    [1.1, -5],
    [2.2, 0],
  ]);
  // pola menghilang ketika ponsel CTA masuk (S30)
  const opacity = kf(f, [
    [100.2, 1],
    [100.7, 0],
  ]);
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 30, transform: `rotate(${tilt}deg)`, transformOrigin: '540px 540px', opacity}}>
      <Glyphs poses={poses} chars={CHARS} color={(id) => (id === 'w' ? C.textSecondary : C.gold)} />
    </div>
  );
};
