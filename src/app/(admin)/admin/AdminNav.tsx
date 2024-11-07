'use client';

import Link from 'next/link';
import UserMenu from '@/components/UserMenu';
import ThemeToggle from '@/components/ThemeToggle';
import { UserRole } from '@/types';

export default function AdminNav() {
  return (
    <header className="border-b bg-background">
      <div className="px-6 h-16 flex items-center">
        <Link href="/admin/dashboard" className="text-xl font-bold mr-12">
          eAssessment
        </Link>
        <nav className="flex-1 flex items-center">
          <div className="flex gap-8">
            <Link href="/admin/dashboard" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
              Dashboard
            </Link>
            <Link href="/admin/assessments" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
              Assessments
            </Link>
            <Link href="/admin/question-bank" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
              Question Bank
            </Link>
            <Link href="/admin/users" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
              Users
            </Link>
            <Link href="/admin/reports" className="text-[hsl(0,0%,40%)] hover:text-foreground py-1">
              Reports
            </Link>
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu user={{ name: 'Admin User', email: 'admin@example.com', role: UserRole.ADMIN }} />
        </div>
      </div>
    </header>
  );
}
