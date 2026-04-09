import { useState } from 'react';
import { submitCourseRegistration, submitMasterclassRegistration } from '../../lib/supabase-api';

interface RegistrationForm {
  full_name: string;
  email: string;
  phone: string;
}

export function useCourseRegistration(courseId: number) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (form: RegistrationForm) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await submitCourseRegistration({ course_id: courseId, ...form });
      setIsSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'რეგისტრაცია ვერ მოხერხდა');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, isSubmitted, error, reset: () => { setIsSubmitted(false); setError(null); } };
}

export function useMasterclassRegistration(masterclassId: number) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (form: RegistrationForm) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await submitMasterclassRegistration({ masterclass_id: masterclassId, ...form });
      setIsSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'რეგისტრაცია ვერ მოხერხდა');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, isSubmitted, error, reset: () => { setIsSubmitted(false); setError(null); } };
}
