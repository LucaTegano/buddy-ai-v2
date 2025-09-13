import { useGroupsStore } from '@/features/groups/store/groups.store';
import { toast } from 'sonner';
import { Group } from '../types/Group';

export const groupActions = {
  
  loadGroups: async () => {
    try {
      await useGroupsStore.getState().loadGroups();
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to load groups';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  createGroup: async (group: Partial<Group>) => {
    try {
      console.log('Creating group with data:', group);
      
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        console.error('Cannot create group: User is not authenticated');
        toast.error('You must be logged in to create a group');
        return { success: false, error: 'You must be logged in to create a group' };
      }
      
      const result = await useGroupsStore.getState().createGroup(group);
      console.log('Create group result:', result);
      if (result) {
        toast.success('Group created successfully!');
        return { success: true, group: result };
      } else {
        toast.error('Failed to create group');
        return { success: false, error: 'Failed to create group' };
      }
    } catch (error: unknown) {
      console.error('Failed to create group:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to create group';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  joinGroup: async (groupId: string) => {
    try {
      const result = await useGroupsStore.getState().joinGroup(groupId);
      if (result) {
        toast.success('Joined group successfully!');
        return { success: true, group: result };
      } else {
        toast.error('Failed to join group');
        return { success: false, error: 'Failed to join group' };
      }
    } catch (error: unknown) {
      console.error('Failed to join group:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to join group';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  leaveGroup: async (groupId: string) => {
    try {
      await useGroupsStore.getState().leaveGroup(groupId);
      toast.success('Left group successfully.');
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to leave group';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  setActiveGroupId: (groupId: string | null) => {
    useGroupsStore.getState().setActiveGroupId(groupId);
  },

  loadGroupTasks: async (groupId: string) => {
    try {
      await useGroupsStore.getState().loadGroupTasks(groupId);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to load group tasks';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  createGroupTask: async (groupId: string, taskText: string) => {
    try {
      await useGroupsStore.getState().createGroupTask(groupId, taskText);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to create task';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  updateGroupTask: async (groupId: string, taskId: string, taskText: string, completed: boolean) => {
    try {
      await useGroupsStore.getState().updateGroupTask(groupId, taskId, taskText, completed);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to update task';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  deleteGroupTask: async (groupId: string, taskId: string) => {
    try {
      await useGroupsStore.getState().deleteGroupTask(groupId, taskId);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to delete task';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  loadGroupMembers: async (groupId: string) => {
    try {
      await useGroupsStore.getState().loadGroupMembers(groupId);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to load group members';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  loadGroupFiles: async (groupId: string) => {
    try {
      await useGroupsStore.getState().loadGroupFiles(groupId);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to load group files';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
}