// Projects Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';
import { Project } from '@/app/models/types';

class ProjectsService {
  async getAllProjects(): Promise<Project[]> {
    return await httpClient.get<Project[]>(API_ENDPOINTS.PROJECTS.GET_ALL);
  }

  async getProjectById(id: string): Promise<Project> {
    // This would be a custom endpoint to get a single project
    const projects = await this.getAllProjects();
    return projects.find(project => project.id === id) || projects[0];
  }

  async createProject(project: Partial<Project>): Promise<Project> {
    return await httpClient.post<Project>(API_ENDPOINTS.PROJECTS.CREATE, project);
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    return await httpClient.put<Project>(API_ENDPOINTS.PROJECTS.UPDATE(id), project);
  }

  async deleteProject(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.PROJECTS.DELETE(id));
  }
}

export default new ProjectsService();