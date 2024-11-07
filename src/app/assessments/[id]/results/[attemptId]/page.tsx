'use client';

import { Assessment, AssessmentAttempt } from '@/types';
import { QuestionFactory } from '@/components/QuestionTypes/QuestionFactory';
import { useRouter } from 'next/navigation';

// Sample data for demonstration
const sampleAssessment: Assessment = {
  id: '1',
  title: 'IPv6 Fundamentals',
  description: 'Test your knowledge of IPv6 networking concepts',
  category: 'Networking',
  level: 'intermediate',
  duration: 60,
  passingScore: 70,
  totalScore: 100,
  questions: [
    {
      id: 'q1',
      question: {
        id: 'q1',
        type: 'multiple-choice',
        title: 'What is the main purpose of IPv6?',
        description: 'Select the primary reason for developing IPv6.',
        required: true,
        points: 10,
        category: 'Networking',
        tags: ['ipv6', 'basics'],
        createdAt: new Date(),
        updatedAt: new Date(),
        language: 'en',
        choices: [
          { id: '1', text: 'To increase the available IP address space', isCorrect: true },
          { id: '2', text: 'To improve internet security', isCorrect: false },
          { id: '3', text: 'To reduce internet latency', isCorrect: false },
          { id: '4', text: 'To simplify network configuration', isCorrect: false },
        ],
      },
      order: 1,
      points: 10,
      required: true,
    },
    // ... other questions
  ],
  settings: {
    shuffleQuestions: true,
    showResults: true,
    showFeedback: true,
    allowReview: true,
    maxAttempts: 2,
    passingThreshold: 70,
    browserSecurity: {
      blockNewTabs: true,
      blockRightClick: true,
      fullScreen: true,
    },
    gradingType: 'automatic',
    proctoring: {
      enabled: false,
      webcam: false,
      screen: false,
      identity: false,
    },
  },
  status: 'published',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 'admin',
};

const sampleAttempt: AssessmentAttempt = {
  id: 'attempt-1',
  assessmentId: '1',
  userId: 'user-1',
  startedAt: new Date('2024-01-15T10:00:00'),
  completedAt: new Date('2024-01-15T11:00:00'),
  score: 85,
  status: 'completed',
  answers: [
    {
      questionId: 'q1',
      value: '1',
      score: 10,
      feedback: 'Correct! IPv6 was primarily developed to address the IPv4 address exhaustion problem.',
      timeSpent: 120,
    },
    // ... other answers
  ],
  timeSpent: 3600,
  ipAddress: '192.168.1.1',
  browserInfo: 'Mozilla/5.0...',
  violations: [],
};

export default function AssessmentResultsPage({
  params,
}: {
  params: { id: string; attemptId: string };
}) {
  const router = useRouter();
  
  // In a real application, you would fetch the assessment and attempt data
  const assessment = sampleAssessment;
  const attempt = sampleAttempt;

  if (!assessment || !attempt) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Results Not Found</h1>
          <p className="text-secondary mb-4">
            The assessment results you're looking for don't exist or have been removed.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.push('/assessments')}
          >
            Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  const passed = attempt.score !== undefined && attempt.score >= assessment.passingScore;
  const formattedDuration = new Date(attempt.timeSpent * 1000).toISOString().substr(11, 8);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{assessment.title}</h1>
        <p className="text-secondary mb-6">{assessment.description}</p>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          passed
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
            : 'bg-error/10 text-error'
        }`}>
          <span className="text-2xl font-bold">{attempt.score}%</span>
          <span>{passed ? 'Passed' : 'Failed'}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-secondary mb-2">Time Taken</h3>
          <p className="text-2xl font-bold">{formattedDuration}</p>
        </div>
        <div className="card">
          <h3 className="text-secondary mb-2">Questions Attempted</h3>
          <p className="text-2xl font-bold">{attempt.answers.length}/{assessment.questions.length}</p>
        </div>
        <div className="card">
          <h3 className="text-secondary mb-2">Passing Score</h3>
          <p className="text-2xl font-bold">{assessment.passingScore}%</p>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Performance Breakdown</h2>
        <div className="space-y-4">
          {assessment.questions.map((question, index) => {
            const answer = attempt.answers.find(a => a.questionId === question.id);
            const isCorrect = answer?.score === question.points;

            return (
              <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-medium">Question {index + 1}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      isCorrect
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                        : 'bg-error/10 text-error'
                    }`}>
                      {answer?.score || 0}/{question.points} points
                    </span>
                  </div>
                </div>

                <QuestionFactory
                  question={question.question}
                  value={answer?.value}
                  isEditing={false}
                />

                {answer?.feedback && (
                  <div className={`mt-2 p-3 rounded-lg ${
                    isCorrect
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                      : 'bg-error/10 text-error'
                  }`}>
                    {answer.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Violations */}
      {attempt.violations && attempt.violations.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Security Violations</h2>
          <div className="space-y-2">
            {attempt.violations.map((violation, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-error"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  {violation.type.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')} at {new Date(violation.timestamp).toLocaleTimeString()}
                  {violation.details && ` - ${violation.details}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          className="btn btn-secondary"
          onClick={() => router.push('/assessments')}
        >
          Back to Assessments
        </button>
        {attempt.score !== undefined && attempt.score < assessment.passingScore && (
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/assessments/${params.id}/take`)}
          >
            Retry Assessment
          </button>
        )}
      </div>
    </div>
  );
}
