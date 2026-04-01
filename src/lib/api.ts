/// <reference types="vite/client" />
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — unwrap { data, error, meta } shape
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ─── Types ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  error: null | { code: string; message: string };
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CourseFromApi {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  thumbnailUrl: string;
  price: string;
  currency: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  language: string;
  avgRating: string;
  totalReviews: number;
  totalStudents: number;
  lessonCount: number;
  totalDurationMin: number;
  isNew: boolean;
  isFeatured: boolean;
  status: string;
  publishedAt: string;
  instructor: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
    isVerified: boolean;
  };
  courseCategories: Array<{
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}

export interface CategoryFromApi {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
}

// ─── Adapter: API → Frontend Course ───────────────────────────────────

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

const LEVEL_MAP: Record<string, Course['level']> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  ALL_LEVELS: 'All Levels',
};

function formatDuration(totalMin: number): string {
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function apiCourseToCourse(c: CourseFromApi): Course {
  return {
    id: c.id,
    title: c.title,
    subtitle: c.subtitle,
    instructor: c.instructor.displayName,
    category: c.courseCategories.map(cc => cc.category.name),
    thumbnail: c.thumbnailUrl,
    duration: formatDuration(c.totalDurationMin),
    level: LEVEL_MAP[c.level] || 'All Levels',
    lessons: c.lessonCount,
    isNew: c.isNew,
    rating: parseFloat(c.avgRating),
    students: c.totalStudents,
  };
}

// ─── API Functions ────────────────────────────────────────────────────

export async function fetchCourses(params?: {
  category?: string;
  level?: string;
  featured?: boolean;
  sort?: string;
  q?: string;
  page?: number;
  limit?: number;
}) {
  const { data } = await api.get<ApiResponse<CourseFromApi[]>>('/courses', { params });
  return data;
}

export interface SectionFromApi {
  id: string;
  title: string;
  sortOrder: number;
  lessons: LessonFromApi[];
}

export interface LessonFromApi {
  id: string;
  title: string;
  durationMin: number;
  sortOrder: number;
  isFreePreview: boolean;
  type: string;
  videoStatus: string;
}

export interface CourseDetailFromApi extends CourseFromApi {
  description: string;
  shortDescription: string;
  price: string;
  currency: string;
  sections: SectionFromApi[];
  instructor: CourseFromApi['instructor'] & {
    title?: string;
    bio?: string;
    expertise?: string[];
  };
}

export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  instructor: string;
  instructorBio: string;
  instructorTitle: string;
  category: string[];
  thumbnail: string;
  duration: string;
  level: Course['level'];
  lessons: number;
  isNew: boolean;
  rating: number;
  students: number;
  totalReviews: number;
  price: number;
  currency: string;
  sections: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
      preview: boolean;
    }>;
  }>;
}

export function apiCourseDetailToDetail(c: CourseDetailFromApi): CourseDetail {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    description: c.description || c.shortDescription,
    instructor: c.instructor.displayName,
    instructorBio: c.instructor.bio || '',
    instructorTitle: c.instructor.title || '',
    category: c.courseCategories.map(cc => cc.category.name),
    thumbnail: c.thumbnailUrl,
    duration: formatDuration(c.totalDurationMin),
    level: LEVEL_MAP[c.level] || 'All Levels',
    lessons: c.lessonCount,
    isNew: c.isNew,
    rating: parseFloat(c.avgRating),
    students: c.totalStudents,
    totalReviews: c.totalReviews,
    price: parseFloat(c.price),
    currency: c.currency,
    sections: (c.sections || []).map(s => ({
      id: s.id,
      title: s.title,
      lessons: s.lessons.map(l => ({
        id: l.id,
        title: l.title,
        duration: `${l.durationMin}min`,
        preview: l.isFreePreview,
      })),
    })),
  };
}

export async function fetchCourse(idOrSlug: string) {
  const { data } = await api.get<ApiResponse<CourseDetailFromApi>>(`/courses/${idOrSlug}`);
  return data;
}

export async function fetchCategories() {
  const { data } = await api.get<ApiResponse<CategoryFromApi[]>>('/categories');
  return data;
}

// ─── Auth API ─────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  avatarUrl?: string;
  preferredLanguage: string;
  onboardingCompleted: boolean;
}

export async function authRegister(data: { email: string; password: string; name: string }) {
  const res = await api.post<ApiResponse<{ user: AuthUser; token: string }>>('/auth/register', data);
  return res.data;
}

export async function authLogin(data: { email: string; password: string }) {
  const res = await api.post<ApiResponse<{ user: AuthUser; token: string }>>('/auth/login', data);
  return res.data;
}

export async function authLogout() {
  await api.post('/auth/logout');
}

export async function authMe() {
  const res = await api.get<ApiResponse<{ user: AuthUser }>>('/auth/me');
  return res.data;
}

// Set auth token for subsequent requests
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('bm_token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('bm_token');
  }
}

// Restore token from localStorage on load
const savedToken = typeof window !== 'undefined' ? localStorage.getItem('bm_token') : null;
if (savedToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}
