import React from 'react';
import {useCurrentFrame} from 'remotion';
import {prog} from '../../shared/anim';
import {C, FONT, SAFE} from '../../shared/theme';
import {sec} from './timing';

interface CaptionLine {
  startSec: number;
  endSec: number;
  text: string;
  hot?: string[];
}

export const SHOKU_CAPTIONS: CaptionLine[] = [
  // Scene 01
  {startSec: 0.28, endSec: 1.11, text: 'Ini dibaca', hot: ['dibaca']},
  {startSec: 2.11, endSec: 2.51, text: 'taberu', hot: ['taberu']},
  {startSec: 3.54, endSec: 3.94, text: 'Kalau ini?', hot: ['ini']},
  {startSec: 5.06, endSec: 5.75, text: 'tabemasu', hot: ['tabemasu']},

  // Scene 02
  {startSec: 6.69, endSec: 6.84, text: 'Nah', hot: []},
  {startSec: 7.08, endSec: 8.76, text: 'sekarang kalau ini dibaca apa?', hot: ['dibaca', 'apa']},
  {startSec: 10.41, endSec: 10.5, text: 'Yap', hot: ['yap']},
  {startSec: 11.52, endSec: 12.32, text: 'shokuji suru', hot: ['shokuji', 'suru']},
  {startSec: 13.16, endSec: 14.01, text: 'Loh kok beda bang?', hot: ['beda']},
  {startSec: 14.34, endSec: 15.26, text: 'Kan kanjinya sama?', hot: ['sama']},

  // Scene 03
  {
    startSec: 16.89,
    endSec: 20.68,
    text: 'Justru ini salah satu hal yang sering bikin orang bingung waktu mulai belajar kanji.',
    hot: ['bingung', 'belajar', 'kanji'],
  },

  // Scene 04
  {startSec: 21.43, endSec: 22.4, text: 'Di taberu', hot: ['taberu']},
  {startSec: 22.82, endSec: 23.72, text: 'kanjinya dibaca', hot: ['dibaca']},
  {startSec: 24.64, endSec: 24.74, text: 'ta', hot: ['ta']},
  {startSec: 25.65, endSec: 26.71, text: 'Tapi di shokuji', hot: ['shokuji']},
  {startSec: 27.23, endSec: 28.41, text: 'kanji yang sama dibaca', hot: ['sama', 'dibaca']},
  {startSec: 29.18, endSec: 29.52, text: 'shoku', hot: ['shoku']},

  // Scene 05
  {startSec: 30.41, endSec: 30.72, text: 'Kenapa?', hot: ['kenapa']},
  {
    startSec: 31.66,
    endSec: 35.58,
    text: 'Karena satu kanji dalam bahasa Jepang itu nggak selalu cuma punya satu cara baca.',
    hot: ['satu', 'kanji', 'nggak', 'selalu', 'baca'],
  },

  // Scene 06
  {startSec: 36.6, endSec: 38.57, text: 'Secara sederhana ada yang namanya', hot: ['sederhana']},
  {startSec: 39.23, endSec: 39.9, text: 'kunyomi', hot: ['kunyomi']},
  {startSec: 40.27, endSec: 40.63, text: 'dan', hot: []},
  {startSec: 41.28, endSec: 41.73, text: 'onyomi', hot: ['onyomi']},

  // Scene 07
  {startSec: 42.59, endSec: 43.45, text: 'Kalau taberu', hot: ['taberu']},
  {startSec: 43.8, endSec: 44.6, text: 'bacaan ta', hot: ['ta']},
  {startSec: 45.0, endSec: 45.31, text: 'adalah', hot: []},
  {startSec: 45.59, endSec: 45.92, text: 'kunyomi', hot: ['kunyomi']},
  {startSec: 46.72, endSec: 48.1, text: 'Sedangkan pada shokuji', hot: ['shokuji']},
  {startSec: 48.51, endSec: 49.01, text: 'bacaan', hot: []},
  {startSec: 49.34, endSec: 49.8, text: 'shoku', hot: ['shoku']},
  {startSec: 50.19, endSec: 50.49, text: 'adalah', hot: []},
  {startSec: 50.86, endSec: 51.24, text: 'onyomi', hot: ['onyomi']},
  {startSec: 52.2, endSec: 54.08, text: 'Terus gimana cara tahu kapan bacanya', hot: ['tahu', 'kapan']},
  {startSec: 54.32, endSec: 54.55, text: 'ta', hot: ['ta']},
  {startSec: 54.63, endSec: 55.72, text: 'dan kapan shoku?', hot: ['kapan', 'shoku']},

  // Scene 08
  {startSec: 56.45, endSec: 56.57, text: 'Nah', hot: []},
  {startSec: 56.91, endSec: 57.51, text: 'ini yang penting', hot: ['penting']},
  {startSec: 58.45, endSec: 60.12, text: 'Jangan hafalin kanji cuma seperti', hot: ['jangan', 'hafalin']},
  {startSec: 60.94, endSec: 62.73, text: 'shoku sama dengan ta.', hot: ['shoku', 'sama', 'ta']},

  // Scene 09
  {startSec: 63.54, endSec: 64.77, text: 'Karena nanti begitu ketemu', hot: ['ketemu']},
  {startSec: 65.52, endSec: 66.12, text: 'shokuji', hot: ['shokuji']},
  {startSec: 66.83, endSec: 67.5, text: 'shokudo', hot: ['shokudo']},
  {startSec: 68.06, endSec: 68.33, text: 'atau', hot: []},
  {startSec: 68.76, endSec: 69.37, text: 'shokuyoku', hot: ['shokuyoku']},
  {startSec: 70.07, endSec: 70.77, text: 'kamu bakal bingung', hot: ['bingung']},

  // Scene 10
  {
    startSec: 71.56,
    endSec: 74.3,
    text: 'Lebih aman belajar kanji langsung bersama kotobanya.',
    hot: ['aman', 'belajar', 'kotobanya'],
  },

  // Scene 11
  {startSec: 75.11, endSec: 75.53, text: 'Misalnya', hot: ['misalnya']},
  {startSec: 76.61, endSec: 77.05, text: 'taberu', hot: ['taberu']},
  {startSec: 77.92, endSec: 78.12, text: 'ta', hot: ['ta']},
  {startSec: 78.4, endSec: 78.78, text: 'beru', hot: ['beru']},
  {startSec: 79.66, endSec: 79.94, text: 'makan', hot: ['makan']},
  {startSec: 81.0, endSec: 81.53, text: 'shokuji', hot: ['shokuji']},
  {startSec: 82.33, endSec: 83.19, text: 'sho-ku-ji', hot: ['sho-ku-ji']},
  {startSec: 84.05, endSec: 85.21, text: 'makan atau hidangan', hot: ['hidangan']},
  {startSec: 86.34, endSec: 86.92, text: 'shokudo', hot: ['shokudo']},
  {startSec: 87.78, endSec: 88.53, text: 'sho-ku-do', hot: ['sho-ku-do']},
  {startSec: 89.41, endSec: 89.81, text: 'kantin', hot: ['kantin']},
  {startSec: 90.08, endSec: 90.7, text: 'atau ruang makan', hot: ['ruang', 'makan']},

  // Scene 12
  {startSec: 91.56, endSec: 93.56, text: 'Jadi yang sebenarnya kamu pelajari bukan cuma', hot: ['pelajari']},
  {startSec: 94.07, endSec: 95.31, text: 'kanji ini dibaca apa', hot: ['dibaca', 'apa']},
  {startSec: 96.08, endSec: 96.31, text: 'tapi', hot: ['tapi']},
  {startSec: 96.65, endSec: 98.44, text: 'kalau kanji ini ada di kotoba ini', hot: ['kotoba']},
  {startSec: 98.84, endSec: 99.58, text: 'dibacanya apa', hot: ['dibacanya']},

  // Scene 13
  {
    startSec: 100.4,
    endSec: 104.11,
    text: 'Makanya di SevnQuest kamu nggak cuma disuruh menghafal kanji dan artinya.',
    hot: ['sevnquest', 'menghafal', 'artinya'],
  },
  {
    startSec: 104.78,
    endSec: 107.28,
    text: 'Kamu juga belajar kanji itu muncul di kotoba apa',
    hot: ['kotoba'],
  },
  {startSec: 107.82, endSec: 108.73, text: 'dibaca bagaimana', hot: ['bagaimana']},
  {startSec: 109.11, endSec: 110.38, text: 'dan digunakan seperti apa', hot: ['digunakan']},

  // Scene 14
  {
    startSec: 111.22,
    endSec: 113.94,
    text: 'Jadi ketika nanti ketemu kanji yang sama di kata yang berbeda',
    hot: ['berbeda'],
  },
  {startSec: 114.41, endSec: 115.17, text: 'kamu nggak langsung mikir', hot: ['mikir']},
  {startSec: 115.78, endSec: 116.3, text: 'lah', hot: ['lah']},
  {startSec: 116.4, endSec: 117.4, text: 'kok bacaannya berubah', hot: ['berubah']},
  {
    startSec: 118.32,
    endSec: 121.77,
    text: 'Karena dari awal kamu memang belajarnya lewat kotoba dan konteksnya',
    hot: ['kotoba', 'konteksnya'],
  },
  {
    startSec: 122.36,
    endSec: 124.55,
    text: 'bukan cuma menghafal satu kanji dengan satu bacaan.',
    hot: ['menghafal', 'bacaan'],
  },

  // Scene 15
  {
    startSec: 125.41,
    endSec: 127.34,
    text: 'Kalau mau belajar bahasa Jepang dengan cara seperti ini',
    hot: ['belajar'],
  },
  {startSec: 127.86, endSec: 129.03, text: 'kamu bisa coba SevnQuest.', hot: ['coba', 'sevnquest']},
];

