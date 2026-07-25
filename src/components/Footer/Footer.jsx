import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src="/assets/logo.png" 
                alt="BAHIR Logo" 
                className="footer-logo-img" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <h3 className="footer-logo-name">BAHIR</h3>
                <p className="footer-logo-full">Health Innovation & Research</p>
              </div>
            </div>
            <p className="footer-description">Advancing healthcare globally through excellence in physiotherapy education, innovative research, and clinical practice.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/courses">Our Programs</Link></li>
              <li><Link to="/faculty">Faculty</Link></li>
              <li><Link to="/media">Events</Link></li>
              <li><Link to="/media">News</Link></li>
              <li><Link to="/courses">Admissions</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Programs</h4>
            <ul>
              <li><a href="#">Musculoskeletal PT</a></li>
              <li><a href="#">Neurological Rehab</a></li>
              <li><a href="#">Sports Medicine</a></li>
              <li><a href="#">Cardiopulmonary PT</a></li>
              <li><a href="#">Pediatric PT</a></li>
              <li><a href="#">Research Programs</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <ul>
              <li className="contact-item">
                <i className="fas fa-map-marker-alt contact-icon"></i> 
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-envelope contact-icon"></i> 
                <span>info@bahir.edu.bd</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-phone-alt contact-icon"></i> 
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-clock contact-icon"></i> 
                <span>Sun - Thu: 9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} BAHIR — Bangladesh Academy of Health Innovation & Research. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
