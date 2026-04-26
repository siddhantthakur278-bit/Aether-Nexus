const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A label must have a name'],
    unique: true,
    trim: true
  },
  color: {
    type: String,
    default: '#A5956F' // Mocha Mousse default
  }
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;
