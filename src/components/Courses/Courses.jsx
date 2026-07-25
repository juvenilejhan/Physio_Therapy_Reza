import { useState, useEffect } from 'react';
import { courses, courseCategories } from '../../data/courses';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Courses.css';

function CourseCard({ course, activeFilter }) {
  const revealRef = useScrollReveal();
  const [style, setStyle] = useState({ display: 'block', opacity: 1, transform: 'scale(1)' });
  
  const isMatch = activeFilter === 'all' || activeFilter === course.category;

  useEffect(() => {
    if (isMatch) {
      setStyle({ display: 'block', opacity: 1, transform: 'scale(1)' });
    } else {
      setStyle(prev => ({ ...prev, opacity: 0, transform: 'scale(0.8)' }));
      const timer = setTimeout(() => {
        setStyle({ display: 'none', opacity: 0, transform: 'scale(0.8)' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isMatch]);

  return (
    <div 
      className="course-card reveal" 
      ref={revealRef}
      style={style}
    >
      <div className="course-image" style={{ background: course.gradient }}>
        {course.badge && <div className={`course-badge ${course.badgeType}`}>{course.badge}</div>}
        <div className="course-image-icon"><i className={course.icon}></i></div>
      </div>
      <div className="course-content">
        <div className="course-meta">
          <span className="course-category">{course.categoryLabel}</span>
          <span className="course-duration"><i className="far fa-clock"></i> {course.duration}</span>
        </div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.description}</p>
        <div className="course-footer">
          <div className="course-instructor">
            <div className="instructor-avatar">{course.instructorInitials}</div>
            <span>{course.instructor}</span>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-sm btn-outline">Enroll Now</a>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('all');
  const headerRef = useScrollReveal();

  return (
    <section id="courses" className="courses">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <span className="section-tag">Our Programs</span>
          <h2 className="section-title">Featured Courses & Programs</h2>
          <p className="section-subtitle">Comprehensive, evidence-based physiotherapy courses designed by industry experts for healthcare professionals at every stage of their career.</p>
        </div>
        
        <div className="courses-filter">
          {courseCategories.map((category) => (
            <button 
              key={category.key}
              className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} activeFilter={activeFilter} />
          ))}
        </div>
        
        <div className="courses-cta">
          <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-primary btn-lg">
            <span>View All Courses</span> <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
