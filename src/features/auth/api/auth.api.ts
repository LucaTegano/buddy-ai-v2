// Auth API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  VERIFY: `${API_BASE_URL}/auth/verify`,
  RESEND_VERIFICATION: `${API_BASE_URL}/auth/resend`,
};
