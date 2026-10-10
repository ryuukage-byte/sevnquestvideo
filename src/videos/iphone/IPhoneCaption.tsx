import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT, SAFE} from '../../shared/theme';
import {sec, progBetween} from './timing';

interface CaptionLine {
  startSec: number;
  endSec: number;
  text: string;
  hot?: string[];
}

export const IPHONE_CAPTIONS: CaptionLine[] = [
  // Scene 01
  {
    startSec: 0.19,
    endSec: 1.72,
    text: 'Buat kamu pengguna iPhone,',
    hot: ['iPhone', 'pengguna'],
  },
  {
    startSec: 2.09,
    endSec: 4.14,
    text: 'ini cara pasang SevnQuest di HP kamu.',
    hot: ['pasang', 'SevnQuest'],
  },

  // Scene 02
  {
    startSec: 5.16,
    endSec: 5.58,
    text: 'Pertama,',
    hot: ['Pertama'],
  },
  {
    startSec: 5.84,
    endSec: 6.49,
    text: 'buka Safari.',
    hot: ['Safari', 'buka'],
  },

  // Scene 03
  {
    startSec: 7.44,
    endSec: 8.44,
    text: 'Lalu masuk ke',
    hot: ['masuk'],
  },
  {
    startSec: 8.75,
    endSec: 11.10,
    text: 'sevnquest.sevnsoul.site',
    hot: ['sevnquest', 'site'],
  },

  // Scene 04
  {
    startSec: 12.09,
    endSec: 13.29,
    text: 'Atau kalau lebih gampang,',
    hot: ['gampang'],
  },
  {
    startSec: 13.69,
    endSec: 16.48,
    text: 'kamu juga bisa langsung klik link yang ada di bio TikTok aku.',
    hot: ['klik', 'link', 'bio', 'TikTok'],
  },

  // Scene 05
  {
    startSec: 17.60,
    endSec: 19.31,
    text: 'Kalau kamu masuk lewat link di bio,',
    hot: ['link', 'bio'],
  },
  {
    startSec: 19.60,
    endSec: 21.61,
    text: 'jangan lupa lanyard-nya ditarik ke bawah,',
    hot: ['lanyard', 'tarik', 'bawah'],
  },
  {
    startSec: 21.97,
    endSec: 22.73,
    text: 'lalu dilepas.',
    hot: ['dilepas'],
  },

  // Scene 06
  {
    startSec: 23.75,
    endSec: 25.26,
    text: 'Setelah itu pilih bagian Learn.',
    hot: ['pilih', 'Learn'],
  },

  // Scene 07
  {
    startSec: 25.49,
    endSec: 25.67,
    text: 'Nah',
    hot: [],
  },
  {
    startSec: 26.90,
    endSec: 29.42,
    text: 'setelah halaman SevnQuest terbuka di Safari,',
    hot: ['SevnQuest', 'Safari'],
  },
  {
    startSec: 29.79,
    endSec: 31.55,
    text: 'tekan tombol Share yang ada di bagian bawah.',
    hot: ['tombol', 'Share', 'bawah'],
  },

  // Scene 08
  {
    startSec: 32.62,
    endSec: 34.32,
    text: 'Kemudian scroll sedikit ke bawah,',
    hot: ['scroll', 'bawah'],
  },
  {
    startSec: 34.94,
    endSec: 35.46,
    text: 'dan pilih',
    hot: ['pilih'],
  },
  {
    startSec: 36.00,
    endSec: 36.95,
    text: 'Add to Home Screen.',
    hot: ['Add', 'Home', 'Screen'],
  },

  // Scene 09
  {
    startSec: 38.01,
    endSec: 38.77,
    text: 'Di bagian ini,',
    hot: [],
  },
  {
    startSec: 39.09,
    endSec: 40.33,
    text: 'cek dulu nama aplikasinya.',
    hot: ['cek', 'nama', 'aplikasi'],
  },
  {
    startSec: 41.06,
    endSec: 42.02,
    text: 'Pastikan tertulis',
    hot: ['tertulis'],
  },
  {
    startSec: 42.28,
    endSec: 43.01,
    text: 'SevnQuest.',
    hot: ['SevnQuest'],
  },

  // Scene 10
  {
    startSec: 43.90,
    endSec: 44.39,
    text: 'Kalau sudah,',
    hot: ['sudah'],
  },
  {
    startSec: 44.79,
    endSec: 45.42,
    text: 'tinggal tekan',
    hot: ['tekan'],
  },
  {
    startSec: 45.81,
    endSec: 45.96,
    text: 'Add.',
    hot: ['Add'],
  },
  {
    startSec: 47.00,
    endSec: 47.62,
    text: 'Dan selesai.',
    hot: ['selesai'],
  },

  // Scene 11
  {
    startSec: 48.52,
    endSec: 51.25,
    text: 'Sekarang SevnQuest sudah muncul di Home Screen iPhone kamu',
    hot: ['SevnQuest', 'Home', 'Screen', 'iPhone'],
  },
  {
    startSec: 51.76,
    endSec: 53.70,
    text: 'dan bisa dibuka seperti aplikasi biasa.',
    hot: ['aplikasi', 'biasa'],
  },

  // Scene 12
  {
    startSec: 54.84,
    endSec: 56.36,
    text: 'Jadi setiap kali mau belajar,',
    hot: ['belajar'],
  },
  {
    startSec: 56.55,
    endSec: 59.08,
    text: 'kamu nggak perlu buka Safari dan cari websitenya lagi.',
    hot: ['nggak', 'perlu', 'Safari'],
  },

  // Scene 13
  {
    startSec: 59.98,
    endSec: 61.47,
    text: 'Tinggal tap icon SevnQuest,',
    hot: ['tap', 'icon', 'SevnQuest'],
  },
  {
    startSec: 62.00,
    endSec: 63.96,
    text: 'dan langsung lanjut belajar bahasa Jepang.',
    hot: ['langsung', 'belajar', 'bahasa', 'Jepang'],
  },

  // Scene 14
  {
    startSec: 65.05,
    endSec: 66.21,
    text: 'Kalau kamu pengguna iPhone,',
    hot: ['pengguna', 'iPhone'],
  },
  {
    startSec: 66.54,
    endSec: 68.84,
    text: 'langsung coba pasang SevnQuest di Home Screen kamu.',
    hot: ['pasang', 'SevnQuest', 'Home', 'Screen'],
  },
];

