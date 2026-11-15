import { useEffect, useRef } from 'react';

const TEXT = 'AXEL CEBALLES';
const RAMP = ' .:-=+*#%@';
const DISPLAY_FONT = '"Plus Jakarta Sans", Inter, system-ui, sans-serif';
const MONO_FONT = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

/**
 * Banda decorativa: el texto se dibuja una vez como arte ASCII y cada frame se
 * parte en franjas verticales que se desplazan con un campo de ondas. El cursor
 * inyecta energía en la franja más cercana y la onda se propaga hacia los lados.
 * Sin dependencias, con pausa fuera de pantalla y respeto por reduced motion.
 */
export function AsciiRipple() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cellW = 8;
    let cellH = 13;
    let cols = 0;
    let art = null;
    let values = new Float32Array(0);
    let velocities = new Float32Array(0);
    let scratch = new Float32Array(0);
    let frame = 0;
    let running = false;
    let visible = true;
    let clock = 0;
    let lastX = Number.NaN;
    let lastInteraction = -1e9;
    let lastAmbient = 0;
    let buildTimer = 0;
    let disposed = false;

    const pulse = (index, strength) => {
      for (let offset = -3; offset <= 3; offset += 1) {
        const i = index + offset;
        if (i < 1 || i > cols - 2) continue;
        const falloff = 1 - Math.abs(offset) / 4;
        velocities[i] -= strength * falloff;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (!art) return;

      const strips = cols - 2;
      if (strips <= 0) return;
      const strip = width / strips;

      for (let i = 0; i < strips; i += 1) {
        const dx = i * strip;
        const sw = Math.min(strip + 0.75, width - dx);
        if (sw <= 0) break;

        const wobble = Math.sin(clock * 0.0011 + i * 0.16) * 0.35;
        const dy = Math.max(-14, Math.min(14, values[i] * 7 + wobble));

        ctx.drawImage(art, dx * dpr, 0, sw * dpr, art.height, dx, dy, sw, height);
      }
    };

    const step = () => {
      for (let i = 0; i < cols; i += 1) scratch[i] = values[i];

      for (let i = 1; i < cols - 1; i += 1) {
        const force = (scratch[i - 1] + scratch[i + 1] - scratch[i] * 2) * 0.3 - scratch[i] * 0.028;
        velocities[i] = (velocities[i] + force) * 0.9;
        values[i] = scratch[i] + velocities[i];
      }

      values[0] = values[1];
      values[cols - 1] = values[cols - 2];
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(240, Math.round(rect.width));
      height = Math.max(90, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellW = width < 520 ? 5.5 : width < 900 ? 6.5 : 8;
      cellH = cellW * 1.6;

      // Máscara tipográfica a resolución real para muestrear la densidad de cada celda.
      const mask = document.createElement('canvas');
      mask.width = width;
      mask.height = height;
      const mctx = mask.getContext('2d', { willReadFrequently: true });
      if (!mctx) return;

      let fontSize = height * 0.66;
      mctx.font = `800 ${fontSize}px ${DISPLAY_FONT}`;
      const measured = mctx.measureText(TEXT).width;
      if (measured > width * 0.9) {
        fontSize *= (width * 0.9) / measured;
      }

      mctx.clearRect(0, 0, width, height);
      mctx.fillStyle = '#ffffff';
      mctx.font = `800 ${Math.max(10, fontSize)}px ${DISPLAY_FONT}`;
      mctx.textAlign = 'center';
      mctx.textBaseline = 'middle';
      mctx.fillText(TEXT, width / 2, height * 0.46);

      const pixels = mctx.getImageData(0, 0, width, height).data;
      const alphaAt = (x, y) => {
        const px = Math.min(width - 1, Math.max(0, Math.round(x)));
        const py = Math.min(height - 1, Math.max(0, Math.round(y)));
        return pixels[(py * width + px) * 4 + 3] / 255;
      };

      const gridCols = Math.ceil(width / cellW);
      const rows = Math.ceil(height / cellH);

      art = document.createElement('canvas');
      art.width = Math.round(width * dpr);
      art.height = Math.round(height * dpr);
      const actx = art.getContext('2d');
      if (!actx) return;
      actx.setTransform(dpr, 0, 0, dpr, 0, 0);
      actx.font = `500 ${Math.round(cellH)}px ${MONO_FONT}`;
      actx.textAlign = 'center';
      actx.textBaseline = 'middle';

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < gridCols; col += 1) {
          const cx = col * cellW + cellW / 2;
          const cy = row * cellH + cellH / 2;
          const density =
            (alphaAt(cx, cy) * 2 +
              alphaAt(cx - cellW * 0.3, cy) +
              alphaAt(cx + cellW * 0.3, cy) +
              alphaAt(cx, cy - cellH * 0.3) +
              alphaAt(cx, cy + cellH * 0.3)) /
            6;

          if (density < 0.08) continue;

          const glyph = RAMP[Math.min(RAMP.length - 1, Math.max(1, Math.round(density * (RAMP.length - 1))))];
          const r = Math.round(96 + density * 159);
          const g = Math.round(18 + density * 42);
          const b = Math.round(22 + density * 46);
          const alpha = (0.22 + density * 0.78).toFixed(3);

          actx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          actx.fillText(glyph, cx, cy);
        }
      }

      cols = Math.ceil(width / cellW) + 2;
      values = new Float32Array(cols);
      velocities = new Float32Array(cols);
      scratch = new Float32Array(cols);
      lastX = Number.NaN;

      // Pulso inicial suave para que la banda no arranque congelada.
      pulse(Math.round(cols / 2), 1.1);
    };

    const tick = (now) => {
      clock = now;

      if (now - lastInteraction > 2400 && now - lastAmbient > 1300) {
        pulse(4 + Math.floor(Math.random() * Math.max(1, cols - 8)), 0.45);
        lastAmbient = now;
      }

      step();
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || motionQuery.matches) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      if (!Number.isNaN(lastX) && Math.abs(x - lastX) < 5) return;

      lastX = x;
      lastInteraction = performance.now();
      const strip = width / Math.max(1, cols - 2);
      pulse(Math.round(x / strip), 0.2);
    };

    const onPointerDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const strip = width / Math.max(1, cols - 2);
      lastInteraction = performance.now();
      pulse(Math.round(x / strip), 2.4);
    };

    const onPointerLeave = () => {
      lastX = Number.NaN;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        stop();
        draw();
      } else {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(buildTimer);
      buildTimer = window.setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        if (Math.round(rect.width) === width && Math.round(rect.height) === height) return;
        build();
        draw();
      }, 140);
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );

    build();
    draw();

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionQuery.addEventListener('change', onMotionChange);

    if (typeof IntersectionObserver === 'undefined') start();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (disposed) return;
        build();
        draw();
        if (!running && visible && !document.hidden) start();
      });
    }

    return () => {
      disposed = true;
      stop();
      window.clearTimeout(buildTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-t border-line/60 bg-night-soft/30">
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-25"
        aria-hidden="true"
      />

      <div className="container-page relative py-5 sm:py-6">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
          <span>ASCII Ripple</span>
          <span className="hidden sm:inline">Pasá el cursor</span>
        </div>

        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Axel Ceballes en arte ASCII"
          className="mt-3 block h-[clamp(7rem,16vw,12rem)] w-full touch-pan-y"
        />
      </div>
    </div>
  );
}
