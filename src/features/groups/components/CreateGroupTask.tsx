"use client"
import React, { useState } from 'react';

interface CreateGroupTaskProps {
  onCreateTask: (taskText: string) => void;
}

export default function CreateGroupTask({ onCreateTask }: CreateGroupTaskProps) {
  const [taskText, setTaskText] = useState('');

  const handleCreateTask = () => {
    if (!taskText.trim()) return;
    onCreateTask(taskText);
    setTaskText('');
  };

  return (
    <div className="p-4">
      <div className="flex">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreateTask()}
          className="flex-1 border border-border-subtle rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-surface text-text-primary"
          placeholder="Add a new task..."
        />
        <button
          onClick={handleCreateTask}
          className="bg-brand-primary hover:bg-brand-hover text-white px-4 py-2 rounded-r-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
}
