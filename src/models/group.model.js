const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group_id: { type: Number, required: true, unique: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
