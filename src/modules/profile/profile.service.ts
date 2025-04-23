import AppError from '../../middlewares/AppError';
import { User } from '../user/user.module';
import { IProfile } from './profile.interface';
import httpStatus from 'http-status';
import { Profile } from './profile.module';
import { Types } from "mongoose";

const updateProfileIntoDB = async (
  userId: string,
  paramsId: string,
  payload: Partial<IProfile>,
) => {
  try {
    // Step 1: Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    // Step 2: Check if the profile exists
    const existingProfile = await Profile.findById(paramsId);
    if (!existingProfile) {
      throw new AppError(httpStatus.NOT_FOUND, 'Profile not found!');
    }

    if (existingProfile.userId.toString() !== userId) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You cannot update this profile!',
      );
    }

    // Step 4: Update profile data
    const updatedProfile = await Profile.findByIdAndUpdate(
      paramsId,

      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProfile) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Profile update failed!',
      );
    }

    return updatedProfile;
  } catch (error) {
    throw error; // Ensure proper error propagation
  }
};

const getUserProfileIntoDB = async (userId: string) => {
  const result = await Profile.findOne({ userId }).populate("reviews.studentId");
  return result;
};

const getUserSingleProfileIntoDB = async (id: string) => {
  const result = await Profile.findById(id).populate("userId").populate("reviews.studentId");
  return result;
};

const getAllUserProfileIntoDB = async () => {
  const result = await Profile.find({});
  return result;
};

const getAllTutorProfileIntoDB = async () => {
  const result = await Profile.find({ role: 'tutor' }).populate("userId");
  return result;
};

const updateUserRoleIntoDB = async (id: string, newRole: string) => {
  // Find profile by ID
  const profile = await Profile.findById(id);
  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, 'Profile not found!');
  }

  if (!profile.userId) {
    throw new AppError(httpStatus.NOT_FOUND, 'User ID not found!');
  }

  // Update the User role
  const updatedUser = await User.findByIdAndUpdate(
    profile.userId,
    { role: newRole },
    { new: true },
  );

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'User role update failed!',
    );
  }

  // Update the Profile role
  const updatedProfile = await Profile.findByIdAndUpdate(
    id,
    { role: newRole, requestRole: null, isVerified: true },
    { new: true },
  );

  if (!updatedProfile) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Profile update failed!',
    );
  }

  return updatedProfile;
};

const updateFeedBackIntoDB = async (
  id: string,
  userId: string,
  data: { comment: string; rating: number }
) => {
  const { comment, rating } = data;

  const profile = await Profile.findById(id);
  if (!profile) {
    throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
  }

  profile.reviews.push({
    studentId: new Types.ObjectId(userId),
    comment,
    createdAt: new Date(),
  });

  const currentRating = profile.ratings ?? 0;
  const totalReviews = profile.reviews.length;
  const totalRating = currentRating * (totalReviews - 1) + rating;

  profile.ratings = Math.min(
    5,
    parseFloat((totalRating / totalReviews).toFixed(1))
  );

  const result = await profile.save();

  return result;
};




export const ProfileService = {
  updateProfileIntoDB,
  getUserProfileIntoDB,
  getUserSingleProfileIntoDB,
  getAllUserProfileIntoDB,
  updateUserRoleIntoDB,
  getAllTutorProfileIntoDB,
  updateFeedBackIntoDB
};
