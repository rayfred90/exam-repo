'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PracticeAttempt {
  id: string;
  date: string;
  score: number;
  timeSpent: string;
  questionsAnswered: number;
  totalQuestions: number;
  status: 'completed' | 'abandoned';
}

interface PracticeExam {
  id: string;
  title: string;
  category: string;
  passingScore: number;
  attempts: PracticeAttempt[];
}

export default function PracticeExamHistory({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [exam, setExam] = useState<PracticeExam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the practice exam history from your backend
    // For demo, using mock data
    setExam({
      id: params.id,
      title: 'IPv6 Fundamentals Practice',
      category: 'Networking',
      passingScore: 70,
      attempts: [
        {
          id: 'a1',
          date: '2024-01-15',
          score: 85,
          timeSpent: '28:45',
          questionsAnswered: 25,
          totalQuestions: 25,
          status: 'completed',
        },
        {
          id: 'a2',
          date: '2024-01-14',
          score: 72,
          timeSpent: '25:30',
          questionsAnswered: 25,
          totalQuestions: 25,
          status: 'completed',
        },
        {
          id: 'a3',
          date: '2024-01-13',
          score: 65,
          timeSpent: '15:20',
          questionsAnswered: 15,
          totalQuestions: 25,
          status: 'abandoned',
        },
      ],
    });
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading history...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Practice Exam Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The practice exam you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/student/practice-exams" className="btn btn-primary">
            Back to Practice Exams
          </Link>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const completedAttempts = exam.attempts.filter(a => a.status === 'completed');
  const averageScore = completedAttempts.length
    ? completedAttempts.reduce((sum, a) => sum + a.score, 0) / completedAttempts.length
    : 0;
  const bestScore = completedAttempts.length
    ? Math.max(...completedAttempts.map(a => a.score))
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <p className="text-muted-foreground mt-1">Practice History</p>
        </div>
        <div className="flex gap-4">
          <Link
            href={`/student/practice-exams/${params.id}`}
            className="btn btn-primary"
          >
            Start New Attempt
          </Link>
          <Link
            href="/student/practice-exams"
            className="btn btn-secondary"
          >
            Back to Practice Exams
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Attempts</h3>
          <p className="text-2xl font-bold">{exam.attempts.length}</p>
          <p className="text-muted-foreground mt-1">
            {completedAttempts.length} completed
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-2xl font-bold">{averageScore.toFixed(1)}%</p>
          <p className="text-muted-foreground mt-1">
            Passing score: {exam.passingScore}%
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Best Score</h3>
          <p className="text-2xl font-bold">{bestScore}%</p>
          <p className="text-muted-foreground mt-1">
            {bestScore >= exam.passingScore ? 'Passed' : 'Not passed yet'}
          </p>
        </div>
      </div>

      {/* Attempts List */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Attempt History</h2>
        <div className="space-y-4">
          {exam.attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium">
                    {new Date(attempt.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    attempt.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                  }`}>
                    {attempt.status === 'completed' ? 'Completed' : 'Abandoned'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Time: {attempt.timeSpent}</span>
                  <span>•</span>
                  <span>Questions: {attempt.questionsAnswered}/{attempt.totalQuestions}</span>
                  {attempt.status === 'completed' && (
                    <>
                      <span>•</span>
                      <span className={attempt.score >= exam.passingScore ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        Score: {attempt.score}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {attempt.status === 'completed' && (
                <Link
                  href={`/student/practice-exams/${params.id}/results/${attempt.id}`}
                  className="btn btn-secondary mt-4 md:mt-0"
                >
                  View Results
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
