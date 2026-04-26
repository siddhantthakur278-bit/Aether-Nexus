const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Middlewares
const { errorHandler } = require('./middlewares/errorMiddleware');
const rateLimiter = require('./middlewares/rateLimitMiddleware');

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

// 1. Global Middlewares
app.use(helmet()); // Security headers (prevents XSS, etc.)
app.use(cors()); // CORS handling
app.use(express.json()); // Request body parsing for JSON
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Request logging

// Apply rate limiting to all API requests
app.use('/api', rateLimiter);

// 2. API Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 3. API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stats', statsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// 4. Global Error Handling Middleware
app.use(errorHandler);

module.exports = app;
