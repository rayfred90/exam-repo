'use client';

import { Question } from '@/types';
import { MultipleChoice } from './MultipleChoice';
import { OpenEnded } from './OpenEnded';
import { DragAndDrop } from './DragAndDrop';
import { LikertScale } from './LikertScale';
import { Matrix } from './Matrix';

interface QuestionFactoryProps {
  question: Question;
  value?: string | string[] | Record<string, string>;
  onChange?: (value: string | string[] | Record<string, string>) => void;
  isEditing?: boolean;
  showFeedback?: boolean;
  feedback?: string;
}

export function QuestionFactory({
  question,
  value,
  onChange,
  isEditing = false,
  showFeedback = false,
  feedback,
}: QuestionFactoryProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoice
            question={question}
            value={value as string}
            onChange={onChange as (value: string) => void}
            isEditing={isEditing}
          />
        );
      case 'essay':
        return (
          <OpenEnded
            question={question}
            value={value as string}
            onChange={onChange as (value: string) => void}
            isEditing={isEditing}
          />
        );
      case 'drag-and-drop':
        return (
          <DragAndDrop
            question={question}
            value={value as string[]}
            onChange={onChange as (value: string[]) => void}
            isEditing={isEditing}
          />
        );
      case 'likert-scale':
        return (
          <LikertScale
            question={question}
            value={value as string}
            onChange={onChange as (value: string) => void}
            isEditing={isEditing}
          />
        );
      case 'matrix':
        return (
          <Matrix
            question={question}
            value={value as Record<string, string>}
            onChange={onChange as (value: Record<string, string>) => void}
            isEditing={isEditing}
          />
        );
      default:
        return (
          <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-600 dark:text-red-400">
              Unsupported question type: {question.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderQuestion()}

      {showFeedback && feedback && (
        <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">{feedback}</p>
        </div>
      )}
    </div>
  );
}
