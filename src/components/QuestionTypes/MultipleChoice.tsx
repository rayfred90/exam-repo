'use client';

import { Question } from '@/types';

interface MultipleChoiceProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
  isEditing?: boolean;
}

export function MultipleChoice({
  question,
  value,
  onChange,
  isEditing = false,
}: MultipleChoiceProps) {
  if (!question.choices) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          No choices provided for multiple choice question
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {question.choices.map((choice) => (
        <label
          key={choice.id}
          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
            value === choice.id
              ? 'bg-primary/5 border-primary'
              : 'hover:bg-secondary/50'
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={choice.id}
            checked={value === choice.id}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
          <div className="flex-1">
            <p>{choice.text}</p>
          </div>
        </label>
      ))}
    </div>
  );
}
