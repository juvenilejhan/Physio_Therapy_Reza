import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './styles/variables.css';
import './styles/hero-image.css';
import './styles/global.css';
import './styles/animations.css';
import './App.css';

// Route-level code splitting — the whole site used to ship as one bundle, so a
// visitor landing on the home page downloaded every other page's components too.
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const FacultyPage = lazy(() => import('./pages/FacultyPage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteFallback() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <div className="route-loading-bar">
        <div className="route-loading-fill"></div>
      </div>
      <p>Loading…</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Preloader />
      <a className="skip-link" href="#main">Skip to main content</a>
      <Navbar />
      <main id="main">
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/privacy" element={<LegalPage slug="privacy" />} />
              <Route path="/terms" element={<LegalPage slug="terms" />} />
              <Route path="/cookies" element={<LegalPage slug="cookies" />} />

              {/* Catch-all: unknown URLs used to render an empty <main>. */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
