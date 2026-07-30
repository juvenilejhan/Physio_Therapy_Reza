# Image sources

Drop your **original, full-size photographs** in the folder for their section.
Any common format works (JPEG, PNG, WebP, HEIC-converted). Don't pre-resize or
pre-compress — the script does that, and starting from the largest original you
have gives the best result.

```bash
python scripts/optimise-images.py
```

That reads everything here and writes size-capped WebP into
`public/assets/<category>/`. Re-running is cheap: unchanged files are skipped.

**Nothing in this folder is served.** Only the generated files in `public/` ship.

## Naming

The filename becomes the reference used in `src/data/*.js`. Use lowercase and
hyphens, no spaces:

| you add | you reference |
|---|---|
| `assets-src/courses/musculoskeletal.jpg` | `image: 'courses/musculoskeletal'` |
| `assets-src/faculty/rahman.png` | `image: 'faculty/rahman'` |

No extension, no size suffix — the component builds the `srcset` itself.

## What each folder is for

| folder | used by | crop | widths |
|---|---|---|---|
| `hero/` | the homepage hero background | 16∶9 | 1600 / 2400 / 3200 + JPEG fallback |
| `faculty/` | faculty portraits (circular) | 1∶1 | 320 / 640 |
| `courses/` | course card headers | 16∶10 | 400 / 800 |
| `facilities/` | About section facility cards | 16∶9 | 400 / 800 / 1200 |
| `news/` | news card headers | 16∶9 | 400 / 800 |
| `events/` | event card banners | 16∶9 | 400 / 800 |

Images are **centre-cropped** to the ratio above. If the subject isn't centred
in your original, crop it yourself first.

## Minimum sizes

The script **will not upscale** — it warns and skips a tier rather than emit a
blurry file. To get every tier, supply at least:

- `hero/` — 3200px wide
- `facilities/` — 1200px wide
- `courses/`, `news/`, `events/` — 800px wide
- `faculty/` — 640px square or larger

## Faculty and testimonial photographs

These slots name real people. **Use genuine photographs of those individuals,
with their permission** — never stock photography. If you don't have a photo for
someone, leave their `image` field out: the card falls back to their initials on
a brand gradient, which is a finished-looking design, not a placeholder.

## Committing originals

These files can be large. If the repo gets heavy, add `assets-src/` to
`.gitignore` — but note the trade-off: a fresh clone then can't regenerate
`public/assets/`, so keep the originals backed up somewhere.
