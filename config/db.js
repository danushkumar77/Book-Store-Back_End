const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use 127.0.0.1 instead of localhost to avoid IPv6 issues
    // Removed deprecated options (useNewUrlParser, useUnifiedTopology) for Mongoose 7+
    await mongoose.connect('mongodb://127.0.0.1:27017/bookstore');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
