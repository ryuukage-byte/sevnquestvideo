# Remotion Technical Reference & Architecture

> **Technical Reference Guide for SevnQuest Remotion Video Generation**  
> Based on the audited production pipeline in `latest production.zip` (`@remotion/cli` 4.0.532).

---

## 1. Composition Structure

The production pipeline defines Compositions in `src/Root.tsx`:

```tsx
<Composition
  id="SevnQuestWriting2"
  component={SevnQuestWriting2}
  durationInFrames={1512} // 50.4s @ 30fps
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{
    captions: true,
    sfx: true,
    voiceover: true
  }}
/>
```

### Clean vs Production Pairs
Every video composition provides two variations:
1. `[CompositionName]`: Full production output with voiceover, sound effects, and kinetic subtitles.
2. `[CompositionName]Clean`: Renders without captions (`captions: false`) to allow manual subtitle burning, localized translation, or clean promo b-roll usage.

---

## 2. Scene & Virtual World Architecture

The audited codebase reveals two architectural approaches for organizing video timelines:

### Pattern A: Discrete Scene Sequences (`SevnQuestPromo.tsx`)
Used for 60-second narrative promos:
```text
Root Composition
  ├── Persistent Background
  └── Sequence[Scene01 ... Scene12]
        ├── SceneShell (Fades, Captions, Sfx triggers)
        └── Scene Components
```

### Pattern B: Continuous Virtual Canvas + Dynamic Camera (`SevnQuestWriting2.tsx`)
Used for in-depth feature demos (Writing Mode):
```text
Root Composition
  ├── Persistent Background
  ├── Virtual World Container (1090 × 2330 px)
  │     └── Transform: translate(540px, 790px) scale(cam.z) translate(-cam.cx, -cam.cy)
  │           └── WritingWorld (Interactive in-app UI mockup)
  ├── Camera Interpolator (camera.ts with keyframes + pen tracking)
  ├── Foreground Overlays (Hook, CobaTulis, CompareCard, Constellation, Finale)
  ├── Captions Layer
  └── Audio / SFX Trigger Matrix
```

---

## 3. Reusable Component Catalog

| Component | File Path | Props & Description | Migration Status |
| :--- | :--- | :--- | :--- |
| **`Background`** | `src/shared/components/Background.tsx` | Renders the persistent Malam Indigo radial gradient, animated drifting Sashiko grid, and floating kanji watermark glyphs. | **MIGRATE (Core)** |
| **`Surface`** | `src/shared/components/ui.tsx` | `tone` (`card`/`elevated`/`inset`), `radius`, `stitch` (boolean). Implements the skeuomorphic leather/paper card with dashed sashiko border and dual shadow. | **MIGRATE (Core)** |
| **`PhysicalButton`**| `src/shared/components/ui.tsx` | `label`, `tone` (`indigo`/`green`/`gold`/`red`/`ghost`), `w`, `h`, `press` (0..1). 3D tactile button that depresses with realistic shadow shift. | **MIGRATE (Core)** |
| **`MaskText`** | `src/shared/components/MaskText.tsx` | `text`, `start`, `stagger`, `size`, `hl` (Record<string, color>), `outAt`. Kinetic typography popping words from an overflow mask with keyword highlighting. | **MIGRATE (Core)** |
| **`KanjiStroke`** | `src/shared/components/KanjiStroke.tsx` | `size`, `progress` (0..1), `color`, `guide`. Renders and animates SVG stroke medians with clip-path masks from HanziWriter JSON data. | **MIGRATE (Core)** |
| **`KanjiInk`** | `src/writing2/Ink.tsx` | Advanced stroke animator supporting live pen cursor, glowing particle trail, animated stroke order badges, and ghost watermark outline. | **MIGRATE (Core)** |
| **`RollingNumber`**| `src/shared/components/RollingNumber.tsx`| `value`, `digits`, `size`, `color`, `font`. Mechanical odometer roller where high-order digits only roll when lower digits wrap. | **MIGRATE (Core)** |
| **`Confetti`** | `src/shared/components/Confetti.tsx` | `x`, `y`, `t` (0..1), `n`, `seed`, `spread`. Deterministic celebration particles using `random(seed)`. | **MIGRATE (Core)** |
| **`LogoMark`** & **`Wordmark`** | `src/shared/components/Logo.tsx` | `size`, `glow`. Official brand logo and Cinzel/Gold gradient text lockup. | **MIGRATE (Core)** |
| **`Pagoda`** | `src/shared/components/Logo.tsx` | `size`, `glow`. 5-tier Japanese pagoda vector graphic with gold roofs. | **MIGRATE (Core)** |
| **`Captions`** | `src/writing2/Caption2.tsx` | Audio-synchronized subtitle box with word-by-word reveal and keyword gold highlighting. | **MIGRATE (Core)** |
| **`Sfx`** | `src/shared/components/Sfx.tsx` | `name`, `at` (frame), `volume`. Trigger sound effect playback at exact frames without layout shift. | **MIGRATE (Core)** |

