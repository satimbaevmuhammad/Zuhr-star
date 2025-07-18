const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createGroup, getGroups, updateGroup, getGroupByName, updateGroupByName, deleteGroupByName } = require('../controllers/group.controller');

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Управление группами
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - course
 *         - teacher_phone
 *         - branch
 *         - days
 *       properties:
 *         name:
 *           type: string
 *           example: "Группа 1"
 *         course:
 *           type: string
 *           example: "Математика"
 *         teacher_phone:
 *           type: string
 *           example: "+998901234567"
 *         branch:
 *           type: string
 *           example: "Центральный филиал"
 *         days:
 *           type: object
 *           properties:
 *             odd_days:
 *               type: boolean
 *               example: true
 *             even_days:
 *               type: boolean
 *               example: false
 *             every_days:
 *               type: boolean
 *               example: false
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           description: Массив ObjectId студентов
 *           example: []
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
 *             required:
 *               - name
 *               - course
 *               - teacher_fullname
 *               - branch
 *               - days
 *               - start_time
 *               - end_time
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Группа 1"
 *               course:
 *                 type: string
 *                 example: "Front-end"
 *               teacher_fullname:
 *                 type: string
 *                 example: "Behruz Satimbaev"
 *               branch:
 *                 type: string
 *                 example: "Центральный филиал"
 *               days:
 *                 type: object
 *                 properties:
 *                   odd_days:
 *                     type: boolean
 *                     example: true
 *                   even_days:
 *                     type: boolean
 *                     example: false
 *                   every_days:
 *                     type: boolean
 *                     example: false
 *               start_time:
 *                 type: string
 *                 example: "15:00"
 *               end_time:
 *                 type: string
 *                 example: "17:00"
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Массив ObjectId студентов
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get('/', auth, getGroups);

/**
 * @swagger
 * /api/groups/{name}:
 *   get:
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить группу по имени
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя группы
 *     responses:
 *       200:
 *         description: Группа
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Группа не найдена
 */
router.get('/:name', auth, getGroupByName);

/**
 * @swagger
 * /api/groups/{name}:
 *   put:
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     summary: Обновить группу по имени
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя группы
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - course
 *               - teacher_fullname
 *               - branch
 *               - days
 *               - start_time
 *               - end_time
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Группа 1"
 *               course:
 *                 type: string
 *                 example: "Front-end"
 *               teacher_fullname:
 *                 type: string
 *                 example: "Behruz Satimbaev"
 *               branch:
 *                 type: string
 *                 example: "Центральный филиал"
 *               days:
 *                 type: object
 *                 properties:
 *                   odd_days:
 *                     type: boolean
 *                     example: true
 *                   even_days:
 *                     type: boolean
 *                     example: false
 *                   every_days:
 *                     type: boolean
 *                     example: false
 *               start_time:
 *                 type: string
 *                 example: "15:00"
 *               end_time:
 *                 type: string
 *                 example: "17:00"
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Массив ObjectId студентов
 *                 example: []
 *     responses:
 *       200:
 *         description: Группа обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Группа не найдена
 */
router.put('/:name', auth, updateGroupByName);

/**
 * @swagger
 * /api/groups/{name}:
 *   delete:
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     summary: Удалить группу по имени
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя группы
 *     responses:
 *       200:
 *         description: Группа удалена
 *       404:
 *         description: Группа не найдена
 */
router.delete('/:name', auth, deleteGroupByName);

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - duration
 *         - duration_type
 *       properties:
 *         name:
 *           type: string
 *           example: "Front-end"
 *         price:
 *           type: string
 *           example: "500000"
 *         duration:
 *           type: number
 *           example: 6
 *         duration_type:
 *           type: string
 *           enum: [month, year]
 *           example: month
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     summary: Создать новый курс
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Курс создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить все курсы
 *     responses:
 *       200:
 *         description: Список курсов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */

module.exports = router;
