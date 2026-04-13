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

// Define a type for common error shapes
type CommonError = {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message: string;
  status?: number;
  code?: string;
};

export const handleApiError = (error: unknown): ApiError => {
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
  
  // Type assertion for common error shapes
  const err = error as CommonError;
  
  // Handle different HTTP status codes from successful fetch responses
  const status = err.response?.status || err.status || 500;
  
  switch (status) {
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
        err.response?.data?.message || err.response?.data?.error || err.message || `An unexpected error occurred (status: ${status})`,
        status
      );
  }
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};