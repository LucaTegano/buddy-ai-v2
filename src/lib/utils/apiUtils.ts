// API Utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any): ApiError => {
  // Handle network errors (when fetch fails completely)
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return new ApiError(
      'Unable to connect to the server. Please ensure the backend is running and accessible.',
      0
    );
  }
  
  if (error instanceof ApiError) {
    return error;
  }
  
  // Handle different HTTP status codes from successful fetch responses
  if (error.status) {
    switch (error.status) {
      case 401:
        return new ApiError(
          'Invalid email or password. Please try again.',
          401
        );
      case 403:
        return new ApiError(
          'Access forbidden. Please ensure you have permission to access this resource.',
          403
        );
      case 404:
        return new ApiError(
          'No account found with this email. Please sign up.',
          404
        );
      case 409:
        return new ApiError(
          'An account with this email already exists. Please sign in.',
          409
        );
      case 400:
        return new ApiError(
          'Invalid data. Please check your information and try again.',
          400
        );
      default:
        return new ApiError(
          error.message || `An unexpected error occurred (status: ${error.status})`,
          error.status
        );
    }
  }
  
  // Something else happened
  return new ApiError(
    error.message || 'An unexpected error occurred',
    500
  );
};

export const isApiError = (error: any): error is ApiError => {
  return error instanceof ApiError;
};