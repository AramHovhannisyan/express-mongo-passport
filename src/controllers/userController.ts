import { Request, Response, NextFunction } from 'express';
import { User } from '../models/UserModel';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({
      email,
      password
    });

    const user = await newUser.save();

    return res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    return res.status(200).json({
      status: 'success',
      data: {
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    return res.status(200).json({
      status: 'success',
      data: {
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    return res.status(200).json({
      status: 'success',
      data: {
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    return res.status(200).json({
      status: 'success',
      data: {
      }
    });
  } catch (error) {
    console.log(error);
  }
};


export { register, login, logout, refresh, getAll };