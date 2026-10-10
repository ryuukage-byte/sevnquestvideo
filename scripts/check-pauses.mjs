import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ffmpeg = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const audio = path.resolve('Raw/video 7.wav');

const res = spawnSync(ffmpeg, ['-i', audio, '-af', 'silencedetect=noise=-32dB:d=0.3', '-f', 'null', '-'], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024
});

const lines = (res.stderr || '').split('\n');
const silences = [];
let curStart = null;
for (const l of lines) {
  const sm = l.match(/silence_start: ([\d\.]+)/);
  const em = l.match(/silence_end: ([\d\.]+) \| silence_duration: ([\d\.]+)/);
  if (sm) curStart = parseFloat(sm[1]);
  if (em && curStart !== null) {
    silences.push({ start: curStart, end: parseFloat(em[1]), dur: parseFloat(em[2]) });
    curStart = null;
  }
}

// Print silences with duration > 0.45s as major sentence boundaries
console.log('--- ALL PAUSES ---');
silences.forEach((s, i) => {
  console.log(`[${i+1}] ${s.start.toFixed(2)}s -> ${s.end.toFixed(2)}s (pause: ${s.dur.toFixed(2)}s)`);
});
