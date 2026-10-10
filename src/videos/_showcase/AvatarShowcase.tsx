import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {
  AVATAR_EXPRESSIONS,
  AvatarBubbleType,
  AvatarExpression,
  AvatarExpressionType,
} from '../../shared/components/Avatar';
import {C, FONT} from '../../shared/theme';

const BUBBLE_SHOWCASE: Record<number, AvatarBubbleType> = {
  5: 'question',
  6: 'exclamation',
  7: 'exclamation',
  8: 'sweat',
  9: 'idea',
  11: 'angry',
  16: 'sleep',
};

const SAMPLE_DIALOGUES: Record<string, {male: string; female: string}> = {
  neutral: {male: 'Siap belajar Kanji hari ini.', female: 'Yuk kita mulai latihannya!'},
  happy: {male: 'Jawaban kamu tepat 100%!', female: 'Hebat, streak kamu naik!'},
  excited: {male: 'Keren banget combo nulisnya!', female: 'Level up ke tier berikutnya!'},
  satisfied: {male: 'Semua kotoba tuntas dihafal.', female: 'Misi harian selesai dengan baik.'},
  confused: {male: 'Tunggu, ini dibaca kun atau on?', female: 'Bukannya kanji ini punya 2 arti?'},
  surprised: {male: 'Ehh?! Ternyata goresannya beda?!', female: 'Baru tahu ada cara baca ini!'},
  shocked: {male: 'Astaga, jebakan pola grammar!', female: 'Gawat, urutan goresannya salah!'},
  awkward: {male: 'Hehe.. lupa nulis radikalnya..', female: 'Agak canggung pas ditegur sensei..'},
  confident: {male: 'Soal JLPT N3 ini gampang banget.', female: 'Percayakan padaku, pasti betul!'},
  annoyed: {male: 'Hadeh.. salah coret lagi.', female: 'Kenapa kanji ini mirip banget sih..'},
  angry: {male: 'Bisa-bisanya streak 50 hari putus!', female: 'Fokus! Jangan sampai salah lagi!'},
  scared: {male: 'Waduh, ujian tinggal 3 hari lagi..', female: 'Takut nilainya jeblok..'},
  embarrassed: {male: 'Malu banget salah baca furigana..', female: 'Aduh, mukaku merah gak ya..'},
  sad: {male: 'Sayang banget nilainya berkurang..', female: 'Susah banget ngingetnya..'},
  crying: {male: 'Huwaaa.. goresannya banyak banget!', female: 'Tangan udah pegel nulis kanji ini..'},
  sleepy: {male: 'Hoaaam.. udah jam 1 pagi nih..', female: 'Tidur dulu yuk, besok lanjut lagi..'},
};

