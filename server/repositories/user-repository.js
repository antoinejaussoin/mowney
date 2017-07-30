const models = require('../models');

function login(email, password, cb) {
  models.User.find({
    where: {
      email
    }
  })
    .catch(cb)
    .then((user) => {
      if (!user) {
        cb('The user does not exist', null);
        return;
      }
      user.verifyPassword(password, (err, isValid) => {
        if (err) cb(err, null);

        if (isValid) {
          cb(null, user);
        } else {
          cb('The password is incorrect', null);
        }
      });
    });
}

function register(user, cb) {
  models.User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: ''
  })
    .error(cb)
    .success((u) => {
      u.setPassword(user.password, (err) => {
        u.save()
          .error(cb)
          .success(() => {
            cb(null, u);
          });
      });
    });
}

module.exports = {
  login,
  register
};
