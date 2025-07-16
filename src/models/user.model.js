const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Mentor', 'HeadMentor', 'SupportTeacher', 'admin', 'superadmin'],
    default: 'Mentor',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
