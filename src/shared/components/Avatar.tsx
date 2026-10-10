import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';

/**
 * Pilihan gender karakter avatar SevnQuest.
 */
export type AvatarGender = 'male' | 'female';

/**
 * 16 tipe emosi/ekspresi wajah yang tersedia untuk Male & Female.
 */
export const AVATAR_EXPRESSION_KEYS = [
  'neutral',
  'happy',
  'excited',
  'satisfied',
  'confused',
  'surprised',
  'shocked',
  'awkward',
  'confident',
  'annoyed',
  'angry',
  'scared',
  'embarrassed',
  'sad',
  'crying',
  'sleepy',
] as const;

export type AvatarExpressionType = (typeof AVATAR_EXPRESSION_KEYS)[number];

export interface ExpressionMeta {
  index: number;
  paddedIndex: string;
  key: AvatarExpressionType;
  labelId: string;
  labelEn: string;
  symbol: string;
  description: string;
}

/**
 * Metadata lengkap untuk 16 ekspresi avatar.
 */
export const AVATAR_EXPRESSIONS: readonly ExpressionMeta[] = [
  {
    index: 1,
    paddedIndex: '01',
    key: 'neutral',
    labelId: 'Netral',
    labelEn: 'Neutral',
    symbol: '🙂',
    description: 'Santai, tenang, default idle state',
  },
  {
    index: 2,
    paddedIndex: '02',
    key: 'happy',
    labelId: 'Senang',
    labelEn: 'Happy',
    symbol: '😊',
    description: 'Senyum ramah, jawaban benar, ceria',
  },
  {
    index: 3,
    paddedIndex: '03',
    key: 'excited',
    labelId: 'Bersemangat',
    labelEn: 'Excited',
    symbol: '🤩',
    description: 'Antusias tinggi, penemuan baru, level up',
  },
  {
    index: 4,
    paddedIndex: '04',
    key: 'satisfied',
    labelId: 'Puas',
    labelEn: 'Satisfied',
    symbol: '😌',
    description: 'Puas hati, lega, misi selesai tuntas',
  },
  {
    index: 5,
    paddedIndex: '05',
    key: 'confused',
    labelId: 'Bingung',
    labelEn: 'Confused',
    symbol: '🤔',
    description: 'Berpikir, tidak yakin, bertanya-tanya perbedaan tata bahasa',
  },
  {
    index: 6,
    paddedIndex: '06',
    key: 'surprised',
    labelId: 'Kaget',
    labelEn: 'Surprised',
    symbol: '😮',
    description: 'Terkejut ringan, twist cerita, baru tahu makna kanji',
  },
  {
    index: 7,
    paddedIndex: '07',
    key: 'shocked',
    labelId: 'Syok',
    labelEn: 'Shocked',
    symbol: '😱',
    description: 'Terguncang, kaget berat, jebakan pola grammar',
  },
  {
    index: 8,
    paddedIndex: '08',
    key: 'awkward',
    labelId: 'Canggung',
    labelEn: 'Awkward',
    symbol: '😅',
    description: 'Keringat dingin, serba salah, canggung saat ditegur',
  },
  {
    index: 9,
    paddedIndex: '09',
    key: 'confident',
    labelId: 'Percaya Diri',
    labelEn: 'Confident',
    symbol: '😎',
    description: 'Yakin, menguasai materi, percaya diri menjawab soal',
  },
  {
    index: 10,
    paddedIndex: '10',
    key: 'annoyed',
    labelId: 'Kesal',
    labelEn: 'Annoyed',
    symbol: '😒',
    description: 'Bete, kesal, kesalahan berulang atau lupa kanji',
  },
  {
    index: 11,
    paddedIndex: '11',
    key: 'angry',
    labelId: 'Marah',
    labelEn: 'Angry',
    symbol: '😡',
    description: 'Frustrasi intens, salah goresan fatal',
  },
  {
    index: 12,
    paddedIndex: '12',
    key: 'scared',
    labelId: 'Takut',
    labelEn: 'Scared',
    symbol: '😨',
    description: 'Takut, panik melihat soal ujian JLPT',
  },
  {
    index: 13,
    paddedIndex: '13',
    key: 'embarrassed',
    labelId: 'Malu',
    labelEn: 'Embarrassed',
    symbol: '😳',
    description: 'Muka memerah, salah sebut onyomi/kunyomi, tersipu',
  },
  {
    index: 14,
    paddedIndex: '14',
    key: 'sad',
    labelId: 'Sedih',
    labelEn: 'Sad',
    symbol: '😔',
    description: 'Kecewa, streak belajar putus, sedih',
  },
  {
    index: 15,
    paddedIndex: '15',
    key: 'crying',
    labelId: 'Menangis',
    labelEn: 'Crying',
    symbol: '😭',
    description: 'Menangis terharu atau frustrasi goresan kanji',
  },
  {
    index: 16,
    paddedIndex: '16',
    key: 'sleepy',
    labelId: 'Mengantuk',
    labelEn: 'Sleepy',
    symbol: '😴',
    description: 'Lelah belajar larut malam, mengantuk',
  },
];

