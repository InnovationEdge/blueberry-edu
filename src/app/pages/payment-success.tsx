import { useNavigate, useParams } from 'react-router';
import { CheckCircle, Play, Clock, BarChart3, BookOpen, Award } from 'lucide-react';
import { getCourseById } from '../data/courses';
import { motion } from 'motion/react';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const { language } = useAuth();
  const t = getAppT(language);
  const { id } = useParams();
  const course = getCourseById(id || '');

  if (!course) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success icon */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#E50914] blur-[60px] opacity-30 rounded-full" />
            <div className="relative w-20 h-20 bg-[#E50914] rounded-full flex items-center justify-center shadow-lg shadow-red-500/20">
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{t.paymentWelcome}</h1>
          <p className="text-sm text-white/40">{t.paymentTitle}</p>
        </motion.div>

        {/* Course card */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded overflow-hidden mb-8">
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
                <span className="text-[#E50914] text-[10px] font-bold uppercase tracking-widest">{t.paymentNowLearning}</span>
                <h2 className="text-xl font-black text-white mt-1">{course.title}</h2>
                <p className="text-sm text-white/40 mt-1">{t.paymentWith} <span className="text-white/70">{course.instructor}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-sm text-white/50">
                  <Clock className="w-4 h-4 text-white/30" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/50">
                  <BarChart3 className="w-4 h-4 text-white/30" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/50">
                  <BookOpen className="w-4 h-4 text-white/30" />
                  <span>{course.lessons} {t.cardLessons}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/50">
                  <Award className="w-4 h-4 text-white/30" />
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
              <span className="text-white/60">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate(`/course/${course.id}/session`)}
            className="flex-1 h-11 bg-[#E50914] text-white rounded text-sm font-bold hover:bg-[#c70812] transition-all active:scale-95 flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-white" />{t.paymentStartLearning}
          </button>
          <button onClick={() => navigate('/')}
            className="h-11 px-8 bg-white/[0.06] border border-white/10 text-white rounded text-sm font-semibold hover:bg-white/10 transition-all active:scale-95">
            {t.paymentBrowseMore}
          </button>
        </motion.div>

        {/* Note */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-center text-white/20 text-xs mt-6">{t.paymentNote}</motion.p>
      </div>
    </div>
  );
}