---

## 4. Animation Utilities (`anim.ts`)

```typescript
import {Easing, interpolate, spring} from 'remotion';

// Cubic out easing for natural deceleration
export const EASE = Easing.bezier(0.22, 1, 0.36, 1);
// Smooth S-curve for camera motions and pans
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);
// Punchy acceleration for impacts
export const EASE_IN = Easing.bezier(0.55, 0, 0.9, 0.45);

// Normalized progress helper with clamping
export const prog = (
  f: number,
  start: number,
  dur: number,
  easing: (t: number) => number = EASE
) =>
  interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

// Standard Spring presets
export const SPRING = {damping: 17, stiffness: 140, mass: 0.85}; // Standard UI
export const SOFT = {damping: 22, stiffness: 90, mass: 1};       // Floats / Cards
export const BOUNCY = {damping: 9, stiffness: 180, mass: 0.7};    // Badges / Celebrations

// Spring pop helper starting at specific delay
export const pop = (f: number, fps: number, delay = 0, config = SPRING) =>
  f < delay ? 0 : spring({frame: f - delay, fps, config});
```

---

## 5. Deterministic Font Preloading (`fonts.ts`)

To avoid font layout shifts or unstyled font flashes during headless rendering, fonts are bundled locally in `public/fonts/` and loaded via native `FontFace` wrapped in Remotion's `delayRender` and `continueRender`:

```typescript
import {continueRender, delayRender, staticFile} from 'remotion';

export const ensureFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Memuat font SevnQuest');
  Promise.all(
    FILES.map(async ([family, weight, file]) => {
      const face = new FontFace(family, `url(${staticFile('fonts/' + file)}) format('woff2')`, {
        weight: String(weight),
      });
      await face.load();
      document.fonts.add(face);
    })
  ).finally(() => continueRender(handle));
};
```

---

## 6. Procedural SFX Generation (`scripts/make_sfx.py`)

Rather than hunting for random royalty-free audio files with inconsistent volume levels, all 16 sound effects are procedurally generated in Python using `wave` and `numpy`:
- Pure mathematical envelopes: attack, decay, frequency sweeps, low-pass filtered noise, and harmonic sines.
- Guarantees 100% royalty-free, consistent 44.1kHz mono WAV files.

---

## 7. Render Configuration & CLI Presets

From `package.json` scripts:
```bash
# Production render with high quality CRF 16-18
remotion render SevnQuestWriting2 out/sevnquest-writing2.mp4 --codec=h264 --crf=18

# Clean render without subtitles
remotion render SevnQuestWriting2Clean out/sevnquest-writing2-clean.mp4 --codec=h264 --crf=18

# Fast thumbnail capture at target frame
remotion still SevnQuestPromoClean out/thumbnail.png --frame=1475
```
