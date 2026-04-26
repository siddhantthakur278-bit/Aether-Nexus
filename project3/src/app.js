const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// 1. Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 2. Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Project 3 (Task Engine) is healthy' });
});

// 3. API Routes (To be added)
// app.use('/api/v1/projects', projectRoutes);

// 4. Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
