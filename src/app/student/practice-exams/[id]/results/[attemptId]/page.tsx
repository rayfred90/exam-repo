'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { QuestionFactory } from '@/components/QuestionTypes/QuestionFactory';

interface PracticeResult {
  id: string;
  examId: string;
  title: string;
  date: string;
  score: number;
  passingScore: number;
  timeSpent: string;
  totalQuestions: number;
  correctAnswers: number;
  categories: {
    name: string;
    score: number;
    questions: number;
  }[];
  questions: {
    id: string;
    title: string;
    type: string;
    category: string;
    tags: string[];
    yourAnswer: string;
    correctAnswer: string;
    points: number;
    earned: number;
    explanation: string;
  }[];
}

export default function PracticeExamResults({
  params,
}: {
  params: { id: string; attemptId: string };
}) {
  const router = useRouter();
  const [result, setResult] = useState<PracticeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the results from your backend
    // For demo, using mock data
    setResult({
      id: params.attemptId,
      examId: params.id,
      title: 'IPv6 Fundamentals Practice',
      date: new Date().toISOString(),
      score: 85,
      passingScore: 70,
      timeSpent: '25:30',
      totalQuestions: 25,
      correctAnswers: 21,
      categories: [
        { name: 'IPv6 Addressing', score: 90, questions: 10 },
        { name: 'Protocols', score: 82, questions: 8 },
        { name: 'Implementation', score: 83, questions: 7 },
      ],
      questions: [
        {
          id: 'q1',
          title: 'What is the main purpose of IPv6?',
          type: 'multiple-choice',
          category: 'IPv6 Addressing',
          tags: ['IPv6', 'Networking'],
          yourAnswer: 'To increase the available IP address space',
          correctAnswer: 'To increase the available IP address space',
          points: 4,
          earned: 4,
          explanation: 'IPv6 was developed primarily to address the IPv4 address exhaustion problem.',
        },
        // Add more questions here
      ],
    });
    setLoading(false);
  }, [params.id, params.attemptId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Results Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The practice exam results you're looking for don't exist or have been removed.
          </p>
          <Link href="/student/practice-exams" className="btn btn-primary">
            Back to Practice Exams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{result.title}</h1>
          <p className="text-muted-foreground mt-1">Practice Exam Results</p>
        </div>
        <div className="flex gap-4">
          <Link
            href={`/student/practice-exams/${params.id}`}
            className="btn btn-primary"
          >
            Try Again
          </Link>
          <Link
            href="/student/practice-exams"
            className="btn btn-secondary"
          >
            Back to Practice Exams
          </Link>
        </div>
      </div>

      {/* Overall Score */}
      <div className="card text-center">
        <div className={`text-4xl font-bold mb-2 ${
          result.score >= result.passingScore
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}>
          {result.score}%
        </div>
        <p className="text-muted-foreground">
          {result.score >= result.passingScore ? 'Great job!' : 'Keep practicing!'} (Passing Score: {result.passingScore}%)
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Time Spent</h3>
          <p className="text-2xl font-bold">{result.timeSpent}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Questions</h3>
          <p className="text-2xl font-bold">{result.totalQuestions}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Correct Answers</h3>
          <p className="text-2xl font-bold">{result.correctAnswers}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
          <p className="text-2xl font-bold">
            {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
          </p>
        </div>
      </div>

      {/* Performance by Category */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Performance by Category</h2>
        <div className="space-y-6">
          {result.categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    ({category.questions} questions)
                  </span>
                </div>
                <span className="font-semibold">{category.score}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${category.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question Review */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Question Review</h2>
        <div className="space-y-6">
          {result.questions.map((question, index) => (
            <div
              key={question.id}
              className="p-4 border rounded-lg space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Question {index + 1}</h3>
                  <p className="mt-1">{question.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    question.earned === question.points
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                  }`}>
                    {question.earned}/{question.points} points
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground mb-1">Your Answer:</p>
                  <p className={question.earned === question.points ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {question.yourAnswer}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Correct Answer:</p>
                  <p className="text-green-600 dark:text-green-400">{question.correctAnswer}</p>
                </div>
              </div>

              {question.explanation && (
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <p className="text-muted-foreground text-sm">{question.explanation}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
