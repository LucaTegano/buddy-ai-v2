// Notes Service (Simplified)
import apiClient from '@/shared/api/apiClient';
import { NOTES_ENDPOINTS } from '@/features/notes/api/notes.api';
import {
  backendNoteListItemToFrontendNote,
  backendNoteDetailToFrontendNote,
  frontendNoteToBackendNote,
} from '@/features/notes/utils/noteMapper';
import TokenManager from '@/features/auth/utils/tokenManager';
import { handleNoteOperationError } from '@/features/notes/utils/errorHandler';

// A type alias for the functions that make API calls
type ApiRequest<T> = () => Promise<{ data: T }>;

class NotesService {
  /**
   * A generic, private method to handle all authenticated API requests.
   * It centralizes authentication checks, request execution, and error handling.
   *
   * @param operation - A string describing the action for logging (e.g., "fetch all notes").
   * @param requestFn - The function that returns the API client call promise.
   * @param options - Configuration for handling success and auth errors.
   * @returns The processed data or a default value on non-throwing auth errors.
   */
  private async _executeRequest<T, R>(
    operation: string,
    requestFn: ApiRequest<T>,
    options: {
      onSuccess: (data: T) => R;
      onAuthError?: 'throw' | 'returnDefault';
      defaultReturnValue?: R;
    }
  ): Promise<R> {
    const { onAuthError = 'throw', defaultReturnValue = null as any, onSuccess } = options;

    // 1. Centralized Authentication Check
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const isAuthValid = token ? await TokenManager.ensureValidToken() : false;

    if (!isAuthValid) {
      const errorMessage = `Authentication failed for operation: ${operation}.`;
      console.warn(`[NotesService] ${errorMessage}`);
      if (onAuthError === 'throw') {
        throw handleNoteOperationError(new Error('User is not authenticated. Please log in.'), operation);
      }
      return defaultReturnValue;
    }

    // 2. Centralized Request Execution and Error Handling
    try {
      console.log(`[NotesService] Executing: ${operation}`);
      const response = await requestFn();
      return onSuccess(response.data);
    } catch (error: any) {
      // Gracefully handle 401 Unauthorized errors from the API if configured to do so
      if (error.response?.status === 401 && onAuthError === 'returnDefault') {
        console.warn(`[NotesService] Auth error during ${operation}. Returning default.`);
        return defaultReturnValue;
      }
      // For all other errors, use the central error handler to re-throw
      throw handleNoteOperationError(error, operation);
    }
  }

  // --- Public API Methods ---

  async getAllNotes(): Promise<any[]> {
    return this._executeRequest('fetch all notes',
      () => apiClient.get<any[]>(NOTES_ENDPOINTS.GET_ALL),
      {
        onSuccess: (data) => (data || []).map(backendNoteListItemToFrontendNote),
        defaultReturnValue: [],
      }
    );
  }

  async searchNotes(query: string): Promise<any[]> {
    if (!query?.trim()) {
      return [];
    }
    const encodedQuery = encodeURIComponent(query.trim());
    const url = `${NOTES_ENDPOINTS.SEARCH}?query=${encodedQuery}`;

    return this._executeRequest('search notes',
      () => apiClient.get<any[]>(url),
      {
        onSuccess: (data) => (data || []).map(backendNoteListItemToFrontendNote),
        onAuthError: 'returnDefault', // Returns default value on auth error instead of throwing
        defaultReturnValue: [],
      }
    );
  }

  async getNoteById(id: string): Promise<any | null> {
    return this._executeRequest('fetch note by id',
      () => apiClient.get<any>(NOTES_ENDPOINTS.GET_BY_ID(id)),
      {
        onSuccess: (data) => {
          if (!data) {
            console.error(`Note data for id ${id} is empty.`);
            throw new Error('Received empty response from server when fetching note');
          }
          return backendNoteDetailToFrontendNote(data);
        },
      }
    );
  }

  async createNote(note: any): Promise<any | null> {
    const backendNote = frontendNoteToBackendNote(note);
    return this._executeRequest('create note',
      () => apiClient.post<any>(NOTES_ENDPOINTS.CREATE, backendNote),
      {
        onSuccess: (data) => (data ? backendNoteDetailToFrontendNote(data) : null),
      }
    );
  }

  async updateNote(id: string, note: any): Promise<any | null> {
    const backendNote = frontendNoteToBackendNote(note);
    return this._executeRequest('update note',
      () => apiClient.patch<any>(NOTES_ENDPOINTS.UPDATE(id), backendNote),
      {
        onSuccess: (data) => (data ? backendNoteDetailToFrontendNote(data) : null),
      }
    );
  }

  async moveNoteToTrash(id: string): Promise<void> {
    await this._executeRequest('move note to trash',
      () => apiClient.post(NOTES_ENDPOINTS.MOVE_TO_TRASH(id)),
      {
        onSuccess: (data) => data, // Pass through whatever the API returns
      }
    );
  }
}

export default new NotesService();