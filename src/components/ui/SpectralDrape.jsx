import { useEffect, useRef } from 'react';

/**
 * Fondo global: una malla de puntos que se pliega como una tela en 3D.
 * Cada hebra eleva la grilla con una onda propia y el brillo crece en las crestas.
 * El cursor agrega paralaje, el scroll inyecta ondas y queda fija detrás de todo
 * el contenido. Sin dependencias, en canvas 2D, con pausa en pestaña oculta,
 * límite de frames, y respeto por prefers-reduced-motion.
 */

// Tokens del sitio: --color-accent y --color-accent-soft.
const BODY_RGB = [239, 68, 68];
const HIGHLIGHT_RGB = [252, 165, 165];

const SPRITE_STEPS = 16;
const SPRITE_SIZE = 32;

const STRANDS = 7;
const FREQUENCY = 2.4;
const THICKNESS = 0.22;
const AMPLITUDE = 0.5;
const FLOW = 0.32;
const TILT = -0.62;
const TURN = -0.5;
const ROLL = 0.5;
const DEPTH = 0.16;
const FRAME_MS = 24;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const mixRgb = (from, to, t) => [
  Math.round(from[0] + (to[0] - from[0]) * t),
  Math.round(from[1] + (to[1] - from[1]) * t),
  Math.round(from[2] + (to[2] - from[2]) * t),
];

function createSprite(rgb) {
  const sprite = document.createElement('canvas');
  sprite.width = SPRITE_SIZE;
  sprite.height = SPRITE_SIZE;

  const spriteCtx = sprite.getContext('2d');
  if (!spriteCtx) return sprite;

  const radius = SPRITE_SIZE / 2;
  const core = mixRgb(rgb, [255, 255, 255], 0.45);
  const gradient = spriteCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  gradient.addColorStop(0, `rgba(${core[0]}, ${core[1]}, ${core[2]}, 0.95)`);
  gradient.addColorStop(0.24, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.55)`);
  gradient.addColorStop(0.55, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.14)`);
  gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);

  spriteCtx.fillStyle = gradient;
  spriteCtx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

  return sprite;
}

