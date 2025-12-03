const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

//Защита наших роутов от неавторизованных пользователей (если в запросах в Headers есть токен - разрешаем переходить по роуту, если нет - запрещаем Unauthorized)
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      const user = await User.findById(payload.userId).select('email id'); //в БД ищем пользователя
      try {
        if (user) { //если есть, добавляем данные к запросам (т.е. user в объект req)
          done(null, user);
        }
        else { //если нет, ничего не добавляем
          done(null, false);
        }
      }
      catch (err) {
        console.log(err);
      }
    })
  );
};