export const IPhoneCaption: React.FC<{frameOffset?: number}> = ({frameOffset = 0}) => {
  const f = useCurrentFrame() + frameOffset;

  // Find active caption
  const active = IPHONE_CAPTIONS.find((c) => {
    const startF = sec(c.startSec);
    const endF = sec(c.endSec);
    return f >= startF && f <= endF + 4; // slight hold
  });

  if (!active) return null;

  const startF = sec(active.startSec);
  const endF = sec(active.endSec);
  const enterProg = progBetween(f, startF, startF + 4);
  const exitProg = f > endF ? progBetween(f, endF, endF + 4) : 0;
  const opacity = enterProg * (1 - exitProg);
  const translateY = (1 - enterProg) * 12 + exitProg * -8;

  const words = active.text.split(' ');

  return (
    <div
      style={{
        position: 'absolute',
        top: SAFE.captionTop,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 50px',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          background: 'rgba(11, 13, 19, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(240, 190, 82, 0.28)',
          borderRadius: 24,
          padding: '16px 36px',
          boxShadow:
            '0 12px 36px rgba(0,0,0,0.65), 0 0 20px rgba(240,190,82,0.12)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px 12px',
          maxWidth: 960,
        }}
      >
        {words.map((w, idx) => {
          const clean = w.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').toLowerCase();
          const isHot = active.hot?.some((h) => clean.includes(h.toLowerCase()));
          return (
            <span
              key={idx}
              style={{
                fontFamily: FONT.display,
                fontWeight: isHot ? 800 : 600,
                fontSize: 38,
                color: isHot ? C.gold : C.text,
                textShadow: isHot
                  ? '0 0 16px rgba(240,190,82,0.6), 0 2px 4px rgba(0,0,0,0.8)'
                  : '0 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: 0.5,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
};
