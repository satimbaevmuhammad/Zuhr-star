const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group_id: { type: Number, unique: true, default: function() { return Math.floor(Date.now() * Math.random()); } },
  course: { type: String, required: true },
  teacher_phone: { type: String, required: true },
  branch: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  end_date: { type: Date },
  status: { type: String, enum: ['active', 'freeze', 'not_active'], default: 'active' },
  days: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true, 
    default: {
      "odd_days": true,
      "even_days": false,
      "every_days": false
    }
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
