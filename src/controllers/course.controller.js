const Course = require('../models/course.model');

exports.createCourse = async (req, res) => {
  try {
    const { groups_count, ...rest } = req.body;
    const course = await Course.create(rest);
    // Пересчитываем groups_count сразу после создания
    const count = await require('../models/group.model').countDocuments({ course: course.name });
    course.groups_count = count;
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании курса', error });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    // Пересчитываем groups_count для каждого курса
    for (const course of courses) {
      const count = await require('../models/group.model').countDocuments({ course: course.name });
      if (course.groups_count !== count) {
        course.groups_count = count;
        await course.save();
      }
    }
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении курсов', error });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Курс не найден' });
    // Пересчитываем groups_count для этого курса
    const count = await require('../models/group.model').countDocuments({ course: course.name });
    if (course.groups_count !== count) {
      course.groups_count = count;
      await course.save();
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении курса', error });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Курс не найден' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении курса', error });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Курс не найден' });
    res.json({ message: 'Курс удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении курса', error });
  }
};

exports.getCourseByName = async (req, res) => {
  try {
    const course = await Course.findOne({ name: req.params.name });
    if (!course) return res.status(404).json({ message: 'Курс не найден' });
    // Пересчитываем groups_count для этого курса
    const count = await require('../models/group.model').countDocuments({ course: course.name });
    if (course.groups_count !== count) {
      course.groups_count = count;
      await course.save();
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении курса', error });
  }
};

exports.updateCourseByName = async (req, res) => {
  try {
    const { groups_count, ...rest } = req.body;
    const course = await Course.findOneAndUpdate({ name: req.params.name }, rest, { new: true });
    if (!course) return res.status(404).json({ message: 'Курс не найден' });
    // Пересчитываем groups_count после обновления
    const count = await require('../models/group.model').countDocuments({ course: course.name });
    course.groups_count = count;
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении курса', error });
  }
};

exports.deleteCourseByName = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ name: req.params.name });
    if (!course) return res.status(404).json({ message: 'Курс не найден' });
    res.json({ message: 'Курс удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении курса', error });
  }
}; 