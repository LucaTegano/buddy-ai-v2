// Health check utility to verify API connectivity
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export const isBackendAvailable = async (): Promise<boolean> => {
  // In a real app, you would check the actual backend
  // For now, we'll check if we can reach the health endpoint
  return await checkApiHealth();
};