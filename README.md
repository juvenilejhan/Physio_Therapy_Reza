# BAHIR

Marketing site for the **Bangladesh Academy of Health Innovation & Research** — a
physiotherapy academy. React 19 + Vite, nine routes, no backend.

```bash
npm install
npm run dev       # dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero, stats, featured courses, prospectus CTA |
| `/about` | Mission, values, advantages, vision, testimonials |
| `/courses` | Programme catalogue with category filter, admission steps |
| `/faculty` | Faculty profiles, research pillars |
| `/media` | News, events, newsletter |
| `/contact` | Enquiry form, contact details, departments, FAQ |
| `/privacy`, `/terms`, `/cookies` | Legal |
| `*` | 404 |

## Structure

```text
src/
  styles/
    variables.css   design tokens — the ONLY place colour is defined
    global.css      reset, container, buttons, focus, form status, utilities
    animations.css  keyframes, scroll-reveal, reduced-motion overrides
  components/       one folder per component: Component.jsx + Component.css
  pages/            route-level composition only — no styling
  data/             content as plain JS objects
  hooks/            useTheme, useScrollReveal, useScrollPosition,
                    useAnimatedCounter, useFormSubmit, usePageMeta
```

## Conventions

**Colour lives in `variables.css`.** Components reference tokens, never raw hex.
The sanctioned exception is `src/data/gradients.js`, which holds card and avatar
gradients — those render as inline `style` on data-driven elements and so cannot
reference custom properties.

### Two palettes, one rule

The site runs a **hybrid** identity, and the split is load-bearing:

| | tokens | used for |
|---|---|---|
| **Interface** | `--primary` `--secondary` `--accent` (blue/teal) | anything the user **operates** — buttons, links, focus rings, form validation, filter chips, carousel controls |
| **Brand** | `--brand-maroon` `--brand-gold` `--brand-green` (from the crest) | brand **furniture** — section tags, the hero kicker, footer surface, the CTA panel, card gradients, the crest lockup |

**Never a maroon button. Never a blue section tag.** Blur that line and the two
palettes stop reading as a system and start reading as an accident.

Two deliberate exceptions, both commented in place:

- The **hero floating panel** keeps blue accents — it overlays the blue/teal DNA
  photograph, so blue harmonises there where maroon would fight it.
- **`src/data/gradients.js` excludes gold.** Those surfaces carry white icons and
  white avatar initials, and white on `#c8a45c` is 2.35:1. Every stop in that
  ramp is deliberately dark.

Raw crest colours **cannot be used as text** — maroon is 1.10:1 on a dark card,
gold 2.35:1 on white. Use the `--brand-*-text` variants, which are derived per
theme and all clear 4.5:1.

**`--accent` vs `--accent-text`.** `--accent` (`#38bdf8`) is for decorative
fills, borders and large icons. Small text uses `--accent-text`, which resolves
lighter on dark and *darker* on light so both clear 4.5:1. Using `--accent` for
body-size text fails contrast in the light theme.

**`--on-accent`** is the ink for text on an accent or brand fill. Never white —
white on `--accent-light` is 1.67:1.

**Surfaces dark in both themes** (`.footer`, `.hero`, `.cta`) deliberately pin
their own colours instead of inheriting the theme ramp, and are commented as
such. This is load-bearing: the hero's scrim once ended on `var(--dark-navy)`,
which the light theme redefines to `#f8fafc`, rendering white-on-white text at
1.0:1. **Never put a theme token in a scrim over a fixed-dark surface.**

**Breakpoints** are 400 / 480 / 768 / 1024 / 1280 (see `variables.css`). Don't
introduce others. The nav collapses to its drawer at 1024.

**Grids use `auto-fill`, not `auto-fit`,** wherever the item count varies.
`auto-fit` collapses empty tracks, which stretched a single filtered course card
across the full grid width.

**Theme.** An inline script in `index.html` resolves `data-theme` before first
paint; `useTheme` reads it back and owns toggles. Don't move initial resolution
into React — that reintroduces the flash.

**Motion.** Everything decorative is gated behind `prefers-reduced-motion`.
Scroll-reveal styles are additionally gated behind `.js-enabled` (set in
`main.jsx`) so content is never invisible if JS fails.

