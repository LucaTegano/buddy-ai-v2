'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-primary">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-surface rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Something went wrong!</h2>
            <p className="text-text-secondary mb-6">
              {error.message || 'An unexpected error occurred.'}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => reset()}
                className="flex-1 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-hover transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 px-4 py-2 border border-border-subtle text-text-primary rounded-lg hover:bg-hover transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}