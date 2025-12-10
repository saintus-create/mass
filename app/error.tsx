"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground text-lg">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            variant="default"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
