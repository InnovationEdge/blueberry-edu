import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { CourseCard } from '../components/course-card';
import { CategoryIcon } from '../components/category-icon';
import { courses, categories } from '../data/courses';

export function Library() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [contentFilter, setContentFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  
  // Mock saved courses - in a real app, this would come from user data
  const savedCourses = courses;

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === 'all' 
    ? savedCourses 
    : savedCourses.filter(course => 
        course.category.some(cat => {
          const categoryMap: Record<string, string> = {
            food: 'Food',
            arts: 'Arts & Entertainment',
            music: 'Music',
            writing: 'Writing',
            sports: 'Sports & Gaming',
            design: 'Design & Style',
            business: 'Business',
            tech: 'Science & Tech',
            lifestyle: 'Home & Lifestyle',
          };
          return cat.includes(categoryMap[selectedCategory]);
        })
      );

  return (
    <div className="min-h-screen bg-black pt-20 pb-20">
      {/* Categories Section */}
      <div className="px-4 md:px-12 pt-8 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Categories</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-5 py-3 rounded-lg border transition-all ${
                selectedCategory === category.id
                  ? 'bg-white border-white text-black'
                  : 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div className="flex flex-col items-center gap-1.5 min-w-[70px]">
                <CategoryIcon 
                  iconName={category.icon} 
                  className={`w-5 h-5 ${selectedCategory === category.id ? 'text-black' : 'text-gray-300'}`} 
                />
                <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 md:px-12">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="text-xl font-bold text-white mb-6">Filters</h3>
              
              {/* Format Filter */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full text-white font-semibold mb-3">
                  <span>Format</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-2 pl-1">
                  {['All', 'Video', 'Audio', 'Interactive'].map((format) => (
                    <label key={format} className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                      <input 
                        type="radio" 
                        name="format" 
                        className="mr-3 accent-red-600" 
                        defaultChecked={format === 'All'}
                      />
                      <span className="text-sm">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* My Content Filter */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full text-white font-semibold mb-3">
                  <span>My Content</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-2 pl-1">
                  {['All', 'In Progress', 'Completed', 'Saved'].map((content) => (
                    <label key={content} className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                      <input 
                        type="radio" 
                        name="content" 
                        className="mr-3 accent-red-600" 
                        defaultChecked={content === 'All'}
                      />
                      <span className="text-sm">{content}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full text-white font-semibold mb-3">
                  <span>Duration</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-2 pl-1">
                  {['All', 'Under 3 hours', '3-6 hours', 'Over 6 hours'].map((duration) => (
                    <label key={duration} className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                      <input 
                        type="radio" 
                        name="duration" 
                        className="mr-3 accent-red-600" 
                        defaultChecked={duration === 'All'}
                      />
                      <span className="text-sm">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <p className="text-2xl text-gray-300 font-bold mb-4">No courses found</p>
                <p className="text-gray-500 text-lg">
                  Try adjusting your filters or browse all categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}