export function SpectralDrape() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sprites = Array.from({ length: SPRITE_STEPS }, (_, index) =>
      createSprite(mixRgb(BODY_RGB, HIGHLIGHT_RGB, index / (SPRITE_STEPS - 1))),
    );

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let spacing = 8;
    let us = new Float32Array(0);
    let vs = new Float32Array(0);
    let weights = new Float32Array(0);
    let osc = new Float32Array(0);
    let frame = 0;
    let running = false;
    let buildTimer = 0;
    let lastPaint = -1e9;
    let ambientAt = -1e9;
    let scrollAt = -1e9;

    const pointer = {
      x: 0,
      y: 0,
      active: false,
      strength: 0,
      targetX: 0,
      targetY: 0,
      easedX: 0,
      easedY: 0,
    };
    const pulses = [];

    const addPulse = (x, y, amp) => {
      pulses.push({ x, y, amp, start: performance.now() * 0.0015 });
      if (pulses.length > 4) pulses.shift();
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, Math.round(rect.width));
      height = Math.max(240, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = clamp(Math.round(width / 20), 34, 78);
      rows = clamp(Math.round(height / 20), 22, 48);
      spacing = width / cols;

      us = new Float32Array(cols);
      for (let i = 0; i < cols; i += 1) us[i] = -1.5 + (3 * i) / (cols - 1);

      vs = new Float32Array(rows);
      for (let j = 0; j < rows; j += 1) vs[j] = -1.05 + (2.1 * j) / (rows - 1);

      const strandU = new Float32Array(STRANDS);
      for (let s = 0; s < STRANDS; s += 1) {
        strandU[s] = -1.2 + (2.4 * (s + 0.5)) / STRANDS;
      }

      weights = new Float32Array(cols * STRANDS);
      for (let i = 0; i < cols; i += 1) {
        for (let s = 0; s < STRANDS; s += 1) {
          const delta = us[i] - strandU[s];
          weights[i * STRANDS + s] = Math.exp(
            -(delta * delta) / (2 * THICKNESS * THICKNESS),
          );
        }
      }

      osc = new Float32Array(rows * STRANDS);
      pulses.length = 0;
    };

    const draw = (now) => {
      const time = now * 0.0015;
      ctx.clearRect(0, 0, width, height);

      const angleX = TILT + pointer.easedY * 0.14;
      const angleY = TURN + pointer.easedX * 0.22;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(ROLL);
      const sinZ = Math.sin(ROLL);

      const centerX = width / 2;
      const centerY = height * 0.52;
      const scaleX = width * 0.46;
      const scaleY = height * 0.5;

      for (let r = 0; r < rows; r += 1) {
        const vz = vs[r];
        const base = r * STRANDS;
        for (let s = 0; s < STRANDS; s += 1) {
          osc[base + s] =
            Math.sin(vz * FREQUENCY * Math.PI + time * FLOW * 3 + s * 0.95) * AMPLITUDE;
        }
      }

      const livePulses = [];
      for (let i = 0; i < pulses.length; i += 1) {
        if (time - pulses[i].start < 1.9) livePulses.push(pulses[i]);
      }

      ctx.globalCompositeOperation = 'lighter';

      for (let r = 0; r < rows; r += 1) {
        const vz = vs[r];
        const base = r * STRANDS;

        for (let c = 0; c < cols; c += 1) {
          let lift = 0;
          for (let s = 0; s < STRANDS; s += 1) {
            lift += weights[c * STRANDS + s] * osc[base + s];
          }
          lift += Math.sin(us[c] * 1.4 + vz * 0.8 + time * 0.6) * 0.05;
          if (vz > 0) lift += vz * 0.12;

          const wx = us[c];
          const wy = lift;
          const wz = vz;

          const y1 = wy * cosX - wz * sinX;
          const z1 = wy * sinX + wz * cosX;
          const x2 = wx * cosY + z1 * sinY;
          const z2 = -wx * sinY + z1 * cosY;
          const x3 = x2 * cosZ - y1 * sinZ;
          const y3 = x2 * sinZ + y1 * cosZ;

          const persp = 1 / (1 - z2 * DEPTH);
          let px = centerX + x3 * scaleX * persp;
          let py = centerY - y3 * scaleY * persp;

          let alpha =
            (0.075 + clamp(lift / (AMPLITUDE * 1.25), 0, 1) * 0.3) *
            clamp(0.55 + (z2 + 1.4) * 0.35, 0.35, 1.25);

          if (pointer.strength > 0.01) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            const distance = dx * dx + dy * dy;
            if (distance < 57600) {
              const brush = Math.exp(-distance / (2 * 90 * 90)) * pointer.strength;
              py -= brush * 16;
              alpha *= 1 + brush * 0.8;
            }
          }

          for (let p = 0; p < livePulses.length; p += 1) {
            const pulse = livePulses[p];
            const age = time - pulse.start;
            const radius = 30 + age * 210;
            const dx = px - pulse.x;
            const dy = py - pulse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const ring =
              Math.exp(-((distance - radius) ** 2) / (2 * 70 * 70)) * (1 - age / 1.9);
            py -= ring * 22 * pulse.amp;
            alpha *= 1 + ring * 0.7 * pulse.amp;
          }

          const crest = clamp(lift / (AMPLITUDE * 1.15), 0, 1);
          const shift = clamp((us[c] + 1.5) / 3, 0, 1);
          const spriteIndex = Math.round(
            clamp(crest * 0.72 + shift * 0.28, 0, 1) * (SPRITE_STEPS - 1),
          );
          const size = spacing * 1.85 * persp * (0.8 + crest * 0.5);

          ctx.globalAlpha = clamp(alpha, 0.02, 0.6);
          ctx.drawImage(
            sprites[spriteIndex],
            px - size / 2,
            py - size / 2,
            size,
            size,
          );
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const tick = (now) => {
      pointer.easedX += (pointer.targetX - pointer.easedX) * 0.05;
      pointer.easedY += (pointer.targetY - pointer.easedY) * 0.05;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.08;

      if (now - ambientAt > 2800) {
        ambientAt = now;
        addPulse(width * (0.15 + Math.random() * 0.7), height * 0.55, 0.4);
      }

      if (now - lastPaint >= FRAME_MS) {
        lastPaint = now;
        draw(now);
      }

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
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.targetX = (event.clientX / width) * 2 - 1;
      pointer.targetY = (event.clientY / height) * 2 - 1;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const onScroll = () => {
      const now = performance.now();
      if (now - scrollAt < 160) return;
      scrollAt = now;
      addPulse(width * (0.12 + Math.random() * 0.76), height * 0.62, 0.5);
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        stop();
        draw(performance.now());
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
        draw(performance.now());
      }, 160);
    });

    build();
    draw(performance.now());

    resizeObserver.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionQuery.addEventListener('change', onMotionChange);

    start();

    return () => {
      stop();
      window.clearTimeout(buildTimer);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="spectral-drape drape-mask block h-full w-full opacity-[0.65]"
      />
    </div>
  );
}
