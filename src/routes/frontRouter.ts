import express from 'express';

const frontRouter = express.Router();
frontRouter.route('/').get((req, res, next) => {
  res.render('welcome');
});

export { frontRouter };