  // Projects API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const PROJECTS_ENDPOINTS = {
    GET_ALL: `${API_BASE_URL}/projects`,
    CREATE: `${API_BASE_URL}/projects`,
    GET_BY_ID: (id:string) => `${API_BASE_URL}/projects/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/projects/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/projects/${id}`,
};