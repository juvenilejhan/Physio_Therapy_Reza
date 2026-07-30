import { useState } from 'react';
import { responsive } from '../../utils/imageSrc';
import './Avatar.css';

/**
 * Circular portrait with an initials fallback.
 *
 * Mirrors CardMedia's contract for the round case: a photograph when `image` is
 * set, the person's initials on a brand gradient when it isn't.
 *
 * The fallback is a finished design, not a placeholder — deliberately, because
 * faculty and testimonial entries name real individuals. Where no genuine
 * photograph of that person exists, staying on initials is the correct outcome;
 * a stock face would fabricate a person.
 *
 * @param {string} [image]    base name, e.g. 'faculty/rahman'
 * @param {string} initials   shown when there is no image
 * @param {string} gradient   fallback surface
 * @param {number} [size]     rendered diameter in px
 */
export default function Avatar({
  image,
  initials,
  gradient,
  size = 128,
  className = '',
}) {
  const [failed, setFailed] = useState(false);
  const img = failed ? null : responsive(image);

  return (
    <div
      className={`avatar ${className}`}
      style={{ background: gradient, width: size, height: size }}
      /* Hidden from AT in the fallback case: the initials are a visual device,
         and the person's name is already the adjacent heading. */
      aria-hidden={img ? undefined : 'true'}
    >
      {img ? (
        <img
          className="avatar-img"
          src={img.src}
          srcSet={img.srcSet}
          sizes={`${size}px`}
          width={img.width}
          height={img.height}
          /* Empty alt: the name sits directly beside this as a heading, so
             describing the portrait repeats it. */
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="avatar-initials">{initials}</span>
      )}
    </div>
  );
}
