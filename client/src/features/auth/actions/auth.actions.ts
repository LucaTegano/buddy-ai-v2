// ./src/features/auth/actions/auth.actions.ts

import { useAuthStore } from '@/features/auth/store/auth.store';

export const authActions = {
  login: async (email: string, password: string) => {
    try {
      await useAuthStore.getState().login({ username: email, password });
      return { success: true };
    } catch (error: unknown) { // <-- FIX 1: 'any' changed to 'unknown'
      // Type-safe error handling
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'An unknown error occurred' };
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      await useAuthStore.getState().signup({ username: name, email, password });
      return { success: true };
    } catch (error: unknown) { // <-- FIX 2: 'any' changed to 'unknown'
      // Type-safe error handling
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'An unknown error occurred' };
    }
  },

  logout: () => {
    useAuthStore.getState().logout();
  },

  checkAuthStatus: async () => {
    await useAuthStore.getState().checkAuth();
  },
};