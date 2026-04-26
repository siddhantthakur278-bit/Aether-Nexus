const rateLimit = require('express-rate-limit');

// Prevent API abuse with Rate Limiting
const rateLimiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per `window`
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again in an hour!'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = rateLimiter;
