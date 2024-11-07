'use client';

import { Question } from '@/types';
import { BaseQuestion } from './BaseQuestion';

interface MatrixProps {
  question: Question;
  value?: Record<string, string>;
  onChange?: (value: Record<string, string>) => void;
  isEditing?: boolean;
}

interface MatrixRow {
  id: string;
  text: string;
}

interface MatrixColumn {
  id: string;
  text: string;
}

export function Matrix({
  question,
  value = {},
  onChange,
  isEditing = false,
}: MatrixProps) {
  // In a real app, these would come from the question data
  const rows: MatrixRow[] = [
    { id: 'r1', text: 'User Interface' },
    { id: 'r2', text: 'Performance' },
    { id: 'r3', text: 'Reliability' },
    { id: 'r4', text: 'Documentation' },
  ];

  const columns: MatrixColumn[] = [
    { id: 'c1', text: 'Poor' },
    { id: 'c2', text: 'Fair' },
    { id: 'c3', text: 'Good' },
    { id: 'c4', text: 'Excellent' },
  ];

  const handleChange = (rowId: string, columnId: string) => {
    if (!isEditing) return;
    
    const newValue = {
      ...value,
      [rowId]: columnId,
    };
    onChange?.(newValue);
  };

  return (
    <div className="space-y-6">
      <BaseQuestion question={question} />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/3"></th>
              {columns.map((column) => (
                <th key={column.id} className="text-center p-2 font-medium">
                  {column.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="py-4">{row.text}</td>
                {columns.map((column) => (
                  <td key={column.id} className="text-center">
                    <label className="inline-flex items-center justify-center w-full h-full cursor-pointer">
                      <input
                        type="radio"
                        name={`matrix-${question.id}-${row.id}`}
                        checked={value[row.id] === column.id}
                        onChange={() => handleChange(row.id, column.id)}
                        disabled={!isEditing}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border ${
                          value[row.id] === column.id
                            ? 'bg-primary border-primary'
                            : 'border-input'
                        }`}
                      >
                        {value[row.id] === column.id && (
                          <span className="block w-2 h-2 mx-auto mt-1 rounded-full bg-primary-foreground" />
                        )}
                      </span>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
