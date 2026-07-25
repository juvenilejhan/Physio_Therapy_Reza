import { useEffect, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 4 + 2; 
      const posX = Math.random() * 100; 
      const posY = Math.random() * 100; 
      const opacity = Math.random() * 0.4 + 0.1; 
      const duration = Math.random() * 5 + 3; 
      const delay = Math.random() * 5; 

      newParticles.push({
        id: i,
        style: {
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: '#C9A84C',
          width: `${size}px`,
          height: `${size}px`,
          left: `${posX}%`,
          top: `${posY}%`,
          opacity: opacity.toString(),
          animation: `floatParticle ${duration}s infinite alternate ease-in-out ${delay}s`
        }
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
        <div className="hero-particles" id="heroParticles">
          {particles.map(p => (
            <div key={p.id} style={p.style}></div>
          ))}
        </div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-badge animate-fade-up">
            <i className="fas fa-award"></i>
            <span>Leading Physiotherapy Academy</span>
          </div>
          <h1 className="hero-title animate-fade-up delay-1">
            Empowering <span className="text-gradient">Health Innovation</span> Through Excellence in Education
          </h1>
          <p className="hero-description animate-fade-up delay-2">
            Bangladesh Academy of Health Innovation & Research (BAHIR) is dedicated to advancing physiotherapy education, fostering groundbreaking research, and building the next generation of healthcare leaders worldwide.
          </p>
          <div className="hero-cta animate-fade-up delay-3">
            <a href="#courses" className="btn btn-primary btn-lg">
              <i className="fas fa-book-open"></i>
              Explore Courses
            </a>
            <a href="#about" className="btn btn-glass btn-lg">
              <i className="fas fa-play-circle"></i>
              Learn More
            </a>
          </div>
          <div className="hero-trust animate-fade-up delay-4">
            <div className="trust-avatars">
              <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #C9A84C, #7B2D4E)' }}>A</div>
              <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #2D6B4A, #C9A84C)' }}>B</div>
              <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #7B2D4E, #2D6B4A)' }}>C</div>
              <div className="trust-avatar" style={{ background: 'linear-gradient(135deg, #1B2A4A, #C9A84C)' }}>D</div>
            </div>
            <p className="trust-text"><strong>500+</strong> professionals trust BAHIR worldwide</p>
          </div>
        </div>

        <div className="hero-visual animate-fade-left">
          <div className="hero-card hero-card-1">
            <div className="hero-card-icon"><i className="fas fa-graduation-cap"></i></div>
            <div className="hero-card-text">
              <strong>25+</strong>
              <span>Expert Courses</span>
            </div>
          </div>
          <div className="hero-card hero-card-2">
            <div className="hero-card-icon"><i className="fas fa-certificate"></i></div>
            <div className="hero-card-text">
              <strong>Certified</strong>
              <span>Programs</span>
            </div>
          </div>
          <div className="hero-card hero-card-3">
            <div className="hero-card-icon"><i className="fas fa-globe-americas"></i></div>
            <div className="hero-card-text">
              <strong>Global</strong>
              <span>Recognition</span>
            </div>
          </div>
          <div className="hero-float-element float-1"><i className="fas fa-heartbeat"></i></div>
          <div className="hero-float-element float-2"><i className="fas fa-dna"></i></div>
          <div className="hero-float-element float-3"><i className="fas fa-brain"></i></div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
