import { Logo } from './logo';

const FOOTER_NAV = {
  პლატფორმა: [
    { label: 'კურსები', href: '/courses' },
    { label: 'მასტერკლასები', href: '/masterclass' },
    { label: 'სერტიფიკატები', href: '/certificates' },
  ],
  კომპანია: [
    { label: 'ჩვენს შესახებ', href: '/about' },
    { label: 'კარიერა', href: '/career' },
    { label: 'კონტაქტი', href: '/about' },
  ],
  რესურსები: [
    { label: 'FAQ', href: '/#faq' },
    { label: 'პირობები', href: '#' },
    { label: 'კონფიდენციალურობა', href: '#' },
  ],
};

export function LandingFooter() {
  return (
    <footer className="border-t border-border-subtle pt-14 pb-8">
      <div className="max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
        {/* Top — logo + nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="col-span-2">
            <Logo variant="academy" className="h-10 w-auto mb-4" />
            <p className="text-sm text-foreground-faint leading-relaxed max-w-xs">
              პროფესიონალური სასწავლებელი ლაივ ვორკშოპებით. ისწავლე წამყვანი პროფესიონალებისგან და დასაქმდი.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_NAV).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-foreground-faint hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border-subtle pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-foreground-faint">&copy; 2026 Blueberry Academy. ყველა უფლება დაცულია.</span>
            <div className="flex items-center gap-5 text-xs text-foreground-faint">
              <a href="mailto:info@blueberryedu.ge" className="hover:text-foreground transition-colors">info@blueberryedu.ge</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
