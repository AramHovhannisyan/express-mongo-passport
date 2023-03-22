import passportLocal from "passport-local";
import bcryptjs from "bcryptjs";
import { User, IUser } from "../models/UserModel";

const LocalStrategy = passportLocal.Strategy;

const localStrategyObj = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({email})
        .then(user => {
          if (!user) { return done(null, false, { message: 'Email does not exists' }); }

          bcryptjs.compare(password, user.password, (err, isMatch) => {
            if(err) throw err;  //  return done(err)

            if(isMatch){
              return done(null, user);
            }else {
              return done(null, false, { message: 'Incorrect Password' });
            }
          });
        })
        .catch(err => console.log(err));
});

export default localStrategyObj;