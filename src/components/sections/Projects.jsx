import { profile } from '../../data/profile.js';
import { projects } from '../../data/projects.js';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button.jsx';
import { GithubIcon, Icon } from '../ui/Icon.jsx';
import { ProjectCover } from '../ui/ProjectCover.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

function StatusPill({ status }) {
  const isLive = /producción|desplegado/i.test(status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em]',
        isLive
          ? 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300/90'
          : 'border-accent/20 bg-accent/[0.06] text-accent/90',
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          isLive ? 'bg-emerald-400' : 'bg-accent',
        )}
      />
      {status}
    </span>
  );
}

function StackTags({ items, limit }) {
  const visible = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - visible.length : 0;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {visible.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-muted"
        >
          {item}
        </li>
      ))}
      {rest > 0 ? (
        <li className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[10px] text-muted/70">
          +{rest}
        </li>
      ) : null}
    </ul>
  );
}

function RepoLink({ href, compact }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/[0.03] font-semibold text-ink transition-all duration-300 hover:border-accent/45 hover:bg-white/[0.06]',
        compact ? 'px-4 py-2 text-[13px]' : 'px-5 py-3 text-sm',
      )}
    >
      <GithubIcon className="h-4 w-4" />
      Código
    </a>
  );
}

function ProjectLinks({ project, compact = false }) {
  if (!project.demo && !project.repo) {
    return (
      <p className="mt-5 font-mono text-[11px] leading-relaxed text-muted/70">{project.note}</p>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5">
      {project.demo ? (
        <Button
          href={project.demo}
          external
          size={compact ? 'sm' : 'md'}
          icon="arrow-up-right"
        >
          Ver demo
        </Button>
      ) : null}
      {project.repo ? <RepoLink href={project.repo} compact={compact} /> : null}
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-line bg-panel/40 transition-colors duration-300 hover:border-accent/30">
      <div className="grid gap-2 lg:grid-cols-[1fr_1.05fr]">
        <div className="order-2 flex flex-col justify-center p-5 sm:p-8 lg:order-1 lg:p-9">
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusPill status={project.status} />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              {project.client} · {project.year}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold sm:text-[1.75rem]">{project.name}</h3>
          <p className="mt-1 font-mono text-xs text-accent">{project.tagline}</p>

          <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-5 space-y-2">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[13px] text-muted">
                <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.4} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <StackTags items={project.stack} />
          </div>

          <ProjectLinks project={project} />
        </div>

        <div className="order-1 p-2 lg:order-2 lg:p-3">
          <ProjectCover project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel/40">
      <div className="p-2">
        <ProjectCover project={project} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-muted/60">{project.index}</span>
          <StatusPill status={project.status} />
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug sm:text-xl">{project.name}</h3>
        <p className="mt-1 font-mono text-[10.5px] text-accent/90">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-auto pt-4">
          <StackTags items={project.stack} limit={4} />
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="proyectos" className="relative border-t border-line/60 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow="Trabajo"
          title="Proyectos reales, en producción."
          description="Sistemas que resuelven operaciones concretas: control de pañol, asistencia, inventario y e-commerce."
        />

        {featured ? (
          <Reveal>
            <FeaturedProject project={featured} />
          </Reveal>
        ) : null}

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-panel/40 px-6 py-5 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            Hay más código, experimentos y proyectos en curso en mi GitHub.
          </p>
          <Button href={profile.github} external variant="outline" icon="arrow-up-right">
            Ver GitHub
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
