import mongoose from "mongoose";
import { Profile } from '../profile/profile.module';
import { IUser } from './user.interface';
import { User } from './user.module';


const registerUserIntoDB = async (payload: IUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create user
    const user = await User.create([payload], { session });
    const { _id: userId, role } = user[0];

    // Prepare profile payload
    const profilePayload: any = { userId, role };
    if (role === "tutor") {
      profilePayload.isVerified = true;
    }

    // Create profile with userId
    await Profile.create([profilePayload], { session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return user[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};



const getSingleUserById = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const UserService = {
  registerUserIntoDB,
  getSingleUserById,
};
