import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';

export interface LandingStat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  sort_order: number;
}

export interface LandingTestimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  sort_order: number;
}

export interface LandingFaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export function useLandingStats() {
  return useQuery({
    queryKey: ['landing-stats'],
    queryFn: async (): Promise<LandingStat[]> => {
      const { data, error } = await supabase
        .from('landing_stats')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as LandingStat[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingTestimonials() {
  return useQuery({
    queryKey: ['landing-testimonials'],
    queryFn: async (): Promise<LandingTestimonial[]> => {
      const { data, error } = await supabase
        .from('landing_testimonials')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as LandingTestimonial[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLandingFaq() {
  return useQuery({
    queryKey: ['landing-faq'],
    queryFn: async (): Promise<LandingFaqItem[]> => {
      const { data, error } = await supabase
        .from('landing_faq')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as LandingFaqItem[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
