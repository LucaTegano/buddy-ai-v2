"use client"
import React from 'react';
import { GroupTask } from '@/shared/types/Task';
import GroupTaskItem from './GroupTaskItem';

interface GroupTaskListProps {
  tasks: GroupTask[];
  onUpdateTask: (taskId: string, completed: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  onStartEditing: (taskId: string, text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  editingTask: { id: string; text: string } | null;
  editText: string;
  setEditText: (text: string) => void;
}

export default function GroupTaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  editingTask,
  editText,
  setEditText,
}: GroupTaskListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No tasks yet. Add a new task to get started!
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <ul className="space-y-2">
        {tasks.map((task) => {
          // The fix is on the 'key' prop in the next line.
          // We are using `task.id` because your console log showed that the
          // unique identifier on the task object is named `id`, not `taskId`.
          return (
            <GroupTaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onStartEditing={onStartEditing}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              editingTask={editingTask}
              editText={editText}
              setEditText={setEditText}
            />
          );
        })}
      </ul>
    </div>
  );
}