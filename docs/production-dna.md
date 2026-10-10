# SevnQuest Production DNA

> **Catatan:** dokumen ini latar belakang historis. Gaya baku yang berlaku ada di [SEVNQUEST.md](../SEVNQUEST.md); bila bertentangan (mis. pil label, susunan CTA), SEVNQUEST.md yang dipakai.

> **The Living Visual and Motion Identity of SevnQuest Videos**  
> Derived directly from the reverse-engineered `latest production` system (Remotion 4.0.532, 1080×1920 @ 30fps).

---

## 1. Visual Identity

SevnQuest videos possess a distinct, high-end aesthetic termed **"Washi Scroll — Malam Indigo"**:
- **Tactile Skeuomorphism**: UI elements have physical depth, bevels, multiple layered shadows, and stitched borders rather than flat, sterile minimalism.
- **Atmospheric Depth**: A persistent indigo paper world lies underneath every scene. Japanese kanji watermark glyphs drift subtly in 3D space with gentle sinusoidal motion.
- **Pedagogical Clarity**: High information density is balanced by strict visual hierarchy, instant color coding for learning domains, and kinetic emphasis on keywords.
- **Authentic Japanese Craftsmanship**: Japanese calligraphy strokes are animated stroke-by-stroke (*kakijun*), accompanied by Japanese ink stamps (*hanko*), pagoda towers, and sashiko thread borders.

---

## 2. Color System

Extracted directly from production tokens (`src/shared/theme.ts` & `src/writing2/theme.ts`):

### Core Palette
- **Canvas Base (`C.bg`)**: `#12151d` (Deep Malam Indigo)
- **Deepest Void (`C.bgDeep`)**: `#0b0d13`
- **Card Surface (`C.card`)**: `#1f242f`
- **Elevated Surfaces (`C.elevated`)**: `#2a3040`
- **Inset / Recessed Wells (`C.inset`)**: `#191d26`
- **Primary Indigo (`C.indigoDeep` / `C.indigo`)**: `#26314a` / `#6f93cf`
- **Soft Indigo Accent (`C.indigoSoft`)**: `#97b5e0`
- **Sashiko Thread Motif (`C.thread`)**: `rgba(151,181,224,0.35)`

### Accents & State
- **Kinako Gold (`C.gold`)**: `#f0be52` (Milestones, active recall timers, furigana, emphasis)
- **Soft Gold Highlight (`C.goldSoft`)**: `#fde8a8`
- **Gold Shadow / Border (`C.goldShadow`)**: `#8c6810`
- **Hanko Red (`C.hanko`)**: `#e2555b` (Errors, critical attention, stamps, Kanji pillar)
- **Hanko Deep (`C.hankoDeep`)**: `#8a3438`
- **Matcha Green (`C.matcha`)**: `#4fae86` (Success, Kana pillar, speed improvements)
- **Matcha Deep (`C.matchaDeep`)**: `#2c7757`
- **Fuji Purple (`C.fuji`)**: `#9b65c9` (Choukai / Quiz pillar)
- **Teal (`C.teal`)**: `#26a69a` (Dokkai / Reading pillar)

### Typography Tones
- **Primary Text (`C.text`)**: `#edf0f6`
- **Secondary Text (`C.textSecondary`)**: `#9ba4b8`
- **Muted Text (`C.textMuted` / `UI.muted`)**: `#737e96` / `#8d96ab`

---

## 3. Typography

Fonts are bundled locally as `.woff2` files loaded deterministically via `FontFace` + `delayRender`:

| Category | Family | Weights Used | Role |
| :--- | :--- | :--- | :--- |
| **Body** | `Plus Jakarta Sans`, `Noto Sans` | 500, 600, 700, 800 | Explanatory copy, translations, UI labels |
| **Japanese** | `Noto Serif JP`, `Noto Sans JP` | 700, 900 | Kanji cards, Furigana, calligraphy strokes, watermarks |
| **Fantasy / Logo** | `Cinzel`, `Noto Serif JP Latin` | 700, 900 | "SEVNQUEST" brand title, pagoda headers, chapter titles |
| **Display / Kinetic** | `Bricolage Grotesque` | 700, 800 | Kinetic title words, question headers, big numbers |
| **Monospace** | `JetBrains Mono` | 600, 700, 800 | Timers (`04.28s`), stroke counters (`13/13`), status pills |
| **Handwritten** | `Caveat` | 600, 700 | Casual annotations (*"oh, ini は!"*, sticky notes) |

---

## 4. Layout System

Production videos operate strictly in vertical **9:16 format (1080 × 1920 px at 30 fps)**.

### Safe Zones (`SAFE`)
- **Top Safe Area**: `top: 200px` (clears TikTok/Shorts top headers, status icons)
- **Main Action Zone**: `top: 250px` to `top: 1450px`
- **Caption Zone**: `top: 1470px` – `1520px`
- **Bottom Safe Area**: `bottom: 1640px` (keeps interactive elements above TikTok description, audio reels, and engagement buttons)

