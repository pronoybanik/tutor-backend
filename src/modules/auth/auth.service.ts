import AppError from '../../middlewares/AppError';
import { User } from '../user/user.module';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';
import mongoose from 'mongoose';
import { IUser } from '../user/user.interface';
import { IJwtPayload } from './auth.interface';

const loginUser = async (payload: IUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id as string,
      name: user.name as string,
      email: user.email as string,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    // const updateUserInfo = await User.findByIdAndUpdate(
    //     user._id,
    //     { clientInfo: payload.clientInfo, lastLogin: Date.now() },
    //     { new: true, session }
    // );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const AuthService = {
  loginUser,
};
