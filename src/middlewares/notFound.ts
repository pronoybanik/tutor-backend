import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const NotFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    error: '',
  });

  next();
};

export default NotFound;
