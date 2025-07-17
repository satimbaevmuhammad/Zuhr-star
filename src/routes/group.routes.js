const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createGroup, getGroups } = require('../controllers/group.controller');

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Управление группами
 */

/**
 * @swagger
 * /api/groups:
 *   post:
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     summary: Создать новую группу
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Группа 1"
 *               group_id:
 *                 type: number
 *                 example: 12345
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *     responses:
 *       201:
 *         description: Группа создана
 */
router.post('/', auth, createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить все группы
 *     responses:
 *       200:
 *         description: Список групп
 */
router.get('/', auth, getGroups);  

module.exports = router;
