import { cn } from '../../lib/cn';

export function SectionHeading({ index, eyebrow, title, description, className }) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-accent/70" />
          <span className="eyebrow">
            {index} — {eyebrow}
          </span>
        </div>
        <h2 className="text-3xl font-bold leading-[1.1] text-balance sm:text-4xl lg:text-[2.7rem]">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">{description}</p>
      ) : null}
    </div>
  );
}
