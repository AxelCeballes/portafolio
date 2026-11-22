import { highlights, profile } from '../../data/profile.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function About() {
  return (
    <section id="sobre-mi" className="relative border-t border-line/60 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="Sobre mí"
          title="Software a medida para operaciones reales."
          description="Perfil técnico y formación Full Stack orientados a construir herramientas claras, medibles y que la gente realmente usa."
        />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal className="space-y-5">
            {profile.summary.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-[15px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {['Merlo, Buenos Aires', 'ITBA', 'Remoto / Híbrido', 'Full time'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button href={profile.cvUrl} variant="secondary" iconLeft="download" external>
                Descargar CV
              </Button>
              <Button href={profile.linkedin} variant="ghost" icon="arrow-up-right" external>
                Ver LinkedIn
              </Button>
              <a
                href={profile.cvTextUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-center font-mono text-[10.5px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent"
              >
                Versión texto del CV (para formularios)
              </a>
            </div>
          </Reveal>

          <div className="space-y-4">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="card-hover flex gap-4 rounded-2xl border border-line bg-panel/40 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/[0.07] text-accent">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
