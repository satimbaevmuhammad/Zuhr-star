const Group = require('../models/group.model');

exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании группы', error });
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
