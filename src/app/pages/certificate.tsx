import { useParams, Link } from 'react-router';
import { Award, Download, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { ApiResponse } from '../../lib/api';

interface CertificateData {
  id: string;
  certificateId: string;
  pdfUrl: string | null;
  issuedAt: string;
  course: { title: string; instructor: { displayName: string } };
  user: { name: string };
}

export function Certificate() {
  const { id } = useParams<{ id: string }>();

  const { data: cert, isLoading, error } = useQuery({
    queryKey: ['certificate', id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<CertificateData>>(`/certificates/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-foreground-subtle text-sm">სერტიფიკატი ვერ მოიძებნა</p>
          <Link to="/my-progress" className="text-brand text-sm hover:underline">ჩემი პროგრესი</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-2xl mx-auto">
        <Link to="/my-progress" className="inline-flex items-center gap-2 text-foreground-subtle text-sm hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />ჩემი პროგრესი
        </Link>

        {/* Certificate card */}
        <div className="bg-surface border border-border-subtle rounded p-8 text-center">
          <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-black text-foreground mb-2">დასრულების სერტიფიკატი</h1>
          <p className="text-foreground-faint text-sm mb-8">Blueberry Academy</p>

          <div className="border-t border-b border-border-subtle py-6 my-6 space-y-3">
            <p className="text-foreground-subtle text-xs">ამით ვადასტურებთ, რომ</p>
            <p className="text-foreground text-xl font-black">{cert.user.name}</p>
            <p className="text-foreground-subtle text-xs">წარმატებით დაასრულა კურსი</p>
            <p className="text-brand text-lg font-bold">{cert.course.title}</p>
            <p className="text-foreground-faint text-xs">ინსტრუქტორი: {cert.course.instructor.displayName}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-foreground-faint text-xs mb-6">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>ვერიფიკაციის კოდი: {cert.certificateId}</span>
          </div>

          <p className="text-foreground-faint text-xs mb-8">
            გაცემის თარიღი: {new Date(cert.issuedAt).toLocaleDateString('ka')}
          </p>

          <div className="flex gap-3 justify-center">
            {cert.pdfUrl && (
              <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-colors active:scale-95">
                <Download className="w-4 h-4" />PDF ჩამოტვირთვა
              </a>
            )}
            <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-raised border border-border-muted text-foreground rounded text-sm font-medium hover:bg-surface-hover transition-colors active:scale-95">
              <Share2 className="w-4 h-4" />გაზიარება
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
