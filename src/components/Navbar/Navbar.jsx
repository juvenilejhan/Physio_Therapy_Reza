import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Programs" },
  { to: "/faculty", label: "Faculty" },
  { to: "/media", label: "Media & Events" },
  { to: "/contact", label: "Contact" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the drawer on navigation. Scroll restoration is handled by
  // <ScrollToTop> in App.jsx — it isn't the navbar's job.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the drawer is open. The previous value is
  // captured and restored rather than cleared, so we don't stomp on an
  // overflow set by something else.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Escape closes; Tab is trapped inside the drawer so focus can't wander into
  // the page behind it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab" || !menuRef.current) return;

      const items = [
        ...menuRef.current.querySelectorAll(FOCUSABLE),
        toggleRef.current,
      ].filter(Boolean);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav id="navbar" className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <Link
          to="/"
          className="nav-logo"
          aria-label="BAHIR — Bangladesh Academy of Health Innovation & Research, home"
        >
          <img
            className="logo-mark"
            src="/assets/logo-56.png"
            srcSet="/assets/logo-56.png 1x, /assets/logo-112.png 2x"
            alt=""
            width="56"
            height="56"
            aria-hidden="true"
          />
          <span className="logo-text">
            <span className="logo-name">BAHIR</span>
            {/* The full institute name is long, so it steps down with the
                viewport. The link's aria-label carries it in full at every
                size, so nothing is lost when these are hidden. */}
            <span className="logo-tagline" aria-hidden="true">
              <span className="logo-tagline-full">
                Bangladesh Academy of Health Innovation &amp; Research
              </span>
              <span className="logo-tagline-short">
                Academy of Health Innovation &amp; Research
              </span>
            </span>
          </span>
        </Link>

        <div
          id="nav-menu"
          ref={menuRef}
          className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}
        >
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass} end={item.to === "/"}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Rendered inside the drawer as well as the desktop bar — previously
              `.nav-actions { display: none }` on mobile left these unreachable. */}
          <div className="nav-actions">
            <Link to="/contact" className="btn btn-primary btn-sm">
              Apply Now
            </Link>
          </div>
        </div>

        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"} aria-hidden="true"></i>
          </button>

          <button
            type="button"
            ref={toggleRef}
            className={`nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
            id="navToggle"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="nav-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
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
