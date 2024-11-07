'use client';

import { Question } from '@/types';

interface BaseQuestionProps {
  question: Question;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  isEditing?: boolean;
  showFeedback?: boolean;
  feedback?: string;
}

export function BaseQuestion({
  question,
  value,
  onChange,
  isEditing = false,
  showFeedback = false,
  feedback,
}: BaseQuestionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-medium">{question.title}</h3>
          {question.points && (
            <span className="text-sm text-muted-foreground">
              {question.points} points
            </span>
          )}
        </div>
        {question.description && (
          <p className="text-muted-foreground text-sm">{question.description}</p>
        )}
      </div>

      {showFeedback && feedback && (
        <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">{feedback}</p>
        </div>
      )}

      {question.tags && question.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
