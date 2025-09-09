// Error handling utilities for note operations
export class NoteOperationError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'NoteOperationError';
  }
}

export const handleNoteOperationError = (error: any, operation: string): NoteOperationError => {
  console.error(`Error during note ${operation}:`, error);
  
  // Extract meaningful error message
  let errorMessage = `Failed to ${operation} note`;
  let errorCode = 'UNKNOWN_ERROR';
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 401:
        errorMessage = 'Authentication required. Please log in again.';
        errorCode = 'UNAUTHORIZED';
        break;
      case 403:
        errorMessage = 'Access denied. You may not have permission to perform this action.';
        errorCode = 'FORBIDDEN';
        break;
      case 404:
        errorMessage = 'Note not found.';
        errorCode = 'NOT_FOUND';
        break;
      case 422:
        errorMessage = 'Invalid note data provided.';
        errorCode = 'VALIDATION_ERROR';
        break;
      case 500:
        errorMessage = 'Server error. Please try again later.';
        errorCode = 'SERVER_ERROR';
        break;
      default:
        errorMessage = data?.message || data?.error || `Server error (${status})`;
        errorCode = `HTTP_${status}`;
    }
  } else if (error.request) {
    // Request was made but no response received
    errorMessage = 'Network error. Please check your connection and try again.';
    errorCode = 'NETWORK_ERROR';
  } else {
    // Something else happened
    errorMessage = error.message || 'An unexpected error occurred.';
    errorCode = 'CLIENT_ERROR';
  }
  
  return new NoteOperationError(errorMessage, errorCode, error);
};