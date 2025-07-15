const express = require('express');
const router = express.Router();
const { loginUser, getProtectedData } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 */
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login and get token
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/protected:
 *   get:
 *     summary: Protected route
 */
router.get('/protected', authMiddleware, getProtectedData);

module.exports = router;
