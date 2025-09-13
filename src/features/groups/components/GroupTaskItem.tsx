"use client"
import React from 'react';
import { GroupTask } from '@/shared/types/Task';

interface GroupTaskItemProps {
  task: GroupTask;
  onUpdateTask: (taskId: string, completed: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  onStartEditing: (taskId: string, text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  editingTask: { id: string; text: string } | null;
  editText: string;
  setEditText: (text: string) => void;
}

export default function GroupTaskItem({
  task,
  onUpdateTask,
  onDeleteTask,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  editingTask,
  editText,
  setEditText,
}: GroupTaskItemProps) {
  const isEditing = editingTask && editingTask.id === task.taskId;

  return (
    <li className="flex items-center bg-surface p-3 rounded-lg border border-border-subtle">
      {isEditing ? (
        <div className="flex w-full">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 border border-border-subtle rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-surface text-text-primary"
          />
          <button
            onClick={onSaveEdit}
            className="bg-feedback-success hover:bg-feedback-success-hover text-white px-4 py-2"
          >
            Save
          </button>
          <button
            onClick={onCancelEdit}
            className="bg-bg-secondary hover:bg-bg-hover text-text-primary px-4 py-2 rounded-r-lg"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onUpdateTask(task.taskId, e.target.checked)}
            className="mr-3 h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
          />
          <span className={`${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'} flex-1`}>
            {task.text}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => onStartEditing(task.taskId, task.text)}
              className="text-text-secondary hover:text-brand-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => onDeleteTask(task.taskId)}
              className="text-text-secondary hover:text-feedback-error transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}
