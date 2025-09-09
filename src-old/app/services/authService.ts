// Auth Service
import httpClient from './httpClient';
import { API_ENDPOINTS, setAuthToken, removeAuthToken } from './apiConfig';
import { User } from '@/app/models/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  tokenType: string;
  token: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  picture: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('Attempting to login with credentials:', credentials);
      const response = await httpClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN, credentials);
      console.log('Login response:', response);
      // Check if response has success=true and token
      if (response.success && response.token) {
        setAuthToken(response.token);
        return response;
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login error in authService:', error);
      throw error;
    }
  }

  async signup(userData: SignUpRequest): Promise<any> {
    try {
      console.log('Attempting to signup with data:', userData);
      const response = await httpClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
      console.log('Signup response:', response);
      // Return the full response so the calling function can check for success
      return response;
    } catch (error) {
      console.error('Signup error in authService:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    removeAuthToken();
  }

  async getCurrentUser(): Promise<User | null> {
    // Only return user data if we have a token
    const token = localStorage.getItem('authToken');
    console.log('Getting current user, token exists:', !!token);
    if (!token) {
      return null;
    }
    
    try {
      // Call the user endpoint to get current user details
      const response = await httpClient.get<UserResponse>(API_ENDPOINTS.USER.ME);
      console.log('User response:', response);
      return {
        id: response.id.toString(), // Convert number to string
        name: response.name,
        email: response.email,
        picture: response.picture,
      };
    } catch (error) {
      console.error('Failed to get current user:', error);
      // If we can't get user data, remove the token
      removeAuthToken();
      return null;
    }
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    console.log('Checking if authenticated, token exists:', !!token);
    return !!token;
  }
}

export default new AuthService();