import { cn } from '../../lib/cn';
import { Icon } from './Icon.jsx';

function Bar({ className }) {
  return <span className={cn('block rounded-full bg-white/15', className)} />;
}

function BrowserBar({ url }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex shrink-0 gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
      </div>
      <div className="flex h-4 min-w-0 flex-1 items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.04] px-2">
        <Icon name="shield" className="h-2 w-2 shrink-0 text-emerald-400/70" strokeWidth={2.2} />
        <span className="truncate font-mono text-[8px] leading-none text-muted">{url}</span>
      </div>
    </div>
  );
}

function LotusMock() {
  return (
    <div className="flex h-full">
      <div className="hidden w-[24%] shrink-0 flex-col gap-2 border-r border-white/[0.06] bg-white/[0.02] p-2 sm:flex">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-accent/80" />
          <Bar className="h-1 w-8" />
        </div>
        <div className="mt-1 space-y-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-1.5 rounded px-1 py-1',
                i === 1 && 'bg-accent/10',
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  i === 1 ? 'bg-accent/80' : 'bg-white/20',
                )}
              />
              <Bar className={cn('h-0.5', ['w-7', 'w-9', 'w-6', 'w-8'][i])} />
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-1.5 rounded border border-accent/15 bg-accent/5 p-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          <Bar className="h-0.5 w-7 bg-accent/40" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-2.5">
        <div className="flex items-center justify-between">
          <Bar className="h-1.5 w-16 bg-white/25" />
          <div className="flex gap-1">
            <span className="h-3 w-8 rounded bg-white/[0.06]" />
            <span className="h-3 w-8 rounded bg-accent/25" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded border border-white/[0.06] bg-white/[0.02] p-1.5">
              <Bar className="h-0.5 w-6" />
              <Bar className="mt-1.5 h-1 w-7 bg-accent/50" />
            </div>
          ))}
        </div>

        <div className="min-h-0 flex-1 rounded border border-white/[0.06]">
          <div className="grid grid-cols-4 gap-1 border-b border-white/[0.06] bg-white/[0.02] px-1.5 py-1">
            {[0, 1, 2, 3].map((i) => (
              <Bar key={i} className="h-0.5 w-5" />
            ))}
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-white/[0.04] px-1.5 py-[5px] last:border-0"
            >
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent/40" />
                <Bar className={cn('h-0.5', ['w-8', 'w-6', 'w-9', 'w-7'][i])} />
              </div>
              <Bar className="h-0.5 w-4 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SitecMock() {
  return (
    <div className="flex h-full flex-col gap-2 p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-electric/80" />
          <Bar className="h-1 w-14 bg-white/25" />
        </div>
        <div className="flex gap-1">
          <span className="h-1 w-3 rounded-full bg-white/15" />
          <span className="h-1 w-3 rounded-full bg-white/15" />
        </div>
      </div>

      <div className="flex flex-1 items-center gap-3 rounded border border-white/[0.06] bg-white/[0.02] p-2">
        <div
          className="relative h-14 w-14 shrink-0 rounded-full p-[5px]"
          style={{
            backgroundImage:
              'conic-gradient(#22d3ee 0 76%, rgba(255,255,255,0.07) 76% 100%)',
          }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#070d17]">
            <span className="font-mono text-[8px] font-medium text-accent">76%</span>
          </div>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded border border-white/[0.06] bg-white/[0.02] px-1.5 py-1">
              <Bar className="h-0.5 w-5" />
              <Bar className={cn('mt-1 h-1 w-6', i % 2 ? 'bg-electric/60' : 'bg-accent/60')} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded border border-white/[0.05] bg-white/[0.02] px-2 py-1.5"
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              <Bar className={cn('h-0.5', i ? 'w-10' : 'w-14')} />
            </div>
            <span className="rounded-full bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[6px] text-emerald-300/80">
              OK
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MuebleriaMock() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-2.5 py-1.5">
        <span className="font-display text-[8px] font-bold tracking-tight text-ink">JOTA</span>
        <div className="flex gap-1.5">
          <Bar className="h-0.5 w-4" />
          <Bar className="h-0.5 w-4" />
          <Bar className="h-0.5 w-4" />
        </div>
      </div>

      <div className="relative flex flex-1 items-center overflow-hidden px-2.5 py-2">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-transparent to-transparent" />
        <div className="relative">
          <span className="block font-display text-[10px] font-bold leading-tight text-ink">
            Muebles con historia
          </span>
          <Bar className="mt-1.5 h-0.5 w-16" />
          <span className="mt-2 inline-block rounded-sm bg-amber-300/80 px-2 py-1 font-mono text-[6px] font-medium text-[#1a1206]">
            Ver catálogo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 px-2.5 pb-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded border border-white/[0.06]">
            <div
              className={cn(
                'h-7 bg-gradient-to-br',
                i === 0
                  ? 'from-amber-400/30 to-amber-700/20'
                  : i === 1
                    ? 'from-stone-400/25 to-stone-700/20'
                    : 'from-orange-400/25 to-amber-800/20',
              )}
            />
            <div className="space-y-1 p-1">
              <Bar className="h-0.5 w-7" />
              <Bar className="h-0.5 w-4 bg-amber-300/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnigmaMock() {
  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-2.5 font-mono text-[7px] leading-relaxed sm:text-[8px]">
        <p className="text-emerald-300/80">$ python enigma.py</p>
        <p className="text-muted">ROTOR I · II · III</p>
        <p className="text-ink/70">
          INPUT&nbsp;&nbsp;<span className="text-ink">HOLA MUNDO</span>
        </p>
        <p className="text-ink/70">OUTPUT</p>
        <p className="break-all text-accent">XQZP LKJHG</p>
        <p className="mt-1 text-emerald-300/70">✓ 5 algoritmos reversibles</p>
      </div>

      <div className="hidden w-[30%] shrink-0 flex-col items-center justify-center gap-1.5 border-l border-white/[0.06] bg-white/[0.02] p-2 sm:flex">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex w-full items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-accent/70" />
            <span className="h-2.5 flex-1 rounded-[2px] border border-white/10 bg-white/[0.03] font-mono text-[5px] leading-[10px] text-muted">
              &nbsp;{['Q', 'W', 'E'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const mocks = {
  lotus: LotusMock,
  sitec: SitecMock,
  muebleria: MuebleriaMock,
  enigma: EnigmaMock,
};

export function ProjectCover({ project, className }) {
  if (project.image) {
    return (
      <div
        className={cn(
          'relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-night-soft',
          className,
        )}
      >
        <img
          src={project.image}
          alt={`Captura de pantalla de ${project.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const Mock = mocks[project.cover] ?? LotusMock;

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060a12]',
        className,
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', project.accent)} />
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative flex h-full flex-col p-2.5 sm:p-3.5">
        <BrowserBar url={project.demo ? project.demo.replace('https://', '') : project.name.toLowerCase()} />
        <div className="mt-2.5 min-h-0 flex-1 overflow-hidden rounded-lg border border-white/[0.07] bg-[#050911]/85">
          <Mock />
        </div>
      </div>
    </div>
  );
}
