const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils//errorHandler');
const mongoose = require('mongoose');

module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  }
  catch (err) {
    errorHandler(res, err);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  }
  catch (err) {
    errorHandler(res, err);
  }
};

module.exports.remove = async function (req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) { // Валидация id
      return res.status(400).json({ message: 'Невалидный id' });
    }

    const deletedCategory = await Category.findByIdAndDelete(id); // Попробуем удалить категорию и сразу получить удалённый документ

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    await Position.deleteMany({ category: id }); // Удалим все позиции, привязанные к этой категории
    return res.status(200).json({ message: 'Категория удалена' });
  }
  catch (err) {
    errorHandler(res, err);
  }
};

module.exports.create = async function (req, res) {
  const category = new Category({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  });

  try {
    await category.save();
    res.status(201).json(category);
  }
  catch (err) {
    errorHandler(res, err);
  }
};

module.exports.update = async function (req, res) {
  const updatedCategory = {
    name: req.body.name
  };
  if (req.file) {
    updatedCategory.imageSrc = req.file.path;
  }
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedCategory },
      { new: true }
    );
    res.status(200).json(category);
  }
  catch (err) {
    errorHandler(res, err);
  }
};