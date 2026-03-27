export interface Course {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  category: string[];
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  lessons: number;
  isNew?: boolean;
  isCompleted?: boolean;
  rating: number;
  students: number;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Business Strategy Masterclass',
    subtitle: 'Build a Winning Business From Scratch',
    instructor: 'Sarah Chen',
    category: ['Business', 'Entrepreneurship'],
    thumbnail: 'https://images.unsplash.com/photo-1766867264693-e34f484d3371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHRlYWNoaW5nfGVufDF8fHx8MTc3NDM2OTIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3h 45m',
    level: 'Intermediate',
    lessons: 24,
    isNew: true,
    rating: 4.8,
    students: 12500,
  },
  {
    id: '2',
    title: 'Culinary Arts Excellence',
    subtitle: 'Master the Fundamentals of Fine Cooking',
    instructor: 'Chef Marcus Williams',
    category: ['Food', 'Culinary Arts'],
    thumbnail: 'https://images.unsplash.com/photo-1592498546551-222538011a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwY2hlZiUyMGtpdGNoZW58ZW58MXx8fHwxNzc0NDI2OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5h 20m',
    level: 'All Levels',
    lessons: 32,
    rating: 4.9,
    students: 18200,
  },
  {
    id: '3',
    title: 'Modern Art & Creativity',
    subtitle: 'Discover Your Artistic Voice',
    instructor: 'Elena Rodriguez',
    category: ['Arts & Entertainment', 'Visual Arts'],
    thumbnail: 'https://images.unsplash.com/photo-1604227070389-b88fd2896af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwYWludGluZyUyMHN0dWRpb3xlbnwxfHx8fDE3NzQ0MjMxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4h 15m',
    level: 'Beginner',
    lessons: 28,
    isNew: true,
    rating: 4.7,
    students: 9800,
  },
  {
    id: '4',
    title: 'Music Production Pro',
    subtitle: 'Create Professional Tracks From Home',
    instructor: 'DJ Alex Turner',
    category: ['Music', 'Audio Production'],
    thumbnail: 'https://images.unsplash.com/photo-1638883296886-6095d6c869d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMHBsYXlpbmclMjBndWl0YXJ8ZW58MXx8fHwxNzc0NDYyMTgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6h 30m',
    level: 'Intermediate',
    lessons: 42,
    rating: 4.9,
    students: 15600,
  },
  {
    id: '5',
    title: 'Creative Writing Workshop',
    subtitle: 'Tell Stories That Captivate Readers',
    instructor: 'James Patterson Jr.',
    category: ['Writing', 'Creative Arts'],
    thumbnail: 'https://images.unsplash.com/photo-1591013078076-42ae16047f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0ZXIlMjBhdXRob3IlMjB0eXBpbmd8ZW58MXx8fHwxNzc0NDYyMTgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4h 50m',
    level: 'All Levels',
    lessons: 30,
    isCompleted: true,
    rating: 4.8,
    students: 22100,
  },
  {
    id: '6',
    title: 'Fitness & Performance',
    subtitle: 'Transform Your Body and Mind',
    instructor: 'Coach Mike Johnson',
    category: ['Sports & Gaming', 'Health & Fitness'],
    thumbnail: 'https://images.unsplash.com/photo-1687349815539-047059cdc478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lciUyMHdvcmtvdXR8ZW58MXx8fHwxNzc0NDM4MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3h 20m',
    level: 'Beginner',
    lessons: 20,
    isNew: true,
    rating: 4.6,
    students: 14300,
  },
  {
    id: '7',
    title: 'UX/UI Design Mastery',
    subtitle: 'Design Beautiful Digital Experiences',
    instructor: 'Nina Patel',
    category: ['Design & Style', 'Digital Design'],
    thumbnail: 'https://images.unsplash.com/photo-1617264862369-fec440d23265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduZXIlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzQ0NjIxODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '7h 10m',
    level: 'Intermediate',
    lessons: 45,
    rating: 4.9,
    students: 19700,
  },
  {
    id: '8',
    title: 'Data Science Fundamentals',
    subtitle: 'Unlock the Power of Data Analytics',
    instructor: 'Dr. Rachel Kim',
    category: ['Science & Tech', 'Data Science'],
    thumbnail: 'https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc3NDQ0NzE2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '8h 45m',
    level: 'Advanced',
    lessons: 52,
    rating: 4.8,
    students: 11200,
  },
  {
    id: '9',
    title: 'Photography Essentials',
    subtitle: 'Capture Stunning Images Like a Pro',
    instructor: 'David Martinez',
    category: ['Arts & Entertainment', 'Photography'],
    thumbnail: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGNhbWVyYSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzQ0MjcxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5h 35m',
    level: 'All Levels',
    lessons: 36,
    isNew: true,
    rating: 4.7,
    students: 16800,
  },
  {
    id: '10',
    title: 'Mindfulness & Wellness',
    subtitle: 'Find Balance in Modern Life',
    instructor: 'Maya Thompson',
    category: ['Home & Lifestyle', 'Wellness'],
    thumbnail: 'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc3NDM5NDY3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2h 45m',
    level: 'Beginner',
    lessons: 18,
    rating: 4.9,
    students: 24500,
  },
  {
    id: '11',
    title: 'Web Development Bootcamp',
    subtitle: 'Build Modern Web Applications',
    instructor: 'Chris Anderson',
    category: ['Science & Tech', 'Programming'],
    thumbnail: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NzQ0MjI1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '12h 20m',
    level: 'Intermediate',
    lessons: 68,
    rating: 4.8,
    students: 31200,
  },
  {
    id: '12',
    title: 'Public Speaking Excellence',
    subtitle: 'Command Any Stage With Confidence',
    instructor: 'Angela Brooks',
    category: ['Business', 'Communication'],
    thumbnail: 'https://images.unsplash.com/photo-1772419216340-fd8abb4f55de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NzQ0NjIxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3h 55m',
    level: 'All Levels',
    lessons: 26,
    isNew: true,
    rating: 4.7,
    students: 13900,
  },
];

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', icon: 'layers' },
  { id: 'food', name: 'Food', icon: 'utensils' },
  { id: 'arts', name: 'Arts & Entertainment', icon: 'palette' },
  { id: 'music', name: 'Music', icon: 'music' },
  { id: 'writing', name: 'Writing', icon: 'pen-tool' },
  { id: 'sports', name: 'Sports & Gaming', icon: 'trophy' },
  { id: 'design', name: 'Design & Style', icon: 'layout' },
  { id: 'business', name: 'Business', icon: 'briefcase' },
  { id: 'tech', name: 'Science & Tech', icon: 'cpu' },
  { id: 'lifestyle', name: 'Home & Lifestyle', icon: 'home' },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getCoursesByCategory(categoryId: string): Course[] {
  if (categoryId === 'all') return courses;
  
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

  const categoryName = categoryMap[categoryId];
  return courses.filter((course) => 
    course.category.some((cat) => cat.includes(categoryName))
  );
}

export function getNewCourses(): Course[] {
  return courses.filter((course) => course.isNew);
}

export function getTopRatedCourses(): Course[] {
  return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 8);
}

export function getPopularCourses(): Course[] {
  return [...courses].sort((a, b) => b.students - a.students).slice(0, 8);
}
