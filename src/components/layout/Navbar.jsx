import { useEffect, useState } from 'react';
import { navLinks, profile } from '../../data/profile.js';
import { cn } from '../../lib/cn';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { Button } from '../ui/Button.jsx';
import { GithubIcon, Icon } from '../ui/Icon.jsx';

const SECTION_IDS = navLinks.map((link) => link.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, Math.max(0, y / height)) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-line/80 bg-night/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-accent via-cyan-300 to-electric"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <nav
        className="container-page flex h-16 items-center justify-between gap-4 sm:h-[72px]"
        aria-label="Navegación principal"
      >
        <a href="#inicio" className="group flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-display text-sm font-extrabold text-accent transition-colors group-hover:bg-accent/15"
          >
            AC
          </span>
          <span
            aria-hidden="true"
            className="hidden font-display text-sm font-bold tracking-tight sm:block"
          >
            axel<span className="text-accent">.</span>dev
          </span>
          <span className="sr-only">Axel Ceballes — ir al inicio</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors',
                  active === link.id ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-3.5 -bottom-0.5 h-px bg-accent transition-opacity duration-300',
                    active === link.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de GitHub de Axel Ceballes"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-ink"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <Button href="#contacto" size="sm" icon="arrow-up-right">
            Hablemos
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-accent/40 md:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-t border-line/70 bg-night/95 backdrop-blur-xl transition-all duration-300 md:hidden',
          open ? 'visible max-h-[460px] opacity-100' : 'invisible max-h-0 border-transparent opacity-0',
        )}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center justify-between border-b border-line/50 py-3.5 text-[15px] font-medium transition-colors',
                active === link.id ? 'text-accent' : 'text-ink',
              )}
            >
              {link.label}
              <Icon name="arrow-up-right" className="h-4 w-4 text-muted" />
            </a>
          ))}

          <div className="mt-4 flex gap-2">
            <Button href="#contacto" className="flex-1" onClick={() => setOpen(false)}>
              Hablemos
            </Button>
            <Button
              href={profile.cvUrl}
              variant="secondary"
              iconLeft="download"
              external
              onClick={() => setOpen(false)}
            >
              CV
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
