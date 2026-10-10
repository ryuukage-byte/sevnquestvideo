export const TOTAL_FRAMES = 2160; // 72.00s @ 30fps

export interface SceneMeta {
  id: string;
  name: string;
  from: number;
  dur: number;
  timecode: string;
}

export const SCENES: SceneMeta[] = [
  {
    id: 'intro_hiragana',
    name: '01 · Hiragana Au',
    from: 0,
    dur: 166, // 00:00.00 – 00:05.52
    timecode: '00:00.00–00:05.52',
  },
  {
    id: 'kanji_morph',
    name: '02 · Kanji Morph',
    from: 166,
    dur: 137, // 00:05.52 – 00:10.10
    timecode: '00:05.52–00:10.10',
  },
  {
    id: 'hero_au_meet',
    name: '03 · Hero 会う Bertemu',
    from: 303,
    dur: 296, // 00:10.10 – 00:19.96
    timecode: '00:10.10–00:19.96',
  },
  {
    id: 'example_tomodachi',
    name: '04 · Contoh 友達に会う',
    from: 599,
    dur: 127, // 00:19.96 – 00:24.20
    timecode: '00:19.96–00:24.20',
  },
  {
    id: 'focus_shift_match',
    name: '05 · Fokus Berpindah 合う',
    from: 726,
    dur: 84, // 00:24.20 – 00:27.00
    timecode: '00:24.20–00:27.00',
  },
  {
    id: 'keywords_and_snap',
    name: '06 · Keyword & Snap Cocok',
    from: 810,
    dur: 357, // 00:27.00 – 00:38.91
    timecode: '00:27.00–00:38.91',
  },
  {
    id: 'examples_au',
    name: '07 · Contoh 気が合う & サイズが合う',
    from: 1167,
    dur: 197, // 00:38.91 – 00:45.48
    timecode: '00:38.91–00:45.48',
  },
  {
    id: 'side_by_side_summary',
    name: '08 · Summary & Kanji Penting',
    from: 1364,
    dur: 266, // 00:45.48 – 00:54.34
    timecode: '00:45.48–00:54.34',
  },
  {
    id: 'reflective_life',
    name: '09 · Refleksi Kehidupan',
    from: 1630,
    dur: 384, // 00:54.34 – 00:67.13
    timecode: '00:54.34–00:67.13',
  },
  {
    id: 'sevnquest_outro',
    name: '10 · SevnQuest Branding & CTA',
    from: 2014,
    dur: 146, // 00:67.13 – 00:71.92
    timecode: '00:67.13–00:71.92',
  },
];
