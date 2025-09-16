// Groups Service
import apiClient from '@/shared/api/apiClient';
import { GROUPS_ENDPOINTS } from '@/features/groups/api/groups.api';
import TokenManager from '@/features/auth/utils/tokenManager';
import { Group, GroupMember } from '@/features/groups/types/Group';
import { GroupTask } from '@/shared/types/Task';
import axios from 'axios';
import { Note } from '@/features/notes/types/Note';

class GroupsService {
  /**
   * Check if the user is authenticated
   */
  private async isAuthenticated(): Promise<boolean> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!token) return false;
    
    try {
      // Verify token is still valid
      const isValid = await TokenManager.ensureValidToken();
      return isValid;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  // --- Public API Methods ---

  async getAllGroups(): Promise<Group[]> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      console.log('Fetching groups from:', GROUPS_ENDPOINTS.GET_ALL);
      const response = await apiClient.get<Group[]>(GROUPS_ENDPOINTS.GET_ALL);
      console.log('Groups response:', response.status, response.data);
      return response.data || [];
    } catch (error: unknown) {
      console.error('Error fetching groups:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async getGroupById(id: string): Promise<Group | null> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.get<Group>(`${GROUPS_ENDPOINTS.BASE}/${id}`);
      return response.data || null;
    } catch (error: unknown) {
      console.error('Error fetching group:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async createGroup(group: Partial<Group>): Promise<Group | null> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.post<Group>(GROUPS_ENDPOINTS.CREATE, { name: group.name });
      return response.data || null;
    } catch (error: unknown) {
      console.error('Error creating group:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async joinGroup(id: string): Promise<Group | null> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.post<Group>(GROUPS_ENDPOINTS.JOIN(id));
      return response.data || null;
    } catch (error: unknown) {
      console.error('Error joining group:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async leaveGroup(id: string): Promise<void> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      await apiClient.post<void>(GROUPS_ENDPOINTS.LEAVE(id));
    } catch (error: unknown) {
      console.error('Error leaving group:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async getGroupTasks(groupId: string): Promise<GroupTask[]> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.get<GroupTask[]>(GROUPS_ENDPOINTS.TASKS(groupId));
      return response.data || [];
    } catch (error: unknown) {
      console.error('Error fetching group tasks:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async createGroupTask(groupId: string, taskText: string): Promise<GroupTask | null> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.post<GroupTask>(GROUPS_ENDPOINTS.TASKS(groupId), { text: taskText });
      return response.data || null;
    } catch (error: unknown) {
      console.error('Error creating group task:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async updateGroupTask(groupId: string, taskId: string, taskText: string, completed: boolean): Promise<GroupTask | null> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.put<GroupTask>(`${GROUPS_ENDPOINTS.TASKS(groupId)}/${taskId}`, { text: taskText, completed });
      return response.data || null;
    } catch (error: unknown) {
      console.error('Error updating group task:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async deleteGroupTask(groupId: string, taskId: string): Promise<void> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      await apiClient.delete(`${GROUPS_ENDPOINTS.TASKS(groupId)}/${taskId}`);
    } catch (error: unknown) {
      console.error('Error deleting group task:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }

  async getGroupMembers(groupId: string): Promise<GroupMember[]> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.get<GroupMember[]>(GROUPS_ENDPOINTS.MEMBERS(groupId));
      return response.data || [];
    } catch (error: unknown) {
      console.error('Error fetching group members:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }
  
  async getGroupFiles(groupId: string): Promise<Note[]> {
    if (!(await this.isAuthenticated())) {
      throw new Error('User is not authenticated');
    }
    
    try {
      const response = await apiClient.get<Note[]>(GROUPS_ENDPOINTS.FILES(groupId));
      return response.data || [];
    } catch (error: unknown) {
      console.error('Error fetching group files:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  }
}

const groupsService = new GroupsService();
export default groupsService;
