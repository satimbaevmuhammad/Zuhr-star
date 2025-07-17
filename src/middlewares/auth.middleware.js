const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.headers['x-refresh-token'] || req.body?.refreshToken;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token kerak' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError' && refreshToken) {
      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign(
          { id: decodedRefresh.id, role: decodedRefresh.role },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );
        res.setHeader('x-access-token', newAccessToken);
        req.user = { id: decodedRefresh.id, role: decodedRefresh.role };
        return next();
      } catch (refreshErr) {
        return res.status(401).json({ message: 'Refresh token noto‘g‘ri yoki eskirgan' });
      }
    }
    return res.status(401).json({ message: 'Token noto‘g‘ri yoki eskirgan' });
  }
};

module.exports = authMiddleware;