export const AvatarShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Rotasi ekspresi aktif setiap 1.5 detik
  const currentExpIndex = Math.floor(frame / (fps * 1.5)) % 16;
  const activeMeta = AVATAR_EXPRESSIONS[currentExpIndex];

  const dialogue = SAMPLE_DIALOGUES[activeMeta.key] ?? SAMPLE_DIALOGUES.neutral;
  const bubbleType = BUBBLE_SHOWCASE[activeMeta.index] ?? 'idea';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: C.bg,
        backgroundImage: `radial-gradient(ellipse at 50% 10%, #2d3b5c66 0%, transparent 60%),
                          radial-gradient(ellipse at 50% 90%, #1e2638 0%, #0b0d13 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 40px 40px',
        boxSizing: 'border-box',
        color: C.text,
        fontFamily: FONT.body,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 4,
            color: C.gold,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          SEVNQUEST ASSET SYSTEM
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 40,
            fontWeight: 800,
            fontFamily: FONT.display,
            letterSpacing: 1,
            color: '#ffffff',
          }}
        >
          Avatar Expressions Library
        </h1>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 18,
            color: C.textSecondary,
          }}
        >
          16 Ekspresi Wajah Emosional • Karakter Male & Female Pixel-Art
        </p>
      </div>

      {/* Featured Spotlight: Live Character Stage */}
      <div
        style={{
          width: '100%',
          maxWidth: 1000,
          background: `linear-gradient(180deg, #242c3f 0%, ${C.card} 100%)`,
          borderRadius: 28,
          border: `2px solid ${C.gold}aa`,
          padding: '16px 28px',
          boxShadow: `0 14px 36px rgba(0,0,0,0.6), 0 0 24px ${C.gold}22`,
          marginBottom: 18,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Spotlight Banner Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 22,
              background: `${C.gold}22`,
              border: `1.5px solid ${C.gold}`,
              borderRadius: 10,
              padding: '2px 8px',
            }}
          >
            {activeMeta.symbol}
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              fontFamily: FONT.display,
              color: C.goldSoft,
              letterSpacing: 1,
            }}
          >
            LIVE SPOTLIGHT: #{activeMeta.paddedIndex} {activeMeta.labelId.toUpperCase()} ({activeMeta.key})
          </span>
        </div>

        {/* Live Characters Stage with Dialogue Balloons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          {/* Male Character + Speech Bubble */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div
              style={{
                background: '#182030',
                border: `1.5px solid ${C.indigo}`,
                borderRadius: 14,
                padding: '6px 14px',
                fontSize: 15,
                fontWeight: 700,
                color: '#edf0f6',
                maxWidth: 240,
                textAlign: 'center',
                marginBottom: 8,
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              }}
            >
              "{dialogue.male}"
            </div>
            <AvatarExpression
              gender="male"
              expression={activeMeta.key as AvatarExpressionType}
              height={190}
              idleBob
              bubble={bubbleType}
              badge="Male Protag"
            />
          </div>

          {/* Center VS / Code Snippet */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 40,
            }}
          >
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 14,
                color: C.indigoSoft,
                background: `${C.bgDeep}ee`,
                padding: '8px 14px',
                borderRadius: 12,
                border: `1px solid ${C.borderSubtle}`,
                textAlign: 'center',
              }}
            >
              &lt;Avatar
              <br />
              &nbsp;&nbsp;expression="{activeMeta.key}"
              <br />
              /&gt;
            </div>
          </div>

          {/* Female Character + Speech Bubble */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div
              style={{
                background: '#241a28',
                border: `1.5px solid ${C.gold}`,
                borderRadius: 14,
                padding: '6px 14px',
                fontSize: 15,
                fontWeight: 700,
                color: '#edf0f6',
                maxWidth: 240,
                textAlign: 'center',
                marginBottom: 8,
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              }}
            >
              "{dialogue.female}"
            </div>
            <AvatarExpression
              gender="female"
              expression={activeMeta.key as AvatarExpressionType}
              height={190}
              flip
              idleBob
              badge="Female Protag"
            />
          </div>
        </div>
      </div>

      {/* Title Grid */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 1000,
          marginBottom: 10,
        }}
      >
        <div style={{fontSize: 17, fontWeight: 800, color: C.textSecondary, letterSpacing: 1}}>
          SEMUA 16 EKSPRESI TERSEDIA (MALE & FEMALE):
        </div>
        <div style={{fontSize: 14, fontFamily: FONT.mono, color: C.gold}}>
          Total 32 Varian Karakter
        </div>
      </div>

      {/* Grid 4 x 4 (16 Kartu Lengkap) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: 12,
          width: '100%',
          maxWidth: 1000,
          flex: 1,
        }}
      >
        {AVATAR_EXPRESSIONS.map((meta) => {
          const isHighlighted = meta.index === activeMeta.index;

          return (
            <div
              key={meta.key}
              style={{
                backgroundColor: isHighlighted ? '#283652' : C.card,
                borderRadius: 18,
                border: `1.5px solid ${isHighlighted ? C.gold : C.borderSubtle}`,
                padding: '8px 10px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: isHighlighted
                  ? `0 8px 20px rgba(0,0,0,0.6), 0 0 16px ${C.gold}44`
                  : '0 4px 12px rgba(0,0,0,0.3)',
                transform: isHighlighted ? 'scale(1.02)' : 'scale(1)',
                position: 'relative',
              }}
            >
              {/* Header Card */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0 2px',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: FONT.mono,
                    color: isHighlighted ? C.gold : C.textMuted,
                  }}
                >
                  #{meta.paddedIndex}
                </span>
                <span style={{fontSize: 15}}>{meta.symbol}</span>
              </div>

              {/* Avatar Pair */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: 6,
                  height: 105,
                }}
              >
                <AvatarExpression
                  gender="male"
                  expression={meta.key as AvatarExpressionType}
                  height={94}
                />
                <AvatarExpression
                  gender="female"
                  expression={meta.key as AvatarExpressionType}
                  height={94}
                  flip
                />
              </div>

              {/* Label */}
              <div style={{textAlign: 'center', width: '100%'}}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: isHighlighted ? C.goldSoft : '#ffffff',
                    fontFamily: FONT.display,
                    lineHeight: 1.1,
                  }}
                >
                  {meta.labelId}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: FONT.mono,
                    color: isHighlighted ? '#fff' : C.indigoSoft,
                    marginTop: 1,
                  }}
                >
                  `{meta.key}`
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
