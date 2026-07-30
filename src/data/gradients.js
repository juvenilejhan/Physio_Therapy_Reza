/**
 * Shared decorative gradients for card headers and avatars.
 *
 * These are the one place raw hex belongs outside variables.css: they are
 * rendered as inline `style` on data-driven elements, so they can't reference
 * CSS custom properties that change with the theme.
 *
 * Drawn from the crest — maroon, laurel green, bronze. Every stop is
 * deliberately DARK: these surfaces carry white icons and white avatar
 * initials, so the crest's gold cannot appear here (white on #c8a45c is
 * 2.0:1). Verified: every stop keeps white above 4.5:1.
 */

export const gradients = {
  maroon: 'linear-gradient(135deg, #6b1f35, #3d1020)',
  laurel: 'linear-gradient(135deg, #2d5b3e, #17372a)',
  bronze: 'linear-gradient(135deg, #8a5a2b, #4a2d16)',
  claret: 'linear-gradient(135deg, #4a1528, #6b1f35)',
  forest: 'linear-gradient(135deg, #1f4a33, #2d5b3e)',
  ember: 'linear-gradient(135deg, #a4491f, #5c2410)',
};

/** Rotation order used when a list needs varied but repeatable colouring. */
export const gradientCycle = [
  gradients.maroon,
  gradients.laurel,
  gradients.bronze,
  gradients.claret,
  gradients.forest,
  gradients.ember,
];
