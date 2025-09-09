  // Inbox API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const INBOX_ENDPOINTS = {
    BASE: `${API_BASE_URL}/inbox`,
    GET_ALL: `${API_BASE_URL}/inbox`,
    UNREAD: `${API_BASE_URL}/inbox/unread`,
    MARK_READ: (id: string) => `${API_BASE_URL}/inbox/${id}/read`,
    DELETE: (id: string) => `${API_BASE_URL}/inbox/${id}`,
};