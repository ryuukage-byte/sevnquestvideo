# SevnQuest Visual Style Guide

> **Catatan:** dokumen ini latar belakang historis. Gaya baku yang berlaku ada di [SEVNQUEST.md](../SEVNQUEST.md); bila bertentangan (mis. pil label, susunan CTA), SEVNQUEST.md yang dipakai.

## Overview

This guide records the **established visual identity** of SevnQuest (Nihongo Quest). All video assets, compositions, UI cards, and motion graphics should align with these established aesthetic pillars, verified against the working Remotion production codebase (`latest production`).

Do not invent arbitrary new brand guidelines; preserve the authentic gamified Japanese learning experience documented below.

---

## 1. Aesthetic Theme: Fantasy Washi Scroll & Tactile RPG UI

The visual identity combines **traditional Japanese artisan motifs** with a **tactile fantasy RPG interface**:

- **Dark Mode Concept ("Malam Indigo di atas Kertas Washi")**: Deep indigo/obsidian nighttime atmosphere (`#12151d` base) reminiscent of Japanese washi parchment steeped in natural indigo (*Aizome*).
- **Persistent Backdrop Atmosphere**:
  - Radial gradient: `radial-gradient(120% 62% at 50% 16%, #1e2538 0%, #151a26 48%, #0d1017 100%)`.
  - Animated drifting Sashiko grid: 96×96 SVG dashed grid pattern (`strokeWidth=2`, `dasharray="12 10"`, `strokeOpacity=0.1`) with frame drift `(f * 0.18) % 96`.
  - Floating Japanese watermark kanji (`日`, `食`, `学`, `道`, `言`, `塔`) floating with gentle sinusoidal drift at 4.5% opacity.
  - Peripheral vignette: `radial-gradient(90% 70% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)`.
- **Light Mode Concept ("Siang Hangat di atas Kertas Washi")**: Warm cream/washi parchment tones (`#eae7de`).
- **Tactile UI Depth**: Leather-bound edges, skeuomorphic surface depth, subtle dual shadows, and traditional stitch borders (*Sashiko* thread motif).
- **Legibility for Video**: High-contrast text surfaces, clean typographic hierarchy, and bold iconography suitable for mobile screens (9:16 vertical video).

---

## 2. Established Learning Category Pillars

In SevnQuest, learning subjects are strictly color-coded to maintain instant recognition across cards, badges, and video titles:

| Pillar | Color Name | Hex Code | Visual Meaning / Usage |
| :--- | :--- | :--- | :--- |
| **Kana** | Matcha Green | `#4fae86` | Hiragana and Katakana foundational writing |
| **Kanji** | Hanko Red | `#e2555b` | Chinese characters, radicals, stroke orders |
| **Kotoba** | Aizome Indigo | `#6f93cf` | Vocabulary words, meanings, collocations |
| **Bunpou** | Kinako Gold | `#d9a54a` | Grammar patterns, sentence formulas, particles |
| **Choukai** | Fuji Purple | `#9b65c9` | Listening comprehension, dialogues, quiz challenges |
| **Dokkai** | Teal | `#26a69a` | Reading passages and story comprehension |

---

## 3. Surface & Hierarchy Palette (Dark Mode Primary)

Video cards, overlays, HUD panels, and banners build upon layered surface tiers:

| Tier | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Canvas Base (`C.bg`)** | `#12151d` | Canvas backdrop, deep page tone |
| **Deep Void (`C.bgDeep`)** | `#0b0d13` | Recessed modal dimming, background depths |
| **Surface Card (`C.card`)** | `#1f242f` | Content cards, question containers, main dialogue box |
| **Surface Elevated (`C.elevated`)** | `#2a3040` | Floating buttons, active state panels, highlighted chips |
| **Surface Inset (`C.inset`)** | `#191d26` | Input fields, recessed counters, shadow frames |

### Shadow Tokens
- **`SHADOW_CARD`**: `8px 10px 24px rgba(0,0,0,0.5), -4px -4px 14px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`
- **`SHADOW_INSET`**: `inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.04)`

---

## 4. Accent & Brand Colors

- **Kinako Gold (`#f0be52` / `#fde8a8`)**: Reserved exclusively for high-value events:
  - XP gains, level-ups, currency, milestones, active recall timers, furigana highlights.
- **Hanko Red (`#8a3438` / `#e2555b`)**: Traditional Japanese red ink stamp styling:
  - Critical states, alert banners, Kanji badges, incorrect answer shockwaves, and hanko seals.
- **Indigo Deep (`#26314a`) & Aizome (`#6f93cf`)**:
  - Primary RPG buttons, navigation accents, and header banners.
- **Sashiko Thread Motif (`rgba(151, 181, 224, 0.35)`)**:
  - Delicate dashed/stitched borders separating card tiers and header banners.

---

## 5. Typography Hierarchy

The production pipeline utilizes a dedicated local typography suite (bundled as offline `.woff2` files):

| Style Key | Font Family | Role & Usage |
| :--- | :--- | :--- |
| **`FONT.body`** | `"Plus Jakarta Sans", "Noto Sans", sans-serif` | Explanations, translations, UI controls |
| **`FONT.jp`** | `"Noto Serif JP", serif` | High-impact Kanji cards, calligraphy, Furigana |
| **`FONT.display`**| `"Bricolage Grotesque", sans-serif` | Kinetic titles, impact headings, question headers |
| **`FONT.fantasy`**| `"Cinzel", Georgia, serif` | "SEVNQUEST" wordmark, chapter titles, tower names |
| **`FONT.mono`** | `"JetBrains Mono", monospace` | Timers (`00:04.28`), counters (`13/13`), status pills |
| **`FONT.hand`** | `"Caveat", cursive` | Handwritten callouts, sticky notes (*"oh, ini は!"*) |

- **Furigana**: Always styled in Kinako Gold (`#f0be52`) above Kanji glyphs (`fontSize: 24px`, `fontWeight: 700`, `letterSpacing: 1px`).

---

## 6. Motion & Visual Effects Direction

- **Spring Dynamics**:
  - `SPRING` (`damping: 17, stiffness: 140, mass: 0.85`): Standard UI card entries.
  - `SOFT` (`damping: 22, stiffness: 90, mass: 1`): Floating elements, smooth modal morphs.
  - `BOUNCY` (`damping: 9, stiffness: 180, mass: 0.7`): Pop-ups, stamps, badges, question marks.
- **Easing**:
  - `EASE` (`cubic-bezier(0.22, 1, 0.36, 1)`): Smooth natural exit / deceleration.
  - `EASE_IO` (`cubic-bezier(0.65, 0, 0.35, 1)`): Cinematic camera movements and pans.
- **Tactile Buttons**: Physical 3D button press with 10px depth shift and shadow compression.
- **Calligraphy Ink**: Dynamic SVG stroke animation with glowing particle trail and animated stroke order badges.
