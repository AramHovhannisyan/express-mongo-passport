import { Request, Response, NextFunction } from 'express';

const getTest = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
      status: 'success',
      data: {
        message: "TestController Successfully Used",
      }
  });
};

export { getTest };