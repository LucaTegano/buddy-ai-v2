import React from 'react';
import { useTaskStore } from '../store/personal-tasks.store';
import { useGroupsTasksStore } from '../store/groups-tasks.store';
import { GroupMember, PersonalTask, GroupTask } from '../types/Task';

export const getAssignee = (members: GroupMember[], assigneeId?: string) => {
  if (!assigneeId) return null;
  return members.find(m => m.id === assigneeId);
};

export const handleToggleCompletion = (
  taskId: string,
  isGroupTask: boolean,
  groupId?: string,
  groupName?: string
) => {
  if (isGroupTask && groupId && groupName) {
    useGroupsTasksStore.getState().toggleGroupTaskCompletion(groupId, groupName, taskId);
  } else {
    useTaskStore.getState().togglePersonalTaskCompletion(taskId);
  }
};

export const handleRemoveTask = (taskId: string, isGroupTask: boolean) => {
  if (!isGroupTask) {
    useTaskStore.getState().removePersonalTask(taskId);
  }
};

export const saveTaskEdit = (
  taskId: string,
  newText: string,
  isGroupTask: boolean,
  setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>,
  groupId?: string,
  groupName?: string
) => {
  if (newText.trim() === '') return;

  if (isGroupTask && groupId && groupName) {
    useGroupsTasksStore.getState().renameGroupTask(groupId, groupName, taskId, newText);
  } else {
    useTaskStore.getState().renamePersonalTask(taskId, newText);
  }
  setEditingTaskId(null);
};

export const handleAddTask = (
  newTaskText: string,
  isGroupTask: boolean,
  setNewTaskText: React.Dispatch<React.SetStateAction<string>>,
  groupId?: string,
  groupName?: string
) => {
  if (newTaskText.trim() === '') return;

  if (isGroupTask && groupId && groupName) {
    useGroupsTasksStore.getState().addGroupTask(groupId, groupName, newTaskText);
  } else {
    useTaskStore.getState().addPersonalTask(newTaskText);
  }
  setNewTaskText('');
};

export const handleDragStart = (
  e: React.DragEvent,
  taskId: string,
  setDraggedTask: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setDraggedTask(taskId);
  e.dataTransfer.effectAllowed = 'move';
};

export const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

export const handleDrop = (
  e: React.DragEvent,
  targetTaskId: string,
  draggedTask: string | null,
  tasks: (PersonalTask | GroupTask)[],
  setTasks: React.Dispatch<React.SetStateAction<(PersonalTask | GroupTask)[]>>,
  setDraggedTask: React.Dispatch<React.SetStateAction<string | null>>
) => {
  e.preventDefault();

  if (draggedTask === null || draggedTask === targetTaskId) return;

  const tasksCopy = [...tasks];
  const draggedIndex = tasksCopy.findIndex(task => task.id === draggedTask);
  const targetIndex = tasksCopy.findIndex(task => task.id === targetTaskId);

  if (draggedIndex === -1 || targetIndex === -1) return;

  const [draggedItem] = tasksCopy.splice(draggedIndex, 1);
  tasksCopy.splice(targetIndex, 0, draggedItem);

  setTasks(tasksCopy);
  setDraggedTask(null);
};

export const handleDragEnd = (setDraggedTask: React.Dispatch<React.SetStateAction<string | null>>) => {
  setDraggedTask(null);
};

export const startEditing = (
  taskId: string,
  currentText: string,
  setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>,
  setEditText: React.Dispatch<React.SetStateAction<string>>,
  editInputRef: React.RefObject<HTMLInputElement | null>
) => {
  setEditingTaskId(taskId);
  setEditText(currentText);
  setTimeout(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, 0);
};

export const cancelEditing = (
  setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>,
  setEditText: React.Dispatch<React.SetStateAction<string>>
) => {
  setEditingTaskId(null);
  setEditText('');
};