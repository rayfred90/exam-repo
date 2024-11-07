'use client';

import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [viewingAsStudent, setViewingAsStudent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted ? pathname?.includes('/admin/') : false;

  const adminNavigation = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Assessments', href: '/admin/assessments' },
    { name: 'Question Bank', href: '/admin/question-bank' },
    { name: 'Reports', href: '/admin/reports' },
  ];

  const studentNavigation = [
    { name: 'Dashboard', href: '/student/dashboard' },
    { name: 'Assessments', href: '/student/assessments' },
    { name: 'Practice Exams', href: '/student/practice-exams' },
    { name: 'Results', href: '/student/results' },
  ];

  const navigation = viewingAsStudent ? studentNavigation : (isAdmin ? adminNavigation : studentNavigation);

  const isActive = (path: string) => {
    if (!mounted) return false;
    return pathname?.startsWith(path);
  };

  const toggleViewAs = () => {
    setViewingAsStudent((prev) => {
      const newValue = !prev;
      if (newValue) {
        router.push('/student/dashboard');
      } else {
        router.push('/admin/dashboard');
      }
      return newValue;
    });
  };

  if (!mounted) {
    return (
      <header className="h-16 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold">eAssessment</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              href={viewingAsStudent ? '/student/dashboard' : (isAdmin ? '/admin/dashboard' : '/student/dashboard')} 
              className="flex items-center gap-2"
            >
              <span className="text-xl font-bold">eAssessment</span>
            </Link>

            <nav className="hidden md:flex gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Admin Controls */}
            {isAdmin && (
              <button
                onClick={toggleViewAs}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  viewingAsStudent
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-900/30'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {viewingAsStudent ? 'Exit Student View' : 'View as Student'}
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {viewingAsStudent ? 'Student View' : (isAdmin ? 'Admin' : 'Student')}
              </span>
              <div className="relative">
                <Link 
                  href={viewingAsStudent ? '/student/profile' : (isAdmin ? '/admin/profile' : '/student/profile')}
                  className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <svg
                    className="h-5 w-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Link>
                {isAdmin && viewingAsStudent && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full border-2 border-background" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
