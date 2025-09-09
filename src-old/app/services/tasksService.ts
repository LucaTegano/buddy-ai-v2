// Tasks Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { PersonalTask } from '@/app/models/types';

class TasksService {
  async getAllTasks(): Promise<PersonalTask[]> {
    return await httpClient.get<PersonalTask[]>(API_ENDPOINTS.TASKS.GET_ALL);
  }

  async createTask(task: Partial<PersonalTask>): Promise<PersonalTask> {
    return await httpClient.post<PersonalTask>(API_ENDPOINTS.TASKS.CREATE, task);
  }

  async updateTask(id: string, task: Partial<PersonalTask>): Promise<PersonalTask> {
    return await httpClient.put<PersonalTask>(API_ENDPOINTS.TASKS.UPDATE(id), task);
  }

  async deleteTask(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.TASKS.DELETE(id));
  }

  async toggleTaskCompletion(id: string, completed: boolean): Promise<PersonalTask> {
    const task = await this.getTaskById(id);
    return await this.updateTask(id, { ...task, completed });
  }

  async getTaskById(id: string): Promise<PersonalTask> {
    const tasks = await this.getAllTasks();
    return tasks.find(task => task.id === id) || tasks[0];
  }
}

export default new TasksService();