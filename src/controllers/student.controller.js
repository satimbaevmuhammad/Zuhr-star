const Student = require('../models/student.model');

// Создать студента
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании студента', error });
  }
};

// Получить всех студентов
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении студентов', error });
  }
};

// Получить одного студента по ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.id });
    if (!student) return res.status(404).json({ message: 'Студент не найден' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении студента', error });
  }
};

// Обновить студента по ID
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { student_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ message: 'Студент не найден' });
    res.json({ message: 'Студент обновлён', student });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении', error });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ student_id: req.params.id });
    if (!student) return res.status(404).json({ message: 'Студент не найден' });
    res.json({ message: 'Студент удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении', error });
  }
};
