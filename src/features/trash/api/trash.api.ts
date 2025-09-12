// Trash API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const TRASH_ENDPOINTS = {
    BASE: `${API_BASE_URL}/trash`,
    GET_ALL: `${API_BASE_URL}/trash`,
    MOVE: (id: number) => `${API_BASE_URL}/trash/move/${id}`,
    RESTORE: (id: number) => `${API_BASE_URL}/trash/restore/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/trash/${id}`,
    EMPTY: `${API_BASE_URL}/trash`,
};