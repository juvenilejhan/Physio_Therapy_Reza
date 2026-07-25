import { news } from '../../data/news';
import useScrollReveal from '../../hooks/useScrollReveal';
import './News.css';

function NewsCard({ item, delayClass }) {
  const revealRef = useScrollReveal();
  
  return (
    <article className={`news-card reveal ${delayClass}`} ref={revealRef}>
      <div className="news-image" style={{ background: item.gradient }}>
        <i className={item.icon}></i>
      </div>
      <div className="news-content">
        <div className="news-meta">
          <span className="news-category">{item.category}</span>
          <span className="news-date">{item.date}</span>
        </div>
        <h3 className="news-title">{item.title}</h3>
        <p className="news-excerpt">{item.excerpt}</p>
        <a href="#" onClick={(e) => e.preventDefault()} className="news-read-more">
          Read Full Story <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </article>
  );
}

export default function News() {
  const headerRef = useScrollReveal();

  return (
    <section id="news" className="news">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Latest Updates</span>
          <h2 className="section-title">News & Insights</h2>
          <p className="section-subtitle">Stay informed about our latest research findings, institutional updates, and achievements.</p>
        </div>
        
        <div className="news-grid">
          {news.map((item, index) => {
            const delayClass = index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : '';
            return <NewsCard key={item.id} item={item} delayClass={delayClass} />;
          })}
        </div>
      </div>
    </section>
  );
}
