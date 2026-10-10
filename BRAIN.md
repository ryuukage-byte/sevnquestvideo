# 🧠 SevnQuest-Video — Knowledge Graph & Second Brain

> **Root Knowledge Hub & Memory System**  
> Folder ini terkonfigurasi sebagai **Second Brain** ganda:
> 1. **Obsidian Vault** (`.obsidian/`) — Graph view interaktif untuk catatan, storyboard, konvensi visual, dan arsitektur konten.
> 2. **CodeGraph** (`.codegraph/`) — AST & semantic code intelligence untuk navigasi relasi kode TypeScript/React oleh AI & developer.

---

## 🗺️ Peta Pengetahuan (Map of Content / MOC)

### 0. Aturan yang berlaku (baca dulu)
- [[SEVNQUEST|SEVNQUEST.md]]: gaya baku video — sumber kebenaran.
- [[AGENTS|AGENTS.md]]: peta folder, aturan kerja, daftar periksa.

### 1. Fondasi Desain & Aturan Produksi
- [[docs/production-dna|Production DNA]]: Standar kualitas emas, hukum 9:16, hierarki visual, micro-interactions, spring physics.
- [[docs/visual-style|Visual Style Guide]]: Skema warna, kontras WCAG, tipografi Jepang (`FONT.jp`), zona aman (Safe Zone Y 200–1440 & Y 1470–1640).
- [[docs/production-workflow|Production Workflow]]: Siklus pembuatan video dari naskah/VO, storyboard, komposisi, hingga render.
- [[docs/naming-convention|Naming Convention]]: Standar penamaan file, aset, scene, dan komposisi.

### 2. Remotion & Shared Architecture (`src/shared/`)
- [[src/shared/theme.ts|Theme Tokens]]: Palet warna SevnQuest (`C.bg`, `C.gold`, `C.indigo`, dll.), typography (`FONT`), ukuran canvas (`1080x1920 @ 30fps`), dan safe zones.
- [[src/shared/anim.ts|Animation Primitives]]: Spring physics preset, interpolasi `pop()`, `prog()`, easing curves.
- [[src/shared/kit.tsx|Shared Kit]]: Komponen reusable (`SceneShell`, `MaskText`, `Avatar`, `Caption`, `Badge`, `Card`, `GlowOrb`, dll.).
- [[src/shared/assets.ts|Asset Registry]]: Referensi static files (`avatars`, `audio`, `brand`).
- [[docs/remotion-reference|Remotion Reference]]: Dokumentasi API, komponen visual, dan best practices Remotion.

### 3. Perpustakaan Aset (`public/`)
- [[docs/asset-system|Asset System Overview]]: Struktur `public/brand`, `public/avatars`, `public/audio`.
- [[docs/asset-migration|Asset Migration History]]: Riwayat pembersihan dan konsolidasi aset terpusat.
- **Avatar Catalog**: Tier 1–10 laki-laki & perempuan beserta ekspresi emosi (`neutral`, `smile`, `surprised`, `think`, `cry`, `angry`, `shocked`).

- **[[src/videos/mulai-dari-mana/MulaiDariManaVideo.tsx|Mulai Dari Mana]]**: Panduan komprehensif mulai belajar bahasa Jepang dari nol (3 Pilar: Huruf, Kosakata, Pola Kalimat). Render master: `out/renders/sevnquest-mulai-dari-mana.mp4`.
- **[[src/videos/sou/SouVideo.tsx|そう (Sou)]]**: Video penjelasan semantik perbedaan 3 arti そう (*begitu / kelihatannya / katanya*). Render master: `out/renders/sevnquest-sou.mp4`.
- **[[src/videos/houga-ii/HougaIiVideo.tsx|ほうがいい (Houga-ii)]]**: Pola kalimat saran & nuansa perbandingannya.
- **[[src/videos/houga-ta/HougaTaVideo.tsx|たほうがいい (Houga-ta)]]**: Bentuk lampau dari ほうがいい.
- **[[src/videos/au/AuVideo.tsx|会う (Au)]]**: Kanji, arti, dan konteks penggunaan kata kerja `au`.
- **[[src/videos/teiru/TeIruVideo.tsx|ている (Te-iru)]]**: Aspek progresif vs keadaan dalam tata bahasa Jepang.
- **[[src/videos/kunyomi-onyomi/KunyomiOnyomiVideo.tsx|Kunyomi vs Onyomi]]**: Perbedaan cara baca Kanji.
- **[[src/videos/iphone/IPhoneVideo.tsx|iPhone]]**: Kasus kosakata teknologi dalam bahasa Jepang.
- **[[src/videos/shoku/ShokuVideo.tsx|食 (Shoku)]]**: Radikal dan keluarga kanji makanan.

---

## ⚡ Cara Menggunakan Memori Ini

### 🖥️ Di Obsidian
1. Buka aplikasi **Obsidian**.
2. Pilih **Open folder as vault** ➔ arahkan ke `C:\Users\user\Desktop\SevnQuest-Video`.
3. Tekan `Ctrl + G` (atau klik ikon Graph View di sidebar kiri) untuk melihat graf visual interaktif yang menghubungkan semua konsep, aturan, dan file proyek.

### 🤖 Di AI / Terminal (CodeGraph)
Repositori ini telah diindeks penuh menggunakan **CodeGraph**:
- **Status cek**: Jalankan `codegraph status` di terminal.
- **Pencarian relasi kode**: Jalankan `codegraph explore "<nama komponen/fungsi>"` (misal: `codegraph explore "SceneShell"` atau `codegraph explore "useCurrentFrame"`).
- **AI Integration**: AI assistant secara otomatis memanggil MCP tool `codegraph_explore` untuk menelusuri alur pemanggilan fungsi dan dependensi antarkomponen tanpa perlu manual grep.
