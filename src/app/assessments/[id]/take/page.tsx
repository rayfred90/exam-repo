'use client';

import { Assessment, AssessmentAttempt } from '@/types';
import { AssessmentDelivery } from '@/components/AssessmentDelivery';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Sample assessment for demonstration
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
    {
      id: 'q2',
      question: {
        id: 'q2',
        type: 'multiple-response',
        title: 'Which of the following are features of IPv6?',
        description: 'Select all that apply.',
        required: true,
        points: 10,
        category: 'Networking',
        tags: ['ipv6', 'features'],
        createdAt: new Date(),
        updatedAt: new Date(),
        language: 'en',
        choices: [
          { id: '1', text: 'Larger address space', isCorrect: true },
          { id: '2', text: 'Built-in security (IPSec)', isCorrect: true },
          { id: '3', text: 'Simplified header format', isCorrect: true },
          { id: '4', text: 'Slower routing performance', isCorrect: false },
        ],
      },
      order: 2,
      points: 10,
      required: true,
    },
    {
      id: 'q3',
      question: {
        id: 'q3',
        type: 'essay',
        title: 'Explain IPv6 Address Types',
        description: 'Describe the different types of IPv6 addresses and their purposes.',
        required: true,
        points: 20,
        category: 'Networking',
        tags: ['ipv6', 'addressing'],
        createdAt: new Date(),
        updatedAt: new Date(),
        language: 'en',
        minLength: 100,
        maxLength: 1000,
        richText: true,
      },
      order: 3,
      points: 20,
      required: true,
    },
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

export default function TakeAssessmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real application, you would fetch the assessment data based on the ID
  const assessment = sampleAssessment;

  const handleComplete = async (attempt: AssessmentAttempt) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // In a real application, you would submit the attempt to your backend
      console.log('Assessment attempt:', attempt);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to results page
      router.push(`/assessments/${params.id}/results/${attempt.id}`);
    } catch (err) {
      setError('Failed to submit assessment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
      router.push('/assessments');
    }
  };

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Assessment Not Found</h1>
          <p className="text-secondary mb-4">
            The assessment you're looking for doesn't exist or has been removed.
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

  return (
    <div>
      {error && (
        <div className="fixed top-4 right-4 bg-error/10 text-error px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      <AssessmentDelivery
        assessment={assessment}
        onComplete={handleComplete}
        onExit={handleExit}
      />

      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Submitting your assessment...</p>
          </div>
        </div>
      )}
    </div>
  );
}
