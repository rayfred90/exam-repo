'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AssessmentAttempt } from '@/types';

interface HistoryItem extends AssessmentAttempt {
  title: string;
  passingScore: number;
}

export default function AssessmentHistory({ params }: { params: { id: string } }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [assessmentTitle, setAssessmentTitle] = useState('');

  useEffect(() => {
    // In a real app, fetch the history data
    // For demo, using mock data
    setAssessmentTitle('IPv6 Fundamentals');
    setHistory([
      {
        id: 'attempt-1',
        assessmentId: params.id,
        userId: 'user-1',
        title: 'IPv6 Fundamentals',
        startedAt: new Date('2024-01-15T10:00:00'),
        completedAt: new Date('2024-01-15T11:00:00'),
        score: 85,
        passingScore: 70,
        status: 'completed',
        answers: [],
        timeSpent: 3600,
        ipAddress: '192.168.1.1',
        browserInfo: 'Chrome 120.0.0',
        violations: [],
      },
      {
        id: 'attempt-2',
        assessmentId: params.id,
        userId: 'user-1',
        title: 'IPv6 Fundamentals',
        startedAt: new Date('2024-01-10T14:00:00'),
        completedAt: new Date('2024-01-10T15:00:00'),
        score: 75,
        passingScore: 70,
        status: 'completed',
        answers: [],
        timeSpent: 3600,
        ipAddress: '192.168.1.1',
        browserInfo: 'Chrome 120.0.0',
        violations: [],
      },
    ]);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-[hsl(0,0%,40%)]">Loading history...</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{assessmentTitle} History</h1>
        <p className="text-[hsl(0,0%,40%)] mt-1">
          Review your previous attempts
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((attempt) => {
          const score = attempt.score ?? 0;
          const isPassing = score >= attempt.passingScore;

          return (
            <div key={attempt.id} className="card hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-4 text-sm text-[hsl(0,0%,40%)]">
                    <span>Attempt Date: {formatDate(attempt.startedAt)}</span>
                    <span>•</span>
                    <span>Time Spent: {formatTime(attempt.timeSpent)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-[hsl(0,0%,40%)]">Score</div>
                    <div className={`text-2xl font-bold ${
                      isPassing
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {score}%
                    </div>
                  </div>
                  <Link
                    href={`/student/assessments/${params.id}/results/${attempt.id}`}
                    className="btn btn-secondary"
                  >
                    View Results
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {history.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[hsl(0,0%,40%)]">No attempts found</p>
        </div>
      )}

      {/* Back Button */}
      <div>
        <Link href="/student/assessments" className="btn btn-secondary">
          Back to Assessments
        </Link>
      </div>
    </div>
  );
}
