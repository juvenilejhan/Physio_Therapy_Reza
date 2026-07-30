import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * Wraps children in a scroll-revealed element.
 *
 * Replaces the pattern of calling useScrollReveal() once per element in a
 * component (About.jsx previously called it ten times), which spun up an
 * IntersectionObserver per node and forced every revealed element to be
 * declared at the top of the component.
 *
 * @param {string} as         element to render (default 'div')
 * @param {string} className  additional classes; 'reveal' is always applied
 * @param {number} delay      0-4, maps to the .delay-N animation classes
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  ...rest
}) {
  const ref = useScrollReveal();
  const delayClass = delay > 0 ? ` delay-${delay}` : '';

  return (
    <Tag ref={ref} className={`reveal${delayClass}${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Tag>
  );
}
