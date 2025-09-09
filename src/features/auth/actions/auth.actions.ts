// Auth Actions
import { useAuthStore } from '@/features/auth/store/auth.store';

export const authActions = {
  login: async (email: string, password: string) => {
    try {
      await useAuthStore.getState().login(email, password);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      await useAuthStore.getState().signup(name, email, password);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    useAuthStore.getState().logout();
  },

  checkAuthStatus: async () => {
    await useAuthStore.getState().checkAuthStatus();
  },
};