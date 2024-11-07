'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  // Only render children after first client-side render
  // This prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same structure during SSR
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        <div className="min-h-screen bg-background">{children}</div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="eassessment-theme"
    >
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ThemeProvider>
  );
}
