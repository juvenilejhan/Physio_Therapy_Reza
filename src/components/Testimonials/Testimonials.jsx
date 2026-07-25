import { useState, useEffect } from 'react';
import { testimonials } from '../../data/testimonials';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Testimonials.css';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headerRef = useScrollReveal();
  const sliderRef = useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Success Stories</span>
          <h2 className="section-title">What Our Alumni Say</h2>
          <p className="section-subtitle">Join thousands of successful graduates making a difference in healthcare globally.</p>
        </div>

        <div className="testimonials-slider reveal" ref={sliderRef}>
          <div 
            className="testimonials-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-star ${i < Math.floor(t.rating) ? 'fas' : 'far'}`}></i>
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.gradient }}>
                    {t.initials}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-controls">
            <button className="testimonial-btn" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
            <button className="testimonial-btn" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <div 
                key={i} 
                className={`dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
