import fs from 'node:fs';

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
console.log(`Total script lines: ${lines.length}`);
lines.forEach((l, i) => console.log(`${i+1}: ${l}`));
