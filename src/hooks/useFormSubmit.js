import { useState, useCallback, useRef } from 'react';

/**
 * Form state, validation and submission lifecycle, shared by the three forms
 * on the site (CTA prospectus, newsletter, contact enquiry).
 *
 * There is no backend. Validation and the success state are entirely
 * client-side, and the success copy each form shows says the enquiry has been
 * *recorded* rather than *sent* — the UI must not claim a delivery that isn't
 * happening. Swap `onSubmit` for a real fetch when an endpoint exists; nothing
 * else here has to change.
 *
 * @param {object}   initialValues  field name -> initial value
 * @param {Function} validate       (values) => ({ field: 'message' })
 * @param {Function} [onSubmit]     async (values) => void
 */
export default function useFormSubmit({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const formRef = useRef(null);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it — re-validating on
    // every keystroke is noisy, but leaving a stale error is worse.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    setStatus((prev) => (prev === 'success' ? 'idle' : prev));
  }, []);

  const focusFirstError = useCallback((fieldErrors) => {
    const first = Object.keys(fieldErrors).find((key) => fieldErrors[key]);
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector(`[name="${first}"]`);
    el?.focus();
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const fieldErrors = validate(values);
      const hasErrors = Object.values(fieldErrors).some(Boolean);

      if (hasErrors) {
        setErrors(fieldErrors);
        setStatus('error');
        focusFirstError(fieldErrors);
        return;
      }

      setErrors({});
      setStatus('submitting');

      try {
        await onSubmit?.(values);
        setValues(initialValues);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    },
    [values, validate, onSubmit, initialValues, focusFirstError]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
  }, [initialValues]);

  return {
    values,
    errors,
    status,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    formRef,
    handleChange,
    handleSubmit,
    setValues,
    reset,
  };
}

/* ==========================================================================
   Shared validators
   ========================================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const required = (value, label) =>
  !value || !String(value).trim() ? `${label} is required.` : undefined;

export const email = (value) => {
  if (!value || !value.trim()) return 'Email address is required.';
  if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address, e.g. name@example.com.';
  return undefined;
};

export const minLength = (value, n, label) =>
  value && value.trim().length < n ? `${label} must be at least ${n} characters.` : undefined;

/** Optional field: only validated when the user has typed something. */
export const optionalPhone = (value) => {
  if (!value || !value.trim()) return undefined;
  return /^[\d\s+()-]{6,}$/.test(value.trim())
    ? undefined
    : 'Enter a valid phone number, or leave this blank.';
};
