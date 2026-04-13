import { create } from 'zustand';
import { GroupsState } from '@/features/groups/types/GroupsStore';
import groupsService from '@/features/groups/services/groups.service';


export const useGroupsStore = create<GroupsState>((set, get) => ({
  groups: [],
  activeGroupId: null,
  isLoading: false,
  error: null,
  
  loadGroups: async () => {
    set({ isLoading: true, error: null });
    try {
      const groups = await groupsService.getAllGroups();
      set({ groups, isLoading: false });
    } catch (error: unknown) {
      console.error('Failed to load groups:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load groups';
      set({ error: errorMessage, isLoading: false });
      
      // If it's an authentication error, we might want to redirect to login
      if (errorMessage.includes('authentication failed') || errorMessage.includes('not authenticated')) {
        // We can't use useRouter here directly, but we can set a flag
        // The component can check this flag and redirect if needed
      }
    }
  },
  
  createGroup: async (group) => {
    try {
      const newGroup = await groupsService.createGroup(group);
      if (newGroup) {
        set(state => ({ groups: [...state.groups, newGroup] }));
        return newGroup;
      }
      return null;
    } catch (error: unknown) {
      console.error('Failed to create group:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to create group' });
      return null;
    }
  },
  
  joinGroup: async (groupId) => {
    try {
      const updatedGroup = await groupsService.joinGroup(groupId);
      if (updatedGroup) {
        set(state => ({
          groups: state.groups.map(group => 
            group.id === groupId ? updatedGroup : group
          )
        }));
        return updatedGroup;
      }
      return null;
    } catch (error: unknown) {
      console.error('Failed to join group:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to join group' });
      return null;
    }
  },
  
  leaveGroup: async (groupId) => {
    try {
      await groupsService.leaveGroup(groupId);
      set(state => ({
        groups: state.groups.filter(group => group.id !== groupId),
        activeGroupId: state.activeGroupId === groupId ? null : state.activeGroupId
      }));
    } catch (error: unknown) {
      console.error('Failed to leave group:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to leave group' });
    }
  },
  
  setActiveGroupId: (groupId) => {
    set({ activeGroupId: groupId });
  },
  
  loadGroupTasks: async (groupId) => {
    try {
      const tasks = await groupsService.getGroupTasks(groupId);
      // Update the specific group with tasks
      set(state => ({
        groups: state.groups.map(group => 
          group.id === groupId ? { ...group, tasks } : group
        )
      }));
    } catch (error: unknown) {
      console.error('Failed to load group tasks:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to load group tasks' });
    }
  },
  
  createGroupTask: async (groupId, taskText) => {
    try {
      await groupsService.createGroupTask(groupId, taskText);
      // Reload tasks after creating
      await get().loadGroupTasks(groupId);
    } catch (error: unknown) {
      console.error('Failed to create task:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to create task' });
    }
  },
  
  updateGroupTask: async (groupId, taskId, taskText, completed) => {
    try {
      await groupsService.updateGroupTask(groupId, taskId, taskText, completed);
      // Reload tasks after updating
      await get().loadGroupTasks(groupId);
    } catch (error: unknown) {
      console.error('Failed to update task:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to update task' });
    }
  },
  
  deleteGroupTask: async (groupId, taskId) => {
    try {
      await groupsService.deleteGroupTask(groupId, taskId);
      // Reload tasks after deleting
      await get().loadGroupTasks(groupId);
    } catch (error: unknown) {
      console.error('Failed to delete task:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to delete task' });
    }
  },
  
  loadGroupMembers: async (groupId) => {
    try {
      const members = await groupsService.getGroupMembers(groupId);
      // Update the specific group with members
      set(state => ({
        groups: state.groups.map(group => 
          group.id === groupId ? { ...group, members } : group
        )
      }));
    } catch (error: unknown) {
      console.error('Failed to load group members:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to load group members' });
    }
  },

  loadGroupFiles: async (groupId) => {
    try {
      const files = await groupsService.getGroupFiles(groupId);
      // Update the specific group with files
      set(state => ({
        groups: state.groups.map(group => 
          group.id === groupId ? { ...group, files } : group
        )
      }));
    } catch (error: unknown) {
      console.error('Failed to load group files:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to load group files' });
    }
  },

}));