**Focus.** `global.css` defines one `:focus-visible` ring. Never add
`outline: none` without a replacement indicator.

**Every control must do something.** No `<button>` without a handler, no link
resolving to the page it sits on. Faculty socials and news "Read Full Story"
were removed rather than left inert — there are no profiles or articles behind
them. Restore as real `<a href>` when those exist.

## Forms

Three forms (contact enquiry, prospectus CTA, newsletter) share
`hooks/useFormSubmit.js` and `components/FormField`. They validate client-side,
show a submitting state, and confirm on success.

**There is no backend.** `onSubmit` is a simulated delay, and every success
message says the enquiry was **recorded**, not *sent*, and points at a real
mailto. Do not reword that to imply delivery. To make them live, replace
`onSubmit` with a real `fetch` — nothing else needs to change.

## Images

Photographs are opt-in per item. Every image slot falls back to a brand gradient
plus an icon, so the site looks finished with no photos at all — that fallback is
a design, not a placeholder.

**To add a photo:**

1. Drop the original (any size, don't pre-compress) into
   `assets-src/<category>/`. Categories: `hero`, `faculty`, `courses`,
   `facilities`, `news`, `events`.
2. Run `python scripts/optimise-images.py`.
3. Reference it by **base name** — no extension, no size suffix:

```js
// src/data/courses.js
{ image: 'courses/musculoskeletal',   // assets-src/courses/musculoskeletal.jpg
  imageAlt: '',                       // optional, see below
  gradient: gradients.maroon,         // still the fallback
  icon: 'fas fa-bone' }
```

Components never name a file. `src/utils/imageSrc.js` builds the `srcset`, so
changing tiers is a script change only.

### The script

`scripts/optimise-images.py` (PIL — no npm dependency, same approach as
`build-logo-assets.py`) centre-crops to the category ratio and emits size-capped
WebP. It also:

- **Refuses to upscale.** A tier larger than the source is skipped with a
  message rather than producing a soft file. Minimum sizes are in
  `assets-src/README.md`.
- **Writes `src/utils/imageManifest.js`** recording which tiers actually exist.
  This is load-bearing: without it a `srcset` would advertise tiers the
  no-upscale rule skipped, the browser could pick a 404, and the whole `<img>`
  would fail — silently dropping the photo to the gradient.
- **Writes `src/styles/hero-image.css`**, which `Hero.css` consumes as
  `var(--hero-image)`. The indirection means `Hero.css` never names a tier that
  might not have been generated. Removing the hero source resets this file.
- Skips unchanged sources by mtime. `--force` rebuilds everything.

Both generated files are committed and must not be hand-edited.

### Alt text

`imageAlt` defaults to `''` — **decorative**. A card image sitting beside its own
title, or a portrait beside the person's name, is decorative; describing it again
just makes screen readers announce the same thing twice. Set `imageAlt` only when
the image carries information the surrounding text doesn't.

### Faculty and testimonial portraits

These entries name real individuals. Use a genuine photograph of that person,
with their permission — **never stock photography**, which would fabricate a
real person. With no `image`, `components/Avatar` shows their initials on a brand
gradient, and that is a legitimate final state rather than something to fill in.

### Events

Event cards are the one conditional case: with no `image` the card keeps its
original horizontal date-beside-content layout. The banner and overlaid date chip
only appear once a photo exists, so adding images to *some* events and not others
is fine.

## Known follow-ups

- **`public/assets/hero_bg.jpg` is 792 KB** and is the LCP element. It's
  preloaded, but only 1376×768 — it should be re-encoded to WebP/AVIF, under
  200 KB. Left alone deliberately: re-encoding a binary is a decision, not a
  cleanup.
- **Font Awesome loads the full CDN stylesheet** (~100 KB, render-blocking,
  third-party SPOF) for roughly 30 glyphs. Worth replacing with a local subset
  sprite, but it touches every component.
- **Card imagery.** `components/CardMedia` already renders `<img>` with lazy
  loading and a gradient fallback. Add photography by setting `image` and
  `imageAlt` on entries in `src/data/*.js` — no component changes needed.
- **Legal copy is placeholder** and has not been reviewed by a lawyer.
- **`robots.txt` / `sitemap.xml`** contain a placeholder host — update before
  launch.
