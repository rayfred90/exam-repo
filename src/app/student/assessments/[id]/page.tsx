'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Assessment } from '@/types';

export default function AssessmentDetails({ params }: { params: { id: string } }) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the assessment data
    // For demo, using mock data
    setAssessment({
      id: params.id,
      title: 'IPv6 Fundamentals',
      description: 'Assessment covering IPv6 addressing, protocols, and implementation.',
      category: 'Networking',
      level: 'intermediate',
      duration: 60,
      passingScore: 70,
      totalScore: 100,
      questions: [],
      settings: {
        shuffleQuestions: true,
        showResults: true,
        showFeedback: false,
        allowReview: false,
        maxAttempts: 1,
        passingThreshold: 70,
        browserSecurity: {
          blockNewTabs: true,
          blockRightClick: true,
          fullScreen: true,
        },
        gradingType: 'automatic',
        proctoring: {
          enabled: true,
          webcam: true,
          screen: true,
          identity: true,
        },
      },
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'system',
    });
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-[hsl(0,0%,40%)]">Loading assessment details...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Assessment Not Found</h1>
          <p className="text-[hsl(0,0%,40%)] mb-4">
            The assessment you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/student/assessments" className="btn btn-primary">
            Back to Assessments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{assessment.title}</h1>
        <p className="text-[hsl(0,0%,40%)] mt-1">{assessment.description}</p>
      </div>

      {/* Assessment Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Duration</h3>
          <p className="text-3xl font-bold">{assessment.duration} min</p>
          <p className="text-[hsl(0,0%,40%)] mt-1">Time allowed</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Passing Score</h3>
          <p className="text-3xl font-bold">{assessment.passingScore}%</p>
          <p className="text-[hsl(0,0%,40%)] mt-1">Minimum required</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Attempts</h3>
          <p className="text-3xl font-bold">{assessment.settings.maxAttempts === -1 ? '∞' : assessment.settings.maxAttempts}</p>
          <p className="text-[hsl(0,0%,40%)] mt-1">Maximum attempts allowed</p>
        </div>
      </div>

      {/* Requirements */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Requirements</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-primary"></span>
            <span>Webcam required for proctoring</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-primary"></span>
            <span>Screen sharing required</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-primary"></span>
            <span>ID verification required</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href={`/student/assessments/${params.id}/take`}
          className="btn btn-primary"
        >
          Start Assessment
        </Link>
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
