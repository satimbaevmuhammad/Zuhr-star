// src/routes/user.routes.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Foydalanuvchi ID
 *         username:
 *           type: string
 *           description: Foydalanuvchi nomi
 *         email:
 *           type: string
 *           description: Email manzil
 */

/**
 * @swagger
 * /api/users/create-admin:
 *   post:
 *     summary: Yangi admin yaratish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Admin muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server xatosi
 */
router.post('/create-admin', (req, res) => {
  // Admin yaratish logikasi
  res.json({ message: 'Admin created successfully' });
});

module.exports = router;