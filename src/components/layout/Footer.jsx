import { navLinks, profile, socials } from '../../data/profile.js';
import { SocialIcon, Icon } from '../ui/Icon.jsx';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 bg-night-soft/50">
      <div className="container-page py-12 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <a href="#inicio" className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-display text-sm font-extrabold text-accent"
              >
                AC
              </span>
              <span aria-hidden="true" className="font-display text-sm font-bold tracking-tight">
                axel<span className="text-accent">.</span>dev
              </span>
              <span className="sr-only">Axel Ceballes — volver al inicio</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Desarrollo web Full Stack. Sistemas de gestión, paneles en tiempo real y experiencias
              cuidadas al detalle.
            </p>
          </div>

          <nav aria-label="Navegación del pie" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 md:gap-x-16">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Contacto
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.id === 'email' ? undefined : '_blank'}
                  rel={social.id === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.02] text-muted transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
            <a
              href="#inicio"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
            >
              <Icon name="arrow-up" className="h-3.5 w-3.5" />
              Volver arriba
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line/60 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}. Todos los derechos reservados.</p>
          <p className="font-mono">React · Vite · Tailwind CSS · Deploy en Vercel</p>
        </div>
      </div>
    </footer>
  );
}
