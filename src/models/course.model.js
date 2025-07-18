const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: Number, required: true }, // количество месяцев или лет
  duration_type: { type: String, enum: ['month', 'year'], required: true },
  groups_count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema); 