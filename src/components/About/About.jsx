import useScrollReveal from '../../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const headerRef = useScrollReveal();
  const missionRef1 = useScrollReveal();
  const missionRef2 = useScrollReveal();
  const imgRef1 = useScrollReveal();
  const imgRef2 = useScrollReveal();
  const imgRef3 = useScrollReveal();
  const valRef1 = useScrollReveal();
  const valRef2 = useScrollReveal();
  const valRef3 = useScrollReveal();
  const valRef4 = useScrollReveal();

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">About Us</span>
          <h2 className="section-title">Pioneering Physiotherapy Education & Research</h2>
          <p className="section-subtitle">Committed to excellence since our founding, BAHIR stands as a beacon of health innovation in Bangladesh and beyond.</p>
        </div>
        
        <div className="about-grid">
          <div className="about-content">
            <div className="about-mission">
              <div className="mission-card reveal" ref={missionRef1}>
                <div className="mission-icon"><i className="fas fa-bullseye"></i></div>
                <h3>Our Mission</h3>
                <p>To advance the science and practice of physiotherapy through innovative education, rigorous research, and community engagement — producing healthcare professionals who transform patient outcomes globally.</p>
              </div>
              <div className="mission-card reveal" ref={missionRef2}>
                <div className="mission-icon"><i className="fas fa-eye"></i></div>
                <h3>Our Vision</h3>
                <p>To become the premier institution for health innovation and research in South Asia, recognized globally for our commitment to evidence-based physiotherapy practice and educational excellence.</p>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="about-image-grid">
              <div className="about-img-card about-img-1 reveal" ref={imgRef1}>
                <div className="about-img-overlay">
                  <i className="fas fa-hands-helping"></i>
                  <span>Hands-on Training</span>
                </div>
              </div>
              <div className="about-img-card about-img-2 reveal" ref={imgRef2}>
                <div className="about-img-overlay">
                  <i className="fas fa-microscope"></i>
                  <span>Research Labs</span>
                </div>
              </div>
              <div className="about-img-card about-img-3 reveal" ref={imgRef3}>
                <div className="about-img-overlay">
                  <i className="fas fa-users"></i>
                  <span>Global Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-values">
          <div className="value-item reveal" ref={valRef1}>
            <div className="value-icon"><i className="fas fa-star"></i></div>
            <h4>Excellence</h4>
            <p>Uncompromising commitment to the highest standards in education and research.</p>
          </div>
          <div className="value-item reveal" ref={valRef2}>
            <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
            <h4>Innovation</h4>
            <p>Embracing cutting-edge methods and technologies to advance healthcare practice.</p>
          </div>
          <div className="value-item reveal" ref={valRef3}>
            <div className="value-icon"><i className="fas fa-handshake"></i></div>
            <h4>Integrity</h4>
            <p>Upholding ethical principles in all our academic and research endeavors.</p>
          </div>
          <div className="value-item reveal" ref={valRef4}>
            <div className="value-icon"><i className="fas fa-globe-americas"></i></div>
            <h4>Global Impact</h4>
            <p>Creating healthcare professionals who make a lasting difference worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
