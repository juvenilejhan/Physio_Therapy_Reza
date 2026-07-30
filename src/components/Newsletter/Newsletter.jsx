import { useCallback } from 'react';
import useFormSubmit, { email as validateEmail } from '../../hooks/useFormSubmit';
import './Newsletter.css';

const INITIAL = { email: '' };
const validate = (values) => ({ email: validateEmail(values.email) });

export default function Newsletter() {
  const submit = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }, []);

  const {
    values, errors, isSubmitting, isSuccess,
    formRef, handleChange, handleSubmit,
  } = useFormSubmit({ initialValues: INITIAL, validate, onSubmit: submit });

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <h2 className="section-title">Subscribe to BAHIR Media</h2>
        <p className="section-subtitle">
          Get the latest updates on healthcare innovation, research publications, and upcoming
          conferences directly in your inbox.
        </p>

        {isSuccess ? (
          <div className="form-status is-success" role="status">
            <i className="fas fa-circle-check" aria-hidden="true"></i>
            <span>
              <strong>You&apos;re on the list — subscription recorded.</strong><br />
              No mail server is connected to this demo build, so nothing was actually sent.
            </span>
          </div>
        ) : (
          <form ref={formRef} className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <div className="newsletter-field">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                value={values.email}
                onChange={handleChange}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
                className={errors.email ? 'has-error' : ''}
              />
              {errors.email && (
                <p className="newsletter-error" id="newsletter-email-error" role="alert">
                  <i className="fas fa-circle-exclamation" aria-hidden="true"></i> {errors.email}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? (
                <><span className="btn-spinner" aria-hidden="true"></span> Sending…</>
              ) : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
