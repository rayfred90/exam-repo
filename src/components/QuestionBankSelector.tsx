'use client';

import { useState } from 'react';
import { Question } from '@/types';

interface QuestionBankSelectorProps {
  onSelect: (questions: Question[]) => void;
  onClose: () => void;
  examType: 'real' | 'practice';
}

export default function QuestionBankSelector({ onSelect, onClose, examType }: QuestionBankSelectorProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    type: '',
    difficulty: '',
  });

  // Mock questions for demo
  const [questions] = useState<(Question & { examType: 'real' | 'practice' })[]>([
    {
      id: 'q1',
      type: 'multiple-choice',
      title: 'What is the main purpose of IPv6?',
      description: 'Select the primary reason for developing IPv6.',
      required: true,
      points: 10,
      category: 'Networking',
      tags: ['IPv6', 'Networking', 'Protocols'],
      createdAt: new Date(),
      updatedAt: new Date(),
      language: 'en',
      examType: 'real',
      choices: [
        { id: '1', text: 'To increase the available IP address space', isCorrect: true },
        { id: '2', text: 'To improve internet security', isCorrect: false },
        { id: '3', text: 'To reduce internet latency', isCorrect: false },
        { id: '4', text: 'To simplify network configuration', isCorrect: false },
      ],
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      title: 'Practice: IPv6 Address Types',
      description: 'Identify the different types of IPv6 addresses.',
      required: true,
      points: 5,
      category: 'Networking',
      tags: ['IPv6', 'Networking', 'Practice'],
      createdAt: new Date(),
      updatedAt: new Date(),
      language: 'en',
      examType: 'practice',
      choices: [
        { id: '1', text: 'Unicast', isCorrect: true },
        { id: '2', text: 'Multicast', isCorrect: true },
        { id: '3', text: 'Broadcast', isCorrect: false },
        { id: '4', text: 'Anycast', isCorrect: true },
      ],
    },
  ]);

  const filteredQuestions = questions.filter(q => q.examType === examType);

  const toggleQuestionSelection = (question: Question) => {
    setSelectedQuestions(prev =>
      prev.some(q => q.id === question.id)
        ? prev.filter(q => q.id !== question.id)
        : [...prev, question]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-[800px] max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Select Questions</h2>
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  examType === 'real' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                }`}>
                  {examType === 'real' ? 'Real Exam Questions' : 'Practice Questions'}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-[hsl(0,0%,40%)] hover:text-foreground">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full"
              />
            </div>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="input w-40"
            >
              <option value="">All Categories</option>
              <option value="networking">Networking</option>
              <option value="security">Security</option>
            </select>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="input w-40"
            >
              <option value="">All Types</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="essay">Essay</option>
            </select>
          </div>

          {/* Questions List */}
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              {filteredQuestions.map(question => (
                <div
                  key={question.id}
                  className="flex items-start gap-4 p-4 border-b hover:bg-secondary/5"
                >
                  <input
                    type="checkbox"
                    checked={selectedQuestions.some(q => q.id === question.id)}
                    onChange={() => toggleQuestionSelection(question)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{question.title}</h3>
                    <p className="text-sm text-[hsl(0,0%,40%)] mt-1">{question.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                        {question.category}
                      </span>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                        {question.type}
                      </span>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                        {question.points} points
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-secondary/5">
          <div className="flex justify-between items-center">
            <div className="text-[hsl(0,0%,40%)]">
              {selectedQuestions.length} questions selected
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => onSelect(selectedQuestions)}
                className="btn btn-primary"
                disabled={selectedQuestions.length === 0}
              >
                Add Selected Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
