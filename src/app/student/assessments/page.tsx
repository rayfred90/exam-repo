'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function StudentAssessments() {
  const [assessments] = useState([
    {
      id: '1',
      title: 'IPv6 Fundamentals',
      category: 'Networking',
      type: 'Real Exam',
      duration: '60 minutes',
      deadline: '2024-02-01',
      attempts: {
        used: 0,
        max: 1,
      },
      status: 'Available',
    },
    {
      id: '2',
      title: 'Network Security Basics',
      category: 'Security',
      type: 'Practice',
      duration: '45 minutes',
      deadline: '2024-02-03',
      attempts: {
        used: 2,
        max: 'Unlimited',
      },
      status: 'In Progress',
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Assessments</h1>
          <p className="text-[hsl(0,0%,40%)] mt-1">
            View and take your assigned assessments
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/student/practice-exams" className="btn btn-secondary">
            Practice Exams
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search assessments..."
            className="input w-full"
          />
        </div>
        <select className="input min-w-[150px]">
          <option value="">All Types</option>
          <option value="real">Real Exam</option>
          <option value="practice">Practice</option>
        </select>
        <select className="input min-w-[150px]">
          <option value="">All Categories</option>
          <option value="networking">Networking</option>
          <option value="security">Security</option>
        </select>
        <select className="input min-w-[150px]">
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium">{assessment.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-[hsl(0,0%,40%)]">
                  <span>{assessment.category}</span>
                  <span>•</span>
                  <span>{assessment.type}</span>
                  <span>•</span>
                  <span>{assessment.duration}</span>
                  <span>•</span>
                  <span>Attempts: {assessment.attempts.used}/{assessment.attempts.max}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  assessment.status === 'Available'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                    : assessment.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
                }`}>
                  {assessment.status}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/student/assessments/${assessment.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    View Details
                  </Link>
                  {assessment.status !== 'Completed' && (
                    <Link
                      href={`/student/assessments/${assessment.id}/take`}
                      className="btn btn-primary btn-sm"
                    >
                      Start Assessment
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Deadline Warning */}
            {new Date(assessment.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
              <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 rounded-lg">
                <p className="text-sm">
                  Deadline: {assessment.deadline} ({
                    new Date(assessment.deadline).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  })
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {assessments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[hsl(0,0%,40%)] mb-4">No assessments available</div>
          <Link href="/student/practice-exams" className="btn btn-primary">
            Try Practice Exams
          </Link>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-[hsl(0,0%,40%)]">
          Showing {assessments.length} assessments
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm" disabled>
            Previous
          </button>
          <button className="btn btn-secondary btn-sm" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
