const express = require('express');
const router = express.Router();
const { loginUser, getProtectedData } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login and get token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: JWT token qaytariladi
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xush kelibsiz
 */
router.get('/protected', authMiddleware, getProtectedData);

module.exports = router;
