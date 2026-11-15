const technologies = [
  'React',
  'Node.js',
  'MongoDB',
  'Express',
  'Vite',
  'Tailwind CSS',
  'JavaScript',
  'Python',
  'APIs REST',
  'Git',
  'Linux',
  'NFC',
  'Códigos de barras',
];

function Row({ duplicate = false }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-2 pr-2"
      {...(duplicate ? { 'aria-hidden': 'true' } : {})}
    >
      {technologies.map((technology) => (
        <li
          key={technology}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted"
        >
          <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden="true" />
          {technology}
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Tecnologías con las que trabajo"
      className="marquee relative border-t border-line/60 bg-night-soft/40 group"
    >
      <div className="marquee-mask overflow-hidden py-4">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          <Row />
          <Row duplicate />
        </div>
      </div>
    </section>
  );
}
