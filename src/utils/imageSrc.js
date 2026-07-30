import { imageManifest } from './imageManifest';

/**
 * Builds responsive image attributes from a base name.
 *
 * Data files reference an image by base name only — `'courses/musculoskeletal'`,
 * never a filename — so `scripts/optimise-images.py` owns the sizing and adding
 * a tier never means editing a component or a data file.
 *
 *   responsive('courses/msk', WIDTHS.courses)
 *   -> { src:    '/assets/courses/msk-800.webp',
 *        srcSet: '/assets/courses/msk-400.webp 400w, /assets/courses/msk-800.webp 800w' }
 *
 * These MUST stay in step with the SPECS table in the optimiser script.
 */
export const WIDTHS = {
  hero: [1600, 2400, 3200],
  faculty: [320, 640],
  courses: [400, 800],
  facilities: [400, 800, 1200],
  news: [400, 800],
  events: [400, 800],
};

/** Intrinsic aspect ratio per category, matching the script's centre-crop. */
export const RATIOS = {
  hero: '16 / 9',
  faculty: '1 / 1',
  courses: '16 / 10',
  facilities: '16 / 9',
  news: '16 / 9',
  events: '16 / 9',
};

const BASE_PATH = '/assets';

/** Category is the first path segment of the base name. */
export function categoryOf(base) {
  return typeof base === 'string' ? base.split('/')[0] : undefined;
}

/**
 * @param {string} base    e.g. 'faculty/rahman'
 * @param {number[]} [widths]  defaults to the category's tiers
 * @returns {{src: string, srcSet: string, width: number, height: number} | null}
 */
export function responsive(base, widths) {
  if (!base) return null;

  const category = categoryOf(base);

  // The manifest records what the optimiser ACTUALLY wrote. Preferring it over
  // the category defaults is what stops a srcset advertising a tier that the
  // no-upscale rule skipped — the browser could otherwise pick a 404, which
  // fails the whole <img> and silently loses the photograph.
  const generated = imageManifest[base];
  if (generated && !widths) {
    if (generated.length === 0) return null;
    return build(base, generated, category);
  }

  // Not in the manifest: either the script hasn't run yet or this base name is
  // a typo. Emitting the category defaults keeps things working in dev; a wrong
  // guess still degrades to the gradient via CardMedia's onError.
  const tiers = widths ?? WIDTHS[category];
  if (!tiers?.length) {
    // Unknown category — fall back to a single unsuffixed file rather than
    // inventing a srcset that points at files the script never generated.
    return { src: `${BASE_PATH}/${base}.webp`, srcSet: undefined, width: undefined, height: undefined };
  }
  return build(base, tiers, category);
}

function build(base, tiers, category) {

  const largest = tiers[tiers.length - 1];
  const ratio = RATIOS[category];
  const [rw, rh] = ratio ? ratio.split('/').map((n) => Number(n.trim())) : [16, 10];

  return {
    src: `${BASE_PATH}/${base}-${largest}.webp`,
    srcSet: tiers.map((w) => `${BASE_PATH}/${base}-${w}.webp ${w}w`).join(', '),
    // Intrinsic size hints so the browser reserves the right box before load.
    width: largest,
    height: Math.round((largest * rh) / rw),
  };
}
