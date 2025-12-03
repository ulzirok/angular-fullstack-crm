const bcrypt = require('bcryptjs')
const User = require('../models/User');

module.exports.login = function (req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  });
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email }); //в БД проверяем есть ли такой email (ч/з mongoose)
  if (candidate) { //если есть
    res.status(409).json({ //клиенту вернем ошибку
      message: 'Такой email уже занят. Попробуйте другой'
    });
  }
  else { //если нет, создаем пользователя (но пароль хэшируем)
    const salt = bcrypt.genSaltSync(10); //генерируем хэш для пароля клиента
    const password = req.body.password //сохраняем пароль клиента в переменную
    
    const user = new User({ //локально сохраняем
      email: req.body.email,
      password: bcrypt.hashSync(password, salt) //хэш пароля+salt
    });

    try { //если БД отвечает
      await user.save(); //в БД сохраняем
      res.status(201).json(user); //клиенту вернем объект
    }
    catch (err) { //если БД не отвечает
      //Обработать ошибку 
    }
  }
};