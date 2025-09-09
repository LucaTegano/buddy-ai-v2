// Groups Tasks Service
import apiClient from '../api/apiClient';
import { GROUP_TASKS_ENDPOINTS } from '../api/groups-tasks.api';
import { GroupTask } from '../types/Task';

class GroupsTasksService {
  /**
   * Fetches all tasks for a specific group.
   * @param groupId The ID of the group.
   */
  async getAllGroupTasks(groupId: string): Promise<GroupTask[]> {
    const response = await apiClient.get<GroupTask[]>(GROUP_TASKS_ENDPOINTS.GET_ALL_TASKS(groupId));
    return response.data;
  }

  /**
   * NEW: Fetches all tasks for multiple groups in a single API call.
   * @param groupIds An array of group IDs.
   * @returns A promise that resolves to a flat array of all tasks from the specified groups.
   */
  async getTasksForMultipleGroups(groupIds: string[]): Promise<GroupTask[]> {
    // If the array is empty, don't make an API call and return an empty array.
    if (!groupIds || groupIds.length === 0) {
      return Promise.resolve([]);
    }
    const response = await apiClient.get<GroupTask[]>(GROUP_TASKS_ENDPOINTS.GET_TASKS_FOR_MULTIPLE_GROUPS(groupIds));
    return response.data;
  }

  /**
   * Finds a single task by its ID within a group.
   * NOTE: This is inefficient. A dedicated API endpoint like GET /api/groups/{groupId}/tasks/{taskId} would be better.
   * @param taskId The ID of the task to find.
   * @param groupId The ID of the group.
   */
  async getGroupTaskBytaskId(taskId: string, groupId: string): Promise<GroupTask> {
    const tasks = await this.getAllGroupTasks(groupId);
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) {
      throw new Error(`Task with taskId ${taskId} not found in group ${groupId}`);
    }
    return task;
  }

  /**
   * Creates a new task in a group.
   * @param groupId The ID of the group where the task will be created.
   * @param task The task data to create.
   */
  async createGroupTask(groupId: string, task: Partial<GroupTask>): Promise<GroupTask> {
    const response = await apiClient.post<GroupTask>(GROUP_TASKS_ENDPOINTS.CREATE_TASK(groupId), task);
    return response.data;
  }

  /**
   * Updates an existing task in a group.
   * @param taskId The ID of the task to update.
   * @param groupId The ID of the group.
   * @param task The partial task data for the update.
   */
  async updateGroupTask(taskId: string, groupId: string, task: Partial<GroupTask>): Promise<GroupTask> {
    const response = await apiClient.put<GroupTask>(GROUP_TASKS_ENDPOINTS.UPDATE_TASK(taskId, groupId), task);
    return response.data;
  }

  /**
   * Deletes a task from a group.
   * @param taskId The ID of the task to delete.
   * @param groupId The ID of the group.
   */
  async deleteGroupTask(taskId: string, groupId: string): Promise<void> {
    await apiClient.delete(GROUP_TASKS_ENDPOINTS.DELETE_TASK(taskId, groupId));
  }

  /**
   * Toggles the completion status of a task or sets it to a specific state.
   * @param taskId The ID of the task.
   * @param groupId The ID of the group.
   * @param completed Optional. If provided, sets completion to this value. If not, it toggles the current state.
   */
  async toggleGroupTaskCompletion(taskId: string, groupId: string, completed?: boolean): Promise<GroupTask> {
    const currentTask = await this.getGroupTaskBytaskId(taskId, groupId);
    const shouldBeCompleted = completed !== undefined ? completed : !currentTask.completed;

    const endpoint = shouldBeCompleted
      ? GROUP_TASKS_ENDPOINTS.COMPLETE_TASK(taskId, groupId)
      : GROUP_TASKS_ENDPOINTS.UNCOMPLETE_TASK(taskId, groupId);
      
    const response = await apiClient.put<GroupTask>(endpoint);
    return response.data;
  }
}

export default new GroupsTasksService();