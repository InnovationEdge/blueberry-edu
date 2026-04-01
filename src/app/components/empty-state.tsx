import { Inbox } from 'lucide-react';
import { Link } from 'react-router';

interface EmptyStateProps {
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  message = 'აქ ჯერ არაფერი არ არის',
  actionLabel,
  actionHref = '/',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Inbox className="w-10 h-10 text-white/20 mb-4" />
      <p className="text-white/40 text-sm mb-4 text-center">{message}</p>
      {actionLabel && (
        <Link
          to={actionHref}
          className="px-5 py-2.5 bg-[#E50914] text-white rounded text-sm font-bold hover:bg-[#c70812] transition-all active:scale-95"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
