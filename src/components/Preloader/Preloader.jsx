import { useState, useEffect } from 'react';
import './Preloader.css';

const HOLD_MS = 900;      // visible hold
const FADE_MS = 500;      // must match the opacity transition in Preloader.css

/** True when the user has asked the OS to minimise animation. */
function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Preloader() {
  // Skip the splash entirely for reduced-motion users — it is decorative, and
  // an artificial delay before content is exactly what they opted out of.
  const [visible, setVisible] = useState(() => !prefersReducedMotion());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const fadeTimer = setTimeout(() => setLoading(false), HOLD_MS);
    const removeTimer = setTimeout(() => setVisible(false), HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      className={loading ? '' : 'hidden'}
      role="status"
      aria-live="polite"
      aria-label="Loading BAHIR"
    >
      <div className="preloader-content">
        <div className="preloader-logo">BAHIR</div>
        <p className="preloader-text">Bangladesh Academy of Health Innovation &amp; Research</p>
        <div className="preloader-bar">
          <div className="preloader-fill"></div>
        </div>
      </div>
    </div>
  );
}
