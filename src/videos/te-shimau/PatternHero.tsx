import React from 'react';
import {SHADOW_CARD} from '../../shared/theme';
import {C} from '../../shared/theme';
import {BOUNCY, EASE_IO, Kana, bump, hexA, kf, ps, sp, useF} from './kit';
import {PLATE_BG} from './props';

// Pola ～てしまう sebagai SATU elemen yang hidup dari S03 sampai S20: lahir dari piring kosong,
// jadi judul grammar, maju ke depan saat makna dibahas, mengecil jadi label saat contoh, lalu
// kembali ke tengah untuk koreksi & rangkuman. Tidak pernah dirender ulang — hanya berpindah.

const CHARS = ['～', 'て', 'し', 'ま', 'う'];
// "～" masuk lewat mask saat kartu terbentuk; てしまう muncul berurutan tepat saat diucapkan (8.06).
const REVEAL = [6.0, 8.06, 8.2, 8.34, 8.48];

const Y: [number, number][] = [
  [5.35, 720],
  [8.8, 720],
  [9.3, 560], // S04: naik, memberi ruang dua situasi
  [10.75, 560],
  [11.4, 380], // S05–S09: judul grammar
  [28.6, 380],
  [29.3, 430], // S10: maju ke depan
  [33.95, 430],
  [34.5, 262], // S11–S17: label kecil di atas contoh
  [49.3, 262],
  [50.0, 700], // S18: sendirian di tengah bersama label SELESAI?
  [52.95, 700],
  [53.4, 560], // naik, memberi ruang dua konteks
  [54.3, 560],
  [54.67, 660], // S19: di antara "KONTEKS" dan dua kartu
  [55.6, 660],
  [55.9, 520], // S20
  [59.88, 520],
  [60.6, 180],
];

const SIZE: [number, number][] = [
  [5.35, 150],
  [8.8, 150],
  [9.3, 130],
  [10.75, 130],
  [11.4, 64],
  [28.6, 64],
  [29.3, 120],
  [33.95, 120],
  [34.5, 54],
  [49.3, 54],
  [50.0, 136],
  [54.3, 136],
  [54.67, 100],
  [55.6, 100],
  [55.9, 120],
  [59.88, 120],
  [60.6, 44],
];

export const heroPose = (f: number) => ({y: kf(f, Y), size: kf(f, SIZE)});

export const PatternHero: React.FC = () => {
  const f = useF();

  // piring kosong → kartu pola (4.71–5.35)
  const morph = ps(f, 4.71, 5.35, EASE_IO);
  const morphing = morph < 1;
  const {y: poseY, size} = heroPose(f);
  const w = morphing ? 560 + (930 - 560) * morph : size * 6.2;
  const h = morphing ? 560 + (300 - 560) * morph : size * 2;
  const radius = morphing ? 280 + (54 - 280) * morph : size * 0.36;
  const y = morphing ? 820 + (720 - 820) * morph : poseY;

  const pushIn = kf(f, [[8.2, 1], [8.75, 1.06], [9.3, 1]]);
  const opacity = kf(f, [[25.4, 1], [25.8, 0.5], [28.6, 0.5], [29.0, 1], [59.9, 1], [60.5, 0]], (t) => t);
  // denyut saat pola "dihubungkan" atau disebut ulang
  const pulse = bump(f, 8.06, 8.9) * 0.8 + bump(f, 10.3, 10.9) + bump(f, 29.0, 30.0) * 0.7 + bump(f, 52.0, 52.9);
  const stitch = ps(f, 5.3, 5.8);

  return (
    <div
      style={{
        position: 'absolute',
        left: 540,
        top: y,
        width: w,
        height: h,
        transform: `translate(-50%, -50%) scale(${pushIn})`,
        opacity,
      }}
    >
      {morphing && <div style={{position: 'absolute', inset: 0, borderRadius: radius, background: PLATE_BG, opacity: 1 - morph}} />}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          background: `linear-gradient(180deg, #232937 0%, ${C.card} 100%)`,
          border: `${Math.max(1.5, size * 0.016)}px solid ${hexA(C.gold, 0.28 + 0.6 * Math.min(1, pulse))}`,
          boxShadow: `${SHADOW_CARD}, 0 0 ${30 + 50 * pulse}px ${hexA(C.gold, 0.08 + 0.3 * Math.min(1, pulse))}`,
          boxSizing: 'border-box',
          opacity: morph,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: Math.max(6, size * 0.09),
            borderRadius: Math.max(6, radius - size * 0.09),
            border: `${size > 80 ? 2 : 1.5}px dashed ${C.thread}`,
            opacity: 0.45 * stitch,
          }}
        />
      </div>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {CHARS.map((ch, i) => {
          const wave = i === 0;
          const p = wave ? ps(f, REVEAL[0], REVEAL[0] + 0.45) : sp(f, REVEAL[i], BOUNCY);
          // slot jahitan menunggu aksaranya
          const slot = wave ? 0 : ps(f, 6.25 + i * 0.12, 6.6 + i * 0.12) * (1 - ps(f, REVEAL[i], REVEAL[i] + 0.12));
          return (
            <span key={i} style={{position: 'relative', display: 'inline-block', width: size, height: size}}>
              {slot > 0.01 && (
                <span
                  style={{
                    position: 'absolute',
                    inset: size * 0.1,
                    borderRadius: size * 0.14,
                    border: `3px dashed ${hexA(C.gold, 0.55)}`,
                    opacity: slot,
                  }}
                />
              )}
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: wave ? `inset(0 ${(1 - p) * 100}% 0 0)` : undefined,
                  transform: wave ? undefined : `scale(${p})`,
                  opacity: wave ? 1 : Math.min(1, p * 2),
                }}
              >
                <Kana ch={ch} size={size} color={wave ? C.textSecondary : C.gold} glow={wave ? 0 : bump(f, REVEAL[i], REVEAL[i] + 0.6) + Math.min(1, pulse) * 0.5} />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
