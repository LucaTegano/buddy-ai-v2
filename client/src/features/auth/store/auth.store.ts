// ./src/features/auth/store/auth.store.ts

import { create } from 'zustand';
import Cookies from 'js-cookie';
import { LoginCredentials, SignupCredentials } from '../types/Auth';
import authService from '../services/auth.service';
import userService from '@/features/user/services/user.service';
import { AuthState } from '../types/AuthState';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'authToken';

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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      // The backend returns { token: string, expiresIn: number }
      // We need to handle both the old and new response formats
      const token = response.token;
      
      // Set the token in a cookie so it's accessible by the server during SSR
      Cookies.set(TOKEN_KEY, token, { 
        expires: 7, 
        path: '/',
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax' 
      });

      // Fetch the full user profile after login
      const user = await userService.getSelf();
      
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (err: unknown) {
      Cookies.remove(TOKEN_KEY, { path: '/' });
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    Cookies.remove(TOKEN_KEY, { path: '/' });
    set({ isAuthenticated: false, user: null, isLoading: false });
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = Cookies.get(TOKEN_KEY);
      if (token) {
        const decodedToken: { exp: number } = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          const user = await userService.getSelf();
          set({ isAuthenticated: true, user });
        } else {
          Cookies.remove(TOKEN_KEY);
          set({ isAuthenticated: false, user: null });
        }
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      Cookies.remove(TOKEN_KEY);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));