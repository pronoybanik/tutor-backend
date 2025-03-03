import AppError from "../../middlewares/AppError";
import { User } from "../user/user.module";
import { IProfile } from "./profile.interface";
import httpStatus from "http-status";
import { Profile } from "./profile.module";


const updateProfileIntoDB = async (userId: string, paramsId: string, payload: Partial<IProfile>) => {
    // Step 1: Find the user
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // Step 2: Check if the profile exists
    const existingProfile = await Profile.findById(paramsId);
    console.log("existingProfile", existingProfile, userId);

    if (!existingProfile) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found!");
    }

    if (existingProfile.userId.toString() !== userId) {
        throw new AppError(httpStatus.FORBIDDEN, "You cannot update this profile! That Profile not your");
    }

    // Step 3: If role is updated, update the User model too
    if (payload.role && payload.role !== user.role) {
        await User.updateOne(
            { _id: User._id },
            { $push: { role: payload.role } }
        )
    }

    // Step 4: Update profile data
    const updatedProfile = await Profile.findByIdAndUpdate(paramsId, payload, {
        new: true,
        runValidators: true,
    });

    if (!updatedProfile) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Profile update failed!");
    }

    return updatedProfile;
};

const getUserProfileIntoDB = async (userId: string) => {
    const result = await Profile.findOne({ userId })
    return result
}

const getUserSingleProfileIntoDB = async (id: string) => {
    const result = await Profile.findById(id)
    return result
}



export const ProfileService = {
    updateProfileIntoDB,
    getUserProfileIntoDB,
    getUserSingleProfileIntoDB
};
