const InfoUser = require('../models/infoUser.model');

exports.createInfoUser = async (req, res) => {
  try {
    const infoUser = await InfoUser.create(req.body);
    res.status(201).json({ message: 'Информация о пользователе создана', infoUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании', error });
  }
};

exports.getAllInfoUsers = async (req, res) => {
  try {
    const infoUsers = await InfoUser.find();
    res.json(infoUsers);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении', error });
  }
};

exports.getInfoUserById = async (req, res) => {
  try {
    const infoUser = await InfoUser.findById(req.params.id);
    if (!infoUser) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(infoUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении', error });
  }
};

exports.getInfoUserByFullname = async (req, res) => {
  try {
    const { firstname, lastname } = req.params;
    const fullname = `${firstname} ${lastname}`;
    const infoUser = await InfoUser.findOne({ fullname });
    if (!infoUser) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(infoUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении', error });
  }
};

exports.updateInfoUser = async (req, res) => {
  try {
    const infoUser = await InfoUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!infoUser) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json({ message: 'Информация обновлена', infoUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении', error });
  }
};

exports.deleteInfoUser = async (req, res) => {
  try {
    const infoUser = await InfoUser.findByIdAndDelete(req.params.id);
    if (!infoUser) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json({ message: 'Пользователь удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении', error });
  }
};

exports.updateInfoUserByFullname = async (req, res) => {
  try {
    const { firstname, lastname } = req.params;
    const fullname = `${firstname} ${lastname}`;
    const infoUser = await InfoUser.findOneAndUpdate({ fullname }, req.body, { new: true });
    if (!infoUser) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json({ message: 'Информация обновлена', infoUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении', error });
  }
};

exports.deleteInfoUserByFullname = async (req, res) => {
  try {
    const { firstname, lastname } = req.params;
    const fullname = `${firstname} ${lastname}`;
    const infoUser = await InfoUser.findOneAndDelete({ fullname });
    if (!infoUser) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json({ message: 'Пользователь удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении', error });
  }
}; 