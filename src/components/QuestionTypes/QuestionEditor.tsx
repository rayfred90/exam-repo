'use client';

import { useState } from 'react';

interface QuestionEditorProps {
  onSave: (question: any) => void;
}

export function QuestionEditor({ onSave }: QuestionEditorProps) {
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    type: 'multiple-choice',
    category: '',
    points: 10,
    examType: 'real' as 'real' | 'practice',
    tags: [] as string[],
    choices: [
      { id: '1', text: '', isCorrect: false },
      { id: '2', text: '', isCorrect: false },
      { id: '3', text: '', isCorrect: false },
      { id: '4', text: '', isCorrect: false },
    ],
  });

  const handleAddChoice = () => {
    setQuestion(prev => ({
      ...prev,
      choices: [...prev.choices, { id: `${prev.choices.length + 1}`, text: '', isCorrect: false }],
    }));
  };

  const handleRemoveChoice = (id: string) => {
    setQuestion(prev => ({
      ...prev,
      choices: prev.choices.filter(choice => choice.id !== id),
    }));
  };

  const handleAddTag = (tag: string) => {
    if (tag && !question.tags.includes(tag)) {
      setQuestion(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setQuestion(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Exam Type Selection */}
      <div className="flex gap-4 p-4 bg-secondary/10 rounded-lg">
        <button
          onClick={() => setQuestion({ ...question, examType: 'real' })}
          className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
            question.examType === 'real'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-transparent hover:border-blue-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
              question.examType === 'real'
                ? 'border-blue-500 bg-blue-500'
                : 'border-secondary'
            }`}>
              {question.examType === 'real' && (
                <div className="w-full h-full rounded-full bg-white scale-50" />
              )}
            </div>
            <div className="text-left">
              <div className="font-medium">Real Exam Question</div>
              <div className="text-sm text-[hsl(0,0%,40%)]">For official assessments and exams</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setQuestion({ ...question, examType: 'practice' })}
          className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
            question.examType === 'practice'
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-transparent hover:border-green-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
              question.examType === 'practice'
                ? 'border-green-500 bg-green-500'
                : 'border-secondary'
            }`}>
              {question.examType === 'practice' && (
                <div className="w-full h-full rounded-full bg-white scale-50" />
              )}
            </div>
            <div className="text-left">
              <div className="font-medium">Practice Question</div>
              <div className="text-sm text-[hsl(0,0%,40%)]">For practice and learning purposes</div>
            </div>
          </div>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Question Type</label>
        <select
          value={question.type}
          onChange={(e) => setQuestion({ ...question, type: e.target.value })}
          className="input w-full"
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="multiple-response">Multiple Response</option>
          <option value="true-false">True/False</option>
          <option value="essay">Essay</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Question Title</label>
        <input
          type="text"
          value={question.title}
          onChange={(e) => setQuestion({ ...question, title: e.target.value })}
          className="input w-full"
          placeholder="Enter question title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description (Optional)</label>
        <textarea
          value={question.description}
          onChange={(e) => setQuestion({ ...question, description: e.target.value })}
          className="input w-full h-24"
          placeholder="Add additional context or instructions..."
        />
      </div>

      {/* Choices (for multiple choice questions) */}
      {question.type === 'multiple-choice' && (
        <div>
          <label className="block text-sm font-medium mb-2">Answers</label>
          <div className="space-y-3">
            {question.choices.map((choice) => (
              <div key={choice.id} className="flex gap-4 items-start">
                <input
                  type="radio"
                  name="correct"
                  checked={choice.isCorrect}
                  onChange={() => {
                    setQuestion({
                      ...question,
                      choices: question.choices.map(c => ({
                        ...c,
                        isCorrect: c.id === choice.id,
                      })),
                    });
                  }}
                  className="mt-2"
                />
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) => {
                    setQuestion({
                      ...question,
                      choices: question.choices.map(c =>
                        c.id === choice.id ? { ...c, text: e.target.value } : c
                      ),
                    });
                  }}
                  className="input flex-1"
                  placeholder="Enter answer text..."
                />
                {question.choices.length > 2 && (
                  <button
                    onClick={() => handleRemoveChoice(choice.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddChoice}
              className="btn btn-secondary"
            >
              Add Answer
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Points</label>
        <input
          type="number"
          value={question.points}
          onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) })}
          className="input w-32"
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <input
          type="text"
          value={question.category}
          onChange={(e) => setQuestion({ ...question, category: e.target.value })}
          className="input w-full"
          placeholder="e.g., Networking, Security, Cloud Computing"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          placeholder="e.g., networking, ipv6, protocols"
          className="input w-full"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const tags = (e.target as HTMLInputElement).value.split(',').map(t => t.trim());
              tags.forEach(tag => handleAddTag(tag));
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
        {question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-secondary-foreground/50 hover:text-secondary-foreground"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button className="btn btn-secondary">
          Cancel
        </button>
        <button
          onClick={() => onSave(question)}
          className="btn btn-primary"
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
