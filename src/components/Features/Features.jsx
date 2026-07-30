import Reveal from '../Reveal/Reveal';
import './Features.css';

const FEATURES = [
  {
    icon: 'fas fa-microscope',
    title: 'Evidence-Based Curriculum',
    body: 'Our programs are continuously updated based on the latest clinical research and international physiotherapy guidelines to ensure you learn the most effective techniques.',
  },
  {
    icon: 'fas fa-laptop-medical',
    title: 'State-of-the-art Facilities',
    body: 'Practice in our modern simulation labs equipped with advanced rehabilitation technology, biomechanical assessment tools, and digital health systems.',
  },
  {
    icon: 'fas fa-globe-asia',
    title: 'International Recognition',
    body: 'Our certifications are recognized globally. We maintain strategic partnerships with leading international physiotherapy associations and universities.',
  },
];

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Why BAHIR</span>
          <h2 className="section-title">The BAHIR Advantage</h2>
          <p className="section-subtitle">
            Discover why thousands of healthcare professionals choose BAHIR to advance their
            physiotherapy careers.
          </p>
        </Reveal>

        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} className="feature-card" delay={index}>
              <div className="feature-icon" aria-hidden="true"><i className={feature.icon}></i></div>
              <h3 className="feature-title">{feature.title}</h3>
              <p>{feature.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
