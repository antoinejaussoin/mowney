// import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from './data/models';
import { IUser } from './data/models/user';

export default (passport) => {
  passport.use('local', new Strategy(
    async function(email, password, done) {
      const user = await User.findOne({ where: { email }});
      const isValid = await user.verifyPassword(password);
      if (isValid) {
        done(null, user);
      } else {
        done('error');
      }
      // })
      // .then( ( user ) => {
      //   return done(null, user);
      // })
      // .catch( (err) => {
      //   return done(err);
      // });
    }
  ));
  
  passport.serializeUser(function(user: IUser, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id: string, done) {
    const user = await User.findById(id);
    done(null, user);
  });
}

