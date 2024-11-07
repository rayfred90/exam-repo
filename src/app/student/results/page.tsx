'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
}

// Loading component
function LoadingState() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card h-32"></div>
        ))}
      </div>
    </div>
  );
}

export default function StudentResults() {
  const [results] = useState([
    {
      id: '1',
      title: 'IPv6 Fundamentals',
      date: '2024-01-15',
      score: 85,
      passingScore: 70,
      timeSpent: '52:30',
      category: 'Networking',
      certificate: true,
      tags: ['IPv6', 'Networking', 'Protocols'],
    },
    {
      id: '2',
      title: 'Network Security Basics',
      date: '2024-01-10',
      score: 92,
      passingScore: 75,
      timeSpent: '45:15',
      category: 'Security',
      certificate: true,
      tags: ['Security', 'Firewall', 'Protocols'],
    },
  ]);

  return (
    <Suspense fallback={<LoadingState />}>
      <ErrorBoundary>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold">My Results</h1>
            <p className="text-[hsl(0,0%,40%)] mt-1">
              View your assessment results and certificates
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Completed Assessments</h3>
              <p className="text-3xl font-bold">12</p>
              <p className="text-[hsl(0,0%,40%)] mt-1">Last 30 days</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Average Score</h3>
              <p className="text-3xl font-bold">88%</p>
              <p className="text-[hsl(0,0%,40%)] mt-1">All assessments</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Pass Rate</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">90%</p>
              <p className="text-[hsl(0,0%,40%)] mt-1">Success rate</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Certificates</h3>
              <p className="text-3xl font-bold">5</p>
              <p className="text-[hsl(0,0%,40%)] mt-1">Earned certificates</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search results..."
                className="input w-full"
              />
            </div>
            <select className="input min-w-[150px]">
              <option value="">All Categories</option>
              <option value="networking">Networking</option>
              <option value="security">Security</option>
              <option value="cloud">Cloud Computing</option>
            </select>
            <select className="input min-w-[150px]">
              <option value="">All Time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{result.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-[hsl(0,0%,40%)]">
                      <span>Completed: {result.date}</span>
                      <span>•</span>
                      <span>Time Spent: {result.timeSpent}</span>
                      <span>•</span>
                      <span>Category: {result.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-[hsl(0,0%,40%)]">Score</div>
                        <div className={`text-2xl font-bold ${
                          result.score >= result.passingScore
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {result.score}%
                        </div>
                      </div>
                      {result.certificate && (
                        <button
                          onClick={() => window.open(`/certificates/${result.id}`, '_blank')}
                          className="btn btn-primary"
                        >
                          Download Certificate
                        </button>
                      )}
                    </div>
                    <Link
                      href={`/student/results/${result.id}`}
                      className="btn btn-secondary"
                    >
                      View Detailed Results
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Performance by Category</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Networking</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Security</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold mb-4">Progress Over Time</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Last Week</span>
                  <span className="text-green-600 dark:text-green-400">+5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Month</span>
                  <span className="text-green-600 dark:text-green-400">+12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Quarter</span>
                  <span className="text-green-600 dark:text-green-400">+18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}
