import React from 'react';
import {
  At,
  Avatar,
  BOUNCY,
  HighlightSou,
  NarrationSub,
  mix,
  pp,
  useT,
} from '../kit';
import {C, FONT} from '../../../shared/theme';

export const World4_CompareYou: React.FC<{sfx?: boolean}> = () => {
  const T = useT(); // 0 .. 9.0s (relatif terhadap start 46.5s)
  // Subtitle timeline:
  // S20: 0.0 - 2.3s (Nah, ini bisa dibandingkan dengan 〜よう)
  // S21: 2.3 - 4.5s (降りそう: Aku melihat tanda-tandanya langsung)
  // S22: 4.5 - 6.7s (降るようだ: Dari keadaan atau informasi yang ada)
  // S23: 6.7 - 9.0s (Dua-duanya bisa diterjemahkan 'sepertinya', tapi fokus beda)

  // S20: Kartu 2 (よう) masuk dari bawah
  const card2Enter = pp(T, 0.4, BOUNCY);

  // Fokus S21 vs S22 vs S23
  const isFocusSou = T >= 2.3 && T < 4.5;
  const isFocusYou = T >= 4.5 && T < 6.7;

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
      {/* Header */}
      <At y={240}>
        <div
          style={{
            padding: '6px 22px',
            borderRadius: 999,
            background: `${C.indigo}22`,
            border: `1.5px solid ${C.indigo}`,
            color: C.indigoSoft,
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: 2,
          }}
        >
          STUDI BANDING: 〜そう VS 〜よう
        </div>
      </At>

      {/* Kartu 1 (Atas): 雨が降りそう */}
      <At y={440}>
        <div
          style={{
            width: 720,
            background: isFocusSou ? '#283652' : '#1a2230',
            border: `2.5px solid ${isFocusSou ? C.gold : C.borderSubtle}`,
            borderRadius: 24,
            padding: '20px 32px',
            boxShadow: isFocusSou
              ? `0 16px 36px rgba(0,0,0,0.7), 0 0 28px ${C.gold}44`
              : '0 8px 20px rgba(0,0,0,0.4)',
            transform: `scale(${isFocusSou ? 1.05 : 1})`,
            transition: 'all 0.25s ease',
            opacity: isFocusYou ? 0.35 : 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{fontSize: 28}}>👁️</span>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 22,
                  fontWeight: 800,
                  color: isFocusSou ? C.gold : C.indigoSoft,
                }}
              >
                BENTUK 〜そう (Kesan Visual Langsung)
              </span>
            </div>
            <span
              style={{
                fontSize: 16,
                fontFamily: FONT.mono,
                padding: '4px 10px',
                borderRadius: 8,
                background: `${C.gold}22`,
                color: C.gold,
                fontWeight: 700,
              }}
            >
              FOKUS TANDA
            </span>
          </div>

          <div
            style={{
              fontFamily: FONT.jp,
              fontSize: 48,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            雨が降り<HighlightSou />。
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 20,
              fontWeight: 700,
              color: isFocusSou ? C.goldSoft : C.textSecondary,
            }}
          >
            “Aku melihat tanda-tandanya langsung di depan mata (langit mendung).”
          </div>
        </div>
      </At>

      {/* Teks Tengah S23: "SEPERTINYA" (Titik Temu) */}
      <At y={660}>
        <div
          style={{
            background: T >= 6.7 ? `${C.gold}22` : '#131924',
            border: `1.5px solid ${T >= 6.7 ? C.gold : C.borderSubtle}`,
            borderRadius: 16,
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{fontSize: 20}}>⚖️</span>
          <span
            style={{
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 22,
              color: T >= 6.7 ? C.goldSoft : C.textSecondary,
            }}
          >
            Keduanya bisa diartikan: <strong style={{color: '#fff'}}>“Sepertinya”</strong>
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              color: C.indigoSoft,
              marginLeft: 6,
            }}
          >
            (Namun titik tolaknya berbeda)
          </span>
        </div>
      </At>

      {/* Kartu 2 (Bawah): 雨が降るようだ */}
      <At y={880}>
        <div
          style={{
            width: 720,
            background: isFocusYou ? '#283652' : '#1a2230',
            border: `2.5px solid ${isFocusYou ? '#5cdbd3' : C.borderSubtle}`,
            borderRadius: 24,
            padding: '20px 32px',
            boxShadow: isFocusYou
              ? '0 16px 36px rgba(0,0,0,0.7), 0 0 28px rgba(92, 219, 211, 0.44)'
              : '0 8px 20px rgba(0,0,0,0.4)',
            transform: `scale(${mix(0.9, isFocusYou ? 1.05 : 1, card2Enter)})`,
            transition: 'all 0.25s ease',
            opacity: isFocusSou ? 0.35 : 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{fontSize: 28}}>🧠</span>
              <span
                style={{
                  fontFamily: FONT.display,
                  fontSize: 22,
                  fontWeight: 800,
                  color: isFocusYou ? '#5cdbd3' : C.indigoSoft,
                }}
              >
                BENTUK 〜よう (Pertimbangan / Informasi Data)
              </span>
            </div>
            <span
              style={{
                fontSize: 16,
                fontFamily: FONT.mono,
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(92, 219, 211, 0.2)',
                color: '#5cdbd3',
                fontWeight: 700,
              }}
            >
              FOKUS PENILAIAN
            </span>
          </div>

          <div
            style={{
              fontFamily: FONT.jp,
              fontSize: 48,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            雨が降る<span style={{color: '#5cdbd3'}}>ようだ</span>。
          </div>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 20,
              fontWeight: 700,
              color: isFocusYou ? '#b5f5ec' : C.textSecondary,
            }}
          >
            “Dari radar cuaca / analisis situasi, tampaknya akan hujan.”
          </div>
        </div>
      </At>

      {/* Avatar Guru / Sensei Menjelaskan di Bawah */}
      <At y={1200}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <Avatar
            gender="male"
            expression={T >= 6.7 ? 'confident' : 'neutral'}
            height={210}
            bubble={isFocusSou ? 'idea' : isFocusYou ? 'question' : undefined}
          />
          <div
            style={{
              background: '#1d273a',
              border: `1.5px solid ${C.indigo}`,
              borderRadius: 20,
              padding: '16px 26px',
              color: '#edf0f6',
              fontFamily: FONT.display,
              fontWeight: 700,
              fontSize: 22,
              maxWidth: 380,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            {T < 4.5 ? (
              <span>
                <strong style={{color: C.gold}}>降りそう</strong> = Spontan dari mata (melihat awan).
              </span>
            ) : T < 6.7 ? (
              <span>
                <strong style={{color: '#5cdbd3'}}>降るようだ</strong> = Hasil olah data & informasi.
              </span>
            ) : (
              <span>
                Sama-sama ‘sepertinya’, tapi <strong>sumber alasannya</strong> berbeda!
              </span>
            )}
          </div>
        </div>
      </At>

      {/* Subtitle Narasi */}
      <NarrationSub t={T} at={0.0} until={2.3}>
        “Nah, ini bisa dibandingkan dengan 〜よう.”
      </NarrationSub>
      <NarrationSub t={T} at={2.3} until={4.5}>
        “‘Aku melihat tanda-tandanya…’ ➔ <span style={{color: C.gold}}>雨が降りそう</span>.”
      </NarrationSub>
      <NarrationSub t={T} at={4.5} until={6.7}>
        “‘Dari keadaan atau informasi data yang ada…’ ➔ <span style={{color: '#5cdbd3'}}>雨が降るようだ</span>.”
      </NarrationSub>
      <NarrationSub t={T} at={6.7} until={9.0}>
        “Dua-duanya bisa diterjemahkan ‘sepertinya’… tapi fokusnya berbeda.”
      </NarrationSub>
    </div>
  );
};
