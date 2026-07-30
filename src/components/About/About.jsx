import Reveal from '../Reveal/Reveal';
import CardMedia from '../CardMedia/CardMedia';
import { gradients } from '../../data/gradients';
import './About.css';

const MISSION_CARDS = [
  {
    icon: 'fas fa-bullseye',
    title: 'Our Mission',
    body: 'To advance the science and practice of physiotherapy through innovative education, rigorous research, and community engagement — producing healthcare professionals who transform patient outcomes globally.',
  },
  {
    icon: 'fas fa-eye',
    title: 'Our Vision',
    body: 'To become the premier institution for health innovation and research in South Asia, recognized globally for our commitment to evidence-based physiotherapy practice and educational excellence.',
  },
];

/**
 * Facility cards.
 *
 * `image` is an optional BASE NAME under assets-src/facilities/ — no extension,
 * no size suffix, e.g. `image: 'facilities/training-room'`. Drop the original
 * into assets-src/facilities/ and run `python scripts/optimise-images.py`.
 *
 * Without one, CardMedia renders the gradient and icon, which is a finished
 * design rather than a placeholder. `imageAlt` defaults to '' because the label
 * beneath already names the subject.
 */
const IMAGE_CARDS = [
  {
    icon: 'fas fa-hands-helping',
    label: 'Hands-on Training',
    gradient: gradients.maroon,
    wide: true,
    ratio: '16 / 9',
    sizes: '(max-width: 768px) 100vw, 600px',
  },
  {
    icon: 'fas fa-microscope',
    label: 'Research Labs',
    gradient: gradients.laurel,
    ratio: '4 / 3',
    sizes: '(max-width: 768px) 50vw, 290px',
  },
  {
    icon: 'fas fa-users',
    label: 'Global Community',
    gradient: gradients.bronze,
    ratio: '4 / 3',
    sizes: '(max-width: 768px) 50vw, 290px',
  },
];

const VALUES = [
  { icon: 'fas fa-star', title: 'Excellence', body: 'Uncompromising commitment to the highest standards in education and research.' },
  { icon: 'fas fa-lightbulb', title: 'Innovation', body: 'Embracing cutting-edge methods and technologies to advance healthcare practice.' },
  { icon: 'fas fa-handshake', title: 'Integrity', body: 'Upholding ethical principles in all our academic and research endeavors.' },
  { icon: 'fas fa-globe-americas', title: 'Global Impact', body: 'Creating healthcare professionals who make a lasting difference worldwide.' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">About Us</span>
          <h1 className="section-title">Pioneering Physiotherapy Education &amp; Research</h1>
          <p className="section-subtitle">
            Committed to excellence since our founding, BAHIR stands as a beacon of health innovation
            in Bangladesh and beyond.
          </p>
        </Reveal>

        <div className="about-grid">
          <div className="about-content">
            <div className="about-mission">
              {MISSION_CARDS.map((card) => (
                <Reveal key={card.title} className="mission-card">
                  <div className="mission-icon" aria-hidden="true"><i className={card.icon}></i></div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Was an absolutely-positioned "collage" in which all three cards
              overlapped each other and Global Community occluded Research Labs.
              Now a real grid: one wide card, two beneath it. */}
          <div className="about-visual">
            <div className="about-image-grid">
              {IMAGE_CARDS.map((card) => (
                <Reveal
                  key={card.label}
                  className={`about-img-card ${card.wide ? 'is-wide' : ''}`}
                >
                  <CardMedia
                    image={card.image}
                    imageAlt={card.imageAlt}
                    gradient={card.gradient}
                    icon={card.icon}
                    ratio={card.ratio}
                    sizes={card.sizes}
                  >
                    <span className="about-img-label">{card.label}</span>
                  </CardMedia>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="about-values">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} className="value-item" delay={index}>
              <div className="value-icon" aria-hidden="true"><i className={value.icon}></i></div>
              <h4>{value.title}</h4>
              <p>{value.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
