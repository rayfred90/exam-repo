'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AssessmentAttempt } from '@/types';

interface ExtendedAttempt extends AssessmentAttempt {
  title: string;
  passingScore: number;
  category: string;
  tags: string[];
}

export default function ResultDetails({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<ExtendedAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the result data
    // For demo, using mock data
    setResult({
      id: params.id,
      assessmentId: 'assessment-1',
      userId: 'user-1',
      title: 'Cloud Computing Essentials',
      category: 'Cloud Computing',
      tags: ['AWS', 'Cloud', 'Infrastructure'],
      startedAt: new Date('2024-01-15T10:00:00'),
      completedAt: new Date('2024-01-15T11:00:00'),
      score: 85,
      passingScore: 70,
      status: 'completed',
      answers: [
        {
          questionId: 'q1',
          value: '1',
          score: 10,
          feedback: 'Correct understanding of cloud concepts.',
          timeSpent: 120,
        },
        {
          questionId: 'q2',
          value: '2',
          score: 8,
          feedback: 'Good grasp of infrastructure components.',
          timeSpent: 180,
        },
      ],
      timeSpent: 3600,
      ipAddress: '192.168.1.1',
      browserInfo: 'Chrome 120.0.0',
      violations: [],
    });
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-[hsl(0,0%,40%)]">Loading result details...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Result Not Found</h1>
          <p className="text-[hsl(0,0%,40%)] mb-4">
            The result you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/student/assessments" className="btn btn-primary">
            Back to Assessments
          </Link>
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

  const score = result.score ?? 0;
  const isPassing = score >= result.passingScore;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{result.title}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {result.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
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

      {/* Attempt Details */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Attempt Details</h2>
        <div className="space-y-2">
          <p className="text-[hsl(0,0%,40%)]">
            Started: {formatDate(result.startedAt)}
          </p>
          <p className="text-[hsl(0,0%,40%)]">
            Completed: {result.completedAt ? formatDate(result.completedAt) : 'In Progress'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => window.open(`/certificates/${result.id}`, '_blank')}
          className="btn btn-primary"
        >
          Download Certificate
        </button>
        <Link
          href={`/student/assessments/${result.assessmentId}/history`}
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
