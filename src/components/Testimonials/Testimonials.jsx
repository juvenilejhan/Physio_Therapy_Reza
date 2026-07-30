import { useState, useEffect } from 'react';
import { testimonials } from '../../data/testimonials';
import Reveal from '../Reveal/Reveal';
import Avatar from '../Avatar/Avatar';
import './Testimonials.css';

const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // WCAG 2.2.2: auto-advancing content must be pausable. Stops while the user
    // is hovering or has keyboard focus inside the slider, and never starts at
    // all under reduced-motion.
    if (isPaused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonials">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Success Stories</span>
          <h2 className="section-title">What Our Alumni Say</h2>
          <p className="section-subtitle">
            Join thousands of successful graduates making a difference in healthcare globally.
          </p>
        </Reveal>

        <Reveal
          className="testimonials-slider"
          role="group"
          aria-roledescription="carousel"
          aria-label="Alumni testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            className="testimonials-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            aria-live="polite"
          >
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className="testimonial-card"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}`}
                aria-hidden={index !== currentIndex}
              >
                <div className="testimonial-rating" role="img" aria-label={`Rated ${t.rating} out of 5`}>
                  {[...Array(5)].map((_, star) => (
                    <i
                      key={star}
                      className={`fa-star ${star < Math.floor(t.rating) ? 'fas' : 'far'}`}
                      aria-hidden="true"
                    ></i>
                  ))}
                </div>
                <blockquote className="testimonial-quote">{t.quote}</blockquote>
                <div className="testimonial-author">
                  <Avatar
                    className="testimonial-avatar is-sm"
                    image={t.image}
                    initials={t.initials}
                    gradient={t.gradient}
                    size={56}
                  />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-controls">
            <button
              type="button"
              className="testimonial-btn"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              className="testimonial-btn"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((t, index) => (
              <button
                key={t.id}
                type="button"
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex}
              ></button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
