'use client';

import { Question } from '@/types';
import { BaseQuestion } from './BaseQuestion';

interface LikertScaleProps {
  question: Question;
  value?: string;
  onChange?: (value: string) => void;
  isEditing?: boolean;
}

export function LikertScale({
  question,
  value,
  onChange,
  isEditing = false,
}: LikertScaleProps) {
  const options = [
    { value: '1', label: 'Strongly Disagree' },
    { value: '2', label: 'Disagree' },
    { value: '3', label: 'Neutral' },
    { value: '4', label: 'Agree' },
    { value: '5', label: 'Strongly Agree' },
  ];

  return (
    <div className="space-y-6">
      <BaseQuestion question={question} />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/3"></th>
              {options.map((option) => (
                <th key={option.value} className="text-center p-2 font-medium">
                  {option.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4">{question.title}</td>
              {options.map((option) => (
                <td key={option.value} className="text-center">
                  <label className="inline-flex items-center justify-center w-full h-full cursor-pointer">
                    <input
                      type="radio"
                      name={`likert-${question.id}`}
                      value={option.value}
                      checked={value === option.value}
                      onChange={(e) => onChange?.(e.target.value)}
                      disabled={!isEditing}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border ${
                        value === option.value
                          ? 'bg-primary border-primary'
                          : 'border-input'
                      }`}
                    >
                      {value === option.value && (
                        <span className="block w-2 h-2 mx-auto mt-1 rounded-full bg-primary-foreground" />
                      )}
                    </span>
                  </label>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
