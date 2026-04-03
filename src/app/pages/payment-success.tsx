import { useNavigate, useParams } from 'react-router';
import { CheckCircle, Play, Clock, BarChart3, BookOpen, Award } from 'lucide-react';
import { useCourseDetail } from '../hooks/use-courses';
import { motion } from 'motion/react';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const { language } = useAuth();
  const t = getAppT(language);
  const { id } = useParams();
  const { data: course, isLoading } = useCourseDetail(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success icon */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-brand blur-[60px] opacity-30 rounded-full" />
            <div className="relative w-20 h-20 bg-brand rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{t.paymentWelcome}</h1>
          <p className="text-sm text-foreground-subtle">{t.paymentTitle}</p>
        </motion.div>

        {/* Course card */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-surface border border-border-subtle rounded overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnail */}
            <div className="md:w-2/5 relative">
              <div className="aspect-video md:aspect-auto md:h-full">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 hidden md:block" />
            </div>

            {/* Info */}
            <div className="flex-1 p-6 space-y-4">
              <div>
                <span className="text-brand text-[10px] font-bold uppercase tracking-widest">{t.paymentNowLearning}</span>
                <h2 className="text-xl font-black text-white mt-1">{course.title}</h2>
                <p className="text-sm text-foreground-subtle mt-1">{t.paymentWith} <span className="text-foreground-secondary">{course.instructor}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-sm text-foreground-subtle">
                  <Clock className="w-4 h-4 text-foreground-faint" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-foreground-subtle">
                  <BarChart3 className="w-4 h-4 text-foreground-faint" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-foreground-subtle">
                  <BookOpen className="w-4 h-4 text-foreground-faint" />
                  <span>{course.lessons} {t.cardLessons}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-foreground-subtle">
                  <Award className="w-4 h-4 text-foreground-faint" />
                  <span>{t.paymentCertificate}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's included */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {[t.paymentLifetime, t.paymentMobile, t.paymentCertificate, t.paymentExclusive, t.paymentCommunity, t.paymentFullAccess].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-foreground-secondary">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate(`/course/${course.id}/session`)}
            className="flex-1 h-11 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-all active:scale-95 flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-white" />{t.paymentStartLearning}
          </button>
          <button onClick={() => navigate('/')}
            className="h-11 px-8 bg-surface-raised border border-border-muted text-white rounded-full text-sm font-semibold hover:bg-surface-hover transition-all active:scale-95">
            {t.paymentBrowseMore}
          </button>
        </motion.div>

        {/* Note */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-center text-foreground-faint text-xs mt-6">{t.paymentNote}</motion.p>
      </div>
    </div>
  );
}
