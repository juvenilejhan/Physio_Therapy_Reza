import { Link } from 'react-router-dom';
import { events } from '../../data/events';
import useScrollReveal from '../../hooks/useScrollReveal';
import Reveal from '../Reveal/Reveal';
import CardMedia from '../CardMedia/CardMedia';
import { gradients } from '../../data/gradients';
import './Events.css';

function EventCard({ event, index }) {
  const revealRef = useScrollReveal();
  const delayClass = index > 0 ? `delay-${index}` : '';

  // Unlike the course and news cards, event cards had no media slot at all, so
  // an always-on gradient banner would change this section's appearance before
  // any photograph exists. The banner is therefore opt-in: with no image the
  // card keeps today's horizontal date-beside-content layout exactly.
  const hasMedia = Boolean(event.image);

  const dateBlock = (
    <div className="event-date">
      <span className="event-month">{event.month}</span>
      <span className="event-day">{event.day}</span>
      {event.year && <span className="event-year">{event.year}</span>}
    </div>
  );

  return (
    <article
      className={`event-card ${event.featured ? 'event-featured large' : ''} ${
        hasMedia ? 'has-media' : ''
      } reveal ${delayClass}`}
      ref={revealRef}
    >
      {hasMedia ? (
        <div className="event-banner">
          <CardMedia
            image={event.image}
            imageAlt={event.imageAlt}
            gradient={event.gradient ?? gradients.maroon}
            icon={event.details?.[0]?.icon ?? 'fas fa-calendar-days'}
            ratio="16 / 9"
            sizes="(max-width: 768px) 100vw, 470px"
          />
          {dateBlock}
        </div>
      ) : (
        dateBlock
      )}
      <div className="event-content">
        <span className="event-tag">{event.tag}</span>
        <h3 className="event-title">{event.title}</h3>
        <div className="event-details">
          {event.details.map((detail, idx) => (
            <span key={idx}>
              <i className={detail.icon} aria-hidden="true"></i> {detail.text}
            </span>
          ))}
        </div>
        <p className="event-desc">{event.description}</p>
        <Link
          to={`/contact?subject=events&event=${event.id}`}
          className={event.btnClass}
          aria-label={`${event.btnText} — ${event.title}`}
        >
          {event.btnText}
        </Link>
      </div>
    </article>
  );
}

export default function Events() {
  const featuredEvent = events.find((e) => e.featured);
  const regularEvents = events.filter((e) => !e.featured);

  return (
    <section id="events" className="events">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Upcoming Events</span>
          <h2 className="section-title">Join Our Community</h2>
          <p className="section-subtitle">
            Participate in workshops, conferences, and seminars led by international experts.
          </p>
        </Reveal>

        {/* Featured card spans the full row; the rest flow as normal grid items. */}
        <div className="events-grid">
          {featuredEvent && <EventCard event={featuredEvent} index={0} />}
          {regularEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
