import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import { Landing } from './pages/landing';

const CoursesCatalog = lazy(() => import('./pages/courses-catalog').then(m => ({ default: m.CoursesCatalog })));
const CourseLandingDetail = lazy(() => import('./pages/course-landing-detail').then(m => ({ default: m.CourseLandingDetail })));
const Masterclass = lazy(() => import('./pages/masterclass').then(m => ({ default: m.Masterclass })));
const CertificatesLanding = lazy(() => import('./pages/certificates-landing').then(m => ({ default: m.CertificatesLanding })));
const Career = lazy(() => import('./pages/career').then(m => ({ default: m.Career })));
const About = lazy(() => import('./pages/about').then(m => ({ default: m.About })));

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

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/courses', element: <LazyPage><CoursesCatalog /></LazyPage> },
  { path: '/courses/:id', element: <LazyPage><CourseLandingDetail /></LazyPage> },
  { path: '/masterclass', element: <LazyPage><Masterclass /></LazyPage> },
  { path: '/certificates', element: <LazyPage><CertificatesLanding /></LazyPage> },
  { path: '/career', element: <LazyPage><Career /></LazyPage> },
  { path: '/about', element: <LazyPage><About /></LazyPage> },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black text-foreground">404</h1>
          <p className="text-base text-foreground-subtle">გვერდი ვერ მოიძებნა</p>
          <a href="/" className="inline-block mt-4 px-6 py-2.5 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-colors active:scale-95">
            მთავარზე დაბრუნება
          </a>
        </div>
      </div>
    ),
  },
]);
