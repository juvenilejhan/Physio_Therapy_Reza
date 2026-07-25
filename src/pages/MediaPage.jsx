import Events from '../components/Events/Events';
import News from '../components/News/News';

export default function MediaPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '120px' }}>
      <News />
      <Events />
      
      <section className="newsletter" style={{ padding: '5rem 0', background: 'var(--dark-surface)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Subscribe to BAHIR Media</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Get the latest updates on healthcare innovation, research publications, and upcoming conferences directly in your inbox.</p>
          
          <form style={{ display: 'flex', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '8px', background: 'var(--dark-card)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
              required 
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
