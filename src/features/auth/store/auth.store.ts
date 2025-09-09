import { create } from 'zustand';
import { User } from '@/features/user/types/User';
import { LoginCredentials } from '../types/Auth';
import authService from '../services/auth.service';
import userService from '@/features/user/services/user.service';
import { AuthState } from '../types/AuthState'; // Import the interface type
import { jwtDecode } from 'jwt-decode';

// FIX: Pass the AuthState interface directly as the generic type.
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  
  clearError: () => set({ error: null }),

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Attempting login with credentials:', credentials);
      const { user, token } = await authService.login(credentials);
      
      localStorage.setItem('authToken', token);

      console.log('Login successful, user:', user);
      set({ isAuthenticated: true, user, isLoading: false });
    } catch (err: any) {
      console.error('Login failed:', err);
      localStorage.removeItem('authToken');
      set({ error: err.message || 'Login failed', isLoading: false });
      throw err;
    }
  },

  // FIX: Made async to match the interface's () => Promise<void>
  logout: async () => {
    localStorage.removeItem('authToken');
    set({ isAuthenticated: false, user: null, isLoading: false });
  },

  // FIX: Made async to match the interface's () => Promise<void>
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