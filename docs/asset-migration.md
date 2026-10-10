> **Catatan struktur:** dokumen ini adalah audit historis. Path ssets/... di bawah adalah rencana lama dan sudah tidak dipakai; aset sekarang hanya ada di public/ (lihat [asset-system.md](asset-system.md)).

# Asset Migration & Production Audit Plan

> **Classification and Migration Strategy**  
> Audited from `latest production.zip` (`C:\Users\user\Desktop\SevnQuest-Production-Audit`).

---

## 1. Finished Videos Production Breakdown

The audit archive contained two finished, rendered MP4 video deliverables:
- `sevnquest-writing2.mp4` (with Indonesian subtitles and SFX, 16.9 MB)
- `sevnquest-writing2-clean.mp4` (clean visual track without subtitles, 16.4 MB)

### Video Specifications
- **Dimensions**: 1080 × 1920 (9:16 Vertical Video)
- **Framerate**: 30.0 fps
- **Total Duration**: 50.40 seconds (1512 frames)
- **Audio Codec**: AAC 320 kbps, 48 kHz stereo
- **Video Codec**: H.264 (AVC High @ L5.0, CRF 18)
- **Render Engine**: Remotion 4.0.532

### Repeatable Storytelling Structure (Writing Mode Promo)

| Timecode | Story Phase | Visual Elements & Animation | Pedagogical Narrative |
| :--- | :--- | :--- | :--- |
| **00:00 – 00:03.8** | **Hook (The Problem)** | Rapid repeating Kanji flashcard stack (`VocabCard`), drifting marquee `"読む / 繰り返す"`, mechanical spin counter (`BACA · ULANG ×15`), jarring red `"?"` pop. | *"Lu masih hafalin kotoba cuma dengan baca dan ngulang?"* |
| **00:03.8 – 00:05.1** | **The Pivot (Call to Action)** | Screen flashes dark, oversized calligraphy pen pops with bouncy spring, bold kinetic title *"Coba tulis."*, gold ink curve sweeps across screen. | *"Coba tulis."* |
| **00:05.1 – 00:10.5** | **Core Value (Active Recall)** | Camera enters the `WritingWorld` modal. Active Recall stopwatch starts ticking. Live calligraphy stroke animation (`葉`, 13 strokes) with glowing pen cursor and particle trail. | *"Karena salah satu cara buat bikin kotoba lebih nempel, itu adalah dengan bener-bener menggunakannya."* |
| **00:10.5 – 00:14.5** | **Stroke Order (Kakijun)** | Error vibration simulation: incorrect stroke triggers red glow, camera shake, and `"URUTAN SALAH"` tag. Numbered stroke badges pop sequentially (1..13). | *"Dan kalau yang lu tulis kanji, urutan goresannya juga nggak boleh asal."* |
| **00:14.5 – 00:18.0** | **Feature 1: Stroke Animation** | Pagoda/Logo reveal shockwave. Virtual finger taps `"Animasi"` button in UI, demonstrating automated calligraphy replay. | *"Di SevnQuest, lu bisa langsung lihat animasi kakijunnya."* |
| **00:18.0 – 00:21.0** | **Feature 2: Ghost Watermark** | Virtual finger taps `"Watermark ON"`. Faint blue guidance watermark appears underneath the canvas for struggling learners. | *"Atau nyalain watermark kalau lupa bentuk kanjinya."* |
| **00:21.0 – 00:26.5** | **Feature 3: Speed Tracking** | Stopwatch glows gold. Comparison card zooms in displaying Attempt 1 (4.28s) vs Attempt 2 (3.81s) with green badge `"-0.47s (11% lebih cepat)"`. | *"Ada timer juga, jadi lu bisa lihat perkembangan kecepatan nulis lu dari waktu ke waktu."* |
| **00:26.5 – 00:31.3** | **Feature 4: Simultaneous Context** | Writing modal reveals reading (`はがき`) and meaning (`Kartu pos`) directly above the canvas while writing continues. | *"Yang lebih menarik, sambil nulis, lu tetap bisa lihat hiragana dan artinya."* |
| **00:31.3 – 00:36.7** | **The "Aha!" Moment** | Handwritten annotation *"oh, ini は!"* drops with dashed pointer connecting the Kanji slot to the Hiragana header. Second Kanji (`書`) writes in real time. | *"Jadi misalnya lu lagi nulis hagaki, oh, ini は-nya はがき."* |
| **00:36.7 – 00:43.3** | **Payoff & Detail Reveal** | Virtual finger presses `"Selesai"`. 46-particle confetti burst. Writing canvas morphs into comprehensive Vocabulary Detail view (definition, Japanese dictionary nuance, radical components, and example sentence with Furigana). | *"Setelah selesai, lu juga langsung dapat penjelasan lengkap. Makna, komponen kanji, sampai contoh kalimat."* |
| **00:43.3 – 00:47.5** | **Synthesis (Mind Map)** | Isolated "Cuma nulis" crossed out with red slash. Constellation network expands connecting Kakijun, Menulis, Yomikata, Makna, and Example Sentences. Hub flips from "KANJI" to "KOTOBA". | *"Jadi di sini, lu nggak cuma nulis kanji. Lu belajar kotobanya sekaligus."* |
| **00:47.5 – 00:50.4** | **Brand Outro & Final CTA** | Golden Pagoda and Wordmark reveal. Tactile 3D button press on `"COBA SEKARANG"`. Domain `www.sevnsoul.site` displayed. 10-tier avatar parade pops across bottom screen (`MINARAI → KAMI`). | *"Coba sekarang di SevnQuest."* |

