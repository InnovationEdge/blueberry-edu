import { Play, Info } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import { Course } from '../data/courses';
import { useAuth } from '../context/auth-context';
import { getAppT } from '../i18n/app';

interface HeroSectionProps {
  courses: Course[];
  interval?: number;
}

export function HeroSection({ courses, interval = 6000 }: HeroSectionProps) {
  const { language } = useAuth();
  const t = getAppT(language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 400);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((currentIndex + 1) % courses.length);
    }, interval);
    return () => clearInterval(timer);
  }, [currentIndex, courses.length, interval, goToSlide]);

  const course = courses[currentIndex];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background slides */}
      {courses.map((c, i) => (
        <div
          key={c.id}
          className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        >
          <img
            src={c.thumbnail}
            alt={c.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradients — always dark for image readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-overlay/90 via-overlay/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-overlay/40 via-transparent to-overlay" />

      {/* Content */}
      <div className="relative h-full flex items-end pb-8 px-4 md:px-12">
        <div className="max-w-xl space-y-4">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight transition-all duration-500 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {course.title}
          </h1>
          <p
            className={`text-sm md:text-base text-white/70 leading-relaxed max-w-md transition-all duration-500 delay-75 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {course.subtitle}
          </p>
          <div
            className={`flex items-center gap-3 pt-2 transition-all duration-500 delay-150 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <Link to={`/course/${course.id}`}>
              <button className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-brand text-white gap-2 text-sm font-bold transition-all hover:bg-brand-hover active:scale-95">
                <Play className="w-4 h-4 fill-white" />{t.heroPlay || 'დაწყება'}
              </button>
            </Link>
            <Link to={`/course/${course.id}`}>
              <button className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-card/80 text-foreground gap-2 text-sm font-semibold backdrop-blur transition-all hover:bg-card active:scale-95">
                <Info className="w-4 h-4" />{t.heroMoreInfo || 'დეტალურად'}
              </button>
            </Link>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-2 pt-4">
            {courses.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
