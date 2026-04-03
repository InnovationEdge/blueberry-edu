import { useParams, Link, useNavigate } from 'react-router';
import { Play, Share2, ChevronDown, ChevronUp, Check, Star, Clock, BarChart3, Globe, PlayCircle, FileText, Award, Users, Infinity, Smartphone, ThumbsUp, ArrowLeft } from 'lucide-react';
import { CourseRow } from '../components/course-row';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';
import { useCourseDetail, useCourses } from '../hooks/use-courses';
import { useCheckout } from '../hooks/use-checkout';
import { useCheckEnrollment } from '../hooks/use-enrollment';
import { CourseDetailSkeleton } from '../components/skeletons';

export function CourseDetail() {
  const { language, isAuthenticated, openLogin } = useAuth();
  const t = getAppT(language);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: course, isLoading, error } = useCourseDetail(id || '');
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const checkout = useCheckout();
  const { data: isEnrolled } = useCheckEnrollment(id || '');

  const handleEnroll = () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    if (isEnrolled) {
      navigate(`/course/${id}/session`);
      return;
    }
    if (course) checkout.mutate(course.id);
  };

  // Fetch related courses (same category)
  const categorySlug = course?.category[0] || '';
  const { data: relatedData } = useCourses({ category: categorySlug, limit: 8 });
  const relatedCourses = (relatedData?.data || []).filter((c: any) => c.id !== course?.id);

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl text-foreground">{t.detailNotFound}</h1>
          <Link to="/" className="text-brand hover:underline">
            {t.detailReturnHome}
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = course.price;
  const originalPrice = Math.round(course.price * 1.8);
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  // Mock LinkedIn URL
  const instructorLinkedIn = `https://www.linkedin.com/in/${course.instructor.toLowerCase().replace(/\s+/g, '-')}`;

  const learningOutcomes = [
    'დაეუფლე ძირითად კონცეფციებს და მოწინავე ტექნიკებს',
    'შექმენი რეალური პროექტები ნულიდან',
    'ისწავლე ინდუსტრიის საუკეთესო პრაქტიკები',
    'მიიღე პრაქტიკული გამოცდილება თანამედროვე ინსტრუმენტებით',
    'ისწავლე ტოპ პროფესიონალების სტრატეგიები',
    'შექმენი სრული პორტფოლიო პროექტი',
  ];

  // Real sections from API
  const courseSections = course.sections.map(s => ({
    title: s.title,
    lectures: s.lessons.length,
    duration: s.lessons.reduce((sum, l) => {
      const mins = parseInt(l.duration) || 0;
      return sum + mins;
    }, 0) + 'min',
    lessons: s.lessons,
  }));

  const requirements = [
    'წინასწარი გამოცდილება არ არის საჭირო — საფუძვლებიდან ვიწყებთ',
    'კომპიუტერი ინტერნეტ კავშირით',
    'სწავლის სურვილი და პრაქტიკისთვის დრო',
    'კვირაში დაახლოებით 4-6 საათი პრაქტიკისთვის',
  ];

  // Georgian reviews (fallback if API returns empty)
  const reviews = [
    { id: 1, author: 'ლუკა ჩხეიძე', avatar: 'ლ', rating: 5, date: '2 კვირის წინ', comment: 'საუკეთესო კურსია! ინსტრუქტორი ძალიან გასაგებად ხსნის რთულ თემებს. რეკომენდაცია 100%.', helpful: 45 },
    { id: 2, author: 'მარიამ ქუთათელაძე', avatar: 'მ', rating: 5, date: '1 თვის წინ', comment: 'პრაქტიკული მაგალითები ძალიან დამეხმარა. კონტენტი კარგად სტრუქტურირებულია.', helpful: 38 },
    { id: 3, author: 'დავით გელაშვილი', avatar: 'დ', rating: 4, date: '3 კვირის წინ', comment: 'კარგი კურსია, თუმცა მოწინავე თემებზე მეტი ყურადღება მინდოდა.', helpful: 29 },
    { id: 4, author: 'ანა დვალიშვილი', avatar: 'ა', rating: 5, date: '1 კვირის წინ', comment: 'ამ კურსმა ჩემი კარიერა შეცვალა. ინსტრუქტორი ნამდვილი პროფესიონალია.', helpful: 52 },
    { id: 5, author: 'ნიკა ხარაიშვილი', avatar: 'ნ', rating: 5, date: '2 თვის წინ', comment: 'ყველაზე კარგი ონლაინ კურსი ქართულად! შესანიშნავი კონტენტი.', helpful: 67 },
  ];

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const totalLectures = course.lessons;
  const averageRating = course.rating;
  const totalReviews = course.totalReviews;

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-6 left-4 md:left-12 lg:left-16 z-30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-foreground hover:text-foreground-secondary transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-card border border-border-subtle hover:bg-surface-raised flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-overlay via-[black]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex items-center px-4 md:px-12 lg:px-16">
          <div className="max-w-3xl space-y-7">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              {course.title}
            </h1>

            <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex items-center gap-5 text-base text-foreground-secondary">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-foreground">{course.rating}</span>
                <span className="text-foreground-subtle">({totalReviews.toLocaleString()} ratings)</span>
              </div>
              <span>•</span>
              <span>{course.students.toLocaleString()} students</span>
            </div>

            <div className="text-base text-foreground-subtle">
              Created by <span className="text-foreground-secondary font-medium">{course.instructor}</span>
            </div>

            <div className="flex items-center gap-5 text-base text-foreground-secondary">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-foreground-subtle" />
                <span>{course.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-foreground-subtle" />
                <span>{course.level}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-foreground-subtle" />
                <span>ქართული</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-12 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* What You'll Learn */}
              <div className="bg-surface rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.detailWhatLearn}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-3">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-foreground-secondary text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{ t.detailCourseContent}</h2>
                <div className="text-sm text-foreground-subtle mb-6">
                  {courseSections.length} სექცია • {totalLectures} გაკვეთილი • {course.duration} სულ
                </div>
                <div className="space-y-2">
                  {courseSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-surface rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection(sectionIndex)}
                        className="w-full flex items-center justify-between p-4 hover:bg-surface-raised transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedSections.includes(sectionIndex) ? (
                            <ChevronUp className="w-5 h-5 text-foreground-subtle" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-foreground-subtle" />
                          )}
                          <span className="text-white font-semibold">{section.title}</span>
                        </div>
                        <div className="text-sm text-foreground-subtle">
                          {section.lectures} გაკვეთილი • {section.duration}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                      {expandedSections.includes(sectionIndex) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border-subtle">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-4 pl-12 hover:bg-surface-raised transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="w-4 h-4 text-foreground-subtle group-hover:text-white transition-colors" />
                                  <span className="text-foreground-secondary text-sm group-hover:text-white transition-colors">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  {lesson.preview && (
                                    <span className="text-xs text-red-500 font-semibold">{ t.detailPreview}</span>
                                  )}
                                  <span className="text-sm text-foreground-subtle">{lesson.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{ t.detailRequirements}</h2>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex gap-2 text-foreground-secondary text-sm">
                      <span className="text-foreground-faint mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{ t.detailDescription}</h2>
                <div className="text-foreground-secondary space-y-4 text-sm leading-relaxed">
                  <p>{course.description}</p>
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{ t.detailInstructor}</h2>
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-full bg-surface-raised flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-bold text-foreground">{course.instructor.charAt(0)}</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">{course.instructor}</h3>
                      <a
                        href={instructorLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-surface-raised border border-border-muted hover:bg-surface-hover text-white rounded transition-all text-sm font-medium"
                      >
                        პროფილი
                      </a>
                    </div>
                    <p className="text-foreground-subtle text-sm">{course.instructorTitle || 'ექსპერტი ინსტრუქტორი'}</p>
                    <div className="flex items-center gap-6 text-sm text-foreground-subtle">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>{course.rating} ინსტრუქტორის რეიტინგი</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} {t.detailStudents}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4" />
                        <span>{Math.floor(Math.random() * 10) + 5} {t.detailCourses}</span>
                      </div>
                    </div>
                    <p className="text-foreground-secondary text-sm leading-relaxed pt-2">
                      {course.instructorBio || `${course.instructor} — გამოცდილი ინსტრუქტორი ამ სფეროში.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{ t.detailFeedback}</h2>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold text-yellow-500">{averageRating}</span>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-foreground-faint'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-foreground-subtle">კურსის რეიტინგი</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border-subtle last:border-0">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-foreground">{review.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{review.author}</h4>
                            <span className="text-xs text-foreground-faint">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-foreground-faint'}`} />
                            ))}
                          </div>
                          <p className="text-foreground-secondary text-sm leading-relaxed mb-3">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-foreground-faint">
                            <button className="flex items-center gap-1 hover:text-foreground-secondary transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                              სასარგებლო ({review.helpful})
                            </button>
                            <button className="hover:text-foreground-secondary transition-colors">რეპორტი</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Course Info Card */}
                <div className="bg-card rounded-xl border border-border-subtle p-6 space-y-4 shadow-lg">
                  <div className="aspect-video w-full rounded overflow-hidden mb-4 relative group cursor-pointer">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-overlay/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-16 h-16 text-white fill-white" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-foreground">${discountedPrice}</span>
                      <span className="text-lg text-foreground-faint line-through">${originalPrice}</span>
                      <span className="text-sm font-semibold text-foreground bg-yellow-600 px-2 py-1 rounded">{discount}% off</span>
                    </div>
                    <p className="text-xs text-red-400 font-semibold">2 days left at this price!</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      onClick={handleEnroll}
                      disabled={checkout.isPending}
                      className="w-full h-10 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                      {checkout.isPending ? '...' : isEnrolled ? 'გაგრძელება' : t.detailEnroll}
                    </button>
                    <button className="w-full h-12 rounded-full border border-border-muted hover:bg-surface-raised text-white font-semibold transition-all">
                      {t.detailWishlist}
                    </button>
                  </div>

                  <p className="text-center text-xs text-foreground-subtle pt-2">{t.detailGuarantee}</p>
                  
                  <div className="border-t border-border-subtle pt-4 space-y-3 text-sm">
                    <h3 className="font-bold text-foreground mb-3">This course includes:</h3>
                    <div className="flex items-center gap-3 text-foreground-secondary">
                      <Clock className="w-4 h-4 text-foreground-subtle flex-shrink-0" />
                      <span>{course.duration} ვიდეო მოთხოვნით</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground-secondary">
                      <FileText className="w-4 h-4 text-foreground-subtle flex-shrink-0" />
                      <span>ჩამოტვირთვადი რესურსები</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground-secondary">
                      <Infinity className="w-4 h-4 text-foreground-subtle flex-shrink-0" />
                      <span>სრული უვადო წვდომა</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground-secondary">
                      <Smartphone className="w-4 h-4 text-foreground-subtle flex-shrink-0" />
                      <span>მობილურსა და TV-ზე წვდომა</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground-secondary">
                      <Award className="w-4 h-4 text-foreground-subtle flex-shrink-0" />
                      <span>დასრულების სერტიფიკატი</span>
                    </div>
                  </div>

                  <div className="border-t border-border-subtle pt-4">
                    <button className="w-full text-center text-sm text-foreground-subtle hover:text-white transition-colors">
                      Share <Share2 className="w-4 h-4 inline ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Like This */}
          {relatedCourses.length > 0 && (
            <div className="mt-20 mb-12">
              <CourseRow title={t.detailMoreLikeThis} courses={relatedCourses} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}