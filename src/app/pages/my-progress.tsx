import { CourseCard } from '../components/course-card';
import { courses } from '../data/courses';
import { ChevronDown, Search, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function MyProgress() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all-courses');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock progress data with different states
  const enrolledCourses = courses.map((course, index) => ({
    ...course,
    progress: index === 0 ? 100 : index === 1 ? 75 : index === 2 ? 45 : Math.floor(Math.random() * 60) + 15,
    completedLessons: index === 0 ? course.lessons : index === 1 ? Math.floor(course.lessons * 0.75) : Math.floor(course.lessons * 0.4),
    isCompleted: index === 0,
    lastAccessed: index === 0 ? 'Completed 2 weeks ago' : index === 1 ? '3 days ago' : '1 week ago',
  }));

  const currentStreak = 0; // weeks
  const courseMinutesGoal = 30;
  const courseMinutesCompleted = 0;
  const visitsCompleted = 1;
  const visitsGoal = 1;
  const weekDates = 'Mar 22 - 28';

  const tabs = [
    { id: 'all-courses', label: 'All courses' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'wishlist', label: 'Wishlist' },
  ];

  const handleCourseClick = (courseId: string, isCompleted: boolean) => {
    if (isCompleted) {
      // Navigate to course detail to view certificate
      navigate(`/course/${courseId}`);
    } else {
      // Navigate to course session to continue learning
      navigate(`/course/${courseId}/session`);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 px-4 md:px-8 lg:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">My learning</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-800">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search my courses"
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-300 transition-colors whitespace-nowrap"
            >
              Recently Accessed
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-2xl z-10">
                <div className="p-2">
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 rounded">Recently Accessed</button>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 rounded">Recently Enrolled</button>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 rounded">Title: A-Z</button>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 rounded">Title: Z-A</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Count */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">{enrolledCourses.length} courses</h2>
        </div>

        {/* Enrolled Courses */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="relative">
              <CourseCard course={course} />
              
              {/* Progress Badge Overlay */}
              <div className="absolute top-3 left-3 z-40 pointer-events-none">
                {course.isCompleted ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/95 backdrop-blur-sm rounded-full shadow-lg">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wide">Completed</span>
                  </div>
                ) : (
                  <div className="px-2.5 py-1 bg-[#E50914]/95 backdrop-blur-sm rounded-full shadow-lg">
                    <span className="text-white text-xs font-bold uppercase tracking-wide">{course.progress}%</span>
                  </div>
                )}
              </div>

              {/* Progress Bar Overlay */}
              {!course.isCompleted && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/80 z-40 rounded-b-lg overflow-hidden pointer-events-none">
                  <div
                    className="h-full bg-[#E50914] transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}