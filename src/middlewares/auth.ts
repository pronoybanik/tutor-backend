import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from './AppError';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../config';
import { User } from '../modules/user/user.module';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Authorization token is missing!',
      );
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
    }

    const { role, userId } = decoded;

    if (!userId || !role) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token payload!');
    }

    const user = await User.isUserExistsByCustomId(userId);

    // const user = await User.checkUserExist(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You do not have the required permissions!',
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;
