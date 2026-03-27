import { useNavigate, useParams } from 'react-router';
import { CheckCircle, Download, Calendar, Clock, BarChart3, Award, Sparkles } from 'lucide-react';
import { getCourseById } from '../data/courses';
import { ScaleIn, StaggerItem } from '../components/page-transition';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = getCourseById(id || '');

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        {/* Success Animation */}
        <ScaleIn>
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#E50914] blur-3xl opacity-40 rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-[#E50914] to-[#b8070f] rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Welcome to Your Course!
            </h1>
            <p className="text-lg text-gray-400">
              Payment successful • Course unlocked
            </p>
          </div>

          {/* Course Card */}
          <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 mb-8">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Course Thumbnail */}
              <div className="md:col-span-2 relative h-48 md:h-auto">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Course Details */}
              <div className="md:col-span-3 p-6 md:p-8 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#E50914]" />
                    <span className="text-xs font-bold text-[#E50914] uppercase tracking-wider">
                      Now Learning
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {course.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3">
                    with <span className="text-white font-semibold">{course.instructor}</span>
                  </p>
                </div>

                {/* Course Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                      <p className="text-white font-semibold">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Level</p>
                      <p className="text-white font-semibold">{course.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Download className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Lessons</p>
                      <p className="text-white font-semibold">{course.lessons} videos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                      <Award className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Certificate</p>
                      <p className="text-white font-semibold">Included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              What's Included
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Lifetime access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Mobile & TV access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Certificate of completion</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Downloadable resources</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Community access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Instructor Q&A</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => navigate(`/course/${course.id}/session`)}
              className="flex-1 px-8 py-4 bg-[#E50914] text-white text-lg font-bold rounded-md hover:bg-[#c40812] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#E50914]/30"
            >
              Start Learning Now
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-zinc-800 text-white text-lg font-semibold rounded-md hover:bg-zinc-700 transition-all"
            >
              Browse More Courses
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-500 text-sm">
            Your course has been added to <span className="text-white font-semibold">My Progress</span>
          </p>
        </ScaleIn>
      </div>
    </div>
  );
}