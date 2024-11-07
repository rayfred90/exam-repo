'use client';

import { Question } from '@/types';
import { useEffect, useState } from 'react';

interface OpenEndedProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
  isEditing?: boolean;
}

export function OpenEnded({
  question,
  value = '',
  onChange,
  isEditing = false,
}: OpenEndedProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (
      (!question.maxLength || newValue.length <= question.maxLength) &&
      (!question.minLength || newValue.length >= question.minLength)
    ) {
      onChange?.(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={handleChange}
        disabled={!isEditing}
        className={`input min-h-[150px] w-full ${
          question.richText ? 'font-mono' : ''
        }`}
        placeholder={isEditing ? 'Type your answer here...' : 'No answer provided'}
      />
      
      {(question.minLength || question.maxLength) && (
        <div className="flex justify-between text-sm text-secondary">
          <span>
            {question.minLength && `Min: ${question.minLength} characters`}
          </span>
          <span>
            {charCount}
            {question.maxLength && `/${question.maxLength}`} characters
          </span>
        </div>
      )}

      {question.richText && (
        <div className="text-sm text-secondary">
          Rich text formatting is supported
        </div>
      )}
    </div>
  );
}
