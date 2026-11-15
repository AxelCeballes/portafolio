import { cn } from '../../lib/cn';
import { Icon } from './Icon.jsx';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60';

const sizes = {
  md: 'px-5 py-3 text-sm',
  sm: 'px-4 py-2 text-[13px]',
};

const variants = {
  primary:
    'btn-shine bg-accent text-night shadow-[0_16px_40px_-18px_rgba(239,68,68,0.85)] hover:bg-accent-soft hover:shadow-[0_20px_50px_-16px_rgba(239,68,68,0.9)]',
  secondary:
    'border border-line bg-white/[0.03] text-ink hover:border-accent/45 hover:bg-white/[0.06]',
  outline: 'border border-accent/40 text-accent hover:bg-accent/10',
  ghost: 'text-muted hover:text-ink',
};

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconLeft,
  external = false,
  type = 'button',
  ...props
}) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {iconLeft ? <Icon name={iconLeft} className="h-4 w-4" /> : null}
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
