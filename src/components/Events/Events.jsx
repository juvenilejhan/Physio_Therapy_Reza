import { events } from '../../data/events';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Events.css';

function EventCard({ event, index }) {
  const revealRef = useScrollReveal();
  const delayClass = index > 0 ? `delay-${index}` : '';
  
  return (
    <div className={`event-card ${event.featured ? 'event-featured large' : ''} reveal ${delayClass}`} ref={revealRef}>
      <div className="event-date">
        <span className="event-month">{event.month}</span>
        <span className="event-day">{event.day}</span>
        {event.year && <span className="event-year">{event.year}</span>}
      </div>
      <div className="event-content">
        <span className="event-tag">{event.tag}</span>
        <h3 className="event-title">{event.title}</h3>
        <div className="event-details">
          {event.details.map((detail, idx) => (
            <span key={idx}><i className={detail.icon}></i> {detail.text}</span>
          ))}
        </div>
        <p className="event-desc">{event.description}</p>
        <a href="#" onClick={(e) => e.preventDefault()} className={event.btnClass}>{event.btnText}</a>
      </div>
    </div>
  );
}

export default function Events() {
  const headerRef = useScrollReveal();
  
  const featuredEvent = events.find(e => e.featured);
  const regularEvents = events.filter(e => !e.featured);

  return (
    <section id="events" className="events">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Upcoming Events</span>
          <h2 className="section-title">Join Our Community</h2>
          <p className="section-subtitle">Participate in workshops, conferences, and seminars led by international experts.</p>
        </div>
        
        <div className="events-grid">
          {featuredEvent && <EventCard event={featuredEvent} index={0} />}
          <div className="events-stack">
            {regularEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
