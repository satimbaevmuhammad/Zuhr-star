const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createAttendance, getAttendance } = require('../controllers/attendance.controller');

router.post('/', auth, createAttendance)
router.get('/', auth, getAttendance);

module.exports = router;
