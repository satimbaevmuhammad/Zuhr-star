const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/student.controller');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Управление студентами
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - student_phone
 *         - parents_phone
 *         - birth_date
 *         - gender
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Ali
 *         surname:
 *           type: string
 *           example: Valiyev
 *         student_phone:
 *           type: string
 *           example: "+998901234567"
 *         parents_phone:
 *           type: string
 *           example: "+998901112233"
 *         birth_date:
 *           type: string
 *           format: date
 *           example: "2000-01-01"
 *         gender:
 *           type: string
 *           enum: [Erkak, Ayol]
 *           example: Erkak
 *         note:
 *           type: string
 *           example: "Отличник"
 *         group_attached:
 *           type: boolean
 *           example: true
 *         password:
 *           type: string
 *           example: "secret123"
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     summary: Создать нового студента
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Студент создан
 */
router.post('/', auth, createStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить всех студентов
 *     responses:
 *       200:
 *         description: Список студентов
 */
router.get('/', auth, getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     summary: Получить студента по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID студента
 *     responses:
 *       200:
 *         description: Данные студента
 *       404:
 *         description: Студент не найден
 */
router.get('/:id', auth, getStudentById);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     summary: Обновить студента по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID студента
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Студент обновлён
 *       404:
 *         description: Студент не найден
 */
router.put('/:id', auth, updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     summary: Удалить студента по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID студента
 *     responses:
 *       200:
 *         description: Студент удалён
 *       404:
 *         description: Студент не найден
 */
router.delete('/:id', auth, deleteStudent);

module.exports = router;