---

## 2. Asset Classification Matrix

### Category A: MIGRATE (High-Value Reusable Assets)
These assets represent permanent SevnQuest identity and should be migrated to `C:\Users\user\Desktop\SevnQuest-Video\assets\`.

| Original Location in Archive | Target Location in SevnQuest-Video | Target Filename | Type | Purpose & Notes |
| :--- | :--- | :--- | :--- | :--- |
| `public/logo.png` | `assets/branding/logo/` | `brand_logo_mark_v01.png` | PNG (512×512) | Official SevnQuest silver compass icon |
| `public/avatars/tier-1.png` … `tier-10.png` | `assets/characters/main/` | `character_avatar_tier01_v01.png` … `tier10_v01.png` | PNG | 10 official player rank progression avatars |
| `public/fonts/*.woff2` (20 files) | `assets/branding/fonts/` | *(original woff2 filenames)* | WOFF2 | Complete brand font suite (Plus Jakarta, Noto Serif JP, Cinzel, Bricolage, etc.) |
| `public/sfx/*.wav` (16 files) | `assets/audio/sfx/` | `audio_sfx_[name]_v01.wav` | WAV (44.1kHz) | High-precision procedural UI & interaction SFX (`click`, `tick`, `pop`, `ding`, etc.) |
| `src/data/kanji_ha.json` | `assets/japanese/kanji/` | `data_kanji_ha_strokes_v01.json` | JSON | HanziWriter stroke and median vectors for `葉` |
| `src/data/kanji_hi.json` | `assets/japanese/kanji/` | `data_kanji_hi_strokes_v01.json` | JSON | HanziWriter stroke and median vectors for `日` |
| `src/data/kanji_sho.json` | `assets/japanese/kanji/` | `data_kanji_sho_strokes_v01.json` | JSON | HanziWriter stroke and median vectors for `書` |
| `scripts/make_sfx.py` | `references/style/` | `script_make_sfx.py` | Python Script | Procedural SFX synthesizer generator |

---

### Category B: KEEP IN AUDIT / ARCHIVE
These are project-specific files or generated artifacts that should remain in the audit archive and not clutter the root asset repository:
- `sevnquest-writing2.mp4` & `sevnquest-writing2-clean.mp4` (Saved in `projects/published/` or kept in audit archive as visual reference).
- `public/vo-writing2.wav` (Campaign-specific Indonesian voiceover track; keep in `references/audio/` or audit folder).
- `scripts/preview.mjs` & `scripts/shots.mjs` (Development-time CLI helpers).
- `package-lock.json` & root `tsconfig.json` of the old project.

---

### Category C: DUPLICATE DETECTION REPORT

During full cryptographic MD5 inspection across the audit folder, the following bit-for-bit duplicate files were detected:

| Duplicate Hash | File A (Obsolete / Redundant) | File B (Canonical Active) | Action |
| :--- | :--- | :--- | :--- |
| `92740E39F804...` | `src/writing/kakijun.ts` | `src/writing2/kakijun.ts` | Discard `writing/`, retain `writing2/` |
| `DE8A0C5CB4C2...` | `src/writing/Cards.tsx` | `src/writing2/Cards.tsx` | Discard `writing/`, retain `writing2/` |
| `DC7CC5A54792...` | `src/writing/Ink.tsx` | `src/writing2/Ink.tsx` | Discard `writing/`, retain `writing2/` |
| `20A685D279E0...` | `src/writing/theme.ts` | `src/writing2/theme.ts` | Discard `writing/`, retain `writing2/` |
| `93C8B1451794...` | `src/writing/icons.tsx` | `src/writing2/icons.tsx` | Discard `writing/`, retain `writing2/` |
| `[near-identical]` | `src/writing/camera.ts` | `src/writing2/camera.ts` | Discard `writing/`, retain `writing2/` |

**Root Cause**: `src/writing2/` was branched directly from `src/writing/` to synchronize with real Indonesian voiceover audio (`vo-writing2.wav`). `src/writing/` is an obsolete draft.

---

## 3. Migration Action Recommendations

1. **Step 1 (Asset Copy)**: Migrate the 10 tier avatars, 20 font files, 16 sound effects, logo, and kanji stroke datasets into their respective `SevnQuest-Video/assets/` folders following the standard naming convention.
2. **Step 2 (Reference Linking)**: Place the finished reference videos `sevnquest-writing2.mp4` into `references/visual/` or `projects/published/` as gold-standard visual benchmarks.
3. **Step 3 (Remotion Foundation)**: When Remotion is initialized in `SevnQuest-Video`, port the reusable component suite (`Background`, `Surface`, `PhysicalButton`, `MaskText`, `KanjiInk`, `RollingNumber`, `Confetti`, `Captions`, `LogoMark`) from `sevnquest-promo/src/components/` and `src/writing2/`.
