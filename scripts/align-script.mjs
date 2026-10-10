import { spawnSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const ffmpeg = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const audio = path.resolve('Raw/video 7.wav');

const rawScript = `
“Bang, aku mau belajar bahasa Jepang, tapi bingung mau mulai dari mana.”
Oke, ini sebenarnya masalah yang sering ditemukan ketika kita mau belajar bahasa apa pun.
Karena sebelum mulai belajar, kita perlu tahu dulu:
“Bahasa ini sebenarnya seperti apa?”
Apakah punya dasar yang sama dengan bahasa kita?
Bagaimana cara membacanya?
Bagaimana cara menyusun kalimatnya?
Nah, kalau bahasa Jepang, ada satu hal yang langsung kelihatan berbeda:
hurufnya.
Kita terbiasa dengan alfabet A, B, C, sedangkan bahasa Jepang punya hiragana, katakana, dan kanji.
Jadi kalau kamu benar-benar mulai dari nol, jangan langsung loncat ke grammar yang rumit.
Secara sederhana, ada 3 hal utama yang perlu kamu bangun:
Huruf, kosakata, dan pola kalimat.
Pertama, huruf.
Mulai dari hiragana dan katakana dulu sampai kamu terbiasa membaca.
Setelah itu, mulai bangun kosakata.
Misalnya:
食べる — たべる — makan
飲む — のむ — minum
行く — いく — pergi
Nah, sambil kosakata kamu bertambah, kamu bisa mulai mengenal kanji.
Misalnya:
食べる → 食
飲む → 飲
行く → 行
Jadi jangan melihat kanji hanya sebagai gambar yang harus dihafal.
Lebih bagus kalau kamu belajar kanji bersama kata yang menggunakannya.
Setelah kamu punya sedikit bekal kosakata, baru mulai masuk ke pola kalimat.
Misalnya kamu sudah tahu:
私 = saya
学校 = sekolah
行く = pergi
Kemudian kamu belajar bagaimana menggabungkannya:
私は学校に行きます。
Watashi wa gakkou ni ikimasu.
“Saya pergi ke sekolah.”
Dari sini baru kamu mulai memahami fungsi は, に, を, で, perubahan kata kerja, dan pola-pola lainnya.
Jadi kalau kamu benar-benar baru mulai, jangan langsung berpikir:
“Aku harus hafal ribuan kosakata.”
“Aku harus hafal semua grammar N5.”
“Aku harus hafal banyak kanji.”
Nggak perlu.
Bangun pondasinya sedikit demi sedikit:
Huruf → Kosakata → Kanji → Pola kalimat → Penggunaan.
Karena tujuan belajar bahasa bukan cuma:
“Aku hafal bahasa Jepang.”
Tapi:
“Aku bisa menggunakan bahasa Jepang.”
Kalau kamu mau mulai belajar bahasa Jepang dari dasar, tapi masih bingung harus mulai dari mana,
coba sekarang di SevnQuest.
`;

const lines = rawScript.trim().split('\n').map(l => l.trim()).filter(Boolean);

// Detect silences with -30dB and 0.3s duration
const res = spawnSync(ffmpeg, ['-i', audio, '-af', 'silencedetect=noise=-30dB:d=0.32', '-f', 'null', '-'], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024
});

const stderrLines = (res.stderr || '').split('\n');
const silences = [];
let curStart = null;
for (const l of stderrLines) {
  const sm = l.match(/silence_start: ([\d\.]+)/);
  const em = l.match(/silence_end: ([\d\.]+) \| silence_duration: ([\d\.]+)/);
  if (sm) curStart = parseFloat(sm[1]);
  if (em && curStart !== null) {
    silences.push({ start: curStart, end: parseFloat(em[1]), dur: parseFloat(em[2]) });
    curStart = null;
  }
}

// Group into speech segments
const segments = [];
let lastEnd = 0;
for (const s of silences) {
  if (s.start > lastEnd + 0.08) {
    segments.push({
      start: parseFloat(lastEnd.toFixed(2)),
      end: parseFloat(s.start.toFixed(2)),
      dur: parseFloat((s.start - lastEnd).toFixed(2))
    });
  }
  lastEnd = s.end;
}
if (lastEnd < 161.32) {
  segments.push({
    start: parseFloat(lastEnd.toFixed(2)),
    end: 161.32,
    dur: parseFloat((161.32 - lastEnd).toFixed(2))
  });
}

console.log(`Lines: ${lines.length}, Speech Segments: ${segments.length}`);
segments.forEach((seg, i) => {
  console.log(`Seg [${i+1}]: ${seg.start}s -> ${seg.end}s (dur: ${seg.dur}s)`);
});
