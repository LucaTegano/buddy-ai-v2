 // API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const PERSONAL_TASKS_ENDPOINTS = {
    GET_ALL_TASKS: `${API_BASE_URL}/personal-tasks`,
    CREATE_TASK: `${API_BASE_URL}/personal-tasks`,
    UPDATE_TASK: (id: string) => `${API_BASE_URL}/personal-tasks/${id}`,
    DELETE_TASK: (id: string) => `${API_BASE_URL}/personal-tasks/${id}`,
    COMPLETE_TASK: (id: string) => `${API_BASE_URL}/personal-tasks/${id}/complete`,
    UNCOMPLETE_TASK: (id: string) => `${API_BASE_URL}/personal-tasks/${id}/uncomplete`,
};
