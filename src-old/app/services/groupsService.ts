// Groups Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { Group, GroupMessage, GroupTask, GroupFile } from '@/app/models/types';

class GroupsService {
  async getAllGroups(): Promise<Group[]> {
    return await httpClient.get<Group[]>(API_ENDPOINTS.GROUPS.GET_ALL);
  }

  async getGroupById(id: string): Promise<Group> {
    // This would be a custom endpoint to get a single group with all details
    const groups = await this.getAllGroups();
    return groups.find(group => group.id === id) || groups[0];
  }

  async createGroup(group: Partial<Group>): Promise<Group> {
    return await httpClient.post<Group>(API_ENDPOINTS.GROUPS.CREATE, group);
  }

  async joinGroup(id: string): Promise<Group> {
    return await httpClient.post<Group>(API_ENDPOINTS.GROUPS.JOIN(id));
  }

  async leaveGroup(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.GROUPS.LEAVE(id));
  }

  async getGroupMessages(groupId: string): Promise<GroupMessage[]> {
    return await httpClient.get<GroupMessage[]>(API_ENDPOINTS.GROUPS.MESSAGES(groupId));
  }

  async postGroupMessage(groupId: string, message: Partial<GroupMessage>): Promise<GroupMessage> {
    return await httpClient.post<GroupMessage>(API_ENDPOINTS.GROUPS.MESSAGES(groupId), message);
  }

  async getGroupTasks(groupId: string): Promise<GroupTask[]> {
    return await httpClient.get<GroupTask[]>(API_ENDPOINTS.GROUPS.TASKS(groupId));
  }

  async createGroupTask(groupId: string, task: Partial<GroupTask>): Promise<GroupTask> {
    return await httpClient.post<GroupTask>(API_ENDPOINTS.GROUPS.TASKS(groupId), task);
  }

  async updateGroupTask(groupId: string, taskId: string, task: Partial<GroupTask>): Promise<GroupTask> {
    return await httpClient.put<GroupTask>(API_ENDPOINTS.GROUPS.TASKS(groupId) + `/${taskId}`, task);
  }

  async deleteGroupTask(groupId: string, taskId: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.GROUPS.TASKS(groupId) + `/${taskId}`);
  }

  async getGroupFiles(groupId: string): Promise<GroupFile[]> {
    return await httpClient.get<GroupFile[]>(API_ENDPOINTS.GROUPS.FILES(groupId));
  }

  async uploadGroupFile(groupId: string, file: File): Promise<GroupFile> {
    const formData = new FormData();
    formData.append('file', file);
    return await httpClient.post<GroupFile>(API_ENDPOINTS.GROUPS.FILES(groupId), formData, true);
  }
}

export default new GroupsService();