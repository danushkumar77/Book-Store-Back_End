const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

// Create request (can be contact form or book request - login optional)
router.post('/', requestController.createRequest);

// Get logged-in user's requests
router.get('/', authMiddleware, requestController.getMyRequests);

module.exports = router;
