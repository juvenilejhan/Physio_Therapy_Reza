import Courses from '../components/Courses/Courses';

export default function CoursesPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '120px' }}>
      <Courses />
      
      {/* Adding extra detail for courses page as requested */}
      <section className="admission-process" style={{ padding: '5rem 0', background: 'var(--dark-navy)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Admission Process</h2>
            <p className="section-subtitle">How to join our prestigious programs</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--dark-card)', borderRadius: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem' }}>1</div>
              <h3>Application</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Submit your online application along with required academic transcripts and credentials.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--dark-card)', borderRadius: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem' }}>2</div>
              <h3>Assessment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Attend the entrance examination and subsequent personal interview with the faculty board.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--dark-card)', borderRadius: '16px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem' }}>3</div>
              <h3>Enrollment</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Receive your acceptance letter and complete the enrollment procedures to begin your journey.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
