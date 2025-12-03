const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email }); //в БД ищем есть ли пользователь с таким email (ч/з mongoose)
  if (candidate) { //если есть
    res.status(409).json({ //клиенту вернем ошибку 409
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
      res.status(201).json(user); //клиенту вернем объект 201
    }
    catch (err) { //если БД не отвечает
      errorHandler(res, err); //клиенту вернем ошибку 500
    }
  }
};

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email }); //в БД ищем есть ли пользователь с таким email (ч/з mongoose)
  if (candidate) { //если есть
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password); //сравниваем пароль клиента с паролем в БД
    if (passwordResult) { //если пароли совпадают, генерируем jwt-токен
      
      const token = jwt.sign({ //методу передаем 3 аргумента для получения jwt-токена
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})
      
      res.status(200).json({ //клиенту вернем токен, чтобы клиент мог далее отсылать запросы
        token: `Bearer ${token}`
      })
    }
    else { //если не совпадают
      res.status(401).json({ //клиенту вернем ошибку 401
        message: 'Пароли не совпадают. Попробуйте снова'
      }) 
    }
  }
  else { //если нет
    res.status(404).json({ //клиенту вернем ошибку 404
      message: 'Пользователь с таким email не найден'
    })
  }
};