import Faculty from '../components/Faculty/Faculty';

export default function FacultyPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '120px' }}>
      <Faculty />
      
      {/* Adding more detail as requested */}
      <section className="research-focus" style={{ padding: '5rem 0', background: 'var(--dark-surface)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Research Excellence</h2>
            <p className="section-subtitle">Our faculty members are actively engaged in groundbreaking research</p>
          </div>
          
          <div style={{ background: 'var(--dark-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Current Research Pillars</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
              <li style={{ display: 'flex', gap: '1rem' }}><i className="fas fa-check-circle" style={{ color: 'var(--primary-green)', marginTop: '4px' }}></i> <div><strong>Neuroplasticity in Stroke Rehabilitation:</strong> Exploring novel brain stimulation techniques coupled with task-specific training.</div></li>
              <li style={{ display: 'flex', gap: '1rem' }}><i className="fas fa-check-circle" style={{ color: 'var(--primary-green)', marginTop: '4px' }}></i> <div><strong>Sports Biomechanics:</strong> Injury prevention protocols for elite athletes using 3D motion capture analysis.</div></li>
              <li style={{ display: 'flex', gap: '1rem' }}><i className="fas fa-check-circle" style={{ color: 'var(--primary-green)', marginTop: '4px' }}></i> <div><strong>Geriatric Mobility:</strong> Developing accessible home-based exercise programs to prevent falls in the elderly population.</div></li>
              <li style={{ display: 'flex', gap: '1rem' }}><i className="fas fa-check-circle" style={{ color: 'var(--primary-green)', marginTop: '4px' }}></i> <div><strong>Cardiopulmonary Tele-rehabilitation:</strong> Efficacy of remote monitoring and exercise prescription for post-COVID recovery.</div></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
