'use client';

import { useState } from 'react';
import QuestionBankSelector from './QuestionBankSelector';
import { Question } from '@/types';

interface AssessmentEditorProps {
  onSave: (assessment: any) => void;
  onCancel: () => void;
}

export function AssessmentEditor({ onSave, onCancel }: AssessmentEditorProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'questions' | 'settings'>('basic');
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    description: '',
    duration: 60,
    category: '',
    difficultyLevel: 'medium',
    type: 'real' as 'real' | 'practice', // Added exam type
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [settings, setSettings] = useState({
    shuffleQuestions: true,
    showResults: true,
    showFeedback: true,
    allowReview: true,
    maxAttempts: 1,
    passingThreshold: 75,
    gradingType: 'automatic',
    browserSecurity: {
      blockNewTabs: true,
      blockRightClick: true,
      requireFullScreen: true,
    },
    proctoring: {
      enabled: true,
      requireWebcam: true,
      requireScreenSharing: true,
      requireIdentityVerification: true,
    },
  });

  const handleAddQuestion = () => {
    setShowQuestionBank(true);
  };

  const handleSelectQuestions = (selectedQuestions: Question[]) => {
    setQuestions(prev => [...prev, ...selectedQuestions]);
    setShowQuestionBank(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-background rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Edit Assessment</h2>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    basicInfo.type === 'real' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                  }`}>
                    {basicInfo.type === 'real' ? 'Real Exam' : 'Practice Exam'}
                  </span>
                </div>
              </div>
              <button onClick={onCancel} className="text-[hsl(0,0%,40%)] hover:text-foreground">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={`pb-2 px-1 ${
                    activeTab === 'basic'
                      ? 'border-b-2 border-primary font-medium text-primary'
                      : 'text-[hsl(0,0%,40%)]'
                  }`}
                >
                  Basic Information
                </button>
                <button
                  onClick={() => setActiveTab('questions')}
                  className={`pb-2 px-1 ${
                    activeTab === 'questions'
                      ? 'border-b-2 border-primary font-medium text-primary'
                      : 'text-[hsl(0,0%,40%)]'
                  }`}
                >
                  Questions
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`pb-2 px-1 ${
                    activeTab === 'settings'
                      ? 'border-b-2 border-primary font-medium text-primary'
                      : 'text-[hsl(0,0%,40%)]'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            {/* Basic Information Tab Content */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Assessment Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={basicInfo.type === 'real'}
                        onChange={() => setBasicInfo({ ...basicInfo, type: 'real' })}
                        className="radio"
                      />
                      <span>Real Exam</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={basicInfo.type === 'practice'}
                        onChange={() => setBasicInfo({ ...basicInfo, type: 'practice' })}
                        className="radio"
                      />
                      <span>Practice Exam</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={basicInfo.title}
                    onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                    className="input w-full"
                    placeholder="Enter assessment title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={basicInfo.description}
                    onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                    className="input w-full h-24"
                    placeholder="Enter assessment description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={basicInfo.duration}
                    onChange={(e) => setBasicInfo({ ...basicInfo, duration: parseInt(e.target.value) })}
                    className="input w-full"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={basicInfo.category}
                    onChange={(e) => setBasicInfo({ ...basicInfo, category: e.target.value })}
                    className="input w-full"
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <select
                    value={basicInfo.difficultyLevel}
                    onChange={(e) => setBasicInfo({ ...basicInfo, difficultyLevel: e.target.value })}
                    className="input w-full"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            )}

            {/* Questions Tab Content */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Questions</h3>
                  <button
                    onClick={handleAddQuestion}
                    className="btn btn-primary"
                  >
                    Add Question
                  </button>
                </div>
                {questions.length === 0 ? (
                  <div className="text-center py-8 text-[hsl(0,0%,40%)]">
                    No questions added yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{question.title}</h4>
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
                          <button
                            onClick={() => setQuestions(prev => prev.filter(q => q.id !== question.id))}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab Content */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Assessment Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.shuffleQuestions}
                        onChange={(e) =>
                          setSettings({ ...settings, shuffleQuestions: e.target.checked })
                        }
                        className="checkbox"
                      />
                      <span>Shuffle questions</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.showResults}
                        onChange={(e) =>
                          setSettings({ ...settings, showResults: e.target.checked })
                        }
                        className="checkbox"
                      />
                      <span>Show results after completion</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.showFeedback}
                        onChange={(e) =>
                          setSettings({ ...settings, showFeedback: e.target.checked })
                        }
                        className="checkbox"
                      />
                      <span>Show feedback for answers</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settings.allowReview}
                        onChange={(e) =>
                          setSettings({ ...settings, allowReview: e.target.checked })
                        }
                        className="checkbox"
                      />
                      <span>Allow question review</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Maximum Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.maxAttempts}
                      onChange={(e) =>
                        setSettings({ ...settings, maxAttempts: parseInt(e.target.value) })
                      }
                      min="1"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Passing Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={settings.passingThreshold}
                      onChange={(e) =>
                        setSettings({ ...settings, passingThreshold: parseInt(e.target.value) })
                      }
                      min="0"
                      max="100"
                      className="input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Grading Type
                  </label>
                  <select
                    value={settings.gradingType}
                    onChange={(e) =>
                      setSettings({ ...settings, gradingType: e.target.value })
                    }
                    className="input w-full"
                  >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {basicInfo.type === 'real' && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Browser Security</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.browserSecurity.blockNewTabs}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                browserSecurity: {
                                  ...settings.browserSecurity,
                                  blockNewTabs: e.target.checked,
                                },
                              })
                            }
                            className="checkbox"
                          />
                          <span>Block new tabs/windows</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.browserSecurity.blockRightClick}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                browserSecurity: {
                                  ...settings.browserSecurity,
                                  blockRightClick: e.target.checked,
                                },
                              })
                            }
                            className="checkbox"
                          />
                          <span>Block right-click</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.browserSecurity.requireFullScreen}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                browserSecurity: {
                                  ...settings.browserSecurity,
                                  requireFullScreen: e.target.checked,
                                },
                              })
                            }
                            className="checkbox"
                          />
                          <span>Require full screen</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Proctoring</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.proctoring.enabled}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                proctoring: {
                                  ...settings.proctoring,
                                  enabled: e.target.checked,
                                },
                              })
                            }
                            className="checkbox"
                          />
                          <span>Enable proctoring</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.proctoring.requireWebcam}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                proctoring: {
                                  ...settings.proctoring,
                                  requireWebcam: e.target.checked,
                                },
                              })
                            }
                            className="checkbox"
                          />
                          <span>Require webcam</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.proctoring.requireScreenSharing}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                proctoring: {
                                  ...settings.proctoring,
                                  requireScreenSharing: e.target.checked,
                                },
                              })
                            }
                            className="checkbox"
                          />
                          <span>Require screen sharing</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settings.proctoring.requireIdentityVerification}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                proctoring: {
                                  ...settings.proctoring,
                                  requireIdentityVerification: e.target.checked,
                                },
                              })
                            }
                            className="checkbox"
                          />
                          <span>Require identity verification</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={onCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave({ basicInfo, questions, settings })}
                className="btn btn-primary"
              >
                Save Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Bank Selector Modal */}
      {showQuestionBank && (
        <QuestionBankSelector
          onSelect={handleSelectQuestions}
          onClose={() => setShowQuestionBank(false)}
          examType={basicInfo.type}
        />
      )}
    </>
  );
}
