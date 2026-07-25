import useScrollReveal from '../../hooks/useScrollReveal';
import './Features.css';

export default function Features() {
  const headerRef = useScrollReveal();
  const f1Ref = useScrollReveal();
  const f2Ref = useScrollReveal();
  const f3Ref = useScrollReveal();

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Why BAHIR</span>
          <h2 className="section-title">The BAHIR Advantage</h2>
          <p className="section-subtitle">Discover why thousands of healthcare professionals choose BAHIR to advance their physiotherapy careers.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card reveal" ref={f1Ref}>
            <div className="feature-icon"><i className="fas fa-microscope"></i></div>
            <h3 className="feature-title">Evidence-Based Curriculum</h3>
            <p>Our programs are continuously updated based on the latest clinical research and international physiotherapy guidelines to ensure you learn the most effective techniques.</p>
          </div>
          
          <div className="feature-card reveal delay-1" ref={f2Ref}>
            <div className="feature-icon"><i className="fas fa-laptop-medical"></i></div>
            <h3 className="feature-title">State-of-the-art Facilities</h3>
            <p>Practice in our modern simulation labs equipped with advanced rehabilitation technology, biomechanical assessment tools, and digital health systems.</p>
          </div>
          
          <div className="feature-card reveal delay-2" ref={f3Ref}>
            <div className="feature-icon"><i className="fas fa-globe-asia"></i></div>
            <h3 className="feature-title">International Recognition</h3>
            <p>Our certifications are recognized globally. We maintain strategic partnerships with leading international physiotherapy associations and universities.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
