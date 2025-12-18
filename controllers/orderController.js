const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { books, totalAmount, fullName, email, phone, address, city, zipCode } = req.body;
    
    // Validate required fields
    if (!books || !totalAmount || !fullName || !email || !phone || !address || !city || !zipCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newOrder = new Order({
      user: req.user ? req.user.id : undefined,
      fullName,
      email,
      phone,
      address,
      city,
      zipCode,
      books,
      totalAmount
    });
    
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', data: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get logged-in user's orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
