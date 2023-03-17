import express from 'express';
import { register } from '../controllers/userController';

const userRouter = express.Router();
userRouter.route('/').post(register);

export { userRouter };