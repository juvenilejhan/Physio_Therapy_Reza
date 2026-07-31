import { useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFormSubmit, { required, email, minLength, optionalPhone } from '../../hooks/useFormSubmit';
import FormField from '../FormField/FormField';
import { enquirySubjects } from '../../data/contact';
import { allPrograms } from '../../data/programs';
import { SUPPORT_SERVICES } from '../../data/support';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

function validate(values) {
  return {
    name: required(values.name, 'Full name'),
    email: email(values.email),
    phone: optionalPhone(values.phone),
    subject: required(values.subject, 'Subject'),
    message:
      required(values.message, 'Message') || minLength(values.message, 20, 'Message'),
  };
}

export default function ContactForm() {
  const [searchParams] = useSearchParams();

  // Programme cards link here as /contact?program=<id> so the enquiry arrives
  // with context instead of dumping the user on an empty form.
  const preselected = useMemo(() => {
    const id = Number(searchParams.get('program'));
    return allPrograms.find((p) => p.id === id);
  }, [searchParams]);

  // Support service cards link here as /contact?subject=support&service=<id>.
  const preselectedService = useMemo(() => {
    const id = Number(searchParams.get('service'));
    return SUPPORT_SERVICES.find((s) => s.id === id);
  }, [searchParams]);

  // Events link here as /contact?subject=events; programme cards as ?program=<id>.
  const subjectParam = searchParams.get('subject');
  const initialValues = useMemo(() => {
    if (preselected) {
      return {
        ...INITIAL,
        subject: 'admissions',
        message: `I'd like more information about "${preselected.name}".\n\n`,
      };
    }
    if (preselectedService) {
      return {
        ...INITIAL,
        subject: 'support',
        message: `I'd like to enquire about "${preselectedService.title}".\n\n`,
      };
    }
    if (enquirySubjects.some((s) => s.value === subjectParam)) {
      return { ...INITIAL, subject: subjectParam };
    }
    return INITIAL;
  }, [preselected, preselectedService, subjectParam]);

  const submit = useCallback(async () => {
    // No backend exists. The delay makes the submitting state observable; the
    // success copy below says "recorded", never "sent".
    await new Promise((resolve) => setTimeout(resolve, 700));
  }, []);

  const {
    values, errors, status, isSubmitting, isSuccess,
    formRef, handleChange, handleSubmit,
  } = useFormSubmit({ initialValues, validate, onSubmit: submit });

  const hasErrors = status === 'error';

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
      <h2 className="contact-form-title">Send us an enquiry</h2>
      <p className="contact-form-intro">
        Fill in the form and the relevant team will respond within two working days.
        Fields marked <span aria-hidden="true">*</span><span className="sr-only">star</span> are required.
      </p>

      {isSuccess && (
        <div className="form-status is-success" role="status">
          <i className="fas fa-circle-check" aria-hidden="true"></i>
          <span>
            <strong>Thank you — your enquiry has been recorded.</strong><br />
            This site is a demonstration build with no mail server connected, so nothing has
            actually been transmitted. Please email{' '}
            <a href="mailto:info@bahir.edu.bd">info@bahir.edu.bd</a> to reach us for real.
          </span>
        </div>
      )}

      {hasErrors && (
        <div className="form-status is-error" role="alert">
          <i className="fas fa-circle-exclamation" aria-hidden="true"></i>
          <span>Please correct the highlighted fields and try again.</span>
        </div>
      )}

      <div className="contact-form-row">
        <FormField
          id="contact-name" name="name" label="Full name" required
          value={values.name} onChange={handleChange}
          error={errors.name} autoComplete="name" placeholder="Your name"
        />
        <FormField
          id="contact-email" name="email" label="Email address" type="email" required
          value={values.email} onChange={handleChange}
          error={errors.email} autoComplete="email" placeholder="name@example.com"
        />
      </div>

      <div className="contact-form-row">
        <FormField
          id="contact-phone" name="phone" label="Phone" type="tel"
          value={values.phone} onChange={handleChange}
          error={errors.phone} autoComplete="tel" placeholder="+880 1XXX-XXXXXX"
        />
        <FormField
          id="contact-subject" name="subject" label="Subject" as="select" required
          value={values.subject} onChange={handleChange} error={errors.subject}
        >
          <option value="">Choose a subject…</option>
          {enquirySubjects.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </FormField>
      </div>

      <FormField
        id="contact-message" name="message" label="Message" as="textarea" required
        value={values.message} onChange={handleChange} error={errors.message}
        hint="Tell us what you need — the more detail, the better we can help."
        placeholder="How can we help?"
      />

      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? (
          <><span className="btn-spinner" aria-hidden="true"></span> Sending…</>
        ) : (
          <>Send enquiry <i className="fas fa-paper-plane" aria-hidden="true"></i></>
        )}
      </button>

      <p className="contact-form-privacy">
        We use your details only to answer this enquiry. See our{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
