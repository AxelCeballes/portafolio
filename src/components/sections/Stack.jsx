import { stackGroups } from '../../data/stack.js';
import { Icon } from '../ui/Icon.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function Stack() {
  return (
    <section id="stack" className="relative border-t border-line/60 py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[110px]" aria-hidden="true" />

      <div className="container-page relative">
        <SectionHeading
          index="03"
          eyebrow="Stack técnico"
          title="Herramientas que uso para construirlo."
          description="Un stack enfocado en entregar rápido, mantener simple y escalar cuando el proyecto lo pide."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {stackGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 90}>
              <article className="card-hover flex h-full flex-col rounded-3xl border border-line bg-panel/40 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/20 bg-accent/[0.07] text-accent">
                    <Icon name={group.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold">{group.title}</h3>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-muted">{group.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.02] px-2.5 py-1.5 text-xs text-ink/90 transition-colors hover:border-accent/30 hover:text-accent"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent/50" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5 flex flex-col gap-3 rounded-2xl border border-line bg-panel/40 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Icon name="sparkles" className="h-4 w-4 text-accent" />
            <p className="text-sm text-muted">
              Formación continua en integración de IA, automatización y buenas prácticas de
              accesibilidad.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
            Siempre aprendiendo
          </span>
        </Reveal>
      </div>
    </section>
  );
}
