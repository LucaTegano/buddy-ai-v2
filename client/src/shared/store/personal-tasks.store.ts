import { create } from 'zustand';
import { PersonalTask } from '../types/Task';
import tasksService from '../services/personal-tasks.service';
import { 
  showTaskAddedSuccess, 
  showTaskRemovedSuccess, 
  showTaskUpdatedSuccess, 
  showTaskStatusUpdatedSuccess,
  showFailedToLoadTasksError,
  showFailedToAddTaskError,
  showFailedToRemoveTaskError,
  showFailedToUpdateTaskError,
  showFailedToUpdateTaskStatusError
} from '@/lib/utils/toast.helpers';

interface TaskState {
  personalTasks: PersonalTask[];
  loadPersonalTasks: () => Promise<void>;
  addPersonalTask: (text: string) => Promise<void>;
  removePersonalTask: (taskId: string) => Promise<void>;
  renamePersonalTask: (taskId: string, newText: string) => Promise<void>;
  togglePersonalTaskCompletion: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  personalTasks: [],

  loadPersonalTasks: async () => {
    try {
      console.log('Loading personal tasks...');
      const tasks = await tasksService.getAllPersonalTasks();
      console.log('Personal tasks loaded:', tasks);
      set({ personalTasks: tasks });
    } catch (error) {
      console.error('Failed to load personal tasks:', error);
      showFailedToLoadTasksError();
      set({ personalTasks: [] });
    }
  },

  addPersonalTask: async (text: string) => {
    try {
      const newTask = await tasksService.createPersonalTask({ text, completed: false });
      set(state => ({
        personalTasks: [...state.personalTasks, newTask],
      }));
      showTaskAddedSuccess();
    } catch (error) {
      console.error('Failed to add personal task:', error);
      showFailedToAddTaskError();
      throw error;
    }
  },

  removePersonalTask: async (taskId: string) => {
    try {
      await tasksService.deletePersonalTask(taskId);
      set(state => ({
        personalTasks: state.personalTasks.filter(task => task.id !== taskId),
      }));
      showTaskRemovedSuccess();
    } catch (error) {
      console.error('Failed to remove personal task:', error);
      showFailedToRemoveTaskError();
      throw error;
    }
  },

  renamePersonalTask: async (taskId: string, newText: string) => {
    try {
      const taskToUpdate = get().personalTasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;

      await tasksService.updatePersonalTask(taskId, { ...taskToUpdate, text: newText });
      set(state => ({
        personalTasks: state.personalTasks.map(task =>
          task.id === taskId ? { ...task, text: newText } : task
        ),
      }));
      showTaskUpdatedSuccess();
    } catch (error) {
      console.error('Failed to rename personal task:', error);
      showFailedToUpdateTaskError();
      throw error;
    }
  },

  togglePersonalTaskCompletion: async (taskId: string) => {
    try {
      const taskToUpdate = get().personalTasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;

      const updatedTask = await tasksService.togglePersonalTaskCompletion(taskId);
      set(state => ({
        personalTasks: state.personalTasks.map(task =>
          task.id === taskId ? { ...task, completed: updatedTask.completed } : task
        ),
      }));
      showTaskStatusUpdatedSuccess();
    } catch (error) {
      console.error('Failed to toggle personal task completion:', error);
      showFailedToUpdateTaskStatusError();
      throw error;
    }
  },
}));