const EXPRESSION_INDEX_MAP: Record<AvatarExpressionType, ExpressionMeta> =
  AVATAR_EXPRESSIONS.reduce(
    (acc, item) => {
      acc[item.key] = item;
      return acc;
    },
    {} as Record<AvatarExpressionType, ExpressionMeta>,
  );

/**
 * Mencari metadata ekspresi berdasarkan key string atau nomor urut (1-16).
 */
export function getExpressionMeta(
  input?: AvatarExpressionType | number,
): ExpressionMeta {
  if (typeof input === 'number') {
    const clamped = Math.max(1, Math.min(16, Math.floor(input)));
    return AVATAR_EXPRESSIONS[clamped - 1];
  }
  if (input && input in EXPRESSION_INDEX_MAP) {
    return EXPRESSION_INDEX_MAP[input];
  }
  return AVATAR_EXPRESSIONS[0]; // fallback to neutral
}

/**
 * Menghasilkan relative path staticFile untuk ekspresi tertentu.
 */
export function getAvatarExpressionPath(params: {
  gender?: AvatarGender;
  female?: boolean;
  expression?: AvatarExpressionType | number;
}): string {
  const isFemale = params.gender === 'female' || params.female === true;
  const prefix = isFemale ? 'female' : 'male';
  const meta = getExpressionMeta(params.expression);
  return `avatars/expressions/${prefix}/${prefix}_${meta.paddedIndex}_${meta.key}.png`;
}

/**
 * Menghasilkan relative path staticFile untuk tier avatar asli (tier 1-10).
 */
export function getAvatarTierPath(params: {
  tier?: number;
  gender?: AvatarGender;
  female?: boolean;
}): string {
  const isFemale = params.gender === 'female' || params.female === true;
  const tier = Math.max(1, Math.min(10, Math.floor(params.tier ?? 1)));
  return isFemale ? `avatars/female/tier-${tier}.png` : `avatars/male/tier-${tier}.png`;
}

/**
 * Tipe bubble emosi di atas kepala avatar.
 */
export type AvatarBubbleType =
  | 'question'
  | 'exclamation'
  | 'idea'
  | 'sweat'
  | 'angry'
  | 'sparkle'
  | 'sleep'
  | 'dots';

const BUBBLE_CONTENT: Record<
  AvatarBubbleType,
  {icon: string; bg: string; color: string; border: string}
> = {
  question: {icon: '?', bg: '#202738', color: '#6f93cf', border: '#6f93cf'},
  exclamation: {icon: '!', bg: '#2b1d1f', color: '#e2555b', border: '#e2555b'},
  idea: {icon: '💡', bg: '#2e2616', color: '#f0be52', border: '#f0be52'},
  sweat: {icon: '💧', bg: '#162734', color: '#66b2ff', border: '#66b2ff'},
  angry: {icon: '💢', bg: '#361517', color: '#ff4d4f', border: '#ff4d4f'},
  sparkle: {icon: '✨', bg: '#2b2413', color: '#ffd666', border: '#ffd666'},
  sleep: {icon: '💤', bg: '#1f242f', color: '#a0aec0', border: '#718096'},
  dots: {icon: '•••', bg: '#1f242f', color: '#edf0f6', border: '#4a5568'},
};

/**
 * Komponen speech/emotion bubble kecil di atas kepala Avatar.
 */
export const AvatarBubble: React.FC<{
  type?: AvatarBubbleType;
  custom?: React.ReactNode;
  size?: number;
  scale?: number;
  style?: React.CSSProperties;
}> = ({type = 'question', custom, size = 52, scale = 1, style}) => {
  const preset = BUBBLE_CONTENT[type];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: size,
        height: size,
        padding: '0 10px',
        borderRadius: size / 2,
        background: preset.bg,
        border: `2px solid ${preset.border}`,
        boxShadow: `0 8px 18px rgba(0,0,0,0.5), 0 0 16px ${preset.border}44`,
        color: preset.color,
        fontFamily: FONT.display,
        fontWeight: 900,
        fontSize: size * 0.48,
        lineHeight: 1,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {custom ?? preset.icon}
    </div>
  );
};

