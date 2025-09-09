// Test signup and login requests
const BASE_URL = 'http://localhost:8080/api/auth';

async function testSignup() {
  console.log('Testing signup request...');
  
  try {
    const response = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com', // Use unique email each time
        password: 'password123'
      })
    });
    
    console.log('Signup request status:', response.status);
    console.log('Access-Control-Allow-Origin:', response.headers.get('Access-Control-Allow-Origin'));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Signup response:', data);
      return data.token || data.success; // Return success status
    } else {
      const errorText = await response.text();
      console.log('Signup error response:', errorText);
      return null;
    }
  } catch (error) {
    console.error('Signup test failed:', error);
    return null;
  }
}

async function testLogin() {
  console.log('Testing login request...');
  
  try {
    const response = await fetch(`${BASE_URL}/login`, {
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
    
    console.log('Login request status:', response.status);
    console.log('Access-Control-Allow-Origin:', response.headers.get('Access-Control-Allow-Origin'));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Login response:', data);
      return data.token; // Return the JWT token
    } else {
      const errorText = await response.text();
      console.log('Login error response:', errorText);
      return null;
    }
  } catch (error) {
    console.error('Login test failed:', error);
    return null;
  }
}

async function testAuthFlow() {
  console.log('Starting authentication flow test...\n');
  
  // Test signup
  const signupSuccess = await testSignup();
  console.log('');
  
  // Wait a moment before testing login
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Test login
  const loginToken = await testLogin();
  console.log('');
  
  if (signupSuccess || loginToken) {
    console.log('Authentication flow test completed successfully!');
  } else {
    console.log('Authentication flow test failed!');
  }
}

// Run the tests
testAuthFlow();