import './FormField.css';

/**
 * Labelled form control with inline error messaging.
 *
 * Wires up the accessibility contract that hand-rolled fields keep dropping:
 * a real <label for>, `aria-invalid`, and `aria-describedby` pointing at both
 * the hint and the error so screen readers announce them with the field.
 *
 * @param {string}  id        DOM id; also used to derive hint/error ids
 * @param {string}  name      form field name — must match the validator key
 * @param {string}  label     visible label text
 * @param {string}  [as]      'input' | 'textarea' | 'select'
 * @param {string}  [error]   error message; presence marks the field invalid
 * @param {string}  [hint]    static helper text
 * @param {boolean} [required]
 */
export default function FormField({
  id,
  name,
  label,
  as = 'input',
  type = 'text',
  error,
  hint,
  required = false,
  children,
  className = '',
  ...rest
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const shared = {
    id,
    name,
    required,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    className: `form-control ${error ? 'has-error' : ''}`,
    ...rest,
  };

  return (
    <div className={`form-field ${className}`}>
      <label className="form-label" htmlFor={id}>
        {label}
        {required && <span className="form-required" aria-hidden="true"> *</span>}
        {!required && <span className="form-optional"> (optional)</span>}
      </label>

      {hint && <p className="form-hint" id={hintId}>{hint}</p>}

      {as === 'textarea' && <textarea rows={5} {...shared} />}
      {as === 'select' && <select {...shared}>{children}</select>}
      {as === 'input' && <input type={type} {...shared} />}

      {error && (
        <p className="form-error" id={errorId} role="alert">
          <i className="fas fa-circle-exclamation" aria-hidden="true"></i> {error}
        </p>
      )}
    </div>
  );
}
