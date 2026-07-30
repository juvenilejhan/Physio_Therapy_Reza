import { news } from '../../data/news';
import useScrollReveal from '../../hooks/useScrollReveal';
import Reveal from '../Reveal/Reveal';
import CardMedia from '../CardMedia/CardMedia';
import './News.css';

function NewsCard({ item, delayClass }) {
  const revealRef = useScrollReveal();

  return (
    <article className={`news-card reveal ${delayClass}`} ref={revealRef}>
      <CardMedia
        className="news-image"
        image={item.image}
        imageAlt={item.imageAlt}
        gradient={item.gradient}
        icon={item.icon}
        ratio="16 / 9"
      />
      <div className="news-content">
        <div className="news-meta">
          <span className="news-category">{item.category}</span>
          {/* <time> so the date is machine-readable, not just displayed */}
          <time className="news-date" dateTime={item.datetime}>{item.date}</time>
        </div>
        <h3 className="news-title">{item.title}</h3>
        <p className="news-excerpt">{item.excerpt}</p>
      </div>
    </article>
  );
}

export default function News() {
  return (
    <section id="news" className="news">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Latest Updates</span>
          <h1 className="section-title">News &amp; Insights</h1>
          <p className="section-subtitle">
            Stay informed about our latest research findings, institutional updates, and achievements.
          </p>
        </Reveal>

        {/* "Read Full Story" removed from each card — there are no article pages
            to read, and the button did nothing when clicked. */}
        <div className="news-grid">
          {news.map((item, index) => (
            <NewsCard
              key={item.id}
              item={item}
              delayClass={index > 0 && index < 4 ? `delay-${index}` : ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
