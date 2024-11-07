'use client';

import Link from 'next/link';
import UserMenu from '@/components/UserMenu';
import ThemeToggle from '@/components/ThemeToggle';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    name: 'Jenny Junny',
    email: 'jennie.junny@gmail.com',
    role: 'student' as const,
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-[1400px] mx-auto bg-background min-h-screen flex flex-col">
        <header className="border-b bg-background">
          <div className="px-6 h-16 flex items-center">
            <Link href="/student/dashboard" className="text-xl font-bold mr-12">
              eAssessment
            </Link>
            <nav className="flex-1 flex items-center">
              <div className="flex gap-8">
                <Link href="/student/dashboard" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
                  Dashboard
                </Link>
                <Link href="/student/assessments" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
                  Real Exams
                </Link>
                <Link href="/student/practice-exams" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
                  Practice Exams
                </Link>
                <Link href="/student/results" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
                  Results
                </Link>
              </div>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserMenu user={user} />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
