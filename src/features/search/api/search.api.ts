 // API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const SEARCH_ENDPOINTS = {
    NOTES: (query: string) => `${API_BASE_URL}/search/notes?query=${query}`,
    //TASKS: (query: string) => `${API_BASE_URL}/search/tasks?query=${query}`,
};
