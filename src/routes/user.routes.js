const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getProtectedData,
} = require('../controllers/user.controller');

const auth = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/users/create-admin:
 *   post:
 *     summary: Faqat 1 marta ishlatish uchun superadmin yaratish
 *     description: Telefon raqam va parol avtomatik beriladi
 *     responses:
 *       200:
 *         description: Superadmin yaratildi
 *       400:
 *         description: Admin allaqachon mavjud
 */
router.post('/create-admin', async (req, res) => {
  try {
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
  } catch (err) {
    console.error('❌ CREATE-ADMIN ERROR:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login va JWT token olish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: +998911234567
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token muvaffaqiyatli qaytarildi
 *       401:
 *         description: Login yoki parol xato
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Superadmin tomonidan yangi user ro'yxatdan o'tkaziladi
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ali Valiyev
 *               phone:
 *                 type: string
 *                 example: +998991234567
 *               password:
 *                 type: string
 *                 example: secret123
 *               role:
 *                 type: string
 *                 enum: [user, admin, superadmin]
 *                 example: user
 *     responses:
 *       201:
 *         description: Yangi foydalanuvchi yaratildi
 *       403:
 *         description: Ruxsat yo‘q
 */
router.post('/register', auth, checkRole('superadmin'), registerUser);

/**
 * @swagger
 * /api/users/protected:
 *   get:
 *     summary: Token orqali himoyalangan ma'lumot olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli token orqali ma'lumot olindi
 *       401:
 *         description: Token yo'q yoki noto'g'ri
 */
router.get('/protected', auth, getProtectedData);
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token kerak' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Refresh token noto‘g‘ri yoki eskirgan' });
  }
});

module.exports = router;
