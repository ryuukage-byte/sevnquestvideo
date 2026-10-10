// Render composition ke out/renders/<id>.mp4 (h264, crf 17).
//   npm run render -- SevnQuestShoku
//   npm run render -- SevnQuestShoku --concurrency=1
// Tanpa argumen → tampilkan daftar composition.
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [id, ...rest] = process.argv.slice(2);
const run = (args) => spawnSync('npx', ['remotion', ...args], {cwd: ROOT, stdio: 'inherit', shell: true}).status ?? 1;

if (!id) process.exit(run(['compositions', 'src/index.ts']));

process.exit(
  run(['render', 'src/index.ts', id, `out/renders/${id}.mp4`, '--codec=h264', '--crf=17', ...rest]),
);
