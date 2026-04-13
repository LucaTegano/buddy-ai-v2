import { Group } from './Group';

export interface GroupsState {
  groups: Group[];
  activeGroupId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadGroups: () => Promise<void>;
  createGroup: (group: Partial<Group>) => Promise<Group | null>;
  joinGroup: (groupId: string) => Promise<Group | null>;
  leaveGroup: (groupId: string) => Promise<void>;
  setActiveGroupId: (groupId: string | null) => void;
  
  // Group-specific actions
  loadGroupTasks: (groupId: string) => Promise<void>;
  createGroupTask: (groupId: string, taskText: string) => Promise<void>;
  updateGroupTask: (groupId: string, taskId: string, taskText: string, completed: boolean) => Promise<void>;
  deleteGroupTask: (groupId: string, taskId: string) => Promise<void>;
  loadGroupMembers: (groupId: string) => Promise<void>;
  loadGroupFiles: (groupId: string) => Promise<void>;
}