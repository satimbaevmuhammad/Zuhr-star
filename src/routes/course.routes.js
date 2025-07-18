const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const {
  createCourse,
  getCourses,
  getCourseByName,
  updateCourseByName,
  deleteCourseByName
} = require('../controllers/course.controller');

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
 *         groups_count:
 *           type: number
 *           example: 2
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

/**
 * @swagger
 * /api/courses/{name}:
 *   get:
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить курс по имени
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя курса
 *     responses:
 *       200:
 *         description: Курс
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Курс не найден
 */

/**
 * @swagger
 * /api/courses/{name}:
 *   put:
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     summary: Обновить курс по имени
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя курса
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Курс обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Курс не найден
 */

/**
 * @swagger
 * /api/courses/{name}:
 *   delete:
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     summary: Удалить курс по имени
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя курса
 *     responses:
 *       200:
 *         description: Курс удалён
 *       404:
 *         description: Курс не найден
 */

router.post('/', auth, createCourse);
router.get('/', auth, getCourses);
router.get('/:name', auth, getCourseByName);
router.put('/:name', auth, updateCourseByName);
router.delete('/:name', auth, deleteCourseByName);

module.exports = router; 