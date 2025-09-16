import { AxiosError } from 'axios';
import apiClient from '@/shared/api/apiClient';
import { NOTES_ENDPOINTS } from '@/features/notes/api/notes.api';
import TokenManager from '@/features/auth/utils/tokenManager';
import { handleNoteOperationError } from '@/features/notes/utils/errorHandler';
import { RecentNotesResult } from '@/features/notes/types/RecentNotes';

class RecentNotesService {
  private checkAuthStatus(): boolean {
    // Check if we have an auth token
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    console.log('Checking auth status - Token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.error('No authentication token found. User may not be logged in.');
      return false;
    }
    
    return true;
  }

  /**
   * Get recent notes categorized by time periods from the backend
   * Returns only the first 3 most recent notes for each category
   * Notes from the previous 7 days are prioritized (won't appear in previous 30 days)
   */
  async getRecentNotes(): Promise<RecentNotesResult> {
    console.log('Fetching recent notes');
    
    // Check authentication before proceeding
    if (!this.checkAuthStatus()) {
      throw handleNoteOperationError(
        new Error('User is not authenticated. Please log in first.'),
        'fetch recent notes'
      );
    }
    
    // Ensure we have a valid token
    const isValid = await TokenManager.ensureValidToken();
    if (!isValid) {
      throw handleNoteOperationError(
        new Error('Authentication token is invalid or expired.'),
        'fetch recent notes'
      );
    }
    
    try {
      console.log('Making request to:', NOTES_ENDPOINTS.GET_RECENT);
      const response = await apiClient.get<RecentNotesResult>(NOTES_ENDPOINTS.GET_RECENT);
      console.log('Received recent notes response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent notes:', error);
      if (error instanceof AxiosError) {
        console.error('Error response:', error.response);
        console.error('Error request:', error.request);
      }
      throw handleNoteOperationError(error as Error, 'fetch recent notes');
    }
  }
}

const recentNotesService = new RecentNotesService();
export default recentNotesService;