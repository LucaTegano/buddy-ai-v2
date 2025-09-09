// Token validation and refresh utilities
import apiClient from '@/shared/api/apiClient';
import { useAuthStore } from '@/features/auth/store/auth.store';

class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<any> | null = null;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  /**
   * Validate if the current token is still valid
   */
  isValidToken(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    // Check if token is expired (if JWT)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (e) {
      // If we can't parse it as JWT, assume it's valid
      return true;
    }
  }

  /**
   * Refresh the authentication token
   */
  async refreshToken(): Promise<boolean> {
    // If we're already refreshing, return the existing promise
    if (this.refreshPromise) {
      try {
        await this.refreshPromise;
        return true;
      } catch (error) {
        return false;
      }
    }

    // Create a new refresh promise
    this.refreshPromise = new Promise(async (resolve, reject) => {
      try {
        // Try to refresh the token using the checkAuth endpoint
        await useAuthStore.getState().checkAuth();
        resolve(true);
      } catch (error) {
        // If refresh fails, logout the user
        await useAuthStore.getState().logout();
        reject(error);
      } finally {
        // Clear the refresh promise
        this.refreshPromise = null;
      }
    });

    try {
      await this.refreshPromise;
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Ensure we have a valid token before making a request
   */
  async ensureValidToken(): Promise<boolean> {
    if (this.isValidToken()) {
      return true;
    }
    
    // Try to refresh the token
    return await this.refreshToken();
  }
}

export default TokenManager.getInstance();