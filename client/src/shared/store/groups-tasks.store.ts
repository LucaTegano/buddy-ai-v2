import { create } from 'zustand';
import { GroupTask } from '../types/Task';
import groupsTasksService from '../services/groups-tasks.service';

interface GroupsTasksState {
  groups: Array<{
    id: string;
    name: string;
    tasks: GroupTask[];
  }>;
  loadGroupTasks: (groupId: string, groupName: string) => Promise<void>;
  addGroupTask: (groupId: string, groupName: string, text: string) => Promise<void>;
  removeGroupTask: (groupId: string, groupName: string, taskId: string) => Promise<void>;
  renameGroupTask: (groupId: string, groupName: string, taskId: string, newText: string) => Promise<void>;
  toggleGroupTaskCompletion: (groupId: string, groupName: string, taskId: string) => Promise<void>;
}

export const useGroupsTasksStore = create<GroupsTasksState>((set, get) => ({
  groups: [],

  loadGroupTasks: async (groupId: string, groupName: string) => {
    try {
      const tasks = await groupsTasksService.getAllGroupTasks(groupName);
      set(state => ({
        groups: state.groups.map(group => 
          group.id === groupId 
            ? { ...group, tasks } 
            : group
        )
      }));
    } catch (error) {
      console.error('Failed to load group tasks:', error);
      throw error;
    }
  },

  addGroupTask: async (groupId: string, groupName: string, text: string) => {
    try {
      const newTask = await groupsTasksService.createGroupTask(groupName, { text, completed: false });
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? { ...group, tasks: [...group.tasks, newTask] }
            : group
        )
      }));
    } catch (error) {
      console.error('Failed to add group task:', error);
      throw error;
    }
  },

  removeGroupTask: async (groupId: string, groupName: string, taskId: string) => {
    try {
      await groupsTasksService.deleteGroupTask(taskId, groupName);
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? { ...group, tasks: group.tasks.filter(task => task.id !== taskId) }
            : group
        )
      }));
    } catch (error) {
      console.error('Failed to remove group task:', error);
      throw error;
    }
  },

  renameGroupTask: async (groupId: string, groupName: string, taskId: string, newText: string) => {
    try {
      const group = get().groups.find(g => g.id === groupId);
      if (!group) return;
      
      const taskToUpdate = group.tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;
      
      await groupsTasksService.updateGroupTask(taskId, groupName, { 
        ...taskToUpdate, 
        text: newText 
      });
      
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                tasks: group.tasks.map(task =>
                  task.id === taskId ? { ...task, text: newText } : task
                )
              }
            : group
        )
      }));
    } catch (error) {
      console.error('Failed to rename group task:', error);
      throw error;
    }
  },

  toggleGroupTaskCompletion: async (groupId: string, groupName: string, taskId: string) => {
    try {
      const group = get().groups.find(g => g.id === groupId);
      if (!group) return;
      
      const taskToUpdate = group.tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;
      
      const updatedTask = await groupsTasksService.toggleGroupTaskCompletion(taskId, groupName);
      
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                tasks: group.tasks.map(task =>
                  task.id === taskId ? { ...task, completed: updatedTask.completed } : task
                )
              }
            : group
        )
      }));
    } catch (error) {
      console.error('Failed to toggle group task completion:', error);
      throw error;
    }
  },
}));