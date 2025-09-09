// Test backend connectivity and CORS
async function testBackend() {
  console.log('Testing backend connectivity and CORS...');
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
  
  try {
    // Test health endpoint
    console.log(`Testing health endpoint: ${API_BASE_URL}/health`);
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
    }
    
    // Test CORS with auth endpoint
    console.log(`Testing auth endpoint: ${API_BASE_URL}/auth/signin`);
    const authResponse = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    console.log('Auth endpoint status:', authResponse.status);
    console.log('Access-Control-Allow-Origin:', authResponse.headers.get('Access-Control-Allow-Origin'));
    
    if (authResponse.ok) {
      const authData = await authResponse.json();
      console.log('Auth response data:', authData);
    } else {
      const errorText = await authResponse.text();
      console.log('Auth error response:', errorText);
    }
    
    console.log('Backend test completed.');
  } catch (error) {
    console.error('Backend test failed:', error);
  }
}

// Run the test
testBackend();