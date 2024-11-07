'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/types';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: User['role'];
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-secondary/50 transition-colors"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-secondary">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-[hsl(0,0%,40%)]">{user.email}</div>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-lg bg-background border shadow-lg z-20">
            <div className="p-4 border-b">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-[hsl(0,0%,40%)]">{user.email}</div>
              <div className="text-xs text-[hsl(0,0%,40%)] mt-1 capitalize">
                {user.role}
              </div>
            </div>
            <nav className="p-2">
              <Link
                href={`/${user.role}/profile`}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </Link>
              <Link
                href={`/${user.role}/settings`}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </Link>
              {user.role === 'admin' && (
                <Link
                  href="/student/dashboard"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View as Student</span>
                </Link>
              )}
              <hr className="my-2" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Add logout logic here
                }}
                className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-secondary/50 transition-colors text-red-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign out</span>
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
