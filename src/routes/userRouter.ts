import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import bcryptjs from "bcryptjs";
import passport from "passport";
import { User } from "../models/UserModel";
import protect from '../middlewares/authMiddleware';

const userRouter = express.Router();
userRouter.route('/login').get((req, res, next) => {
  return res.render('login');
});

userRouter.route('/logout').get((req: Request, res: Response, next: NextFunction) => {
  req.logout(function(err) {
    if (err) { return next(err); }

    req.flash('success_msg', 'Successfully Logged Out');
    res.redirect('/users/login');
  });
});

userRouter.route('/register').get((req, res, next) => {
  return res.render('register');
});

userRouter.route('/login').post(passport.authenticate('local', { 
  failureRedirect: '/users/login', 
  successRedirect: '/users/dashboard',
  failureFlash: true,
}), (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err);
    
    req.flash('error_msg', 'Error');
    return res.redirect('/users/login');
  }
});

userRouter.route('/register').post(async (req, res, next) => {
  const { name, email, password, password2 } = req.body;  

  const errors = [];
  if(!name || !email || !password || !password2) {
    errors.push({msg: "Please fill in all fields"});
  }

  if(password != password2) {
    errors.push({msg: "Passwords do not match"});
  }

  if(password.length < 6) {
    errors.push({msg: "Password length must be greater than 5"});
  }

  if(errors.length > 0) {
    console.log(errors);
    
    return res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Check If User Already Exists
    const condidate = await User.findOne({email});
    if(condidate) {
      errors.push({msg: "User with this email have already registered"});
      return res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    // New user
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        
        newUser.password = hash;
        newUser.save()
          .then(user => {
            req.flash('success_msg', 'You have successfully registered, and gen log in.');
            return res.redirect('/users/login');
          })
          .catch(e => console.log(e));
      });
    });
  }
});

userRouter.route('/dashboard').get(protect, (req, res, next) => {
  return res.render('dashboard', {user: req.user});
});

export { userRouter };