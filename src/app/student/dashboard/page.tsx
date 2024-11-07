'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();

  const handleDownloadCertificate = (id: string) => {
    // In a real app, this would trigger a certificate download
    window.open(`/certificates/${id}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div className="space-x-4">
          <Link 
            href="/student/practice-exams" 
            className="btn btn-secondary"
          >
            Practice Exams
          </Link>
          <Link 
            href="/student/assessments" 
            className="btn btn-primary"
          >
            Real Exams
          </Link>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Completed Exams</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-muted-foreground">Last 30 days</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-3xl font-bold">88%</p>
          <p className="text-muted-foreground">Across all exams</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Certificates Earned</h3>
          <p className="text-3xl font-bold">5</p>
          <p className="text-muted-foreground">View all certificates</p>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2>
        <div className="space-y-4">
          {[
            {
              id: '1',
              title: 'IPv6 Fundamentals',
              date: '2024-02-01',
              duration: '60 minutes',
              type: 'Real Exam',
            },
            {
              id: '2',
              title: 'Network Security Basics',
              date: '2024-02-03',
              duration: '45 minutes',
              type: 'Practice Exam',
            },
          ].map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
            >
              <div>
                <h3 className="font-semibold">{exam.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {exam.date} • {exam.duration}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  exam.type === 'Real Exam' 
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {exam.type}
                </span>
                <Link
                  href={`/student/assessments/${exam.id}`}
                  className="btn btn-secondary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Results</h2>
        <div className="space-y-4">
          {[
            {
              id: '1',
              title: 'Cloud Computing Essentials',
              score: 85,
              date: '2024-01-15',
              tags: ['AWS', 'Cloud', 'Infrastructure'],
              certificate: true,
            },
            {
              id: '2',
              title: 'Python Programming',
              score: 92,
              date: '2024-01-10',
              tags: ['Python', 'Programming', 'Algorithms'],
              certificate: true,
            },
          ].map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="space-y-2">
                <h3 className="font-semibold">{result.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-lg font-bold ${
                  result.score >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {result.score}%
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/student/results/${result.id}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                  {result.certificate && (
                    <button
                      onClick={() => handleDownloadCertificate(result.id)}
                      className="btn btn-primary"
                    >
                      Download Certificate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
