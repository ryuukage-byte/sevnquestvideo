export interface RawTimestamp {
  id: string;
  index: number; // 1 to 53
  startMs: number;
  endMs: number;
  act: number;
  name: string;
  type: string;
}

export const RAW_TIMESTAMPS: RawTimestamp[] = [
  // ACT 01 — THE CONFUSION (00:00.00 – 00:14.98)
  { id: 'seg-01', index: 1, startMs: 0, endMs: 3070, act: 1, name: 'Instant Hook', type: 'hook' },
  { id: 'seg-02', index: 2, startMs: 3070, endMs: 9150, act: 1, name: 'Three Meanings Cards', type: 'meaning-cards' },
  { id: 'seg-03', index: 3, startMs: 9150, endMs: 14980, act: 1, name: 'The One Core Reveal', type: 'concept-reveal' },

  // ACT 02 — THE MEANING POINTER (00:14.98 – 01:04.97)
  { id: 'seg-04', index: 4, startMs: 14980, endMs: 20540, act: 2, name: 'Floating Labels & One Core', type: 'pointer-intro' },
  { id: 'seg-05', index: 5, startMs: 20540, endMs: 27390, act: 2, name: 'Pointer System Signature', type: 'pointer-system' },
  { id: 'seg-06', index: 6, startMs: 27390, endMs: 29790, act: 2, name: 'Chat Simulation: Libur', type: 'convo-libur' },
  { id: 'seg-07', index: 7, startMs: 29790, endMs: 33060, act: 2, name: 'Sou Desu: Memang Begitu', type: 'sou-desu' },
  { id: 'seg-08', index: 8, startMs: 33060, endMs: 39660, act: 2, name: 'Begitu Yang Mana? Whip-pan', type: 'whip-pan-pointer' },
  { id: 'seg-09', index: 9, startMs: 39660, endMs: 43020, act: 2, name: 'Hal Yang Dibicarakan Panel', type: 'panel-orbit' },
  { id: 'seg-10', index: 10, startMs: 43020, endMs: 46120, act: 2, name: 'Morph: Sou Desu ka?', type: 'morph-desuka' },
  { id: 'seg-11', index: 11, startMs: 46120, endMs: 51840, act: 2, name: 'Confirmation Dotted Line', type: 'dotted-confirm' },
  { id: 'seg-12', index: 12, startMs: 51840, endMs: 56160, act: 2, name: 'Sou Omoimasu: Inner Thought', type: 'inner-thought' },
  { id: 'seg-13', index: 13, startMs: 56160, endMs: 64970, act: 2, name: 'Memory Expand & Relationship Map', type: 'memory-expand' },

  // ACT 03 — LOOKS DELICIOUS (01:04.97 – 01:43.22)
  { id: 'seg-14', index: 14, startMs: 64970, endMs: 67930, act: 3, name: 'Tapi... Pattern Interrupt', type: 'pattern-interrupt' },
  { id: 'seg-15', index: 15, startMs: 67930, endMs: 72820, act: 3, name: 'Oishisou Ramen Close-up', type: 'ramen-hero' },
  { id: 'seg-16', index: 16, startMs: 72820, endMs: 76580, act: 3, name: 'Infographic: Objek/Pengamat/Kesan', type: 'infographic-setup' },
  { id: 'seg-17', index: 17, startMs: 76580, endMs: 83340, act: 3, name: 'Line of Sight & Belum Makan', type: 'line-of-sight' },
  { id: 'seg-18', index: 18, startMs: 83340, endMs: 86790, act: 3, name: 'Tampilan -> Kesan -> Sou Connector', type: 'appearance-connector' },
  { id: 'seg-19', index: 19, startMs: 86790, endMs: 92150, act: 3, name: 'Oishisou Example Card & Rack Focus', type: 'example-card' },
  { id: 'seg-20', index: 20, startMs: 92150, endMs: 100160, act: 3, name: 'Sou Berubah Arti? Cross Out', type: 'cross-out' },
  { id: 'seg-21', index: 21, startMs: 100160, endMs: 103220, act: 3, name: 'Begitu -> Translation Portal -> Kelihatannya', type: 'translation-portal' },

  // ACT 04 — WEATHER & COMPARISON (01:43.22 – 02:26.40)
  { id: 'seg-22', index: 22, startMs: 103220, endMs: 107600, act: 4, name: 'Ame ga Furisou: Sky Transition', type: 'sky-pan' },
  { id: 'seg-23', index: 23, startMs: 107600, endMs: 112100, act: 4, name: 'Three Weather Signs', type: 'weather-signs' },
  { id: 'seg-24', index: 24, startMs: 112100, endMs: 116590, act: 4, name: 'Visible Sign Prediction (No Rain Yet)', type: 'weather-thought' },
  { id: 'seg-25', index: 25, startMs: 116590, endMs: 119700, act: 4, name: 'Sou vs You Split Screen Open', type: 'split-open' },
  { id: 'seg-26', index: 26, startMs: 119700, endMs: 125670, act: 4, name: 'Sou Panel: Kesan Langsung', type: 'sou-panel' },
  { id: 'seg-27', index: 27, startMs: 125670, endMs: 126840, act: 4, name: 'You Panel: Ame ga Furu You da', type: 'you-typein' },
  { id: 'seg-28', index: 28, startMs: 126840, endMs: 133950, act: 4, name: 'You Diagram: Multi-source Context', type: 'you-diagram' },
  { id: 'seg-29', index: 29, startMs: 133950, endMs: 140050, act: 4, name: 'Sepertinya: Alternating Focus Pulse', type: 'alternate-pulse' },
  { id: 'seg-30', index: 30, startMs: 140050, endMs: 144710, act: 4, name: 'Sou Panel Sequence Zoom', type: 'sou-zoom' },
  { id: 'seg-31', index: 31, startMs: 144710, endMs: 146400, act: 4, name: 'You Lights Up & Panels Fold', type: 'panels-fold' },

  // ACT 05 — THE BIG GRAMMAR REVEAL (02:26.40 – 02:50.26)
  { id: 'seg-32', index: 32, startMs: 146400, endMs: 150750, act: 5, name: 'Two Characters: Food vs Phone', type: 'two-characters' },
  { id: 'seg-33', index: 33, startMs: 150750, endMs: 152090, act: 5, name: 'Difference Detector: Isolate [い]', type: 'difference-detector' },
  { id: 'seg-34', index: 34, startMs: 152090, endMs: 155690, act: 5, name: 'Left Fullscreen: Kelihatannya Enak', type: 'direct-fullscreen' },
  { id: 'seg-35', index: 35, startMs: 155690, endMs: 160920, act: 5, name: 'Right Fullscreen: Katanya Enak (Chat)', type: 'hearsay-fullscreen' },
  { id: 'seg-36', index: 36, startMs: 160920, endMs: 166540, act: 5, name: 'Two Simultaneous Flows Converge', type: 'two-flows' },
  { id: 'seg-37', index: 37, startMs: 166540, endMs: 170260, act: 5, name: 'Katanya Enak + Hearsay Stamp', type: 'hearsay-stamp' },

  // ACT 06 — THE COMPLETE RECAP (02:50.26 – 03:14.79)
  { id: 'seg-38', index: 38, startMs: 170260, endMs: 172870, act: 6, name: 'Recall: 5 Hologram Cards Arc', type: 'recap-arc' },
  { id: 'seg-39', index: 39, startMs: 172870, endMs: 173840, act: 6, name: 'Card 1: Sou Desu (Begitu.)', type: 'recap-c1' },
  { id: 'seg-40', index: 40, startMs: 173840, endMs: 175250, act: 6, name: 'Card 2: Sou Desu ka (Begitukah?)', type: 'recap-c2' },
  { id: 'seg-41', index: 41, startMs: 175250, endMs: 178120, act: 6, name: 'Card 3: Sou Omoimasu (Pikir Begitu)', type: 'recap-c3' },
  { id: 'seg-42', index: 42, startMs: 178120, endMs: 181130, act: 6, name: 'Card 4: Oishisou (Kelihatannya Enak)', type: 'recap-c4' },
  { id: 'seg-43', index: 43, startMs: 181130, endMs: 182620, act: 6, name: 'Card 5: Oishii Sou Desu (Katanya Enak)', type: 'recap-c5' },
  { id: 'seg-44', index: 44, startMs: 182620, endMs: 187890, act: 6, name: 'Overhead: Bukan Cuma 5 Arti Dihafal', type: 'recap-overhead' },
  { id: 'seg-45', index: 45, startMs: 187890, endMs: 194790, act: 6, name: '5 Cards Merge to Unified Sou Core', type: 'recap-merge' },

  // ACT 07 — THINK IN CONTEXT (03:14.79 – 03:42.48)
  { id: 'seg-46', index: 46, startMs: 194790, endMs: 198000, act: 7, name: 'Arrow Transform: Begitu Yang Mana?', type: 'arrow-question' },
  { id: 'seg-47', index: 47, startMs: 198000, endMs: 204090, act: 7, name: 'Three Context Panels 2.5D Depth', type: 'three-contexts' },
  { id: 'seg-48', index: 48, startMs: 204090, endMs: 207540, act: 7, name: 'Panels Orbit While Sou Remains Stable', type: 'orbit-translations' },
  { id: 'seg-49', index: 49, startMs: 207540, endMs: 213390, act: 7, name: 'Character: Lihat Konteksnya!', type: 'character-takeaway' },
  { id: 'seg-50', index: 50, startMs: 213390, endMs: 216800, act: 7, name: 'Enter Portal: Past Memories Float', type: 'memory-portal-1' },
  { id: 'seg-51', index: 51, startMs: 216800, endMs: 219910, act: 7, name: 'Connected Memories: Satu Garis Cahaya', type: 'memory-portal-2' },
  { id: 'seg-52', index: 52, startMs: 219910, endMs: 221200, act: 7, name: 'Final Takeaway: Sou Pahami Konteksnya', type: 'final-takeaway' },
  { id: 'seg-53', index: 53, startMs: 221200, endMs: 222480, act: 7, name: 'SevnQuest Logo Resolve & Iris Out', type: 'outro-brand' },
];
