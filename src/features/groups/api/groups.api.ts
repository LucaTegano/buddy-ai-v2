// Groups API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const GROUPS_ENDPOINTS = {
    BASE: `${API_BASE_URL}/groups`,
    GET_ALL: `${API_BASE_URL}/groups`,
    CREATE: `${API_BASE_URL}/groups`,
    JOIN: (id: string) => `${API_BASE_URL}/groups/${id}/join`,
    LEAVE: (id: string) => `${API_BASE_URL}/groups/${id}/leave`,
    TASKS: (id: string) => `${API_BASE_URL}/groups/${id}/tasks`,
    MEMBERS: (id: string) => `${API_BASE_URL}/groups/${id}/members`,
    FILES: (id: string) => `${API_BASE_URL}/groups/${id}/notes`,
};