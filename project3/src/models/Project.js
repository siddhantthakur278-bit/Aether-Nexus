const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
    unique: true,
    trim: true,
    minlength: [3, 'Project name must be at least 3 characters']
  },
  description: {
    type: String,
    required: [true, 'A project must have a description']
  },
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
