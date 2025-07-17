const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const InfoUser = require('../models/infoUser.model');
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
  try {
    const { fullname, phone, password, role, position, company, location, birthday_date, email, skype_username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      phone,
      password: hashedPassword,
      role,
      position,
      company,
      location,
      birthday_date,
      email,
      skype_username
    });

    // Создаём infoUser
    await InfoUser.create({
      fullname,
      phone,
      position,
      company,
      location,
      birthday_date,
      email,
      skype_username
    });

    res.status(201).json({ message: 'User yaratildi', user });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik', error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User topilmadi' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Parol noto‘g‘ri' });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

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
    res.status(500).json({ message: 'Server xatosi', error: err });
  }
};

exports.getProtectedData = (req, res) => {
  res.json({ message: `Xush kelibsiz, ${req.user.role}` });
};

exports.getUserAndInfoByFullname = async (req, res) => {
  try {
    const { firstname, lastname } = req.params;
    const fullname = `${firstname} ${lastname}`;
    const user = await User.findOne({ fullname });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден в users' });
    const infoUser = await InfoUser.findOne({ phone: user.phone });
    res.json({ user, infoUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при поиске', error });
  }
};
