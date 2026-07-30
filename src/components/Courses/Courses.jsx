import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { courses, courseCategories } from '../../data/courses';
import useScrollReveal from '../../hooks/useScrollReveal';
import Reveal from '../Reveal/Reveal';
import CardMedia from '../CardMedia/CardMedia';
import './Courses.css';

function CourseCard({ course }) {
  const revealRef = useScrollReveal();

  return (
    <article className="course-card reveal" ref={revealRef}>
      <CardMedia
        className="course-image"
        image={course.image}
        imageAlt={course.imageAlt}
        gradient={course.gradient}
        icon={course.icon}
        ratio="16 / 10"
      >
        {course.badge && <div className={`course-badge ${course.badgeType}`}>{course.badge}</div>}
      </CardMedia>

      <div className="course-content">
        <div className="course-meta">
          <span className="course-category">{course.categoryLabel}</span>
          <span className="course-duration">
            <i className="far fa-clock" aria-hidden="true"></i> {course.duration}
          </span>
        </div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.description}</p>
        <div className="course-footer">
          <div className="course-instructor">
            <div className="instructor-avatar" aria-hidden="true">{course.instructorInitials}</div>
            <span>{course.instructor}</span>
          </div>
          {/* Enquiry lands on /contact with the course preselected — it used to
              point at /courses, i.e. the page the button lives on. */}
          <Link
            to={`/contact?course=${course.id}`}
            className="btn btn-sm btn-outline"
            aria-label={`Enquire about ${course.title}`}
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * @param {'h1'|'h2'} titleAs  heading level for the section title. Home already
 *   has an <h1> in the hero, so it stays 'h2' there; CoursesPage passes 'h1'
 *   because this section is the page's lead content.
 */
export default function Courses({ titleAs: Title = 'h2' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');

  // Footer program links deep-link here as /courses?category=<key>. Kept in
  // sync both ways so the filter is shareable and survives a reload.
  useEffect(() => {
    const fromUrl = searchParams.get('category');
    const isValid = courseCategories.some((c) => c.key === fromUrl);
    setActiveFilter(isValid ? fromUrl : 'all');
  }, [searchParams]);

  const selectFilter = (key) => {
    setActiveFilter(key);
    const next = new URLSearchParams(searchParams);
    if (key === 'all') next.delete('category');
    else next.set('category', key);
    setSearchParams(next, { replace: true });
  };

  const visible = courses.filter(
    (course) => activeFilter === 'all' || activeFilter === course.category
  );
  const activeLabel =
    courseCategories.find((c) => c.key === activeFilter)?.label ?? 'All Courses';

  return (
    <section id="courses" className="courses">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Our Programs</span>
          <Title className="section-title">Featured Courses &amp; Programs</Title>
          <p className="section-subtitle">
            Comprehensive, evidence-based physiotherapy courses designed by industry experts for
            healthcare professionals at every stage of their career.
          </p>
        </Reveal>

        <div className="courses-filter" role="group" aria-label="Filter courses by category">
          {courseCategories.map((category) => (
            <button
              key={category.key}
              type="button"
              className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
              onClick={() => selectFilter(category.key)}
              aria-pressed={activeFilter === category.key}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Visible to everyone, and announced — the count used to be sr-only. */}
        <p className="courses-result-count" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'course' : 'courses'}
          {activeFilter !== 'all' && ` in ${activeLabel}`}
        </p>

        <div className="courses-grid">
          {visible.length > 0 ? (
            visible.map((course) => <CourseCard key={course.id} course={course} />)
          ) : (
            <div className="courses-empty">
              <i className="fas fa-folder-open" aria-hidden="true"></i>
              <h3>No courses in this category yet</h3>
              <p>New programs are added each term. Get in touch and we&apos;ll let you know first.</p>
              <button type="button" className="btn btn-outline" onClick={() => selectFilter('all')}>
                View all courses
              </button>
            </div>
          )}
        </div>

        <div className="courses-cta">
          <Link to="/contact" className="btn btn-primary btn-lg">
            <span>Request a prospectus</span> <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
