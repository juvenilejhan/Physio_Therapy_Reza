import { useCallback } from 'react';
import useFormSubmit, { email as validateEmail } from '../../hooks/useFormSubmit';
import Reveal from '../Reveal/Reveal';
import './CTA.css';

const INITIAL = { email: '' };
const validate = (values) => ({ email: validateEmail(values.email) });

export default function CTA() {
  const submit = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }, []);

  const {
    values, errors, isSubmitting, isSuccess,
    formRef, handleChange, handleSubmit,
  } = useFormSubmit({ initialValues: INITIAL, validate, onSubmit: submit });

  return (
    <section className="cta">
      <div className="container">
        <Reveal className="cta-content">
          <h2 className="cta-title">Ready to Advance Your Career?</h2>
          <p className="cta-text">
            Join thousands of successful healthcare professionals who have elevated their practice
            with our specialized programs.
          </p>

          {isSuccess ? (
            <div className="cta-success" role="status">
              <i className="fas fa-circle-check" aria-hidden="true"></i>
              <p>
                <strong>Thanks — your request has been recorded.</strong><br />
                This demo build has no mail server attached, so nothing was actually sent.
                Email <a href="mailto:info@bahir.edu.bd">info@bahir.edu.bd</a> to reach us.
              </p>
            </div>
          ) : (
            <form ref={formRef} className="cta-form" onSubmit={handleSubmit} noValidate>
              <div className="cta-input-group">
                <label className="sr-only" htmlFor="cta-email">Email address</label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'cta-email-error' : undefined}
                  className={errors.email ? 'has-error' : ''}
                />
                <button type="submit" className="btn btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? (
                    <><span className="btn-spinner" aria-hidden="true"></span> Sending…</>
                  ) : 'Get Prospectus'}
                </button>
              </div>

              {errors.email && (
                <p className="cta-error" id="cta-email-error" role="alert">
                  <i className="fas fa-circle-exclamation" aria-hidden="true"></i> {errors.email}
                </p>
              )}

              <p className="cta-disclaimer">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
