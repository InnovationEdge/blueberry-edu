import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'დაფიქსირდა შეცდომა', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <AlertCircle className="w-10 h-10 text-brand mb-4" />
      <p className="text-foreground-secondary text-sm mb-4 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-surface-raised border border-border-muted text-foreground rounded-lg text-sm font-medium hover:bg-surface-hover transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          ხელახლა ცდა
        </button>
      )}
    </div>
  );
}
