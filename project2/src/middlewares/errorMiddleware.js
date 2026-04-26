// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  // Set default status code and message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Joi Validation Error formatting
  if (err.isJoi) {
    err.statusCode = 400;
    err.message = err.details.map(detail => detail.message).join(', ');
  }

  // Send response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
