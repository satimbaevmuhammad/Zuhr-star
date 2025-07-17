const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function generateStudentId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = 'STU_';
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    unique: true,
    default: generateStudentId
  },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  student_phone: { type: String, required: true, unique: true },
  parents_phone: { type: String, required: true, unique: true },
  birth_date: { type: Date, required: true },
  gender: { type: String, enum: ['Erkak', 'Ayol'], required: true },
  note: { type: String },
  group_attached: { type: Boolean, default: false },
  password: { type: String, required: true },
  balance: { type: String, default: "300000" },
  coinbalance: { type: String, default: "0" },
  groups: {
    type: [String], // group_id
    default: []
  },
  teachers: {
    type: [String], // phone учителей
    default: []
  }
}, { timestamps: true });

// Хеширование пароля
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

studentSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
