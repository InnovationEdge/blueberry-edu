import { createBrowserRouter } from 'react-router';
import { Home } from './pages/home';
import { Library } from './pages/library';
import { MyProgress } from './pages/my-progress';
import { CourseDetail } from './pages/course-detail';
import { PaymentSuccess } from './pages/payment-success';
import { CourseSession } from './pages/course-session';
import { VideoPlayer } from './pages/video-player';
import { Search } from './pages/search';
import { Header } from './components/header';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Onboarding } from './pages/onboarding';
import { useAuth } from './context/auth-context';
import { AnimatePresence } from 'motion/react';
import { PageTransition, FadeUp } from './components/page-transition';
import { useLocation } from 'react-router';

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
      <PageTransition key={pageKey} className="min-h-screen bg-black">
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
    <div className="min-h-screen bg-black">
      <Header />
      <FadeUp key={location.pathname}>{children}</FadeUp>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/search',
    element: <Layout><Search /></Layout>,
  },
  {
    path: '/course/:id',
    element: <AuthWrapper><CourseDetail /></AuthWrapper>,
  },
  {
    path: '/course/:id/success',
    element: <AuthWrapper><PaymentSuccess /></AuthWrapper>,
  },
  {
    path: '/course/:id/session',
    element: <AuthWrapper><CourseSession /></AuthWrapper>,
  },
  {
    path: '/course/:id/video/:chapterId/:lessonId',
    element: <AuthWrapper><VideoPlayer /></AuthWrapper>,
  },
  {
    path: '/library',
    element: <Layout><Library /></Layout>,
  },
  {
    path: '/my-progress',
    element: <Layout><MyProgress /></Layout>,
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">404</h1>
            <p className="text-xl text-gray-400">Page not found</p>
          </div>
        </div>
      </Layout>
    ),
  },
]);
