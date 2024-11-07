'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-[hsl(0,0%,40%)] mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Try again
          </button>
          <div className="text-sm text-[hsl(0,0%,40%)]">
            If the problem persists, please contact support
          </div>
        </div>
      </div>
    </div>
  );
}
