import axios from 'axios';
import Cookies from 'js-cookie';

// These utility functions would typically live in an 'auth' or 'storage' utility file.
// For simplicity, we'll define them here.

/**
 * Retrieves the JWT from cookies.
 * @returns {string | null} The JWT token or null if not found.
 */
const getJwtToken = () => {
  const token = typeof window !== 'undefined' ? Cookies.get('authToken') : null;
  if (!token && typeof window !== 'undefined') {
    console.warn('getJwtToken: authToken cookie is missing. All cookies:', document.cookie);
  }
  return token;
};

// --- Create the Axios Instance ---

const apiClient = axios.create({
  // Make sure this is pointing to your API server during development
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  
  // Send cookies with cross-origin requests (important for CSRF, session-based auth)
  withCredentials: true, 
  
  headers: {
    'Content-Type': 'application/json',
  },
});


// --- Axios Interceptors ---

apiClient.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log(`[API Request] Token attached (length: ${token.length})`);
    } else {
      console.warn(`[API Request] No token found in cookies for ${config.url}`);
    }
    
    // Log headers (excluding sensitive data if needed, but here we want to see them)
    console.log('[API Request] Headers:', config.headers);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Handle global errors, like 401 Unauthorized
apiClient.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
      // Any status codes that falls outside the range of 2xx cause this function to trigger
    (error) => {
      console.error('API Error:', error.response?.status, error.response?.config?.url, error.message);
      
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
  
      // Check if the error is a 401 Unauthorized response
      if (error.response && error.response.status === 401 && !isAuthEndpoint) {
        // This is where you would typically handle token expiration.
        // We'll log the error but avoid automatic logout for now, per user request.
        console.warn("Unauthorized request. The token may be expired or invalid, but we're not logging you out yet.");
      }
      
      // Return the error so that the component making the call can also handle it
      return Promise.reject(error);
    }
);

export default apiClient;