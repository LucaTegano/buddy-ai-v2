// Auth Actions
import { useAuthStore } from '@/features/auth/store/auth.store';

export const authActions = {
  login: async (email: string, password: string) => {
    try {
      await useAuthStore.getState().login({ username: email, password });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      // --- FIX IS HERE ---
      // The signup method now accepts a single object with username, email, and password.
      await useAuthStore.getState().signup({ username: name, email, password });
      // --- END OF FIX ---
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    useAuthStore.getState().logout();
  },

  checkAuthStatus: async () => {
    // --- FIX IS HERE ---
    // The method was renamed from 'checkAuthStatus' to 'checkAuth' in the store.
    await useAuthStore.getState().checkAuth();
    // --- END OF FIX ---
  },
};