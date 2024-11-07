'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreateAssessment() {
  const [assessmentType, setAssessmentType] = useState<'practice' | 'real' | null>(null);

  const commonFields = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Enter assessment title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          className="input w-full min-h-[100px]"
          placeholder="Enter assessment description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select className="input w-full">
            <option value="">Select category</option>
            <option value="networking">Networking</option>
            <option value="security">Security</option>
            <option value="cloud">Cloud Computing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Level</label>
          <select className="input w-full">
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
          <input
            type="number"
            className="input w-full"
            min="1"
            placeholder="60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Passing Score (%)</label>
          <input
            type="number"
            className="input w-full"
            min="0"
            max="100"
            placeholder="70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Max Attempts</label>
          <input
            type="number"
            className="input w-full"
            min="1"
            placeholder={assessmentType === 'practice' ? 'Unlimited' : '1'}
          />
        </div>
      </div>
    </div>
  );

  const practiceFields = (
    <div className="space-y-6">
      <div className="card bg-secondary/10">
        <h3 className="text-lg font-semibold mb-4">Practice Assessment Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Show correct answers immediately</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Allow question navigation</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Show explanations</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Enable time limit</span>
          </label>
        </div>
      </div>
    </div>
  );

  const realExamFields = (
    <div className="space-y-6">
      <div className="card bg-secondary/10">
        <h3 className="text-lg font-semibold mb-4">Real Assessment Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span>Enable proctoring</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span>Prevent tab switching</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span>Require webcam</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span>Record screen</span>
          </label>
        </div>
      </div>

      <div className="card bg-secondary/10">
        <h3 className="text-lg font-semibold mb-4">Certificate Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span>Generate certificate on passing</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span>Include QR code verification</span>
          </label>
        </div>
      </div>
    </div>
  );

  if (!assessmentType) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Create Assessment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setAssessmentType('practice')}
            className="card hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Practice Assessment</h3>
                <p className="text-secondary">
                  Create a practice assessment with immediate feedback and unlimited attempts.
                  Perfect for learning and preparation.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setAssessmentType('real')}
            className="card hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Real Assessment</h3>
                <p className="text-secondary">
                  Create a secure, proctored assessment for certification or evaluation.
                  Includes identity verification and monitoring.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Create {assessmentType === 'practice' ? 'Practice' : 'Real'} Assessment
          </h1>
          <p className="text-secondary mt-1">
            {assessmentType === 'practice'
              ? 'Configure your practice assessment settings and content.'
              : 'Set up a secure assessment with proctoring and certification.'}
          </p>
        </div>
        <button
          onClick={() => setAssessmentType(null)}
          className="btn btn-secondary"
        >
          Change Type
        </button>
      </div>

      <form className="space-y-8">
        {commonFields}
        {assessmentType === 'practice' ? practiceFields : realExamFields}

        <div className="card bg-secondary/10">
          <h3 className="text-lg font-semibold mb-4">Questions</h3>
          <div className="space-y-4">
            <button type="button" className="btn btn-secondary w-full">
              Add Questions from Question Bank
            </button>
            <button type="button" className="btn btn-secondary w-full">
              Create New Questions
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/assessments" className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Create Assessment
          </button>
        </div>
      </form>
    </div>
  );
}
