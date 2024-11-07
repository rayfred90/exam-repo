'use client';

import { useState, useEffect } from 'react';
import { Assessment, AssessmentAttempt, AttemptAnswer } from '@/types';
import { QuestionFactory } from './QuestionTypes/QuestionFactory';
import { useId } from 'react';

interface AssessmentDeliveryProps {
  assessment: Assessment;
  onComplete: (attempt: AssessmentAttempt) => void;
  onExit: () => void;
}

export function AssessmentDelivery({
  assessment,
  onComplete,
  onExit,
}: AssessmentDeliveryProps) {
  const attemptId = useId(); // Use stable ID instead of Math.random()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
  const [violations, setViolations] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set start time when component mounts
    setStartTime(new Date());

    // Initialize answers
    const initialAnswers = assessment.questions.map((q) => ({
      questionId: q.id,
      value: '',
      timeSpent: 0,
    }));
    setAnswers(initialAnswers);

    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Security measures
    if (assessment.settings.browserSecurity.fullScreen) {
      document.documentElement.requestFullscreen().catch(console.error);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations((prev) => [
          ...prev,
          {
            type: 'tab-switch',
            timestamp: new Date(),
          },
        ]);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [assessment]);

  const handleAnswerChange = (value: string | string[]) => {
    setAnswers((prev) =>
      prev.map((a, i) =>
        i === currentQuestionIndex ? { ...a, value } : a
      )
    );
  };

  const handleSubmit = () => {
    if (!startTime) return;

    const attempt: AssessmentAttempt = {
      id: attemptId,
      assessmentId: assessment.id,
      userId: 'current-user-id', // This should come from auth context
      startedAt: startTime,
      completedAt: new Date(),
      status: 'completed',
      answers,
      timeSpent: assessment.duration * 60 - timeLeft,
      ipAddress: '', // This should be set server-side
      browserInfo: navigator.userAgent,
      violations,
    };

    onComplete(attempt);
  };

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b mb-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{assessment.title}</h1>
          <div className="flex items-center gap-6">
            <div className="text-secondary">
              Question {currentQuestionIndex + 1} of {assessment.questions.length}
            </div>
            <div className={`font-mono ${timeLeft < 300 ? 'text-red-500' : ''}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <QuestionFactory
          question={currentQuestion.question}
          value={answers[currentQuestionIndex]?.value}
          onChange={handleAnswerChange}
          isEditing={true}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          disabled={currentQuestionIndex === 0}
          className="btn btn-secondary"
        >
          Previous
        </button>

        <div className="flex gap-4">
          {currentQuestionIndex < assessment.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="btn btn-primary"
            >
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation */}
      {assessment.settings.allowReview && (
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Question Navigation</h2>
          <div className="grid grid-cols-10 gap-2">
            {assessment.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`p-2 text-center rounded ${
                  index === currentQuestionIndex
                    ? 'bg-primary text-primary-foreground'
                    : answers[index]?.value
                    ? 'bg-secondary'
                    : 'border'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
