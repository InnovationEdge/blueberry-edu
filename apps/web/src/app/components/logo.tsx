interface LogoProps {
  className?: string;
  variant?: 'simple' | 'academy';
  /** Always show white logo (for dark overlays like video player) */
  forceDark?: boolean;
}

export function Logo({ className = 'h-7 w-auto', variant = 'simple', forceDark = false }: LogoProps) {
  const logos = variant === 'academy'
    ? { light: '/images/logo-academy-blue.svg', dark: '/images/logo-academy-white.svg' }
    : { light: '/images/logo-blue.svg', dark: '/images/logo-white.svg' };

  if (forceDark) {
    return <img src={logos.dark} alt="Blueberry Academy" className={className} />;
  }

  return (
    <>
      <img src={logos.dark} alt="Blueberry Academy" className={`${className} hidden dark:block`} />
      <img src={logos.light} alt="Blueberry Academy" className={`${className} block dark:hidden`} />
    </>
  );
}
