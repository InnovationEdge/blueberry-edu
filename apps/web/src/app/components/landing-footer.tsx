import { Logo } from './logo';
import { useAuth } from '../context/auth-context';
import { getPageT } from '../i18n/pages';

export function LandingFooter() {
  const { language } = useAuth();
  const t = getPageT(language);

  const FOOTER_NAV = {
    [t.footerPlatform]: [
      { label: t.navCourses, href: '/courses' },
      { label: t.navMasterclasses, href: '/masterclass' },
      { label: t.navCertificates, href: '/certificates' },
    ],
    [t.footerCompany]: [
      { label: t.navAbout, href: '/about' },
      { label: t.navCareer, href: '/career' },
      { label: t.footerContact, href: '/about' },
    ],
    [t.footerResources]: [
      { label: t.footerFaq, href: '/#faq' },
      { label: t.footerTerms, href: '#' },
      { label: t.footerPrivacy, href: '#' },
    ],
  };

  return (
    <footer className="border-t border-border-subtle pt-16 pb-10">
      <div className="max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <Logo variant="academy" className="h-10 w-auto mb-4" />
            <p className="text-sm text-foreground-faint leading-relaxed max-w-xs">
              {t.footerDesc}
            </p>
          </div>

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

        <div className="border-t border-border-subtle pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-foreground-faint tracking-wide">{t.footerCopyright}</span>
            <div className="flex items-center gap-6 text-xs text-foreground-faint">
              <a href="mailto:info@blueberryedu.ge" className="hover:text-foreground transition-colors">info@blueberryedu.ge</a>
              <a href="https://blueberry.codes" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-hover transition-colors">Blueberry Systems</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
