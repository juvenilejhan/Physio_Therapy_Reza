import { useState } from 'react';
import { responsive } from '../../utils/imageSrc';
import './CardMedia.css';

/**
 * Media slot for content cards (courses, news, facilities, events).
 *
 * Renders a responsive photograph when the data item supplies one, and falls
 * back to the gradient-plus-icon treatment the site ships with when it doesn't
 * — so photography can be added later by editing `src/data/*.js` alone, with no
 * component changes. A failed image load falls back to the gradient too, rather
 * than leaving a broken frame.
 *
 * @param {string}  [image]     base name, e.g. 'courses/musculoskeletal'
 *                              (NOT a filename — see utils/imageSrc.js)
 * @param {string}  [imageAlt]  alt text. Defaults to '' — a card image sitting
 *                              beside its own title is decorative, and
 *                              describing it again just makes screen readers
 *                              read the title twice. Set it only when the image
 *                              genuinely carries information.
 * @param {string}  gradient    CSS gradient used as the fallback surface
 * @param {string}  icon        Font Awesome class for the fallback glyph
 * @param {string}  [ratio]     CSS aspect-ratio, e.g. '16 / 10'
 * @param {string}  [sizes]     sizes attribute; defaults to a sensible card value
 * @param {boolean} [eager]     skip lazy loading (use for above-the-fold media)
 */
export default function CardMedia({
  image,
  imageAlt = '',
  gradient,
  icon,
  ratio = '16 / 10',
  sizes = '(max-width: 768px) 100vw, 400px',
  eager = false,
  className = '',
  children,
}) {
  const [failed, setFailed] = useState(false);
  const img = failed ? null : responsive(image);

  return (
    <div
      className={`card-media ${className}`}
      style={{ background: gradient, aspectRatio: ratio }}
    >
      {img ? (
        <img
          className="card-media-img"
          src={img.src}
          srcSet={img.srcSet}
          sizes={sizes}
          width={img.width}
          height={img.height}
          alt={imageAlt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="card-media-icon" aria-hidden="true">
          <i className={icon}></i>
        </span>
      )}
      {children}
    </div>
  );
}
