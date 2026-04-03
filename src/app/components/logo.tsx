interface LogoProps {
  className?: string;
  variant?: 'simple' | 'academy';
  /** Keep logo white regardless of theme (for dark overlays) */
  forceDark?: boolean;
}

export function Logo({ className = 'h-7 w-auto', variant = 'simple', forceDark = false }: LogoProps) {
  const src = variant === 'academy' ? '/images/logo-academy.png' : '/images/logo-simple.png';
  return (
    <img
      src={src}
      alt="Blueberry Academy"
      className={`${className} ${forceDark ? '' : 'dark:invert-0 invert'}`}
    />
  );
}
