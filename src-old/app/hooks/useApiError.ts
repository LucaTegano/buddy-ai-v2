// Custom hook for handling API errors
import { useState, useCallback } from 'react';
import { isApiError } from '@/app/utils/apiUtils';

export const useApiError = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = useCallback(async <T,>(apiCall: Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall;
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      
      if (isApiError(err)) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, loading, handleApiCall, clearError };
};