const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('Register request body:', { username, email, password });

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required' });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user (In a real app, hash password here)
    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log('User registered successfully:', newUser);

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: newUser._id, username: newUser.username, email: newUser.email } 
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Login request body:', { username, password });

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Simple password check (In a real app, compare hashes)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in successfully:', user.username);

    // Generate Token
    const token = jwt.sign({ id: user._id }, 'secretKey123', { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
