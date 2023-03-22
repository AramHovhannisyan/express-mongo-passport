import { Request, Response, NextFunction } from 'express';

export default function protect(req: Request, res: Response, next: NextFunction) {
  if(req.isAuthenticated()) {    
    return next();
  }

  req.flash('error_msg', 'Login Required');
  return res.redirect('/users/login');
}