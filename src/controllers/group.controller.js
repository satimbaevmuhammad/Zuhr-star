const Group = require('../models/group.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');

exports.createGroup = async (req, res) => {
  try {
    const { teacher_fullname, course, start_time, end_time, ...rest } = req.body;
    if (!teacher_fullname) {
      return res.status(400).json({ message: 'Необходимо указать ФИО учителя (teacher_fullname)' });
    }
    if (!course) {
      return res.status(400).json({ message: 'Необходимо указать название курса' });
    }
    if (!start_time || !end_time) {
      return res.status(400).json({ message: 'Необходимо указать время начала и окончания урока' });
    }
    const teacher = await User.findOne({
      fullname: teacher_fullname,
      role: { $in: ['Mentor', 'SupportTeacher', 'HeadMentor'] }
    });
    if (!teacher) {
      return res.status(404).json({ message: 'Учитель с таким ФИО не найден или не является учителем' });
    }
    const courseDoc = await Course.findOne({ name: course });
    if (!courseDoc) {
      return res.status(404).json({ message: 'Курс с таким названием не найден' });
    }
    const created_at = new Date();
    let end_date = new Date(created_at);
    if (courseDoc.duration_type === 'month') {
      end_date.setMonth(end_date.getMonth() + courseDoc.duration);
    } else if (courseDoc.duration_type === 'year') {
      end_date.setFullYear(end_date.getFullYear() + courseDoc.duration);
    }
    let status = 'active';
    if (end_date < new Date()) {
      status = 'freeze';
    }
    const group = await Group.create({
      ...rest,
      course,
      price: courseDoc.price,
      teacher_phone: teacher.phone,
      start_time,
      end_time,
      created_at,
      end_date,
      status
    });
    // Обновляем groups_count у курса
    const count = await Group.countDocuments({ course });
    await Course.findByIdAndUpdate(courseDoc._id, { groups_count: count });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании группы', error });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { course, ...rest } = req.body;
    let updateData = { ...rest };
    if (course) {
      const courseDoc = await Course.findOne({ name: course });
      if (!courseDoc) {
        return res.status(404).json({ message: 'Курс с таким названием не найден' });
      }
      updateData.course = course;
      updateData.price = courseDoc.price;
    }
    const group = await Group.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!group) return res.status(404).json({ message: 'Группа не найдена' });
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении группы', error });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('students');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении групп', error });
  }
};

exports.getGroupByName = async (req, res) => {
  try {
    const group = await Group.findOne({ name: req.params.name }).populate('students');
    if (!group) return res.status(404).json({ message: 'Группа не найдена' });
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении группы', error });
  }
};

exports.updateGroupByName = async (req, res) => {
  try {
    const { course, ...rest } = req.body;
    let updateData = { ...rest };
    if (course) {
      const courseDoc = await Course.findOne({ name: course });
      if (!courseDoc) {
        return res.status(404).json({ message: 'Курс с таким названием не найден' });
      }
      updateData.course = course;
      updateData.price = courseDoc.price;
    }
    const group = await Group.findOneAndUpdate({ name: req.params.name }, updateData, { new: true });
    if (!group) return res.status(404).json({ message: 'Группа не найдена' });
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении группы', error });
  }
};

exports.deleteGroupByName = async (req, res) => {
  try {
    const group = await Group.findOneAndDelete({ name: req.params.name });
    if (!group) return res.status(404).json({ message: 'Группа не найдена' });
    // Обновляем groups_count у курса
    if (group.course) {
      const courseDoc = await Course.findOne({ name: group.course });
      if (courseDoc) {
        const count = await Group.countDocuments({ course: group.course });
        await Course.findByIdAndUpdate(courseDoc._id, { groups_count: count });
      }
    }
    res.json({ message: 'Группа удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении группы', error });
  }
};
