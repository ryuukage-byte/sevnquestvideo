import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ffmpeg = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const audio = path.resolve('Raw/video 7.wav');

const res = spawnSync(ffmpeg, ['-i', audio, '-af', 'silencedetect=noise=-30dB:d=0.35', '-f', 'null', '-'], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024
});

const stderr = res.stderr || '';

  const lines = stderr.split('\n');
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

  // Calculate speech segments (between silences)
  const segments = [];
  let lastEnd = 0;
  for (const s of silences) {
    if (s.start > lastEnd + 0.1) {
      segments.push({
        start: parseFloat(lastEnd.toFixed(3)),
        end: parseFloat(s.start.toFixed(3)),
        dur: parseFloat((s.start - lastEnd).toFixed(3))
      });
    }
    lastEnd = s.end;
  }
  if (lastEnd < 161.32) {
    segments.push({
      start: parseFloat(lastEnd.toFixed(3)),
      end: 161.32,
      dur: parseFloat((161.32 - lastEnd).toFixed(3))
    });
  }

  console.log(`Found ${silences.length} silences, ${segments.length} speech segments.`);
  console.log(JSON.stringify(segments, null, 2));
