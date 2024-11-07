'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PracticeExam {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: number;
  duration: string;
  attempts: {
    used: number;
    max: number | 'Unlimited';
  };
  lastAttempt?: string;
  averageScore?: number;
  tags: string[];
}

export default function PracticeExams() {
  const [exams] = useState<PracticeExam[]>([
    {
      id: '1',
      title: 'IPv6 Fundamentals Practice',
      description: 'Practice questions covering IPv6 addressing, protocols, and implementation.',
      category: 'Networking',
      difficulty: 'Intermediate',
      questions: 25,
      duration: '30 minutes',
      attempts: {
        used: 2,
        max: 'Unlimited',
      },
      lastAttempt: '2024-01-15',
      averageScore: 85,
      tags: ['IPv6', 'Networking', 'Protocols'],
    },
    {
      id: '2',
      title: 'Network Security Basics',
      description: 'Practice test for network security fundamentals and best practices.',
      category: 'Security',
      difficulty: 'Beginner',
      questions: 20,
      duration: '25 minutes',
      attempts: {
        used: 1,
        max: 'Unlimited',
      },
      lastAttempt: '2024-01-14',
      averageScore: 78,
      tags: ['Security', 'Networking', 'Firewall'],
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Practice Exams</h1>
          <p className="text-muted-foreground mt-1">
            Improve your skills with unlimited practice attempts
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search practice exams..."
            className="input w-full"
          />
        </div>
        <select className="input min-w-[150px]">
          <option value="">All Categories</option>
          <option value="networking">Networking</option>
          <option value="security">Security</option>
          <option value="cloud">Cloud Computing</option>
        </select>
        <select className="input min-w-[150px]">
          <option value="">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Practice Exams List */}
      <div className="grid grid-cols-1 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="card hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{exam.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      exam.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                        : exam.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                    }`}>
                      {exam.difficulty}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{exam.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exam.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Questions</p>
                    <p className="font-medium">{exam.questions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{exam.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Attempts</p>
                    <p className="font-medium">
                      {exam.attempts.used} / {exam.attempts.max}
                    </p>
                  </div>
                  {exam.averageScore && (
                    <div>
                      <p className="text-muted-foreground">Average Score</p>
                      <p className="font-medium">{exam.averageScore}%</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/student/practice-exams/${exam.id}`}
                    className="btn btn-primary"
                  >
                    Start Practice
                  </Link>
                  <Link
                    href={`/student/practice-exams/${exam.id}/history`}
                    className="btn btn-secondary"
                  >
                    View History
                  </Link>
                </div>
                {exam.lastAttempt && (
                  <p className="text-sm text-muted-foreground text-right">
                    Last attempt: {exam.lastAttempt}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {exams.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No practice exams found</div>
          <Link href="/student/dashboard" className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
