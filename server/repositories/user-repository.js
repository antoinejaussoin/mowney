var models = require('../models');

function login(email, password, cb) {
    models.User.find({
        where: {
            email: email
        }
    })
        .catch(cb)
        .then(function (user) {
            user.verifyPassword(password, function (err, isValid) {
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
        .success(function (u) {
            u.setPassword(user.password, function (err) {
                u.save()
                    .error(cb)
                    .success(function () {
                        cb(null, u);
                    })
            });

        })
}

module.exports = {
    login: login,
    register: register
}
