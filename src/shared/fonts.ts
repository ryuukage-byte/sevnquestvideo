import {continueRender, delayRender, staticFile} from 'remotion';

// Semua font dibundel lokal di /public/fonts (via @fontsource) → render offline & deterministik.
const FILES: [family: string, weight: number, file: string][] = [
  ['Plus Jakarta Sans', 500, 'plus-jakarta-sans-latin-500-normal.woff2'],
  ['Plus Jakarta Sans', 600, 'plus-jakarta-sans-latin-600-normal.woff2'],
  ['Plus Jakarta Sans', 700, 'plus-jakarta-sans-latin-700-normal.woff2'],
  ['Plus Jakarta Sans', 800, 'plus-jakarta-sans-latin-800-normal.woff2'],
  ['Noto Serif JP', 700, 'noto-serif-jp-japanese-700-normal.woff2'],
  ['Noto Serif JP', 900, 'noto-serif-jp-japanese-900-normal.woff2'],
  ['Noto Sans JP', 500, 'noto-sans-jp-japanese-500-normal.woff2'],
  ['Noto Sans JP', 700, 'noto-sans-jp-japanese-700-normal.woff2'],
  ['Noto Sans JP', 900, 'noto-sans-jp-japanese-900-normal.woff2'],
  ['Noto Serif JP Latin', 700, 'noto-serif-jp-latin-700-normal.woff2'],
  ['Cinzel', 700, 'cinzel-latin-700-normal.woff2'],
  ['Cinzel', 900, 'cinzel-latin-900-normal.woff2'],
  ['JetBrains Mono', 600, 'jetbrains-mono-latin-600-normal.woff2'],
  ['JetBrains Mono', 700, 'jetbrains-mono-latin-700-normal.woff2'],
  ['JetBrains Mono', 800, 'jetbrains-mono-latin-800-normal.woff2'],
  ['Caveat', 600, 'caveat-latin-600-normal.woff2'],
  ['Caveat', 700, 'caveat-latin-700-normal.woff2'],
  ['Bricolage Grotesque', 700, 'bricolage-grotesque-latin-700-normal.woff2'],
  ['Bricolage Grotesque', 800, 'bricolage-grotesque-latin-800-normal.woff2'],
];

let started = false;

export const ensureFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Memuat font SevnQuest');
  Promise.all(
    FILES.map(async ([family, weight, file]) => {
      const face = new FontFace(family, `url(${staticFile('brand/fonts/' + file)}) format('woff2')`, {
        weight: String(weight),
      });
      await face.load();
      document.fonts.add(face);
    }),
  )
    .catch((e) => console.error('Font gagal dimuat', e))
    .finally(() => continueRender(handle));
};
