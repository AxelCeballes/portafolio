import { useReveal } from '../../hooks/useReveal.js';
import { cn } from '../../lib/cn';

export function Reveal({ children, delay = 0, className, as: Tag = 'div' }) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
