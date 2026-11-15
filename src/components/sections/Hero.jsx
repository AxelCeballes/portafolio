import { facts, profile } from '../../data/profile.js';
import { Button } from '../ui/Button.jsx';
import { Icon } from '../ui/Icon.jsx';

function CodeCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-accent/15 via-electric/10 to-transparent blur-2xl" aria-hidden="true" />

      <div className="relative rounded-2xl border border-line bg-panel/80 p-1.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="overflow-hidden rounded-xl bg-[#050911]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            </div>
            <span className="font-mono text-[10px] text-muted">axel.config.js</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" aria-hidden="true" />
          </div>

          <div className="space-y-1 overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-xs">
            <p>
              <span className="text-electric">const</span>{' '}
              <span className="text-ink">axel</span> <span className="text-muted">=</span>{' '}
              <span className="text-muted">{'{'}</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">rol</span>
              <span className="text-muted">:</span>{' '}
              <span className="text-emerald-300/80">'Full Stack Developer'</span>
              <span className="text-muted">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">base</span>
              <span className="text-muted">:</span>{' '}
              <span className="text-emerald-300/80">'Buenos Aires, AR'</span>
              <span className="text-muted">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">formacion</span>
              <span className="text-muted">:</span>{' '}
              <span className="text-emerald-300/80">'ITBA'</span>
              <span className="text-muted">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">stack</span>
              <span className="text-muted">:</span> <span className="text-muted">[</span>
              <span className="text-emerald-300/80">'React'</span>
              <span className="text-muted">, </span>
              <span className="text-emerald-300/80">'Node'</span>
              <span className="text-muted">, </span>
              <span className="text-emerald-300/80">'MongoDB'</span>
              <span className="text-muted">]</span>
              <span className="text-muted">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">extra</span>
              <span className="text-muted">:</span> <span className="text-muted">[</span>
              <span className="text-emerald-300/80">'hardware'</span>
              <span className="text-muted">, </span>
              <span className="text-emerald-300/80">'soporte'</span>
              <span className="text-muted">, </span>
              <span className="text-emerald-300/80">'NFC'</span>
              <span className="text-muted">]</span>
              <span className="text-muted">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">disponible</span>
              <span className="text-muted">:</span>{' '}
              <span className="text-amber-300/90">true</span>
              <span className="text-muted">,</span>
            </p>
            <p>
              <span className="text-muted">{'}'}</span>
              <span className="text-muted">;</span>
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3 font-mono text-[10px]">
            <span className="flex items-center gap-1.5 text-emerald-300/80">
              <Icon name="check" className="h-3 w-3" strokeWidth={2.4} />
              build successful
            </span>
            <span className="text-muted">v2.0.0</span>
          </div>
        </div>
      </div>

      <div className="absolute -left-4 top-16 hidden animate-float rounded-xl border border-line bg-panel/90 px-3.5 py-2.5 shadow-xl backdrop-blur lg:block">
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted">En producción</p>
        <p className="font-display text-lg font-bold leading-tight text-ink">4+ proyectos</p>
      </div>

      <div className="absolute -right-3 bottom-12 hidden animate-float-slow items-center gap-2 rounded-xl border border-line bg-panel/90 px-3.5 py-2.5 shadow-xl backdrop-blur lg:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="font-mono text-[10px] text-muted">ITBA · Full Stack</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 grid-bg mask-radial opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-electric/10 blur-[130px]" aria-hidden="true" />

      <div className="container-page relative">
        <div className="grid items-center gap-14 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pt-0">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {profile.availability}
              </span>
            </div>

            <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[0.95] sm:text-6xl lg:text-[4.3rem]">
              Axel Omar
              <span className="mt-1 block text-gradient">Ceballes</span>
            </h1>

            <p className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent sm:text-[13px]">
              <Icon name="terminal" className="h-4 w-4" />
              {profile.role}
            </p>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {profile.heroLead}
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted/80">
              {profile.heroSupport}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#proyectos" icon="arrow-right">
                Ver proyectos
              </Button>
              <Button href={profile.cvUrl} variant="secondary" iconLeft="download" external>
                Descargar CV
              </Button>
              <Button href="#contacto" variant="ghost" icon="mail">
                Contactar
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted/70">
              <span className="flex items-center gap-1.5">
                <Icon name="map-pin" className="h-3.5 w-3.5 text-accent/70" />
                {profile.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
              <span>React · Node.js · MongoDB · Python</span>
            </div>
          </div>

          <CodeCard />
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-night/70 px-5 py-5 backdrop-blur">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {fact.label}
              </dt>
              <dd className="mt-1.5 font-display text-base font-bold text-ink sm:text-lg">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
