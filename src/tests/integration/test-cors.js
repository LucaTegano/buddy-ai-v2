// Test CORS configuration
async function testCors() {
  console.log('Testing CORS configuration...');
  
  try {
    // Test preflight request
    const preflightResponse = await fetch('http://localhost:8080/api/auth/login', {
      method: 'OPTIONS',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
        'Origin': 'http://localhost:3000'
      }
    });
    
    console.log('Preflight request status:', preflightResponse.status);
    console.log('Access-Control-Allow-Origin:', preflightResponse.headers.get('Access-Control-Allow-Origin'));
    console.log('Access-Control-Allow-Methods:', preflightResponse.headers.get('Access-Control-Allow-Methods'));
    console.log('Access-Control-Allow-Headers:', preflightResponse.headers.get('Access-Control-Allow-Headers'));
    
    // Test actual request (this will fail with 400 since we're not sending proper data)
    try {
      const actualResponse = await fetch('http://localhost:8080/api/auth/signin', {
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
      
      console.log('Actual request status:', actualResponse.status);
      console.log('Access-Control-Allow-Origin:', actualResponse.headers.get('Access-Control-Allow-Origin'));
    } catch (error) {
      console.log('Actual request failed (expected):', error.message);
    }
    
    console.log('CORS test completed.');
  } catch (error) {
    console.error('CORS test failed:', error);
  }
}

// Run the test
testCors();