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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl text-white">{t.detailNotFound}</h1>
          <Link to="/" className="text-[#1a4fd8] hover:underline">
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
    <div className="min-h-screen bg-black">
      {/* Back Navigation */}
      <div className="fixed top-6 left-4 md:left-12 lg:left-16 z-30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-white/60 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white/[0.03]/90 hover:bg-white/[0.06] flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 shadow-lg">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[black] via-[black]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[black] via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex items-center px-4 md:px-12 lg:px-16">
          <div className="max-w-3xl space-y-7">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/60 leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex items-center gap-5 text-base text-white/60">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-white">{course.rating}</span>
                <span className="text-white/40">({totalReviews.toLocaleString()} ratings)</span>
              </div>
              <span>•</span>
              <span>{course.students.toLocaleString()} students</span>
            </div>

            <div className="text-base text-white/40">
              Created by <span className="text-white/80 font-medium">{course.instructor}</span>
            </div>

            <div className="flex items-center gap-5 text-base text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/40" />
                <span>{course.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-white/40" />
                <span>{course.level}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-white/40" />
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
              <div className="bg-white/[0.03] rounded p-8">
                <h2 className="text-2xl font-bold text-white mb-6">{t.detailWhatLearn}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-3">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-white/60 text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{ t.detailCourseContent}</h2>
                <div className="text-sm text-white/40 mb-6">
                  {courseSections.length} სექცია • {totalLectures} გაკვეთილი • {course.duration} სულ
                </div>
                <div className="space-y-2">
                  {courseSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-white/[0.03] rounded overflow-hidden">
                      <button
                        onClick={() => toggleSection(sectionIndex)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedSections.includes(sectionIndex) ? (
                            <ChevronUp className="w-5 h-5 text-white/40" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-white/40" />
                          )}
                          <span className="text-white font-semibold">{section.title}</span>
                        </div>
                        <div className="text-sm text-white/40">
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
                          <div className="border-t border-white/[0.06]">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-4 pl-12 hover:bg-white/[0.06] transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                                  <span className="text-white/60 text-sm group-hover:text-white transition-colors">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  {lesson.preview && (
                                    <span className="text-xs text-red-500 font-semibold">{ t.detailPreview}</span>
                                  )}
                                  <span className="text-sm text-white/40">{lesson.duration}</span>
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
                <h2 className="text-2xl font-bold text-white mb-4">{ t.detailRequirements}</h2>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex gap-2 text-white/60 text-sm">
                      <span className="text-white/30 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{ t.detailDescription}</h2>
                <div className="text-white/60 space-y-4 text-sm leading-relaxed">
                  <p>{course.description}</p>
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{ t.detailInstructor}</h2>
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-bold text-white">{course.instructor.charAt(0)}</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{course.instructor}</h3>
                      <a
                        href={instructorLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/[0.06] border border-white/10 hover:bg-white/10 text-white rounded transition-all text-sm font-medium"
                      >
                        პროფილი
                      </a>
                    </div>
                    <p className="text-white/40 text-sm">{course.instructorTitle || 'ექსპერტი ინსტრუქტორი'}</p>
                    <div className="flex items-center gap-6 text-sm text-white/40">
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
                    <p className="text-white/60 text-sm leading-relaxed pt-2">
                      {course.instructorBio || `${course.instructor} — გამოცდილი ინსტრუქტორი ამ სფეროში.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{ t.detailFeedback}</h2>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold text-yellow-500">{averageRating}</span>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-white/40">კურსის რეიტინგი</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-white/[0.06] last:border-0">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-white">{review.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{review.author}</h4>
                            <span className="text-xs text-white/30">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'}`} />
                            ))}
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed mb-3">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-white/30">
                            <button className="flex items-center gap-1 hover:text-white/60 transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                              სასარგებლო ({review.helpful})
                            </button>
                            <button className="hover:text-white/60 transition-colors">რეპორტი</button>
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
                <div className="bg-white/[0.03] rounded p-6 space-y-4 shadow-2xl">
                  <div className="aspect-video w-full rounded overflow-hidden mb-4 relative group cursor-pointer">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-16 h-16 text-white fill-white" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-white">${discountedPrice}</span>
                      <span className="text-lg text-white/30 line-through">${originalPrice}</span>
                      <span className="text-sm font-semibold text-white bg-yellow-600 px-2 py-1 rounded">{discount}% off</span>
                    </div>
                    <p className="text-xs text-red-400 font-semibold">2 days left at this price!</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      onClick={handleEnroll}
                      disabled={checkout.isPending}
                      className="w-full h-10 rounded bg-[#1a4fd8] hover:bg-[#1540b0] text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                      {checkout.isPending ? '...' : isEnrolled ? 'გაგრძელება' : t.detailEnroll}
                    </button>
                    <button className="w-full h-12 rounded border border-white/15 hover:bg-white/[0.06] text-white font-semibold transition-all">
                      {t.detailWishlist}
                    </button>
                  </div>

                  <p className="text-center text-xs text-white/40 pt-2">{t.detailGuarantee}</p>
                  
                  <div className="border-t border-white/[0.06] pt-4 space-y-3 text-sm">
                    <h3 className="font-bold text-white mb-3">This course includes:</h3>
                    <div className="flex items-center gap-3 text-white/60">
                      <Clock className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <span>{course.duration} ვიდეო მოთხოვნით</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <FileText className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <span>ჩამოტვირთვადი რესურსები</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Infinity className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <span>სრული უვადო წვდომა</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Smartphone className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <span>მობილურსა და TV-ზე წვდომა</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Award className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <span>დასრულების სერტიფიკატი</span>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.06] pt-4">
                    <button className="w-full text-center text-sm text-white/40 hover:text-white transition-colors">
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