import { Flame } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { getPageT } from '../i18n/pages';

export interface CourseCardData {
  id?: number;
  title: string;
  desc: string;
  tribe: string;
  duration: string;
  price: string | number;
  format?: string;
  gradient: string;
  logo: string;
  popular?: boolean;
}

interface CourseCardLandingProps {
  course: CourseCardData;
  onClick?: () => void;
}

export function CourseCardLanding({ course, onClick }: CourseCardLandingProps) {
  const { language } = useAuth();
  const t = getPageT(language);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-border-subtle hover:border-brand/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col glow-card"
    >
      {/* Gradient header with logo */}
      <div className={`bg-gradient-to-br ${course.gradient} h-[140px] relative flex items-end p-5`}>
        <div className="absolute top-4 right-4 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10" dangerouslySetInnerHTML={{ __html: course.logo }} />
        {course.popular && (
          <div className="absolute top-4 left-4 bg-[#ef4444] text-white px-2.5 py-1 rounded-full text-[9px] font-bold flex items-center gap-1">
            <Flame className="w-3 h-3" /> {t.cardPopularBadge}
          </div>
        )}
        <div className="flex items-end justify-between w-full">
          <h3 className="font-bold text-white text-lg leading-snug">{course.title}</h3>
          <span className="text-xl font-bold text-white shrink-0">{course.price}₾</span>
        </div>
      </div>

      {/* Body */}
      <div className="bg-card p-5 flex-1 flex flex-col">
        <p className="text-xs text-foreground-secondary leading-relaxed mb-auto line-clamp-2">{course.desc}</p>

        {/* Info row */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border-subtle text-center">
          <div>
            <span className="block text-[10px] text-foreground-faint uppercase tracking-wide mb-1">{t.cardTribe}</span>
            <span className="text-xs font-semibold text-foreground">{course.tribe}</span>
          </div>
          <div>
            <span className="block text-[10px] text-foreground-faint uppercase tracking-wide mb-1">{t.cardDuration}</span>
            <span className="text-xs font-semibold text-foreground">{course.duration}</span>
          </div>
          <div>
            <span className="block text-[10px] text-foreground-faint uppercase tracking-wide mb-1">{t.cardFormat}</span>
            <span className="text-xs font-semibold text-foreground">{course.format ?? t.detailOnline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
