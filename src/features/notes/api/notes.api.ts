// Notes API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
console.log('API Base URL:', API_BASE_URL);

export const NOTES_ENDPOINTS = {
  BASE: `${API_BASE_URL}/note`,
  GET_ALL: `${API_BASE_URL}/note`,
  GET_BY_ID: (id: string) => `${API_BASE_URL}/note/${id}`,
  CREATE: `${API_BASE_URL}/note`,
  UPDATE: (id: string) => `${API_BASE_URL}/note/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/note/${id}`,
  MOVE_TO_TRASH: (id: string) => `${API_BASE_URL}/trash/move/${id}`,
};