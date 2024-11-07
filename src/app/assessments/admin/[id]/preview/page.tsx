'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Assessment } from '@/types';
import { AssessmentDelivery } from '@/components/AssessmentDelivery';

export default function PreviewAssessment({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    // In a real app, fetch the assessment data
    // For demo, using mock data
    setAssessment({
      id: params.id,
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
        shuffleQuestions: false,
        showResults: true,
        showFeedback: true,
        allowReview: true,
        maxAttempts: 1,
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
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
    });
  }, [params.id]);

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Preview Assessment</h1>
        <button
          onClick={() => router.push('/admin/assessments')}
          className="btn btn-secondary"
        >
          Exit Preview
        </button>
      </div>

      <AssessmentDelivery
        assessment={assessment}
        onComplete={(attempt) => {
          console.log('Preview attempt:', attempt);
          router.push('/admin/assessments');
        }}
        onExit={() => router.push('/admin/assessments')}
      />
    </div>
  );
}
