// Notes Service
import apiClient from '@/shared/api/apiClient';
import { NOTES_ENDPOINTS } from '@/features/notes/api/notes.api';
import { backendNoteListItemToFrontendNote, backendNoteDetailToFrontendNote, frontendNoteToBackendNote } from '@/features/notes/utils/noteMapper';
import TokenManager from '@/features/auth/utils/tokenManager';
import { handleNoteOperationError } from '@/features/notes/utils/errorHandler';

class NotesService {
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
  
  async getAllNotes(): Promise<any[]> {
    console.log('Fetching all notes');
    
    // Check authentication before proceeding
    if (!this.checkAuthStatus()) {
      throw handleNoteOperationError(
        new Error('User is not authenticated. Please log in first.'),
        'fetch all notes'
      );
    }
    
    // Ensure we have a valid token
    const isValid = await TokenManager.ensureValidToken();
    if (!isValid) {
      throw handleNoteOperationError(
        new Error('Authentication token is invalid or expired.'),
        'fetch all notes'
      );
    }
    
    try {
      console.log('Making request to:', NOTES_ENDPOINTS.GET_ALL);
      const response = await apiClient.get<any[]>(NOTES_ENDPOINTS.GET_ALL);
      console.log('Received notes response:', response.data);
      return response.data.map(backendNoteListItemToFrontendNote);
    } catch (error: any) {
      console.error('Error fetching notes:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      throw handleNoteOperationError(error, 'fetch all notes');
    }
  }

  async getNoteById(id: string): Promise<any> {
    console.log(`Fetching note by ID: ${id}`);
    
    // Check authentication before proceeding
    if (!this.checkAuthStatus()) {
      throw handleNoteOperationError(
        new Error('User is not authenticated. Please log in first.'),
        'fetch'
      );
    }
    
    // Ensure we have a valid token
    const isValid = await TokenManager.ensureValidToken();
    if (!isValid) {
      throw handleNoteOperationError(
        new Error('Authentication token is invalid or expired.'),
        'fetch'
      );
    }
    
    try {
      console.log('Making request to:', NOTES_ENDPOINTS.UPDATE(id));
      const response = await apiClient.get<any>(NOTES_ENDPOINTS.UPDATE(id));
      console.log('Received note response:', response.data);
      
      // Check if response data exists before mapping
      if (!response.data) {
        console.error(`Get note by ID response data is undefined or null for note ${id}`);
        throw new Error('Received empty response from server when fetching note');
      }
      
      const mappedNote = backendNoteDetailToFrontendNote(response.data);
      if (!mappedNote) {
        console.error('Failed to map backend note to frontend note');
        throw new Error('Failed to process note data from server');
      }
      
      return mappedNote;
    } catch (error: any) {
      console.error(`Error fetching note ${id}:`, error);
      throw handleNoteOperationError(error, 'fetch');
    }
  }

  async createNote(note: any): Promise<any> {
    console.log('Creating note with data:', note);
    
    // Check authentication before proceeding
    if (!this.checkAuthStatus()) {
      throw handleNoteOperationError(
        new Error('User is not authenticated. Please log in first.'),
        'create'
      );
    }
    
    // Ensure we have a valid token
    const isValid = await TokenManager.ensureValidToken();
    if (!isValid) {
      throw handleNoteOperationError(
        new Error('Authentication token is invalid or expired.'),
        'create'
      );
    }
    
    const backendNote = frontendNoteToBackendNote(note);
    console.log('Sending backend note data:', backendNote);
    try {
      console.log('Using endpoint:', NOTES_ENDPOINTS.CREATE);
      console.log('API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
      
      // Log the actual request being made
      console.log('Making POST request to:', NOTES_ENDPOINTS.CREATE);
      
      // Log cookies and headers before making request
      console.log('Document cookies:', document.cookie);
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
      console.log('CSRF Token from cookie:', csrfToken);
      
      const response = await apiClient.post<any>(NOTES_ENDPOINTS.CREATE, backendNote);
      console.log('Received create note response:', response.data);
      return backendNoteDetailToFrontendNote(response.data);
    } catch (error: any) {
      console.error('Error creating note:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      console.error('Error config:', error.config);
      throw handleNoteOperationError(error, 'create');
    }
  }

  async updateNote(id: string, note: any): Promise<void> {
    console.log(`Updating note ${id} with data:`, note);
    
    // Check authentication before proceeding
    if (!this.checkAuthStatus()) {
      throw handleNoteOperationError(
        new Error('User is not authenticated. Please log in first.'),
        'update'
      );
    }
    
    // Ensure we have a valid token
    const isValid = await TokenManager.ensureValidToken();
    if (!isValid) {
      throw handleNoteOperationError(
        new Error('Authentication token is invalid or expired.'),
        'update'
      );
    }
    
    const backendNote = frontendNoteToBackendNote(note);
    console.log(`Sending backend note data for note ${id}:`, backendNote);
    try {
      console.log('Making PATCH request to:', NOTES_ENDPOINTS.UPDATE(id));
      await apiClient.patch<any>(NOTES_ENDPOINTS.UPDATE(id), backendNote);
    } catch (error: any) {
      console.error(`Error updating note ${id}:`, error);
      throw handleNoteOperationError(error, 'update');
    }
  }

  async deleteNote(id: string): Promise<void> {
    console.log(`Deleting note ${id}`);
    
    // Check authentication before proceeding
    if (!this.checkAuthStatus()) {
      throw handleNoteOperationError(
        new Error('User is not authenticated. Please log in first.'),
        'delete'
      );
    }
    
    // Ensure we have a valid token
    const isValid = await TokenManager.ensureValidToken();
    if (!isValid) {
      throw handleNoteOperationError(
        new Error('Authentication token is invalid or expired.'),
        'delete'
      );
    }
    
    try {
      console.log('Making DELETE request to:', NOTES_ENDPOINTS.DELETE(id));
      await apiClient.delete(NOTES_ENDPOINTS.DELETE(id));
    } catch (error: any) {
      console.error(`Error deleting note ${id}:`, error);
      throw handleNoteOperationError(error, 'delete');
    }
  }

  async moveNoteToTrash(id: string): Promise<any> {
    console.log(`Moving note ${id} to trash`);
    
    // Check authentication before proceeding
    if (!this.checkAuthStatus()) {
      throw handleNoteOperationError(
        new Error('User is not authenticated. Please log in first.'),
        'move to trash'
      );
    }
    
    // Ensure we have a valid token
    const isValid = await TokenManager.ensureValidToken();
    if (!isValid) {
      throw handleNoteOperationError(
        new Error('Authentication token is invalid or expired.'),
        'move to trash'
      );
    }
    
    try {
      console.log('Making POST request to:', NOTES_ENDPOINTS.MOVE_TO_TRASH(id));
      return await apiClient.post(NOTES_ENDPOINTS.MOVE_TO_TRASH(id));
    } catch (error: any) {
      console.error(`Error moving note ${id} to trash:`, error);
      throw handleNoteOperationError(error, 'move to trash');
    }
  }
}

export default new NotesService();