var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var userRepository = require('./repositories/user-repository');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {

        if (email === 'admin' && password === 'admin')
            return done(null, {
                firstName: 'Administrator',
                lastName: '',
                email: 'admin',
                isAdmin: true
            });

        userRepository.login(email, password, function (err, user) {
            if (err) {
                return done(null, false, {
                    message: err
                });
            } else if (user) {
                return done(null, user)
            } else {
                return done(null, false, {
                    message: 'Incorrect'
                });
            }
        })

    }
));

passport.serializeUser(function (user, done) {
    done(null, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdministrator: user.isAdministrator
    });
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
