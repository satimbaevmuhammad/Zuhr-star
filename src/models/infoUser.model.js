const mongoose = require('mongoose');

const infoUserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  birthday_date: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skype_username: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('InfoUser', infoUserSchema); 