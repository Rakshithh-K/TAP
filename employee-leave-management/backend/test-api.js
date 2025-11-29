const axios = require('axios');

const testAPI = async () => {
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const health = await axios.get('http://localhost:5001/health');
    console.log('Health:', health.data);

    // Test login as manager
    console.log('\nTesting manager login...');
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'manager@test.com',
      password: 'password123'
    });
    console.log('Login successful:', loginResponse.data.user);

    const token = loginResponse.data.token;

    // Test get all requests
    console.log('\nTesting get all requests...');
    const requestsResponse = await axios.get('http://localhost:5001/api/leaves/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('All requests:', requestsResponse.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

testAPI();