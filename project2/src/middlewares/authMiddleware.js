/**
 * Simple Basic Authentication middleware
 * Checks if authorization header has "Bearer token123"
 */
exports.protect = (req, res, next) => {
  // 1. Get token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please provide authentication token.'
    });
  }

  // 2. Verification token (Hardcoded for simplicity of basic auth)
  // In a real app, verify JWT or check session DB
  if (token !== 'secret-token-123') {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token. Authorization failed.'
    });
  }

  // Next middleware
  next();
};

/**
 * Authorization middleware for specific roles
 * Checks if user role is included in allowed roles
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user would be populated by protect middleware in a real app
    // For this mock, we'll assume the user role is passed in headers or fixed
    const userRole = req.headers['x-user-role'] || 'user';

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }

    next();
  };
};
