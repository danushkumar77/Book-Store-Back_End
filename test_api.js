const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const runTests = async () => {
  try {
    console.log('--- Starting Tests ---');

    // 1. Register User
    const username = `user_${Date.now()}`;
    const password = 'password123';
    console.log(`\n1. Registering user: ${username}`);
    await axios.post(`${API_URL}/auth/register`, { username, password });
    console.log('✅ Registration successful');

    // 2. Login User
    console.log('\n2. Logging in...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, { username, password });
    const token = loginRes.data.token;
    console.log('✅ Login successful. Token received.');

    // 3. Create a Book
    console.log('\n3. Creating a book...');
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      price: 19.99,
      description: 'A book for testing',
      image: 'http://example.com/image.jpg'
    };
    const bookRes = await axios.post(`${API_URL}/books`, bookData);
    const bookId = bookRes.data._id;
    console.log(`✅ Book created. ID: ${bookId}`);

    // 4. Get All Books
    console.log('\n4. Fetching all books...');
    const booksRes = await axios.get(`${API_URL}/books`);
    console.log(`✅ Fetched ${booksRes.data.length} books`);

    // 5. Create Order
    console.log('\n5. Creating an order...');
    const orderData = {
      books: [{ book: bookId, quantity: 2 }],
      totalAmount: 39.98
    };
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const orderRes = await axios.post(`${API_URL}/orders`, orderData, config);
    console.log(`✅ Order created. ID: ${orderRes.data._id}`);

    // 6. Get User Orders
    console.log('\n6. Fetching user orders...');
    const myOrdersRes = await axios.get(`${API_URL}/orders`, config);
    console.log(`✅ Fetched ${myOrdersRes.data.length} orders for user`);

    // 7. Submit a Request Form (stored in DB)
    console.log('\n7. Submitting a request form...');
    const requestData = {
      name: username,
      email: `${username}@example.com`,
      subject: 'Request from test',
      message: 'This is a test request message'
    };
    const requestRes = await axios.post(`${API_URL}/requests`, requestData, config);
    console.log(`✅ Request submitted. ID: ${requestRes.data._id}`);

    // 8. Fetch User Requests
    console.log('\n8. Fetching user requests...');
    const myRequestsRes = await axios.get(`${API_URL}/requests`, config);
    console.log(`✅ Fetched ${myRequestsRes.data.length} requests for user`);

    console.log('\n--- All Tests Passed! ---');

  } catch (error) {
    console.error('\n❌ Test Failed:', error.response ? error.response.data : error.message);
  }
};

runTests();
