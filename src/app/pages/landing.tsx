import { useState } from 'react';
import { ChevronRight, ChevronLeft, Tv, Download, Smartphone, Users, Award, Globe, BookOpen, Video, CheckCircle, Gift } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { courses } from '../data/courses';

export function Landing() {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { openLogin } = useAuth();

  const languages = ['English', 'Español', 'Français', 'Deutsch', '日本語', '한국어'];

  // Instructor headshots for the grid
  const instructors = [
    { 
      name: 'Sarah Chen', 
      image: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ0NDY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      position: 'col-span-2 row-span-2',
      delay: '0s'
    },
    { 
      name: 'Chef Marcus', 
      image: 'https://images.unsplash.com/photo-1759521296144-fe6f2d2dc769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ0NjYyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      position: 'col-span-2 row-span-1',
      delay: '2s'
    },
    { 
      name: 'Elena Rodriguez', 
      image: 'https://images.unsplash.com/photo-1763757321139-e7e4de128cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHJlZCUyMG91dGZpdCUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0NDY2MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      position: 'col-span-2 row-span-1',
      delay: '4s'
    },
    { 
      name: 'Mike Johnson', 
      image: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzQ0NjYyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      position: 'col-span-2 row-span-2',
      delay: '1s'
    },
    { 
      name: 'David Kim', 
      image: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0NDQ2NTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      position: 'col-span-2 row-span-1',
      delay: '3s'
    },
    { 
      name: 'Rachel Adams', 
      image: 'https://images.unsplash.com/photo-1762522926984-e721bff0d6c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc0NDY2ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      position: 'col-span-2 row-span-1',
      delay: '5s'
    },
  ];

  // Top 5 trending courses
  const trendingCourses = courses.slice(0, 5);

  // Duplicate courses for seamless loop animation
  const animatedCourses = [...courses, ...courses];

  // Testimonials
  const testimonials = [
    {
      quote: "I was about to give up on my dreams when I started Hans Zimmer's class. It was like someone gave me a slap in the face. He said, 'are you wasting your life or are you not wasting your life? And that's when I realized. I dont want to waste another minute of it.",
      name: "Mirko",
      role: "Music Composer, Serbia",
      image: "https://images.unsplash.com/photo-1764112781095-24e1bf17eec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtdXNpY2lhbiUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDQ2Nzc5MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      quote: "Taking Sarah Chen's business strategy course completely transformed how I approach leadership. Her insights gave me the confidence to pivot my career and start my own consulting firm. I'm now living my dream.",
      name: "Jessica",
      role: "Business Consultant, USA",
      image: "https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwZXhlY3V0aXZlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NDY3NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      quote: "The culinary masterclass opened up a whole new world for me. I went from cooking at home to opening my own restaurant. The techniques and passion from the instructors are unmatched.",
      name: "Marco",
      role: "Chef & Restaurant Owner, Italy",
      image: "https://images.unsplash.com/photo-1611657365907-1ca5d9799f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwa2l0Y2hlbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDQ2Nzc5MHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  // Features
  const features = [
    {
      icon: Tv,
      title: 'Enjoy on your TV',
      description: 'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.'
    },
    {
      icon: Download,
      title: 'Download your courses offline',
      description: 'Save your favorites easily and always have something to watch.'
    },
    {
      icon: Smartphone,
      title: 'Watch everywhere',
      description: 'Stream unlimited courses and lessons on your phone, tablet, laptop, and TV.'
    },
    {
      icon: Users,
      title: 'Create profiles for learners',
      description: 'Send learners on adventures with their favorite instructors.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openLogin();
  };

  const handleSignIn = () => {
    openLogin();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-6 bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E50914] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">B</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              BrightMind
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-white rounded-md hover:border-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{language}</span>
              </button>
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-black/95 backdrop-blur-xl border border-gray-800 rounded-md shadow-2xl overflow-hidden">
                  {languages.map((lang, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className={`block w-full px-4 py-2.5 text-sm text-left transition-colors ${
                        language === lang 
                          ? 'bg-[#E50914] text-white' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Sign In Button */}
            <button 
              onClick={handleSignIn}
              className="px-6 py-2 bg-[#E50914] text-white rounded-md hover:bg-[#c70812] transition-colors font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 md:px-12 lg:px-16 pt-24 pb-12">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tight">
              Learn from the best,<br />
              Be your best.
            </h2>

            <p className="text-lg md:text-xl text-gray-300">
              Get unlimited access to thousands of bite-sized lessons.
            </p>

            <div className="pt-4">
              <p className="text-base mb-6 text-gray-200">
                Ready to watch? Enter your email to create or restart your membership.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="flex-1 px-5 py-3.5 bg-black/70 border-2 border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-[#E50914] text-white rounded-md hover:bg-[#c70812] transition-all font-bold flex items-center justify-center gap-2 group hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Instructor Grid */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
            {/* Animated container */}
            <div className="absolute inset-0 animate-scroll-vertical-instructor">
              {/* First set of instructors - Masonry Layout */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Column 1 */}
                <div className="space-y-3">
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[0].image}
                      alt={instructors[0].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[320px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[1].image}
                      alt={instructors[1].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[2].image}
                      alt={instructors[2].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Column 2 */}
                <div className="space-y-3">
                  <div className="h-[320px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[3].image}
                      alt={instructors[3].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[4].image}
                      alt={instructors[4].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[5].image}
                      alt={instructors[5].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Second set for seamless loop - Masonry Layout */}
              <div className="grid grid-cols-2 gap-3">
                {/* Column 1 */}
                <div className="space-y-3">
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[0].image}
                      alt={instructors[0].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[320px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[1].image}
                      alt={instructors[1].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[2].image}
                      alt={instructors[2].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Column 2 */}
                <div className="space-y-3">
                  <div className="h-[320px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[3].image}
                      alt={instructors[3].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[4].image}
                      alt={instructors[4].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-[160px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={instructors[5].image}
                      alt={instructors[5].name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add animation styles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-float-up {
          animation: floatUp 3s infinite;
        }

        @keyframes scrollVertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .animate-scroll-vertical {
          animation: scrollVertical 60s linear infinite;
        }

        .animate-scroll-vertical:hover {
          animation-play-state: paused;
        }

        @keyframes scrollVerticalInstructor {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .animate-scroll-vertical-instructor {
          animation: scrollVerticalInstructor 60s linear infinite;
        }

        .animate-scroll-vertical-instructor:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Divider */}
      <div className="h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      {/* What's Included Section - Pay Per Course */}
      <section className="py-20 px-4 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Heading & Buttons */}
          <div className="space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              What's included in every BrightMind course?
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleSignIn}
                className="px-8 py-3.5 bg-[#E50914] text-white rounded-md hover:bg-[#c70812] transition-all font-bold text-lg hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
              <button 
                onClick={handleSignIn}
                className="px-8 py-3.5 border border-gray-600 text-white rounded-md hover:border-white transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5" />
                Gift
              </button>
            </div>
          </div>

          {/* Right Side - Features List */}
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">All 200+ classes and original series</h4>
                <p className="text-sm text-gray-400">Pay per course, learn at your own pace</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Audio-only lessons</h4>
                <p className="text-sm text-gray-400">Learn on the go with audio</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Download and watch offline</h4>
                <p className="text-sm text-gray-400">Access your courses anywhere, anytime</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Watch on desktop, TV, or mobile devices</h4>
                <p className="text-sm text-gray-400">Learn from any device you own</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">New classes added every month</h4>
                <p className="text-sm text-gray-400">Fresh content from world-class instructors</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">30-day money back guarantee</h4>
                <p className="text-sm text-gray-400">Try risk-free with full refund</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center py-16 border-t border-gray-900">
          <h4 className="text-3xl md:text-4xl font-bold mb-4">Work changed.</h4>
          <h4 className="text-3xl md:text-4xl font-bold mb-8">It's time learning did too.</h4>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-gray-400">Pay per course to access all classes</span>
            <button 
              onClick={handleSignIn}
              className="px-8 py-3.5 bg-[#E50914] text-white rounded-md hover:bg-[#c70812] transition-all font-bold hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      {/* Trending Now Section */}
      <section className="py-20 overflow-hidden">
        <div className="px-4 md:px-12 lg:px-16 mb-10">
          <h3 className="text-3xl md:text-4xl font-bold">Trending Now</h3>
        </div>
        
        {/* Animated scrolling container */}
        <div className="relative">
          <div className="flex gap-4 animate-scroll-up">
            {animatedCourses.map((course, index) => (
              <div key={`${course.id}-${index}`} className="group relative cursor-pointer flex-shrink-0 w-[200px] md:w-[240px]">
                <div className="relative rounded-lg overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  {/* Course Image */}
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                
                {/* Course Info */}
                <div className="mt-3 px-1">
                  <h4 className="font-bold text-sm line-clamp-1">{course.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-1">{course.instructor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add animation styles */}
      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-up {
          animation: scrollUp 60s linear infinite;
        }

        .animate-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Divider */}
      <div className="h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      {/* Certificate Section */}
      <section className="py-20 px-4 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Certificate Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1638636241638-aef5120c5153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGFjaGlldmVtZW50JTIwZGlwbG9tYSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc0NDY4ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Course Completion Certificate"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#E50914]/20 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#E50914]/10 rounded-full blur-2xl" />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E50914]/10 border border-[#E50914]/30 rounded-full">
              <Award className="w-5 h-5 text-[#E50914]" />
              <span className="text-sm font-semibold text-[#E50914]">Certification</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-black leading-tight">
              Earn Your Certificate of Completion
            </h3>

            <p className="text-lg text-gray-300 leading-relaxed">
              Complete any course and receive a personalized certificate to showcase your achievement. Share it on LinkedIn, add it to your resume, or frame it on your wall.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#E50914] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">Verified Completion</h4>
                  <p className="text-sm text-gray-400">Official certificate with unique verification code</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#E50914] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">Shareable Credentials</h4>
                  <p className="text-sm text-gray-400">Add to your LinkedIn profile and professional portfolio</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#E50914] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">Lifetime Access</h4>
                  <p className="text-sm text-gray-400">Download and keep your certificate forever</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSignIn}
                className="px-8 py-4 bg-[#E50914] text-white rounded-md hover:bg-[#c70812] transition-all font-bold text-lg flex items-center gap-2 group hover:scale-105 active:scale-95"
              >
                Start Learning Today
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      {/* Testimonials Carousel Section */}
      <section className="py-20 px-4 md:px-12 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto relative">
          {/* Testimonial Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Quote Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 md:p-12 shadow-2xl min-h-[300px] flex flex-col justify-center">
              <blockquote className="text-lg md:text-xl leading-relaxed mb-6 text-gray-100">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div>
                <p className="font-bold text-white">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-gray-400">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-gray-800/90 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-gray-800/90 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${ 
                  currentTestimonial === index 
                    ? 'bg-[#E50914] w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      {/* Footer */}
      <footer className="py-16 px-4 md:px-12 lg:px-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Account</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Preferences</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Corporate Info</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">B</span>
              </div>
              <span className="text-lg font-black text-white">BrightMind</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 BrightMind Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}