import About from '../components/About/About';
import Features from '../components/Features/Features';
import Testimonials from '../components/Testimonials/Testimonials';

export default function AboutPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '120px' }}>
      <About />
      <Features />
      
      {/* Adding more detail as requested by user */}
      <section className="vision-mission" style={{ padding: '4rem 0', background: 'var(--dark-surface)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Vision & Mission</h2>
            <p className="section-subtitle">Dedicated to transforming healthcare across Bangladesh</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ background: 'var(--dark-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}><i className="fas fa-eye"></i> Vision</h3>
              <p>To be the premier institution for physiotherapy and rehabilitation sciences in South Asia, driving innovation in research, excellence in clinical practice, and leadership in healthcare education.</p>
            </div>
            <div style={{ background: 'var(--dark-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}><i className="fas fa-bullseye"></i> Mission</h3>
              <p>To produce competent, compassionate, and ethical physiotherapy professionals equipped with evidence-based knowledge and skills to enhance the quality of life of individuals and communities.</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
