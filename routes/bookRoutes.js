const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
// const authMiddleware = require('../middleware/authMiddleware'); // Uncomment to protect routes

// Public routes (or add authMiddleware to protect)
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
