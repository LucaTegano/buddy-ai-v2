
// Chat API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const CHAT_ENDPOINTS = {
    BASE: `${API_BASE_URL}/chat`,
    HISTORY: `${API_BASE_URL}/chat/history`,
    SEND: `${API_BASE_URL}/chat/send`,
    CLEAR: `${API_BASE_URL}/chat/clear`,
};