// Test signup request
async function testSignup() {
  console.log('Testing signup request...');
  
  try {
    const response = await fetch('http://localhost:8080/api/auth/sign-up', {
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
    } else {
      const errorText = await response.text();
      console.log('Signup error response:', errorText);
    }
    
    console.log('Signup test completed.');
  } catch (error) {
    console.error('Signup test failed:', error);
  }
}

// Run the test
testSignup();