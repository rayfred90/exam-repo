'use client';

import { AssessmentEditor } from '@/components/AssessmentEditor';
import { useRouter } from 'next/navigation';

export default function CreateAssessment() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Assessment</h1>
      <AssessmentEditor
        onSave={(assessment) => {
          // Handle save
          router.push('/admin/assessments');
        }}
        onCancel={() => router.push('/admin/assessments')}
      />
    </div>
  );
}
