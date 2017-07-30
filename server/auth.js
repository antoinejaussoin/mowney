const passport = require('passport');
const models = require('./models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const useAutoLogin = env === 'development' && config.autoLogin;

function auth(req, res, next) {
  console.log('user: ', req.user);
  console.log('auth: ', req.isAuthenticated());
  if (!req.isAuthenticated()) {
    if (useAutoLogin) {
      console.log('Using auto login');
      models.User.find({
        where: {
          email: config.autoLogin
        }
      }).then((defaultUser) => {
        req.login(defaultUser, (err) => {
          if (err) return next(err);
          return res.redirect('/');
        });
      }, (err) => {
        console.error(err);
        res.send(500, err);
      });
    } else {
      res.send(401);
    }
  } else {
    next();
  }
}

function authAdmin(req, res, next) {
  if (!req.isAuthenticated() | !req.user.isAdmin) {
    res.send(401);
  } else {
    next();
  }
}

module.exports = {
  auth,
  authAdmin
};
