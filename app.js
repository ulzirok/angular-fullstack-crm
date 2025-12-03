const express = require('express'); //подключаем файл express
const app = express(); //создаем сервер (экзепляр фреймворка express)
const bodyParser = require('body-parser'); //для парсинга данных
const cors = require('cors'); //для обработки CORS-запросов
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

mongoose.connect(keys.mongoURI) //инициализация подключения с БД (mongoDB)
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;