export interface AvatarExpressionProps {
  /**
   * Gender karakter: 'male' (default) atau 'female'.
   */
  gender?: AvatarGender;
  /**
   * Shorthand boolean alternatif untuk gender="female".
   */
  female?: boolean;
  /**
   * Pilihan salah satu dari 16 ekspresi wajah (string atau index 1..16).
   */
  expression?: AvatarExpressionType | number;
  /**
   * Jika ingin fallback ke avatar tier bawaan (1..10) saat ekspresi tidak ditentukan.
   */
  tier?: number;
  /**
   * Tinggi avatar dalam pixel (default: 240).
   */
  height?: number;
  /**
   * Lebar avatar ('auto' atau pixel tertentu).
   */
  width?: number | 'auto';
  /**
   * Membalik arah karakter secara horizontal (misal untuk posisi saling bicara).
   */
  flip?: boolean;
  /**
   * Efek bayangan drop-shadow pixel khas SevnQuest (default: true).
   */
  shadow?: boolean;
  /**
   * Rendering gambar pixelated crisp (default: true).
   */
  pixelated?: boolean;
  /**
   * Efek subtle floating/breathing idle animation.
   */
  idleBob?: boolean;
  /**
   * Animasi pop scale (0..1).
   */
  scale?: number;
  /**
   * Emotion callout bubble di atas kepala (preset nama atau custom ReactNode).
   */
  bubble?: AvatarBubbleType | React.ReactNode;
  /**
   * Posisi bubble: 'top' (tengah), 'top-left', atau 'top-right' (default).
   */
  bubblePosition?: 'top' | 'top-left' | 'top-right';
  /**
   * Label tag kecil di bawah avatar (misal nama atau role).
   */
  badge?: React.ReactNode;
  /**
   * Styling kustom pembungkus avatar.
   */
  style?: React.CSSProperties;
  /**
   * Styling kustom tag <img> langsung.
   */
  imageStyle?: React.CSSProperties;
}

/**
 * Komponen utama AvatarExpression untuk menampilkan 16 ekspresi Male / Female
 * dengan dukungan bubble reaksi emosi, mirror flip, dan animasi bobbing.
 */
export const AvatarExpression: React.FC<AvatarExpressionProps> = ({
  gender = 'male',
  female = false,
  expression,
  tier,
  height = 240,
  width = 'auto',
  flip = false,
  shadow = true,
  pixelated = true,
  idleBob = false,
  scale = 1,
  bubble,
  bubblePosition = 'top-right',
  badge,
  style,
  imageStyle,
}) => {
  const frame = useCurrentFrame();
  const effectiveGender: AvatarGender = female || gender === 'female' ? 'female' : 'male';

  // Tentukan path gambar: jika ada expression (atau tier tidak diberikan), pakai expression
  const imgSrc =
    expression !== undefined || tier === undefined
      ? staticFile(
          getAvatarExpressionPath({
            gender: effectiveGender,
            expression: expression ?? 'neutral',
          }),
        )
      : staticFile(
          getAvatarTierPath({
            gender: effectiveGender,
            tier,
          }),
        );

  // Idle subtle breathing animation jika idleBob diaktifkan
  const bobY = idleBob ? Math.sin((frame / 30) * Math.PI * 1.5) * 6 : 0;

  // Penentuan posisi bubble
  const bubbleAlign =
    bubblePosition === 'top-left'
      ? {left: '8%', transform: 'translate(-50%, -50%)'}
      : bubblePosition === 'top-right'
        ? {right: '8%', transform: 'translate(50%, -50%)'}
        : {left: '50%', transform: 'translate(-50%, -60%)'};

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        transform: `translateY(${bobY}px) scale(${scale})`,
        transformOrigin: 'bottom center',
        ...style,
      }}
    >
      {/* Emotion Bubble di atas kepala */}
      {bubble && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 10,
            ...bubbleAlign,
          }}
        >
          {typeof bubble === 'string' && bubble in BUBBLE_CONTENT ? (
            <AvatarBubble type={bubble as AvatarBubbleType} />
          ) : (
            bubble
          )}
        </div>
      )}

      {/* Render gambar avatar */}
      <Img
        src={imgSrc}
        style={{
          height,
          width,
          transform: flip ? 'scaleX(-1)' : undefined,
          transformOrigin: 'center center',
          imageRendering: pixelated ? 'pixelated' : 'auto',
          filter: shadow
            ? 'drop-shadow(0 14px 22px rgba(0,0,0,0.65)) drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
            : undefined,
          userSelect: 'none',
          ...imageStyle,
        }}
      />

      {/* Badge / Label opsional di bawah */}
      {badge && (
        <div
          style={{
            marginTop: 8,
            fontSize: 18,
            fontWeight: 800,
            color: C.goldSoft,
            fontFamily: FONT.display,
            background: `${C.card}ee`,
            border: `1.5px solid ${C.borderSubtle}`,
            padding: '4px 14px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
};

/**
 * Drop-in backwards-compatible Avatar component.
 * Mendukung props lama (tier, female, height, style) sekaligus props baru (expression, gender, flip, bubble).
 */
export const Avatar: React.FC<
  AvatarExpressionProps & {
    tier?: number;
  }
> = (props) => {
  return <AvatarExpression {...props} />;
};

export default AvatarExpression;
