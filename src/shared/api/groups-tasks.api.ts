const API_GROUP_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/groups';

export const GROUP_TASKS_ENDPOINTS = {
    // Endpoints for a single group
    GET_ALL_TASKS: (groupId: string) => `${API_GROUP_BASE_URL}/${groupId}/tasks`,
    CREATE_TASK: (groupId: string) => `${API_GROUP_BASE_URL}/${groupId}/tasks`,
    UPDATE_TASK: (taskId: string, groupId: string) => `${API_GROUP_BASE_URL}/${groupId}/tasks/${taskId}`,
    DELETE_TASK: (taskId: string, groupId: string) => `${API_GROUP_BASE_URL}/${groupId}/tasks/${taskId}`,
    COMPLETE_TASK: (taskId: string, groupId: string) => `${API_GROUP_BASE_URL}/${groupId}/tasks/${taskId}/complete`,
    UNCOMPLETE_TASK: (taskId: string, groupId: string) => `${API_GROUP_BASE_URL}/${groupId}/tasks/${taskId}/uncomplete`,
    GET_TASKS_FOR_MULTIPLE_GROUPS: (groupIds: string[]) => `${API_GROUP_BASE_URL}/tasks?groupIds=${groupIds.join(',')}`,
};