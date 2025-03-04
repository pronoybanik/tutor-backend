import { Profile } from '../profile/profile.module';
import { IUser } from './user.interface';
import { User } from './user.module';

const registerUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  const { _id: userId } = result;
  if (userId) {
    await Profile.create({ userId })
  }
  return result;
};

const getSingleUserById = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const UserService = {
  registerUserIntoDB,
  getSingleUserById
};
