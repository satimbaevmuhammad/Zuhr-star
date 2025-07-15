const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // oddiy test uchun hardcoded user
  if (email === 'test@example.com' && password === '123456') {
    const token = jwt.sign({ id: 1, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({ token });
  }

  res.status(401).json({ message: 'Login yoki parol xato' });
};

const getProtectedData = (req, res) => {
  res.json({ message: `Xush kelibsiz, foydalanuvchi ID: ${req.user.id}` });
};

module.exports = { loginUser, getProtectedData };
