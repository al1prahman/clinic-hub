const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');

/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'Access denied. No token provided.', null, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    return error(res, 'Invalid or expired token.', null, 401);
  }
};

/**
 * Authorization Middleware
 * Checks if user has the required role
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, 'Access denied. Not authenticated.', null, 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(res, 'Access denied. Insufficient permissions.', null, 403);
    }

    next();
  };
};

module.exports = { authenticate, authorize };
