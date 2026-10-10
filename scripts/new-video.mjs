// Buat video Remotion baru dari src/videos/_template.
//   npm run new-video -- <slug> ["Judul pendek"]
//   contoh: npm run new-video -- kotoba-dasar "Kotoba Dasar"
//
// Yang dikerjakan:
//   1. Salin src/videos/_template → src/videos/<slug> (ganti nama + identifier)
//   2. Daftarkan 2 composition (master + Clean) di src/Root.tsx lewat marker @new-video
//   3. Buat content/<slug>/storyboard.md untuk menaruh storyboard & naskah VO
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [slug, title] = process.argv.slice(2);

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('Pakai: npm run new-video -- <slug-kebab-case> ["Judul"]\n  contoh: npm run new-video -- kotoba-dasar "Kotoba Dasar"');
  process.exit(1);
}

const pascal = slug.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
const name = `${pascal}Video`;
const dest = path.join(ROOT, 'src/videos', slug);
const tpl = path.join(ROOT, 'src/videos/_template');
const rootFile = path.join(ROOT, 'src/Root.tsx');

if (fs.existsSync(dest)) {
  console.error(`src/videos/${slug} sudah ada.`);
  process.exit(1);
}

let root = fs.readFileSync(rootFile, 'utf8');
for (const marker of ['// @new-video:imports', '{/* @new-video:compositions */}']) {
  if (!root.includes(marker)) {
    console.error(`Marker "${marker}" tidak ditemukan di src/Root.tsx.`);
    process.exit(1);
  }
}

const rewrite = (s) => s.replaceAll('TemplateVideo', name).replaceAll('__SLUG__', slug);

const copy = (from, to) => {
  fs.mkdirSync(to, {recursive: true});
  for (const e of fs.readdirSync(from, {withFileTypes: true})) {
    const src = path.join(from, e.name);
    const out = path.join(to, rewrite(e.name));
    if (e.isDirectory()) copy(src, out);
    else fs.writeFileSync(out, rewrite(fs.readFileSync(src, 'utf8')));
  }
};
copy(tpl, dest);

// --- daftarkan di Root.tsx
const imports = [
  `import {${name}} from './videos/${slug}/${name}';`,
  `import {TOTAL_FRAMES as TOTAL_FRAMES_${pascal.toUpperCase()}} from './videos/${slug}/timing';`,
].join('\n');

const comp = (id, captions) => `      <Composition
        id="${id}"
        component={${name}}
        durationInFrames={TOTAL_FRAMES_${pascal.toUpperCase()}}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{sfx: true, captions: ${captions}, voiceover: false}}
      />
`;

root = root
  .replace('// @new-video:imports', `${imports}\n// @new-video:imports`)
  .replace(
    '{/* @new-video:compositions */}',
    `{/* ${title ?? pascal} */}\n${comp(`SevnQuest${pascal}`, true)}\n      {/* ${title ?? pascal}: tanpa subtitle (clean track) */}\n${comp(`SevnQuest${pascal}Clean`, false)}\n      {/* @new-video:compositions */}`,
  );
fs.writeFileSync(rootFile, root);

// --- storyboard
const sbDir = path.join(ROOT, 'content', slug);
fs.mkdirSync(sbDir, {recursive: true});
fs.writeFileSync(
  path.join(sbDir, 'storyboard.md'),
  `# ${title ?? pascal}\n\n- Slug: \`${slug}\`\n- Kode: \`src/videos/${slug}/\`\n- Voice-over: \`public/audio/voice/${slug}.wav\`\n- Render: \`npm run render -- SevnQuest${pascal}\`\n\n## Storyboard\n\n| # | Detik | Visual | VO / Subtitle |\n|---|-------|--------|---------------|\n| 1 | 0.00 – 4.00 | Hook | |\n| 2 | 4.00 – 8.00 | CTA | |\n`,
);

console.log(`✔ src/videos/${slug}/  (${name})
✔ src/Root.tsx  → SevnQuest${pascal}, SevnQuest${pascal}Clean
✔ content/${slug}/storyboard.md

Lanjut:
  1. Isi batas scene + subtitle di src/videos/${slug}/timing.ts
  2. Tambah scene di src/videos/${slug}/scenes/ (daftarkan di scenes/index.ts + ${name}.tsx)
  3. npm run dev  → preview di Remotion Studio
  4. npm run render -- SevnQuest${pascal}`);
