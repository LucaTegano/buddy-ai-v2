// Tasks Service
import apiClient from '../api/apiClient';
import { PERSONAL_TASKS_ENDPOINTS } from '../api/personal-tasks.api';
import { PersonalTask } from '../types/Task';

class TasksPersonalService {
  async getAllPersonalTasks(): Promise<PersonalTask[]> {
    console.log('Fetching personal tasks...');
    const response =  await apiClient.get<PersonalTask[]>(PERSONAL_TASKS_ENDPOINTS.GET_ALL_TASKS);
    console.log('Personal tasks response:', response);
    return response.data;
  }

  async getPersonalTaskById(id: string): Promise<PersonalTask> {
    const tasks = await this.getAllPersonalTasks();
    return tasks.find(task => task.id === id) || tasks[0];
  }

  async createPersonalTask(task: Partial<PersonalTask>): Promise<PersonalTask> {
    const response = await apiClient.post<PersonalTask>(PERSONAL_TASKS_ENDPOINTS.CREATE_TASK, task);
    return response.data;
  }

  async updatePersonalTask(id: string, task: Partial<PersonalTask>): Promise<PersonalTask> {
    const response = await apiClient.put<PersonalTask>(PERSONAL_TASKS_ENDPOINTS.UPDATE_TASK(id), task);
    return response.data;
  }

  async deletePersonalTask(id: string): Promise<void> {
    const response = await apiClient.delete(PERSONAL_TASKS_ENDPOINTS.DELETE_TASK(id));
    return response.data;
  }

  async togglePersonalTaskCompletion(id: string, completed?: boolean): Promise<PersonalTask> {
    const task = await this.getPersonalTaskById(id);
    return await this.updatePersonalTask(id, { ...task, completed: completed !== undefined ? completed : !task.completed });
  }

}


export default new TasksPersonalService();