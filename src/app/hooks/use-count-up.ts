import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  targets: number[];
  duration?: number;
  steps?: number;
}

export function useCountUp({ targets, duration = 1500, steps = 40 }: UseCountUpOptions) {
  const [counts, setCounts] = useState<number[]>(targets.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((t, i) =>
        i === targets.length - 1 ? +(t * ease).toFixed(1) : Math.round(t * ease)
      ));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [hasStarted, targets, duration, steps]);

  return { counts, ref };
}
