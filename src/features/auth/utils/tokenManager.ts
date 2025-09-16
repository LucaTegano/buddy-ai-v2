// ./src/features/auth/utils/tokenManager.ts

import { useAuthStore } from '@/features/auth/store/auth.store';

class TokenManager {
  private static instance: TokenManager;
  // FIX 1: Replaced 'any' with a more specific type. The promise resolves to a boolean.
  private refreshPromise: Promise<boolean> | null = null;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  isValidToken(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch { // <-- FIX 2: Removed unused variable 'e'
      return true;
    }
  }

  async refreshToken(): Promise<boolean> {
    if (this.refreshPromise) {
      try {
        await this.refreshPromise;
        return true;
      } catch { // <-- FIX 3: Removed unused variable 'error'
        return false;
      }
    }

    this.refreshPromise = new Promise(async (resolve, reject) => {
      try {
        await useAuthStore.getState().checkAuth();
        resolve(true);
      } catch (error) {
        await useAuthStore.getState().logout();
        reject(error);
      } finally {
        this.refreshPromise = null;
      }
    });

    try {
      await this.refreshPromise;
      return true;
    } catch { // <-- FIX 4: Removed unused variable 'error'
      return false;
    }
  }

  async ensureValidToken(): Promise<boolean> {
    if (this.isValidToken()) {
      return true;
    }
    return await this.refreshToken();
  }
}

export default TokenManager.getInstance();