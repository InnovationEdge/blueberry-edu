interface LogoProps {
  className?: string;
  variant?: 'simple' | 'academy';
  /** Keep logo white regardless of theme (for dark overlays) */
  forceDark?: boolean;
}

export function Logo({ className = 'h-7 w-auto', variant = 'simple', forceDark = false }: LogoProps) {
  // Dark mode: white logo (logo-simple). Light mode: blue logo (logo-transparent).
  // forceDark: always use white logo (for video/image overlays).
  if (forceDark) {
    const src = variant === 'academy' ? '/images/logo-academy.png' : '/images/logo-simple.png';
    return <img src={src} alt="Blueberry Academy" className={className} />;
  }

  return (
    <>
      <img
        src={variant === 'academy' ? '/images/logo-academy.png' : '/images/logo-simple.png'}
        alt="Blueberry Academy"
        className={`${className} hidden dark:block`}
      />
      <img
        src="/images/logo-transparent.png"
        alt="Blueberry Academy"
        className={`${className} block dark:hidden`}
      />
    </>
  );
}
