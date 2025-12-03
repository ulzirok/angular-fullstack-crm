const Position = require('../models/Position')
const errorHanler = require('../utils//errorHandler')

module.exports.getByCategoryId = async function (req, res) {
  try {
    const positions = await Position.find({ //в БД ищем категорию, в которую входит данная позиция и пользователя, который создал данную позицию
      category: req.params.categoryId, //id берем из params роута (/:categoryId)
      user: req.user.id //это user который мы добавляли в методе done в passport (когда проверяли токен)
    }); 
    res.status(200).json(positions)
  }
  catch (err) {
    errorHanler(res, err)
  }
};

module.exports.create = async function (req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id
    }).save()
    res.status(201).json(position)
  }
  catch (err) {
    errorHanler(res, err);
  }
};

module.exports.remove = async function (req, res) {
  try {
    await Position.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Позиция была удалена'
    })
  }
  catch (err) {
    errorHanler(res, err);
  }
};

module.exports.update = async function (req, res) {
  try {
    const position = await Position.findOneAndUpdate( //обращаемся к БД
      { _id: req.params.id }, //находим позицию по id
      { $set: req.body }, //новые данные для этой позиции
      {new: true} //обновляет запись в БД и вернет уже новую измененную позицию
    )
    res.status(200).json(position)
  }
  catch (err) {
    errorHanler(res, err);
  }
};