---

## 5. Japanese Typography

- **Furigana / Ruby**: Always positioned directly above the kanji root using semantic `<ruby>{kanji}<rt>{furigana}</rt></ruby>`.
- **Furigana Styling**: Kinako Gold (`#f0be52`), font size 24px, letter-spacing 1px.
- **Stroke Display**: Kanji glyphs in active write mode must never be treated as static text; they are rendered as SVG path segments with animated medians and stroke outlines (*HanziWriter* data).
- **Watermark Mode**: Faint soft indigo silhouette (`rgba(143,170,225, 0.22)`) allowing learners to trace without losing guidance.

---

## 6. Character Presentation

- **Avatars**: Authentic 10-tier progression avatars (`public/avatars/tier-1.png` to `tier-10.png`).
- **Tier Escalation**: Tier-1 (Minarai / Apprentice) through Tier-10 (Kami / Legend).
- **Motion**: Characters bob subtly with sinusoidal float (`Math.sin(f / 9 + i * 0.7) * 4`), scaling up with spring bounces on level-ups.
- **Drop Shadows**: Deep ambient drop shadows (`filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.55))'`) anchor avatars to the UI plane.

---

## 7. UI Language

- **Surface Panels (`Surface`)**:
  - Border radius 36px–54px.
  - Linear vertical gradient: `#232937` to `#1f242f`.
  - Inner sashiko dashed border: `border: 2px dashed rgba(151,181,224,0.35)`, opacity 0.45, inset 12px–14px.
  - Dual box shadow: `8px 10px 24px rgba(0,0,0,0.5), -4px -4px 14px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`.
- **Tactile Buttons (`PhysicalButton`)**:
  - 3D extruded buttons with distinct 10px edge depth.
  - When pressed (`press: 0..1`), translateY shifts down by `dy = press * 8px` while the bottom edge shadow compresses, simulating a real physical switch.
- **Japanese Stamps (`Stamp`)**:
  - Rotated -8° with double border ring and radial glow (`C.hanko` or `C.gold`).
- **Status Pills (`Pill`)**:
  - Compact rounded pills (height 56px–77px) with `JetBrains Mono` text and colored status borders.

---

## 8. Motion Language

All animations use deterministic frame-based calculations:

### Springs
- **Standard UI Pop (`SPRING`)**: `{damping: 17, stiffness: 140, mass: 0.85}` — quick entry with subtle natural settle.
- **Soft Ambient Float (`SOFT`)**: `{damping: 22, stiffness: 90, mass: 1}` — relaxed cards and modal transitions.
- **Punchy Celebration (`BOUNCY`)**: `{damping: 9, stiffness: 180, mass: 0.7}` — badges, exclamation marks, question marks, and CTA buttons.

### Bezier Easings
- **Exit / Settle Easing (`EASE`)**: `Easing.bezier(0.22, 1, 0.36, 1)` (cubic-out deceleration).
- **Camera Pan / In-Out (`EASE_IO`)**: `Easing.bezier(0.65, 0, 0.35, 1)` (smooth cinematic transitions).
- **Acceleration (`EASE_IN`)**: `Easing.bezier(0.55, 0, 0.9, 0.45)`.

---

## 9. Transition Language

- **Camera Navigation (`camera.ts`)**: Rather than hard cuts between slides, the camera moves smoothly across a unified virtual world (`WritingWorld` 1090×2330 px). The camera pans (`cx`, `cy`) and zooms (`z: 0.55` to `1.32`) to follow user attention.
- **Pen Tracking**: The virtual camera automatically offsets slightly towards the moving pen tip (`camAt(f)`), creating an immersive drawing feeling.
- **Scene Opacity & Flash**: Fast 7-frame linear cross-fades; dramatic reveals use a subtle 4-frame golden radial flash (`rgba(255,236,190, 0.42)`).

---

## 10. Background Language

The background is a persistent, non-distracting visual anchor:
1. **Base Fill**: `#12151d`.
2. **Atmospheric Glow**: Radial gradient at top-center (`radial-gradient(120% 62% at 50% 16%, #1e2538 0%, #151a26 48%, #0d1017 100%)`).
3. **Animated Sashiko Grid**: 96×96 SVG pattern with a constant diagonal drift `(f * 0.18) % 96`.
4. **Watermark Glyphs**: Kanji characters (`日`, `食`, `学`, `道`, `言`, `塔`) floating with independent phase shifts at 4.5% opacity.
5. **Peripheral Vignette**: Radial gradient darkening edges to 55% black.

---

## 11. Particle & FX Language

