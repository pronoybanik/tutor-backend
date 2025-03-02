import { IUser } from './user.interface';
import { User } from './user.module';

const registerUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  registerUserIntoDB,
};
