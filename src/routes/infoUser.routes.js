const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const {
  createInfoUser,
  getAllInfoUsers,
  getInfoUserByFullname,
  updateInfoUserByFullname,
  deleteInfoUserByFullname
} = require('../controllers/infoUser.controller');

/**
 * @swagger
 * tags:
 *   name: infoUsers
 *   description: Управление расширенной информацией о пользователях
 */

/**
 * @swagger
 * /api/info-users:
 *   post:
 *     tags: [infoUsers]
 *     security:
 *       - bearerAuth: []
 *     summary: Создать нового infoUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Behruz Satimbaev
 *               position:
 *                 type: string
 *                 example: Developer
 *               company:
 *                 type: string
 *                 example: MyCompany
 *               location:
 *                 type: string
 *                 example: Moscow
 *               birthday_date:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               phone:
 *                 type: string
 *                 example: +79991234567
 *               skype_username:
 *                 type: string
 *                 example: my.skype
 *     responses:
 *       201:
 *         description: Информация о пользователе создана
 */
router.post('/', auth, createInfoUser);

/**
 * @swagger
 * /api/info-users:
 *   get:
 *     tags: [infoUsers]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить всех infoUsers
 *     responses:
 *       200:
 *         description: Список infoUsers
 */
router.get('/', auth, getAllInfoUsers);

/**
 * @swagger
 * /api/info-users/{firstname}/{lastname}:
 *   get:
 *     tags: [infoUsers]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить infoUser по fullname (имя и фамилия)
 *     parameters:
 *       - in: path
 *         name: firstname
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя пользователя
 *       - in: path
 *         name: lastname
 *         required: true
 *         schema:
 *           type: string
 *         description: Фамилия пользователя
 *     responses:
 *       200:
 *         description: Информация о пользователе
 *       404:
 *         description: Пользователь не найден
 */
router.get('/:firstname/:lastname', auth, getInfoUserByFullname);

/**
 * @swagger
 * /api/info-users/{firstname}/{lastname}:
 *   put:
 *     tags: [infoUsers]
 *     security:
 *       - bearerAuth: []
 *     summary: Обновить infoUser по fullname (имя и фамилия)
 *     parameters:
 *       - in: path
 *         name: firstname
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя пользователя
 *       - in: path
 *         name: lastname
 *         required: true
 *         schema:
 *           type: string
 *         description: Фамилия пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               position:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               birthday_date:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               skype_username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Информация обновлена
 *       404:
 *         description: Пользователь не найден
 */
router.put('/:firstname/:lastname', auth, updateInfoUserByFullname);

/**
 * @swagger
 * /api/info-users/{firstname}/{lastname}:
 *   delete:
 *     tags: [infoUsers]
 *     security:
 *       - bearerAuth: []
 *     summary: Удалить infoUser по fullname (имя и фамилия)
 *     parameters:
 *       - in: path
 *         name: firstname
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя пользователя
 *       - in: path
 *         name: lastname
 *         required: true
 *         schema:
 *           type: string
 *         description: Фамилия пользователя
 *     responses:
 *       200:
 *         description: Пользователь удалён
 *       404:
 *         description: Пользователь не найден
 */
router.delete('/:firstname/:lastname', auth, deleteInfoUserByFullname);

module.exports = router; 