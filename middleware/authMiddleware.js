const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Remove "Bearer " if present
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(actualToken, 'secretKey123'); // Use env var in real app
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
