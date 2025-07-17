const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  group_id: { type: Number, required: true },
  student_id: { type: Number, required: true },
  status: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
