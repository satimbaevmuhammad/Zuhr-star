const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Superadmin user qo‘shadi
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User yaratildi', user });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User topilmadi' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Parol noto‘g‘ri' });

    // Access token (короткий срок)
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Refresh token (долгий срок)
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      accessToken,
      refreshToken,
      user: {
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// Himoyalangan ma'lumot
exports.getProtectedData = (req, res) => {
  res.json({ message: `Xush kelibsiz, ${req.user.role}` });
};
