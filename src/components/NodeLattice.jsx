import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * NODE LATTICE — the hero's signature element.
 *
 * A live cluster topology: nodes carry a load value, hairline edges
 * connect near neighbours, and signal packets travel along those
 * edges. The cursor acts as a field that pushes nodes aside and
 * raises the load of everything nearby.
 *
 * Why this and not a generic particle field: the portfolio's flagship
 * project is a GPU cluster optimiser, and campus navigation is a
 * shortest-path problem. A graph under load is literally the subject
 * matter, so the background is saying something rather than moving.
 *
 * Costs are kept low deliberately — edges are computed once, the loop
 * parks itself when the hero scrolls out of view, and reduced-motion
 * visitors get a single static frame.
 */

const SIGNAL = [10, 122, 79];

function rgba(alpha) {
  return `rgba(${SIGNAL[0]},${SIGNAL[1]},${SIGNAL[2]},${alpha})`;
}

export default function NodeLattice({ className = '' }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let dpr = 1;

    /** @type {{x:number,y:number,vx:number,vy:number,load:number,seed:number,ox:number,oy:number}[]} */
    let nodes = [];
    /** @type {{a:number,b:number,len:number}[]} */
    let edges = [];
    /** @type {{edge:number,t:number,speed:number,dir:number}[]} */
    let pulses = [];

    const pointer = { x: -9999, y: -9999, active: false };
    let running = true;
    let frame = 0;
    let last = performance.now();
    let time = 0;

    const build = () => {
      const area = width * height;
      const count = Math.max(26, Math.min(92, Math.round(area / 24000)));

      // Poisson-ish placement: jittered grid keeps spacing even without
      // the cost of real rejection sampling.
      const cols = Math.max(3, Math.round(Math.sqrt(count * (width / Math.max(height, 1)))));
      const rows = Math.max(3, Math.ceil(count / cols));
      const cw = width / cols;
      const ch = height / rows;

      nodes = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          if (nodes.length >= count) break;
          nodes.push({
            x: cw * (c + 0.5) + (Math.random() - 0.5) * cw * 0.72,
            y: ch * (r + 0.5) + (Math.random() - 0.5) * ch * 0.72,
            vx: (Math.random() - 0.5) * 0.07,
            vy: (Math.random() - 0.5) * 0.07,
            load: Math.random(),
            seed: Math.random() * Math.PI * 2,
            ox: 0,
            oy: 0,
          });
        }
      }

      // Connect each node to its nearest few neighbours, once per pair.
      const linkDist = Math.min(240, Math.max(120, Math.hypot(width, height) * 0.14));
      const maxLinks = 3;
      const degree = new Array(nodes.length).fill(0);
      edges = [];

      for (let i = 0; i < nodes.length; i += 1) {
        const candidates = [];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < linkDist) candidates.push({ j, d });
        }
        candidates.sort((a, b) => a.d - b.d);
        for (let k = 0; k < candidates.length && degree[i] < maxLinks; k += 1) {
          const { j, d } = candidates[k];
          if (degree[j] >= maxLinks) continue;
          edges.push({ a: i, b: j, len: d });
          degree[i] += 1;
          degree[j] += 1;
        }
      }

      const pulseCount = edges.length ? Math.min(9, Math.max(3, Math.round(edges.length / 14))) : 0;
      pulses = Array.from({ length: pulseCount }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.16 + Math.random() * 0.3,
        dir: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = (dt) => {
      time += dt;
      ctx.clearRect(0, 0, width, height);

      const influence = 190;

      // ---- advance nodes -------------------------------------------
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];

        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.min(width, Math.max(0, n.x));
        n.y = Math.min(height, Math.max(0, n.y));

        // Cursor field: push away, and raise load.
        let push = 0;
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < influence && d > 0.001) {
            push = (1 - d / influence) ** 2;
            n.ox += ((dx / d) * push * 26 - n.ox) * 0.12;
            n.oy += ((dy / d) * push * 26 - n.oy) * 0.12;
          }
        }
        n.ox += (0 - n.ox) * 0.055;
        n.oy += (0 - n.oy) * 0.055;

        // Load oscillates slowly so the cluster looks alive, not looping.
        const base = 0.5 + 0.5 * Math.sin(time * 0.55 + n.seed);
        n.load = base * 0.7 + push * 0.9;
      }

      // ---- edges ----------------------------------------------------
      ctx.lineWidth = 1;
      for (let e = 0; e < edges.length; e += 1) {
        const a = nodes[edges[e].a];
        const b = nodes[edges[e].b];
        const ax = a.x + a.ox;
        const ay = a.y + a.oy;
        const bx = b.x + b.ox;
        const by = b.y + b.oy;

        const heat = (a.load + b.load) * 0.5;
        ctx.strokeStyle = rgba(0.08 + heat * 0.2);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      // ---- packets in flight ---------------------------------------
      ctx.shadowColor = rgba(0.5);
      for (let p = 0; p < pulses.length; p += 1) {
        const pulse = pulses[p];
        const edge = edges[pulse.edge];
        if (!edge) continue;

        pulse.t += pulse.speed * dt * pulse.dir;
        if (pulse.t > 1 || pulse.t < 0) {
          pulse.edge = Math.floor(Math.random() * edges.length);
          pulse.t = pulse.dir > 0 ? 0 : 1;
          pulse.speed = 0.16 + Math.random() * 0.3;
          if (Math.random() > 0.82) pulse.dir *= -1;
          continue;
        }

        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const x = a.x + a.ox + (b.x + b.ox - (a.x + a.ox)) * pulse.t;
        const y = a.y + a.oy + (b.y + b.oy - (a.y + a.oy)) * pulse.t;

        // Fade in and out at the ends so packets never pop.
        const fade = Math.sin(Math.PI * Math.min(1, Math.max(0, pulse.t)));

        ctx.shadowBlur = 6;
        ctx.fillStyle = rgba(0.95 * fade);
        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // ---- nodes ----------------------------------------------------
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const x = n.x + n.ox;
        const y = n.y + n.oy;
        const r = 1.1 + n.load * 1.7;

        ctx.fillStyle = rgba(0.25 + n.load * 0.6);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // A ring on the hottest nodes reads as a node under load.
        if (n.load > 1.05) {
          ctx.strokeStyle = rgba((n.load - 1.05) * 0.6);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, r + 5 + (n.load - 1.05) * 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      if (running) frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Park the loop whenever the hero is off screen.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !running && !reduced) {
          running = true;
          last = performance.now();
          frame = requestAnimationFrame(loop);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (reduced) {
      running = false;
      draw(0);
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    />
  );
}
