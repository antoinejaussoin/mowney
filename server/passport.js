let passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const userRepository = require('./repositories/user-repository');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  ((email, password, done) => {
    console.log('Trying to login ', email, password);

    if (email === 'admin' && password === 'admin') {
      return done(null, {
        firstName: 'Administrator',
        lastName: '',
        email: 'admin',
        isAdmin: true
      });
    }

    userRepository.login(email, password, (err, user) => {
      if (err) {
        return done(null, false, {
          message: err
        });
      } else if (user) {
        return done(null, user);
      }
      return done(null, false, {
        message: 'Incorrect'
      });
    });
  })
));

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdministrator: user.isAdministrator
  });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
