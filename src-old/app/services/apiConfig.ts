// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    SIGNIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/sign-up`,
  },
  
  // User
  USER: {
    ME: `${API_BASE_URL}/users/me`,
  },
  
  // Notes
  NOTES: {
    BASE: `${API_BASE_URL}/notes`,
    GET_ALL: `${API_BASE_URL}/notes`,
    CREATE: `${API_BASE_URL}/notes`,
    UPDATE: (id: string) => `${API_BASE_URL}/notes/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/notes/${id}`,
  },
  
  // Groups
  GROUPS: {
    BASE: `${API_BASE_URL}/groups`,
    GET_ALL: `${API_BASE_URL}/groups`,
    CREATE: `${API_BASE_URL}/groups`,
    JOIN: (id: string) => `${API_BASE_URL}/groups/${id}/join`,
    LEAVE: (id: string) => `${API_BASE_URL}/groups/${id}/leave`,
    MESSAGES: (id: string) => `${API_BASE_URL}/groups/${id}/messages`,
    TASKS: (id: string) => `${API_BASE_URL}/groups/${id}/tasks`,
    FILES: (id: string) => `${API_BASE_URL}/groups/${id}/files`,
  },
  
  // Tasks
  TASKS: {
    BASE: `${API_BASE_URL}/tasks`,
    GET_ALL: `${API_BASE_URL}/tasks`,
    CREATE: `${API_BASE_URL}/tasks`,
    UPDATE: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/tasks/${id}`,
  },
  
  // Settings
  SETTINGS: {
    BASE: `${API_BASE_URL}/settings`,
    GET: `${API_BASE_URL}/settings`,
    UPDATE: `${API_BASE_URL}/settings`,
  },
  
  // Search
  SEARCH: {
    NOTES: (query: string) => `${API_BASE_URL}/search/notes?query=${query}`,
  },
  
  // Trash
  TRASH: {
    BASE: `${API_BASE_URL}/trash`,
    GET_ALL: `${API_BASE_URL}/trash`,
    MOVE: (id: string) => `${API_BASE_URL}/trash/move/${id}`,
    RESTORE: (id: string) => `${API_BASE_URL}/trash/restore/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/trash/${id}`,
    EMPTY: `${API_BASE_URL}/trash`,
  },
  
  // Inbox
  INBOX: {
    BASE: `${API_BASE_URL}/inbox`,
    GET_ALL: `${API_BASE_URL}/inbox`,
    UNREAD: `${API_BASE_URL}/inbox/unread`,
    MARK_READ: (id: string) => `${API_BASE_URL}/inbox/${id}/read`,
    DELETE: (id: string) => `${API_BASE_URL}/inbox/${id}`,
  },
  
  // Chat
  CHAT: {
    BASE: `${API_BASE_URL}/chat`,
    HISTORY: `${API_BASE_URL}/chat/history`,
    SEND: `${API_BASE_URL}/chat/send`,
    CLEAR: `${API_BASE_URL}/chat/clear`,
  },
  
  // Projects
  PROJECTS: {
    BASE: `${API_BASE_URL}/projects`,
    GET_ALL: `${API_BASE_URL}/projects`,
    CREATE: `${API_BASE_URL}/projects`,
    UPDATE: (id: string) => `${API_BASE_URL}/projects/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/projects/${id}`,
  },
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    console.log('Setting auth token:', token);
    localStorage.setItem('authToken', token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    console.log('Removing auth token');
    localStorage.removeItem('authToken');
  }
};