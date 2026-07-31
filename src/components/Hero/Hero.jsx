import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gradients } from '../../data/gradients';
import { allPrograms } from '../../data/programs';
import './Hero.css';

const PARTICLE_COUNT = 30;

const TRUST_AVATARS = [
  { initial: 'A', background: gradients.ocean },
  { initial: 'B', background: gradients.teal },
  { initial: 'C', background: gradients.aqua },
  { initial: 'D', background: gradients.midnight },
];

export default function Hero() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Decorative only — don't build 30 infinitely-animating nodes for users
    // who have asked the OS to reduce motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 5 + 3;

      return {
        id: i,
        style: {
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: '#7dd3fc',
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: (Math.random() * 0.4 + 0.1).toString(),
          animation: `floatParticle ${duration}s infinite alternate ease-in-out ${Math.random() * 5}s`,
        },
      };
    });

    setParticles(newParticles);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
        <div className="hero-particles" id="heroParticles">
          {particles.map((p) => (
            <div key={p.id} style={p.style}></div>
          ))}
        </div>
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-badge animate-fade-up">
            <i className="fas fa-award" aria-hidden="true"></i>
            <span>Leading Physiotherapy Academy</span>
          </div>
          {/* The institute's full name, read before the headline. A sibling of
              the h1, not a replacement — the heading hierarchy is untouched. */}
          <p className="hero-kicker animate-fade-up">
            Bangladesh Academy of Health Innovation &amp; Research
          </p>
          <h1 className="hero-title animate-fade-up delay-1">
            Empowering <span className="text-gradient">Health Innovation</span> Through Excellence in Education
          </h1>
          <p className="hero-description animate-fade-up delay-2">
            BAHIR is dedicated to advancing physiotherapy education, fostering groundbreaking research, and building the next generation of healthcare leaders worldwide.
          </p>
          <div className="hero-cta animate-fade-up delay-3">
            <Link to="/courses" className="btn btn-primary btn-lg">
              <i className="fas fa-book-open" aria-hidden="true"></i>
              Explore Programmes
            </Link>
            <Link to="/about" className="btn btn-glass btn-lg">
              <i className="fas fa-play-circle" aria-hidden="true"></i>
              Learn More
            </Link>
          </div>
          <div className="hero-trust animate-fade-up delay-4">
            <div className="trust-avatars" aria-hidden="true">
              {TRUST_AVATARS.map((avatar) => (
                <div key={avatar.initial} className="trust-avatar" style={{ background: avatar.background }}>
                  {avatar.initial}
                </div>
              ))}
            </div>
            <p className="trust-text"><strong>500+</strong> professionals trust BAHIR worldwide</p>
          </div>
        </div>

        <div className="hero-visual animate-fade-left">
          <div className="hero-card hero-card-1">
            <div className="hero-card-icon"><i className="fas fa-graduation-cap" aria-hidden="true"></i></div>
            <div className="hero-card-text">
              <strong>{allPrograms.length}+</strong>
              <span>Academic Programmes</span>
            </div>
          </div>
          <div className="hero-card hero-card-2">
            <div className="hero-card-icon"><i className="fas fa-certificate" aria-hidden="true"></i></div>
            <div className="hero-card-text">
              <strong>Certified</strong>
              <span>Programs</span>
            </div>
          </div>
          <div className="hero-card hero-card-3">
            <div className="hero-card-icon"><i className="fas fa-globe-americas" aria-hidden="true"></i></div>
            <div className="hero-card-text">
              <strong>Global</strong>
              <span>Recognition</span>
            </div>
          </div>
          <div className="hero-float-element float-1" aria-hidden="true"><i className="fas fa-heartbeat"></i></div>
          <div className="hero-float-element float-2" aria-hidden="true"><i className="fas fa-dna"></i></div>
          <div className="hero-float-element float-3" aria-hidden="true"><i className="fas fa-brain"></i></div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
