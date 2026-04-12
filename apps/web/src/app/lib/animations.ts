/** Shared animation constants — single source of truth */

export const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;
export const EASE_SMOOTH = 'easeOut' as const;

export const DURATION = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  stagger: 0.3,
} as const;

export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeUpVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

export const scaleVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const transitions = {
  page: { duration: DURATION.normal, ease: EASE_SMOOTH },
  step: { duration: 0.3, ease: EASE_SMOOTH },
  stagger: (delay: number) => ({ duration: DURATION.stagger, delay, ease: EASE_OUT }),
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
} as const;
