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

// ─── API Functions ────────────────────────────────────────────────────

export async function fetchCourses(params?: {
  category?: string;
  level?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const { data } = await api.get<ApiResponse<CourseFromApi[]>>('/courses', { params });
  return data;
}

export async function fetchCourse(idOrSlug: string) {
  const { data } = await api.get<ApiResponse<CourseFromApi>>(`/courses/${idOrSlug}`);
  return data;
}

export async function fetchCategories() {
  const { data } = await api.get<ApiResponse<CategoryFromApi[]>>('/categories');
  return data;
}
