const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
    trim: true
  },
  description: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Reference to the User model from Project 2
    required: [true, 'A project must belong to a user']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
