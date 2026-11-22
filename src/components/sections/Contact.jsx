import { useState } from 'react';
import { profile, socials } from '../../data/profile.js';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button.jsx';
import { Icon, SocialIcon } from '../ui/Icon.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

const initialValues = { name: '', email: '', message: '', company: '' };

const feedback = {
  success: {
    tone: 'success',
    text: '¡Mensaje enviado! Gracias por escribirme, te respondo a la brevedad.',
  },
  mailto: {
    tone: 'info',
    text: 'Abrimos tu cliente de correo con el mensaje listo para enviar.',
  },
  invalid: {
    tone: 'error',
    text: 'Completá nombre, email y mensaje para continuar.',
  },
  error: {
    tone: 'error',
    text: `No se pudo enviar el mensaje. Escribime directo a ${profile.email}.`,
  },
};

const toneClasses = {
  success: 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200',
  info: 'border-accent/25 bg-accent/[0.07] text-accent-soft',
  error: 'border-rose-400/25 bg-rose-400/[0.07] text-rose-200',
};

export function Contact() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  const sending = status === 'sending';
  const message = feedback[status];

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (status === 'invalid' || status === 'error') setStatus('idle');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;

    const name = values.name.trim();
    const email = values.email.trim();
    const body = values.message.trim();

    // Honeypot: bots complete hidden fields, humans never see them.
    if (values.company) {
      setStatus('success');
      return;
    }

    if (!name || !email || !body) {
      setStatus('invalid');
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Contacto desde el portafolio — ${name}`);
      const content = encodeURIComponent(`${body}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${content}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message: body, _subject: `Portafolio — ${name}` }),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden border-t border-line/60 py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 animate-glow rounded-full bg-accent/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 animate-glow-slow rounded-full bg-accent-deep/[0.12] blur-[110px]" aria-hidden="true" />

      <div className="container-page relative">
        <SectionHeading
          index="04"
          eyebrow="Contacto"
          title="¿Construimos algo juntos?"
          description="Busco mi próximo rol full time y también tomo proyectos freelance. Si te interesa mi perfil, escribime."
        />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col">
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              Contame qué necesitás: un sistema de gestión, una web nueva o sumar a alguien a tu
              equipo. Respondo en menos de 24 horas.
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  {...(social.id === 'email'
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-panel/40 px-4 py-3.5 transition-colors hover:border-accent/35 hover:bg-white/[0.04]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition-colors group-hover:text-accent">
                    <SocialIcon name={social.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                      {social.label}
                    </span>
                    <span className="block truncate text-sm text-ink">{social.handle}</span>
                  </span>
                  <Icon
                    name="arrow-up-right"
                    className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </a>
              ))}
            </div>

            <div className="mt-3">
              <Button variant="secondary" size="sm" iconLeft="copy" onClick={copyEmail}>
                {copied ? 'Email copiado' : 'Copiar email'}
              </Button>
            </div>

            <div className="mt-7 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/90">
                  Disponible
                </p>
              </div>
              <p className="mt-2 text-sm text-ink/90">{profile.availability}</p>
              <p className="mt-1 font-mono text-[10px] text-muted/70">
                Merlo, Buenos Aires · Remoto / Híbrido · GMT-3
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-line bg-panel/50 p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Mandame un mensaje</h3>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  &lt; 24 h
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={update}
                    placeholder="Tu nombre"
                    className="form-field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={values.email}
                    onChange={update}
                    placeholder="vos@email.com"
                    className="form-field"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  value={values.message}
                  onChange={update}
                  placeholder="Contame sobre tu proyecto o la posición que tenés en mente…"
                  className="form-field resize-none"
                />
              </div>

              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="company">Empresa</label>
                <input
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={update}
                />
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={sending}
                  icon={sending ? undefined : 'send'}
                >
                  {sending ? 'Enviando…' : 'Enviar mensaje'}
                </Button>
              </div>

              <p className="mt-3 text-center text-[11px] text-muted/60">
                Tus datos se usan únicamente para responderte.
              </p>

              <div aria-live="polite" aria-atomic="true">
                {message ? (
                  <p
                    className={cn(
                      'mt-4 rounded-xl border px-3.5 py-2.5 text-center text-xs',
                      toneClasses[message.tone],
                    )}
                  >
                    {message.text}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
