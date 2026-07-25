import useScrollReveal from '../../hooks/useScrollReveal';
import './CTA.css';

export default function CTA() {
  const contentRef = useScrollReveal();

  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content reveal" ref={contentRef}>
          <h2 className="cta-title">Ready to Advance Your Career?</h2>
          <p className="cta-text">Join thousands of successful healthcare professionals who have elevated their practice with our specialized programs.</p>
          
          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <div className="cta-input-group">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Get Prospectus</button>
            </div>
            <p className="cta-disclaimer">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
