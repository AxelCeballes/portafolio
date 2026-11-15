import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { About } from './components/sections/About.jsx';
import { Projects } from './components/sections/Projects.jsx';
import { Stack } from './components/sections/Stack.jsx';
import { Contact } from './components/sections/Contact.jsx';
import { AsciiRipple } from './components/ui/AsciiRipple.jsx';
import { TechMarquee } from './components/ui/TechMarquee.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
      >
        Saltar al contenido
      </a>

      <div
        className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.035]"
        aria-hidden="true"
      />

      <Navbar />

      <main id="contenido" className="relative">
        <Hero />
        <TechMarquee />
        <About />
        <AsciiRipple />
        <Projects />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
