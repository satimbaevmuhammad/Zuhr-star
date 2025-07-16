const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getProtectedData,
} = require('../controllers/user.controller');

const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole');

// Faqat 1 marta ishlatish uchun ADMIN yaratish
router.post('/create-admin', async (req, res) => {
  const bcrypt = require('bcrypt');
  const User = require('../models/user.model');

  const existing = await User.findOne({ phone: '+998911234567' });
  if (existing) return res.status(400).json({ message: 'Admin allaqachon mavjud' });

  const hashedPassword = await bcrypt.hash('123456', 10);

  const admin = await User.create({
    name: 'Super Admin',
    phone: '+998911234567',
    password: hashedPassword,
    role: 'superadmin',
  });

  res.json({ message: 'Superadmin yaratildi', admin });
});

// Login
router.post('/login', loginUser);

// Faqat superadmin boshqa user qo‘shadi
router.post('/register', auth, checkRole('superadmin'), registerUser);

// Himoyalangan route
router.get('/protected', auth, getProtectedData);

module.exports = router;
