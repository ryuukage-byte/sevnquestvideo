import {FPS} from '../../shared';

export {FPS};
export const sec = (s: number) => Math.round(s * FPS);

// ① Batas scene dalam DETIK (ambil dari timestamp voice-over / storyboard).
//    N scene → N+1 angka. Angka terakhir = akhir video.
export const T = [0, 4, 8] as const;

// ② Nama tiap scene (muncul di timeline Remotion Studio). Jumlahnya = T.length - 1.
const NAMES = ['01 · Hook', '02 · CTA'] as const;

// ③ Subtitle per scene (urutan sama dengan NAMES).
export const CAPTIONS: string[] = [
  'Contoh baris voice-over pertama.',
  'Coba latihan langsung di SevnQuest.',
];

export const TOTAL_FRAMES = sec(T[T.length - 1]);

export const SCENES = NAMES.map((name, i) => ({
  id: `scene_${String(i + 1).padStart(2, '0')}`,
  name,
  from: sec(T[i]),
  dur: sec(T[i + 1]) - sec(T[i]),
}));
