export const profile = {
  name: 'Axel Omar Ceballes',
  shortName: 'Axel Ceballes',
  role: 'Desarrollador Web Full Stack',
  location: 'Merlo, Buenos Aires',
  email: 'axelceballes9@gmail.com',
  github: 'https://github.com/AxelCeballes',
  linkedin: 'https://www.linkedin.com/in/ceballesaxel79/',
  siteUrl: 'https://axelceballes.vercel.app/',
  cvUrl: '/CV-Axel-Ceballes.pdf',
  availability: 'Disponible para proyectos y roles full time',
  education: 'Instituto Tecnológico de Buenos Aires (ITBA)',
  heroLead:
    'Desarrollador Full Stack con formación en ITBA y experiencia resolviendo problemas reales mediante software a medida, sistemas de gestión e interfaces modernas.',
  heroSupport:
    'Trabajo con React, Node.js y MongoDB construyendo sistemas de gestión, paneles en tiempo real y e-commerce que se usan todos los días en producción.',
  summary: [
    'Soy Axel Omar Ceballes, desarrollador web Full Stack de Merlo, Buenos Aires. Mi formación en el Instituto Tecnológico de Buenos Aires (ITBA) y mi recorrido técnico me llevaron a construir sistemas de gestión, control de inventario, asistencia de personal y herramientas internas que reemplazan planillas y procesos manuales.',
    'Mi forma de trabajar combina criterio operativo con desarrollo: relevo el proceso actual, detecto dónde se pierde tiempo y diseño la solución junto al usuario. Documento cada entrega, acompaño la puesta en marcha y la ajusto con datos de uso reales.',
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
      'Desarrollo Web Full Stack en el Instituto Tecnológico de Buenos Aires (2026). Frontend, backend, bases de datos y despliegue.',
  },
  {
    icon: 'cpu',
    title: 'Operaciones y soporte',
    description:
      'Experiencia en mantenimiento y soporte técnico (2023–2026), Linux e integración de lectores de códigos de barras y tarjetas NFC con software.',
  },
  {
    icon: 'layers',
    title: 'Software que se usa',
    description:
      'Sistemas de gestión, paneles administrativos en tiempo real y e-commerce con base de datos en la nube.',
  },
  {
    icon: 'shield',
    title: 'Ciberseguridad en formación',
    description:
      'Tecnicatura en Ciberseguridad en UNAHUR (en curso) y 140 horas de capacitación en Fundación Empujar.',
  },
];

export const facts = [
  { value: '3', label: 'Proyectos desplegados en 2026' },
  { value: 'Full Stack', label: 'React · Node.js · MongoDB' },
  { value: 'ITBA', label: 'Formación profesional' },
  { value: 'Merlo', label: 'Buenos Aires · Remoto' },
];
