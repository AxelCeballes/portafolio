export const profile = {
  name: 'Axel Omar Ceballes',
  shortName: 'Axel Ceballes',
  role: 'Desarrollador Web Full Stack',
  location: 'Buenos Aires, Argentina',
  email: 'axelceballes9@gmail.com',
  github: 'https://github.com/AxelCeballes',
  linkedin: 'https://www.linkedin.com/in/ceballesaxel79/',
  siteUrl: 'https://portafolio-axelceballes.vercel.app/',
  cvUrl: '/CV-Axel-Ceballes.pdf',
  availability: 'Disponible para proyectos y roles full time',
  education: 'Instituto Tecnológico de Buenos Aires (ITBA)',
  heroLead:
    'Desarrollador Full Stack con formación en ITBA y experiencia resolviendo problemas reales mediante software a medida, sistemas de gestión e interfaces modernas.',
  heroSupport:
    'Combino el desarrollo web con una base sólida en hardware, mantenimiento técnico y operaciones: entiendo el problema en el taller y lo resuelvo en el código.',
  summary: [
    'Soy Axel Omar Ceballes, desarrollador web Full Stack radicado en Buenos Aires. Mi formación en el Instituto Tecnológico de Buenos Aires (ITBA) y mi recorrido técnico me llevaron a construir sistemas de gestión, control de inventario, asistencia de personal y herramientas internas que reemplazan planillas y procesos manuales.',
    'Antes de escribir código trabajé años en mantenimiento, operaciones y soporte técnico. Esa base —diagnosticar, entender el problema, documentarlo y resolverlo— es la misma que aplico hoy al desarrollar: escuchar al usuario, diseñar la solución y entregarla funcionando en producción.',
  ],
};

export const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'stack', label: 'Stack' },
  { id: 'contacto', label: 'Contacto' },
];

export const socials = [
  { id: 'github', label: 'GitHub', handle: '@AxelCeballes', href: profile.github, icon: 'github' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'ceballesaxel79',
    href: profile.linkedin,
    icon: 'linkedin',
  },
  {
    id: 'email',
    label: 'Email',
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
  },
];

export const highlights = [
  {
    icon: 'graduation',
    title: 'Formación ITBA',
    description:
      'Desarrollo Web Full Stack en el Instituto Tecnológico de Buenos Aires. Frontend, backend, bases de datos y despliegue.',
  },
  {
    icon: 'cpu',
    title: 'Hardware y operaciones',
    description:
      'Diagnóstico técnico, mantenimiento, Linux y experiencia integrando lectores de códigos de barras y tarjetas NFC con software.',
  },
  {
    icon: 'layers',
    title: 'Software que se usa',
    description:
      'Sistemas de gestión, paneles administrativos en tiempo real y e-commerce con base de datos en la nube.',
  },
];

export const facts = [
  { value: '4+', label: 'Proyectos desplegados' },
  { value: 'Full Stack', label: 'React · Node.js · MongoDB' },
  { value: 'ITBA', label: 'Formación profesional' },
  { value: 'Buenos Aires', label: 'Argentina · Remoto' },
];
