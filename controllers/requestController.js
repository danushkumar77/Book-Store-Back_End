const Request = require('../models/Request');

// Create a new request (form submission or book request)
exports.createRequest = async (req, res) => {
  try {
    const { name, email, subject, message, title, author, genre, publicationYear, requestType } = req.body;
    
    // Validate based on request type
    if (requestType === 'book') {
      if (!title) {
        return res.status(400).json({ message: 'Book title is required' });
      }
    } else {
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    }

    const newReq = new Request({
      user: req.user ? req.user.id : undefined,
      name,
      email,
      subject,
      message,
      title,
      author,
      genre,
      publicationYear,
      requestType: requestType || 'contact'
    });

    await newReq.save();
    res.status(201).json({ message: 'Request saved successfully', data: newReq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get requests for logged-in user
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
