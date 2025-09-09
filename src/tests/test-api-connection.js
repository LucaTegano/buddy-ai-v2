// Test API connection with different endpoints
async function testApiConnection() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
  
  console.log('Testing API connection to:', API_BASE_URL);
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Health check status:', healthResponse.status);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health check data:', healthData);
    } else {
      console.log('Health check failed with status:', healthResponse.status);
      const errorText = await healthResponse.text();
      console.log('Health check error response:', errorText);
    }
  } catch (error) {
    console.error('Health check failed with error:', error);
  }
  
  try {
    // Test notes endpoint
    console.log('Testing notes endpoint...');
    const notesResponse = await fetch(`${API_BASE_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Notes endpoint status:', notesResponse.status);
    if (notesResponse.ok) {
      const notesData = await notesResponse.json();
      console.log('Notes response data:', notesData);
    } else {
      const errorText = await notesResponse.text();
      console.log('Notes error response:', errorText);
    }
  } catch (error) {
    console.error('Notes endpoint failed with error:', error);
  }
}

// Run the test
testApiConnection();