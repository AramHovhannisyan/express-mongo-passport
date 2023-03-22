import { Request } from 'express';
import passport from "passport";
import localStrategyObj from './passportStrategy';
import { IUser } from "../models/UserModel";

passport.serializeUser((req: Request, user: any, done: any) => {  
  done(undefined, user);
});

passport.deserializeUser(function(user: IUser, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(localStrategyObj);

export default passport;
