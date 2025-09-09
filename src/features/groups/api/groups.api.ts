// Notes API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const GROUPS_ENDPOINTS = {
    BASE: `${API_BASE_URL}/groups`,
    GET_ALL: `${API_BASE_URL}/groups`,
    CREATE: `${API_BASE_URL}/groups`,
    JOIN: (id: string) => `${API_BASE_URL}/groups/${id}/join`,
    LEAVE: (id: string) => `${API_BASE_URL}/groups/${id}/leave`,
    MESSAGES: (id: string) => `${API_BASE_URL}/groups/${id}/messages`,
    TASKS: (id: string) => `${API_BASE_URL}/groups/${id}/tasks`,
    FILES: (id: string) => `${API_BASE_URL}/groups/${id}/files`,
};