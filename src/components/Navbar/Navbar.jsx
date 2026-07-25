import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import "./Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location.pathname]);

  return (
    <nav id="navbar" className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="/assets/hero.jpeg"
            alt="BAHIR Logo"
            className="logo-img"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="logo-text">
            <span className="logo-name">BAHIR</span>
            <span className="logo-tagline">Health Innovation</span>
          </div>
        </Link>

        <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Programs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faculty"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Faculty
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/media"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Media & Events
            </NavLink>
          </li>
        </ul>

        <div
          className="nav-right"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <div className="nav-actions">
            <a href="#apply" className="btn btn-outline apply-btn">
              Apply Now
            </a>
            <a
              href="#"
              className="btn btn-primary btn-sm"
              id="getStartedBtn"
              onClick={(e) => e.preventDefault()}
            >
              Get Started
            </a>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>

          <button
            className={`nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
            id="navToggle"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
