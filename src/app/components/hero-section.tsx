import { Play, BookmarkPlus } from 'lucide-react';
import { Link } from 'react-router';
import { Course } from '../data/courses';
import { StaggerItem } from './page-transition';

interface HeroSectionProps {
  course: Course;
}

export function HeroSection({ course }: HeroSectionProps) {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      </div>

      <div className="relative h-full flex items-center px-4 md:px-12 lg:px-16">
        <div className="max-w-3xl space-y-6">
          <StaggerItem delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight drop-shadow-2xl">{course.title}</h1>
          </StaggerItem>
          <StaggerItem delay={0.2}>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-normal drop-shadow-lg max-w-2xl">{course.subtitle}</p>
          </StaggerItem>
          <StaggerItem delay={0.35}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to={`/course/${course.id}`}>
                <button className="group inline-flex items-center justify-center h-12 px-8 rounded-md bg-white text-black hover:bg-gray-200 gap-3 text-lg font-bold transition-all hover:scale-105 active:scale-95">
                  <Play className="w-6 h-6 fill-black" />Start
                </button>
              </Link>
              <button className="group inline-flex items-center justify-center h-12 px-8 rounded-md bg-gray-500/70 text-white hover:bg-gray-500/50 gap-3 backdrop-blur-sm text-lg font-bold transition-all hover:scale-105 active:scale-95">
                <BookmarkPlus className="w-5 h-5" />More Info
              </button>
            </div>
          </StaggerItem>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
