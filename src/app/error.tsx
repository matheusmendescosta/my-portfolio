'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 rounded-full bg-destructive/15 p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Something went wrong!</h2>
      <p className="mb-6 text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
        {error.digest && <span className="mt-2 block text-xs">Error ID: {error.digest}</span>}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
