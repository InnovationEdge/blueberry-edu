import { supabase } from './supabase';
import type { CourseCardData } from '../app/components/course-card-landing';

// ─── Types ───
export interface SupabaseCourse {
  id: number;
  title: string;
  description: string;
  tribe: string;
  duration: string;
  price: number;
  format: string;
  gradient: string;
  logo: string;
  popular: boolean;
  image_url: string | null;
  mentor_name: string;
  mentor_role: string;
  mentor_photo: string | null;
  mentor_bio: string | null;
  schedule_days: string;
  schedule_time: string;
  start_date: string;
  level: string;
  language: string;
  learning_outcomes: string[];
}

export interface CourseSyllabus {
  id: number;
  course_id: number;
  title: string;
  topics: string[];
  sort_order: number;
}

export interface CourseFaq {
  id: number;
  course_id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export interface Masterclass {
  id: number;
  course_id: number;
  date: string;
  time: string;
  courses?: Pick<SupabaseCourse, 'id' | 'title' | 'tribe' | 'logo'>;
}

// ─── Adapters ───
export function courseToCardData(c: SupabaseCourse): CourseCardData {
  return {
    id: c.id,
    title: c.title,
    desc: c.description,
    tribe: c.tribe,
    duration: c.duration,
    price: String(c.price),
    format: c.format,
    gradient: c.gradient,
    logo: c.logo,
    popular: c.popular,
  };
}

// ─── Courses ───
export async function fetchCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('id');
  if (error) throw error;
  return data as SupabaseCourse[];
}

export async function fetchCourse(id: number) {
  const { data, error } = await supabase
    .from('courses')
    .select('*, course_syllabus(*), course_faq(*)')
    .eq('id', id)
    .order('sort_order', { referencedTable: 'course_syllabus' })
    .order('sort_order', { referencedTable: 'course_faq' })
    .single();
  if (error) throw error;
  return data as SupabaseCourse & { course_syllabus: CourseSyllabus[]; course_faq: CourseFaq[] };
}

// ─── Masterclasses ───
export async function fetchMasterclasses() {
  const { data, error } = await supabase
    .from('masterclasses')
    .select('*, courses(id, title, tribe, logo)')
    .order('course_id');
  if (error) throw error;
  return data as Masterclass[];
}

// ─── Registrations ───
const DUPLICATE_ERROR_CODE = '23505';
const DUPLICATE_MESSAGE = 'ამ ემეილით უკვე დარეგისტრირებული ხარ';

function validateRegistrationInput(data: { full_name: string; email: string; phone: string }) {
  const name = data.full_name.trim();
  const email = data.email.trim().toLowerCase();
  const phone = data.phone.trim();
  if (!name) throw new Error('სახელი სავალდებულოა');
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('ემეილი არასწორია');
  if (!/^[+\d\s()-]{9,}$/.test(phone)) throw new Error('ტელეფონი არასწორია');
  return { full_name: name, email, phone };
}

export async function submitCourseRegistration(data: {
  course_id: number;
  full_name: string;
  email: string;
  phone: string;
}) {
  const clean = validateRegistrationInput(data);
  const { error } = await supabase
    .from('course_registrations')
    .insert({ course_id: data.course_id, ...clean });
  if (error) {
    if (error.code === DUPLICATE_ERROR_CODE) throw new Error(DUPLICATE_MESSAGE);
    throw error;
  }
}

export async function submitMasterclassRegistration(data: {
  masterclass_id: number;
  full_name: string;
  email: string;
  phone: string;
}) {
  const clean = validateRegistrationInput(data);
  const { error } = await supabase
    .from('masterclass_registrations')
    .insert({ masterclass_id: data.masterclass_id, ...clean });
  if (error) {
    if (error.code === DUPLICATE_ERROR_CODE) throw new Error(DUPLICATE_MESSAGE);
    throw error;
  }
}