export const ShokuCaption: React.FC<{enabled?: boolean}> = ({enabled = true}) => {
  const f = useCurrentFrame();
  if (!enabled) return null;

  // Find active line
  const activeLine = SHOKU_CAPTIONS.find(
    (line) => f >= sec(line.startSec) && f < sec(line.endSec) + 6,
  );

  if (!activeLine) return null;

  const startF = sec(activeLine.startSec);
  const endF = sec(activeLine.endSec);

  // Fade in and out
  const fadeIn = prog(f, startF, 4);
  const fadeOut = f > endF ? 1 - prog(f, endF, 6) : 1;
  const opacity = Math.min(fadeIn, fadeOut);

  const words = activeLine.text.split(' ');
  const hotSet = new Set((activeLine.hot ?? []).map((h) => h.toLowerCase()));

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: SAFE.captionTop,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: 14,
        rowGap: 6,
        fontFamily: FONT.body,
        fontWeight: 700,
        fontSize: activeLine.text.length > 70 ? 38 : 44,
        lineHeight: 1.25,
        color: C.text,
        textShadow: '0 4px 20px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.9)',
        opacity,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {words.map((w, i) => {
        const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isHot = hotSet.has(clean);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              color: isHot ? C.gold : C.text,
              fontWeight: isHot ? 800 : 700,
              textShadow: isHot
                ? '0 0 24px rgba(240,190,82,0.5), 0 4px 18px rgba(0,0,0,0.85)'
                : undefined,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
