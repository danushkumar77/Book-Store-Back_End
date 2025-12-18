const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  // Contact form fields
  name: { type: String, required: false },
  email: { type: String, required: false },
  subject: { type: String, required: false },
  message: { type: String, required: false },
  // Book request fields
  title: { type: String, required: false },
  author: { type: String, required: false },
  genre: { type: String, required: false },
  publicationYear: { type: Number, required: false },
  requestType: { type: String, enum: ['contact', 'book'], default: 'contact' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
