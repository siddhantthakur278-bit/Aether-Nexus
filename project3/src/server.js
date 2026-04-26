require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3001; // Default to 3001 to avoid conflict with Project 2
const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB)
  .then(() => console.log('Project 3: DB connection successful!'))
  .catch(err => console.error('Project 3: DB connection error:', err));

app.listen(PORT, () => {
  console.log(`Project 3 running on port ${PORT}`);
});
