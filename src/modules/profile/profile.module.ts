import { Schema, model } from "mongoose";
import { IProfile } from "./profile.interface";
import { UserRole } from "../user/user.interface";

const ProfileSchema = new Schema<IProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subjects: {
            type: [String],
        },
        role: {
            type: String,
            enum: [UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR],
            default: UserRole.STUDENT,
        },
        bio: {
            type: String,
            trim: true,
        },
        experience: {
            type: Number,
            min: 0,
        },
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Profile = model<IProfile>("Profile", ProfileSchema);
