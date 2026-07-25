import useScrollPosition from '../../hooks/useScrollPosition';
import './BackToTop.css';

export default function BackToTop() {
  const scrollY = useScrollPosition();
  const isVisible = scrollY > 500;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`back-to-top ${isVisible ? 'show' : ''}`} 
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
}
