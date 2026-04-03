import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import { Header } from './components/header';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Onboarding } from './pages/onboarding';
import { useAuth } from './context/auth-context';
import { ProtectedRoute } from './components/protected-route';
import { AnimatePresence } from 'motion/react';
import { PageTransition, FadeUp } from './components/page-transition';
import { useLocation } from 'react-router';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/home').then(m => ({ default: m.Home })));
const Library = lazy(() => import('./pages/library').then(m => ({ default: m.Library })));
const MyProgress = lazy(() => import('./pages/my-progress').then(m => ({ default: m.MyProgress })));
const CourseDetail = lazy(() => import('./pages/course-detail').then(m => ({ default: m.CourseDetail })));
const PaymentSuccess = lazy(() => import('./pages/payment-success').then(m => ({ default: m.PaymentSuccess })));
const CourseSession = lazy(() => import('./pages/course-session').then(m => ({ default: m.CourseSession })));
const VideoPlayer = lazy(() => import('./pages/video-player').then(m => ({ default: m.VideoPlayer })));
const Search = lazy(() => import('./pages/search').then(m => ({ default: m.Search })));
const InstructorDashboard = lazy(() => import('./pages/instructor/dashboard').then(m => ({ default: m.InstructorDashboard })));
const CreateCourse = lazy(() => import('./pages/instructor/create-course').then(m => ({ default: m.CreateCourse })));
const CourseEditor = lazy(() => import('./pages/instructor/course-editor').then(m => ({ default: m.CourseEditor })));
const QuizBuilder = lazy(() => import('./pages/instructor/quiz-builder').then(m => ({ default: m.QuizBuilder })));
const InstructorAnalytics = lazy(() => import('./pages/instructor/analytics').then(m => ({ default: m.InstructorAnalytics })));
const Assignments = lazy(() => import('./pages/instructor/assignments').then(m => ({ default: m.Assignments })));
const Profile = lazy(() => import('./pages/profile').then(m => ({ default: m.Profile })));
const CertificatePage = lazy(() => import('./pages/certificate').then(m => ({ default: m.Certificate })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, showOnboarding, showLogin, login, completeOnboarding, closeLogin } = useAuth();

  let pageKey = 'landing';
  let content: React.ReactNode = <Landing />;

  if (showLogin) {
    pageKey = 'login';
    content = <Login onLogin={login} onBack={closeLogin} />;
  } else if (showOnboarding) {
    pageKey = 'onboarding';
    content = <Onboarding onComplete={completeOnboarding} />;
  } else if (isAuthenticated) {
    pageKey = 'app';
    content = <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pageKey} className="min-h-screen bg-background">
        {content}
      </PageTransition>
    </AnimatePresence>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <LayoutInner>{children}</LayoutInner>
    </AuthWrapper>
  );
}

function LayoutInner({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FadeUp key={location.pathname}>{children}</FadeUp>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><LazyPage><Home /></LazyPage></Layout>,
  },
  {
    path: '/search',
    element: <Layout><LazyPage><Search /></LazyPage></Layout>,
  },
  {
    path: '/course/:id',
    element: <AuthWrapper><LazyPage><CourseDetail /></LazyPage></AuthWrapper>,
  },
  {
    path: '/course/:id/success',
    element: <AuthWrapper><LazyPage><PaymentSuccess /></LazyPage></AuthWrapper>,
  },
  {
    path: '/course/:id/session',
    element: <AuthWrapper><LazyPage><CourseSession /></LazyPage></AuthWrapper>,
  },
  {
    path: '/course/:id/video/:chapterId/:lessonId',
    element: <AuthWrapper><LazyPage><VideoPlayer /></LazyPage></AuthWrapper>,
  },
  {
    path: '/library',
    element: <Layout><LazyPage><Library /></LazyPage></Layout>,
  },
  {
    path: '/my-progress',
    element: <Layout><ProtectedRoute><LazyPage><MyProgress /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/profile',
    element: <Layout><ProtectedRoute><LazyPage><Profile /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/certificate/:id',
    element: <Layout><ProtectedRoute><LazyPage><CertificatePage /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/instructor',
    element: <Layout><ProtectedRoute requiredRole="INSTRUCTOR"><LazyPage><InstructorDashboard /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/instructor/create',
    element: <Layout><ProtectedRoute requiredRole="INSTRUCTOR"><LazyPage><CreateCourse /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/instructor/course/:id',
    element: <Layout><ProtectedRoute requiredRole="INSTRUCTOR"><LazyPage><CourseEditor /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/instructor/course/:id/quiz/:lessonId',
    element: <Layout><ProtectedRoute requiredRole="INSTRUCTOR"><LazyPage><QuizBuilder /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/instructor/analytics',
    element: <Layout><ProtectedRoute requiredRole="INSTRUCTOR"><LazyPage><InstructorAnalytics /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '/instructor/course/:id/assignments',
    element: <Layout><ProtectedRoute requiredRole="INSTRUCTOR"><LazyPage><Assignments /></LazyPage></ProtectedRoute></Layout>,
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-black text-foreground">404</h1>
            <p className="text-base text-foreground-subtle">გვერდი ვერ მოიძებნა</p>
            <a href="/" className="inline-block mt-4 px-6 py-2.5 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-colors active:scale-95">
              მთავარზე დაბრუნება
            </a>
          </div>
        </div>
      </Layout>
    ),
  },
]);
