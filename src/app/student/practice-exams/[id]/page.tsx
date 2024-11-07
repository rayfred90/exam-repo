'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AssessmentDelivery } from '@/components/AssessmentDelivery';
import { Assessment } from '@/types';

export default function PracticeExamAttempt({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the practice exam data
    // For demo, using mock data
    setAssessment({
      id: params.id,
      title: 'IPv6 Fundamentals Practice',
      description: 'Practice questions covering IPv6 addressing, protocols, and implementation.',
      category: 'Networking',
      level: 'intermediate',
      duration: 30,
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
            tags: ['IPv6', 'Networking', 'Protocols'],
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
      ],
      settings: {
        shuffleQuestions: true,
        showResults: true,
        showFeedback: true,
        allowReview: true,
        maxAttempts: -1, // Unlimited attempts for practice
        passingThreshold: 70,
        browserSecurity: {
          blockNewTabs: false,
          blockRightClick: false,
          fullScreen: false,
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
      createdBy: 'system',
    });
    setLoading(false);
  }, [params.id]);

  const handleComplete = async (attempt: any) => {
    try {
      // In a real app, submit the attempt to your backend
      console.log('Practice attempt completed:', attempt);

      // Redirect to results page
      router.push(`/student/practice-exams/${params.id}/results/${attempt.id}`);
    } catch (error) {
      console.error('Failed to submit practice attempt:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-[hsl(0,0%,40%)]">Loading practice exam...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Practice Exam Not Found</h1>
          <p className="text-[hsl(0,0%,40%)] mb-4">
            The practice exam you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/student/practice-exams')}
            className="btn btn-primary"
          >
            Back to Practice Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AssessmentDelivery
        assessment={assessment}
        onComplete={handleComplete}
        onExit={() => router.push('/student/practice-exams')}
      />
    </div>
  );
}
