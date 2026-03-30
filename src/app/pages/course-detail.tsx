import { useParams, Link, useNavigate } from 'react-router';
import { getCourseById, courses } from '../data/courses';
import { Play, Plus, Share2, ChevronDown, ChevronUp, Check, Star, Clock, BarChart3, Globe, PlayCircle, FileText, Award, Users, Calendar, Infinity, Smartphone, Tv, ThumbsUp, ArrowLeft, Linkedin } from 'lucide-react';
import { CourseRow } from '../components/course-row';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

export function CourseDetail() {
  const { language } = useAuth();
  const t = getAppT(language);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : null;
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl text-white">{t.detailNotFound}</h1>
          <Link to="/" className="text-red-600 hover:underline">
            {t.detailReturnHome}
          </Link>
        </div>
      </div>
    );
  }

  const relatedCourses = courses.filter(
    (c) => c.id !== course.id && c.category.some((cat) => course.category.includes(cat))
  ).slice(0, 8);

  // Mock price
  const originalPrice = 89.99;
  const discountedPrice = 14.99;
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  // Mock LinkedIn URL
  const instructorLinkedIn = `https://www.linkedin.com/in/${course.instructor.toLowerCase().replace(/\s+/g, '-')}`;

  // Mock comprehensive course data
  const learningOutcomes = [
    'Master the fundamental concepts and advanced techniques',
    'Build real-world projects from scratch',
    'Understand industry best practices and workflows',
    'Gain hands-on experience with modern tools and technologies',
    'Learn strategies used by top professionals in the field',
    'Develop a complete portfolio project',
    'Access downloadable resources and templates',
    'Get lifetime access to course materials and updates'
  ];

  const courseSections = [
    {
      title: 'Getting Started',
      lectures: 8,
      duration: '45min',
      lessons: [
        { title: 'Welcome to the Course', duration: '5min', preview: true },
        { title: 'Course Overview and Structure', duration: '8min', preview: true },
        { title: 'Required Tools and Setup', duration: '12min', preview: false },
        { title: 'Understanding the Basics', duration: '10min', preview: false },
        { title: 'Your First Project', duration: '10min', preview: false }
      ]
    },
    {
      title: 'Core Concepts',
      lectures: 15,
      duration: '2hr 30min',
      lessons: [
        { title: 'Foundation Principles', duration: '18min', preview: false },
        { title: 'Advanced Techniques Part 1', duration: '22min', preview: false },
        { title: 'Advanced Techniques Part 2', duration: '20min', preview: false },
        { title: 'Practical Applications', duration: '25min', preview: false },
        { title: 'Common Mistakes to Avoid', duration: '15min', preview: false }
      ]
    },
    {
      title: 'Hands-On Projects',
      lectures: 12,
      duration: '3hr 15min',
      lessons: [
        { title: 'Project 1: Beginner Level', duration: '35min', preview: false },
        { title: 'Project 2: Intermediate Level', duration: '45min', preview: false },
        { title: 'Project 3: Advanced Level', duration: '55min', preview: false },
        { title: 'Best Practices and Optimization', duration: '30min', preview: false }
      ]
    },
    {
      title: 'Advanced Topics',
      lectures: 10,
      duration: '2hr 45min',
      lessons: [
        { title: 'Expert-Level Strategies', duration: '28min', preview: false },
        { title: 'Industry Secrets', duration: '32min', preview: false },
        { title: 'Professional Workflow', duration: '25min', preview: false },
        { title: 'Case Studies', duration: '40min', preview: false }
      ]
    },
    {
      title: 'Final Project and Next Steps',
      lectures: 6,
      duration: '1hr 30min',
      lessons: [
        { title: 'Capstone Project Brief', duration: '10min', preview: false },
        { title: 'Building Your Portfolio', duration: '25min', preview: false },
        { title: 'Course Summary and Key Takeaways', duration: '15min', preview: false },
        { title: 'Bonus Resources and Materials', duration: '20min', preview: false },
        { title: 'Next Steps in Your Journey', duration: '20min', preview: false }
      ]
    }
  ];

  const requirements = [
    'No prior experience required - we start from the basics',
    'A computer with internet connection',
    'Willingness to learn and practice',
    'Approximately 4-6 hours per week for hands-on practice'
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'S',
      rating: 5,
      date: '2 weeks ago',
      comment: 'This course exceeded my expectations! The instructor explains complex concepts in a clear and engaging way. I went from complete beginner to building real projects. Highly recommend!',
      helpful: 45
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'M',
      rating: 5,
      date: '1 month ago',
      comment: 'Absolutely brilliant course! The hands-on projects really helped solidify my understanding. The content is well-structured and easy to follow. Worth every penny.',
      helpful: 38
    },
    {
      id: 3,
      author: 'Emma Williams',
      avatar: 'E',
      rating: 4,
      date: '3 weeks ago',
      comment: 'Great course with comprehensive content. The instructor is knowledgeable and the pace is perfect for learning. Only minor suggestion would be to add more advanced examples.',
      helpful: 29
    },
    {
      id: 4,
      author: 'David Martinez',
      avatar: 'D',
      rating: 5,
      date: '1 week ago',
      comment: 'One of the best online courses I\'ve taken. The practical approach and real-world examples make it easy to apply what you learn immediately. Highly professional production quality.',
      helpful: 52
    },
    {
      id: 5,
      author: 'Lisa Anderson',
      avatar: 'L',
      rating: 5,
      date: '2 months ago',
      comment: 'This course changed my career! I was able to land a new job just 3 months after completing it. The skills I learned are directly applicable to real work scenarios.',
      helpful: 67
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const totalLectures = courseSections.reduce((sum, section) => sum + section.lectures, 0);
  const averageRating = course.rating;
  const totalReviews = Math.floor(course.students / 10);

  return (
    <div className="min-h-screen bg-[#141414] pt-16">
      {/* Back Navigation */}
      <div className="fixed top-20 left-4 md:left-12 lg:left-16 z-30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-zinc-800 flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 shadow-lg">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex items-center px-4 md:px-12 lg:px-16">
          <div className="max-w-3xl space-y-7">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex items-center gap-5 text-base text-gray-300">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-white">{course.rating}</span>
                <span className="text-gray-400">({totalReviews.toLocaleString()} ratings)</span>
              </div>
              <span>•</span>
              <span>{course.students.toLocaleString()} {t.detailStudents}</span>
            </div>

            <div className="text-base text-gray-400">
              {t.detailCreatedBy} <span className="text-gray-200 font-medium">{course.instructor}</span>
            </div>

            <div className="flex items-center gap-5 text-base text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{course.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <span>{course.level}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <span>English</span>
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
              <div className="bg-zinc-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">{t.detailWhatLearn}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-3">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{t.detailCourseContent}</h2>
                <div className="text-sm text-gray-400 mb-6">
                  {courseSections.length} {t.detailSections} • {totalLectures} {t.detailLectures} • {course.duration} {t.detailTotalLength}
                </div>
                <div className="space-y-2">
                  {courseSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-zinc-900 rounded overflow-hidden">
                      <button
                        onClick={() => toggleSection(sectionIndex)}
                        className="w-full flex items-center justify-between p-4 hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedSections.includes(sectionIndex) ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                          <span className="text-white font-semibold">{section.title}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {section.lectures} {t.detailLectures} • {section.duration}
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
                          <div className="border-t border-zinc-800">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-4 pl-12 hover:bg-zinc-800 transition-colors cursor-pointer group"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  {lesson.preview && (
                                    <span className="text-xs text-red-500 font-semibold">{t.detailPreview}</span>
                                  )}
                                  <span className="text-sm text-gray-400">{lesson.duration}</span>
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
                <h2 className="text-2xl font-bold text-white mb-4">{t.detailRequirements}</h2>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex gap-2 text-gray-300 text-sm">
                      <span className="text-gray-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{t.detailDescription}</h2>
                <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
                  <p>
                    {course.subtitle} This comprehensive course is designed to take you from beginner to advanced level,
                    covering everything you need to know to succeed in this field.
                  </p>
                  <p>
                    Throughout this course, you'll work on real-world projects that will help you build a strong portfolio
                    and gain practical experience. You'll learn industry-standard techniques and best practices used by
                    top professionals.
                  </p>
                  <p>
                    Whether you're looking to start a new career, enhance your current skills, or pursue a passion project,
                    this course provides you with the knowledge and tools you need to achieve your goals.
                  </p>
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{t.detailInstructor}</h2>
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-bold text-white">{course.instructor.charAt(0)}</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{course.instructor}</h3>
                      <a 
                        href={instructorLinkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all text-sm font-semibold"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    </div>
                    <p className="text-gray-400 text-sm">Expert Instructor & Industry Professional</p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>{course.rating} {t.detailRating}</span>
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
                    <p className="text-gray-300 text-sm leading-relaxed pt-2">
                      {course.instructor} is a renowned expert in the field with over 10 years of industry experience.
                      They have worked with leading companies and have helped thousands of students achieve their learning goals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{t.detailFeedback}</h2>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold text-yellow-500">{averageRating}</span>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-400">{t.detailRating}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-zinc-800 last:border-0">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-white">{review.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{review.author}</h4>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                            ))}
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                              {t.detailHelpful} ({review.helpful})
                            </button>
                            <button className="hover:text-gray-300 transition-colors">{t.detailReport}</button>
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
                <div className="bg-zinc-900 rounded-lg p-6 space-y-4 shadow-2xl">
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
                      <span className="text-lg text-gray-500 line-through">${originalPrice}</span>
                      <span className="text-sm font-semibold text-white bg-yellow-600 px-2 py-1 rounded">{discount}% {t.detailOff}</span>
                    </div>
                    <p className="text-xs text-red-400 font-semibold">2 days left at this price!</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button 
                      onClick={() => navigate(`/course/${course.id}/success`)}
                      className="w-full h-10 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all"
                    >
                      {t.detailEnroll}
                    </button>
                    <button className="w-full h-10 rounded border border-zinc-700 hover:bg-zinc-800 text-white font-semibold text-sm transition-all">
                      {t.detailWishlist}
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-400 pt-2">{t.detailGuarantee}</p>
                  
                  <div className="border-t border-zinc-800 pt-4 space-y-3 text-sm">
                    <h3 className="font-bold text-white mb-3">{t.detailIncludes}</h3>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Infinity className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Smartphone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Award className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4">
                    <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors">
                      {t.detailShare} <Share2 className="w-4 h-4 inline ml-1" />
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