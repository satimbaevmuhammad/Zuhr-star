const Attendance = require('../models/attendance.model');

exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании посещаемости', error });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении посещаемости', error });
  }
};