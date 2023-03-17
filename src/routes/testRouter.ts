import express from 'express';
import { getTest } from '../controllers/testController';

const testRouter = express.Router();
testRouter.route('/').get(getTest);

export { testRouter };