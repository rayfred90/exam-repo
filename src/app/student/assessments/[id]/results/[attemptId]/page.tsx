'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AssessmentAttempt } from '@/types';

interface ExtendedAttempt extends AssessmentAttempt {
  title: string;
  passingScore: number;
}

export default function AssessmentResults({ 
  params 
}: { 
  params: { id: string; attemptId: string } 
}) {
  const [result, setResult] = useState<ExtendedAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the result data
    // For demo, using mock data
    setResult({
      id: params.attemptId,
      assessmentId: params.id,
      userId: 'user-1',
      title: 'IPv6 Fundamentals',
      startedAt: new Date(),
      completedAt: new Date(),
      score: 85,
      passingScore: 70,
      status: 'completed',
      answers: [
        {
          questionId: 'q1',
          value: '1',
          score: 10,
          feedback: 'Correct! IPv6 was primarily developed to address IPv4 address exhaustion.',
          timeSpent: 45,
        },
      ],
      timeSpent: 3150, // 52:30 in seconds
      ipAddress: '192.168.1.1',
      browserInfo: 'Chrome 120.0.0',
      violations: [],
    });
    setLoading(false);
  }, [params.id, params.attemptId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-[hsl(0,0%,40%)]">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Results Not Found</h1>
          <p className="text-[hsl(0,0%,40%)] mb-4">
            The results you're looking for don't exist or have been removed.
          </p>
          <Link href="/student/assessments" className="btn btn-primary">
            Back to Assessments
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const score = result.score ?? 0;
  const isPassing = score >= result.passingScore;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{result.title} Results</h1>
        <p className="text-[hsl(0,0%,40%)] mt-1">
          Review your assessment performance
        </p>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Score</h3>
          <p className={`text-3xl font-bold ${
            isPassing
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {score}%
          </p>
          <p className="text-[hsl(0,0%,40%)] mt-1">
            Passing Score: {result.passingScore}%
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Time Spent</h3>
          <p className="text-3xl font-bold">{formatTime(result.timeSpent)}</p>
          <p className="text-[hsl(0,0%,40%)] mt-1">Total duration</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <p className={`text-3xl font-bold ${
            isPassing
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {isPassing ? 'Passed' : 'Failed'}
          </p>
          <p className="text-[hsl(0,0%,40%)] mt-1">Assessment result</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href={`/student/assessments/${params.id}/history`}
          className="btn btn-secondary"
        >
          View History
        </Link>
        <Link
          href="/student/assessments"
          className="btn btn-secondary"
        >
          Back to Assessments
        </Link>
      </div>
    </div>
  );
}
