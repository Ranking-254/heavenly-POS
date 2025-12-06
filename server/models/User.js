const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'cashier'], // Only these two roles allowed
    default: 'cashier'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);