// ./src/features/auth/store/auth.store.ts

import { create } from 'zustand';
// import { User } from '@/features/user/types/User'; // <-- FIX 1: Removed unused import
import { LoginCredentials, SignupCredentials } from '../types/Auth';
import authService from '../services/auth.service';
import userService from '@/features/user/services/user.service';
import { AuthState } from '../types/AuthState';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  
  clearError: () => set({ error: null }),

  signup: async (credentials: SignupCredentials) => {
    set({ isLoading: true, error: null });
    try {
      await authService.signup(credentials);
      set({ isLoading: false });
    } catch (err: unknown) { // <-- FIX 2: 'any' changed to 'unknown'
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('authToken', token);
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (err: unknown) { // <-- FIX 3: 'any' changed to 'unknown'
      localStorage.removeItem('authToken');
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    set({ isAuthenticated: false, user: null, isLoading: false });
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken: { exp: number } = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          const user = await userService.getSelf();
          set({ isAuthenticated: true, user });
        } else {
          localStorage.removeItem('authToken');
          set({ isAuthenticated: false, user: null });
        }
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));