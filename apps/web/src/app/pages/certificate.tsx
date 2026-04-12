import { useParams, Link } from 'react-router';
import { Award, ArrowLeft } from 'lucide-react';
import { LandingHeader } from '../components/landing-header';
import { useDocumentTitle } from '../hooks/use-document-title';

export function Certificate() {
  useDocumentTitle('სერტიფიკატი');
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/certificates" />
      <div className="h-[72px]" />

      <div className="max-w-2xl mx-auto px-5 md:px-12 py-20">
        <Link to="/certificates" className="inline-flex items-center gap-2 text-foreground-faint text-sm hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> სერტიფიკატები
        </Link>

        <div className="bg-surface border border-border-subtle rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-[#004aad] rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">სერტიფიკატის ვერიფიკაცია</h1>
          <p className="text-foreground-faint text-sm mb-4">კოდი: {id}</p>
          <p className="text-foreground-secondary text-sm">
            სერტიფიკატების სისტემა მალე ამოქმედდება. კურსის დასრულების შემდეგ მიიღებთ ვერიფიცირებულ სერტიფიკატს.
          </p>
        </div>
      </div>
    </div>
  );
}
