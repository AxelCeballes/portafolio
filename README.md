# Portafolio — Axel Omar Ceballes

Sitio personal y portafolio profesional de **Axel Omar Ceballes**, Desarrollador Web Full Stack
(Merlo, Buenos Aires, Argentina).

> Rediseño completo del sitio anterior: se reemplazó el `index.html` monolítico por una aplicación
> React + Vite con componentes reutilizables, Tailwind CSS v4 y contenido centralizado en datos.

**Demo:** https://axelceballes.vercel.app

---

## Stack

| Área | Tecnología |
|---|---|
| UI | React 18, componentes funcionales y hooks |
| Build | Vite 5 |
| Estilos | Tailwind CSS v4 (`@theme`, design tokens) |
| Tipografía | Plus Jakarta Sans, Inter y JetBrains Mono |
| SEO | Meta tags, Open Graph, Twitter Card, JSON-LD (schema.org/Person), `robots.txt`, `sitemap.xml` |
| Deploy | Vercel (framework Vite) |

Sin dependencias de animación: los reveals usan `IntersectionObserver` + CSS, el fondo de puntos
3D (`SpectralDrape`) y la banda ASCII (`AsciiRipple`) son canvas 2D propios, y el resto son
keyframes propios (`enter`, `glow`, `marquee`, `shimmer`, `blink`). Todo respeta
`prefers-reduced-motion`.

## Características

- Dark mode por defecto con paleta negro y rojo, estética minimalista y alto contraste.
- Navbar fija con scroll suave, sección activa, barra de progreso y menú mobile accesible.
- Hero con CTAs (Ver proyectos / Descargar CV / Contactar), tarjeta de código y entrada animada.
- Marquee de tecnologías con pausa al interactuar y copia duplicada oculta para lectores de pantalla.
- Sobre mí con formación ITBA, perfil técnico y diferenciales (hardware, operaciones, soporte).
- Proyectos con portadas, stack, estado, demo en vivo y repositorio.
- Stack técnico organizado por categorías.
- Formulario de contacto funcional con validación, honeypot y fallback a `mailto`.
- 100 % responsive (mobile-first), sin overflow horizontal desde 360 px.
- Accesibilidad: skip link, landmarks, foco visible, `aria-*`, contraste y jerarquía de headings.
- Lighthouse local: **100 / 100 / 100** (accesibilidad, buenas prácticas, SEO).

## Estructura

```text
.
├── index.html                  # shell HTML + SEO/OG + JSON-LD
├── vercel.json                 # build, output y headers de caché
├── .env.example                # endpoint opcional del formulario
├── public/
│   ├── favicon.svg
│   ├── og-image.png            # 1200 × 630 para redes
│   ├── CV-Axel-Ceballes.pdf    # CV de una página
│   ├── robots.txt
│   ├── sitemap.xml
│   └── projects/               # capturas WebP reales de los 6 proyectos
├── scripts/
│   ├── og.html                 # fuente del OG image
│   └── cv.html                 # fuente del CV (print to PDF)
└── src/
    ├── App.jsx                 # composición de la página
    ├── index.css               # design tokens, base y utilidades
    ├── components/
    │   ├── layout/             # Navbar, Footer
    │   ├── sections/           # Hero, About, Projects, Stack, Contact
    │   └── ui/                 # Button, Icon, SectionHeading, Reveal, ProjectCover, TechMarquee
    ├── data/
    │   ├── profile.js          # nombre, rol, links, textos y highlights
    │   ├── projects.js         # proyectos, stack, demo y repo
    │   └── stack.js            # categorías del stack técnico
    ├── hooks/                  # useReveal, useScrollSpy
    └── lib/cn.js
```

Todo el contenido editable vive en `src/data/`. No hace falta tocar los componentes para cambiar
textos, links o proyectos.

## Desarrollo local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción en dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

> En PowerShell, si `npm` está bloqueado por la política de scripts, usar `npm.cmd`.

## Formulario de contacto

Por defecto el formulario abre el cliente de correo del visitante con el mensaje precargado
(`mailto:`), por lo que funciona sin backend.

Para recibir los mensajes directo en el inbox:

1. Crear un formulario en [Formspree](https://formspree.io) (o cualquier API que acepte `POST` JSON).
2. Copiar `.env.example` a `.env.local` y completar:
   ```bash
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/TU_ID
   ```
3. Reiniciar el dev server. En Vercel, cargar la misma variable en
   **Project → Settings → Environment Variables** y redeployar.

## Deploy en Vercel

El repositorio ya está pensado para Vercel:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Al pushear a `main`, Vercel reconstruye y publica automáticamente. Para un dominio propio:
**Settings → Domains** y seguir las instrucciones de DNS (NIC Argentina para `.com.ar`).

## Checklist de assets

### 1. Capturas de los proyectos

Las seis tarjetas usan capturas reales de cada demo, guardadas en `public/projects/` como WebP
de 1280 × 720 (todas por debajo de 60 KB). `ProjectCover` mantiene los mockups CSS como fallback
si un proyecto no tiene campo `image`.

Para agregar la captura de un proyecto nuevo:

1. Guardar la imagen panorámica 16:9 en `public/projects/`, por ejemplo `nuevo-proyecto.webp`.
2. Agregar el campo `image` al proyecto en `src/data/projects.js`:
   ```js
   image: '/projects/nuevo-proyecto.webp',
   ```
3. La tarjeta usa la captura automáticamente.

Sugerido: 1280 × 720 px o 1440 × 810 px, WebP o PNG, menos de 300 KB.

### 2. CV

`public/CV-Axel-Ceballes.pdf` es un CV de una página generado desde `scripts/cv.html` con los datos
del perfil. Reemplazalo por tu versión final manteniendo el mismo nombre de archivo, o regeneralo:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --no-sandbox --disable-gpu `
  --no-pdf-header-footer --print-to-pdf="public\CV-Axel-Ceballes.pdf" `
  "file:///C:/ruta/al/proyecto/scripts/cv.html"
```

### 3. Imagen Open Graph

`public/og-image.png` (1200 × 630) se genera desde `scripts/og.html`:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --no-sandbox --disable-gpu `
  --hide-scrollbars --window-size=1200,630 --screenshot="public\og-image.png" `
  "file:///C:/ruta/al/proyecto/scripts/og.html"
```

Si cambiás el dominio, actualizá `og:url`, `og:image`, `canonical`, el JSON-LD, `robots.txt` y
`sitemap.xml`.

### 4. Dominio

El sitio se publica en `https://axelceballes.vercel.app`, el dominio gratuito de Vercel. Ese nombre
sale del **Project Name** del proyecto en Vercel: para conservarlo, el proyecto debe llamarse
`axelceballes`.

Para usar un dominio propio, comprarlo y agregarlo desde **Settings → Domains**. Después hay que
reemplazar `https://axelceballes.vercel.app` en `index.html`, `src/data/profile.js`,
`public/robots.txt`, `public/sitemap.xml`, `scripts/cv.html` y `scripts/og.html`, y regenerar el CV y
la imagen Open Graph.

## Publicar los cambios

```bash
git add .
git commit -m "feat: rediseño completo del portafolio con React + Vite + Tailwind"
git push origin main
```

Vercel detecta el push y publica. Si el proyecto estaba configurado como sitio estático, revisar que
el preset sea **Vite** y el output `dist`.

## Notas

- El sitio anterior (HTML + CSS + JS inline) quedó en el historial de Git, commit `f794bb4` previo.
- Las respuestas del formulario no se persisten en el cliente; se envían al endpoint configurado.
- Los enlaces de demo y repositorio están centralizados en `src/data/projects.js`.