- **Confetti Explosion (`Confetti`)**: Seeded, deterministic particle physics (`random(seed)`). Particles explode upward in a fan and fall with gravity `900 * t * t`, spinning along random axes in brand colors.
- **Calligraphy Ink Trail**: Golden circular dots (`#f0be52`) trailing behind the pen cursor with decaying radius and opacity.
- **Red Error Shockwave**: When an incorrect stroke is attempted, the canvas border flashes red (`UI.red`), vibrates with high-frequency sine shake (`Math.sin(f * 2.6) * 9`), and pops an `"URUTAN SALAH"` tag.

---

## 12. RPG Elements

- **Active Recall HUD**: Floating pill displaying the writing mode badge alongside a live millisecond stopwatch (`fmtTimer`).
- **Experience & Odometer (`RollingNumber`)**: Numbers do not simply change text; digits roll vertically like mechanical odometers.
- **Tower Progression**: Pagoda climbing motif representing levels from Floor 001 ("Gerbang Pertama") to Floor 100 ("Boss: 墨の守護者").
- **Node Constellation**: Network graph showing how learning Kanji branches into Kakijun, Yomikata, Makna, and Example Sentences.

---

## 13. CTA Language

Final 3–5 seconds of the video:
1. **Brand Lockup**: Golden Pagoda / LogoMark pops with expanding shockwave ring and drop shadow.
2. **Kinetic Masked Wordmark**: "SEVN" in crisp white, "QUEST" in gold gradient with gold glow.
3. **Call-to-Action MaskText**: *"Coba sekarang di SevnQuest."* (staggered 3 frames per word, `SEVNQUEST` highlighted in gold).
4. **Physical Gold Button**: *"COBA SEKARANG"* with right chevron, simulating a tactile click press.
5. **Clear URL**: `www.sevnsoul.site` in `JetBrains Mono 700`, with helper text *"lalu pilih Learn"*.
6. **Avatar Lineup**: Tier 1 to Tier 10 avatars popping sequentially from left to right along the bottom baseline (*"MINARAI → KAMI"*).

---

## 14. Video Pacing & Rhythm

Based on the proven 50-second production structure:
- **0.0s – 3.8s (Hook)**: Problem statement (e.g. repeated reading without writing), counter spinning, jarring question mark.
- **3.8s – 5.1s (Call to Action / Pivot)**: Punchy statement (*"Coba tulis"*), pen icon slam, gold ink slash.
- **5.1s – 21.0s (Live Interactive Demonstration)**: Real-time writing, stroke animation, watermark toggle, error correction.
- **21.0s – 26.5s (Data / Metric Proof)**: Stopwatch comparison card showing empirical time improvement (e.g. 11% faster).
- **26.5s – 37.0s (Value Multiplier)**: Showing simultaneous vocabulary + kanji context (*"oh, ini は-nya はがき"*).
- **37.0s – 43.5s (Payoff & Morph)**: Modal expands smoothly revealing complete vocabulary details, components, and sentence.
- **43.5s – 47.5s (Conceptual Synthesis)**: Constellation graph connecting isolated kanji into rich language mastery.
- **47.5s – 50.4s (Brand Outro & CTA)**: Logo reveal, tactile CTA button press, avatar tier parade.

---

## 15. Audio & SFX Design

16 procedural, high-precision sound effects synchronized to exact animation frames:
- `tick`: Mechanical counter step (volume 0.32).
- `click`: Tactile button depression (volume 0.65–0.80).
- `pop`: Pill, badge, or card entry (volume 0.45).
- `ding`: Correct response / achievement (volume 0.55).
- `error` / `buzz`: Stroke mistake / false confidence (volume 0.50–0.70).
- `stroke`: Textured brush glide on paper during writing (volume 0.28).
- `whoosh`: Camera pan / rapid scene sweep (volume 0.45).
- `sparkle` / `chime`: Level-up, gold milestone, or logo reveal (volume 0.45–0.70).
- `impact` / `thud`: Heavy statement or logo slam (volume 0.50–0.90).

---

## 16. Things To Avoid

1. **NO Flat Monochromatic Backgrounds**: Never use pure solid `#000000` or `#12151d` without the Sashiko pattern and atmospheric gradient.
2. **NO Generic System Fonts**: Never fall back to unstyled browser fonts (Arial, Times New Roman). Always load the bundled typography suite.
3. **NO Hard Cuts Between Sub-steps**: Use smooth camera translation (`camera.ts`) and modal morphing instead of jarring slide cuts.
4. **NO Raw Japanese Kanji Without Furigana**: In tutorial or promo contexts, Japanese sentences must provide furigana in Kinako Gold.
5. **NO Unanchored Floating Text**: Text must either be kinetic masked (`MaskText`), seated on a tactile `Surface`, or styled as a `Pill` / `Stamp`.
6. **NO Artificial / Disconnected Colors**: Stick strictly to the established pillar colors; do not invent random neon purples, blues, or yellows.
