import { useEffect, useRef } from 'react';

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type P = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      ax: number; ay: number;
      life: number; maxLife: number;
    };

    const COUNT = 160;
    const ps: P[] = [];

    const spawn = (w: number, h: number): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 2.4,
      vy: (Math.random() - 0.5) * 2.4,
      r: Math.random() * 2 + 0.4,
      alpha: Math.random() * 0.6 + 0.15,
      ax: (Math.random() - 0.5) * 0.08,
      ay: (Math.random() - 0.5) * 0.08,
      life: 0,
      maxLife: 300 + Math.random() * 400,
    });

    for (let i = 0; i < COUNT; i++) ps.push(spawn(canvas.width, canvas.height));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const { x: mx, y: my } = mouse.current;

      ctx.clearRect(0, 0, W, H);

      const spot = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
      spot.addColorStop(0, 'rgba(0,74,173,0.25)');
      spot.addColorStop(0.5, 'rgba(0,74,173,0.10)');
      spot.addColorStop(1, 'transparent');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        p.ax += (Math.random() - 0.5) * 0.015;
        p.ay += (Math.random() - 0.5) * 0.015;
        p.ax *= 0.96; p.ay *= 0.96;

        p.vx += p.ax;
        p.vy += p.ay;

        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 90 && dist > 0) {
          const f = ((90 - dist) / 90) * 2.2;
          p.vx -= (dx / dist) * f * 0.18;
          p.vy -= (dy / dist) * f * 0.18;
        } else if (dist < 260 && dist > 0) {
          const f = (1 - dist / 260) * 0.6;
          p.vx += (-dy / dist) * f * 0.12;
          p.vy += (dx / dist) * f * 0.12;
        }

        p.vx *= 0.975; p.vy *= 0.975;

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 7) { p.vx = (p.vx / speed) * 7; p.vy = (p.vy / speed) * 7; }

        p.x += p.vx; p.y += p.vy;

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        p.life++;
        const lifeFrac = p.life / p.maxLife;
        const fade = lifeFrac < 0.1 ? lifeFrac / 0.1 : lifeFrac > 0.9 ? (1 - lifeFrac) / 0.1 : 1;
        if (p.life >= p.maxLife) Object.assign(p, spawn(W, H));

        const gf = Math.max(0, 1 - dist / 180);

        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const cd = Math.hypot(p.x - q.x, p.y - q.y);
          if (cd < 100) {
            const gfq = Math.max(0, 1 - Math.hypot(mx - q.x, my - q.y) / 180);
            const gfMax = Math.max(gf, gfq);
            const a = (1 - cd / 100) * 0.18 * fade * (1 + gfMax * 3.5);
            const r = Math.round(0 + gfMax * 40);
            const g2 = Math.round(74 + gfMax * 40);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g2},173,${a})`;
            ctx.lineWidth = gfMax > 0.25 ? 1.4 : 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (gf > 0.05) {
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 9);
          halo.addColorStop(0, `rgba(0,74,173,${gf * 0.7 * fade})`);
          halo.addColorStop(1, 'transparent');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 9, 0, Math.PI * 2);
          ctx.fill();
        }

        const size = p.r * (1 + gf * 3.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(0 + gf * 60)},${Math.round(74 + gf * 50)},${Math.round(173 + gf * 40)},${(p.alpha + gf * 0.6) * fade})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
