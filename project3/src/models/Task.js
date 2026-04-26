const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A task must have a title'],
    trim: true,
    minlength: [5, 'Task title must be at least 5 characters']
  },
  status: {
    type: String,
    required: [true, 'A task must have a status'],
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'A task must belong to a project']
  },
  labels: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Label'
  }],
  dueDate: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
