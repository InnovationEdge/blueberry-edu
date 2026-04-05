interface LogoProps {
  className?: string;
  variant?: 'simple' | 'academy';
  /** Keep logo white regardless of theme (for dark overlays) */
  forceDark?: boolean;
}

export function Logo({ className = 'h-7 w-auto', variant = 'simple', forceDark = false }: LogoProps) {
  const whiteLogo = variant === 'academy' ? '/images/logo-academy.png' : '/images/logo-simple.png';
  const blueLogo = '/images/logo-transparent.png';

  if (forceDark) {
    return <img src={whiteLogo} alt="Blueberry Academy" className={className} />;
  }

  return (
    <>
      {/* Dark mode — white logo */}
      <img src={whiteLogo} alt="Blueberry Academy" className={`${className} hidden dark:block`} />
      {/* Light mode — blue logo (transparent bg) */}
      <img src={blueLogo} alt="Blueberry Academy" className={`${className} block dark:hidden`} />
    </>
  );
}
