'use client';

import { Question, JsonValue } from '@/types';
import { useState } from 'react';
import { BaseQuestion } from './BaseQuestion';

interface DragAndDropProps {
  question: Question;
  value?: string[];
  onChange?: (value: string[]) => void;
  isEditing?: boolean;
}

interface DraggableItem {
  id: string;
  text: string;
}

interface QuestionContent {
  choices: Array<{
    id: string;
    text: string;
  }>;
}

export function DragAndDrop({
  question,
  value = [],
  onChange,
  isEditing = false,
}: DragAndDropProps) {
  const [dragging, setDragging] = useState<string | null>(null);
  const content = JSON.parse(question.content) as QuestionContent;
  const [items] = useState<DraggableItem[]>(
    content.choices?.map(choice => ({
      id: choice.id,
      text: choice.text,
    })) || []
  );

  const handleDragStart = (itemId: string) => {
    if (!isEditing) return;
    setDragging(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!isEditing || !dragging) return;

    const newValue = [...value];
    const sourceIndex = newValue.indexOf(dragging);
    const targetIndex = newValue.indexOf(targetId);

    if (sourceIndex === -1) {
      // Item is being added from the available items
      newValue.push(dragging);
    } else {
      // Reordering existing items
      newValue.splice(sourceIndex, 1);
      newValue.splice(targetIndex, 0, dragging);
    }

    onChange?.(newValue);
    setDragging(null);
  };

  return (
    <div className="space-y-6">
      <BaseQuestion question={question} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Items */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-[hsl(0,0%,40%)]">Available Items</h4>
          <div className="space-y-2">
            {items.filter(item => !value.includes(item.id)).map(item => (
              <div
                key={item.id}
                draggable={isEditing}
                onDragStart={() => handleDragStart(item.id)}
                className={`p-3 border rounded-lg bg-card cursor-move ${
                  dragging === item.id ? 'opacity-50' : ''
                }`}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-[hsl(0,0%,40%)]">Your Answer</h4>
          <div
            className="space-y-2 min-h-[200px] p-4 border rounded-lg bg-secondary/5"
            onDragOver={handleDragOver}
          >
            {value.map((itemId) => {
              const item = items.find(i => i.id === itemId);
              if (!item) return null;

              return (
                <div
                  key={item.id}
                  draggable={isEditing}
                  onDragStart={() => handleDragStart(item.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(item.id)}
                  className={`p-3 border rounded-lg bg-card cursor-move ${
                    dragging === item.id ? 'opacity-50' : ''
                  }`}
                >
                  {item.text}
                </div>
              );
            })}
            {value.length === 0 && (
              <div className="h-full flex items-center justify-center text-[hsl(0,0%,40%)]">
                Drag items here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
