import { Schema, model } from "mongoose";
import { IProfile } from "./profile.interface";
import { UserRole } from "../user/user.interface";
import { string } from "zod";

const ProfileSchema = new Schema<IProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
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
        requestRole: {
            type: String,
            enum: [UserRole.TUTOR, UserRole.STUDENT],
            default: UserRole.STUDENT,
        },
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
