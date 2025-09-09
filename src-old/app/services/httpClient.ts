// HTTP Client Service
import { getAuthToken, removeAuthToken } from './apiConfig';
import { handleApiError, ApiError } from '@/app/utils/apiUtils';
import { useAppStore } from '@/app/store/useAppStore';

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Clear auth token and redirect to login
        removeAuthToken();
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/'; // Redirect to login page
        }
        throw new ApiError('Unauthorized. Please log in again.', 401);
      }
      
      // Try to parse error response
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: `HTTP error! status: ${response.status}` };
      }
      
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.code
      );
    }
    return response.json();
  }

  private getHeaders(contentType: string = 'application/json') {
    const headers: Record<string, string> = {
      'Content-Type': contentType,
    };
    
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async get<T>(url: string): Promise<T> {
    try {
      console.log(`Making GET request to: ${url}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include',
      });
      console.log(`GET response status: ${response.status}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Fetch error in GET request to', url, ':', error);
      throw handleApiError(error);
    }
  }

  async post<T>(url: string, data?: any, isFormData: boolean = false): Promise<T> {
    try {
      console.log(`Making POST request to: ${url}`, data);
      const response = await fetch(url, {
        method: 'POST',
        headers: isFormData ? this.getHeaders('') : this.getHeaders(),
        body: isFormData ? data : JSON.stringify(data),
        credentials: 'include',
      });
      console.log(`POST response status: ${response.status}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Fetch error in POST request to', url, ':', error);
      // If it's a TypeError (network error), provide more context
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Check if it might be a CORS issue or backend not responding
        throw new ApiError(
          'Unable to connect to the server. Please ensure the backend is running and accessible.',
          0
        );
      }
      throw handleApiError(error);
    }
  }

  async put<T>(url: string, data: any): Promise<T> {
    try {
      console.log(`Making PUT request to: ${url}`, data);
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        credentials: 'include',
      });
      console.log(`PUT response status: ${response.status}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Fetch error in PUT request to', url, ':', error);
      // If it's a TypeError (network error), provide more context
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Check if it might be a CORS issue or backend not responding
        throw new ApiError(
          'Unable to connect to the server. Please ensure the backend is running and accessible.',
          0
        );
      }
      throw handleApiError(error);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      console.log(`Making DELETE request to: ${url}`);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(),
        credentials: 'include',
      });
      console.log(`DELETE response status: ${response.status}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Fetch error in DELETE request to', url, ':', error);
      // If it's a TypeError (network error), provide more context
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Check if it might be a CORS issue or backend not responding
        throw new ApiError(
          'Unable to connect to the server. Please ensure the backend is running and accessible.',
          0
        );
      }
      throw handleApiError(error);
    }
  }
}

const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api');

export default httpClient;