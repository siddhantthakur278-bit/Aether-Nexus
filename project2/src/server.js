require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
