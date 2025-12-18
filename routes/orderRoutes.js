const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Create order (login optional)
router.post('/', orderController.createOrder);

// Get logged-in user's orders
router.get('/', authMiddleware, orderController.getOrders);

module.exports = router;
